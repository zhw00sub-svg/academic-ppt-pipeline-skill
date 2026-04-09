const path = require("path");
const PptxGenJS = require("pptxgenjs");

const ROOT = "/Users/zhw00sub/Documents/个人需要/2026个人数字化/Codex文件夹/Skills";
const OUT_FILE = path.join(ROOT, "output", "ZP-手术药物联用的其他问题思考_editable_v1.pptx");

const images = {
  cover: path.join(ROOT, "work", "generated_qwen", "cover2.png"),
  refPage: path.join(ROOT, "work", "ref_good_materials.png"),
};

const refs = {
  1: "Cohen RV et al., 2024",
  2: "Haddad A et al., 2024",
  3: "Pedersen SD et al., 2025",
  4: "Tan YW et al., 2025",
  5: "Salminen P et al., 2024",
  6: "Dutta D et al., 2024",
  7: "Kanai R et al., 2024",
  8: "Reis MG et al., 2024",
  9: "Calik Basaran N et al., 2025",
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
  black: "1F1F1F",
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

function addTopBand(slide, title, rightNote = "") {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0.48, w: 13.33, h: 1.28,
    fill: { color: palette.band },
    line: { color: palette.band, transparency: 100 },
  });
  slide.addText(title, {
    x: 0.9, y: 0.88, w: 6.7, h: 0.38,
    fontFace: "Microsoft YaHei", fontSize: 28, bold: true, color: palette.navy, margin: 0,
  });
  if (rightNote) {
    slide.addText(rightNote, {
      x: 8.0, y: 0.78, w: 4.2, h: 0.62,
      fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: palette.green,
      align: "left", valign: "mid", margin: 0,
    });
  }
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

function addCard(slide, x, y, w, h, fill = palette.white, line = palette.line, radius = 0.06) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: fill },
    line: { color: line, width: 1.1 },
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
    x: x + 0.18, y: y + 0.12, w: w - 0.28, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 16.2, bold: true, color: palette.navy, margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18, y: y + 0.42, w: w - 0.28, h: h - 0.52,
    fontFace: "Microsoft YaHei", fontSize: 13.3, color: palette.dark, margin: 0, valign: "mid",
  });
}

