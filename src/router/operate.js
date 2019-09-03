const OPERATE_ROUTERS = [{
        path: 'list',
        component: () =>
            import ('@/views/operate/Recommend'),

        meta: { title: '首页-推荐', icon: 'el-icon-trans', hidden: false },
        children: [

        ],
    }, {
        path: 'class',
        component: () =>
            import ('@/views/operate/Women'),

        meta: { title: '首页-分类', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    },
    {
        path: 'vip',
        component: () =>
            import ('@/views/operate/Vip'),

        meta: { title: 'Vip礼包', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    },
    {
        path: 'banner',
        component: () =>
            import ('@/views/operate/Banner'),

        meta: { title: 'Banner管理', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    },
    // {
    //     path: 'men',
    //     component: () =>
    //         import ('@/views/operate/Men'),

    //     meta: { title: '首页-男装', icon: 'el-icon-trans', hidden: false },
    //     children: [

    //     ]

    // },
    // {
    //     path: 'children',
    //     component: () =>
    //         import ('@/views/operate/Children'),

    //     meta: { title: '首页-童装', icon: 'el-icon-trans', hidden: false },
    //     children: [

    //     ]

    // },
    {
        path: 'advertisement',
        component: () =>
            import ('@/views/operate/Advertisement'),

        meta: { title: '广告管理', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    },
    {
        path: 'special',
        component: () =>
            import ('@/views/operate/Special'),

        meta: { title: '专题管理', icon: 'el-icon-trans', hidden: false },
        children: [

        ]

    }






]
export default OPERATE_ROUTERS;