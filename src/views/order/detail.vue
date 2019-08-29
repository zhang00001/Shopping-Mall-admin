<template>
  <div style="margin-top:20px">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="提交订单"></el-step>
      <el-step title="待审核"></el-step>
      <el-step title="等发货"></el-step>
      <el-step title="待收货"></el-step>
      <el-step title="待支付"></el-step>
      <el-step title="回寄中"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
   



    <div style="margin-top:20px;">
      <div>
        <span><i class='el-icon-potato-strips' style="color:red"></i> 当前订单状态 ：</span>

        <span v-if="active==1">待审核</span>
        <span v-if="active==2">待发货</span>
        <span v-if="active==3">待收货</span>
        <span v-if="active==4">待支付</span>
        <span v-if="active==5">回寄中</span>
        <span v-if="active==6">完成</span>
        <span v-if="active==7">已取消</span>

        <el-button size="mini" v-if="active==1||active==2">关闭订单</el-button>

        <el-button size="mini" v-if="active==3||active==4||active==5||active==6">订单跟踪</el-button>
        <el-button size="mini" v-if="active==7">关闭订单</el-button>

        <el-button size="mini">备注</el-button>
      </div>
    </div>
     <div class="overview-layout">
      <el-row :gutter="24">
        <el-col :span="16">
          <div class="out-border">
            <div class="layout-title">
              <span>基本信息</span>
              
            </div>
            <div style="padding:5px 0 20px 10px">
              <el-row class="font-medium">
                <el-col :span="3" class="overview-item-title">订单编号</el-col>
                <el-col :span="3" class="overview-item-title">发货单流水号</el-col>

                <el-col :span="3" class="overview-item-title">用户账户</el-col>
                <el-col :span="3" class="overview-item-title">用户昵称</el-col>
                <el-col :span="3" class="overview-item-title">物流单号</el-col>
                    <el-col :span="3" class="overview-item-title">支付方式</el-col>
                        <el-col :span="3" class="overview-item-title">推荐账户</el-col>
                            <el-col :span="3" class="overview-item-title">订单金额</el-col>
              </el-row>
              <el-row>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                   <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
                <el-col :span="3" class="color-danger overview-item-value">0</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">
              <span>收货信息</span>
              
            </div>
            <div style="padding:5px 0 20px 10px ">
              <el-row class="font-medium">
                <el-col :span="8" class="overview-item-title">收货人</el-col>
                <el-col :span="8" class="overview-item-title">手机号码</el-col>

                <el-col :span="8" class="overview-item-title">收货地址</el-col>
               
              </el-row>
              <el-row>
                <el-col :span="8" class="color-danger overview-item-value">0</el-col>
                <el-col :span="8" class="color-danger overview-item-value">0</el-col>
                <el-col :span="8" class="color-danger overview-item-value">0</el-col>
               
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top:20px;">
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">商品信息</div>
            <div style="padding:5px 0 20px 10px ">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="商品图片"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="address" label="价格"></el-table-column>
                  <el-table-column prop="address" label="属性规格"></el-table-column>
                    <el-table-column prop="address" label="数量"></el-table-column>
                      <el-table-column prop="address" label="小计"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="out-border">
            <div class="layout-title">费用信息</div>
            <div style="padding:5px 0 20px 10px ">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="商品合计"></el-table-column>
                <el-table-column prop="name" label="运费"></el-table-column>
                <el-table-column prop="address" label="折扣金额"></el-table-column>
                <el-table-column prop="address" label="实际付款金额"></el-table-column>
                 
            
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: this.$route.query.id
    };
  },

  methods: {}
};
</script>