function addBullets(slide, lines, x, y, w, h, fontSize = 17.2, color = palette.dark, gap = 0.46, bulletColor = palette.green) {
  lines.forEach((line, idx) => {
    const yy = y + idx * gap;
    slide.addShape(pptx.ShapeType.ellipse, {
      x, y: yy + 0.13, w: 0.085, h: 0.085,
      fill: { color: bulletColor },
      line: { color: bulletColor, transparency: 100 },
    });
    slide.addText(line, {
      x: x + 0.15, y: yy, w, h,
      fontFace: "Microsoft YaHei", fontSize, color, margin: 0,
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
    fontFace: "Microsoft YaHei", fontSize: 17.2, bold: true, color: palette.white, margin: 0, align: "center",
  });
}

function addRefBadges(slide, refNos, x, y, w) {
  const items = refNos.map((n) => refs[n]);
  const badgeW = w / items.length - 0.06;
  items.forEach((item, idx) => {
    const xx = x + idx * (badgeW + 0.06);
    addCard(slide, xx, y, badgeW, 0.54, palette.soft, palette.line, 0.04);
    slide.addText(item, {
      x: xx + 0.08, y: y + 0.17, w: badgeW - 0.16, h: 0.16,
      fontFace: "Arial", fontSize: 8.7, color: palette.navy, margin: 0, align: "center",
    });
  });
}

function slide1() {
  const s = pptx.addSlide();
  addBase(s, 1);
  addSectionKicker(s, "POST-CONSENSUS DISCUSSION");

  s.addText("手术药物联用的\n其他问题思考", {
    x: 0.82, y: 1.02, w: 5.35, h: 1.3,
    fontFace: "Microsoft YaHei", fontSize: 28.5, bold: true, color: palette.navy, margin: 0,
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0.82, y: 2.52, w: 0.86, h: 0.07,
    fill: { color: palette.teal },
    line: { color: palette.teal, transparency: 100 },
  });
  addCard(s, 0.82, 2.82, 5.55, 2.04, palette.tealLite, palette.line);
  s.addText("联用方向正在逐渐明确，但真正决定其临床价值的，仍是患者分层、干预时机、疗程策略、疗效评价、安全性边界与真实世界路径建设。", {
    x: 1.06, y: 3.18, w: 5.05, h: 1.25,
    fontFace: "Microsoft YaHei", fontSize: 19.2, color: palette.navy, bold: true, margin: 0, valign: "mid",
  });
  const kws = ["分层", "时机", "疗程", "终点", "安全性", "路径"];
  kws.forEach((kw, idx) => {
    const xx = 0.84 + (idx % 3) * 1.76;
    const yy = 5.18 + Math.floor(idx / 3) * 0.56;
    s.addShape(pptx.ShapeType.roundRect, {
      x: xx, y: yy, w: 1.55, h: 0.38,
      rectRadius: 0.08,
      fill: { color: idx < 3 ? palette.white : palette.soft },
      line: { color: palette.line, width: 1 },
    });
    s.addText(kw, {
      x: xx, y: yy + 0.1, w: 1.55, h: 0.14,
      fontFace: "Microsoft YaHei", fontSize: 14.2, bold: true, color: palette.green, margin: 0, align: "center",
    });
  });
  s.addText("共识之后，真正棘手的问题，才开始进入临床决策。", {
    x: 0.84, y: 6.1, w: 5.58, h: 0.26,
    fontFace: "Microsoft YaHei", fontSize: 15.2, color: palette.mute, margin: 0,
  });
  s.addImage({ path: images.cover, x: 6.8, y: 0.85, w: 5.95, h: 5.5 });
  addFooter(s, "");
}

function slide2() {
  const s = pptx.addSlide();
  addBase(s, 2);
  addTopBand(s, "共识之后，问题并没有结束", "共识是起点\n不是终局");

  addMiniCard(s, "方向", "共识解决了方向问题，不等于路径已经成熟。", 0.78, 2.08, 2.8, 1.22, palette.teal);
  addMiniCard(s, "边界", "真正影响临床落地的，往往是边界而不是态度。", 3.76, 2.08, 2.8, 1.22, palette.green);
  addMiniCard(s, "时机", "联用何时启动，本质上决定它是前移管理还是事后补救。", 0.78, 3.52, 2.8, 1.32, palette.warm);
  addMiniCard(s, "路径", "讨论重点应从“能不能联用”转向“怎样把联用真正做对”。", 3.76, 3.52, 2.8, 1.32, palette.teal);

  addCard(s, 6.95, 2.06, 5.58, 2.64, palette.white);
  s.addText("国际共识已经把联用从经验性尝试推进到了正式讨论，但并不意味着所有关键问题都已有高等级答案。真正棘手的部分，恰恰是后面的临床落地问题：谁该联用、何时联用、联用多久、如何评价成功，以及如何避免新的风险和新的管理断点。", {
    x: 7.28, y: 2.42, w: 4.96, h: 1.65,
    fontFace: "Microsoft YaHei", fontSize: 16.8, color: palette.dark, margin: 0, valign: "mid",
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 6.95, y: 5.08, w: 5.58, h: 0.9,
    fill: { color: palette.soft },
    line: { color: palette.line, width: 1 },
  });
  s.addText("讨论重点应从“能不能联用”转向“怎样把联用真正做对”。", {
    x: 7.2, y: 5.36, w: 5.08, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: palette.navy, margin: 0, align: "center",
  });
  addRefBadges(s, [1, 2, 3], 0.82, 6.18, 11.4);
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Pedersen SD et al., 2025");
}

function slide3() {
  const s = pptx.addSlide();
  addBase(s, 3);
  addTopBand(s, "患者分层，仍是联用的起点难题", "谁该联用？");

  const funnel = [
    { label: "术后患者总体", w: 3.7, fill: "DCEBED" },
    { label: "高复重风险", w: 3.18, fill: "CFE2E5" },
    { label: "减重不足", w: 2.66, fill: "BDD8DE" },
    { label: "代谢未达标", w: 2.18, fill: "AFCED6" },
    { label: "行为控制问题", w: 1.76, fill: "93BBC7" },
  ];
  funnel.forEach((it, idx) => {
    const x = 0.92 + (3.7 - it.w) / 2;
    const y = 2.15 + idx * 0.62;
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: it.w, h: 0.46,
      rectRadius: 0.05,
      fill: { color: it.fill },
      line: { color: palette.white, width: 0.8 },
    });
    s.addText(it.label, {
      x, y: y + 0.12, w: it.w, h: 0.12,
      fontFace: "Microsoft YaHei", fontSize: 14.2, bold: idx < 2, color: palette.navy, margin: 0, align: "center",
    });
  });
  s.addText("联用不是普遍加法，而是筛选问题。", {
    x: 0.92, y: 5.55, w: 3.7, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 17, bold: true, color: palette.green, margin: 0, align: "center",
  });

  addCard(s, 4.95, 2.05, 7.45, 3.95, palette.white);
  addBullets(s, [
    "哪些患者值得早期联用，而不是失败后补救？",
    "哪些患者不应轻率进入联用路径？",
    "高 BMI、代谢异常明显、复重风险高、行为控制差等表型，是否应区别对待？",
    "目前仍缺少简明、可推广的联用分层模型。",
  ], 5.24, 2.46, 6.7, 0.3, 16.9, palette.dark, 0.7, palette.teal);

  addTakeaway(s, "没有分层，联用就只能停留在经验判断。", 5.2, 5.28, 6.9, 0.76);
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Tan YW et al., 2025; Salminen P et al., 2024");
}

