import http from '@/utils/request'



// 首页
export const getIndex = data => http.post('/admin/index/index', data);
export const account_set = data => http.post('/admin/index/account_set', data);
export const admin_log = data => http.post('/admin/index/admin_log', data);


// 商品
export const goods_del = data => http.post('/admin/goods/goods_del', data); //商品(删除)
export const goods_one = data => http.post('/admin/goods/goods_one', data); //商品(单条)
export const goods_manage = data => http.post('/admin/goods/goods_manage', data); //商品(操作)
export const goods_more = data => http.post('/admin/goods/goods_more', data); //商品(列表)
export const goods_shelf = data => http.post('/admin/goods/goods_shelf', data); //商品(上下架)
export const goods_batch_shelf = data => http.post('/admin/goods/goods_batch_shelf', data); //商品(批量上下架)
export const goods_batch_del = data => http.post('/admin/goods/goods_batch_del', data); //商品(批量删除)
export const goods_integral_status = data => http.post('/admin/goods/goods_integral_status', data); //商品(积分开关)
export const goods_class_del = data => http.post('/admin/goods/goods_class_del', data); //商品分类(删除)
export const goods_class_one = data => http.post('/admin/goods/goods_class_one', data); //商品分类(单条)
export const goods_class_manage = data => http.post('/admin/goods/goods_class_manage', data); //商品分类(操作)
export const goods_class_more = data => http.post('/admin/goods/goods_class_more', data); //商品分类(列表)
export const supplier_del = data => http.post('/admin/goods/supplier_del', data); //供货商管理(删除)
export const supplier_one = data => http.post('/admin/goods/supplier_one', data); //供货商管理(单条)
export const supplier_manage = data => http.post('/admin/goods/supplier_manage', data); //供货商管理(操作)
export const supplier_more = data => http.post('/admin/goods/supplier_more', data); //供货商管理(列表)
export const brand_del = data => http.post('/admin/goods/brand_del', data); //品牌管理(删除)
export const brand_one = data => http.post('/admin/goods/brand_one', data); //品牌管理(单条)
export const brand_manage = data => http.post('/admin/goods/brand_manage', data); //品牌管理(操作)
export const brand_more = data => http.post('/admin/goods/brand_more', data); //品牌管理(列表)
export const brand_show = data => http.post('/admin/goods/brand_show', data); //品牌管理(显示关闭)
export const warehouse_more = data => http.post('/admin/goods/warehouse_more', data); //仓库管理(列表)
export const warehouse_manage = data => http.post('/admin/goods/warehouse_manage', data); //仓库管理(操作)
export const warehouse_one = data => http.post('/admin/goods/warehouse_one', data); //仓库管理(单条)
export const warehouse_del = data => http.post('/admin/goods/warehouse_del', data); //仓库管理(删除)
export const evaluate_more = data => http.post('/admin/goods/evaluate_more', data); // 评价管理(列表)
export const evaluate_show = data => http.post('/admin/goods/evaluate_show', data); // 评价管理(隐藏)
export const evaluate_del = data => http.post('/admin/goods/evaluate_del', data); // 评价管理(删除)
export const batch_del = data => http.post('/admin/goods/batch_del', data); // 批量删除



// 订单
export const order_logistics_status = data => http.post('/admin/order/order_logistics_status', data); //订单(点击发货)
export const order_set = data => http.post('/admin/order/order_set', data); //订单设置
export const order_more = data => http.post('/admin/order/order_more', data); //订单(列表)
export const order_look = data => http.post('/admin/order/order_look', data); //订单(查看订单)
export const order_confim = data => http.post('/admin/order/order_confim', data); //订单(试衣间订单审核)
export const back_confirm = data => http.post('admin/order/back_confirm', data); //订单(退货审核)

export const back_finish = data => http.post('admin/order/back_finish', data); //订单(完成退货)
export const order_produce = data => http.post('/admin/order/order_produce', data); //订单(品牌订单生产中)
export const order_cancel = data => http.post('/admin/order/order_cancel', data); //订单(未支付订单取消)
export const order_back = data => http.post('/admin/order/order_back', data); //订单(退货列表)
export const order_vip_more = data => http.post('/admin/order/order_vip_more', data); //订单(vip列表)

export const order_vip_one = data => http.post('/admin/order/order_vip_one', data); //订单(vip详情)
export const order_vip_logistics = data => http.post('/admin/order/order_vip_logistics', data); //订单(vip发货)

export const order_back_logistics = data => http.post('/admin/order/order_back_logistics', data); //试衣间订单(填写退货物流)















