const MEMBER_ROUTERS = [{
        path: 'list',
        component: () =>
            import ('@/views/member/List'),

        meta: { title: '会员列表', icon: 'el-icon-trans', hidden: false },
        children: [

        ],
    }, {
        path: 'detail',
        component: () =>
            import ('@/views/member/Detail'),

        meta: { title: '会员详情', icon: 'el-icon-trans', hidden: true },
        children: [

        ]

    },
    {
        path: 'grade',
        component: () =>
            import ('@/views/member/Grade'),

        meta: { title: '会员等级', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    },
    {
        path: 'withdraw',
        component: () =>
            import ('@/views/member/Withdraw'),

        meta: { title: '提现列表', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    },
    {
        path: 'withdraw_rule',
        component: () =>
            import ('@/views/member/Withdraw_Rule'),

        meta: { title: '提现规则', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    }






]
export default MEMBER_ROUTERS;