function slide4() {
  const s = pptx.addSlide();
  addBase(s, 4);
  addTopBand(s, "时机选择，决定联用是前移管理还是事后补救", "时机不同\n目标不同");

  s.addText("联用价值，很大程度上取决于时机，而不是药物本身。", {
    x: 0.9, y: 1.95, w: 6.1, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: palette.navy, margin: 0,
  });
  s.addShape(pptx.ShapeType.line, {
    x: 1.1, y: 4.2, w: 10.6, h: 0,
    line: { color: palette.navy2, width: 2.5 },
  });
  const stages = [
    ["术前评估", "桥接与高风险优化"],
    ["围术期", "围手术期稳定与风险控制"],
    ["术后早期", "平台期或减重不足前移干预"],
    ["术后远期", "复重与代谢反弹管理"],
  ];
  stages.forEach((st, idx) => {
    const cx = 1.55 + idx * 3.45;
    s.addShape(pptx.ShapeType.ellipse, {
      x: cx, y: 3.92, w: 0.52, h: 0.52,
      fill: { color: idx === 2 ? palette.warm : palette.teal },
      line: { color: palette.white, width: 1.5 },
    });
    addCard(s, cx - 0.52, 2.55, 1.55, 0.82, idx % 2 === 0 ? palette.tealLite : palette.white);
    s.addText(st[0], {
      x: cx - 0.44, y: 2.84, w: 1.38, h: 0.16,
      fontFace: "Microsoft YaHei", fontSize: 15.1, bold: true, color: palette.navy, margin: 0, align: "center",
    });
    s.addText(st[1], {
      x: cx - 0.95, y: 4.62, w: 2.45, h: 0.56,
      fontFace: "Microsoft YaHei", fontSize: 13.2, color: palette.dark, margin: 0, align: "center",
    });
  });
  addCard(s, 9.38, 1.95, 2.92, 0.94, palette.warmLite, palette.line);
  s.addText("等复重后再处理，还是在高风险信号出现时前移干预？", {
    x: 9.66, y: 2.23, w: 2.36, h: 0.38,
    fontFace: "Microsoft YaHei", fontSize: 14.6, bold: true, color: palette.warm, margin: 0, align: "center",
  });
  addTakeaway(s, "临床上最怕的，不是没有药，而是在错误时间点把正确工具用了出来。", 1.02, 5.98, 11.0, 0.74);
  addFooter(s, "Cohen RV et al., 2024; Haddad A et al., 2024; Pedersen SD et al., 2025; Dutta D et al., 2024");
}

