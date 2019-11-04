<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix" style="width:100%">
        <el-row style="margin-bottom:10px;">
          <el-col :span="6">
            <span>用户类型</span>
            <el-select v-model="vip_grade" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="普通用户" value="0"></el-option>
              <el-option label="Vip" value="1"></el-option>
              <el-option label="店长" value="2"></el-option>
              <el-option label="超级店长" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>用户昵称</span>

            <el-input
              placeholder="用户昵称"
              prefix-icon="el-icon-search"
              v-model="searchTitle"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span>注册时间</span>

            <el-date-picker v-model="searchTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>
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
        <el-table-column prop="id" label="用户ID"></el-table-column>
        <el-table-column prop="mobile" label="用户账户"></el-table-column>
        <el-table-column prop="nick" label="用户昵称"></el-table-column>
        <el-table-column prop="weixin" label="微信号"></el-table-column>
        <el-table-column prop="vip_grade_name" label="Vip等级"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>

        <el-table-column prop="order_num" label="订单数量"></el-table-column>
        <el-table-column prop="money" label="可用余额"></el-table-column>
        <el-table-column prop="money_huokuan_use" label="可用货款"></el-table-column>

        <el-table-column prop="shelf" label="账户状态">
          <template slot-scope="scope">
            <template>
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                @change="changeOption(scope.row)"
              ></el-switch>
            </template>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editRem(scope.row)" type="text" size="small">修改备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </template>
    <el-dialog title="修改备注" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <span>备注：</span>
      <el-input v-model="remarks"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/utils/request";
import { user_more, user_del, Updateremarks } from "@/api/index";
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
      isDisable: true,
      dialogFormVisible: false,
      multipleSelection: [],
      allTitle: "全选",
      selAll: false,
      supplier: "",
      tableData: [],
      remarks: "",
      selectId: "",
      supplier_id: "",
      warehouse_id: "",
      shelf: "",
      brand_id: "",
      type: "",
      classify_id: "",
      searchTitle: "",
      vip_grade: "",
      searchTime: "",
      classs: [],
      brands: [],
      warehouses: [],
      suppliers: [],
      total: 0,

      title: "新增",
      fileLists: [],
      page: 1,
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
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
    this.getList(this.page, this.vip_grade, this.searchTitle, this.searchTime);
  },
  methods: {
    save() {
      Updateremarks({ id: this.selectId, remarks: this.remarks }).then(res => {
        this.handleClose();
        this.getList(
          this.page,
          this.vip_grade,
          this.searchTitle,
          this.searchTime
        );
      });
    },
    handleClose() {
      (this.dialogFormVisible = false),
        (this.remarks = ""),
        (this.selectId = "");
    },
    editRem(e) {
      (this.dialogFormVisible = true), (this.selectId = e.id);
    },
    changeOption(e) {
      this.$confirm("更改用户账户状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let state;
          e.status == true ? (state = 1) : (state = 0);
          user_del({ id: e.id, state: state }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
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
    handleCurrentChange(e) {
      this.page = e;
      this.getList(
        this.page,
        this.vip_grade,
        this.searchTitle,
        this.searchTime
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },

    search() {
      this.getList(
        this.page,
        this.vip_grade,
        this.searchTitle,
        this.searchTime
      );
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

    // 加载列表
    getList(page, vip_grade, search, time) {
      user_more({
        page: page,
        limit: 10,

        vip_grade: vip_grade,
        search: search,
        time: time
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.tableData.forEach(val => {
            val.status == 1 ? (val.status = true) : (val.status = false);
          });
          this.total = res.data.count;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 编辑回显
    edit(e) {
      this.$router.push({
        path: "detail",
        query: { id: e.id, page: this.page }
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
 