;(function () {
  var costStore = {
    '苏州怡启尔科技有限公司': [
      { type: '审计费', amount: 1200, remark: '2025年度审计服务费' },
      { type: '刻章费', amount: 280, remark: '公章、财务章各一枚' }
    ],
    '苏州美药科技有限公司': [
      { type: '第三方地址费', amount: 3600, remark: '工业园区挂靠地址一年' }
    ]
  };

  function ensureStyles() {
    if (document.getElementById('customer-cost-modal-styles')) return;
    var style = document.createElement('style');
    style.id = 'customer-cost-modal-styles';
    style.textContent =
      '#modal-customer-cost:not(.hidden){display:flex}' +
      '.cost-exist-item{display:flex;flex-wrap:wrap;align-items:baseline;gap:0.25rem 0.75rem;padding:0.625rem 0.75rem;font-size:0.8125rem}' +
      '.cost-exist-item[data-editing="1"]{background:#eff6ff}' +
      '.cost-exist-main{flex:1 1 auto;min-width:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:0.25rem 0.75rem}' +
      '.cost-exist-type{color:#475569;font-weight:500}' +
      '.cost-exist-amount{color:#1e293b}' +
      '.cost-exist-remark{flex:1 1 100%;color:#94a3b8;font-size:0.75rem}' +
      '.cost-exist-edit{margin-left:auto;flex-shrink:0;color:#2563eb;font-size:0.75rem;background:transparent;border:0;cursor:pointer;padding:0}' +
      '.cost-exist-edit:hover{text-decoration:underline;color:#1d4ed8}';
    document.head.appendChild(style);
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatAmount(n) {
    return Number(n).toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function getCosts(company) {
    if (!company) return [];
    if (!costStore[company]) costStore[company] = [];
    return costStore[company];
  }

  function bindOpenSelectors(selectors) {
    (selectors || []).forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (btn) {
        if (btn._customerCostBound) return;
        btn._customerCostBound = true;
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var row = btn.closest('tr');
          var company = '';
          if (row) {
            var nameCell = row.querySelector('td:nth-child(2)');
            if (nameCell) company = nameCell.textContent.trim();
          }
          if (typeof window.openCustomerCostModal === 'function') {
            window.openCustomerCostModal({ company: company });
          }
        });
      });
    });
  }

  function resetForm(modal) {
    var typeInp = modal.querySelector('#cost-type');
    var amountInp = modal.querySelector('#cost-amount');
    var remarkInp = modal.querySelector('#cost-remark');
    if (typeInp) typeInp.value = '';
    if (amountInp) amountInp.value = '';
    if (remarkInp) remarkInp.value = '';
  }

  window.mountCustomerCostModal = function (opts) {
    opts = opts || {};
    ensureStyles();
    var modal = document.getElementById('modal-customer-cost');
    if (!modal) return;

    if (modal._costMounted) {
      bindOpenSelectors(opts.openSelectors);
      return;
    }
    modal._costMounted = true;

    var companyHint = modal.querySelector('#cost-company-hint');
    var existingWrap = modal.querySelector('#cost-existing-wrap');
    var existingList = modal.querySelector('#cost-existing-list');
    var existingTotal = modal.querySelector('#cost-existing-total');
    var formLabelRow = modal.querySelector('#cost-form-label-row');
    var formLabel = modal.querySelector('#cost-form-label');
    var cancelEditBtn = modal.querySelector('#btn-cost-cancel-edit');
    var typeInp = modal.querySelector('#cost-type');
    var amountInp = modal.querySelector('#cost-amount');
    var remarkInp = modal.querySelector('#cost-remark');
    var okBtn = modal.querySelector('#btn-cost-ok');
    var toast = document.getElementById('toast-customer-cost');
    var toastTimer = null;
    var currentCompany = '';
    var editingIndex = -1;

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg || '操作成功';
      toast.classList.remove('hidden');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.add('hidden'); }, 1800);
    }

    function syncFormMode() {
      var costs = getCosts(currentCompany);
      var isEditing = editingIndex >= 0;
      if (formLabelRow) {
        formLabelRow.classList.toggle('hidden', !costs.length && !isEditing);
      }
      if (formLabel) {
        formLabel.textContent = isEditing ? '修改成本' : '继续添加';
      }
      if (cancelEditBtn) {
        cancelEditBtn.classList.toggle('hidden', !isEditing);
      }
      if (okBtn) {
        okBtn.textContent = isEditing ? '确认修改' : '确认添加';
      }
    }

    function clearEditMode() {
      editingIndex = -1;
      resetForm(modal);
      syncFormMode();
      renderExisting();
    }

    function startEdit(index) {
      var costs = getCosts(currentCompany);
      var item = costs[index];
      if (!item) return;
      editingIndex = index;
      if (typeInp) typeInp.value = item.type || '';
      if (amountInp) amountInp.value = item.amount != null ? String(item.amount) : '';
      if (remarkInp) remarkInp.value = item.remark || '';
      syncFormMode();
      renderExisting();
      if (typeInp) {
        typeInp.focus();
        typeInp.select();
      }
      var formWrap = modal.querySelector('#cost-form-wrap');
      if (formWrap && formWrap.scrollIntoView) {
        formWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function renderExisting() {
      var costs = getCosts(currentCompany);
      if (!existingWrap || !existingList) return;

      if (!costs.length) {
        existingWrap.classList.add('hidden');
        existingList.innerHTML = '';
        if (existingTotal) existingTotal.textContent = '';
        syncFormMode();
        return;
      }

      existingWrap.classList.remove('hidden');
      var total = costs.reduce(function (sum, item) { return sum + Number(item.amount || 0); }, 0);
      if (existingTotal) existingTotal.textContent = '共 ' + costs.length + ' 项 · 合计 ¥' + formatAmount(total);

      existingList.innerHTML = costs.map(function (item, index) {
        var remark = item.remark
          ? '<span class="cost-exist-remark">' + escapeHtml(item.remark) + '</span>'
          : '';
        var editing = editingIndex === index;
        return (
          '<div class="cost-exist-item" data-editing="' + (editing ? '1' : '0') + '">' +
          '<div class="cost-exist-main">' +
          '<span class="cost-exist-type">' + escapeHtml(item.type) + '</span>' +
          '<span class="cost-exist-amount">¥' + formatAmount(item.amount) + '</span>' +
          remark +
          '</div>' +
          '<button type="button" class="cost-exist-edit" data-edit-index="' + index + '">' +
          (editing ? '修改中' : '修改') +
          '</button>' +
          '</div>'
        );
      }).join('');

      syncFormMode();
    }

    function showModal(ctx) {
      ctx = ctx || {};
      currentCompany = ctx.company || '';
      editingIndex = -1;
      if (companyHint) {
        companyHint.textContent = currentCompany ? '当前客户：' + currentCompany : '';
        companyHint.classList.toggle('hidden', !currentCompany);
      }
      resetForm(modal);
      renderExisting();
      syncFormMode();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
      if (typeInp) typeInp.focus();
    }

    function hideModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.setAttribute('aria-hidden', 'true');
      currentCompany = '';
      editingIndex = -1;
    }

    window.openCustomerCostModal = showModal;

    document.querySelectorAll('[data-close="customer-cost"]').forEach(function (el) {
      el.addEventListener('click', hideModal);
    });

    if (existingList) {
      existingList.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-edit-index]');
        if (!btn) return;
        var index = parseInt(btn.getAttribute('data-edit-index'), 10);
        if (isNaN(index)) return;
        if (editingIndex === index) return;
        startEdit(index);
      });
    }

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', function () {
        clearEditMode();
        if (typeInp) typeInp.focus();
      });
    }

    if (okBtn) {
      okBtn.addEventListener('click', function () {
        var type = typeInp ? typeInp.value.trim() : '';
        var amountRaw = amountInp ? amountInp.value.trim() : '';
        var remark = remarkInp ? remarkInp.value.trim() : '';
        var amount = parseFloat(amountRaw);

        if (!type) {
          showToast('请填写客户成本类型');
          if (typeInp) typeInp.focus();
          return;
        }
        if (!amountRaw || isNaN(amount) || amount < 0) {
          showToast('请填写有效的成本金额');
          if (amountInp) amountInp.focus();
          return;
        }

        var list = getCosts(currentCompany || '__unknown__');
        if (editingIndex >= 0 && editingIndex < list.length) {
          list[editingIndex] = { type: type, amount: amount, remark: remark };
          editingIndex = -1;
          resetForm(modal);
          renderExisting();
          showToast('客户成本已修改');
        } else {
          list.push({ type: type, amount: amount, remark: remark });
          resetForm(modal);
          renderExisting();
          showToast('客户成本已添加');
        }
        if (typeInp) typeInp.focus();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        if (editingIndex >= 0) {
          clearEditMode();
          return;
        }
        hideModal();
      }
    });

    bindOpenSelectors(opts.openSelectors || ['.js-add-customer-cost']);
  };
})();
