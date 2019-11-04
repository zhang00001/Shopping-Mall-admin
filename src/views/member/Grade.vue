<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix" style="width:100%">
        <el-row style="margin-bottom:10px;">
          <el-col :span="6">
            <span>Vip等级</span>

            <el-select v-model="vip_grade" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option label="店长" value="2"></el-option>
              <el-option label="超级店长" value="0"></el-option>
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

            <!-- <el-button type="primary" @click="toggleSelection">{{allTitle}}</el-button> -->
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
        <el-table-column prop="user_id" label="用户ID"></el-table-column>
        <el-table-column prop="mobile" label="用户账户"></el-table-column>
        <el-table-column prop="nick" label="用户昵称"></el-table-column>
        <!-- <el-table-column prop="weixin" label="微信号"></el-table-column> -->
        <el-table-column prop="pay_type" label="支付方式"></el-table-column>

        <el-table-column prop="vip_grade" label="待升等级"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>

        <el-table-column prop="img" label="审核图片(点击预览)">
          <template slot-scope="scope">
            <img
              style="width:100px;height:100px;"
              :src="scope.row.img"
              alt
              @click="mall(scope.row.img)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.status=='待审核'">
              <el-button @click="confirm(scope.row,2)" type="text" size="small">审核通过</el-button>
              <el-button @click="confirm(scope.row,1)" type="text" size="small">不通过</el-button>
            </template>
            <template
              v-if="scope.row.status=='待审核'&&scope.row.vip_grade=='超级店长'&&scope.row.other.vip_grade_now==2"
            >
              <el-button @click="confirm(scope.row,2)" type="text" size="small">审核通过</el-button>
              <el-button @click="confirm(scope.row,1)" type="text" size="small">不通过</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <el-dialog title="审核通过" :visible.sync="dialogFormVisible">
        <span>普通用户升级店长</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save(1)">确认打款 5000元货款+500保证金</el-button>
        </span>
      </el-dialog>
      <el-dialog title="审核通过" :visible.sync="dialogFormVisible1">
        <span>vip升级店长</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="save(1)">5000元货款+500保证金</el-button>
          <el-button type="primary" @click="save(0)">推荐10个vip+500元保证金</el-button>
        </span>
      </el-dialog>
      <el-dialog title="审核通过" :visible.sync="dialogFormVisible2">
        <span>vip升级店长</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" @click="save(1)">直推10个店长，100000元货款+10000元保证金</el-button>
          <el-button type="primary" @click="save(0)">直推20店长+30位团队店长共计50位店长+10000元保证金</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import { vip_grade_more, user_del, manage_confirm } from "@/api/index";
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
      SelectIndex: 1,
      value: "",
      vip_grade: "",
      isDisable: true,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      multipleSelection: [],
      allTitle: "全选",
      selAll: false,
      supplier: "",
      tableData: [],
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
      selectId: "",
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
    this.getList(
      this.SelectIndex,
      this.vip_grade,
      this.searchTitle,
      this.searchTime
    );
  },
  methods: {
    mall(e) {
      this.$alert(
        `<div style='width:600px;height:300px;'><img  style='width:300px;' src=${e}></div>`,
        "",
        {
          dangerouslyUseHTMLString: true
        }
      );
    },

    handleCurrentChange(e) {
      this.SelectIndex = e;
      this.getList(e, this.vip_grade, this.searchTitle, this.searchTime);
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
      this.getList(
        this.SelectIndex,
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
    getList(page, vip_grade, searchTitle, searchTime) {
      vip_grade_more({
        page: page,
        limit: 10,
        vip_grade: vip_grade,
        search: searchTitle,
        time: this.searchTime
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;

          this.total = res.data.count;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    confirm(e, status) {
      // let num = 0;
      // 普通用户

      // status 0 不通过  1 通过
      if (status == 1) {
        this.$confirm(`是否不通过`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.getmanage_confirm(e.id, status, 0);
          })
          .catch(() => {});
      } else {
        this.selectId = e.id;
        if (e.other.vip_grade_now == 0) {
          this.dialogFormVisible = true;
        }
        // vip
        if (e.other.vip_grade_now == 1) {
          this.dialogFormVisible1 = true;
        }
        if (e.other.vip_grade_now == 2 && e.vip_grade == "超级店长") {
          this.dialogFormVisible2 = true;
        }
      }
    },
    save(e) {
      this.$confirm(`是否确认?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  1 普用户升级店长  2  vip升级店长 5000元货款+500保证金 3推荐10个vip+500元保证金

          this.getmanage_confirm(this.selectId, 2, e);
        })
        .catch(() => {});
    },
    getmanage_confirm(id, status, type) {
      manage_confirm({ id: id, status: status, type: type }).then(res => {
        if (res.code == 200) {
          this.getList(this.SelectIndex);
          this.dialogFormVisible2 = false;
          this.dialogFormVisible1 = false;
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
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
 