;(function () {
  'use strict';

  var PLACEHOLDER = '--';

  /** 合同+订单合并列表 mock 数据（覆盖全部 Tab 与操作分支） */
  var records = [
    {
      id: 'rec-001',
      contractNo: 'HT20260404001',
      orderId: '202604140002',
      contractType: '代账合同',
      companyName: '苏州美时科技有限公司',
      contactName: '王经理',
      contactPhone: '13800138001',
      amount: 1600,
      contractStatus: '未签约',
      payStatus: '未支付',
      payChannel: null,
      payTime: null,
      invoiceFlag: '--',
      salesperson: '周方林',
      department: '财务一组',
      signedAt: null,
      createdAt: '2026-03-21 18:03:00',
      payMethod: '年付'
    },
    {
      id: 'rec-002',
      contractNo: 'HT20260404002',
      orderId: '202604140003',
      contractType: '增值服务合同',
      companyName: '南京云启信息技术有限公司',
      contactName: '李芳',
      contactPhone: '13900139002',
      amount: 1800,
      contractStatus: '未签约',
      payStatus: '未支付',
      payChannel: null,
      payTime: null,
      invoiceFlag: '--',
      salesperson: '周方林',
      department: '财务一组',
      signedAt: null,
      createdAt: '2026-03-22 09:15:00',
      payMethod: '年付'
    },
    {
      id: 'rec-003',
      contractNo: 'HT20260404003',
      orderId: '202604140008',
      contractType: '注册地址合同',
      companyName: '无锡智联制造有限公司',
      contactName: '张伟',
      contactPhone: '13700137003',
      amount: 2400,
      contractStatus: '已签约',
      payStatus: '未支付',
      payChannel: null,
      payTime: null,
      invoiceFlag: '--',
      salesperson: '周芳',
      department: '网销一组',
      signedAt: '2026-04-10 14:20:00',
      createdAt: '2026-04-08 11:00:00',
      payMethod: '年付'
    },
    {
      id: 'rec-004',
      contractNo: 'HT202604140001',
      orderId: '202604140001',
      contractType: '代账合同',
      companyName: '杭州数链科技有限公司',
      contactName: '陈静',
      contactPhone: '13600136004',
      amount: 24000,
      contractStatus: '已签约',
      payStatus: '已支付',
      payChannel: '支付宝',
      payTime: '2026-04-14 10:11:11',
      invoiceFlag: '否',
      salesperson: '周芳',
      department: '网销一组',
      signedAt: '2026-04-13 16:00:00',
      createdAt: '2026-04-12 08:30:00',
      payMethod: '年付'
    },
    {
      id: 'rec-005',
      contractNo: 'HT202604160022',
      orderId: '202604140004',
      contractType: '代账合同',
      companyName: '常州恒通机电有限公司',
      contactName: '刘洋',
      contactPhone: '13500135005',
      amount: 36000,
      contractStatus: '已签约',
      payStatus: '部分支付',
      payChannel: '微信支付',
      payTime: '2026-04-16 14:05:00',
      invoiceFlag: '--',
      salesperson: '周芳',
      department: '网销一组',
      signedAt: '2026-04-15 10:00:00',
      createdAt: '2026-04-14 09:00:00',
      payMethod: '年付',
      totalAmount: '36000',
      paidAmount: '18000',
      pendingAmount: '18000'
    },
    {
      id: 'rec-006',
      contractNo: 'HT202604180031',
      orderId: '202604140006',
      contractType: '增值服务合同',
      companyName: '苏州未来智造设备有限公司',
      contactName: '赵敏',
      contactPhone: '13400134006',
      amount: 15000,
      contractStatus: '已签约',
      payStatus: '已支付',
      payChannel: '对公转账',
      payTime: '2026-04-18 16:20:00',
      invoiceFlag: '是',
      salesperson: '周芳',
      department: '网销一组',
      signedAt: '2026-04-17 11:30:00',
      createdAt: '2026-04-16 15:00:00',
      payMethod: '年付'
    },
    {
      id: 'rec-007',
      contractNo: 'HT202604200088',
      orderId: '202604140007',
      contractType: '注册地址合同',
      companyName: '南通海韵贸易有限责任公司',
      contactName: '孙磊',
      contactPhone: '13300133007',
      amount: 5200,
      contractStatus: '已签约',
      payStatus: '已支付',
      payChannel: '微信',
      payTime: '2026-04-20 09:45:00',
      invoiceFlag: '否',
      salesperson: '陆琴',
      department: '网销二组',
      signedAt: '2026-04-19 17:00:00',
      createdAt: '2026-04-18 10:20:00',
      payMethod: '半年付'
    }
  ];

  var orderDetails = {
    '202604140001': {
      status: 'paid',
      orderNo: '202604140001',
      tradeNo: 'TXN202604140001',
      createdAt: '2026-04-14 10:11:11',
      payMethod: '年付',
      amount: '24000',
      payStatus: '已支付',
      payTime: '2026-04-14 10:11:11',
      channel: '支付宝',
      salesperson: '周芳',
      dept: '网销一组',
      contractNo: 'HT202604140001',
      invoiceFlag: '否'
    },
    '202604140002': {
      status: 'unpaid',
      orderNo: '202604140002',
      tradeNo: null,
      createdAt: '2026-03-21 18:03:00',
      payMethod: '年付',
      amount: '1600',
      payStatus: '未支付',
      payTime: null,
      channel: null,
      salesperson: '周方林',
      dept: '财务一组',
      contractNo: 'HT20260404001',
      invoiceFlag: '--'
    },
    '202604140003': {
      status: 'unpaid',
      orderNo: '202604140003',
      tradeNo: null,
      createdAt: '2026-03-22 09:15:00',
      payMethod: '年付',
      amount: '1800',
      payStatus: '未支付',
      payTime: null,
      channel: null,
      salesperson: '周方林',
      dept: '财务一组',
      contractNo: 'HT20260404002',
      invoiceFlag: '--'
    },
    '202604140004': {
      status: 'partial',
      orderNo: '202604140004',
      tradeNo: 'TXN202604140004',
      createdAt: '2026-04-16 14:00:00',
      payMethod: '年付',
      amount: '36000',
      payStatus: '部分支付',
      payTime: '2026-04-16 14:05:00',
      channel: '微信支付',
      salesperson: '周芳',
      dept: '网销一组',
      contractNo: 'HT202604160022',
      totalAmount: '36000',
      paidAmount: '18000',
      pendingAmount: '18000',
      invoiceFlag: '--'
    },
    '202604140006': {
      status: 'paid',
      orderNo: '202604140006',
      tradeNo: 'TXN202604140006',
      createdAt: '2026-04-18 15:00:00',
      payMethod: '年付',
      amount: '15000',
      payStatus: '已支付',
      payTime: '2026-04-18 16:20:00',
      channel: '对公转账',
      salesperson: '周芳',
      dept: '网销一组',
      contractNo: 'HT202604180031',
      invoiceFlag: '是'
    },
    '202604140007': {
      status: 'paid',
      orderNo: '202604140007',
      tradeNo: 'TXN202604140007',
      createdAt: '2026-04-20 09:00:00',
      payMethod: '半年付',
      amount: '5200',
      payStatus: '已支付',
      payTime: '2026-04-20 09:45:00',
      channel: '微信',
      salesperson: '陆琴',
      dept: '网销二组',
      contractNo: 'HT202604200088',
      invoiceFlag: '否'
    }
  };

  records.forEach(function (r) {
    if (!r.orderId || orderDetails[r.orderId]) return;
    var st = r.payStatus === '已支付' ? 'paid' : r.payStatus === '部分支付' ? 'partial' : 'unpaid';
    orderDetails[r.orderId] = {
      status: st,
      orderNo: r.orderId,
      tradeNo: (st === 'paid' || st === 'partial') ? ('TXN' + r.orderId) : null,
      createdAt: r.createdAt,
      payMethod: r.payMethod || '年付',
      amount: String(r.amount),
      payStatus: r.payStatus,
      payTime: r.payTime,
      channel: r.payChannel,
      salesperson: r.salesperson,
      dept: r.department,
      contractNo: r.contractNo,
      invoiceFlag: r.invoiceFlag,
      totalAmount: r.totalAmount,
      paidAmount: r.paidAmount,
      pendingAmount: r.pendingAmount
    };
  });

  var invRecords = {
    '202604140006': {
      state: 'approved',
      company: '苏州没得科技有限公司',
      collectAmount: '15000',
      invoiceAmount: '15000',
      invoiceType: '增值税普通发票',
      contract: 'HT202604180031',
      title: '苏州未来智造设备有限公司',
      titleType: '企业',
      creditCode: '91320594MA1WQXXXX',
      email: 'zhoufang@demo.com',
      bannerTitle: '审批已通过',
      bannerSub: '审批人：钱蕾',
      timeline: [
        { kind: 'done', step: '部门审批', name: '钱蕾 财务经理', time: '2026-04-20 12:32:02', status: '审批通过', statusClass: 'text-emerald-600', comment: '审批意见：审批通过' },
        { kind: 'done', step: '部门审批', name: '马经理 会计顾问主管', time: '2026-04-20 12:32:02', status: '审批通过', statusClass: 'text-emerald-600', comment: '审批意见：客户要求，给予批准' },
        { kind: 'done', step: '提交申请', name: '周芳 会计顾问', time: '2026-04-18 17:05:00', status: '发起审批', statusClass: 'text-emerald-600', comment: '' }
      ],
      footer: 'approved'
    }
  };

  var state = {
    activeTab: 'all',
    filters: {
      contractTypes: [],
      salesperson: '',
      department: '',
      companyName: '',
      payTimePreset: '',
      payTimeStart: '',
      payTimeEnd: '',
      signTimePreset: '',
      signTimeStart: '',
      signTimeEnd: '',
      createTimePreset: '',
      createTimeStart: '',
      createTimeEnd: ''
    }
  };

  var statusClassMap = {
    paid: 'text-slate-900',
    unpaid: 'text-slate-600',
    partial: 'text-amber-600',
    refunded: 'text-orange-600'
  };

  var contractStatusClass = {
    '未签约': 'text-amber-600',
    '已签约': 'text-emerald-600'
  };

  var payStatusClass = {
    '未支付': 'text-slate-500',
    '部分支付': 'text-amber-600',
    '已支付': 'text-emerald-600'
  };

  var payMethodMeta = {
    alipay: { label: '支付宝收款码', hint: '请客户使用支付宝扫码完成支付', color: '1677FF' },
    wechat: { label: '微信收款码', hint: '请客户使用微信扫码完成支付', color: '07C160' },
    bank: { label: '对公转账收款码', hint: '请客户扫码查看对公账户信息并完成转账', color: '334155' }
  };

  var DEFAULT_APPLY = { contract: 'HT20260420001', collect: '1500', invoiceAmt: '1500' };

  function parseDate(str) {
    if (!str) return null;
    var d = new Date(String(str).replace(/-/g, '/'));
    return isNaN(d.getTime()) ? null : d;
  }

  function startOfDay(d) {
    var x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function endOfDay(d) {
    var x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  function getPresetRange(preset) {
    var now = new Date();
    var start;
    var end = endOfDay(now);
    if (preset === 'week') {
      var day = now.getDay() || 7;
      start = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1));
    } else if (preset === 'month') {
      start = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
    } else if (preset === 'lastMonth') {
      start = startOfDay(new Date(now.getFullYear(), now.getMonth() - 1, 1));
      end = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
    } else {
      return null;
    }
    return { start: start, end: end };
  }

  function inRange(dateStr, preset, customStart, customEnd) {
    if (!preset && !customStart && !customEnd) return true;
    var d = parseDate(dateStr);
    if (!d) return preset === 'custom' ? false : true;
    var range;
    if (preset === 'custom') {
      var s = parseDate(customStart);
      var e = parseDate(customEnd);
      if (!s && !e) return true;
      if (s && d < startOfDay(s)) return false;
      if (e && d > endOfDay(e)) return false;
      return true;
    }
    range = getPresetRange(preset);
    if (!range) return true;
    return d >= range.start && d <= range.end;
  }

  function matchesTab(rec, tab) {
    if (tab === 'all') return true;
    if (tab === 'unsigned') return rec.contractStatus === '未签约';
    if (tab === 'signed-unpaid') return rec.contractStatus === '已签约' && rec.payStatus === '未支付';
    if (tab === 'paid') return rec.payStatus === '已支付';
    if (tab === 'debt') return rec.payStatus === '部分支付';
    if (tab === 'invoiced') return rec.invoiceFlag === '是';
    if (tab === 'not-invoiced') return rec.payStatus === '已支付' && rec.invoiceFlag === '否';
    return true;
  }

  function matchesFilters(rec) {
    var f = state.filters;
    if (f.contractTypes.length && f.contractTypes.indexOf(rec.contractType) === -1) return false;
    if (f.salesperson && rec.salesperson !== f.salesperson) return false;
    if (f.department && rec.department !== f.department) return false;
    if (f.companyName && rec.companyName.indexOf(f.companyName) === -1) return false;
    if (!inRange(rec.payTime, f.payTimePreset, f.payTimeStart, f.payTimeEnd)) return false;
    if (!inRange(rec.signedAt, f.signTimePreset, f.signTimeStart, f.signTimeEnd)) return false;
    if (!inRange(rec.createdAt, f.createTimePreset, f.createTimeStart, f.createTimeEnd)) return false;
    return true;
  }

  function getFilteredRecords() {
    return records.filter(function (r) {
      return matchesTab(r, state.activeTab) && matchesFilters(r);
    });
  }

  function formatAmount(n) {
    return Number(n).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getPaidUnpaid(rec) {
    if (rec.payStatus === '已支付') {
      return { paid: rec.amount, unpaid: 0 };
    }
    if (rec.payStatus === '未支付') {
      return { paid: 0, unpaid: rec.amount };
    }
    if (rec.payStatus === '部分支付') {
      var paid = Number(rec.paidAmount) || 0;
      var unpaid = Number(rec.pendingAmount);
      if (isNaN(unpaid) || unpaid === 0) unpaid = Math.max(0, rec.amount - paid);
      return { paid: paid, unpaid: unpaid };
    }
    return { paid: 0, unpaid: rec.amount };
  }

  function formatCell(val) {
    return val == null || val === '' ? PLACEHOLDER : val;
  }

  function escapeAttr(val) {
    return String(val == null ? '' : val)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function canApplyInvoice(rec) {
    return rec.payStatus === '已支付' && rec.invoiceFlag === '否';
  }

  function canSendQr(rec) {
    return rec.payStatus === '未支付' && !!rec.orderId;
  }

  function renderActions(rec) {
    var parts = [];
    if (rec.orderId) {
      parts.push('<button type="button" class="text-blue-600 hover:underline cursor-pointer js-view-order" data-order-id="' + rec.orderId + '">查看订单</button>');
    }
    parts.push(
      '<button type="button" class="text-blue-600 hover:underline cursor-pointer js-view-contract"' +
      ' data-contract-no="' + escapeAttr(rec.contractNo) + '"' +
      ' data-party-a="' + escapeAttr(rec.companyName) + '"' +
      ' data-party-a-contact="' + escapeAttr(rec.contactPhone || '') + '"' +
      ' data-amount="' + escapeAttr(typeof rec.amount === 'number' ? rec.amount.toFixed(2) : rec.amount) + '"' +
      ' data-status="' + escapeAttr(
        rec.contractStatus === '未签约' ? '未签约' :
        rec.contractStatus === '已作废' ? '已作废' :
        (rec.payStatus === '已支付' ? '已签约已支付' : '已签约未支付')
      ) + '"' +
      ' data-signed-at="' + escapeAttr(rec.signedAt || '—') + '"' +
      '>查看合同</button>'
    );
    if (rec.orderId) {
      parts.push('<button type="button" class="text-blue-600 hover:underline cursor-pointer js-add-order-remark" data-order-id="' + rec.orderId + '">添加订单备注</button>');
    }
    if (canSendQr(rec)) {
      parts.push('<button type="button" class="text-blue-600 hover:underline cursor-pointer js-send-payment-qr" data-order-id="' + rec.orderId + '">发送收款码</button>');
    }
    if (canApplyInvoice(rec)) {
      parts.push('<button type="button" class="text-blue-600 hover:underline cursor-pointer js-apply-invoice" data-order-id="' + rec.orderId + '">申请开票</button>');
    }
    if (rec.invoiceFlag === '是' && rec.orderId) {
      parts.push('<button type="button" class="text-blue-600 hover:underline cursor-pointer js-view-invoice" data-order-id="' + rec.orderId + '">查看开票</button>');
    }
    return parts.join('<span class="text-slate-300 px-1">|</span>');
  }

  function renderTable() {
    var tbody = document.getElementById('co-table-body');
    var countEl = document.getElementById('co-result-count');
    if (!tbody) return;
    var list = getFilteredRecords();
    if (countEl) countEl.textContent = '共 ' + list.length + ' 条';

    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="16" class="px-3 py-10 text-center text-slate-400">暂无符合条件的数据</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(function (rec) {
      var contact = rec.contactName + ' / ' + rec.contactPhone;
      var amounts = getPaidUnpaid(rec);
      return (
        '<tr class="hover:bg-slate-50 co-row" data-record-id="' + rec.id + '">' +
        '<td class="px-3 py-3 border-b border-slate-100">' + rec.contractType + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + rec.companyName + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + contact + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + formatAmount(rec.amount) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100"><span class="font-medium ' + (contractStatusClass[rec.contractStatus] || '') + '">' + rec.contractStatus + '</span></td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + formatCell(rec.signedAt) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100 text-emerald-600">' + formatAmount(amounts.paid) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100' + (amounts.unpaid > 0 ? ' text-amber-600' : '') + '">' + formatAmount(amounts.unpaid) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100"><span class="font-medium ' + (payStatusClass[rec.payStatus] || 'text-slate-500') + '">' + formatCell(rec.payStatus) + '</span></td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + formatCell(rec.payChannel) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + formatCell(rec.payTime) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + formatCell(rec.invoiceFlag) + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + rec.salesperson + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100">' + rec.department + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100 font-mono text-xs">' + rec.contractNo + '</td>' +
        '<td class="px-3 py-3 border-b border-slate-100 whitespace-nowrap">' + renderActions(rec) + '</td>' +
        '</tr>'
      );
    }).join('');
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value == null || value === '' ? PLACEHOLDER : value;
  }

  function showToast(msg) {
    var t = document.getElementById('toast-co');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(window._coToastTimer);
    window._coToastTimer = setTimeout(function () { t.classList.add('hidden'); }, 2000);
  }

  function toggleCustomRange(presetId, wrapId, preset) {
    var wrap = document.getElementById(wrapId);
    if (wrap) wrap.classList.toggle('hidden', preset !== 'custom');
  }

  function readFiltersFromForm() {
    var f = state.filters;
    f.contractTypes = [];
    document.querySelectorAll('[name="filter-contract-type"]:checked').forEach(function (el) {
      f.contractTypes.push(el.value);
    });
    var sp = document.getElementById('filter-salesperson');
    var dp = document.getElementById('filter-department');
    var cn = document.getElementById('filter-company-name');
    f.salesperson = sp && sp.value !== 'all' ? sp.value : '';
    f.department = dp && dp.value !== 'all' ? dp.value : '';
    f.companyName = cn ? cn.value.trim() : '';

    ['pay', 'sign', 'create'].forEach(function (key) {
      var presetEl = document.getElementById('filter-' + key + '-time-preset');
      var startEl = document.getElementById('filter-' + key + '-time-start');
      var endEl = document.getElementById('filter-' + key + '-time-end');
      var preset = presetEl ? presetEl.value : '';
      f[key + 'TimePreset'] = preset === 'all' ? '' : preset;
      f[key + 'TimeStart'] = startEl ? startEl.value : '';
      f[key + 'TimeEnd'] = endEl ? endEl.value : '';
      toggleCustomRange('filter-' + key + '-time-preset', 'filter-' + key + '-time-custom', preset);
    });
  }

  function resetForm() {
    document.querySelectorAll('[name="filter-contract-type"]').forEach(function (el) { el.checked = true; });
    ['filter-salesperson', 'filter-department'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = 'all';
    });
    var cn = document.getElementById('filter-company-name');
    if (cn) cn.value = '';
    ['pay', 'sign', 'create'].forEach(function (key) {
      var presetEl = document.getElementById('filter-' + key + '-time-preset');
      if (presetEl) presetEl.value = 'all';
      var startEl = document.getElementById('filter-' + key + '-time-start');
      var endEl = document.getElementById('filter-' + key + '-time-end');
      if (startEl) startEl.value = '';
      if (endEl) endEl.value = '';
      toggleCustomRange('', 'filter-' + key + '-time-custom', '');
    });
    state.filters = {
      contractTypes: [],
      salesperson: '',
      department: '',
      companyName: '',
      payTimePreset: '',
      payTimeStart: '',
      payTimeEnd: '',
      signTimePreset: '',
      signTimeStart: '',
      signTimeEnd: '',
      createTimePreset: '',
      createTimeStart: '',
      createTimeEnd: ''
    };
    renderTable();
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    document.querySelectorAll('[data-co-tab]').forEach(function (btn) {
      var active = btn.getAttribute('data-co-tab') === tab;
      btn.className = active
        ? 'co-tab pb-2 -mb-px border-b-2 border-blue-600 text-blue-600 font-medium cursor-pointer whitespace-nowrap'
        : 'co-tab pb-2 -mb-px border-b-2 border-transparent text-slate-500 hover:text-slate-700 cursor-pointer whitespace-nowrap';
    });
    renderTable();
  }

  /* —— 订单详情 / 开票 / 备注 / 收款码（沿用 order-management 逻辑） —— */
  var modal = document.getElementById('order-detail-modal');
  var applyInvModal = document.getElementById('modal-apply-invoice');
  var invDetailModal = document.getElementById('modal-inv-detail');
  var paymentQrModal = document.getElementById('modal-payment-qrcode');
  var orderRemarkModal = document.getElementById('modal-order-remark');
  var orderRemarkPayMethod = document.getElementById('order-remark-pay-method');
  var orderRemarkFieldsWecom = document.getElementById('order-remark-fields-wecom');
  var orderRemarkFieldsVoucher = document.getElementById('order-remark-fields-voucher');
  var orderRemarkFieldsCommon = document.getElementById('order-remark-fields-common');
  var orderRemarkTradeNo = document.getElementById('order-remark-trade-no');
  var orderRemarkPayTimeStart = document.getElementById('order-remark-pay-time-start');
  var orderRemarkPayTimeEnd = document.getElementById('order-remark-pay-time-end');
  var orderRemarkInput = document.getElementById('order-remark-input');
  var orderRemarkUploadArea = document.getElementById('order-remark-upload-area');
  var orderRemarkUploadEmpty = document.getElementById('order-remark-upload-empty');
  var orderRemarkUploadPreview = document.getElementById('order-remark-upload-preview');
  var orderRemarkVoucherFile = document.getElementById('order-remark-voucher-file');
  var orderRemarkVoucherImg = document.getElementById('order-remark-voucher-img');
  var orderRemarkVoucherName = document.getElementById('order-remark-voucher-name');
  var orderRemarkVoucherClear = document.getElementById('order-remark-voucher-clear');
  var btnOrderRemarkSubmit = document.getElementById('btn-order-remark-submit');
  var currentRemarkOrderId = null;
  var currentRemarkVoucherUrl = null;
  var currentRemarkVoucherName = '';
  var PAY_METHOD_LABEL = { wecom: '企业微信', bank: '对公转账', alipay: '支付宝' };
  var currentDetailOrderId = null;
  /** 「所有合同」Tab 列表前三条对应的订单（详情弹窗显示「发送收款码」） */
  var topThreeOrderIds = records.slice(0, 3).map(function (r) { return r.orderId; }).filter(Boolean);

  function usesSendQrInDetail(orderId) {
    return topThreeOrderIds.indexOf(orderId) !== -1;
  }
  var pqPayMethod = document.getElementById('pq-pay-method');
  var pqQrWrap = document.getElementById('pq-qr-wrap');
  var pqQrImage = document.getElementById('pq-qr-image');
  var pqQrLabel = document.getElementById('pq-qr-label');
  var pqQrHint = document.getElementById('pq-qr-hint');
  var btnCopyPaymentQr = document.getElementById('btn-copy-payment-qr');
  var currentPaymentQrOrderId = null;

  function buildQrImageUrl(payload, color) {
    return 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=' + (color || '000000') + '&data=' + encodeURIComponent(payload);
  }

  function buildPaymentPayload(method, orderId, amount) {
    if (method === 'alipay') return 'ALIPAY|ORDER:' + orderId + '|AMT:' + amount;
    if (method === 'wechat') return 'WECHAT|ORDER:' + orderId + '|AMT:' + amount;
    return 'BANK|ORDER:' + orderId + '|AMT:' + amount + '|ACCT:苏州范阳信息科技有限公司|BANK:中国工商银行苏州工业园区支行';
  }

  function resetPaymentQrPreview() {
    if (pqPayMethod) pqPayMethod.value = '';
    if (pqQrWrap) pqQrWrap.classList.add('hidden');
    if (pqQrImage) pqQrImage.removeAttribute('src');
    if (btnCopyPaymentQr) btnCopyPaymentQr.classList.add('hidden');
    currentPaymentQrOrderId = null;
  }

  function renderPaymentQr(method) {
    if (!method || !currentPaymentQrOrderId) {
      if (pqQrWrap) pqQrWrap.classList.add('hidden');
      if (btnCopyPaymentQr) btnCopyPaymentQr.classList.add('hidden');
      return;
    }
    var d = orderDetails[currentPaymentQrOrderId];
    if (!d) return;
    var meta = payMethodMeta[method];
    var payload = buildPaymentPayload(method, d.orderNo, d.amount);
    if (pqQrLabel) pqQrLabel.textContent = meta.label;
    if (pqQrHint) pqQrHint.textContent = meta.hint;
    if (pqQrImage) pqQrImage.src = buildQrImageUrl(payload, meta.color);
    if (pqQrWrap) pqQrWrap.classList.remove('hidden');
    if (btnCopyPaymentQr) btnCopyPaymentQr.classList.remove('hidden');
  }

  function openPaymentQrModal(orderId) {
    var d = orderDetails[orderId];
    if (!d || !paymentQrModal || d.status !== 'unpaid') return;
    currentPaymentQrOrderId = orderId;
    setText('pq-order-no', d.orderNo);
    var amtEl = document.getElementById('pq-order-amount');
    if (amtEl) amtEl.textContent = '¥' + d.amount;
    resetPaymentQrPreview();
    currentPaymentQrOrderId = orderId;
    paymentQrModal.classList.remove('hidden');
    paymentQrModal.classList.add('flex');
    paymentQrModal.setAttribute('aria-hidden', 'false');
  }

  function toDatetimeLocalValue(str) {
    if (!str) return '';
    return String(str).replace(' ', 'T').slice(0, 16);
  }

  function fromDatetimeLocalValue(str) {
    if (!str) return '';
    return String(str).replace('T', ' ') + (str.length === 16 ? ':00' : '');
  }

  function clearRemarkVoucher() {
    if (currentRemarkVoucherUrl) {
      try { URL.revokeObjectURL(currentRemarkVoucherUrl); } catch (e) { /* ignore */ }
    }
    currentRemarkVoucherUrl = null;
    currentRemarkVoucherName = '';
    if (orderRemarkVoucherFile) orderRemarkVoucherFile.value = '';
    if (orderRemarkVoucherImg) orderRemarkVoucherImg.removeAttribute('src');
    if (orderRemarkVoucherName) orderRemarkVoucherName.textContent = '';
    if (orderRemarkUploadEmpty) orderRemarkUploadEmpty.classList.remove('hidden');
    if (orderRemarkUploadPreview) orderRemarkUploadPreview.classList.add('hidden');
  }

  function setRemarkVoucherPreview(file) {
    if (!file) {
      clearRemarkVoucher();
      return;
    }
    if (currentRemarkVoucherUrl) {
      try { URL.revokeObjectURL(currentRemarkVoucherUrl); } catch (e) { /* ignore */ }
    }
    currentRemarkVoucherUrl = URL.createObjectURL(file);
    currentRemarkVoucherName = file.name || '支付凭证';
    if (orderRemarkVoucherImg) orderRemarkVoucherImg.src = currentRemarkVoucherUrl;
    if (orderRemarkVoucherName) orderRemarkVoucherName.textContent = currentRemarkVoucherName;
    if (orderRemarkUploadEmpty) orderRemarkUploadEmpty.classList.add('hidden');
    if (orderRemarkUploadPreview) orderRemarkUploadPreview.classList.remove('hidden');
  }

  function syncOrderRemarkFieldsByPayMethod() {
    var method = orderRemarkPayMethod ? orderRemarkPayMethod.value : '';
    var isWecom = method === 'wecom';
    var isVoucher = method === 'bank' || method === 'alipay';
    if (orderRemarkFieldsWecom) orderRemarkFieldsWecom.classList.toggle('hidden', !isWecom);
    if (orderRemarkFieldsVoucher) orderRemarkFieldsVoucher.classList.toggle('hidden', !isVoucher);
    if (orderRemarkFieldsCommon) orderRemarkFieldsCommon.classList.toggle('hidden', !(isWecom || isVoucher));
    if (!isVoucher) clearRemarkVoucher();
  }

  function openOrderRemarkModal(orderId) {
    var d = orderDetails[orderId];
    if (!d || !orderRemarkModal) return;
    currentRemarkOrderId = orderId;
    if (orderRemarkPayMethod) orderRemarkPayMethod.value = d.remarkPayMethod || '';
    if (orderRemarkTradeNo) orderRemarkTradeNo.value = d.tradeNo || '';
    if (orderRemarkPayTimeStart) orderRemarkPayTimeStart.value = toDatetimeLocalValue(d.payTimeStart || '');
    if (orderRemarkPayTimeEnd) orderRemarkPayTimeEnd.value = toDatetimeLocalValue(d.payTimeEnd || '');
    if (orderRemarkInput) orderRemarkInput.value = d.remark || '';
    clearRemarkVoucher();
    if (d.voucherName) {
      currentRemarkVoucherName = d.voucherName;
      if (orderRemarkVoucherName) orderRemarkVoucherName.textContent = d.voucherName;
      if (d.voucherUrl && orderRemarkVoucherImg) {
        orderRemarkVoucherImg.src = d.voucherUrl;
        currentRemarkVoucherUrl = null;
        if (orderRemarkUploadEmpty) orderRemarkUploadEmpty.classList.add('hidden');
        if (orderRemarkUploadPreview) orderRemarkUploadPreview.classList.remove('hidden');
      }
    }
    syncOrderRemarkFieldsByPayMethod();
    orderRemarkModal.classList.remove('hidden');
    orderRemarkModal.classList.add('flex');
    orderRemarkModal.setAttribute('aria-hidden', 'false');
    if (orderRemarkPayMethod) orderRemarkPayMethod.focus();
  }

  function closeOrderRemarkModal() {
    if (!orderRemarkModal) return;
    orderRemarkModal.classList.add('hidden');
    orderRemarkModal.classList.remove('flex');
    orderRemarkModal.setAttribute('aria-hidden', 'true');
    currentRemarkOrderId = null;
    if (orderRemarkPayMethod) orderRemarkPayMethod.value = '';
    if (orderRemarkTradeNo) orderRemarkTradeNo.value = '';
    if (orderRemarkPayTimeStart) orderRemarkPayTimeStart.value = '';
    if (orderRemarkPayTimeEnd) orderRemarkPayTimeEnd.value = '';
    if (orderRemarkInput) orderRemarkInput.value = '';
    clearRemarkVoucher();
    syncOrderRemarkFieldsByPayMethod();
  }

  function closePaymentQrModal() {
    if (!paymentQrModal) return;
    paymentQrModal.classList.add('hidden');
    paymentQrModal.classList.remove('flex');
    paymentQrModal.setAttribute('aria-hidden', 'true');
    resetPaymentQrPreview();
  }

  function openModal(orderId) {
    var d = orderDetails[orderId];
    if (!d || !modal) return;

    currentDetailOrderId = orderId;

    setText('od-order-no', (d.status === 'paid' || d.status === 'partial') ? (d.tradeNo || null) : null);
    setText('od-created', d.createdAt);
    setText('od-pay-method', d.payMethod);
    setText('od-amount', d.amount);
    setText('od-pay-time', d.payTime);
    setText('od-remark', d.remark);
    setText('od-channel', d.channel);
    setText('od-sales', d.salesperson);
    setText('od-dept', d.dept);
    setText('od-invoice-flag', d.invoiceFlag);

    var st = document.getElementById('od-status');
    if (st) {
      st.textContent = d.payStatus;
      st.className = 'font-medium ' + (statusClassMap[d.status] || 'text-slate-900');
    }

    var link = document.getElementById('od-contract');
    if (link) {
      link.textContent = d.contractNo;
      link.href = 'contract-management.html#' + encodeURIComponent(d.contractNo);
    }

    var rowPartial = document.getElementById('od-row-partial');
    var rowRefund = document.getElementById('od-row-refund');
    var footer = document.getElementById('od-footer-actions');

    if (rowPartial) {
      rowPartial.classList.toggle('hidden', d.status !== 'partial');
      if (d.status === 'partial') {
        setText('od-total-amount', d.totalAmount);
        setText('od-paid-part', d.paidAmount);
        setText('od-pending-part', d.pendingAmount);
      }
    }
    if (rowRefund) rowRefund.classList.add('hidden');
    if (footer) footer.classList.toggle('hidden', d.status !== 'unpaid');

    var odPayBtn = document.getElementById('od-btn-pay');
    if (odPayBtn && d.status === 'unpaid') {
      odPayBtn.textContent = usesSendQrInDetail(orderId) ? '发送收款码' : '立即支付';
    }

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    currentDetailOrderId = null;
  }

  function resetApplyFormDefaults() {
    var sel = document.getElementById('modal-apply-contract');
    var c = document.getElementById('modal-apply-collect');
    var a = document.getElementById('modal-apply-invoice-amt');
    if (sel) {
      sel.innerHTML = '<option selected>' + DEFAULT_APPLY.contract + '</option><option>HT20260420002</option>';
    }
    if (c) c.value = DEFAULT_APPLY.collect;
    if (a) a.value = DEFAULT_APPLY.invoiceAmt;
  }

  function openApplyInvoice(orderId) {
    if (!applyInvModal) return;
    if (orderId && orderDetails[orderId]) {
      var d = orderDetails[orderId];
      if (d.status !== 'paid' || d.invoiceFlag === '是') {
        showToast('未支付或已开票订单不可申请开票');
        return;
      }
      var sel = document.getElementById('modal-apply-contract');
      var c = document.getElementById('modal-apply-collect');
      var a = document.getElementById('modal-apply-invoice-amt');
      var amt = d.amount != null ? String(d.amount) : '';
      if (sel) sel.innerHTML = '<option selected>' + d.contractNo + '</option>';
      if (c) c.value = amt;
      if (a) a.value = amt;
    } else {
      resetApplyFormDefaults();
    }
    applyInvModal.classList.remove('hidden');
    applyInvModal.setAttribute('aria-hidden', 'false');
  }

  function closeApply() {
    if (!applyInvModal) return;
    applyInvModal.classList.add('hidden');
    applyInvModal.setAttribute('aria-hidden', 'true');
  }

  function field(label, value, isLink) {
    var v = isLink
      ? '<a href="contract-management.html#' + encodeURIComponent(value) + '" class="text-blue-600 hover:underline">' + value + '</a>'
      : '<span class="text-slate-900">' + value + '</span>';
    return '<div class="flex flex-col gap-0.5"><span class="text-slate-500">' + label + '</span>' + v + '</div>';
  }

  function timelineItem(item, isLast) {
    var line = isLast ? '' : '<div class="absolute left-4 top-9 bottom-0 w-px bg-slate-200" aria-hidden="true"></div>';
    var icon = item.kind === 'pending'
      ? '<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-amber-200 bg-amber-50 text-amber-600"><i class="fa-regular fa-clock text-sm"></i></div>'
      : item.kind === 'reject'
        ? '<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white"><i class="fa-solid fa-xmark text-sm"></i></div>'
        : '<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"><i class="fa-solid fa-check text-sm"></i></div>';
    var comment = item.comment ? '<p class="mt-1 text-slate-500">' + item.comment + '</p>' : '';
    var timeLine = item.time ? '<p class="text-slate-500">' + item.time + '</p>' : '';
    return '<div class="relative flex gap-3 pb-6 last:pb-2">' + line + icon +
      '<div class="min-w-0 flex-1 pt-0.5"><p class="font-medium text-slate-800">' + item.step + '</p>' +
      '<p class="text-slate-600">' + item.name + '</p>' + timeLine +
      '<p class="' + item.statusClass + ' font-medium">' + item.status + '</p>' + comment + '</div></div>';
  }

  function openInvDetail(id) {
    var d = invRecords[id];
    if (!d || !invDetailModal) return;
    var b = document.getElementById('inv-detail-banner');
    if (b) {
      b.className = 'mx-5 mt-4 rounded-lg border px-4 py-3 text-sm border-blue-200 bg-sky-50/90 text-slate-900';
      b.innerHTML = '<div class="flex items-start gap-2"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"><i class="fa-solid fa-check text-sm"></i></span><div><p class="font-semibold">' + d.bannerTitle + '</p><p class="mt-1 text-slate-600">' + d.bannerSub + '</p></div></div>';
    }
    var g = document.getElementById('inv-info-grid');
    if (g) {
      g.innerHTML = field('开票公司', d.company) + field('收款金额', d.collectAmount) + field('开票金额', d.invoiceAmount) +
        field('开票类型', d.invoiceType) + field('关联合同', d.contract, true) + field('抬头', d.title) +
        field('抬头类型', d.titleType) + field('统一社会信用代码', d.creditCode) + field('收票邮箱', d.email);
    }
    var el = document.getElementById('inv-timeline');
    if (el && d.timeline) {
      el.innerHTML = d.timeline.map(function (item, i) { return timelineItem(item, i === d.timeline.length - 1); }).join('');
    }
    var f = document.getElementById('inv-detail-footer');
    if (f) f.innerHTML = '<button type="button" class="detail-close h-9 rounded-md border border-slate-200 bg-white px-6 text-sm text-slate-600 hover:bg-slate-50 cursor-pointer">关闭</button>';
    invDetailModal.classList.remove('hidden');
    invDetailModal.setAttribute('aria-hidden', 'false');
    invDetailModal.querySelectorAll('.detail-close').forEach(function (btn) { btn.onclick = closeInvDetail; });
  }

  function closeInvDetail() {
    if (!invDetailModal) return;
    invDetailModal.classList.add('hidden');
    invDetailModal.setAttribute('aria-hidden', 'true');
  }

  function bindEvents() {
    var btnSearch = document.getElementById('btn-co-search');
    var btnReset = document.getElementById('btn-co-reset');
    var btnExport = document.getElementById('btn-co-export');
    var btnApplyTop = document.getElementById('btn-open-apply-invoice');

    if (btnSearch) {
      btnSearch.addEventListener('click', function () {
        readFiltersFromForm();
        renderTable();
      });
    }
    if (btnReset) btnReset.addEventListener('click', resetForm);
    if (btnExport) {
      btnExport.addEventListener('click', function () { showToast('演示：正在导出 ' + getFilteredRecords().length + ' 条记录'); });
    }
    if (btnApplyTop) btnApplyTop.addEventListener('click', function () { openApplyInvoice(); });

    document.querySelectorAll('[data-co-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveTab(btn.getAttribute('data-co-tab'));
      });
    });

    ['pay', 'sign', 'create'].forEach(function (key) {
      var presetEl = document.getElementById('filter-' + key + '-time-preset');
      if (presetEl) {
        presetEl.addEventListener('change', function () {
          toggleCustomRange('', 'filter-' + key + '-time-custom', presetEl.value);
        });
      }
    });

    var tbody = document.getElementById('co-table-body');
    if (tbody) {
      tbody.addEventListener('click', function (e) {
        var orderBtn = e.target.closest('[data-order-id]');
        var orderId = orderBtn && orderBtn.getAttribute('data-order-id');
        if (e.target.closest('.js-view-order') && orderId) {
          openModal(orderId);
          return;
        }
        if (e.target.closest('.js-view-contract')) {
          return;
        }
        if (e.target.closest('.js-apply-invoice') && orderId) {
          openApplyInvoice(orderId);
          return;
        }
        if (e.target.closest('.js-view-invoice') && orderId) {
          openInvDetail(orderId);
          return;
        }
        if (e.target.closest('.js-send-payment-qr') && orderId) {
          openPaymentQrModal(orderId);
          return;
        }
        if (e.target.closest('.js-add-order-remark') && orderId) {
          openOrderRemarkModal(orderId);
        }
      });
    }

    if (orderRemarkModal) {
      orderRemarkModal.querySelectorAll('.order-remark-close, [data-close-order-remark]').forEach(function (el) {
        el.addEventListener('click', closeOrderRemarkModal);
      });
    }
    if (orderRemarkPayMethod) {
      orderRemarkPayMethod.addEventListener('change', syncOrderRemarkFieldsByPayMethod);
    }
    if (orderRemarkUploadArea && orderRemarkVoucherFile) {
      orderRemarkUploadArea.addEventListener('click', function (e) {
        if (e.target && e.target.closest && e.target.closest('#order-remark-voucher-clear')) return;
        orderRemarkVoucherFile.click();
      });
      orderRemarkUploadArea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          orderRemarkVoucherFile.click();
        }
      });
      orderRemarkVoucherFile.addEventListener('change', function () {
        var file = orderRemarkVoucherFile.files && orderRemarkVoucherFile.files[0];
        if (!file) return;
        if (!/^image\/(png|jpeg|jpg)$/i.test(file.type) && !/\.(png|jpe?g)$/i.test(file.name || '')) {
          showToast('请上传 JPG 或 PNG 图片');
          orderRemarkVoucherFile.value = '';
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          showToast('图片不能超过 10MB');
          orderRemarkVoucherFile.value = '';
          return;
        }
        setRemarkVoucherPreview(file);
      });
    }
    if (orderRemarkVoucherClear) {
      orderRemarkVoucherClear.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearRemarkVoucher();
      });
    }
    if (btnOrderRemarkSubmit) {
      btnOrderRemarkSubmit.addEventListener('click', function () {
        if (!currentRemarkOrderId) return;
        var method = orderRemarkPayMethod ? orderRemarkPayMethod.value : '';
        if (!method) {
          showToast('请选择支付方式');
          if (orderRemarkPayMethod) orderRemarkPayMethod.focus();
          return;
        }

        var tradeNo = '';
        if (method === 'wecom') {
          tradeNo = orderRemarkTradeNo ? orderRemarkTradeNo.value.trim() : '';
          if (!tradeNo) {
            showToast('请填写交易单号');
            if (orderRemarkTradeNo) orderRemarkTradeNo.focus();
            return;
          }
          if (tradeNo.length > 30) {
            showToast('交易单号不能超过30个字符');
            if (orderRemarkTradeNo) orderRemarkTradeNo.focus();
            return;
          }
        } else {
          var hasFile = orderRemarkVoucherFile && orderRemarkVoucherFile.files && orderRemarkVoucherFile.files[0];
          var hasSaved = !!currentRemarkVoucherName;
          if (!hasFile && !hasSaved) {
            showToast('请上传支付凭证');
            return;
          }
        }

        var payStart = orderRemarkPayTimeStart ? orderRemarkPayTimeStart.value : '';
        var payEnd = orderRemarkPayTimeEnd ? orderRemarkPayTimeEnd.value : '';
        if (!payStart || !payEnd) {
          showToast('请选择收款起止时间');
          if (!payStart && orderRemarkPayTimeStart) orderRemarkPayTimeStart.focus();
          else if (orderRemarkPayTimeEnd) orderRemarkPayTimeEnd.focus();
          return;
        }
        if (payStart > payEnd) {
          showToast('收款开始时间不能晚于结束时间');
          if (orderRemarkPayTimeStart) orderRemarkPayTimeStart.focus();
          return;
        }
        var text = orderRemarkInput ? orderRemarkInput.value.trim() : '';
        if (!text) {
          showToast('请填写订单备注');
          if (orderRemarkInput) orderRemarkInput.focus();
          return;
        }
        var d = orderDetails[currentRemarkOrderId];
        if (d) {
          d.remarkPayMethod = method;
          d.remarkPayMethodLabel = PAY_METHOD_LABEL[method] || method;
          d.payTimeStart = fromDatetimeLocalValue(payStart);
          d.payTimeEnd = fromDatetimeLocalValue(payEnd);
          d.remark = text;
          if (method === 'wecom') {
            d.tradeNo = tradeNo;
            d.voucherName = '';
            d.voucherUrl = '';
          } else {
            d.tradeNo = d.tradeNo || null;
            if (orderRemarkVoucherFile && orderRemarkVoucherFile.files && orderRemarkVoucherFile.files[0]) {
              d.voucherName = orderRemarkVoucherFile.files[0].name;
              d.voucherUrl = currentRemarkVoucherUrl || '';
              currentRemarkVoucherUrl = null;
            } else if (currentRemarkVoucherName) {
              d.voucherName = currentRemarkVoucherName;
            }
          }
        }
        showToast('订单备注已保存');
        if (currentDetailOrderId === currentRemarkOrderId && d) {
          setText('od-remark', text);
          setText('od-order-no', (d.status === 'paid' || d.status === 'partial') ? (d.tradeNo || null) : null);
        }
        closeOrderRemarkModal();
      });
    }

    if (pqPayMethod) pqPayMethod.addEventListener('change', function () { renderPaymentQr(pqPayMethod.value); });
    if (paymentQrModal) {
      paymentQrModal.querySelectorAll('.payment-qr-close, [data-close-payment-qr]').forEach(function (el) {
        el.addEventListener('click', closePaymentQrModal);
      });
    }
    if (btnCopyPaymentQr) {
      btnCopyPaymentQr.addEventListener('click', function () {
        if (!pqQrImage || !pqQrImage.src) return;
        showToast('收款码链接已复制');
      });
    }

    var odClose = document.getElementById('order-detail-close');
    if (odClose) odClose.addEventListener('click', closeModal);
    if (modal) {
      modal.querySelectorAll('[data-close-modal]').forEach(function (el) { el.addEventListener('click', closeModal); });
    }
    var odPay = document.getElementById('od-btn-pay');
    if (odPay) {
      odPay.addEventListener('click', function () {
        var id = currentDetailOrderId;
        if (id && usesSendQrInDetail(id)) {
          closeModal();
          openPaymentQrModal(id);
          return;
        }
        closeModal();
      });
    }

    if (applyInvModal) {
      applyInvModal.querySelectorAll('.apply-close, [data-close-apply]').forEach(function (el) {
        el.addEventListener('click', closeApply);
      });
    }
    var btnApplySubmit = document.getElementById('btn-apply-submit');
    if (btnApplySubmit) {
      btnApplySubmit.addEventListener('click', function () {
        closeApply();
        showToast('提交成功');
      });
    }

    var invDetailClose = document.getElementById('inv-detail-close');
    if (invDetailClose) invDetailClose.addEventListener('click', closeInvDetail);
    if (invDetailModal) {
      invDetailModal.querySelectorAll('[data-close-detail]').forEach(function (el) {
        el.addEventListener('click', closeInvDetail);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (orderRemarkModal && !orderRemarkModal.classList.contains('hidden')) { closeOrderRemarkModal(); return; }
      if (invDetailModal && !invDetailModal.classList.contains('hidden')) { closeInvDetail(); return; }
      if (paymentQrModal && !paymentQrModal.classList.contains('hidden')) { closePaymentQrModal(); return; }
      if (applyInvModal && !applyInvModal.classList.contains('hidden')) { closeApply(); return; }
      if (modal && !modal.classList.contains('hidden')) closeModal();
    });

    var hash = location.hash.replace(/^#/, '');
    if (hash) {
      try { hash = decodeURIComponent(hash); } catch (err) { /* ignore */ }
      var match = records.find(function (r) { return r.contractNo === hash; });
      if (match) {
        var cn = document.getElementById('filter-company-name');
        if (cn) cn.value = match.companyName;
        readFiltersFromForm();
      }
    }
  }

  window.ContractOrderManagement = {
    records: records,
    orderDetails: orderDetails,
    getFilteredRecords: getFilteredRecords,
    matchesTab: matchesTab,
    canApplyInvoice: canApplyInvoice,
    canSendQr: canSendQr
  };

  function init() {
    bindEvents();
    setActiveTab('all');
    renderTable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
