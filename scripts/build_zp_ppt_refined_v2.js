const path = require("path");
const PptxGenJS = require("pptxgenjs");

const ROOT = "/Users/zhw00sub/Documents/个人需要/2026个人数字化/Codex文件夹/Skills";
const OUT_FILE = path.join(ROOT, "output", "ZP-手术药物联用的其他问题思考_editable_v2.pptx");

const images = {
  cover: path.join(ROOT, "work", "generated_qwen", "cover2.png"),
  conclusion: path.join(ROOT, "work", "generated_qwen", "conclusion.png"),
};

const palette = {
  navy: "243B5A",
  navy2: "2F4D73",
  green: "516E68",
  teal: "73ABB4",
  tealLite: "E7F0F2",
  sand: "D8C7B8",
  warm: "B97C62",
  warmLite: "F6E8E2",
  band: "D8E0E2",
  soft: "F6F8F9",
  line: "CAD5DA",
  dark: "36454F",
  mute: "71808C",
  white: "FFFFFF",
};

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.company = "OpenAI";
pptx.subject = "手术药物联用的其他问题思考";
pptx.title = "手术药物联用的其他问题思考";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei",
  bodyFontFace: "Microsoft YaHei",
  lang: "zh-CN",
};

function addBase(slide, pageNo) {
  slide.background = { color: "FAFBFB" };
  slide.addShape(pptx.ShapeType.line, {
    x: 0.65, y: 7.02, w: 12.05, h: 0,
    line: { color: palette.line, width: 1 },
  });
  slide.addText(String(pageNo).padStart(2, "0"), {
    x: 12.05, y: 7.04, w: 0.45, h: 0.16,
    fontFace: "Arial", fontSize: 10.5, bold: true, color: palette.navy, align: "right", margin: 0,
  });
}

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.72, y: 7.07, w: 11.1, h: 0.16,
    fontFace: "Arial", fontSize: 8.8, color: palette.mute, margin: 0,
  });
}

function addSectionKicker(slide, text, x = 0.82, y = 0.18, w = 2.4) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.28,
    rectRadius: 0.08,
    fill: { color: palette.navy },
    line: { color: palette.navy, transparency: 100 },
  });
  slide.addText(text, {
    x: x + 0.1, y: y + 0.06, w: w - 0.2, h: 0.12,
    fontFace: "Arial", fontSize: 9.2, bold: true, color: palette.white, margin: 0, align: "center",
  });
}

function addTopBand(slide, title, rightNote = "") {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0.48, w: 13.33, h: 1.28,
    fill: { color: palette.band },
    line: { color: palette.band, transparency: 100 },
  });
  slide.addText(title, {
    x: 0.9, y: 0.88, w: 6.8, h: 0.38,
    fontFace: "Microsoft YaHei", fontSize: 28, bold: true, color: palette.navy, margin: 0,
  });
  if (rightNote) {
    slide.addText(rightNote, {
      x: 8.15, y: 0.8, w: 4.0, h: 0.56,
      fontFace: "Microsoft YaHei", fontSize: 17.8, bold: true, color: palette.green, margin: 0,
    });
  }
}

function addCard(slide, x, y, w, h, fill = palette.white, line = palette.line, radius = 0.06) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, width: 1.05 },
    shadow: { type: "outer", color: "B9C3C8", blur: 1, angle: 45, distance: 1, opacity: 0.12 },
  });
}

function addMiniCard(slide, title, body, x, y, w, h, accent = palette.teal) {
  addCard(slide, x, y, w, h, palette.white);
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 0.08, h,
    fill: { color: accent },
    line: { color: accent, transparency: 100 },
  });
  slide.addText(title, {
    x: x + 0.18, y: y + 0.12, w: w - 0.28, h: 0.18,
    fontFace: "Microsoft YaHei", fontSize: 15.8, bold: true, color: palette.navy, margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18, y: y + 0.37, w: w - 0.28, h: h - 0.46,
    fontFace: "Microsoft YaHei", fontSize: 12.8, color: palette.dark, margin: 0, valign: "mid",
  });
}

function addBullets(slide, lines, x, y, w, fontSize = 16.7, gap = 0.56, bulletColor = palette.green) {
  lines.forEach((line, idx) => {
    const yy = y + idx * gap;
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: yy + 0.13, w: 0.085, h: 0.085,
      fill: { color: bulletColor },
      line: { color: bulletColor, transparency: 100 },
    });
    slide.addText(line, {
      x: x + 0.15, y: yy, w, h: 0.32,
      fontFace: "Microsoft YaHei", fontSize, color: palette.dark, margin: 0,
    });
  });
}

