import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

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

const [htmlArg, pdfArg] = process.argv.slice(2);
if (!htmlArg) {
  console.error('用法: node scripts/export-html-to-pdf.mjs <input.html> [output.pdf]');
  process.exit(1);
}

const htmlPath = path.resolve(root, htmlArg);
const pdfPath = path.resolve(
  root,
  pdfArg || htmlArg.replace(/\.html?$/i, '.pdf')
);

if (!fs.existsSync(htmlPath)) {
  console.error(`文件不存在: ${htmlPath}`);
  process.exit(1);
}

const url = 'file:///' + htmlPath.replace(/\\/g, '/');

execFileSync(
  EDGE,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=30000',
    `--print-to-pdf=${pdfPath}`,
    url,
  ],
  { stdio: 'pipe', timeout: 120000 }
);

console.log(`✓ PDF 已导出: ${pdfPath}`);
