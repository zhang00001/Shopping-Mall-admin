<template>
  
   <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="box-card">
        <h1>{{up.order_today}}</h1>
        <h4>今日订单总数</h4>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card" style="background:#67c23a">
        <h1>{{up.money_today}}</h1>
        <h4>今日销售总额</h4>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card"  style="background:#7881ff">
        <h1>{{up.money_yesterday}}</h1>
        <h4>昨日销售总额</h4>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card"  style="background:#f79641">
        <h1>{{up.money_total}}</h1>
        <h4>累计销售总额</h4>
      </el-card>
    </el-col>
  
 
    
    
  </el-row>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{center.goods.goods_yes}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{center.goods.goods_no}}</el-col>
             
                <el-col :span="6" class="color-danger overview-item-value">{{center.goods.goods_all}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">已下架</el-col>
              
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{center.user.register_tatal}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{center.user.register_today}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{center.user.vip_today}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{center.user.vip_total}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日注册</el-col>
                <el-col :span="6" class="overview-item-title">累计注册</el-col>
                <el-col :span="6" class="overview-item-title">新增会员</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
     <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">{{down.one.data}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">{{down.five.data}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span style="float: right" class="color-danger">{{down.three.data}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货申请</span>
              <span style="float: right" class="color-danger">{{down.four.data}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理提现申请</span>
              <span style="float: right" class="color-danger">{{down.four.data}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">{{down.four.data}}</span>
            </div>
          </el-col>
        </el-row>
      
      </div>
    </div>
     
    </div>
    <div class="total-layout">
       <div class="layout-title">快捷入口</div>
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="total-frame">
     
            
            <img :src="require('@/assets/images/addPro.png')" alt="">
            <div class="total-value">添加商品</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
            <img :src="require('@/assets/images/order.png')" alt="">
          
            <div class="total-value">订单列表</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
           <img :src="require('@/assets/images/user.png')" alt="">
          
            <div class="total-value">用户管理</div>
          </div>
        </el-col>
         <el-col :span="4">
          <div class="total-frame">
               <img :src="require('@/assets/images/advertisement.png')" alt="">
          
            <div class="total-value">广告管理</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
              <img :src="require('@/assets/images/special.png')" alt="">
          
            <div class="total-value">特价管理</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
               <img :src="require('@/assets/images/new.png')" alt="">
          
            <div class="total-value">今日上新</div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import {getIndex} from "@/api/homeApi"
import http from "@/utils/request";
export default {
  name: "home",
  components: {
    AnimatedNumber
  },
  data() {
    this.chartSettings = {
      stack: { 用户: ["访问用户", "下单用户"] },
      area: true
    };
    return {
      center:{
        goods:{
goods_all: 0,
goods_no: 0,
goods_yes: 0
        },
        user:{
register_tatal:0,
register_today: 0,
vip_today: 0,
vip_total: 0
        }
      },down:{
        one:{data:0,msg:"待付款订单"},
        two:{data:0,msg:"待发货订单"},
        three:{data:0,msg:"待处理退款申请"},
        four:{data:0,msg:"待处理提现申请"},
        five:{data:0,msg:"待发货订单"}
      },up:{
        money_today: 0,
money_total: 0,
money_yesterday: 0,
order_today: 0
      }
    };
  },
  filters: {
    
  },
  mounted() {
   
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getIndex({}).then(res => {
         if(res){
        
          this.center=res.center
          this.down=res.down
          this.up=res.up
        }else{
          this.$message.error(res.msg)
        }
      })

    },
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card {
  background: #ff7878;
  color: #fff;
}
 .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }
  .address-layout {
  }
  .total-layout {
    margin-top: 20px;
       border: 1px solid #DCDFE6; 
  }
  .total-frame {
   display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    height: 100px;
  }
  .total-frame img{
    margin-bottom:20px;
  }
  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }
  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }
  .total-value {
   
    font-size: 18px;
    color: #606266;
    
  }
  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }
  .un-handle-content {
    padding: 20px 40px;
  }
  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }
  .overview-layout {
    margin-top: 20px;
  }
  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }
  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }
  .out-border {
    border: 1px solid #DCDFE6;
  }
  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
</style>
