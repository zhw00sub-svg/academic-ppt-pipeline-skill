#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  parseXlsx,
  parsePptx,
  parseLiterature,
  extractDocLike,
  buildOutlineSummary,
  renderMarkdown,
} = require("./extract_academic_ppt_inputs");

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

function resolveMaybe(p) {
  return p ? path.resolve(p) : "";
}

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeTopic(args) {
  return args.topic || args.title || "";
}

function detectInputMode({ topic, outlinePath, templatePath, literaturePath }) {
  if (outlinePath || templatePath || literaturePath) return "structured_materials";
  if (topic) return "topic_only";
  throw new Error("Need either a topic or at least one material path.");
}

function buildExtraction(outlinePath, templatePath, literaturePath) {
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

  if (templatePath) result.templateSummary = parsePptx(templatePath);
  if (literaturePath) result.literatureSummary = parseLiterature(literaturePath);

  return result;
}

function buildManifest(args, mode, extraction, outputDir) {
  const hasLiterature = Boolean(args.literature);
  const hasTemplate = Boolean(args.template);
  const hasBenchmark = Boolean(args["benchmark-image"]);

  const evidenceMode = args["evidence-mode"] ||
    (hasLiterature ? "literature_strict_on_data_pages" : "structure_first_literature_fill_later");

  const imageMode = args["image-mode"] || "prompts_for_external_generation";

  return {
    createdAt: new Date().toISOString(),
    projectName: args["deck-name"] || normalizeTopic(args) || "academic-ppt-project",
    topic: normalizeTopic(args),
    mode,
    outputDir,
    routing: {
      primaryPptSkill: "pptx-tfriedel",
      fallbackPptSkill: "pptx-anthropic",
    },
    inputs: {
      outlinePath: resolveMaybe(args.outline),
      templatePath: resolveMaybe(args.template),
      literaturePath: resolveMaybe(args.literature),
      benchmarkImagePath: resolveMaybe(args["benchmark-image"]),
      audience: args.audience || "",
      durationMinutes: args.duration || "",
    },
    executionChoices: {
      outputTarget: args["output-target"] || "full_editable_ppt",
      evidenceMode,
      imageMode,
      visualAnchor: hasTemplate && hasBenchmark ? "template_and_benchmark_image"
        : hasTemplate ? "template_only"
        : hasBenchmark ? "benchmark_image_only"
        : "skill_default_visual_system",
    },
    extractionAvailable: Boolean(extraction),
  };
}

