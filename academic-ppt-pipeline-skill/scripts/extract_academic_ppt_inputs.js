#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    const val = argv[i + 1];
    if (!key.startsWith("--")) continue;
    args[key.slice(2)] = val;
    i += 1;
  }
  return args;
}

function run(cmd, args, opts = {}) {
  return cp.execFileSync(cmd, args, {
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
    ...opts,
  });
}

function xmlDecode(text) {
  if (!text) return "";
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function stripTags(text) {
  return xmlDecode(text.replace(/<[^>]+>/g, " "));
}

function normalizeSpace(text) {
  return text
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ ]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \u00a0]{2,}/g, " ")
    .trim();
}

function colToIndex(ref) {
  const letters = ref.replace(/[0-9]/g, "");
  let n = 0;
  for (const ch of letters) {
    n = n * 26 + (ch.charCodeAt(0) - 64);
  }
  return n - 1;
}

function maybeTextutilExtract(filePath) {
  try {
    return normalizeSpace(run("textutil", ["-convert", "txt", "-stdout", filePath]));
  } catch {
    return "";
  }
}

function extractDocLike(filePath) {
  const viaTextutil = maybeTextutilExtract(filePath);
  if (viaTextutil) {
    return { type: "doc", text: viaTextutil };
  }

  if (filePath.toLowerCase().endsWith(".docx")) {
    const xml = run("unzip", ["-p", filePath, "word/document.xml"]);
    const paragraphs = [...xml.matchAll(/<w:p\b[\s\S]*?<\/w:p>/g)].map((m) =>
      normalizeSpace(stripTags(m[0]))
    ).filter(Boolean);
    return { type: "doc", text: paragraphs.join("\n") };
  }

  return { type: "doc", text: "" };
}

function parseXlsx(filePath) {
  const zipEntries = new Set(run("zipinfo", ["-1", filePath]).split("\n").filter(Boolean));
  const workbookXml = run("unzip", ["-p", filePath, "xl/workbook.xml"]);
  const sheetNames = [...workbookXml.matchAll(/<sheet [^>]*name="([^"]+)"/g)].map((m) => xmlDecode(m[1]));

  let sharedStrings = [];
  if (zipEntries.has("xl/sharedStrings.xml")) {
    const sharedXml = run("unzip", ["-p", filePath, "xl/sharedStrings.xml"]);
    sharedStrings = [...sharedXml.matchAll(/<si\b[\s\S]*?<\/si>/g)].map((m) =>
      normalizeSpace(stripTags(m[0]))
    );
  } else {
    sharedStrings = [];
  }

  const sheets = [];
  for (let i = 0; i < sheetNames.length; i += 1) {
    const sheetXml = run("unzip", ["-p", filePath, `xl/worksheets/sheet${i + 1}.xml`]);
    const rows = [];
    for (const rowMatch of sheetXml.matchAll(/<row\b[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
      const rowNum = Number(rowMatch[1]);
      const rowXml = rowMatch[2];
      const cells = {};
      for (const cellMatch of rowXml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
        const attrs = cellMatch[1];
        const inner = cellMatch[2];
        const refMatch = attrs.match(/\br="([A-Z]+[0-9]+)"/);
        if (!refMatch) continue;
        const ref = refMatch[1];
        const tMatch = attrs.match(/\bt="([^"]+)"/);
        const cellType = tMatch ? tMatch[1] : "";
        let value = "";
        if (cellType === "inlineStr") {
          value = normalizeSpace(stripTags(inner));
        } else if (cellType === "s") {
          const vMatch = inner.match(/<v>([\s\S]*?)<\/v>/);
          const idx = vMatch ? Number(vMatch[1]) : -1;
          value = idx >= 0 ? sharedStrings[idx] || "" : "";
        } else {
          const vMatch = inner.match(/<v>([\s\S]*?)<\/v>/);
          value = vMatch ? normalizeSpace(xmlDecode(vMatch[1])) : normalizeSpace(stripTags(inner));
        }
        cells[colToIndex(ref)] = value;
      }
      rows.push({ rowNum, cells });
    }
    sheets.push({ name: sheetNames[i], rows });
  }

  return { type: "xlsx", sheets };
}

function parsePptx(filePath) {
  const list = run("zipinfo", ["-1", filePath]).split("\n").filter(Boolean);
  const slideFiles = list
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const na = Number(a.match(/slide(\d+)\.xml$/)[1]);
      const nb = Number(b.match(/slide(\d+)\.xml$/)[1]);
      return na - nb;
    });

  const slides = slideFiles.map((slideFile, idx) => {
    const xml = run("unzip", ["-p", filePath, slideFile]);
    const texts = [...xml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)]
      .map((m) => xmlDecode(m[1]).trim())
      .filter(Boolean);
    return {
      slideNo: idx + 1,
      text: normalizeSpace(texts.join("\n")),
    };
  });

  return { type: "pptx", slides };
}