function addTakeaway(slide, text, x, y, w, h = 0.7) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.06,
    fill: { color: palette.navy },
    line: { color: palette.navy, transparency: 100 },
  });
  slide.addText(text, {
    x: x + 0.18, y: y + 0.21, w: w - 0.36, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 17, bold: true, color: palette.white, margin: 0, align: "center",
  });
}

function addImageSlot(slide, x, y, w, h, title, desc, accent = palette.teal) {
  addCard(slide, x, y, w, h, palette.white, palette.line, 0.06);
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h: 0.12,
    fill: { color: accent },
    line: { color: accent, transparency: 100 },
  });
  slide.addText(title, {
    x: x + 0.22, y: y + 0.18, w: w - 0.44, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 17, bold: true, color: palette.navy, margin: 0, align: "center",
  });
  slide.addShape(pptx.ShapeType.line, {
    x: x + 0.6, y: y + 0.72, w: w - 1.2, h: h - 1.34,
    line: { color: palette.line, width: 1.2, dash: "dash" },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: x + 0.6, y: y + h - 0.62, w: w - 1.2, h: -(h - 1.34),
    line: { color: palette.line, width: 1.2, dash: "dash" },
  });
  slide.addText(desc, {
    x: x + 0.28, y: y + h - 0.56, w: w - 0.56, h: 0.3,
    fontFace: "Microsoft YaHei", fontSize: 12.2, color: palette.mute, margin: 0, align: "center",
  });
  slide.addText("NanoBanana image slot", {
    x: x + 0.25, y: y + h / 2 - 0.12, w: w - 0.5, h: 0.22,
    fontFace: "Arial", fontSize: 14, color: accent, italic: true, margin: 0, align: "center",
  });
}

function slide1() {
  const s = pptx.addSlide();
  addBase(s, 1);
  addSectionKicker(s, "POST-CONSENSUS DISCUSSION");
  s.addText("手术药物联用的\n其他问题思考", {
    x: 0.82, y: 1.05, w: 5.4, h: 1.25,
    fontFace: "Microsoft YaHei", fontSize: 28.5, bold: true, color: palette.navy, margin: 0,
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0.82, y: 2.52, w: 0.86, h: 0.07,
    fill: { color: palette.teal },
    line: { color: palette.teal, transparency: 100 },
  });
  addCard(s, 0.82, 2.8, 5.65, 2.18, palette.tealLite, palette.line);
  s.addText("联用方向正在逐渐明确，但真正决定其临床价值的，仍是患者分层、干预时机、疗程策略、疗效评价、安全性边界与真实世界路径建设。", {
    x: 1.08, y: 3.18, w: 5.08, h: 1.3,
    fontFace: "Microsoft YaHei", fontSize: 19.2, color: palette.navy, bold: true, margin: 0, valign: "mid",
  });
  const kws = ["分层", "时机", "疗程", "终点", "安全性", "路径"];
  kws.forEach((kw, idx) => {
    const xx = 0.84 + (idx % 3) * 1.8;
    const yy = 5.22 + Math.floor(idx / 3) * 0.56;
    s.addShape(pptx.ShapeType.roundRect, {
      x: xx, y: yy, w: 1.58, h: 0.38,
      rectRadius: 0.08,
      fill: { color: idx < 3 ? palette.white : palette.soft },
      line: { color: palette.line, width: 1 },
    });
    s.addText(kw, {
      x: xx, y: yy + 0.1, w: 1.58, h: 0.14,
      fontFace: "Microsoft YaHei", fontSize: 14, bold: true, color: palette.green, margin: 0, align: "center",
    });
  });
  s.addImage({ path: images.cover, x: 6.92, y: 0.98, w: 5.72, h: 5.2 });
  addFooter(s, "");
}

function slide2() {
  const s = pptx.addSlide();
  addBase(s, 2);
  addTopBand(s, "共识之后，问题并没有结束", "共识是起点\n不是终局");
  addMiniCard(s, "方向", "共识解决了方向问题，不等于路径已经成熟。", 0.78, 2.06, 2.72, 1.12, palette.teal);
  addMiniCard(s, "边界", "真正影响临床落地的，往往是边界而不是态度。", 3.68, 2.06, 2.72, 1.12, palette.green);
  addMiniCard(s, "时机", "联用何时启动，本质上决定它是前移管理还是事后补救。", 0.78, 3.38, 2.72, 1.22, palette.warm);
  addMiniCard(s, "路径", "讨论重点应从“能不能联用”转向“怎样把联用真正做对”。", 3.68, 3.38, 2.72, 1.22, palette.teal);
  addTakeaway(s, "从“能不能联用”转向“怎样把联用真正做对”。", 0.8, 5.0, 5.66, 0.74);
  addImageSlot(s, 6.84, 2.02, 5.56, 3.88, "四模块概念图位", "用于替换为 NanoBanana 生成的“方向-边界-时机-路径”结构图", palette.teal);
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Pedersen SD et al., 2025");
}

