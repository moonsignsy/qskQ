import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const prdDir = path.join(root, 'docs', 'prd');
const tmpDir = path.join(prdDir, '_pdf_tmp');

const EDGE = [
  process.env['ProgramFiles(x86)'] + '\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.ProgramFiles + '\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe',
].find((p) => fs.existsSync(p));

if (!EDGE) {
  console.error('未找到 Microsoft Edge，无法导出 PDF');
  process.exit(1);
}

const CSS = `
  @page { margin: 18mm 16mm; }
  body {
    font-family: "Microsoft YaHei", "PingFang SC", "SimSun", sans-serif;
    font-size: 11pt;
    line-height: 1.65;
    color: #1e293b;
    max-width: 210mm;
    margin: 0 auto;
    padding: 12mm;
  }
  h1 { font-size: 22pt; color: #0f172a; border-bottom: 3px solid #2563eb; padding-bottom: 8px; margin-top: 0; page-break-after: avoid; }
  h2 { font-size: 15pt; color: #1e40af; margin-top: 28px; page-break-after: avoid; }
  h3 { font-size: 12.5pt; color: #334155; margin-top: 20px; page-break-after: avoid; }
  h4 { font-size: 11.5pt; color: #475569; margin-top: 16px; page-break-after: avoid; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 10pt; page-break-inside: avoid; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; vertical-align: top; word-break: break-word; }
  th { background: #f1f5f9; font-weight: 600; }
  tr:nth-child(even) td { background: #f8fafc; }
  pre, code { font-family: Consolas, "Courier New", monospace; }
  pre {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 12px 14px;
    font-size: 9.5pt;
    line-height: 1.5;
    white-space: pre-wrap;
    page-break-inside: avoid;
  }
  code { background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-size: 9.5pt; }
  ul, ol { margin: 8px 0 16px; padding-left: 22px; }
  li { margin: 4px 0; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
  blockquote { border-left: 4px solid #93c5fd; margin: 12px 0; padding: 8px 16px; background: #f8fafc; color: #475569; }
  a { color: #2563eb; text-decoration: none; }
  .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 9pt; color: #94a3b8; text-align: center; }
`;

marked.setOptions({ gfm: true, breaks: false });

function wrapHtml(title, body) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${CSS}</style>
</head>
<body>
${body}
<div class="footer">企税康协同工作平台 · PRD 文档 · ${title}</div>
</body>
</html>`;
}

function toPdf(htmlPath, pdfPath) {
  const url = 'file:///' + htmlPath.replace(/\\/g, '/');
  execFileSync(EDGE, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=10000',
    `--print-to-pdf=${pdfPath}`,
    url,
  ], { stdio: 'pipe', timeout: 60000 });
}

fs.mkdirSync(tmpDir, { recursive: true });

const argFiles = process.argv.slice(2).filter((f) => f.endsWith('.md'));
const files = (argFiles.length
  ? argFiles
  : fs.readdirSync(prdDir).filter((f) => f.endsWith('.md'))
).sort();

const results = [];

for (let i = 0; i < files.length; i++) {
  const mdName = files[i];
  const base = mdName.replace(/\.md$/, '');
  const mdPath = path.join(prdDir, mdName);
  const md = fs.readFileSync(mdPath, 'utf8');
  const title = md.match(/^#\s+(.+)$/m)?.[1] || base;
  const htmlBody = marked.parse(md);
  const html = wrapHtml(title, htmlBody);

  const tmpHtml = path.join(tmpDir, `doc-${i}.html`);
  const tmpPdf = path.join(tmpDir, `doc-${i}.pdf`);
  const outPdf = path.join(prdDir, `${base}.pdf`);

  fs.writeFileSync(tmpHtml, html, 'utf8');
  toPdf(tmpHtml, tmpPdf);
  fs.copyFileSync(tmpPdf, outPdf);
  results.push(outPdf);
  console.log(`✓ ${mdName} → ${base}.pdf`);
}

console.log(`\n共导出 ${results.length} 个 PDF 文件至 docs/prd/`);
