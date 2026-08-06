;(function () {
  var ALL_SERVICES = [
    '建账',
    '纳税申报',
    '原始凭证整理',
    '编制记账凭证',
    '编制财务报表（资产负债表、利润表）',
    '年度所得税汇算清缴',
    '工商年报公示',
    '基础财税咨询'
  ];

  var ALL_VOLUMES = [
    '基础（每月开票≤5张）',
    '常规（每月开票6-20张）',
    '多量（每月开票20-50张）',
    '超量（每月开票50-100张）',
    '常规发票提额'
  ];

  var DEFAULT_CONTRACT = {
    no: '202607151016',
    title: '代理记账服务协议',
    partyA: '苏州匠心膜界材料有限公司',
    partyB: '苏州企税康科技有限公司',
    partyAContact: '',
    partyBContact: '0512-88880000',
    termStart: '2026-07-01',
    termEnd: '2027-06-30',
    serviceMonths: '12',
    taxpayer: '小规模纳税人',
    filing: '常规申报',
    services: ALL_SERVICES.slice(),
    volumes: ['多量（每月开票20-50张）'],
    supplement: '',
    archiveType: '电子',
    amount: '800.00',
    status: '已签约未支付',
    signedAt: '2026-07-15 22:58:27',
    signedDate: '2026年07月15日',
    link: ''
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function parseList(val) {
    if (Array.isArray(val)) return val;
    if (val == null || val === '') return null;
    try {
      var parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) { /* ignore */ }
    return String(val).split(/[,，|]/).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function mergeData(data) {
    var d = {};
    var key;
    for (key in DEFAULT_CONTRACT) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_CONTRACT, key)) {
        d[key] = Array.isArray(DEFAULT_CONTRACT[key])
          ? DEFAULT_CONTRACT[key].slice()
          : DEFAULT_CONTRACT[key];
      }
    }
    if (data) {
      for (key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
        if (data[key] == null || data[key] === '') continue;
        if (key === 'services' || key === 'volumes') {
          var list = parseList(data[key]);
          if (list && list.length) d[key] = list;
        } else {
          d[key] = data[key];
        }
      }
    }
    if (!d.link) {
      d.link = window.location.origin + window.location.pathname + '?contractNo=' + encodeURIComponent(d.no);
    }
    if ((!data || !data.signedDate) && d.signedAt) {
      var m = String(d.signedAt).match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) d.signedDate = m[1] + '年' + m[2] + '月' + m[3] + '日';
    }
    if ((!data || !data.serviceMonths) && d.termStart && d.termEnd) {
      var months = calcMonths(d.termStart, d.termEnd);
      if (months != null) d.serviceMonths = String(months);
    }
    return d;
  }

  function calcMonths(startStr, endStr) {
    var s = new Date(String(startStr).replace(/-/g, '/') + (String(startStr).length <= 10 ? ' 00:00:00' : ''));
    var e = new Date(String(endStr).replace(/-/g, '/') + (String(endStr).length <= 10 ? ' 00:00:00' : ''));
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    return Math.max(0, (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()));
  }

  function formatDateParts(dateStr) {
    var m = String(dateStr || '').match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (!m) return { y: '　　', m: '　', d: '　' };
    return {
      y: m[1],
      m: String(parseInt(m[2], 10)),
      d: String(parseInt(m[3], 10))
    };
  }

  function amountInWords(amount) {
    var n = Math.round(parseFloat(String(amount).replace(/,/g, '')) * 100);
    if (isNaN(n) || n < 0) return '零元整';
    if (n === 0) return '零元整';

    var digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var units = ['', '拾', '佰', '仟'];
    var big = ['', '万', '亿'];

    function section(num) {
      var str = '';
      var zero = false;
      for (var i = 0; i < 4 && num > 0; i++) {
        var d = num % 10;
        if (d === 0) {
          if (!zero && str) {
            str = digits[0] + str;
            zero = true;
          }
        } else {
          str = digits[d] + units[i] + str;
          zero = false;
        }
        num = Math.floor(num / 10);
      }
      return str.replace(/零+$/, '');
    }

    var yuan = Math.floor(n / 100);
    var jiao = Math.floor((n % 100) / 10);
    var fen = n % 10;
    var parts = [];
    var idx = 0;
    var y = yuan;
    if (y === 0) {
      parts.push('零');
    } else {
      while (y > 0) {
        var seg = y % 10000;
        if (seg) {
          var segStr = section(seg);
          if (idx > 0) segStr += big[idx];
          parts.unshift(segStr);
        } else if (parts.length && parts[0].charAt(0) !== '零') {
          parts.unshift('零');
        }
        y = Math.floor(y / 10000);
        idx++;
      }
    }
    var result = parts.join('').replace(/零+/g, '零').replace(/零$/, '') + '元';
    if (jiao === 0 && fen === 0) return result + '整';
    if (jiao) result += digits[jiao] + '角';
    else if (fen) result += '零';
    if (fen) result += digits[fen] + '分';
    return result;
  }

  function opt(selected, label) {
    return '<span class="inline-flex items-center gap-1 mr-3 whitespace-nowrap">' +
      '<span class="text-blue-600 font-medium">' + (selected ? '☑' : '☐') + '</span>' +
      '<span>' + escapeHtml(label) + '</span></span>';
  }

  function hasItem(list, label) {
    if (!list || !list.length) return false;
    return list.some(function (item) {
      return String(item) === label || String(item).indexOf(label) === 0 || label.indexOf(String(item)) === 0;
    });
  }

  function blank(val, width) {
    var text = val == null || val === '' ? '' : String(val);
    var pad = Math.max((width || 8) - text.length, 2);
    return '<span class="inline-block border-b border-slate-700 px-1 text-center font-medium" style="min-width:' + (width || 8) + 'em">' +
      (text ? escapeHtml(text) : '&nbsp;'.repeat(pad)) + '</span>';
  }

  function buildDocHtml(d) {
    var start = formatDateParts(d.termStart);
    var end = formatDateParts(d.termEnd);
    var amountNum = escapeHtml(d.amount);
    var amountWords = escapeHtml(amountInWords(d.amount));
    var servicesHtml = ALL_SERVICES.map(function (s) {
      return opt(hasItem(d.services, s), s);
    }).join('');
    var volumesHtml = ALL_VOLUMES.map(function (s) {
      return opt(hasItem(d.volumes, s), s);
    }).join('');

    return (
      '<div class="vc-doc mx-auto bg-white shadow-sm border border-slate-200 px-8 sm:px-10 py-8 text-[13px] leading-7 text-slate-800 max-w-[780px]">' +
      '  <div class="flex items-center gap-2 mb-3">' +
      '    <img src="./assets/qishuikang-logo.png" alt="企税康" class="h-9 w-auto max-w-[160px] object-contain object-left mix-blend-multiply" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'inline-flex\'">' +
      '    <span class="hidden items-center gap-2 text-base font-semibold text-slate-800">' +
      '      <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs">企</span>企税康' +
      '    </span>' +
      '  </div>' +
      '  <div class="h-[3px] bg-red-600 mb-6"></div>' +
      '  <h1 class="text-center text-xl font-bold tracking-wide text-slate-900 mb-2">' + escapeHtml(d.title) + '</h1>' +
      '  <p class="text-right text-sm text-slate-700 mb-6">合同编号：' + escapeHtml(d.no) + '</p>' +

      '  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mb-4">' +
      '    <p>甲方（委托方）：<strong>' + escapeHtml(d.partyA) + '</strong></p>' +
      '    <p>乙方：<strong>' + escapeHtml(d.partyB) + '</strong></p>' +
      '  </div>' +

      '  <p class="mb-5 indent-[2em]">依据《中华人民共和国民法典》、《中华人民共和国会计法》、《企业会计准则》和《代理记账管理办法》及其它相关的法律法规的规定，甲方因经营管理需要，委托乙方代理记账，经双方友好协商达成如下协议条款：</p>' +

      '  <p class="font-bold mb-2">第一条　服务内容</p>' +
      '  <div class="mb-3 border border-slate-200 rounded-md overflow-hidden text-[12.5px]">' +
      '    <div class="grid grid-cols-[7rem_1fr] border-b border-slate-200">' +
      '      <div class="bg-slate-50 px-3 py-2 font-medium text-slate-700 border-r border-slate-200 flex items-center">纳税人性质</div>' +
      '      <div class="px-3 py-2 flex flex-wrap gap-y-1">' +
            opt(d.taxpayer === '小规模纳税人', '小规模纳税人') +
            opt(d.taxpayer === '一般纳税人', '一般纳税人') +
      '      </div>' +
      '    </div>' +
      '    <div class="grid grid-cols-[7rem_1fr] border-b border-slate-200">' +
      '      <div class="bg-slate-50 px-3 py-2 font-medium text-slate-700 border-r border-slate-200 flex items-center">申报情况</div>' +
      '      <div class="px-3 py-2 flex flex-wrap gap-y-1">' +
            opt(d.filing === '常规申报', '常规申报') +
            opt(d.filing === '零申报', '零申报') +
            opt(d.filing === '其他' || (d.filing !== '常规申报' && d.filing !== '零申报'), '其他') +
      '      </div>' +
      '    </div>' +
      '    <div class="grid grid-cols-[7rem_1fr] border-b border-slate-200">' +
      '      <div class="bg-slate-50 px-3 py-2 font-medium text-slate-700 border-r border-slate-200 flex items-start pt-2">记账报税</div>' +
      '      <div class="px-3 py-2 flex flex-wrap gap-y-1">' + servicesHtml + '</div>' +
      '    </div>' +
      '    <div class="grid grid-cols-[7rem_1fr] border-b border-slate-200">' +
      '      <div class="bg-slate-50 px-3 py-2 font-medium text-slate-700 border-r border-slate-200 flex items-start pt-2">发票服务</div>' +
      '      <div class="px-3 py-2 flex flex-wrap gap-y-1">' + volumesHtml + '</div>' +
      '    </div>' +
      '    <div class="grid grid-cols-[7rem_1fr]">' +
      '      <div class="bg-slate-50 px-3 py-2 font-medium text-slate-700 border-r border-slate-200 flex items-center">其他补充服务</div>' +
      '      <div class="px-3 py-2 text-slate-600">' + (d.supplement ? escapeHtml(d.supplement) : '无') + '</div>' +
      '    </div>' +
      '  </div>' +

      '  <p class="font-bold mb-2">第二条　收费标准</p>' +
      '  <p class="mb-2 indent-[2em]">1、双方约定收费标准为：' + blank(amountNum, 10) + ' 元/年（大写 ' + blank(amountWords, 16) + '），由甲方在本合同签订后5个工作日内将首期应付款项一次性支付至乙方的收款账户。</p>' +
      '  <p class="mb-2 indent-[2em]">2.甲方要求乙方提供超出本协议第一条范围的服务，如甲方要求乙方另行提供开立银行账户、出口退税、财务分析、联合年检、代开增值税专用发票等或乙方提供本协议第一条范围的服务显著大于双方签约时预估的工作量造成合同期内乙方工作量显著增大的，则甲方应额外支付乙方超额工作费用，具体费用由甲乙双方另行协商确认。协商不成的，乙方有权提前一个月书面通知后解除本合同。</p>' +
      '  <p class="mb-4 indent-[2em]">3.甲方应在已付费涵盖时间到期前15个工作日预付下次相关代理记账费用，以免影响正常财务工作流程。</p>' +

      '  <p class="font-bold mb-2">第三条　协议期限</p>' +
      '  <p class="mb-2 indent-[2em]">1.本协议期限自 ' + blank(start.y, 4) + ' 年 ' + blank(start.m, 2) + ' 月 ' + blank(start.d, 2) + ' 日至 ' + blank(end.y, 4) + ' 年 ' + blank(end.m, 2) + ' 月 ' + blank(end.d, 2) + ' 日，服务期限共计 ' + blank(d.serviceMonths, 4) + ' 月。</p>' +
      '  <p class="mb-4 indent-[2em]">2.合同期满前一个月，任何一方如不再续签本协议，应提前一个月书面通知对方。双方如无异议，本协议自动延续一个合同期，无需另行签署协议。合同期顺延无次数限制，到期仍可自动顺延。</p>' +

      '  <p class="font-bold mb-2">第四条　甲方的责任和义务</p>' +
      '  <p class="mb-2 indent-[2em]">1.甲方应建立健全企业管理制度，依法经营，按照国家相关法律、法规的规定和协议章程的要求，保证资产的安全完整，保证原始凭证的真实、合法、准确、完整，积极配合乙方工作。如果由于甲方提供的资料、凭证不及时或有问题导致的一切后果由甲方承担，与乙方无关。</p>' +
      '  <p class="mb-2 indent-[2em]">2.甲方在每月 3 日前为乙方提供真实、完整的原始资料及其他相关资料，包括：（1）销项及进项发票；（2）银行回单及对账单；（3）工资明细表；（4）差旅费、餐费、办公等费用发票；（5）经双方沟通需要提供的其他材料。</p>' +
      '  <p class="mb-2 indent-[2em]">3.对于乙方退回的要求按照相关会计制度规定进行更正、补充的原始凭证，甲方应当及时予以更正和补充。</p>' +
      '  <p class="mb-2 indent-[2em]">4.甲方应及时准确的将收到市监、税务部门的信件、电话等内容转交或传达乙方。</p>' +
      '  <p class="mb-2 indent-[2em]">5.甲方应安排专人负责现金和银行存款的收付，做好会计凭证传递过程中的登记和保管工作。</p>' +
      '  <p class="mb-2 indent-[2em]">6.甲方应按本合同规定及时足额的支付代理记账费用。甲方连续3个月以上（含3个月）不按时支付代理记账费或其他费用的，乙方有权单方解除本合同，产生的一切后果由甲方自行负责；如有特殊情况，需提前告知乙方并取得乙方的书面同意。</p>' +
      '  <p class="mb-2 indent-[2em]">7.若甲方为一般纳税人企业，每月增值税专用发票认证为双方配合工作，如有遗漏或系统原因造成未认证成功，乙方应协同甲方积极解决，但乙方不承担任何经济责任和赔偿。</p>' +
      '  <p class="mb-4 indent-[2em]">8.若甲方企业注册地址是乙方提供托管的，合同解除前10个工作日内甲方应完成经营住所的变更手续，甲方应积极配合变更经营住所事宜，若甲方不配合变更经营住所产生相关处罚由其自行承担，与乙方无涉。</p>' +

      '  <p class="font-bold mb-2">第五条　乙方的责任和义务</p>' +
      '  <p class="mb-2 indent-[2em]">1.根据甲方提供的原始凭证和其他资料，按照《中华人民共和国会计法》、《企业会计制度》、《小企业会计制度》及《企业会计准则》和相关税收管理等有关规定开展代理记账业务。</p>' +
      '  <p class="mb-2 indent-[2em]">2.乙方接受甲方财务相关咨询，按有关规定根据甲方提供的原始凭证，填制记账凭证，及时编制会计报表。</p>' +
      '  <p class="mb-2 indent-[2em]">3.由于乙方原因，未能及时完成会计核算，造成一定后果的，乙方必须及时纠正并承担相应的责任。</p>' +
      '  <p class="mb-2 indent-[2em]">4.对工作中涉及的甲方商业机密和会计资料严格保密，不得随意向外透露、出示和传递。</p>' +
      '  <p class="mb-2 indent-[2em]">5.双方合同正常终止或提前解除后，在甲方结清所有款项后，乙方有义务将全部资料归还甲方，甲方应出具收据。</p>' +
      '  <p class="mb-2 indent-[2em]">6.在收到甲方的原始凭证和其他相关资料后，每月报税期内完成记账业务等。</p>' +
      '  <p class="mb-2 indent-[2em]">7.会计档案的保管方式为 ' +
            opt(d.archiveType === '纸质', '纸质') +
            opt(d.archiveType === '电子', '电子') +
      ' 与甲方办理记账凭证及账簿等财务资料的交接。</p>' +
      '  <p class="mb-4 indent-[2em]">8.合同终止或解除后，乙方应如实返还全部属于甲方的财务资料（包括但不限于：记账凭证、账簿、发票、财务报表）。</p>' +

      '  <p class="font-bold mb-2">第六条　违约责任</p>' +
      '  <p class="mb-2 indent-[2em]">1.甲乙双方任何一方如有违反合同的规定，给另一方造成的损失的，应按《中华人民共和国合同法》的规定承担违约责任。合同期内，任何一方无故单方解除本协议的，违约方应向守约方支付两个月的代理记账费作为违约金。尚未发生的财务代理费，乙方将退还甲方。</p>' +
      '  <p class="mb-4 indent-[2em]">2.甲方逾期付款的，每逾期一日，应按逾期付款金额的千分之四计算滞纳金，逾期超过三十天的，乙方有权单方解除本合同。</p>' +

      '  <p class="font-bold mb-2">第七条　其他有关事项</p>' +
      '  <p class="mb-2 indent-[2em]">1.本合同未尽事宜，由甲乙双方协商解决，并订立补充合同。</p>' +
      '  <p class="mb-2 indent-[2em]">2.因本合同引起的或与本合同有关的任何争议，由合同各方协商解决，协商不成的，任何一方均有权向乙方所在地的人民法院提起诉讼解决。因此产生的包括但不限于律师费、诉讼费、诉讼担保费、保全费、执行费、公证费、鉴定费、差旅费等均由败诉方承担。</p>' +
      '  <p class="mb-2 indent-[2em]">3.特殊约定：甲方确认并同意在本协议终止或提前解除后2年内，不得雇佣乙方任何在职工作人员为其提供代理记账及税务申报服务，否则应向乙方支付相等于本合同金额50％的违约金，并赔偿乙方相应损失。</p>' +
      '  <p class="mb-2 indent-[2em]">4.本协议一式两份，甲乙方各留一份，两份具有同等法律效力。</p>' +
      '  <p class="mb-5 indent-[2em]">5.本合同自甲乙双方加盖公章或/和双方代表签字之日起生效。</p>' +

      '  <p class="mb-6 text-slate-500">（以下无正文）</p>' +

      '  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 text-[13px]">' +
      '    <div class="space-y-3">' +
      '      <p>甲方签章：</p>' +
      '      <p>代表人签字：</p>' +
      '      <p>联系方式：' + escapeHtml(d.partyAContact || '') + '</p>' +
      '      <p>签约日期：' + escapeHtml(d.signedDate || '　　年　月　日') + '</p>' +
      '    </div>' +
      '    <div class="space-y-3">' +
      '      <p>乙方签章：</p>' +
      '      <p>代表人签字：</p>' +
      '      <p>联系方式：' + escapeHtml(d.partyBContact || '') + '</p>' +
      '      <p>签约日期：' + escapeHtml(d.signedDate || '　　年　月　日') + '</p>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );
  }

  function ensureModal() {
    var modal = document.getElementById('modal-view-contract');
    var toast = document.getElementById('toast-view-contract');
    if (modal && toast) return { modal: modal, toast: toast };

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div id="modal-view-contract" class="hidden fixed inset-0 z-[180] items-stretch justify-end bg-slate-900/45" role="dialog" aria-modal="true" aria-labelledby="view-contract-title">' +
      '  <div class="vc-panel relative flex h-full w-full max-w-[860px] flex-col overflow-hidden bg-white border-l border-slate-200 shadow-2xl">' +
      '    <div class="shrink-0 border-b border-slate-100 px-5">' +
      '      <div class="flex h-14 items-center justify-between gap-3">' +
      '        <div class="min-w-0">' +
      '          <h2 id="view-contract-title" class="text-base font-semibold text-slate-800">查看合同</h2>' +
      '          <p id="vc-subtitle" class="mt-0.5 truncate text-xs text-slate-500"></p>' +
      '        </div>' +
      '        <button type="button" class="btn-close-view-contract w-8 h-8 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>' +
      '      </div>' +
      '      <div class="flex flex-wrap gap-2 pb-3">' +
      '        <span id="vc-status" class="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">已签约未支付</span>' +
      '        <span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-200">¥<span id="vc-amount">—</span></span>' +
      '        <span id="vc-signed-at" class="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-200">—</span>' +
      '      </div>' +
      '    </div>' +
      '    <div id="vc-doc-scroll" class="min-h-0 flex-1 overflow-y-auto bg-[#f5f7fa] px-4 py-4 sm:px-5"></div>' +
      '    <div class="modal-footer-actions flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-slate-100 bg-white px-5 py-3">' +
      '      <button type="button" class="btn-close-view-contract h-9 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-600 hover:bg-slate-50">关闭</button>' +
      '      <button type="button" id="btn-vc-edit" class="h-9 rounded-md border border-blue-500 bg-white px-4 text-sm text-blue-600 hover:bg-blue-50">修改合同</button>' +
      '      <button type="button" id="btn-vc-copy-link" class="h-9 rounded-md border border-blue-500 bg-white px-4 text-sm text-blue-600 hover:bg-blue-50">复制链接</button>' +
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

  function mapContractStatus(rec) {
    if (!rec) return '已签约未支付';
    if (rec.contractStatus === '未签约') return '未签约';
    if (rec.contractStatus === '已签约' && rec.payStatus === '未支付') return '已签约未支付';
    if (rec.contractStatus === '已签约' && rec.payStatus === '已支付') return '已签约已支付';
    if (rec.contractStatus === '已作废') return '已作废';
    return rec.contractStatus || '已签约未支付';
  }

  window.buildViewContractDataFromRecord = function (rec) {
    if (!rec) return null;
    return {
      no: rec.contractNo,
      partyA: rec.companyName,
      partyAContact: rec.contactPhone || '',
      amount: typeof rec.amount === 'number' ? rec.amount.toFixed(2) : String(rec.amount || ''),
      status: mapContractStatus(rec),
      signedAt: rec.signedAt || '—',
      termStart: rec.termStart || '2026-04-14',
      termEnd: rec.termEnd || '2027-04-14'
    };
  };

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
      var subtitleEl = document.getElementById('vc-subtitle');
      if (statusEl) statusEl.textContent = current.status;
      if (signedEl) signedEl.textContent = current.signedAt;
      if (amountEl) amountEl.textContent = current.amount;
      if (subtitleEl) {
        var parts = [];
        if (current.partyA) parts.push(current.partyA);
        if (current.no) parts.push(current.no);
        subtitleEl.textContent = parts.join(' · ');
      }
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
        partyB: btn.getAttribute('data-party-b'),
        partyAContact: btn.getAttribute('data-party-a-contact'),
        amount: btn.getAttribute('data-amount'),
        status: btn.getAttribute('data-status'),
        signedAt: btn.getAttribute('data-signed-at'),
        taxpayer: btn.getAttribute('data-taxpayer'),
        filing: btn.getAttribute('data-filing'),
        services: btn.getAttribute('data-services'),
        volumes: btn.getAttribute('data-volumes'),
        supplement: btn.getAttribute('data-supplement'),
        archiveType: btn.getAttribute('data-archive'),
        termStart: btn.getAttribute('data-term-start'),
        termEnd: btn.getAttribute('data-term-end'),
        serviceMonths: btn.getAttribute('data-service-months'),
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