function parseLiterature(inputPath) {
  const lower = inputPath.toLowerCase();
  let files = [];

  if (lower.endsWith(".zip")) {
    files = run("zipinfo", ["-1", inputPath])
      .split("\n")
      .map((line) => line.trim())
      .filter((name) => name.toLowerCase().endsWith(".pdf"))
      .map((name) => path.basename(name))
      .filter((name) => !name.startsWith("._"))
      .sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
  } else {
    const stat = fs.statSync(inputPath);
    files = stat.isDirectory()
      ? fs.readdirSync(inputPath)
        .filter((name) => name.toLowerCase().endsWith(".pdf"))
        .filter((name) => !name.startsWith("._"))
        .sort((a, b) => a.localeCompare(b, "zh-Hans-CN"))
      : [path.basename(inputPath)];
  }

  return {
    type: "pdf",
    files: files.map((name, idx) => ({
      index: idx + 1,
      fileName: name,
      stem: name.replace(/\.pdf$/i, ""),
    })),
  };
}

function buildOutlineSummary(data) {
  if (data.type === "doc") {
    const paras = data.text.split("\n").map((line) => line.trim()).filter(Boolean);
    return {
      sourceType: "word",
      paragraphs: paras.slice(0, 80),
    };
  }

  if (data.type === "xlsx") {
    const mainSheet = data.sheets[0];
    const headerRow = mainSheet && mainSheet.rows.length ? mainSheet.rows[0].cells : {};
    const headers = Object.keys(headerRow)
      .map((k) => [Number(k), headerRow[k]])
      .sort((a, b) => a[0] - b[0]);

    function pick(byHeader, aliases) {
      for (const label of aliases) {
        if (byHeader[label]) return byHeader[label];
      }
      return "";
    }

    const slides = mainSheet.rows.slice(1).map((row) => {
      const byHeader = {};
      headers.forEach(([idx, label]) => {
        byHeader[label] = row.cells[idx] || "";
      });
      return {
        pageNo: pick(byHeader, ["页码"]) || "",
        title: pick(byHeader, ["页面标题", "页标题"]) || "",
        task: pick(byHeader, ["这一页的任务", "本页目标"]) || "",
        onscreen: pick(byHeader, ["屏幕上写什么（可直接上屏）", "屏幕文案（可直接上PPT）", "PPT可直接放入的正文"]) || "",
        notes: pick(byHeader, ["口头讲什么（讲者备注）", "口头讲稿（讲者备注）", "讲者备注（约40-70秒）"]) || "",
        layout: pick(byHeader, ["版式/排版描述", "排版描述"]) || "",
        imagePrompt: pick(byHeader, ["Nanobanana图片Prompt", "Nanobanana配图Prompt"]) || "",
        chartData: pick(byHeader, ["建议图表/数据", "建议呈现数据/图表"]) || "",
        evidence: pick(byHeader, ["主证据与支持点", "主参考文献"]) || "",
        refs: pick(byHeader, ["建议挂文献（短引）", "建议文献编号", "备用/补充文献"]) || "",
        remark: pick(byHeader, ["备注", "来源URL"]) || "",
      };
    });

    return {
      sourceType: "xlsx",
      sheetNames: data.sheets.map((sheet) => sheet.name),
      slides,
    };
  }

  return { sourceType: "unknown" };
}

function snippet(text, maxLen = 120) {
  const t = normalizeSpace(text).replace(/\n/g, " / ");
  return t.length > maxLen ? `${t.slice(0, maxLen)}...` : t;
}

