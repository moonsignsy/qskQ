;(function () {
  function ensureStyles() {
    if (document.getElementById('customer-supplement-modal-styles')) return;
    var style = document.createElement('style');
    style.id = 'customer-supplement-modal-styles';
    style.textContent =
      '#modal-supplement:not(.hidden){display:flex}' +
      '.field-label{font-size:12px;color:#334155;margin-bottom:4px;display:block}' +
      '.field-input{height:34px;width:100%;border:1px solid #e2e8f0;border-radius:4px;padding:0 10px;font-size:12px;color:#0f172a}' +
      '.field-input::placeholder,.field-textarea::placeholder{color:#94a3b8}' +
      '.field-textarea{width:100%;border:1px solid #e2e8f0;border-radius:4px;padding:8px 10px;font-size:12px;color:#0f172a;resize:vertical;min-height:68px}' +
      '.upload-card{height:86px;border:1px solid #dbeafe;border-radius:4px;background:#f0f7ff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#0ea5e9;font-size:11px;cursor:pointer}' +
      '.entity-type-box{height:34px;width:100%;border:1px solid #e2e8f0;border-radius:4px;padding:0 10px;display:flex;align-items:center;gap:16px;font-size:12px}' +
      '.entity-type-box label{display:inline-flex;align-items:center;gap:6px;color:#475569;cursor:pointer}' +
      '.shareholder-block+.shareholder-block{margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0}' +
      '.supp-ic-file-item{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;background:#f8fafc;font-size:12px;color:#334155}' +
      '.supp-ic-file-remove{color:#94a3b8;cursor:pointer;padding:2px 4px}' +
      '.supp-ic-file-remove:hover{color:#ef4444}' +
      '.supp-tax-sec{margin-bottom:20px}' +
      '.supp-tax-card{border:1px solid #e2e8f0;border-radius:8px;background:#fff;padding:14px;display:flex;flex-direction:column;min-height:156px}' +
      '.supp-tax-drop{flex:1;min-height:84px;border:1px dashed #dbeafe;border-radius:6px;background:#f0f7ff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#0ea5e9;font-size:12px;cursor:pointer}' +
      '.supp-tax-drop.has-file{border-style:solid;color:#1d4ed8;background:#eff6ff}' +
      '.supp-tax-drop.alt-mode{border-color:#fcd34d;background:#fffbeb;color:#b45309}' +
      '.supp-tax-hint{font-size:11px;color:#64748b;line-height:1.45;margin-top:4px}' +
      '.supp-tax-hint.warn{color:#b45309}' +
      '.supp-tax-err{font-size:11px;color:#dc2626;margin-top:4px;display:none}' +
      '.field-error .supp-tax-err{display:block}' +
      '.field-error .field-input,.field-error .field-textarea,.field-error .supp-tax-card,.field-error .entity-type-box{border-color:#ef4444}' +
      '.supp-tax-ghost{border:0;background:none;color:#2563eb;font-size:11px;cursor:pointer;padding:0;line-height:1.3}' +
      '.supp-tax-ghost:hover{text-decoration:underline}' +
      '.supp-tax-ghost.muted{color:#64748b}' +
      '.supp-tax-file{display:flex;align-items:center;gap:6px;max-width:100%;font-size:11px;color:#334155}' +
      '.supp-tax-file span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
      '.supp-tax-file-item{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border:1px solid #e2e8f0;border-radius:4px;background:#f8fafc;font-size:12px;color:#334155}' +
      '.supp-tax-alert{display:none;margin-bottom:12px;padding:8px 12px;border-radius:6px;background:#fef2f2;color:#b91c1c;font-size:12px;border:1px solid #fecaca}' +
      '.supp-tax-alert.is-on{display:block}' +
      '.supp-pwd-wrap{position:relative}' +
      '.supp-pwd-wrap .field-input{padding-right:32px}' +
      '.supp-pwd-toggle{position:absolute;right:8px;top:50%;transform:translateY(-50%);border:0;background:none;color:#94a3b8;cursor:pointer;padding:4px}' +
      '.supp-pwd-toggle:hover{color:#475569}' +
      '@media (hover:hover) and (pointer:fine){.supp-tax-drop:hover{border-color:#60a5fa;background:#e8f3ff}}';
    document.head.appendChild(style);
  }

  function bindIcAttachmentUpload() {
    ensureStyles();
    var input = document.getElementById('supp-ic-attachments');
    var list = document.getElementById('supp-ic-file-list');
    if (!input || input._icUploadBound) return;
    input._icUploadBound = true;
    var files = [];

    function renderFileList() {
      if (!list) return;
      if (!files.length) {
        list.classList.add('hidden');
        list.innerHTML = '';
        return;
      }
      list.classList.remove('hidden');
      list.innerHTML = files.map(function (file, index) {
        return '<li class="supp-ic-file-item">' +
          '<span class="truncate"><i class="fa-regular fa-file mr-1.5 text-slate-400"></i>' + file.name + '</span>' +
          '<button type="button" class="supp-ic-file-remove" data-index="' + index + '" aria-label="移除"><i class="fa-solid fa-xmark"></i></button>' +
          '</li>';
      }).join('');
    }

    input.addEventListener('change', function () {
      Array.prototype.forEach.call(input.files || [], function (file) {
        files.push(file);
      });
      input.value = '';
      renderFileList();
    });

    if (list) {
      list.addEventListener('click', function (e) {
        var btn = e.target.closest('.supp-ic-file-remove');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          files.splice(idx, 1);
          renderFileList();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindIcAttachmentUpload);
  } else {
    bindIcAttachmentUpload();
  }

  function companyFromTrigger(btn) {
    if (!btn) return '';
    var row = btn.closest('tr');
    if (row) {
      var cell = row.querySelector('td[title]') || row.cells[1];
      if (cell) return (cell.getAttribute('title') || cell.textContent || '').trim();
    }
    var nameEl = document.getElementById('customer-name');
    return nameEl ? (nameEl.textContent || '').trim() : '';
  }

  function showSuppToast(msg) {
    var el = document.getElementById('toast-supplement');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-supplement';
      el.className = 'fixed top-6 left-1/2 z-[200] -translate-x-1/2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm text-white shadow-lg hidden';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(function () { el.classList.add('hidden'); }, 1800);
  }

  function bindTaxGroupedForm(root) {
    var panel = (root || document).querySelector('#supp-panel-tax[data-tax-grouped]');
    if (!panel || panel._taxGroupedBound) return;
    panel._taxGroupedBound = true;
    var files = {};
    var missing = {};

    function renderFileList(key, list) {
      var ul = panel.querySelector('.js-tax-file-list[data-key="' + key + '"]');
      if (!ul) return;
      list = list || [];
      if (!list.length) {
        ul.classList.add('hidden');
        ul.innerHTML = '';
        return;
      }
      ul.classList.remove('hidden');
      ul.innerHTML = list.map(function (file, index) {
        return '<li class="supp-tax-file-item">' +
          '<span class="truncate"><i class="fa-regular fa-file mr-1.5 text-slate-400"></i>' + file.name + '</span>' +
          '<button type="button" class="js-tax-remove-file text-slate-400 hover:text-red-500 px-1" data-key="' + key + '" data-index="' + index + '" aria-label="移除"><i class="fa-solid fa-xmark"></i></button>' +
          '</li>';
      }).join('');
    }

    function setChip(drop, list) {
      var chip = drop.querySelector('.js-tax-chip');
      var label = drop.querySelector('.js-tax-drop-label');
      var key = drop.getAttribute('data-key');
      var input = drop.querySelector('.js-tax-file');
      var isMulti = input && input.multiple;
      list = list || [];
      if (isMulti) {
        drop.classList.toggle('has-file', list.length > 0);
        if (chip) { chip.classList.add('hidden'); chip.innerHTML = ''; }
        if (label) {
          label.classList.remove('hidden');
          label.textContent = list.length ? '继续添加文件' : '点击上传，可多选';
        }
        renderFileList(key, list);
        return;
      }
      if (!list.length) {
        drop.classList.remove('has-file');
        if (chip) { chip.classList.add('hidden'); chip.innerHTML = ''; }
        if (label) label.classList.remove('hidden');
        return;
      }
      drop.classList.add('has-file');
      if (label) label.classList.add('hidden');
      if (chip) {
        chip.classList.remove('hidden');
        chip.innerHTML = '<i class="fa-regular fa-file"></i><span>' + list[0].name + (list.length > 1 ? ' 等' + list.length + '个' : '') +
          '</span><button type="button" class="js-tax-remove-file text-slate-400 hover:text-red-500" data-key="' + key + '" aria-label="移除"><i class="fa-solid fa-xmark"></i></button>';
      }
    }

    function setMissing(key, on) {
      missing[key] = on;
      var doc = panel.querySelector('.js-tax-doc[data-key="' + key + '"]');
      if (!doc) return;
      var main = doc.querySelector('.js-tax-main-drop');
      var alt = doc.querySelector('.js-tax-alt');
      var missBtn = doc.querySelector('.js-tax-missing');
      if (on) {
        if (main) main.classList.add('hidden');
        if (alt) alt.classList.remove('hidden');
        if (missBtn) missBtn.classList.add('hidden');
        files[key] = [];
        if (main) setChip(main, []);
      } else {
        if (main) main.classList.remove('hidden');
        if (alt) alt.classList.add('hidden');
        if (missBtn) missBtn.classList.remove('hidden');
        files[key + 'Approval'] = [];
        var altDrop = doc.querySelector('.js-tax-drop[data-key="' + key + 'Approval"]');
        if (altDrop) setChip(altDrop, []);
        var note = doc.querySelector('.js-tax-note');
        if (note) note.value = '';
      }
    }

    function docSatisfied(key) {
      var doc = panel.querySelector('.js-tax-doc[data-key="' + key + '"]');
      if (!doc || doc.getAttribute('data-required') !== '1') return true;
      var type = doc.getAttribute('data-missing');
      if (type === 'approval') {
        return (files[key] && files[key].length) || (missing[key] && files[key + 'Approval'] && files[key + 'Approval'].length);
      }
      if (type === 'note') {
        var note = doc.querySelector('.js-tax-note');
        return (files[key] && files[key].length) || (missing[key] && note && note.value.trim());
      }
      return !!(files[key] && files[key].length);
    }

    function isCut() {
      var checked = panel.querySelector('.js-tax-agency:checked');
      return checked && checked.value === 'cut';
    }

    function applyAgency() {
      var cut = isCut();
      var wrap = panel.querySelector('.js-tax-company-wrap');
      if (wrap) wrap.classList.remove('hidden');
      panel.querySelectorAll('[data-agency="cut"]').forEach(function (el) {
        el.classList.toggle('hidden', !cut);
      });
    }

    function setError(el, on) {
      if (el) el.classList.toggle('field-error', !!on);
    }

    function validate() {
      var ok = true;
      var cut = isCut();
      panel.querySelectorAll('.field-error').forEach(function (el) { el.classList.remove('field-error'); });
      var company = panel.querySelector('.js-tax-company');
      if (!company || !company.value.trim()) { setError(panel.querySelector('.js-tax-company-wrap'), true); ok = false; }
      var alwaysDocs = ['idFront', 'idBack'];
      var cutDocs = ['trialBalance', 'balanceSheet', 'incomeStmt', 'payroll', 'staffList'];
      alwaysDocs.concat(cut ? cutDocs : []).forEach(function (k) {
        if (!docSatisfied(k)) { setError(panel.querySelector('.js-tax-doc[data-key="' + k + '"]'), true); ok = false; }
      });
      if (!(panel.querySelector('.js-tax-phone') && panel.querySelector('.js-tax-phone').value.trim())) {
        setError(panel.querySelector('.js-tax-phone-wrap'), true); ok = false;
      }
      if (cut) {
        if (!(panel.querySelector('.js-tax-pwd') && panel.querySelector('.js-tax-pwd').value.trim())) {
          setError(panel.querySelector('.js-tax-pwd-wrap'), true); ok = false;
        }
        if (!(panel.querySelector('.js-tax-annual') && panel.querySelector('.js-tax-annual').value.trim())) {
          setError(panel.querySelector('.js-tax-annual-wrap'), true); ok = false;
        }
        var social = panel.querySelector('.js-tax-social:checked');
        if (social && social.value === 'yes') {
          if (!(panel.querySelector('.js-tax-social-pwd') && panel.querySelector('.js-tax-social-pwd').value.trim())) {
            setError(panel.querySelector('.js-tax-social-pwd-wrap'), true); ok = false;
          }
        }
      }
      var alert = panel.querySelector('.js-tax-alert');
      if (alert) alert.classList.toggle('is-on', !ok);
      if (!ok) {
        var first = panel.querySelector('.field-error');
        if (first && first.scrollIntoView) first.scrollIntoView({ block: 'center' });
      }
      return ok;
    }

    panel._resetTaxGrouped = function (opts) {
      opts = opts || {};
      files = {};
      missing = {};
      panel.querySelectorAll('.field-error').forEach(function (el) { el.classList.remove('field-error'); });
      var alert = panel.querySelector('.js-tax-alert');
      if (alert) alert.classList.remove('is-on');
      panel.querySelectorAll('.js-tax-agency').forEach(function (r) { r.checked = r.value === 'new'; });
      applyAgency();
      var company = panel.querySelector('.js-tax-company');
      if (company) company.value = opts.company || '';
      ['js-tax-phone', 'js-tax-pwd', 'js-tax-annual', 'js-tax-bank', 'js-tax-social-pwd'].forEach(function (cls) {
        var input = panel.querySelector('.' + cls);
        if (input) input.value = '';
      });
      var other = panel.querySelector('.js-tax-other');
      if (other) other.value = '';
      panel.querySelectorAll('.js-tax-social').forEach(function (r) { r.checked = r.value === 'no'; });
      panel.querySelectorAll('.js-tax-ca').forEach(function (r) { r.checked = r.value === 'no'; });
      var socialWrap = panel.querySelector('.js-tax-social-pwd-wrap');
      if (socialWrap) socialWrap.classList.add('hidden');
      panel.querySelectorAll('.js-tax-doc').forEach(function (doc) {
        setMissing(doc.getAttribute('data-key'), false);
      });
      panel.querySelectorAll('.js-tax-file').forEach(function (input) { input.value = ''; });
      panel.querySelectorAll('.js-tax-drop').forEach(function (drop) { setChip(drop, []); });
    };

    panel.addEventListener('change', function (e) {
      var t = e.target;
      if (t.classList.contains('js-tax-agency')) applyAgency();
      if (t.classList.contains('js-tax-social')) {
        var wrap = panel.querySelector('.js-tax-social-pwd-wrap');
        if (wrap) wrap.classList.toggle('hidden', t.value !== 'yes');
      }
      if (t.classList.contains('js-tax-file')) {
        var key = t.getAttribute('data-key');
        var picked = Array.prototype.slice.call(t.files || []);
        if (t.multiple) files[key] = (files[key] || []).concat(picked);
        else files[key] = picked;
        t.value = '';
        var drop = t.closest('.js-tax-drop');
        if (drop) setChip(drop, files[key]);
        var docKey = key.replace(/Approval$/, '');
        if (files[key] && files[key].length && !/Approval$/.test(key)) setMissing(docKey, false);
        setError(t.closest('.js-tax-doc'), false);
      }
      if (t.classList.contains('js-tax-note')) setError(t.closest('.js-tax-doc'), false);
    });

    panel.addEventListener('click', function (e) {
      var pwdBtn = e.target.closest('.js-tax-pwd-toggle');
      if (pwdBtn) {
        var input = pwdBtn.parentElement.querySelector('input');
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        pwdBtn.innerHTML = show ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
        pwdBtn.setAttribute('aria-label', show ? '隐藏密码' : '显示密码');
        return;
      }
      var miss = e.target.closest('.js-tax-missing');
      if (miss) { setMissing(miss.getAttribute('data-key'), true); return; }
      var missOff = e.target.closest('.js-tax-missing-off');
      if (missOff) { setMissing(missOff.getAttribute('data-key'), false); return; }
      var rm = e.target.closest('.js-tax-remove-file');
      if (rm) {
        e.preventDefault();
        e.stopPropagation();
        var rkey = rm.getAttribute('data-key');
        var idx = parseInt(rm.getAttribute('data-index'), 10);
        if (!isNaN(idx) && files[rkey]) files[rkey].splice(idx, 1);
        else files[rkey] = [];
        var drop = panel.querySelector('.js-tax-drop[data-key="' + rkey + '"]');
        if (drop) {
          var input = drop.querySelector('.js-tax-file');
          if (input) input.value = '';
          setChip(drop, files[rkey] || []);
        }
      }
    });

    function fileNames(key) {
      return (files[key] || []).map(function (f) { return f.name; });
    }
    function collectDoc(key) {
      var doc = panel.querySelector('.js-tax-doc[data-key="' + key + '"]');
      var note = doc ? doc.querySelector('.js-tax-note') : null;
      return {
        missing: !!missing[key],
        files: fileNames(key),
        note: note ? note.value.trim() : '',
        approval: fileNames(key + 'Approval')
      };
    }
    function fieldVal(cls) {
      var el = panel.querySelector('.' + cls);
      return el ? el.value.trim() : '';
    }
    function radioVal(cls, fallback) {
      var el = panel.querySelector('.' + cls + ':checked');
      return el ? el.value : fallback;
    }
    panel._collectTaxGrouped = function () {
      return {
        agency: radioVal('js-tax-agency', 'new'),
        company: fieldVal('js-tax-company'),
        phone: fieldVal('js-tax-phone'),
        pwd: fieldVal('js-tax-pwd'),
        annual: fieldVal('js-tax-annual'),
        hasSocial: radioVal('js-tax-social', 'no'),
        socialPwd: fieldVal('js-tax-social-pwd'),
        hasCa: radioVal('js-tax-ca', 'no'),
        bank: fieldVal('js-tax-bank'),
        notes: fieldVal('js-tax-other'),
        docs: {
          trialBalance: collectDoc('trialBalance'),
          balanceSheet: collectDoc('balanceSheet'),
          incomeStmt: collectDoc('incomeStmt'),
          idFront: collectDoc('idFront'),
          idBack: collectDoc('idBack'),
          payroll: collectDoc('payroll'),
          staffList: collectDoc('staffList'),
          otherFiles: collectDoc('otherFiles')
        }
      };
    };
    panel._validateTaxGrouped = validate;
    applyAgency();
  }

  function bindOpenSelectors(selectors) {
    (selectors || []).forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (btn) {
        if (btn._customerSuppBound) return;
        btn._customerSuppBound = true;
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          if (typeof window.openCustomerSupplementModal === 'function') {
            window.openCustomerSupplementModal({ company: companyFromTrigger(btn) });
          }
        });
      });
    });
  }

  window.mountCustomerSupplementModal = function (opts) {
    opts = opts || {};
    ensureStyles();
    var modalSupplement = document.getElementById('modal-supplement');
    if (!modalSupplement) return;

    if (modalSupplement._supplementMounted) {
      bindOpenSelectors(opts.openSelectors);
      return;
    }
    modalSupplement._supplementMounted = true;
    bindIcAttachmentUpload();
    bindTaxGroupedForm(modalSupplement);

    var supplementTabs = document.querySelectorAll('#supplement-tabs .supp-tab');
    var suppTaxPanel = document.getElementById('supp-panel-tax');
    var suppIndustryPanel = document.getElementById('supp-panel-industry');
    var suppShareholderList = document.getElementById('supp-shareholder-list');
    var suppAddShareholderBtn = document.getElementById('supp-add-shareholder');
    var suppShareholderIndex = 0;

    function showSupplementModal() {
      modalSupplement.classList.remove('hidden');
      modalSupplement.classList.add('flex');
      modalSupplement.setAttribute('aria-hidden', 'false');
    }
    function hideSupplementModal() {
      modalSupplement.classList.add('hidden');
      modalSupplement.classList.remove('flex');
      modalSupplement.setAttribute('aria-hidden', 'true');
    }
    function switchSupplementTab(tab) {
      supplementTabs.forEach(function (btn) {
        var on = btn.getAttribute('data-tab') === tab;
        btn.classList.toggle('border-blue-600', on);
        btn.classList.toggle('text-blue-600', on);
        btn.classList.toggle('font-medium', on);
        btn.classList.toggle('border-transparent', !on);
        btn.classList.toggle('text-slate-500', !on);
      });
      if (suppTaxPanel) suppTaxPanel.classList.toggle('hidden', tab !== 'tax');
      if (suppIndustryPanel) suppIndustryPanel.classList.toggle('hidden', tab !== 'industry');
    }
    function applySuppEntityType(block) {
      var personRadio = block.querySelector('.supp-entity-type[value="person"]');
      if (!personRadio) return;
      var isPerson = personRadio.checked;
      var nameLabel = block.querySelector('.supp-sh-name-label');
      var nameInput = block.querySelector('.supp-sh-name');
      var idLabel = block.querySelector('.supp-sh-id-label');
      var idInput = block.querySelector('.supp-sh-id');
      if (!nameLabel || !nameInput || !idLabel || !idInput) return;
      if (isPerson) {
        nameLabel.textContent = '股东姓名';
        nameInput.placeholder = '请输入股东姓名';
        idLabel.textContent = '身份证号码';
        idInput.placeholder = '请输入身份证号码';
      } else {
        nameLabel.textContent = '股东公司名称';
        nameInput.placeholder = '请输入股东公司名称';
        idLabel.textContent = '统一社会信用代码';
        idInput.placeholder = '请输入统一社会信用代码';
      }
    }
    function bindSuppShareholderBlock(block) {
      block.querySelectorAll('.supp-entity-type').forEach(function (radio) {
        radio.addEventListener('change', function () { applySuppEntityType(block); });
      });
      applySuppEntityType(block);
    }
    function createSuppShareholderBlock(index) {
      var wrap = document.createElement('div');
      wrap.className = 'shareholder-block';
      wrap.setAttribute('data-shareholder-index', String(index));
      wrap.innerHTML =
        '<div class="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2.5">' +
        '<label class="supp-sh-name-wrap"><span class="field-label supp-sh-name-label">股东姓名</span><input type="text" class="field-input supp-sh-name" placeholder="请输入股东姓名"></label>' +
        '<div><span class="field-label">主体类型</span><div class="entity-type-box">' +
        '<label><input type="radio" name="supp-entityType-' + index + '" value="person" class="supp-entity-type"> 自然人</label>' +
        '<label><input type="radio" name="supp-entityType-' + index + '" value="company" class="supp-entity-type" checked> 公司</label></div></div>' +
        '<label><span class="field-label">股份占比（%）</span><input type="text" class="field-input" placeholder="请输入股份占比"></label></div>' +
        '<div class="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2.5 mt-2.5">' +
        '<label class="supp-sh-id-wrap"><span class="field-label supp-sh-id-label">统一社会信用代码</span><input type="text" class="field-input supp-sh-id" placeholder="请输入统一社会信用代码"></label>' +
        '<label><span class="field-label">联系电话</span><input type="text" class="field-input" placeholder="请输入联系电话"></label>' +
        '<div class="flex items-end justify-end pb-0.5"><button type="button" class="supp-remove-shareholder text-xs text-slate-500 hover:text-red-600 whitespace-nowrap">删除股东</button></div></div>';
      return wrap;
    }

    window.openCustomerSupplementModal = function (opts) {
      opts = opts || {};
      var taxPanel = document.querySelector('#supp-panel-tax[data-tax-grouped]');
      if (taxPanel && typeof taxPanel._resetTaxGrouped === 'function') {
        taxPanel._resetTaxGrouped(opts);
      }
      showSupplementModal();
      switchSupplementTab('tax');
    };

    document.querySelectorAll('[data-close="supplement"]').forEach(function (el) {
      el.addEventListener('click', hideSupplementModal);
    });
    supplementTabs.forEach(function (btn) {
      btn.addEventListener('click', function () { switchSupplementTab(btn.getAttribute('data-tab')); });
    });
    switchSupplementTab('tax');

    if (suppShareholderList) {
      var firstSuppBlock = suppShareholderList.querySelector('.shareholder-block');
      if (firstSuppBlock) bindSuppShareholderBlock(firstSuppBlock);
      if (suppAddShareholderBtn) {
        suppAddShareholderBtn.addEventListener('click', function () {
          suppShareholderIndex += 1;
          var block = createSuppShareholderBlock(suppShareholderIndex);
          suppShareholderList.appendChild(block);
          bindSuppShareholderBlock(block);
        });
      }
      suppShareholderList.addEventListener('click', function (e) {
        var btn = e.target.closest('.supp-remove-shareholder');
        if (!btn) return;
        var blocks = suppShareholderList.querySelectorAll('.shareholder-block');
        if (blocks.length <= 1) return;
        btn.closest('.shareholder-block').remove();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modalSupplement.classList.contains('hidden')) hideSupplementModal();
    });

    bindOpenSelectors(opts.openSelectors || ['.js-supplement']);

    var okBtn = document.getElementById('btn-supplement-ok');
    var taxPanel = modalSupplement.querySelector('#supp-panel-tax[data-tax-grouped]');
    if (okBtn && taxPanel && !okBtn._taxGroupedOkBound) {
      okBtn._taxGroupedOkBound = true;
      okBtn.addEventListener('click', function () {
        if (typeof taxPanel._validateTaxGrouped !== 'function') return;
        if (taxPanel._validateTaxGrouped()) {
          if (typeof taxPanel._collectTaxGrouped === 'function' && window.CustomerTaxArchive) {
            window.CustomerTaxArchive.save(taxPanel._collectTaxGrouped());
          }
          hideSupplementModal();
          showSuppToast('税务信息已保存');
        } else {
          showSuppToast('请补全必填项');
        }
      });
    }
  };
})();