function slide5() {
  const s = pptx.addSlide();
  addBase(s, 5);
  addTopBand(s, "疗程与停药策略，是现实中最棘手的问题之一", "联用多久？");

  addCard(s, 0.85, 2.02, 4.05, 4.32, palette.soft);
  s.addText("治疗阶段", {
    x: 1.15, y: 2.24, w: 1.35, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 20, bold: true, color: palette.navy, margin: 0,
  });
  const stageBoxes = ["起始治疗", "达标调整", "长期维持", "停药 / 复启"];
  stageBoxes.forEach((label, idx) => {
    const yy = 2.8 + idx * 0.76;
    s.addShape(pptx.ShapeType.roundRect, {
      x: 1.15, y: yy, w: 1.7, h: 0.46,
      rectRadius: 0.08,
      fill: { color: idx === 3 ? palette.warmLite : palette.white },
      line: { color: palette.line, width: 1 },
    });
    s.addText(label, {
      x: 1.15, y: yy + 0.13, w: 1.7, h: 0.12,
      fontFace: "Microsoft YaHei", fontSize: 14.4, bold: true, color: idx === 3 ? palette.warm : palette.navy, margin: 0, align: "center",
    });
    if (idx < stageBoxes.length - 1) {
      s.addShape(pptx.ShapeType.chevron, {
        x: 1.76, y: yy + 0.5, w: 0.48, h: 0.18,
        fill: { color: palette.teal },
        line: { color: palette.teal, transparency: 100 },
        rotate: 90,
      });
    }
  });
  s.addText("很多路径不是败在起始治疗，而是败在维持阶段。", {
    x: 1.08, y: 5.98, w: 3.28, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 16, bold: true, color: palette.green, margin: 0, align: "center",
  });

  s.addShape(pptx.ShapeType.line, {
    x: 5.18, y: 2.15, w: 0, h: 4.08,
    line: { color: palette.line, width: 1.5, dash: "dash" },
  });
  s.addText("临床追问", {
    x: 5.55, y: 2.24, w: 1.5, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 20, bold: true, color: palette.navy, margin: 0,
  });
  [
    "联用是阶段性工具，还是长期慢病管理的一部分？",
    "达标后能否停药？",
    "停药后反弹怎么办？",
    "长期维持是否需要持续或间断治疗？",
    "依从性、负担和临床目标如何平衡？",
  ].forEach((q, idx) => {
    addMiniCard(s, `Q${idx + 1}`, q, 5.55, 2.72 + idx * 0.7, 6.62, 0.54, idx === 2 ? palette.warm : palette.teal);
  });
  s.addShape(pptx.ShapeType.arc, {
    x: 9.55, y: 5.3, w: 1.35, h: 0.6,
    line: { color: palette.warm, width: 2 },
    fill: { color: "FFFFFF", transparency: 100 },
    adjustPoint: 0.2,
  });
  addFooter(s, "Cohen RV et al., 2024; Pedersen SD et al., 2025; Tan YW et al., 2025; Kanai R et al., 2024");
}