function renderMarkdown(inputInfo) {
  const lines = [];
  lines.push("# 学术PPT输入抽取结果");
  lines.push("");
  lines.push("## 输入概览");
  lines.push("");
  if (inputInfo.outlinePath) lines.push(`- 讲义大纲：${inputInfo.outlinePath}`);
  if (inputInfo.templatePath) lines.push(`- 模板PPT：${inputInfo.templatePath}`);
  if (inputInfo.literaturePath) lines.push(`- 文献PDF：${inputInfo.literaturePath}`);
  lines.push("");

  if (inputInfo.outlineSummary.sourceType === "xlsx") {
    lines.push("## 讲义大纲抽取");
    lines.push("");
    lines.push(`- 来源类型：XLSX`);
    lines.push(`- 工作表：${inputInfo.outlineSummary.sheetNames.join(" / ")}`);
    lines.push(`- 逐页页数：${inputInfo.outlineSummary.slides.length}`);
    lines.push("");
    inputInfo.outlineSummary.slides.forEach((slide) => {
      lines.push(`### P${slide.pageNo || "?"} ${slide.title || "未命名页"}`);
      if (slide.onscreen) lines.push(`- 上屏：${snippet(slide.onscreen, 180)}`);
      if (slide.layout) lines.push(`- 版式：${snippet(slide.layout, 160)}`);
      if (slide.refs) lines.push(`- 短引：${slide.refs}`);
      if (slide.imagePrompt) lines.push(`- 生图提示：${snippet(slide.imagePrompt, 160)}`);
      lines.push("");
    });
  } else if (inputInfo.outlineSummary.sourceType === "word") {
    lines.push("## Word大纲抽取");
    lines.push("");
    inputInfo.outlineSummary.paragraphs.slice(0, 30).forEach((p) => lines.push(`- ${p}`));
    lines.push("");
  }

  if (inputInfo.templateSummary) {
    lines.push("## 模板PPT抽取");
    lines.push("");
    lines.push(`- 幻灯片数：${inputInfo.templateSummary.slides.length}`);
    lines.push("");
    inputInfo.templateSummary.slides.slice(0, 10).forEach((slide) => {
      lines.push(`### 模板页 ${slide.slideNo}`);
      lines.push(`- 文本摘要：${snippet(slide.text, 180) || "无明显文本"}`);
      lines.push("");
    });
  }

  if (inputInfo.literatureSummary) {
    lines.push("## 文献PDF清单");
    lines.push("");
    lines.push(`- 文献数量：${inputInfo.literatureSummary.files.length}`);
    lines.push("");
    inputInfo.literatureSummary.files.forEach((file) => {
      lines.push(`- ${file.index}. ${file.stem}`);
    });
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv);
  const outlinePath = args.outline ? path.resolve(args.outline) : "";
  const templatePath = args.template ? path.resolve(args.template) : "";
  const literaturePath = args.literature ? path.resolve(args.literature) : "";
  const outputBase = path.resolve(args.output || "./output/academic_ppt_input_extract");

  const result = {
    createdAt: new Date().toISOString(),
    outlinePath,
    templatePath,
    literaturePath,
    outlineSummary: null,
    templateSummary: null,
    literatureSummary: null,
  };

  if (outlinePath) {
    const ext = path.extname(outlinePath).toLowerCase();
    if (ext === ".xlsx") {
      result.outlineSummary = buildOutlineSummary(parseXlsx(outlinePath));
    } else if (ext === ".docx" || ext === ".doc") {
      result.outlineSummary = buildOutlineSummary(extractDocLike(outlinePath));
    } else {
      throw new Error(`Unsupported outline file type: ${ext}`);
    }
  }

  if (templatePath) {
    result.templateSummary = parsePptx(templatePath);
  }

  if (literaturePath) {
    result.literatureSummary = parseLiterature(literaturePath);
  }

  fs.mkdirSync(path.dirname(outputBase), { recursive: true });
  fs.writeFileSync(`${outputBase}.json`, JSON.stringify(result, null, 2), "utf8");
  fs.writeFileSync(`${outputBase}.md`, renderMarkdown(result), "utf8");
  console.log(`${outputBase}.json`);
  console.log(`${outputBase}.md`);
}

module.exports = {
  parseArgs,
  parseXlsx,
  parsePptx,
  parseLiterature,
  extractDocLike,
  buildOutlineSummary,
  renderMarkdown,
};

if (require.main === module) {
  main();
}
