const ORDER_ROUTERS = [{
        path: 'index',
        component: () =>

            import ('@/views/order/List'),
        meta: { title: '试衣间订单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'index/detail',
        component: () =>
            import ('@/views/order/detail'),

        meta: { title: '试衣间订单详情', icon: 'el-icon-trans', hidden: true },
        children: []
    },
    {
        path: 'index2',
        component: () =>
            import ('@/views/order/List2'),

        meta: { title: '品牌订单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'index/detail2',
        component: () =>
            import ('@/views/order/detail2'),

        meta: { title: '试衣间订单详情', icon: 'el-icon-trans', hidden: true },
        children: []
    },
    {
        path: 'index3',
        component: () =>
            import ('@/views/order/List3'),

        meta: { title: '积分特价订单', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    {
        path: 'set',
        component: () =>
            import ('@/views/order/Set'),

        meta: { title: '订单设置', icon: 'el-icon-trans', hidden: false },
        children: []
    },
    // {
    //     path: 'returnGoods',
    //     component: () =>
    //         import ('@/views/order/ReturnGoods'),

    //     meta: { title: '退货申请', icon: 'el-icon-trans', hidden: false },
    //     children: []
    // },
    {
        path: 'refund',
        component: () =>
            import ('@/views/order/Refund'),

        meta: { title: '退货管理', icon: 'el-icon-trans', hidden: false },
        children: []
    },






]
export default ORDER_ROUTERS;