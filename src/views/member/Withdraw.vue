<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix" style="width:100%">
        <el-row style="margin-bottom:10px;">
          <el-col :span="6">
            <span>类型</span>

            <el-select v-model="selectStatus" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="已完成" value="2"></el-option>
              <el-option label="已驳回" value="1"></el-option>
              <el-option label="申请中" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>
            <!-- <el-button type="primary" @click="dialogVisible=true">去审核</el-button> -->
          </el-col>
        </el-row>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="nick" label="昵称"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="money_actual" label="流动资金"></el-table-column>
      <el-table-column prop="money_theory" label="提现金额"></el-table-column>
      <!-- <el-table-column prop="name" label="提现单号" width="180"></el-table-column>
      <el-table-column prop="address" label="提现类型"></el-table-column>
      <el-table-column prop="address" label="提现到"></el-table-column>
      <el-table-column prop="address" label="提现金额"></el-table-column>
      <el-table-column prop="address" label="手续费"></el-table-column>-->
      <el-table-column prop="address" label="提现时间" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作" width="150px;">
        <template slot-scope="scope">
          <template v-if="scope.row.status==0">
            <el-button type="text" @click="edit(scope.row,1)">驳 回</el-button>
            <el-button type="text" @click="edit(scope.row,2)">确认打款</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>
<script>
import { withdraw_more, withdraw_status } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      selectStatus: "",
      selectData: {},
      total: 0
    };
  },
  created() {
    this.getList(1, this.selectStatus);
  },
  methods: {
    handleCurrentChange(e) {
      this.getList(e, this.selectStatus);
    },
    search() {
      this.getList(1, this.selectStatus);
    },
    edit(e, status) {
      let type = 0;
      if(e.vip_grade=='超级店长'){
 this.$confirm("是否打款6万", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          type = 1;
        })
        .catch(() => {
          type = 0;
        });
      }
     

      withdraw_status({ id: e.id, status: status, type: type }).then(res => {
        if (res.code == 200) {
          this.getList(1, this.selectStatus);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getList(page, status) {
      withdraw_more({ page: page, limit: 10, status: status }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
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
.info {
  display: flex;
  flex-direction: column;
}
.info span {
  margin-top: 20px;
  margin-left: 20px;
}
</style>