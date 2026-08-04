;(function () {
  var DEFAULT_CONTRACT = {
    no: '202607151016',
    title: '财税服务委托合同书',
    partyA: '苏州匠心膜界材料有限公司',
    partyB: '苏州企税康企业管理有限公司',
    termStart: '2026-07-01',
    termEnd: '2027-06-30',
    packageName: '小规模纳税人A',
    packagePrice: '800/年',
    amount: '800.00',
    status: '已签约未支付',
    signedAt: '2026-07-15 22:58:27',
    link: ''
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function mergeData(data) {
    var d = {};
    var key;
    for (key in DEFAULT_CONTRACT) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_CONTRACT, key)) d[key] = DEFAULT_CONTRACT[key];
    }
    if (data) {
      for (key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && data[key] != null && data[key] !== '') {
          d[key] = data[key];
        }
      }
    }
    if (!d.link) d.link = window.location.origin + window.location.pathname + '?contractNo=' + encodeURIComponent(d.no);
    return d;
  }

  function buildDocHtml(d) {
    return (
      '<div class="vc-doc mx-auto bg-white shadow-sm border border-slate-200 px-10 py-8 text-[13px] leading-7 text-slate-800 max-w-[780px]">' +
      '  <div class="flex items-center gap-2 mb-3">' +
      '    <img src="./assets/qishuikang-logo.png" alt="企税康" class="h-9 w-auto max-w-[160px] object-contain object-left mix-blend-multiply" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline-flex\'">' +
      '    <span class="hidden items-center gap-2 text-base font-semibold text-slate-800">' +
      '      <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs">企</span>企税康' +
      '    </span>' +
      '  </div>' +
      '  <div class="h-[3px] bg-red-600 mb-6"></div>' +
      '  <h1 class="text-center text-xl font-bold tracking-wide text-slate-900 mb-2">' + escapeHtml(d.title) + '</h1>' +
      '  <p class="text-right text-sm text-slate-700 mb-6">合同编号：' + escapeHtml(d.no) + '</p>' +
      '  <p class="mb-1">甲方：' + escapeHtml(d.partyA) + '</p>' +
      '  <p class="mb-5">乙方：' + escapeHtml(d.partyB) + '</p>' +
      '  <p class="mb-4 indent-[2em]">根据《中华人民共和国民法典》及相关法律法规的规定，甲乙双方在平等、自愿、公平、诚实信用的基础上，就甲方向乙方委托财税服务事宜，达成如下协议：</p>' +
      '  <p class="font-bold mb-2">一、代理期限</p>' +
      '  <p class="mb-4 indent-[2em]">甲方委托乙方提供财税服务的期限为 <strong>1年</strong>，自 <strong>' + escapeHtml(d.termStart) + '</strong> 起至 <strong>' + escapeHtml(d.termEnd) + '</strong> 止。服务期满前，双方可协商续约。</p>' +
      '  <p class="font-bold mb-2">二、委托业务内容</p>' +
      '  <p class="mb-2 indent-[2em]">甲方委托乙方办理下列财税服务事项：</p>' +
      '  <p class="mb-4 indent-[2em]">代账服务套餐：<strong>' + escapeHtml(d.packageName) + '</strong>，套餐价格：<strong>' + escapeHtml(d.packagePrice) + '</strong>。具体服务内容以双方确认的服务清单及乙方公示的服务标准为准。</p>' +
      '  <p class="font-bold mb-2">三、服务方式、服务费用及付款方式</p>' +
      '  <p class="mb-2 indent-[2em]">（一）服务方式：乙方根据甲方提供的原始凭证及资料，按约定周期完成账务处理、纳税申报及相关财税咨询服务；甲方应保证所提供资料真实、完整、合法。</p>' +
      '  <p class="mb-2 indent-[2em]">（二）服务费用：本合同约定服务费用合计为人民币 <strong>' + escapeHtml(d.amount) + '</strong> 元（大写以实际结算为准）。费用包含本合同约定范围内的常规代账服务，不含增值服务及政府规费。</p>' +
      '  <p class="mb-2 indent-[2em]">（三）付款方式：甲方应于合同签订后按约定完成费用支付。首期款项支付后乙方开始提供服务；如有尾款，甲方应在约定期限内付清。逾期未付的，乙方有权暂停服务并按约定追究违约责任。</p>' +
      '  <p class="mt-6 indent-[2em] text-slate-600">（以下条款略，完整内容以正式签署文本为准。）</p>' +
      '</div>'
    );
  }

  function ensureModal() {
    var modal = document.getElementById('modal-view-contract');
    var toast = document.getElementById('toast-view-contract');
    if (modal && toast) return { modal: modal, toast: toast };

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div id="modal-view-contract" class="hidden fixed inset-0 z-[180] items-center justify-center bg-slate-900/45 p-3 sm:p-5" role="dialog" aria-modal="true" aria-labelledby="view-contract-title">' +
      '  <div class="vc-panel relative flex w-full max-w-[1100px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl" style="height:min(92dvh,920px);max-height:92vh">' +
      '    <div class="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-4 sm:px-5">' +
      '      <h2 id="view-contract-title" class="text-sm font-medium text-slate-800">查看合同</h2>' +
      '      <button type="button" class="btn-close-view-contract h-8 rounded-md border border-blue-500 px-3 text-xs text-blue-600 hover:bg-blue-50">关闭页面</button>' +
      '    </div>' +
      '    <div class="flex min-h-0 flex-1 flex-col lg:flex-row">' +
      '      <div id="vc-doc-scroll" class="min-h-0 flex-1 overflow-y-auto bg-[#f3f4f6] px-4 py-5 sm:px-6">' +
      '      </div>' +
      '      <aside class="flex w-full shrink-0 flex-col border-t border-slate-200 bg-[#fafafa] lg:w-[280px] lg:border-l lg:border-t-0">' +
      '        <div class="border-b border-slate-200 px-4 py-3">' +
      '          <h3 class="text-sm font-semibold text-slate-800">签约与付款</h3>' +
      '        </div>' +
      '        <div class="space-y-4 px-4 py-4 text-sm">' +
      '          <div class="flex items-start justify-between gap-3">' +
      '            <span class="shrink-0 text-slate-500">合同状态</span>' +
      '            <span id="vc-status" class="text-right text-slate-800">已签约未支付</span>' +
      '          </div>' +
      '          <div class="flex items-start justify-between gap-3">' +
      '            <span class="shrink-0 text-slate-500">签约时间</span>' +
      '            <span id="vc-signed-at" class="text-right text-slate-800">—</span>' +
      '          </div>' +
      '          <div class="flex items-start justify-between gap-3">' +
      '            <span class="shrink-0 text-slate-500">合同金额</span>' +
      '            <span id="vc-amount" class="text-right font-medium text-slate-800">—</span>' +
      '          </div>' +
      '        </div>' +
      '      </aside>' +
      '    </div>' +
      '    <div class="modal-footer-actions flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:gap-3 sm:px-5">' +
      '      <button type="button" class="btn-close-view-contract h-9 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-700 hover:bg-slate-50">关闭</button>' +
      '      <button type="button" id="btn-vc-edit" class="h-9 rounded-md border border-blue-500 bg-white px-4 text-sm text-blue-600 hover:bg-blue-50">修改合同</button>' +
      '      <button type="button" id="btn-vc-copy-link" class="h-9 rounded-md border border-blue-500 bg-white px-4 text-sm text-blue-600 hover:bg-blue-50">点击复制合同链接</button>' +
      '      <button type="button" id="btn-vc-download" class="h-9 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">下载合同</button>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '<div id="toast-view-contract" class="fixed top-6 left-1/2 z-[200] hidden -translate-x-1/2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm text-white shadow-lg" role="status"></div>';

    document.body.appendChild(wrap);
    return {
      modal: document.getElementById('modal-view-contract'),
      toast: document.getElementById('toast-view-contract')
    };
  }

  window.mountViewContractModal = function (opts) {
    var options = opts || {};
    var selectors = options.openSelectors || ['.js-view-contract'];
    var nodes = ensureModal();
    var modal = nodes.modal;
    var toast = nodes.toast;
    var current = mergeData(null);
    var timer;

    function showToast(msg) {
      toast.textContent = msg || '操作成功';
      toast.classList.remove('hidden');
      clearTimeout(timer);
      timer = setTimeout(function () { toast.classList.add('hidden'); }, 2000);
    }

    function fillModal(data) {
      current = mergeData(data);
      var scroll = document.getElementById('vc-doc-scroll');
      if (scroll) scroll.innerHTML = buildDocHtml(current);
      var statusEl = document.getElementById('vc-status');
      var signedEl = document.getElementById('vc-signed-at');
      var amountEl = document.getElementById('vc-amount');
      if (statusEl) statusEl.textContent = current.status;
      if (signedEl) signedEl.textContent = current.signedAt;
      if (amountEl) amountEl.textContent = current.amount;
    }

    function openModal(data) {
      fillModal(data);
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden', 'qsk-modal-open');
    }

    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden', 'qsk-modal-open');
    }

    function readBtnData(btn) {
      if (!btn || !btn.getAttribute) return null;
      return {
        no: btn.getAttribute('data-contract-no'),
        partyA: btn.getAttribute('data-party-a'),
        amount: btn.getAttribute('data-amount'),
        status: btn.getAttribute('data-status'),
        signedAt: btn.getAttribute('data-signed-at'),
        packageName: btn.getAttribute('data-package'),
        packagePrice: btn.getAttribute('data-package-price'),
        termStart: btn.getAttribute('data-term-start'),
        termEnd: btn.getAttribute('data-term-end'),
        link: btn.getAttribute('data-contract-link')
      };
    }

    if (modal.dataset.viewContractBound !== '1') {
      modal.dataset.viewContractBound = '1';

      document.addEventListener('click', function (e) {
        var matched = null;
        for (var i = 0; i < selectors.length; i++) {
          matched = e.target.closest(selectors[i]);
          if (matched) break;
        }
        if (!matched) return;
        e.preventDefault();
        openModal(readBtnData(matched));
      });

      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
      modal.querySelectorAll('.btn-close-view-contract').forEach(function (b) {
        b.addEventListener('click', closeModal);
      });

      var copyBtn = modal.querySelector('#btn-vc-copy-link');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var text = current.link;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              showToast('合同链接已复制');
            }).catch(function () {
              showToast('合同链接已复制');
            });
          } else {
            showToast('合同链接已复制');
          }
        });
      }

      var downloadBtn = modal.querySelector('#btn-vc-download');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
          showToast('合同下载已开始（演示）');
        });
      }

      var editBtn = modal.querySelector('#btn-vc-edit');
      if (editBtn) {
        editBtn.addEventListener('click', function () {
          showToast('演示：进入修改合同');
        });
      }

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
      });
    }

    window.openViewContractModal = openModal;
    window.closeViewContractModal = closeModal;
  };
})();
