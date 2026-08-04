import zipfile, re, sys
from xml.etree import ElementTree as ET

NS = {
    'a': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}

def col_to_idx(col):
    idx = 0
    for ch in col:
        idx = idx * 26 + (ord(ch) - ord('A') + 1)
    return idx - 1

def load(path):
    z = zipfile.ZipFile(path)
    # shared strings
    shared = []
    if 'xl/sharedStrings.xml' in z.namelist():
        root = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in root.findall('a:si', NS):
            # gather all text nodes
            txt = ''.join(t.text or '' for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t'))
            shared.append(txt)
    # workbook sheet names + rels
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    relmap = {r.get('Id'): r.get('Target') for r in rels}
    sheets = []
    for s in wb.find('a:sheets', NS).findall('a:sheet', NS):
        name = s.get('name')
        rid = s.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
        target = relmap[rid]
        if not target.startswith('xl/'):
            target = 'xl/' + target
        sheets.append((name, target))
    return z, shared, sheets

def read_sheet(z, shared, target, max_rows=8):
    root = ET.fromstring(z.read(target))
    data = root.find('a:sheetData', NS)
    out = []
    for row in data.findall('a:row', NS):
        cells = {}
        maxc = -1
        for c in row.findall('a:c', NS):
            ref = c.get('r')
            col = re.match(r'[A-Z]+', ref).group()
            ci = col_to_idx(col)
            t = c.get('t')
            val = None
            if t == 's':
                v = c.find('a:v', NS)
                if v is not None:
                    val = shared[int(v.text)]
            elif t == 'inlineStr':
                is_ = c.find('a:is', NS)
                if is_ is not None:
                    val = ''.join(tt.text or '' for tt in is_.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t'))
            else:
                v = c.find('a:v', NS)
                if v is not None:
                    val = v.text
            cells[ci] = val
            maxc = max(maxc, ci)
        rowlist = [cells.get(i, None) for i in range(maxc + 1)]
        out.append(rowlist)
        if len(out) >= max_rows:
            break
    return out

if __name__ == '__main__':
    p = r"C:\Users\EDY\Desktop\苏外组 - 线上资源跟进表.xlsx"
    z, shared, sheets = load(p)
    print("SHEETS:", [s[0] for s in sheets])
    for name, target in sheets:
        print("=" * 70)
        print("SHEET:", name)
        rows = read_sheet(z, shared, target, max_rows=10)
        for i, r in enumerate(rows):
            print(f"  row{i}:", [("" if c is None else str(c)) for c in r][:30])
