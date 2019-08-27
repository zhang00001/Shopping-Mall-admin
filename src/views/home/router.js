 const HOME_ROUTERS = [{
         path: 'index',
         component: () =>
             import ('@/views/home/Index'),

         meta: { title: '后台首页', icon: 'el-icon-trans', hidden: false },
         children: []
     },

     {
         path: 'set',
         component: () =>
             import ('@/views/home/Set'),
         meta: { title: '账户设置', icon: 'el-icon-trans', hidden: false },
         children: []
     },
     {
         path: 'log',
         component: () =>
             import ('@/views/home/Log'),
         meta: { title: "登录日志", icon: 'el-icon-pending', hidden: false },

         children: []
     },



 ]
 export default HOME_ROUTERS;