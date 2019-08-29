<template>
  <div>
    <div>
      <el-radio-group v-model="radio1" style="margin-top:20px;">
        <el-radio-button v-for="(item,index) in orderType" :key="index" :label="item.value">{{item.label}}</el-radio-button>
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
              v-model="searchTitle"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span>收货人</span>

            <el-input
              placeholder="姓名/手机号"
              prefix-icon="el-icon-search"
              v-model="searchTitle"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span>提交时间</span>

            <el-date-picker v-model="searchTitle" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>

          <el-col :span="6">
            <span>订单分类</span>

            <el-select v-model="type" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="试衣间商品" value="1"></el-option>
              <el-option label="品牌商品" value="2"></el-option>
              <el-option label="积分商品" value="3"></el-option>
              <el-option label="特价商品" value="4"></el-option>
            </el-select>
          </el-col>
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
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="addtime" label="提交时间"></el-table-column>
        <el-table-column prop="id" label="用户账户"></el-table-column>
        <el-table-column prop="id" label="订单金额"></el-table-column>
        <el-table-column prop="id" label="支付方式"></el-table-column>

        <el-table-column prop="shelf" label="订单状态">
          <template slot-scope="scope">
            <template v-if="scope.row.shelf==0">下架</template>
            <template v-else>上架</template>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">关闭</el-button>
            <!-- <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button> -->
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
    return {
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
        { value: "1", label: "待付款" },
        { value: "2", label: "待发货" },
        { value: "3", label: "待收货" },
        { value: "4", label: "已完成" },
        { value: "5", label: "已关闭" },
        { value: "6", label: "待审核" },
        { value: "7", label: "待评价" },
        { value: "8", label: "待生产" },
        { value: "9", label: "生产中" }
      ],
      isDisable: true,
      multipleSelection: [],
      allTitle: "全选",
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
  created() {
    this.getList(1, this.searchTitle);
  },
  methods: {
    handleCurrentChange(e) {
      this.getList(e, this.searchTitle);
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
      this.getList(1, this.searchTitle);
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
              this.getList(
                1,
                this.searchTitle,
                this.classify_id,
                this.type,
                this.brand_id,
                this.shelf,
                this.warehouse_id,
                this.supplier_id
              );
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
              this.getList(
                1,
                this.searchTitle,
                this.classify_id,
                this.type,
                this.brand_id,
                this.shelf,
                this.warehouse_id,
                this.supplier_id
              );
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 加载列表
    getList(page, title) {
      order_more({ page: page, limit: 10, title: title,type:2 }).then(res => {
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
      this.$router.push({ path: "edit", query: { id: e.id } });
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
              this.getList(
                1,
                this.searchTitle,
                this.classify_id,
                this.type,
                this.brand_id,
                this.shelf,
                this.warehouse_id,
                this.supplier_id
              );

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
 