function slide3() {
  const s = pptx.addSlide();
  addBase(s, 3);
  addTopBand(s, "患者分层，仍是联用的起点难题", "谁该联用？");
  addImageSlot(s, 0.86, 2.02, 4.5, 4.32, "患者分层主图位", "用于替换为患者分层漏斗图或分型结构图", palette.green);
  addBullets(s, [
    "联用不是普遍加法，而是筛选问题。",
    "哪些患者值得早期联用，而不是失败后补救？",
    "哪些患者不应轻率进入联用路径？",
    "高 BMI、代谢异常明显、复重风险高、行为控制差等表型，是否应区别对待？",
    "目前仍缺少简明、可推广的联用分层模型。",
  ], 5.72, 2.3, 6.0, 16.3, 0.68, palette.teal);
  addTakeaway(s, "没有分层，联用就只能停留在经验判断。", 5.72, 5.62, 6.08, 0.68);
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Tan YW et al., 2025; Salminen P et al., 2024");
}

function slide4() {
  const s = pptx.addSlide();
  addBase(s, 4);
  addTopBand(s, "时机选择，决定联用是前移管理还是事后补救", "时机不同\n目标不同");
  s.addText("联用价值，很大程度上取决于时机，而不是药物本身。", {
    x: 0.9, y: 1.95, w: 6.0, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: palette.navy, margin: 0,
  });
  addCard(s, 9.25, 1.9, 2.9, 0.96, palette.warmLite, palette.line);
  s.addText("术前桥接、术后早期、术后远期介入，面对的是不同目标。", {
    x: 9.5, y: 2.2, w: 2.4, h: 0.38,
    fontFace: "Microsoft YaHei", fontSize: 14.5, bold: true, color: palette.warm, margin: 0, align: "center",
  });
  addImageSlot(s, 0.92, 2.58, 11.22, 2.98, "时机路径主图位", "用于替换为术前评估-围术期-术后早期-术后远期的 NanoBanana 时间轴图", palette.teal);
  addBullets(s, [
    "术前桥接何时启动更合理？",
    "术后何时介入才算“及时”？",
    "是等复重后再处理，还是在高风险信号出现时前移干预？",
  ], 1.15, 5.88, 10.2, 14.3, 0.46, palette.green);
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Pedersen SD et al., 2025; Dutta D et al., 2024");
}

function slide5() {
  const s = pptx.addSlide();
  addBase(s, 5);
  addTopBand(s, "疗程与停药策略，是现实中最棘手的问题之一", "联用多久？");
  addImageSlot(s, 0.86, 2.04, 4.65, 4.3, "疗程阶段主图位", "用于替换为起始治疗-达标-维持-停药/复启流程图", palette.teal);
  [
    "联用是阶段性工具，还是长期慢病管理的一部分？",
    "达标后能否停药？",
    "停药后反弹怎么办？",
    "长期维持是否需要持续或间断治疗？",
    "依从性、负担和临床目标如何平衡？",
  ].forEach((q, idx) => {
    addMiniCard(s, `Q${idx + 1}`, q, 5.8, 2.1 + idx * 0.76, 6.36, 0.58, idx === 2 ? palette.warm : palette.teal);
  });
  addFooter(s, "Cohen RV et al., 2024; Pedersen SD et al., 2025; Tan YW et al., 2025; Kanai R et al., 2024");
}

function slide6() {
  const s = pptx.addSlide();
  addBase(s, 6);
  addTopBand(s, "没有合适终点，就很难真正评价联用价值", "评价什么\n才算成功？");
  addImageSlot(s, 0.86, 2.04, 4.85, 4.18, "终点结构主图位", "用于替换为长期获益中心 + 体重/代谢/并发症/营养/生活质量结构图", palette.green);
  addBullets(s, [
    "成功是看额外减重，还是看代谢改善？",
    "是否应把脂肪肝、并发症控制、生活质量一起纳入？",
    "术后减重不足与复重如何定义？",
    "短期下降并不一定等于长期获益。",
    "如果成功标准不清，联用价值就始终难以比较。",
  ], 6.02, 2.35, 5.9, 16.1, 0.66, palette.teal);
  addTakeaway(s, "定义不统一，研究证据和患者管理都会碎片化。", 6.0, 5.56, 5.95, 0.7);
  addFooter(s, "Haddad A et al., 2024; Salminen P et al., 2024; Reis MG et al., 2024");
}

