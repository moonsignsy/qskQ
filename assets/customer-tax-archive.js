;(function () {
  var STORAGE_KEY = 'qsk-customer-tax-archive';
  var EVENT_NAME = 'customer-tax-archive-saved';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function emptyDoc() {
    return { missing: false, files: [], note: '', approval: [] };
  }

  function fileDoc(names) {
    return { missing: false, files: names || [], note: '', approval: [] };
  }

  function noteDoc(note) {
    return { missing: true, files: [], note: note || '', approval: [] };
  }

  function approvalDoc(names) {
    return { missing: true, files: [], note: '', approval: names || [] };
  }

  function seedRecord(partial) {
    var docs = partial.docs || {};
    return {
      agency: partial.agency || 'new',
      company: partial.company || '',
      phone: partial.phone || '',
      pwd: partial.pwd || '',
      annual: partial.annual || '',
      hasSocial: partial.hasSocial || 'no',
      socialPwd: partial.socialPwd || '',
      hasCa: partial.hasCa || 'no',
      bank: partial.bank || '',
      notes: partial.notes || '',
      docs: {
        trialBalance: docs.trialBalance || emptyDoc(),
        balanceSheet: docs.balanceSheet || emptyDoc(),
        incomeStmt: docs.incomeStmt || emptyDoc(),
        idFront: docs.idFront || emptyDoc(),
        idBack: docs.idBack || emptyDoc(),
        payroll: docs.payroll || emptyDoc(),
        staffList: docs.staffList || emptyDoc(),
        otherFiles: docs.otherFiles || emptyDoc()
      }
    };
  }

  var SEEDS = {
    '苏州怡启尔科技有限公司': seedRecord({
      agency: 'new',
      company: '苏州怡启尔科技有限公司',
      phone: '13876763515',
      docs: {
        idFront: fileDoc(['秦总身份证正面.jpg']),
        idBack: fileDoc(['秦总身份证反面.jpg'])
      },
      bank: '',
      notes: '新设客户，税控及社保后续由主办会计跟进开通。'
    }),
    '南京实耐时科技有限公司': seedRecord({
      agency: 'cut',
      company: '南京实耐时科技有限公司',
      phone: '13876763516',
      pwd: 'gs123456',
      annual: '王经理 13876763516',
      hasSocial: 'yes',
      socialPwd: 'sb888888',
      hasCa: 'yes',
      bank: '3225010000123456789',
      notes: '原代账机构为本地事务所，账套已导出。',
      docs: {
        trialBalance: fileDoc(['科目余额表-2026年3月.xlsx']),
        balanceSheet: fileDoc(['资产负债表-2026年3月.pdf']),
        incomeStmt: noteDoc('上期利润表尚未从原代账机构取得，预计本周补齐。'),
        idFront: fileDoc(['王经理身份证正面.jpg']),
        idBack: fileDoc(['王经理身份证反面.jpg']),
        payroll: fileDoc(['人员申报工资表-2026年3月.xlsx']),
        staffList: fileDoc(['人员信息表.xlsx']),
        otherFiles: fileDoc(['交接清单.pdf', '原代账联系人备忘.docx'])
      }
    }),
    '苏州美药科技有限公司': seedRecord({
      agency: 'cut',
      company: '苏州美药科技有限公司',
      phone: '13912345678',
      pwd: 'my666888',
      annual: '李总 13912345678',
      hasSocial: 'no',
      hasCa: 'no',
      bank: '',
      notes: '',
      docs: {
        trialBalance: approvalDoc(['科目余额表缺失审批截图.png']),
        balanceSheet: fileDoc(['资产负债表-2026年2月.pdf']),
        incomeStmt: fileDoc(['利润表-2026年2月.pdf']),
        idFront: fileDoc(['李总身份证正面.jpg']),
        idBack: fileDoc(['李总身份证反面.jpg']),
        payroll: noteDoc('当月无员工申报，工资表暂缺。'),
        staffList: fileDoc(['人员信息表.xlsx'])
      }
    }),
    '南京莱刻科技有限公司': seedRecord({
      agency: 'new',
      company: '南京莱刻科技有限公司',
      phone: '13788889999',
      docs: {
        idFront: fileDoc(['王经理身份证正面.jpg']),
        idBack: noteDoc('反面照片原件在客户处，下周寄出。')
      }
    }),
    '昆山汇诚商贸有限公司': seedRecord({
      agency: 'new',
      company: '昆山汇诚商贸有限公司',
      phone: '13666667777',
      docs: {
        idFront: fileDoc(['赵经理身份证正面.jpg']),
        idBack: fileDoc(['赵经理身份证反面.jpg'])
      },
      bank: '3225010000987654321',
      notes: ''
    }),
    '苏州美的信息科技有限公司': seedRecord({
      agency: 'cut',
      company: '苏州美的信息科技有限公司',
      phone: '13816207333',
      pwd: 'md202604',
      annual: '李川 13816207333',
      hasSocial: 'yes',
      socialPwd: 'sb202604',
      hasCa: 'yes',
      bank: '3225010000112233445',
      notes: '客户需每月5号前出报告。',
      docs: {
        trialBalance: fileDoc(['科目余额表-2026年3月.xlsx']),
        balanceSheet: fileDoc(['资产负债表-2026年3月.pdf']),
        incomeStmt: fileDoc(['利润表-2026年3月.pdf']),
        idFront: fileDoc(['李川身份证正面.jpg']),
        idBack: fileDoc(['李川身份证反面.jpg']),
        payroll: fileDoc(['人员申报工资表-2026年3月.xlsx']),
        staffList: fileDoc(['人员信息表.xlsx']),
        otherFiles: fileDoc(['税控盘交接单.pdf'])
      }
    }),
    '苏州维的科技有限公司': seedRecord({
      agency: 'new',
      company: '苏州维的科技有限公司',
      phone: '13700001111',
      docs: {
        idFront: fileDoc(['王某身份证正面.jpg']),
        idBack: fileDoc(['王某身份证反面.jpg'])
      },
      notes: '新设客户，税号开通后由主办会计建账。'
    }),
    '万州维的科技有限公司': seedRecord({
      agency: 'cut',
      company: '万州维的科技有限公司',
      phone: '13700003333',
      pwd: 'wz998877',
      annual: '赵某 13700003333',
      hasSocial: 'no',
      hasCa: 'yes',
      docs: {
        trialBalance: fileDoc(['科目余额表-2026年2月.xlsx']),
        balanceSheet: noteDoc('上期资产负债表原代账未移交。'),
        incomeStmt: fileDoc(['利润表-2026年2月.pdf']),
        idFront: fileDoc(['赵某身份证正面.jpg']),
        idBack: fileDoc(['赵某身份证反面.jpg']),
        payroll: fileDoc(['人员申报工资表-2026年2月.xlsx']),
        staffList: fileDoc(['人员信息表.xlsx'])
      }
    })
  };

  function readSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeSaved(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) { /* ignore quota */ }
  }

  function get(company) {
    var name = (company || '').trim();
    if (!name) return null;
    var saved = readSaved();
    if (saved[name]) return saved[name];
    return SEEDS[name] || null;
  }

  function save(data) {
    if (!data) return;
    var name = (data.company || '').trim();
    if (!name) return;
    var map = readSaved();
    map[name] = data;
    writeSaved(map);
    document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { company: name, data: data } }));
  }

  function ensureStyles() {
    if (document.getElementById('customer-tax-archive-styles')) return;
    var style = document.createElement('style');
    style.id = 'customer-tax-archive-styles';
    style.textContent =
      '.tax-archive-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:36px 20px;color:#94a3b8;text-align:center}' +
      '.tax-archive-empty i{font-size:20px;color:#cbd5e1;margin-bottom:4px}' +
      '.tax-archive-empty p{margin:0;font-size:14px;color:#64748b}' +
      '.tax-archive-empty span{font-size:12px;color:#94a3b8}' +
      '.tax-archive-sec{padding:18px 20px 4px}' +
      '.tax-archive-sec+.tax-archive-sec{border-top:1px dashed #eef2f6;margin-top:4px}' +
      '.tax-archive-sec .sec-title{margin-bottom:12px;font-size:13px}' +
      '.tax-archive-dl{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:12px 24px;padding:0 0 16px}' +
      '@media (min-width:768px){.tax-archive-dl{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
      '@media (min-width:1280px){.tax-archive-dl{grid-template-columns:repeat(3,minmax(0,1fr))}}' +
      '.tax-archive-dl .full{grid-column:1/-1}' +
      '.tax-archive-dl dt{font-size:12px;color:#94a3b8;margin-bottom:4px}' +
      '.tax-archive-dl dd{font-size:14px;color:#1e293b;margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}' +
      '.tax-agency-tag{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:999px;font-size:12px;font-weight:600;line-height:1}' +
      '.tax-agency-tag.is-new{background:#eff6ff;color:#1d4ed8}' +
      '.tax-agency-tag.is-cut{background:#fff7ed;color:#c2410c}' +
      '.tax-file-chip{display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:3px 8px;border-radius:6px;background:#f8fafc;border:1px solid #e2e8f0;font-size:12px;color:#334155}' +
      '.tax-file-chip i{color:#94a3b8}' +
      '.tax-doc-alt{display:inline-flex;align-items:center;height:20px;padding:0 6px;border-radius:4px;background:#fffbeb;color:#b45309;font-size:11px;font-weight:600}' +
      '.tax-doc-note{font-size:13px;color:#64748b}';
    document.head.appendChild(style);
  }

  function dash(value) {
    return value ? escapeHtml(value) : '—';
  }

  function yesNo(value) {
    if (value === 'yes') return '有';
    if (value === 'no') return '无';
    return '—';
  }

  function maskPwd(value) {
    return value ? '••••••' : '—';
  }

  function fileChips(names) {
    if (!names || !names.length) return '';
    return names.map(function (name) {
      return '<span class="tax-file-chip"><i class="fa-regular fa-file"></i>' + escapeHtml(name) + '</span>';
    }).join('');
  }

  function formatDoc(doc, opts) {
    opts = opts || {};
    if (!doc) return '—';
    if (doc.files && doc.files.length) return fileChips(doc.files);
    if (opts.approval && doc.approval && doc.approval.length) {
      return '<span class="tax-doc-alt">审批截图</span>' + fileChips(doc.approval);
    }
    if (doc.missing && doc.note) {
      return '<span class="tax-doc-alt">暂无该资料</span><span class="tax-doc-note">' + escapeHtml(doc.note) + '</span>';
    }
    if (doc.missing) return '<span class="tax-doc-alt">暂无该资料</span>';
    return '—';
  }

  function item(label, valueHtml, extraClass) {
    return '<div' + (extraClass ? ' class="' + extraClass + '"' : '') + '><dt>' + escapeHtml(label) + '</dt><dd>' + (valueHtml || '—') + '</dd></div>';
  }

  function section(title, inner) {
    return '<div class="tax-archive-sec"><div class="sec-title">' + escapeHtml(title) + '</div><dl class="tax-archive-dl">' + inner + '</dl></div>';
  }

  function render(el, companyOrData) {
    if (!el) return;
    ensureStyles();
    var data = companyOrData && typeof companyOrData === 'object' && !Array.isArray(companyOrData) && ('agency' in companyOrData || 'docs' in companyOrData)
      ? companyOrData
      : get(companyOrData);
    if (!data) {
      el.innerHTML =
        '<div class="tax-archive-empty">' +
          '<i class="fa-regular fa-folder-open"></i>' +
          '<p>暂未补充税务信息</p>' +
          '<span>在「补充客户信息」中填写后，将按新设 / 切户展示交接资料。</span>' +
        '</div>';
      return;
    }
    var cut = data.agency === 'cut';
    var docs = data.docs || {};
    var html = '';
    html += section('代账身份',
      item('代账类型', '<span class="tax-agency-tag ' + (cut ? 'is-cut' : 'is-new') + '">' + (cut ? '切户' : '新设') + '</span>') +
      item('企业名称', dash(data.company))
    );
    if (cut) {
      html += section('财务报表',
        item('最近一期科目余额表', formatDoc(docs.trialBalance, { approval: true })) +
        item('最近一期资产负债表', formatDoc(docs.balanceSheet)) +
        item('最近一期利润表', formatDoc(docs.incomeStmt))
      );
    }
    html += section('法人资料',
      item('法人身份证正面', formatDoc(docs.idFront)) +
      item('法人身份证反面', formatDoc(docs.idBack)) +
      item('法人联系方式', dash(data.phone))
    );
    if (cut) {
      html += section('人员与个税',
        item('最近一期人员申报工资表', formatDoc(docs.payroll)) +
        item('最近一期人员信息表', formatDoc(docs.staffList)) +
        item('个税密码', maskPwd(data.pwd))
      );
      var socialItems =
        item('工商年报联系人及联系方式', dash(data.annual)) +
        item('是否有社保', yesNo(data.hasSocial));
      if (data.hasSocial === 'yes') socialItems += item('社保密码', maskPwd(data.socialPwd));
      socialItems += item('是否有社保CA', yesNo(data.hasCa));
      html += section('年报与社保', socialItems);
    }
    var otherFiles = formatDoc(docs.otherFiles);
    html += section('其他',
      item('银行账号', dash(data.bank)) +
      item('其他说明', dash(data.notes), 'full') +
      item('其他附件', otherFiles, 'full')
    );
    el.innerHTML = html;
  }

  function renderByCompany(el, company) {
    render(el, company);
  }

  window.CustomerTaxArchive = {
    get: get,
    save: save,
    render: render,
    renderByCompany: renderByCompany,
    EVENT: EVENT_NAME
  };
})();
