;(function () {
  var SERVICE_ITEMS = [
    '建账',
    '纳税申报',
    '原始凭证整理',
    '编制记账凭证',
    '编制财务报表（资产负债表、利润表）',
    '年度所得税汇算清缴',
    '工商年报公示',
    '基础财税咨询'
  ];

  var VOLUME_TIERS = [
    { id: 'basic', label: '基础（每月开票 < 5张）' },
    { id: 'normal', label: '常规（每月开票 6-20张）' },
    { id: 'high', label: '多量（每月开票 20-50张）' },
    { id: 'excess', label: '超量（每月开票 50-100张）' }
  ];

  function fieldClass() {
    return 'mt-1 w-full h-9 px-3 rounded border border-slate-200';
  }

  function bookkeepingContractInfoHTML() {
    var services = SERVICE_ITEMS.map(function (t) {
      return (
        '<label class="inline-flex items-center gap-1.5 cursor-pointer">' +
        '<input type="checkbox" class="accent-blue-600" checked><span>' + t + '</span></label>'
      );
    }).join('');

    var volumes = VOLUME_TIERS.map(function (t) {
      var checked = t.id === 'high' ? ' checked' : '';
      return (
        '<label class="inline-flex items-center gap-1.5 cursor-pointer">' +
        '<input type="radio" name="contractVolumeTier" class="accent-blue-600"' + checked + '>' +
        '<span>' + t.label + '</span></label>'
      );
    }).join('') +
      '<label class="inline-flex items-center gap-1.5 cursor-pointer">' +
      '<input type="checkbox" class="accent-blue-600"><span>常规发票提额</span></label>';

    return (
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-3">' +
      '  <label class="block"><span class="text-slate-600">纳税人性质 <span class="text-red-500">*</span></span>' +
      '    <select class="' + fieldClass() + '"><option selected>小规模纳税人</option><option>一般纳税人</option></select>' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">申报情况 <span class="text-red-500">*</span></span>' +
      '    <select class="' + fieldClass() + '"><option selected>常规申报</option><option>零申报</option><option>首次申报</option></select>' +
      '  </label>' +
      '</div>' +
      '<div class="flex gap-3">' +
      '  <div class="w-20 shrink-0 pt-0.5 text-slate-600 leading-6">记账报税 <span class="text-red-500">*</span></div>' +
      '  <div class="flex-1 flex flex-wrap gap-x-4 gap-y-2">' + services + '</div>' +
      '</div>' +
      '<div class="flex gap-3">' +
      '  <div class="w-20 shrink-0 pt-0.5 text-slate-600 leading-6">记账报税 <span class="text-red-500">*</span></div>' +
      '  <div class="flex-1 flex flex-wrap gap-x-4 gap-y-2">' + volumes + '</div>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
      '  <label class="block"><span class="text-slate-600">合同金额(元) <span class="text-red-500">*</span></span>' +
      '    <input type="number" min="0" step="0.01" placeholder="请输入" class="' + fieldClass() + ' js-cc-amount">' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">首笔款(元) <span class="text-red-500">*</span></span>' +
      '    <input type="number" min="0" step="0.01" placeholder="请输入" class="' + fieldClass() + ' js-cc-first">' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">尾款(元) <span class="text-red-500">*</span></span>' +
      '    <input type="text" class="' + fieldClass() + ' js-cc-final bg-slate-50 text-slate-400" disabled>' +
      '  </label>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
      '  <label class="block"><span class="text-slate-600">付款形式 <span class="text-red-500">*</span></span>' +
      '    <select class="' + fieldClass() + '"><option selected>年付</option><option>季付</option><option>月付</option></select>' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">服务时长 <span class="text-red-500">*</span></span>' +
      '    <div class="mt-1 flex items-center gap-2">' +
      '      <input type="number" min="1" value="1" class="w-full h-9 px-3 rounded border border-slate-200 js-cc-years">' +
      '      <span class="text-slate-500 shrink-0">年</span>' +
      '    </div>' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">赠送时长</span>' +
      '    <div class="mt-1 flex items-center gap-2">' +
      '      <input type="number" min="0" value="0" class="w-full h-9 px-3 rounded border border-slate-200 js-cc-gift">' +
      '      <span class="text-slate-500 shrink-0">个月</span>' +
      '    </div>' +
      '  </label>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-3">' +
      '  <label class="block"><span class="text-slate-600">起始日期 <span class="text-red-500">*</span></span>' +
      '    <input type="date" value="2026-04-14" class="' + fieldClass() + ' js-cc-start">' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">截止日期</span>' +
      '    <input type="date" value="2027-04-14" class="' + fieldClass() + ' js-cc-end">' +
      '  </label>' +
      '</div>' +
      '<label class="block"><span class="text-slate-600">补充条件</span>' +
      '  <textarea rows="3" maxlength="500" placeholder="对合同细节进行相关补充" class="mt-1 w-full px-3 py-2 rounded border border-slate-200 js-cc-extra"></textarea>' +
      '  <div class="mt-1 text-right text-xs text-slate-400"><span class="js-cc-extra-count">0</span>/500</div>' +
      '</label>'
    );
  }

  function otherContractInfoHTML() {
    return (
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
      '  <label class="block"><span class="text-slate-600">所选服务 <span class="text-red-500">*</span></span>' +
      '    <select class="' + fieldClass() + '"><option>请选择</option><option>地址托管</option><option>工商变更</option></select>' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">合同金额(元) <span class="text-red-500">*</span></span>' +
      '    <input type="text" placeholder="请输入" class="' + fieldClass() + '">' +
      '  </label>' +
      '  <label class="block"><span class="text-slate-600">付款方式 <span class="text-red-500">*</span></span>' +
      '    <select class="' + fieldClass() + '"><option>年付</option><option>季付</option></select>' +
      '  </label>' +
      '</div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">' +
      '  <label class="block"><span class="text-slate-600">合同起止</span><input type="date" value="2026-04-14" class="' + fieldClass() + '"></label>' +
      '  <label class="block"><span class="text-slate-600 invisible">结束</span><input type="date" value="2027-04-14" class="' + fieldClass() + '"></label>' +
      '  <label class="block"><span class="text-slate-600">履约时长</span><input type="text" value="1 年" class="' + fieldClass() + '"></label>' +
      '  <label class="block"><span class="text-slate-600">赠送时长</span><input type="text" value="0 个月" class="' + fieldClass() + '"></label>' +
      '</div>' +
      '<label class="block"><span class="text-slate-600">补充条件</span>' +
      '  <textarea rows="3" placeholder="对合同细节进行相关补充" class="mt-1 w-full px-3 py-2 rounded border border-slate-200"></textarea>' +
      '</label>'
    );
  }

  function addMonths(date, months) {
    var d = new Date(date.getTime());
    var day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() < day) d.setDate(0);
    return d;
  }

  function fmtDate(d) {
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + '-' + String(m).padStart(2, '0') + '-' + String(day).padStart(2, '0');
  }

  function bindBookkeepingCalcs(root) {
    var amount = root.querySelector('.js-cc-amount');
    var first = root.querySelector('.js-cc-first');
    var finalEl = root.querySelector('.js-cc-final');
    var years = root.querySelector('.js-cc-years');
    var gift = root.querySelector('.js-cc-gift');
    var start = root.querySelector('.js-cc-start');
    var end = root.querySelector('.js-cc-end');
    var extra = root.querySelector('.js-cc-extra');
    var extraCount = root.querySelector('.js-cc-extra-count');

    function syncMoney() {
      if (!amount || !first || !finalEl) return;
      var a = parseFloat(amount.value);
      var f = parseFloat(first.value);
      if (isNaN(a) || isNaN(f)) {
        finalEl.value = '';
        return;
      }
      finalEl.value = String(Math.max(0, Math.round((a - f) * 100) / 100));
    }

    function syncEnd() {
      if (!start || !end || !years) return;
      if (!start.value) return;
      var base = new Date(start.value + 'T00:00:00');
      if (isNaN(base.getTime())) return;
      var y = parseInt(years.value, 10) || 0;
      var g = gift ? (parseInt(gift.value, 10) || 0) : 0;
      end.value = fmtDate(addMonths(base, y * 12 + g));
    }

    if (amount) amount.addEventListener('input', syncMoney);
    if (first) first.addEventListener('input', syncMoney);
    if (years) years.addEventListener('input', syncEnd);
    if (gift) gift.addEventListener('input', syncEnd);
    if (start) start.addEventListener('input', syncEnd);
    if (extra && extraCount) {
      extra.addEventListener('input', function () {
        extraCount.textContent = String(extra.value.length);
      });
    }

    syncMoney();
    syncEnd();
  }

  function ensureModal() {
    var modal = document.getElementById('modal-create-contract');
    var toast = document.getElementById('toast-create-contract-success');
    if (modal && toast) return { modal: modal, toast: toast };

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div id="modal-create-contract" class="hidden flex fixed inset-0 z-[180] items-center justify-end bg-slate-900/45" role="dialog" aria-modal="true" aria-labelledby="create-contract-title">' +
      '  <div class="h-full w-full max-w-[860px] bg-white border-l border-slate-200 shadow-2xl flex flex-col">' +
      '    <div class="relative h-14 px-5 border-b border-slate-100 flex items-center justify-between shrink-0">' +
      '      <h2 id="create-contract-title" class="text-base font-semibold text-slate-800">创建合同</h2>' +
      '      <button type="button" class="btn-close-create-contract w-8 h-8 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"><i class="fa-solid fa-xmark"></i></button>' +
      '    </div>' +
      '    <form class="flex-1 overflow-y-auto px-4 py-4 space-y-4">' +
      '      <section class="border border-slate-200 rounded-lg overflow-hidden">' +
      '        <div class="h-9 px-3 bg-slate-50 text-sm text-slate-700 font-medium flex items-center"><span class="w-1 h-4 rounded bg-blue-600 mr-2"></span>基本信息</div>' +
      '        <div class="p-4 space-y-3 text-sm">' +
      '          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">' +
      '            <span class="w-20 shrink-0 text-slate-600">合同类型 <span class="text-red-500">*</span></span>' +
      '            <label class="inline-flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contractTypeShared" value="代账合同" class="accent-blue-600 js-cc-type" checked><span>代账合同</span></label>' +
      '            <label class="inline-flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contractTypeShared" value="注册地址合同" class="accent-blue-600 js-cc-type"><span>注册地址合同</span></label>' +
      '            <label class="inline-flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contractTypeShared" value="增值服务合同" class="accent-blue-600 js-cc-type"><span>增值服务合同</span></label>' +
      '          </div>' +
      '          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
      '            <label class="text-sm block"><span class="text-slate-600">企业名称 <span class="text-red-500">*</span></span><input type="text" placeholder="输入企业名称" class="' + fieldClass() + '"></label>' +
      '            <label class="text-sm block"><span class="text-slate-600">联系人 <span class="text-red-500">*</span></span><input type="text" placeholder="输入联系人姓名" class="' + fieldClass() + '"></label>' +
      '            <label class="text-sm block"><span class="text-slate-600">联系电话 <span class="text-red-500">*</span></span><input type="text" placeholder="输入联系人手机号" class="' + fieldClass() + '"></label>' +
      '          </div>' +
      '        </div>' +
      '      </section>' +
      '      <section class="border border-slate-200 rounded-lg overflow-hidden">' +
      '        <div class="h-9 px-3 bg-slate-50 text-sm text-slate-700 font-medium flex items-center"><span class="w-1 h-4 rounded bg-blue-600 mr-2"></span>合同信息</div>' +
      '        <div class="p-4 space-y-3 text-sm js-cc-contract-body">' + bookkeepingContractInfoHTML() + '</div>' +
      '      </section>' +
      '      <section class="border border-slate-200 rounded-lg overflow-hidden">' +
      '        <div class="h-9 px-3 bg-slate-50 text-sm text-slate-700 font-medium flex items-center"><span class="w-1 h-4 rounded bg-blue-600 mr-2"></span>签约信息</div>' +
      '        <div class="p-4 space-y-3 text-sm">' +
      '          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">' +
      '            <label class="block"><span class="text-slate-600">签约公司 <span class="text-red-500">*</span></span>' +
      '              <select class="' + fieldClass() + '"><option selected>苏州企税康科技有限公司</option><option>苏州范阳信息科技有限公司</option></select>' +
      '            </label>' +
      '            <label class="block"><span class="text-slate-600">签约人 <span class="text-red-500">*</span></span>' +
      '              <select class="' + fieldClass() + '"><option selected>周芳林</option><option>朱总</option></select>' +
      '            </label>' +
      '          </div>' +
      '          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">' +
      '            <span class="w-20 shrink-0 text-slate-600">签字类型 <span class="text-red-500">*</span></span>' +
      '            <label class="inline-flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contractSignType" class="accent-blue-600" checked><span>普通签字</span></label>' +
      '            <label class="inline-flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contractSignType" class="accent-blue-600"><span>法人签字</span></label>' +
      '          </div>' +
      '          <label class="block"><span class="text-slate-600">合同备注</span>' +
      '            <textarea rows="3" maxlength="500" placeholder="该信息客户不可见，仅用于内部备注" class="mt-1 w-full px-3 py-2 rounded border border-slate-200 js-cc-remark"></textarea>' +
      '            <div class="mt-1 text-right text-xs text-slate-400"><span class="js-cc-remark-count">0</span>/500</div>' +
      '          </label>' +
      '        </div>' +
      '      </section>' +
      '    </form>' +
      '    <div class="modal-footer-actions h-14 border-t border-slate-100 flex items-center justify-end gap-3 px-6 shrink-0">' +
      '      <button type="button" class="btn-close-create-contract h-9 px-6 rounded-md border border-slate-300 bg-white text-sm text-slate-600 hover:bg-slate-50 shrink-0">取消</button>' +
      '      <button type="button" id="btn-confirm-create-contract" class="h-9 px-6 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shrink-0">确认</button>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div id="toast-create-contract-success" class="fixed top-6 left-1/2 -translate-x-1/2 z-[130] hidden px-5 py-2.5 rounded-lg bg-slate-800 text-white text-sm shadow-lg" role="status">提交成功</div>';
    document.body.appendChild(wrap);
    return {
      modal: document.getElementById('modal-create-contract'),
      toast: document.getElementById('toast-create-contract-success')
    };
  }

  function wireContractTypeSwitch(modal) {
    var body = modal.querySelector('.js-cc-contract-body');
    if (!body) return;

    function render(type) {
      if (type === '代账合同') {
        body.innerHTML = bookkeepingContractInfoHTML();
        bindBookkeepingCalcs(modal);
      } else {
        body.innerHTML = otherContractInfoHTML();
      }
    }

    modal.querySelectorAll('.js-cc-type').forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (radio.checked) render(radio.value);
      });
    });

    bindBookkeepingCalcs(modal);
  }

  function wireRemarkCounter(modal) {
    var remark = modal.querySelector('.js-cc-remark');
    var count = modal.querySelector('.js-cc-remark-count');
    if (!remark || !count) return;
    remark.addEventListener('input', function () {
      count.textContent = String(remark.value.length);
    });
  }

  window.mountCreateContractModal = function (opts) {
    var options = opts || {};
    var selectors = options.openSelectors || ['#btn-open-create-contract'];
    var nodes = ensureModal();
    var modal = nodes.modal;
    var toast = nodes.toast;
    var timer;

    function openModal() {
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
    function closeModal() {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
    function showToast() {
      toast.classList.remove('hidden');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.add('hidden'); }, 2200);
    }

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (btn) {
        if (btn.dataset.contractModalBound === '1') return;
        btn.dataset.contractModalBound = '1';
        btn.addEventListener('click', openModal);
      });
    });

    if (modal.dataset.contractModalBound !== '1') {
      modal.dataset.contractModalBound = '1';
      modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
      modal.querySelectorAll('.btn-close-create-contract').forEach(function (b) {
        b.addEventListener('click', closeModal);
      });
      var confirmBtn = modal.querySelector('#btn-confirm-create-contract');
      if (confirmBtn) confirmBtn.addEventListener('click', function () { closeModal(); showToast(); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
      });
      wireContractTypeSwitch(modal);
      wireRemarkCounter(modal);
    }
  };
})();