function slide6() {
  const s = pptx.addSlide();
  addBase(s, 6);
  addTopBand(s, "没有合适终点，就很难真正评价联用价值", "评价什么\n才算成功？");

  s.addShape(pptx.ShapeType.ellipse, {
    x: 1.6, y: 3.0, w: 2.0, h: 2.0,
    fill: { color: palette.navy },
    line: { color: palette.navy, transparency: 100 },
  });
  s.addText("长期获益", {
    x: 1.6, y: 3.74, w: 2.0, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 20, bold: true, color: palette.white, margin: 0, align: "center",
  });
  const orbit = [
    ["体重", 0.92, 2.5],
    ["代谢", 3.65, 2.52],
    ["并发症", 4.08, 4.18],
    ["营养", 2.58, 5.1],
    ["生活质量", 0.88, 4.18],
  ];
  orbit.forEach(([label, x, y], idx) => {
    s.addShape(pptx.ShapeType.line, {
      x: 2.6, y: 4.0, w: x + 0.62 - 2.6, h: y + 0.32 - 4.0,
      line: { color: palette.line, width: 1.2 },
    });
    s.addShape(pptx.ShapeType.ellipse, {
      x, y, w: idx === 4 ? 1.18 : 1.02, h: 0.66,
      fill: { color: idx % 2 === 0 ? palette.tealLite : palette.white },
      line: { color: palette.line, width: 1 },
    });
    s.addText(label, {
      x, y: y + 0.22, w: idx === 4 ? 1.18 : 1.02, h: 0.14,
      fontFace: "Microsoft YaHei", fontSize: 13.6, bold: true, color: palette.navy, margin: 0, align: "center",
    });
  });

  addCard(s, 5.55, 2.06, 6.72, 3.92, palette.white);
  addBullets(s, [
    "成功是看额外减重，还是看代谢改善？",
    "是否应把脂肪肝、并发症控制、生活质量一起纳入？",
    "术后减重不足与复重如何定义？",
    "短期下降并不一定等于长期获益。",
    "如果成功标准不清，联用价值就始终难以比较。",
  ], 5.88, 2.42, 6.0, 0.26, 16.3, palette.dark, 0.62, palette.green);
  addTakeaway(s, "定义不统一，研究证据和患者管理都会碎片化。", 5.82, 5.38, 5.9, 0.68);
  addRefBadges(s, [2, 5, 8], 0.92, 6.12, 11.3);
  addFooter(s, "Haddad A et al., 2024; Salminen P et al., 2024; Reis MG et al., 2024");
}

function slide7() {
  const s = pptx.addSlide();
  addBase(s, 7);
  addTopBand(s, "联用不是简单叠加，长期安全性不能被忽视", "外科视角下的\n风险边界");

  s.addShape(pptx.ShapeType.ellipse, {
    x: 1.88, y: 3.05, w: 1.8, h: 1.8,
    fill: { color: palette.navy2 },
    line: { color: palette.navy2, transparency: 100 },
  });
  s.addText("长期\n安全性", {
    x: 1.88, y: 3.55, w: 1.8, h: 0.6,
    fontFace: "Microsoft YaHei", fontSize: 19, bold: true, color: palette.white, margin: 0, align: "center",
  });
  const risks = [
    ["营养不足", 1.2, 2.18],
    ["蛋白 / 肌量", 3.42, 2.22],
    ["骨代谢", 4.05, 4.0],
    ["胃肠耐受", 2.45, 5.0],
    ["长期依从性", 0.82, 4.05],
  ];
  risks.forEach(([label, x, y], idx) => {
    s.addShape(pptx.ShapeType.line, {
      x: 2.78, y: 3.95, w: x + 0.66 - 2.78, h: y + 0.3 - 3.95,
      line: { color: palette.line, width: 1.2 },
    });
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: label.length > 4 ? 1.42 : 1.12, h: 0.54,
      rectRadius: 0.05,
      fill: { color: idx === 0 || idx === 2 ? palette.warmLite : palette.white },
      line: { color: idx === 0 || idx === 2 ? palette.warm : palette.line, width: 1 },
    });
    s.addText(label, {
      x, y: y + 0.18, w: label.length > 4 ? 1.42 : 1.12, h: 0.12,
      fontFace: "Microsoft YaHei", fontSize: 12.8, bold: true, color: idx === 0 || idx === 2 ? palette.warm : palette.navy, margin: 0, align: "center",
    });
  });
  addCard(s, 5.3, 2.02, 6.98, 4.16, palette.white);
  addBullets(s, [
    "多减几公斤，不应以牺牲长期营养和安全为代价。",
    "食欲进一步抑制后，营养不足风险会不会放大？",
    "蛋白、微量营养素、肌肉量和骨代谢问题是否会更突出？",
    "胃肠道反应与术后解剖改变是否叠加？",
    "长期耐受性与随访监测如何落实？",
  ], 5.62, 2.45, 6.2, 0.28, 16, palette.dark, 0.64, palette.warm);
  s.addShape(pptx.ShapeType.rect, {
    x: 5.56, y: 5.56, w: 6.1, h: 0.42,
    fill: { color: palette.warmLite },
    line: { color: palette.warmLite, transparency: 100 },
  });
  s.addText("如果只盯着体重下降，而不看营养和长期安全，联用的初衷就会被扭曲。", {
    x: 5.82, y: 5.67, w: 5.58, h: 0.16,
    fontFace: "Microsoft YaHei", fontSize: 14.4, bold: true, color: palette.warm, margin: 0, align: "center",
  });
  addRefBadges(s, [4, 6, 7, 9], 0.92, 6.16, 11.38);
  addFooter(s, "Tan YW et al., 2025; Dutta D et al., 2024; Kanai R et al., 2024; Calik Basaran N et al., 2025");
}