function slide7() {
  const s = pptx.addSlide();
  addBase(s, 7);
  addTopBand(s, "联用不是简单叠加，长期安全性不能被忽视", "外科视角下的\n风险边界");
  addImageSlot(s, 0.86, 2.04, 4.75, 4.26, "长期安全性主图位", "用于替换为营养-蛋白/肌量-骨代谢-胃肠耐受-长期依从性风险结构图", palette.warm);
  addBullets(s, [
    "多减几公斤，不应以牺牲长期营养和安全为代价。",
    "食欲进一步抑制后，营养不足风险会不会放大？",
    "蛋白、微量营养素、肌肉量和骨代谢问题是否会更突出？",
    "胃肠道反应与术后解剖改变是否叠加？",
    "长期耐受性与随访监测如何落实？",
  ], 5.95, 2.36, 5.8, 15.8, 0.64, palette.warm);
  addFooter(s, "Tan YW et al., 2025; Dutta D et al., 2024; Kanai R et al., 2024; Calik Basaran N et al., 2025");
}

function slide8() {
  const s = pptx.addSlide();
  addBase(s, 8);
  addTopBand(s, "从理念到路径，真实世界仍有很多断点", "路径决定落地");
  s.addText("联用能否成功，最后取决于路径，而不是表态。", {
    x: 0.92, y: 1.94, w: 5.8, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: palette.navy, margin: 0,
  });
  addImageSlot(s, 0.92, 2.44, 11.2, 2.92, "真实世界路径断点主图位", "用于替换为初诊评估-手术-术后随访-长期管理流程中的五个断点图", palette.teal);
  [
    "患者仍常把手术和药物看成二选一",
    "支付和可及性限制长期联用",
    "随访断裂、依从性波动大",
    "MDT 有名义，未必有路径",
    "科室协作、门诊流程、数据记录仍不统一",
  ].forEach((line, idx) => {
    addMiniCard(s, `断点 ${idx + 1}`, line, 0.92 + idx * 2.22, 5.74, 2.04, 0.64, idx === 1 || idx === 3 ? palette.warm : palette.teal);
  });
  addFooter(s, "Cohen RV et al., 2024; Pedersen SD et al., 2025");
}

function slide9() {
  const s = pptx.addSlide();
  addBase(s, 9);
  addSectionKicker(s, "TAKE-HOME MESSAGES", 0.82, 0.26, 2.05);
  s.addText("联用的未来，取决于把问题真正解决", {
    x: 0.84, y: 0.95, w: 6.55, h: 0.42,
    fontFace: "Microsoft YaHei", fontSize: 29, bold: true, color: palette.navy, margin: 0,
  });
  addCard(s, 0.88, 1.78, 6.12, 2.12, palette.tealLite, palette.line);
  s.addText("手术药物联用的价值，最终不取决于理念是否先进，而取决于这些关键问题能否被真正回答。", {
    x: 1.18, y: 2.3, w: 5.56, h: 1.02,
    fontFace: "Microsoft YaHei", fontSize: 20.8, bold: true, color: palette.navy, margin: 0, align: "center", valign: "mid",
  });
  s.addImage({ path: images.conclusion, x: 7.32, y: 1.82, w: 5.02, h: 3.1 });
  ["分层", "时机", "疗程", "终点", "安全性", "路径"].forEach((kw, idx) => {
    addCard(s, 0.92 + idx * 1.95, 5.42, 1.74, 0.72, idx === 2 || idx === 4 ? palette.warmLite : palette.white, idx === 2 || idx === 4 ? palette.warm : palette.line);
    s.addText(kw, {
      x: 0.92 + idx * 1.95, y: 5.68, w: 1.74, h: 0.16,
      fontFace: "Microsoft YaHei", fontSize: 14.2, bold: true, color: idx === 2 || idx === 4 ? palette.warm : palette.navy, margin: 0, align: "center",
    });
  });
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Pedersen SD et al., 2025");
}

async function main() {
  slide1();
  slide2();
  slide3();
  slide4();
  slide5();
  slide6();
  slide7();
  slide8();
  slide9();
  await pptx.writeFile({ fileName: OUT_FILE });
  console.log(OUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