function buildWorkflowBrief(manifest, extraction) {
  const lines = [];
  lines.push("# Academic PPT Pipeline Run");
  lines.push("");
  lines.push("## 项目状态");
  lines.push("");
  lines.push(`- 项目名：${manifest.projectName}`);
  lines.push(`- 输入模式：${manifest.mode}`);
  lines.push(`- 输出目标：${manifest.executionChoices.outputTarget}`);
  lines.push(`- 主路由：${manifest.routing.primaryPptSkill}`);
  lines.push(`- 备选路由：${manifest.routing.fallbackPptSkill}`);
  lines.push(`- 证据策略：${manifest.executionChoices.evidenceMode}`);
  lines.push(`- 生图策略：${manifest.executionChoices.imageMode}`);
  lines.push("");
  lines.push("## 执行判断");
  lines.push("");

  if (manifest.mode === "structured_materials") {
    lines.push("- 已检测到结构化材料，优先按材料驱动生产。");
    if (extraction?.outlineSummary?.sourceType === "xlsx") {
      lines.push(`- 讲义主源：XLSX，检测到 ${extraction.outlineSummary.slides.length} 页逐页策划。`);
    } else if (extraction?.outlineSummary?.sourceType === "word") {
      lines.push("- 讲义主源：Word 段落大纲。");
    }
    if (extraction?.templateSummary) {
      lines.push(`- 模板参考：PPT，共 ${extraction.templateSummary.slides.length} 页文本可参考。`);
    }
    if (extraction?.literatureSummary) {
      lines.push(`- 文献地图：${extraction.literatureSummary.files.length} 篇 PDF。`);
    }
  } else {
    lines.push("- 未提供完整结构化材料，按命题模式启动。");
    lines.push("- 先生成学术页纲，再区分证据刚性页与结构页。");
  }

  lines.push("");
  lines.push("## 标准输出包");
  lines.push("");
  lines.push("- `01_intake/`：输入、抽取、运行参数");
  lines.push("- `02_planning/`：执行摘要、页纲草案、执行提示");
  lines.push("- `03_prompts/`：外部生图与生产 prompts");
  lines.push("- `04_delivery/`：交付检查表与质量判定");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function buildTopicOnlyOutlineSeed(manifest) {
  const topic = manifest.topic || "未命名学术主题";
  const audience = manifest.inputs.audience || "学术会议听众";
  const duration = manifest.inputs.durationMinutes || "10-15";

  return `# Topic-Only 页纲草案

## 输入假设

- 主题：${topic}
- 听众：${audience}
- 预估时长：${duration} 分钟
- 当前模式：topic-only / partial-input

## 建议基础结构

### P1 封面
- 目标：定义主题与讨论边界
- 类型： framing

### P2 为什么这个问题值得现在讨论
- 目标：建立背景与临床现实
- 类型： framing

### P3 当前关键定义 / 共识 / 文件地图
- 目标：给出领域地图
- 类型： evidence-required

### P4 当前证据支持的核心判断
- 目标：压缩中心结论
- 类型： interpretation + evidence-bound

### P5-P7 关键临床场景
- 目标：把问题拆成 2-3 个最有临床抓手的场景
- 类型： evidence-required

### P8 边界与风险
- 目标：主动讲清证据不足与实践限制
- 类型： evidence-required

### P9 下一步研究或实践议程
- 目标：把讨论推进到行动
- 类型： interpretation

### P10 总结
- 目标：收束成 3-4 条 take-home messages
- 类型： summary

## 使用说明

- 有了文献后，再把 evidence-required 页面补成严格证据页。
- 在没有模板时，仍按大字号、半屏文字、可编辑数据页的目标交付标准制作。
`;
}

function buildQualityRubric() {
  return `# 交付质量判定

## 最低过线

- editable \`.pptx\` 已生成
- 标题与正文保持会场可读字号
- 无明显文字/形状/线条重叠
- 数据与证据页保持原生可编辑
- 生图页与正文页没有明显冲突

## 目标交付

- 多数页面只需轻微修改即可上会
- 图文像同一套系统，而不是后拼接
- 文字页虽然密，但仍然舒服可读
- 数据页与比较页不退化成模板风
- 没有任何一页落回稀疏 keynote 感

## 判定规则

- 若仅满足上半部分，则仍只是“最低过线”
- 默认目标应是“目标交付”
- 如出现小字体、重叠、空页感、图文脱节，应判定为未达目标交付
`;
}

function buildExecutionPrompt(manifest, extraction, skillDir) {
  const fixedPrompts = readText(path.join(skillDir, "references", "fixed-prompts.md"));
  const lines = [];
  lines.push("# 直接执行提示");
  lines.push("");
  lines.push("以下内容用于在本 skill 下直接执行，无需再次询问用户已明确的需求。");
  lines.push("");
  lines.push("## 本次项目上下文");
  lines.push("");
  if (manifest.topic) lines.push(`- 主题：${manifest.topic}`);
  if (manifest.inputs.audience) lines.push(`- 听众：${manifest.inputs.audience}`);
  if (manifest.inputs.durationMinutes) lines.push(`- 时长：${manifest.inputs.durationMinutes} 分钟`);
  lines.push(`- 输入模式：${manifest.mode}`);
  lines.push(`- 主 PPT 路由：${manifest.routing.primaryPptSkill}`);
  lines.push(`- 备选 PPT 路由：${manifest.routing.fallbackPptSkill}`);
  lines.push(`- 证据策略：${manifest.executionChoices.evidenceMode}`);
  lines.push(`- 生图策略：${manifest.executionChoices.imageMode}`);
  lines.push("");
  lines.push("## 执行要求");
  lines.push("");
  lines.push("- 若需求已明确，跳过 guided intake。");
  lines.push("- 优先使用 `pptx-tfriedel` 进行 editable PPT 生产。");
  lines.push("- 若出现小字体、重叠、版面失真或不可编辑结构，切换到 `pptx-anthropic`。");
  lines.push("- 目标不是最低过线，而是尽量达到目标交付。");
  lines.push("- 数据页、比较页、证据页保持原生 PPT 可编辑。");
  lines.push("");
  if (extraction?.outlineSummary?.sourceType === "xlsx") {
    lines.push("## 当前讲义主源");
    lines.push("");
    lines.push(`- 已抽取 ${extraction.outlineSummary.slides.length} 页逐页策划，可直接作为页面主线。`);
    lines.push("");
  }
  lines.push("## 固定 prompts");
  lines.push("");
  lines.push(fixedPrompts);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function buildImagePromptPack(manifest, skillDir) {
  const promptStandards = readText(path.join(skillDir, "references", "prompt-standards.md"));
  const lines = [];
  lines.push("# 外部生图提示包");
  lines.push("");
  lines.push("用于 NanoBanana 或其他外部 API。");
  lines.push("");
  if (manifest.inputs.benchmarkImagePath) {
    lines.push(`- 已指定视觉基准图：${manifest.inputs.benchmarkImagePath}`);
  } else {
    lines.push("- 未指定视觉基准图，默认使用 skill 内已验证的白底、扁平、学术编辑风。");
  }
  lines.push(`- 生图使用策略：${manifest.executionChoices.imageMode}`);
  lines.push("");
  lines.push(promptStandards);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function buildChecklist() {
  return `# 交付检查表

- editable \`.pptx\` 已生成
- 标题与正文保持会场可读字号
- 无明显文字/形状/线条重叠
- 数据与证据页保持原生可编辑
- 生图页与正文页属于同一视觉体系
- 未把最低过线误当成目标交付
- 如使用外部生图，已同步输出 prompt 包
`;
}

function main() {
  const args = parseArgs(process.argv);
  const skillDir = path.resolve(__dirname, "..");
  const topic = normalizeTopic(args);
  const outlinePath = resolveMaybe(args.outline);
  const templatePath = resolveMaybe(args.template);
  const literaturePath = resolveMaybe(args.literature);
  const mode = detectInputMode({ topic, outlinePath, templatePath, literaturePath });

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputDir = path.resolve(args["output-dir"] || path.join("output", `academic_ppt_run_${stamp}`));
  ensureDir(outputDir);
  const intakeDir = path.join(outputDir, "01_intake");
  const planningDir = path.join(outputDir, "02_planning");
  const promptsDir = path.join(outputDir, "03_prompts");
  const deliveryDir = path.join(outputDir, "04_delivery");
  [intakeDir, planningDir, promptsDir, deliveryDir].forEach(ensureDir);

  let extraction = null;
  if (outlinePath || templatePath || literaturePath) {
    extraction = buildExtraction(outlinePath, templatePath, literaturePath);
    fs.writeFileSync(path.join(intakeDir, "01_input_extract.json"), JSON.stringify(extraction, null, 2), "utf8");
    fs.writeFileSync(path.join(intakeDir, "01_input_extract.md"), renderMarkdown(extraction), "utf8");
  }

  const manifest = buildManifest(args, mode, extraction, outputDir);
  fs.writeFileSync(path.join(intakeDir, "00_run_manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  fs.writeFileSync(path.join(planningDir, "02_workflow_brief.md"), buildWorkflowBrief(manifest, extraction), "utf8");
  fs.writeFileSync(path.join(planningDir, "03_execution_prompt.md"), buildExecutionPrompt(manifest, extraction, skillDir), "utf8");
  if (mode === "topic_only") {
    fs.writeFileSync(path.join(planningDir, "04_topic_only_outline_seed.md"), buildTopicOnlyOutlineSeed(manifest), "utf8");
  }
  fs.writeFileSync(path.join(promptsDir, "04_image_prompt_pack.md"), buildImagePromptPack(manifest, skillDir), "utf8");
  fs.writeFileSync(path.join(deliveryDir, "05_delivery_checklist.md"), buildChecklist(), "utf8");
  fs.writeFileSync(path.join(deliveryDir, "06_quality_rubric.md"), buildQualityRubric(), "utf8");

  console.log(outputDir);
}

main();
