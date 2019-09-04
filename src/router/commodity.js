 const COMMODITY_ROUTERS = [{
         path: 'list',
         component: () =>
             import ('@/views/commodity/List'),

         meta: { title: '商品列表', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'test',
         component: () =>
             import ('@/views/commodity/test'),

         meta: { title: 'test', icon: 'el-icon-trans', hidden: true },
         children: []
     },
     {
         path: 'edit',
         component: () =>
             import ('@/views/commodity/Add'),

         meta: { title: '编辑商品', icon: 'el-icon-trans', hidden: true },
         children: []
     },
     {
         path: 'add',
         component: () =>
             import ('@/views/commodity/Add'),
         meta: { title: '添加商品', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'class',
         component: () =>
             import ('@/views/commodity/Class'),
         meta: { title: "商品分类", icon: 'el-icon-pending', hidden: false },

         children: []
     },
     {
         path: 'brand',
         component: () =>
             import ('@/views/commodity/Brand'),
         meta: { title: "品牌管理", icon: 'el-icon-pending', hidden: false },

         children: []
     },
     {
         path: 'supplier',
         component: () =>
             import ('@/views/commodity/Supplier'),
         meta: { title: "供货商管理", icon: 'el-icon-pending', hidden: false },

         children: []
     },
     {
         path: 'warehouse',
         component: () =>
             import ('@/views/commodity/Warehouse'),
         meta: { title: "仓库管理", icon: 'el-icon-pending', hidden: false },

         children: []
     },
     {
         path: 'evaluate',
         component: () =>
             import ('@/views/commodity/Evaluate'),
         meta: { title: "评价管理", icon: 'el-icon-pending', hidden: false },

         children: []
     },

 ]
 export default COMMODITY_ROUTERS;