function slide8() {
  const s = pptx.addSlide();
  addBase(s, 8);
  addTopBand(s, "从理念到路径，真实世界仍有很多断点", "路径决定落地");

  s.addText("联用能否成功，最后取决于路径，而不是表态。", {
    x: 0.92, y: 1.95, w: 5.8, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 18, bold: true, color: palette.navy, margin: 0,
  });
  s.addShape(pptx.ShapeType.line, {
    x: 1.08, y: 4.15, w: 10.95, h: 0,
    line: { color: palette.navy2, width: 2.2 },
  });
  const nodes = [
    ["初诊评估", 1.15],
    ["手术决策", 3.55],
    ["围术管理", 5.95],
    ["术后随访", 8.35],
    ["长期管理", 10.75],
  ];
  nodes.forEach(([label, x], idx) => {
    s.addShape(pptx.ShapeType.ellipse, {
      x, y: 3.88, w: 0.48, h: 0.48,
      fill: { color: idx === 0 || idx === 4 ? palette.green : palette.teal },
      line: { color: palette.white, width: 1.4 },
    });
    addCard(s, x - 0.52, 2.55, 1.52, 0.76, idx % 2 === 0 ? palette.white : palette.tealLite);
    s.addText(label, {
      x: x - 0.45, y: 2.82, w: 1.38, h: 0.16,
      fontFace: "Microsoft YaHei", fontSize: 14.2, bold: true, color: palette.navy, margin: 0, align: "center",
    });
  });
  const breaks = [
    ["认知断点", 2.25, 4.68],
    ["支付断点", 4.65, 5.18],
    ["依从性断点", 7.05, 4.68],
    ["协作断点", 9.45, 5.18],
    ["数据断点", 11.3, 4.68],
  ];
  breaks.forEach(([label, x, y]) => {
    s.addShape(pptx.ShapeType.chevron, {
      x: x - 0.15, y: y - 0.42, w: 0.34, h: 0.18,
      fill: { color: palette.warm },
      line: { color: palette.warm, transparency: 100 },
      rotate: 90,
    });
    addCard(s, x - 0.62, y, 1.28, 0.52, palette.warmLite, palette.warm, 0.04);
    s.addText(label, {
      x: x - 0.58, y: y + 0.18, w: 1.2, h: 0.12,
      fontFace: "Microsoft YaHei", fontSize: 12.6, bold: true, color: palette.warm, margin: 0, align: "center",
    });
  });
  addCard(s, 0.92, 5.78, 11.22, 0.56, palette.soft);
  s.addText("患者仍常把手术和药物看成二选一；支付与可及性限制长期联用；随访、协作与数据记录则决定长期效果能否被维持。", {
    x: 1.12, y: 5.96, w: 10.82, h: 0.16,
    fontFace: "Microsoft YaHei", fontSize: 14.3, color: palette.dark, margin: 0, align: "center",
  });
  addFooter(s, "Cohen RV et al., 2024; Pedersen SD et al., 2025");
}

