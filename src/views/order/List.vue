<template>
  <div>
    <div>
      <el-radio-group v-model="radio1" style="margin-top:20px;" @change="changeRadio">
        <el-radio-button
          v-for="(item,index) in orderType"
          :key="index"
          :label="item.value"
        >{{item.label}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="top">
      <div class="demo-input-suffix" style="width:100%">
        <el-row style="margin-bottom:10px;">
          <el-col :span="6">
            <span>订单编号</span>

            <el-input
              placeholder="订单编号/商品货号"
              prefix-icon="el-icon-search"
              v-model="searchname"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span>收货人</span>

            <el-input
              placeholder="姓名/手机号"
              prefix-icon="el-icon-search"
              v-model="mobile"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span>提交时间</span>

            <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>

          <!-- <el-col :span="6">
            <span>订单分类</span>

            <el-select v-model="type" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="试衣间商品" value="1"></el-option>
              <el-option label="品牌商品" value="2"></el-option>
              <el-option label="积分商品" value="3"></el-option>
              <el-option label="特价商品" value="4"></el-option>
            </el-select>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>

            <el-button type="primary" @click="toggleSelection">{{allTitle}}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <template>
      <el-table
        :data="tableData"
        border
        ref="recordTable"
        :show-overflow-tooltip="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="order_sn" label="订单编号"></el-table-column>

        <el-table-column prop="addtime" label="提交时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="用户账户"></el-table-column>
        <el-table-column prop="money" label="订单金额"></el-table-column>
        <el-table-column prop="pay_type_name" label="支付方式"></el-table-column>

        <!-- <el-table-column prop="confirm_name" label="订单状态"></el-table-column>
        <el-table-column prop="money_status_name" label="支付状态"></el-table-column>-->
        <el-table-column prop="total_status" label="状态">
          <template slot-scope="scope">
            <template v-if="scope.row.total_status==-3">未知</template>
            <template v-if="scope.row.total_status==-2">待审核</template>
            <template v-if="scope.row.total_status==-1">已拒绝</template>
            <template v-if="scope.row.total_status==0">待生产</template>
            <template v-if="scope.row.total_status==1">生产中</template>
            <template v-if="scope.row.total_status==2">待支付</template>
            <template v-if="scope.row.total_status==3">待发货</template>
            <template v-if="scope.row.total_status==4">已发货</template>
            <template v-if="scope.row.total_status==5">已完成</template>
            <template v-if="scope.row.total_status==6">退货申请中</template>
            <template v-if="scope.row.total_status==7">退货中</template>
            <template v-if="scope.row.total_status==8">退货完成</template>
            <template v-if="scope.row.total_status==9">已评价</template>
            <template v-if="scope.row.total_status==10">待评价</template>
            <template v-if="scope.row.total_status==11">买家取消</template>
            <template v-if="scope.row.total_status==12">卖家取消</template>
            <template v-if="scope.row.total_status==13">退货申请被驳回</template>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="msg" label="审核状态"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-select v-model="value" :disabled="isDisable" placeholder="批量操作">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          style="    margin-left: 20px;"
          type="primary"
          @click="delAll"
          :disabled="isDisable"
        >确定</el-button>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="供货商" :label-width="formLabelWidth" prop="supplier">
            <el-input v-model="form.supplier" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import { order_more } from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {time:"",searchname:"",mobile:"",
      options: [
        {
          value: "0",
          label: "批量下架"
        },
        {
          value: "1",
          label: "批量上架"
        },
        {
          value: "2",
          label: "批量删除"
        }
      ],
      value: "",
      orderType: [
        { value: "0", label: "全部订单" },
        { value: "1", label: "待审核" },
        { value: "2", label: "待发货" },
        { value: "3", label: "待收货" },
        { value: "4", label: "待支付" },
        { value: "5", label: "退货" }
      ],
      isDisable: true,
      multipleSelection: [],
      allTitle: "全选",
      map: {},
      selAll: false,
      supplier: "",
      radio1: "",
      tableData: [],
      supplier_id: "",
      warehouse_id: "",
      shelf: "",
      brand_id: "",
      type: "",
      classify_id: "",
      searchTitle: "",
      classs: [],
      brands: [],
      warehouses: [],
      suppliers: [],
      total: 0,

      title: "新增",
      fileLists: [],

      form: {
        mobile: "",
        name: "",
        supplier: ""
      },

      rules: {
        mobile: [{ required: true, message: "必填字段", trigger: "blur" }],

        name: [{ required: true, message: "必填字段", trigger: "blur" }],
        supplier: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  watch: {
    $route(to, from) {
      if (from.query) {
      }
    }
  },
  created() {
    if (this.$route.query.map) {
      let routerMsg = JSON.parse(this.$route.query.map);
      switch (routerMsg.msg) {
        case "全部":
          this.radio1 = 0;
          break;
        case "待审核":
          this.radio1 = 1;
          break;
        case "待发货":
          this.radio1 = 2;
          break;
        case "待收货":
          this.radio1 = 3;
          break;
        case "待支付":
          this.radio1 = 4;
          break;
        case "退货":
          this.radio1 = 5;
          break;
        default:
          this.radio1 = 0;
      }

      this.map = routerMsg.map;
    } else {
      this.radio1 = "0";
     
    }
    this.getList(1);
  },
  methods: {
    changeRadio() {
      this.getList(1)
    },
    handleCurrentChange(e) {
      this.getList(e);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    handleClose() {
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
    },
    search() {
      this.getList(1);
    },

    toggleSelection() {
      if (this.selAll) {
        this.selAll = false;
        this.allTitle = "全选";
        this.tableData.forEach(row => {
          this.$refs.recordTable.toggleRowSelection(row, false);
        });
      } else {
        this.allTitle = "取消全选";
        this.tableData.forEach(row => {
          this.$refs.recordTable.toggleRowSelection(row, true);
        });
        this.selAll = true;
      }
    },
    //   批量删除
    delAll() {
      let msg;
      let url;
      let data;
      if (this.value == 0) {
        msg = "是否批量下架";
        (url = "admin/goods/goods_batch_shelf"),
          (data = {
            id: this.multipleSelection.map(val => val.id).toString(),
            shelf: 0
          });
      }
      if (this.value == 1) {
        msg = "是否批量上架";
        url = "admin/goods/goods_batch_shelf";
        data = {
          id: this.multipleSelection.map(val => val.id).toString(),
          shelf: 1
        };
      }
      if (this.value == 2) {
        msg = "是否批量删除";
        url = "admin/goods/goods_batch_del";
        data = {
          id: this.multipleSelection.map(val => val.id).toString()
        };
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http
          .post(url, data)
          .then(res => {
            if (res.code == 200) {
              this.getList(  1,  );
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {});
      });
    },
    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.post("admin/goods/goods_del", { id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList(1,);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 加载列表
    getList(page) {
      
      let time1
      if(this.time==''||this.time==null){
    time1=""
      }else{
            time1=new Date(this.time).toISOString().split("T")[0]
      }
    
      order_more({
        page: page,
        limit: 10,
        search: this.searchname,
        mobile:this.mobile,
        time:time1,
        type: 1,
        index:this.radio1
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;

          this.total = res.data.count;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 编辑回显
    edit(e) {
      this.$router.push({ path: "index/detail", query: { id: e.id } });
      // http.post("admin/goods/goods_one", { id: e.id }).then(res => {
      //   if (res.code == 200) {
      //    sessionStorage.setItem("edit",JSON.stringify(res.detail))

      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // });
    },
    // 新增。编辑保存
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          http.post("admin/goods/supplier_manage", this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);

              this.dialogFormVisible = false;
              this.getList(1);

              this.$refs["form"].resetFields();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.top {
  margin: 20px 0;
  display: flex;
}
.searchInput {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.block {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
</style>
 