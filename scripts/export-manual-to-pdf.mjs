import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const EDGE = [
  process.env['ProgramFiles(x86)'] + '\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.ProgramFiles + '\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));

if (!EDGE) {
  console.error('未找到 Microsoft Edge，无法导出 PDF');
  process.exit(1);
}

const mdPath = path.join(root, 'docs', 'manual', '企税康用户使用手册-工作台与销售中心.md');
const tmpDir = path.join(root, 'docs', 'manual', '_pdf_tmp');
const htmlPath = path.join(tmpDir, '用户使用手册.html');
const pdfPath = path.join(root, 'docs', 'manual', '企税康用户使用手册-工作台与销售中心.pdf');

const FLOW_HTML = `
<div class="flow">
  <div class="flow-row">
    <div class="flow-box">营销管理<br><small>渠道线索</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-box">线索管理<br><small>跟进 / 报价</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-box">商机管理<br><small>意向 / 成交</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-box">合同订单<br><small>签约 / 收款 / 开票</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-box">客户管理<br><small>档案 / 服务</small></div>
    <span class="flow-arrow">→</span>
    <div class="flow-box flow-box-accent">销售业绩</div>
  </div>
  <div class="flow-note">销售目标为业绩完成率的数据来源；合同订单承接签约、收款与开票，完成后对照业绩看板复核。</div>
</div>
`;

const CSS = `
  @page { margin: 16mm 14mm; size: A4; }
  body {
    font-family: "Microsoft YaHei", "PingFang SC", "SimSun", sans-serif;
    font-size: 10.5pt;
    line-height: 1.58;
    color: #1e293b;
    max-width: 210mm;
    margin: 0 auto;
    padding: 8mm 6mm 10mm;
  }
  h1 { font-size: 20pt; color: #0f172a; border-bottom: 3px solid #2563eb; padding-bottom: 8px; margin-top: 0; page-break-after: avoid; }
  h2 { font-size: 14pt; color: #1e40af; margin-top: 24px; page-break-after: avoid; }
  h3 { font-size: 12pt; color: #334155; margin-top: 16px; page-break-after: avoid; }
  h4 { font-size: 11pt; color: #475569; margin-top: 14px; page-break-after: avoid; }
  p { margin: 8px 0 12px; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0 16px; font-size: 9pt; }
  th, td { border: 1px solid #cbd5e1; padding: 5px 6px; text-align: left; vertical-align: top; word-break: break-word; }
  th { background: #f1f5f9; font-weight: 600; }
  tr:nth-child(even) td { background: #f8fafc; }
  pre {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 9pt;
    white-space: pre-wrap;
    page-break-inside: avoid;
  }
  code { background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-size: 9pt; }
  ul, ol { margin: 8px 0 14px; padding-left: 22px; }
  li { margin: 3px 0; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  a { color: #2563eb; text-decoration: none; }
  strong { color: #0f172a; }
  .flow {
    border: 1px solid #bfdbfe;
    background: #eff6ff;
    border-radius: 8px;
    padding: 14px 12px 10px;
    margin: 12px 0 18px;
    page-break-inside: avoid;
  }
  .flow-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .flow-box {
    background: #fff;
    border: 1px solid #93c5fd;
    border-radius: 6px;
    padding: 8px 10px;
    min-width: 88px;
    text-align: center;
    font-size: 9pt;
    font-weight: 600;
    color: #1e3a8a;
    line-height: 1.35;
  }
  .flow-box small { font-weight: 400; color: #64748b; font-size: 8pt; }
  .flow-box-accent { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
  .flow-arrow { color: #2563eb; font-weight: 700; }
  .flow-note { margin-top: 10px; font-size: 8.5pt; color: #475569; text-align: center; }
  .footer {
    margin-top: 28px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
    font-size: 8.5pt;
    color: #94a3b8;
    text-align: center;
  }
`;

fs.mkdirSync(tmpDir, { recursive: true });
let md = fs.readFileSync(mdPath, 'utf8');
md = md.replace(/```mermaid[\s\S]*?```/, '<!--FLOW_DIAGRAM-->');

marked.setOptions({ gfm: true, breaks: false });
let body = marked.parse(md);
body = body.replace('<!--FLOW_DIAGRAM-->', FLOW_HTML);

const title = md.match(/^#\s+(.+)$/m)?.[1] || '用户使用手册';
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${CSS}</style>
</head>
<body>
${body}
<div class="footer">企税康协同工作平台 · 用户使用手册（工作台 · 销售中心 · 合同订单） · 2026-08-13</div>
</body>
</html>`;

fs.writeFileSync(htmlPath, html, 'utf8');

const url = 'file:///' + htmlPath.replace(/\\/g, '/');
execFileSync(
  EDGE,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=15000',
    `--print-to-pdf=${pdfPath}`,
    url,
  ],
  { stdio: 'pipe', timeout: 90000 }
);

const st = fs.statSync(pdfPath);
console.log(`✓ PDF 已导出: ${pdfPath}`);
console.log(`  大小: ${(st.size / 1024).toFixed(1)} KB`);