// 用户会员
export const user_integral = data => http.post('/admin/user/user_integral', data); //会员(等级变更明细)
// export const user_integral = data => http.post('/admin/user/user_integral', data); // 会员(积分明细)
export const user_money = data => http.post('/admin/user/user_money', data); // 会员(资金明细)
export const user_del = data => http.post('/admin/user/user_del', data); //会员(冻结)
export const user_one = data => http.post('/admin/user/user_one', data); //会员(单条)
export const user_manage = data => http.post('/admin/user/user_manage', data); //会员(操作)
export const user_more = data => http.post('/admin/user/user_more', data); //会员(列表)
export const user_integral_give = data => http.post('/admin/user/user_integral_give', data); //会员(积分赠送)
export const user_grade = data => http.post('/admin/user/user_grade', data); //会员(等级变更明细)

export const vip_grade_more = data => http.post('/admin/user/manage', data); //会员等级(列表)
export const manage_confirm = data => http.post('/admin/user/manage_confirm', data); //会员店长超店(升级审核）

export const user_money_right = data => http.post('/admin/user/user_money_right', data); //会员(财务信息)
export const user_address = data => http.post('/admin/user/user_address', data); //会员(地址数据)
export const user_order = data => http.post('/admin/user/user_order', data); //会员(订单列表)







// 运营
export const ad_list = data => http.post('/admin/operate/ad_list', data); //广告位的列表数据
export const withdraw_status = data => http.post('/admin/operate/withdraw_status', data); //提现管理(打款)
export const withdraw_more = data => http.post('/admin/operate/withdraw_more', data); //提现管理(列表)
export const package_one = data => http.post('/admin/operate/package_one', data); //vip礼包(单条)
export const package_manage = data => http.post('/admin/operate/package_manage', data); //vip礼包(操作)
export const package_more = data => http.post('/admin/operate/package_more', data); //vip礼包(列表)
export const package_del = data => http.post('/admin/operate/package_del', data); //vip礼包(删除)
export const advertisement_log_data = data => http.post('/admin/operate/advertisement_log_data', data); //广告位(商品数据)
export const advertisement_log = data => http.post('/admin/operate/advertisement_log', data); //广告位(导入商品)
export const banner_del = data => http.post('/admin/operate/banner_del', data); //banner(删除)
export const banner_one = data => http.post('admin/operate/banner_one', data); //banner(单条)
export const banner_manage = data => http.post('/admin/operate/banner_manage', data); //banner(操作)
export const banner_more = data => http.post('/admin/operate/banner_more', data); //banner(列表)
export const advertisement_del = data => http.post('/admin/operate/advertisement_del', data); //广告位(删除)
export const advertisement_one = data => http.post('/admin/operate/advertisement_one', data); //广告位(单条)
export const advertisement_manage = data => http.post('/admin/operate/advertisement_manage', data); //广告位(操作)
export const advertisement_more = data => http.post('/admin/operate/advertisement_more', data); //广告位(列表)
export const special_more = data => http.post('/admin/operate/special_more', data); //专题管理(列表)
export const special_goods_del = data => http.post('/admin/operate/special_goods_del', data); // 专题管理(商品批量删除)
export const special_goods_data = data => http.post('/admin/operate/special_goods_data', data); //专题管理(商品数据)
export const special_one = data => http.post('/admin/operate/special_one', data); //专题管理(单条)
export const special_goods_join = data => http.post('/admin/operate/special_goods_join', data); //专题管理(导入产品)
export const special_del = data => http.post('/admin/operate/special_del', data); //专题管理(删除)

export const special_manage = data => http.post('/admin/operate/special_manage', data); // 专题管理(操作)
export const advertisement_del_data = data => http.post('admin/operate/advertisement_del_data', data); // 广告位(数据批量删除)
export const classify = data => http.post('admin/operate/classify', data); // 首页_分类




// 设置
export const config_get = data => http.post('/admin/set/config_get', data); //配置(获取)
export const config_msg = data => http.post('/admin/set/config_msg', data); //配置(模板消息)
export const config_login = data => http.post('/admin/set/config_login', data); //配置(第三方登录配置)
export const config_alipay = data => http.post('/admin/set/config_alipay', data); //配置(阿里支付配置)
export const config_wxpay = data => http.post('/admin/set/config_wxpay', data); //配置(微信支付配置)
export const config_message = data => http.post('/admin/set/config_message', data); //配置(短信发送)

// 管理员
export const login = data => http.post('/admin/base/login', data); //后台登录
export const reset = data => http.post('/admin/base/reset', data); //后台改密


// 第三方数据
export const logistics = data => http.post('/index/base/logistics', data); //查看物流
export const wuliu = data => http.post('index/base/wuliu', data); //物流公司