<template>
  <div>
    <el-page-header @back="goBack" content="详情页面" style="    margin: 22px 0;"></el-page-header>

    <el-card class="box-card">
      <el-row :gutter="8">
        <el-col :span="2" class="avatar">
          <el-avatar :size="100" :src="circleUrl"></el-avatar>
          <p>
            {{userInfo.nick}} -
            <template v-if="userInfo.vip_grade==0">普通</template>

            <template v-if="userInfo.vip_grade==1">Vip</template>
            <template v-if="userInfo.vip_grade==2">店长</template>
            <template v-if="userInfo.vip_grade==3">超级店长</template>
          </p>
          <p>
            <el-button @click="dialogVisible = true" size="mini" type="text">赠送积分</el-button>
            <el-button @click="dialogVisible6 = true" size="mini" type="text">充值</el-button>
            <!-- <i @click="dialogVisible = true" class="el-icon-edit"></i> -->
          </p>
        </el-col>
        <el-col :span="4">
          <div class="info">
            <p>用户ID：</p>
            <span>{{userInfo.id}}</span>
          </div>
          <div class="info">
            <p>昵称：</p>
            <span>{{userInfo.nick}}</span>
          </div>
          <div class="info">
            <p>微信：</p>
            <span>{{userInfo.weixin}}</span>
          </div>
          <div class="info">
            <p>邀请码：</p>
            <span>{{userInfo.invitation_code}}</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="info">
            <p>所在地：</p>
            <span></span>
          </div>
          <div class="info">
            <p>注册时间：</p>
            <span>{{userInfo.addtime|formatDate}}</span>
          </div>
          <div class="info">
            <p>推荐人ID：</p>
            <span>{{userInfo.pid}}</span>
          </div>
          <div class="info">
            <p>推荐人昵称：{{userInfo.pid_nick}}</p>
            <span></span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="info">
            <p>开户行：{{userInfo.bank_info?userInfo.bank_info.subordinate:""}}</p>
            <span></span>
          </div>
          <div class="info">
            <p>银行卡号：{{userInfo.bank_info?userInfo.bank_info.bankcard:""}}</p>
            <span></span>
          </div>
          <div class="info">
            <p>可提现：</p>
            <span></span>
          </div>
          <div class="info">
            <p>可用余额：{{userInfo.money}}</p>
            <span></span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <div class="overview-layout">
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">
              <span>统计信息</span>
            </div>
            <div style="padding:5px 0 20px 10px">
              <el-row class="font-medium">
                <el-col :span="4" class="overview-item-title">可用积分</el-col>
                <el-col :span="4" class="overview-item-title">收藏商品</el-col>

                <el-col :span="4" class="overview-item-title">一度人脉</el-col>
                <el-col :span="4" class="overview-item-title">二度人脉</el-col>
                <el-col :span="4" class="overview-item-title">潜在人脉</el-col>
              </el-row>
              <el-row>
                <el-col :span="4" class="color-danger overview-item-value">{{userInfo.integral}}</el-col>
                <el-col
                  :span="4"
                  class="color-danger overview-item-value"
                >{{userInfo.tongji?userInfo.tongji.collect:""}}</el-col>
                <el-col :span="4" class="color-danger overview-item-value">
                  <span @click="Connections(1)">{{userInfo.tongji?userInfo.tongji.one:""}}</span>
                </el-col>
                <el-col :span="4" class="color-danger overview-item-value">
                  <span @click="Connections(2)">{{userInfo.tongji?userInfo.tongji.two:""}}</span>
                </el-col>
                <el-col :span="4" class="color-danger overview-item-value">
                  <span @click="Connections(3)">{{userInfo.tongji?userInfo.tongji.three:""}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="out-border">
            <div class="layout-title">
              <span>财务信息</span>
              <div>
                <el-date-picker
                  v-model="value2"
                  type="month"
                  placeholder="选择月"
                  size="mini"
                  @change="changeMonth"
                ></el-date-picker>
                <el-button size="mini" @click="seeIntegral">查看积分明细</el-button>
                <el-button size="mini" @click="seeGrade">查看等级变更明细</el-button>
                <el-button size="mini" @click="seeMoney">查看资金明细</el-button>
              </div>
            </div>
            <div style="padding:5px 0 20px 10px ">
              <el-row class="font-medium">
                <el-col :span="3" class="overview-item-title">当月收入</el-col>
                <el-col :span="3" class="overview-item-title">当月消费额</el-col>

                <!-- <el-col :span="3" class="overview-item-title">当月利润</el-col> -->
                <el-col :span="3" class="overview-item-title">当月奖金</el-col>
                <el-col :span="3" class="overview-item-title">消费额返点</el-col>

                <el-col :span="3" class="overview-item-title">预估收入</el-col>

                <el-col :span="3" class="overview-item-title">使用货款</el-col>
                <!-- <el-col :span="3" class="overview-item-title">可用货款</el-col> -->
              </el-row>
              <el-row>
                <el-col :span="3" class="color-danger overview-item-value">{{monthData.month_one}}</el-col>
                <el-col :span="3" class="color-danger overview-item-value">{{monthData.month_two}}</el-col>
                <el-col :span="3" class="color-danger overview-item-value">{{monthData.month_three}}</el-col>
                <el-col :span="3" class="color-danger overview-item-value">{{monthData.month_four}}</el-col>
                <el-col :span="3" class="color-danger overview-item-value">{{monthData.month_five}}</el-col>
                <el-col :span="3" class="color-danger overview-item-value">{{monthData.month_six}}</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top:20px;">
        <el-col :span="8">
          <div class="out-border">
            <div class="layout-title">地址信息</div>
            <div style="padding:5px 0 20px 10px ">
              <el-table :data="addressData" style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="province_name" label="收货地址">
                  <template slot-scope="scope">
                    <template
                      v-if="scope.row.province_name"
                    >{{scope.row.province_name}}-{{scope.row.city_name}}-{{scope.row.area_name}}-{{scope.row.detail}}</template>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :total="addressTotal"
                @current-change="AddreddhandleCurrentChange"
              ></el-pagination>
            </div>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="out-border">
            <div class="layout-title">订单信息</div>
            <div style="padding:5px 0 20px 10px ">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="order_sn" label="订单编号" width="300px"></el-table-column>
                <el-table-column prop="goods_type" label="订单类型"></el-table-column>

                <el-table-column prop="addtime" label="提交时间">
                  <template slot-scope="scope">
                    <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
                  </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="confirm_name" label="状态"></el-table-column>
                <el-table-column prop="pay_type_name" label="支付方式"></el-table-column>

                <el-table-column prop="money_status_name" label="订单状态"></el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看订单</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :total="orderTotal"
                @current-change="OrderhandleCurrentChange"
              ></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="设置积分" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="赠送积分">
          <el-input v-model="integral"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="giveIntegral">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="积分明细" :visible.sync="dialogVisible2" width="50%">
      <el-table :data="tableDataIntegral" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="addtime" label="创建时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="integral" label="积分"></el-table-column>
        <el-table-column prop="msg" label="备注"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="totalIntegral"
        @current-change="handleCurrentChangeIntegral"
      ></el-pagination>
    </el-dialog>
    <el-dialog title="等级变更明细" :visible.sync="dialogVisible3" width="50%">
      <el-table :data="tableDataGrade" style="width: 100%">
        <el-table-column prop="date" label="订单编号"></el-table-column>
        <el-table-column prop="name" label="提交时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="用户账户"></el-table-column>
        <el-table-column prop="address" label="订单金额"></el-table-column>
        <el-table-column prop="address" label="支付方式"></el-table-column>

        <el-table-column prop="address" label="订单状态"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total2"
        @current-change="handleCurrentChange2"
      ></el-pagination>
    </el-dialog>
    <el-dialog title="资金变更" :visible.sync="dialogVisible4" width="50%">
      <el-table :data="tableDataMoney" style="width: 100%">
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name" label="提交时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态">

          <template slot-scope="scope">
            <template v-if="scope.row.status==1">收入</template>
              <template v-if="scope.row.status==2">支出</template>
          </template>
        </el-table-column>-->
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="msg" label="说明"></el-table-column>

        <!-- <el-table-column prop="address" label="支付方式"></el-table-column>

        <el-table-column prop="address" label="订单状态"></el-table-column>-->
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total3"
        @current-change="handleCurrentChange3"
      ></el-pagination>
    </el-dialog>
    <el-dialog title="人脉" :visible.sync="dialogVisible5" width="50%">
      <el-table :data="tableFriend" style="width: 100%">
        <el-table-column prop="nick" label="昵称"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt style="width:50px;" />
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="vip_grade" label="Vip等级"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="totalFriend"
        @current-change="handleCurrentChange4"
      ></el-pagination>
    </el-dialog>
    <el-dialog title="充值" :visible.sync="dialogVisible6" width="30%">
      <el-form :model="form">
        <el-form-item label="充值金额">
          <el-input v-model="money" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible6 = false">取 消</el-button>
        <el-button type="primary" @click="charge_money">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  user_one,
  user_integral_give,
  user_integral,
  user_grade,
  user_money,
  user_money_right,
  user_address,
  user_order,
  friend_list,
  charge_money_huokuan_use
} from "@/api/index";
export default {
  data() {
    return {
      memberId: "",
      total3: 0,
      total2: 0,
      dialogVisible5: false,
      dialogVisible6: false,
      userInfo: {
        nick: "",
        integral: "",
        month_one: ""
      },
      money: "",
      tableDataMoney: [],
      tableDataGrade: [],
      monthData: {},
      tableData: [],
      orderTotal: 0,
      addressData: [],
      tableFriend: [],
      addressTotal: 0,
      tableDataIntegral: [],
      totalIntegral: 0,
      value2: new Date().toISOString().slice(0, 7),
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      integral: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      totalFriend: 0,
      selectFriend: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    charge_money() {
      charge_money_huokuan_use({
        user_id: this.$route.query.id,
        money: this.money
      }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.dialogVisible6 = false;
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleCurrentChange4(e) {
      this.Connections(this.selectFriend, e);
    },
    Connections(e, page) {
      this.dialogVisible5 = true;
      this.selectFriend = e;
      friend_list({
        page: page ? page : 1,
        limit: 10,
        type: e,
        user_id: this.$route.query.id
      }).then(res => {
        this.tableFriend = res.data.data;
        this.totalFriend = res.data.count;
      });
    },
    changeMonth(e) {
      console.log(e);
      this.getMoneyList(
        new Date(e).toISOString().slice(0, 4) +
          "-" +
          (new Date(e).getMonth() + 1)
      );
    },
    // 查看积分明细
    seeIntegral() {
      (this.dialogVisible2 = true), this.getIntegral(1);
    },
    seeGrade() {
      (this.dialogVisible3 = true), this.getGrade(1);
    },
    seeMoney() {
      (this.dialogVisible4 = true), this.getMoney(1);
    },
    // 赠送积分
    giveIntegral() {
      user_integral_give({
        id: this.$route.query.id,
        integral: this.integral
      }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.dialogVisible = false;
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getGrade(page) {
      user_grade({
        page: page,
        limit: 10,
        user_id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.tableDataGrade = res.data.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getMoney(page) {
      user_money({
        page: page,
        limit: 10,
        user_id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.tableDataMoney = res.data.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getIntegral(page) {
      user_integral({
        page: page,
        limit: 10,
        user_id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.tableDataIntegral = res.data.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleCurrentChangeIntegral(e) {
      this.getIntegral(e);
    },
    handleCurrentChange2(e) {
      this.getGrade(e);
    },
    handleCurrentChange3(e) {
      this.getMoney(e);
    },
    OrderhandleCurrentChange(e) {
      this.getOrderList(e);
    },
    AddreddhandleCurrentChange(e) {
      this.getUserAddress(e);
    },
    getData() {
      user_one({ id: this.$route.query.id }).then(res => {
        if (res.code == 200) {
          this.userInfo = res.data;
          this.circleUrl = this.userInfo.avatar;
        } else {
          this.$message.error(res.msg);
        }
      });
      this.getUserAddress(1);
      this.getMoneyList(this.value2);
      this.getOrderList(1);
    },
    getMoneyList(time) {
      user_money_right({ user_id: this.$route.query.id, time: time }).then(
        res => {
          this.monthData = res.data;
        }
      );
    },
    getOrderList(page) {
      user_order({ user_id: this.$route.query.id, page: page, limit: 10 }).then(
        res => {
          this.tableData = res.data.data;
          this.orderTotal = res.data.count;
        }
      );
    },
    getUserAddress(page) {
      user_address({
        user_id: this.$route.query.id,
        page: page,
        limit: 10
      }).then(res => {
        this.addressData = res.data.data;
        this.addressTotal = res.data.count;
      });
    },
    handleClick(e) {
      if (e.goods_type == "试衣间商品") {
        this.$router.push({ path: "/order/index/detail", query: { id: e.id } });
      }
      if (e.goods_type == "品牌商品") {
        this.$router.push({
          path: "/order/index2/detail2",
          query: { id: e.id }
        });
      }
      if (e.goods_type == "积分商品") {
        this.$router.push({
          path: "/order/index3/detail3",
          query: { id: e.id }
        });
      }
      if (e.goods_type == "Vip商品") {
        this.$router.push({ path: "/order/vip/detail", query: { id: e.id } });
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="">
.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar p {
  font-size: 16px;
  text-align: center;
  margin-top: 14px;
}
.avatar p i {
  cursor: pointer;
}
.info {
  display: flex;
  margin: 15px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.un-handle-content {
  padding: 20px 40px;
}
.un-handle-item {
  border-bottom: 1px solid #ebeef5;
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