function slide9() {
  const s = pptx.addSlide();
  addBase(s, 9);
  addSectionKicker(s, "TAKE-HOME MESSAGES", 0.82, 0.26, 2.05);

  s.addText("联用的未来，取决于把问题真正解决", {
    x: 0.84, y: 0.95, w: 6.6, h: 0.42,
    fontFace: "Microsoft YaHei", fontSize: 29, bold: true, color: palette.navy, margin: 0,
  });
  addCard(s, 0.88, 1.74, 6.35, 2.2, palette.tealLite, palette.line);
  s.addText("手术药物联用的价值，最终不取决于理念是否先进，而取决于这些关键问题能否被真正回答。", {
    x: 1.18, y: 2.28, w: 5.78, h: 1.06,
    fontFace: "Microsoft YaHei", fontSize: 21.2, bold: true, color: palette.navy, margin: 0, align: "center", valign: "mid",
  });

  const nodes = [
    ["分层", 8.15, 1.9],
    ["时机", 10.05, 1.9],
    ["疗程", 11.05, 3.15],
    ["终点", 10.1, 4.48],
    ["安全性", 8.15, 4.48],
    ["路径", 7.15, 3.15],
  ];
  nodes.forEach(([label, x, y], idx) => {
    s.addShape(pptx.ShapeType.ellipse, {
      x, y, w: label.length > 2 ? 1.18 : 0.96, h: label.length > 2 ? 1.18 : 0.96,
      fill: { color: idx % 2 === 0 ? palette.white : palette.soft },
      line: { color: idx === 2 || idx === 4 ? palette.warm : palette.line, width: 1.3 },
    });
    s.addText(label, {
      x, y: y + (label.length > 2 ? 0.45 : 0.37), w: label.length > 2 ? 1.18 : 0.96, h: 0.16,
      fontFace: "Microsoft YaHei", fontSize: 14.4, bold: true, color: idx === 2 || idx === 4 ? palette.warm : palette.navy, margin: 0, align: "center",
    });
  });
  s.addShape(pptx.ShapeType.ellipse, {
    x: 8.72, y: 2.78, w: 1.82, h: 1.82,
    fill: { color: palette.navy2 },
    line: { color: palette.navy2, transparency: 100 },
  });
  s.addText("规范化\n临床管理", {
    x: 8.72, y: 3.33, w: 1.82, h: 0.5,
    fontFace: "Microsoft YaHei", fontSize: 18.8, bold: true, color: palette.white, margin: 0, align: "center",
  });

  [
    "联用方向正在逐渐明确",
    "但分层、时机、疗程、终点、安全性和路径仍未完全解决",
    "共识是起点，不是终局",
    "下一步关键是把联用从理念推进到规范化临床管理",
  ].forEach((t, idx) => {
    addCard(s, 0.9 + idx * 3.02, 5.45, 2.78, 0.82, idx % 2 === 0 ? palette.white : palette.soft);
    s.addText(t, {
      x: 1.08 + idx * 3.02, y: 5.67, w: 2.42, h: 0.38,
      fontFace: "Microsoft YaHei", fontSize: 13.8, color: palette.dark, bold: idx === 0 || idx === 3, margin: 0, align: "center", valign: "mid",
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
