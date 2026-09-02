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

const mdPath = path.join(root, 'docs', 'functional', '企税康功能梳理文档.md');
const tmpDir = path.join(root, 'docs', 'functional', '_pdf_tmp');
const htmlPath = path.join(tmpDir, '功能梳理.html');
const pdfPath = path.join(root, 'docs', 'functional', '企税康功能梳理文档.pdf');

const CSS = `
  @page { margin: 16mm 14mm; }
  body {
    font-family: "Microsoft YaHei", "PingFang SC", "SimSun", sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1e293b;
    max-width: 210mm;
    margin: 0 auto;
    padding: 10mm;
  }
  h1 { font-size: 20pt; color: #0f172a; border-bottom: 3px solid #2563eb; padding-bottom: 8px; margin-top: 0; page-break-after: avoid; }
  h2 { font-size: 14pt; color: #1e40af; margin-top: 22px; page-break-after: avoid; }
  h3 { font-size: 12pt; color: #334155; margin-top: 16px; page-break-after: avoid; }
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
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
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
const md = fs.readFileSync(mdPath, 'utf8');
marked.setOptions({ gfm: true, breaks: false });
const body = marked.parse(md);
const title = md.match(/^#\s+(.+)$/m)?.[1] || '功能梳理文档';
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${CSS}</style>
</head>
<body>
${body}
<div class="footer">企税康协同工作平台 · 功能梳理文档 · 2026-08-12</div>
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
