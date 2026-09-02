/**

 * 企税康平台 — 侧栏菜单默认配置（与当前项目页面一致）

 */

(function (global) {

  var STORAGE_KEY = 'qsk-menu-config-v1';



  var DEFAULT_MENUS = [

    { id: 'workbench', type: 'link', name: '工作台', icon: 'fa-table-columns', href: 'index.html', enabled: true, sort: 1 },

    {

      id: 'sales', type: 'group', name: '销售中心', icon: 'fa-chart-line', enabled: true, sort: 2,

      children: [

        { id: 'sales-target', type: 'link', name: '销售目标', icon: '', href: 'sales-target.html', enabled: true, sort: 1 },

        { id: 'marketing-mgmt', type: 'link', name: '营销管理', icon: '', href: 'marketing-management.html', enabled: true, sort: 2 },

        { id: 'lead-mgmt', type: 'link', name: '线索管理', icon: '', href: 'lead-management.html', enabled: true, sort: 3 },

        { id: 'opp-mgmt', type: 'link', name: '商机管理', icon: '', href: 'opportunity-management.html', enabled: true, sort: 4 },

        { id: 'customer-mgmt', type: 'link', name: '客户管理', icon: '', href: 'customer-management.html', enabled: true, sort: 5 },

        { id: 'sales-perf', type: 'link', name: '销售业绩', icon: '', href: 'sales-performance.html', enabled: true, sort: 6 }

      ]

    },

    {

      id: 'customer-center', type: 'group', name: '客户中心', icon: 'fa-building-user', enabled: true, sort: 3,

      children: [

        { id: 'gov-affairs', type: 'link', name: '政务服务', icon: '', href: 'government-affairs.html', enabled: true, sort: 1 },

        { id: 'accounting-svc', type: 'link', name: '代账服务', icon: '', href: 'accounting-customer-management.html', enabled: true, sort: 2 },

        { id: 'address-mgmt', type: 'link', name: '地址管理', icon: '', href: 'address-management.html', enabled: true, sort: 3 },

        { id: 'customer-items', type: 'link', name: '客户物品', icon: '', href: 'customer-items.html', enabled: true, sort: 4 }

      ]

    },

    { id: 'supply-chain', type: 'link', name: '供应链中心', icon: 'fa-truck-fast', href: 'supply-chain-management.html', enabled: true, sort: 4 },

    { id: 'knowledge', type: 'link', name: '问一问', icon: 'fa-book-open', href: 'knowledge-base.html', enabled: true, sort: 5 },

    { id: 'contract-order', type: 'link', name: '合同订单', icon: 'fa-file-signature', href: 'contract-management.html', enabled: true, sort: 6 },

    {

      id: 'operations', type: 'group', name: '运营中心', icon: 'fa-wallet', enabled: true, sort: 7,

      children: [

        { id: 'payment-request', type: 'link', name: '财务报销', icon: '', href: 'payment-request.html', enabled: true, sort: 1 },

        { id: 'financial-reports', type: 'link', name: '经营报表', icon: '', href: 'financial-reports.html', enabled: true, sort: 2 },

        { id: 'hr-request', type: 'link', name: '人事管理', icon: '', href: 'hr-request.html', enabled: true, sort: 3 },

        { id: 'salary-mgmt', type: 'link', name: '薪资管理', icon: '', href: 'salary-management.html', enabled: true, sort: 4 },

        { id: 'employee-mgmt', type: 'link', name: '员工管理', icon: '', href: 'department-employees.html', enabled: true, sort: 5 },

        { id: 'website-maintain', type: 'link', name: '官网维护', icon: '', href: 'website-maintenance.html', enabled: true, sort: 6 }

      ]

    },

    {

      id: 'system', type: 'group', name: '系统管理', icon: 'fa-gear', enabled: true, sort: 8,

      children: [

        { id: 'role-perm', type: 'link', name: '角色权限', icon: '', href: 'role-permissions.html', enabled: true, sort: 1 },

        { id: 'dict-mgmt', type: 'link', name: '字典管理', icon: '', href: 'dictionary-management.html', enabled: true, sort: 2 },

        { id: 'menu-mgmt', type: 'link', name: '菜单管理', icon: '', href: 'menu-management.html', enabled: true, sort: 3 }

      ]

    }

  ];



  function deepClone(obj) {

    return JSON.parse(JSON.stringify(obj));

  }



  function normalizeSort(list) {

    list.sort(function (a, b) { return a.sort - b.sort; });

    list.forEach(function (item, i) { item.sort = i + 1; });

  }



  /** 将已保存配置与默认菜单按 id 合并，避免缺失「客户中心」等分组 */
  function mergeMenusWithDefaults(saved) {
    if (!saved || !saved.length) return deepClone(DEFAULT_MENUS);
    var savedById = {};
    saved.forEach(function (item) { savedById[item.id] = item; });
    return DEFAULT_MENUS.map(function (def) {
      var existing = savedById[def.id];
      if (!existing) return deepClone(def);
      var merged = deepClone(def);
      Object.keys(existing).forEach(function (key) {
        if (key !== 'children') merged[key] = existing[key];
      });
      if (def.children && def.children.length) {
        var childById = {};
        (existing.children || []).forEach(function (c) { childById[c.id] = c; });
        merged.children = def.children.map(function (defChild) {
          var savedChild = childById[defChild.id];
          if (!savedChild) return deepClone(defChild);
          return Object.assign(deepClone(defChild), savedChild);
        });
      } else if (existing.children) {
        merged.children = existing.children;
      }
      return merged;
    });
  }

  function getMenus() {

    try {

      var raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        var menus = mergeMenusWithDefaults(JSON.parse(raw));
        var changed = false;
        menus.forEach(function (item) {
          if (item.id === 'knowledge' && item.name === '知识库') {
            item.name = '问一问';
            changed = true;
          }
        });
        if (changed) saveMenus(menus);
        return menus;
      }

    } catch (e) { /* ignore */ }

    return deepClone(DEFAULT_MENUS);

  }



  function saveMenus(menus) {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));

  }



  function resetMenus() {

    localStorage.removeItem(STORAGE_KEY);

    return deepClone(DEFAULT_MENUS);

  }



  function findParentList(menus, id, parentList) {

    parentList = parentList || menus;

    for (var i = 0; i < parentList.length; i++) {

      if (parentList[i].id === id) return { list: parentList, index: i, item: parentList[i] };

      if (parentList[i].children) {

        var found = findParentList(menus, id, parentList[i].children);

        if (found) return found;

      }

    }

    return null;

  }



  global.MenuData = {

    STORAGE_KEY: STORAGE_KEY,

    DEFAULT_MENUS: DEFAULT_MENUS,

    getMenus: getMenus,

    saveMenus: saveMenus,

    resetMenus: resetMenus,

    deepClone: deepClone,

    normalizeSort: normalizeSort,

    findParentList: findParentList,

    mergeMenusWithDefaults: mergeMenusWithDefaults

  };

})(typeof window !== 'undefined' ? window : global);


