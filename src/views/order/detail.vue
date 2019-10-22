<template>
  <div style="margin-top:20px">
    <div style="margin:20px 0;">
      <el-page-header @back="goBack" content style="display:inline-block"></el-page-header>

      <span>
        <i class="el-icon-potato-strips" style="color:red"></i> 当前订单状态 ：
      </span>
      <span>{{data.status_name}}</span>
      <el-button size="mini" v-if="data.status_name=='待审核'" type="primary" @click="send">审核</el-button>
      <!-- <el-button size="mini" type="primary"   @click=" this.dialogFormVisible5 = true">取消订单</el-button> -->
      <el-button
        size="mini"
        type="primary"
        v-if="data.total_status==7&&data.yes==0"
        @click="send2(1)"
      >设置退单物流</el-button>
      <el-button
        size="mini"
        v-if="data.status==0&&data.confirm==2"
        type="primary"
        @click="send2(0)"
      >发货</el-button>
      <el-button size="mini" v-if="data.status==2" type="primary" @click="logistics">查看物流</el-button>
      <el-button size="mini" v-if="data.status==4" type="primary" @click="send4">退货审核</el-button>
      <el-button size="mini" v-if="data.status==5" type="primary" @click="over">退货完成</el-button>
    </div>
    <el-row :gutter="24">
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="9">
              <div class="text item">
                <p>订单编号</p>
                <span>{{data.order_sn}}</span>
              </div>
              <div class="text item">
                <p>发货单流水号</p>
                <span>{{data.order_sn}}</span>
              </div>
              <div class="text item">
                <p>物流单号</p>
                <span>{{data.logistics_number}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text item">
                <p>用户账户</p>
                <span>{{data.user_info.mobile}}</span>
              </div>
              <div class="text item">
                <p>用户昵称</p>
                <span>{{data.user_info.nick}}</span>
              </div>
              <div class="text item">
                <p>推荐账户</p>
                <span></span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="text item">
                <p>支付方式</p>
                <span>{{data.pay_type}}</span>
              </div>

              <div class="text item">
                <p>订单金额</p>
                <span>{{data.money}}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>收货信息</span>
          </div>
          <div class="text item">
            <p>收货人</p>
            <span>{{data.address_info.name}}</span>
          </div>
          <div class="text item">
            <p>手机号码</p>
            <span>{{data.address_info.mobile}}</span>
          </div>
          <div class="text item">
            <p>收货地址</p>
            <span>{{data.address_info.province_name}}-{{data.address_info.city_name}}-{{data.address_info.area_name}}-{{data.address_info.detail}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="overview-layout">
      <el-row :gutter="24" style="margin-top:20px;">
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品信息</span>
            </div>

            <div style="padding:5px 0 20px 10px ">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="attribute_info.data.goods_id" label="商品Id"></el-table-column>

                <el-table-column prop="attribute_info.data.title" label="商品名称" width="600px;"></el-table-column>
                <el-table-column prop="attribute_info.data.img" label="商品图片">
                  <template slot-scope="scope">
                    <img
                      :src="scope.row.attribute_info.data.img"
                      style="width:50px;height:50px;"
                      alt
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="attribute_info.money" label="价格"></el-table-column>
                <el-table-column prop="attribute_info.size" label="属性规格">
                  <template
                    slot-scope="scope"
                  >{{scope.row.attribute_info.size}} {{scope.row.attribute_info.color}}</template>
                </el-table-column>
                <el-table-column prop="buy_num" label="数量"></el-table-column>
                <!-- <el-table-column prop="attribute_id" label="小计"></el-table-column> -->
              </el-table>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <div class="out-border">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>费用信息</span>
              </div>
              <div class="text item">
                <p>运费</p>
                <span>{{data.money_logistics}}</span>
              </div>
              <div class="text item">
                <p>销售金额</p>
                <span>{{data.money_theory}}</span>
              </div>
              <div class="text item">
                <p>实际付款金额</p>
                <span>{{data.money}}</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="审核信息" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="confirm">
        <el-radio :label="2">通过</el-radio>
        <el-radio :label="1">不通过</el-radio>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okSend">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="发货" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="物流公司" :label-width="formLabelWidth">
          <el-select v-model="form.card" placeholder="请选择">
            <el-option v-for="item in cards" :key="item.card" :label="item.name" :value="item.card"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流编号" :label-width="formLabelWidth">
          <el-input v-model="form.logistics_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remarks"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okSend2">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="物流状态" :visible.sync="dialogFormVisible3">
      <p>当前状态：{{state_name}}</p>
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.AcceptTime"
        >{{activity.AcceptStation}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
    <el-dialog title="退货审核" :visible.sync="dialogFormVisible4">
      <el-radio-group v-model="back_confirm">
        <el-radio :label="2">通过</el-radio>
        <el-radio :label="1">不通过</el-radio>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="okSend4">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="取消订单" :visible.sync="dialogFormVisible5">
      <el-input type="textarea" :rows="2" placeholder="请输入原因" v-model="remarks"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  order_look,
  order_logistics_status,
  order_confim,
  logistics,
  back_confirm,
  back_finish,
  order_cancel,
  wuliu,
  order_back_logistics
} from "@/api/index";
export default {
  data() {
    return {
      active: 0,
      data: {},
      cards: [],
      activities: [],
      logisticsType: 0, //oo默认发货，1 退单发货
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      state_name: "",
      form: {
        remarks: "",
        logistics_number: "",
        card: ""
      },
      remarks: "",
      formLabelWidth: "120px",
      confirm: 1,
      back_confirm: 1
    };
  },
  created() {
    this.$route.params.map;

    this.getData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 取消订单
    cancel() {
      this.$confirm("确认取消吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          order_cancel({
            id: this.$route.query.id,
            remarks: this.remarks
          }).then(res => {
            if (res.code == 200) {
              this.getData();
              this.dialogFormVisible5 = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 发货
    send() {
      this.dialogFormVisible = true;
    },
    send2(e) {
      this.logisticsType = e;
      wuliu({}).then(res => {
        if (res) {
          this.dialogFormVisible2 = true;
          this.cards = res;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    send4() {
      this.dialogFormVisible4 = true;
    },
    logistics() {
      this.dialogFormVisible3 = true;
      logistics({
        code: this.data.logistics_number,
        type: this.data.logistics_card,
        from: 1,
        id: this.data.id
      }).then(res => {
        if (res.code == 200) {
          this.activities = res.data.data;
          this.state_name = res.data.State_name;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    over() {
      this.$confirm("确认收到货了吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          back_finish({
            id: this.$route.query.id
          }).then(res => {
            if (res.code == 200) {
              this.getData();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    okSend4() {
      this.$confirm("确认以上信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          back_confirm({
            id: this.$route.query.id,
            back_confirm: this.back_confirm
          }).then(res => {
            if (res.code == 200) {
              this.getData();
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    okSend() {
      this.$confirm("确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          order_confim({
            id: this.$route.query.id,
            confirm: this.confirm
          }).then(res => {
            if (res.code == 200) {
              this.getData();
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    okSend2() {
      this.$confirm("确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.logisticsType == 0) {
            order_logistics_status({
              order_id: this.$route.query.id,
              logistics_number: this.form.logistics_number,
              remarks: this.form.remarks,
              card: this.form.card
            }).then(res => {
              if (res.code == 200) {
                this.getData();
                this.dialogFormVisible2 = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            order_back_logistics({
              order_id: this.$route.query.id,
              logistics_number: this.form.logistics_number,
              msg: this.form.remarks,
              logistics_company: this.form.card
            }).then(res => {
              if (res.code == 200) {
                this.getData();
                this.dialogFormVisible2 = false;
              } else {
                this.$message.error(res.msg);
              }
            });
          }
        })
        .catch(() => {});
    },
    getData() {
      order_look({ id: this.$route.query.id }).then(res => {
        if (res) {
          // this.active = res.status;
          this.data = res;
          this.tableData = res.goods_info;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang=""  scoped>
.text {
  font-size: 16px;
}

.item {
  margin-bottom: 18px;
  display: flex;
}

.item p {
  width: 25%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
}
</style>