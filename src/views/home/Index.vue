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
          <el-card class="box-card" style="background:#7881ff">
            <h1>{{up.money_yesterday}}</h1>
            <h4>昨日销售总额</h4>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" style="background:#f79641">
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
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.goods.goods_yes}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.goods.goods_no}}</el-col>

                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.goods.goods_all}}</el-col>
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
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.user.register_today}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.user.register_tatal}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.user.vip_today}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{center.user.vip_total}}</el-col>
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

      <el-row :gutter="24">
        <el-col :span="8">
          <div class="un-handle-layout">
            <div class="layout-title">试衣间订单统计</div>
            <div class="un-handle-content">
              <el-row :gutter="24">
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage(down.one.all,0)">
                    <span class="font-medium">全部</span>
                    <span style="float: right" class="color-danger">{{down.one.all.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage(down.one.one,1)">
                    <span class="font-medium">待审核</span>
                    <span style="float: right" class="color-danger">{{down.one.one.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage(down.one.two,2)">
                    <span class="font-medium">待发货</span>
                    <span style="float: right" class="color-danger">{{down.one.two.num}}</span>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage(down.one.three,3)">
                    <span class="font-medium">已发货</span>
                    <span style="float: right" class="color-danger">{{down.one.three.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage(down.one.four,4)">
                    <span class="font-medium">待支付</span>
                    <span style="float: right" class="color-danger">{{down.one.four.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage(down.one.five,5)">
                    <span class="font-medium">退货</span>
                    <span style="float: right" class="color-danger">{{down.one.five.num}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="un-handle-layout">
            <div class="layout-title">品牌订单统计</div>
            <div class="un-handle-content">
              <el-row :gutter="24">
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage2(down.two.all,0)">
                    <span class="font-medium">全部</span>
                    <span style="float: right" class="color-danger">{{down.two.all.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage2(down.two.one,1)">
                    <span class="font-medium">待支付</span>
                    <span style="float: right" class="color-danger">{{down.two.one.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage2(down.two.two,2)">
                    <span class="font-medium">待生产</span>
                    <span style="float: right" class="color-danger">{{down.two.two.num}}</span>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage2(down.two.three,3)">
                    <span class="font-medium">生产中</span>
                    <span style="float: right" class="color-danger">{{down.two.three.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage2(down.two.four,4)">
                    <span class="font-medium">已发货</span>
                    <span style="float: right" class="color-danger">{{down.two.four.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage2(down.two.five,5)">
                    <span class="font-medium">待评价</span>
                    <span style="float: right" class="color-danger">{{down.two.five.num}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="un-handle-layout">
            <div class="layout-title">积分特价订单统计</div>
            <div class="un-handle-content">
              <el-row :gutter="24">
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage3(down.three.all,0)">
                    <span class="font-medium">全部</span>
                    <span style="float: right" class="color-danger">{{down.three.all.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage3(down.three.one,1)">
                    <span class="font-medium">待付款</span>
                    <span style="float: right" class="color-danger">{{down.three.one.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage3(down.three.two,2)">
                    <span class="font-medium">待发货</span>
                    <span style="float: right" class="color-danger">{{down.three.two.num}}</span>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage3(down.three.three,3)">
                    <span class="font-medium">已发货</span>
                    <span style="float: right" class="color-danger">{{down.three.three.num}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="un-handle-item" @click="goPage3(down.three.four,4)">
                    <span class="font-medium">退货</span>
                    <span style="float: right" class="color-danger">{{down.three.four.num}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="total-layout">
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
    </div>-->
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import { getIndex } from "@/api/index";
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
      center: {
        goods: {
          goods_all: 0,
          goods_no: 0,
          goods_yes: 0
        },
        user: {
          register_tatal: 0,
          register_today: 0,
          vip_today: 0,
          vip_total: 0
        }
      },
      down: {},
      power: "",
      up: {
        money_today: 0,
        money_total: 0,
        money_yesterday: 0,
        order_today: 0
      }
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.getList();
    this.power = sessionStorage.getItem("power");
  },
  methods: {
    goPage(e, status) {
      if (this.power == "2" || this.power == "3") {
        this.$router.push({ path: "/order/index", query: { status: status } });
      } else {
        this.$message.error("暂无权限");
      }
    },
    goPage2(e, status) {
      if (this.power == "2" || this.power == "3") {
        this.$router.push({
          path: "/order/index2",
          query: { status: status }
        });
      } else {
        this.$message.error("暂无权限");
      }
    },
    goPage3(e, status) {
      if (this.power == "2" || this.power == "3") {
        this.$router.push({
          path: "/order/index3",
          query: { status: status }
        });
      } else {
        this.$message.error("暂无权限");
      }
    },
    getList() {
      getIndex({}).then(res => {
        if (res) {
          this.center = res.center;
          this.down = res.down;
          this.up = res.up;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
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
  border: 1px solid #dcdfe6;
}
.total-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: 100px;
}
.total-frame img {
  margin-bottom: 20px;
}
.total-icon {
  color: #409eff;
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
  border: 1px solid #dcdfe6;
}
.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}
.un-handle-content {
  padding: 20px 40px;
}
.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
  cursor: pointer;
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
  border: 1px solid #dcdfe6;
}
.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
.address-content {
  padding: 20px;
  font-size: 18px;
}
</style>
