<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix" style="width:100%">
        <el-row style="margin-bottom:10px;">
          <el-col :span="6">
            <span>类型</span>

            <el-select v-model="selectStatus" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="已完成" value="3"></el-option>
              <el-option label="已驳回" value="2"></el-option>
              <el-option label="申请中" value="1"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="dialogVisible=true">去审核</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column prop="date" label="id" width="180"></el-table-column>
      <el-table-column prop="name" label="提现单号" width="180"></el-table-column>
      <el-table-column prop="address" label="提现类型"></el-table-column>
      <el-table-column prop="address" label="提现到"></el-table-column>
      <el-table-column prop="address" label="提现金额"></el-table-column>
      <el-table-column prop="address" label="手续费"></el-table-column>
      <el-table-column prop="address" label="提现时间">
              <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
            
          </template>
      </el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div class='info'>

      
      <span>用户Id：</span>
      <span>提现类型：</span>
      <span>提现凡是：</span>
      <span>提现金额：</span>
      <span>手续费：</span>
      <span>开户行：</span>
      <span>银行卡号：</span>
  </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确认打款</el-button>
        <el-button type="primary" @click="dialogVisible = false">驳 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { withdraw_more } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      selectStatus: ""
    };
  },
  created() {
    this.getList(1, this.selectStatus);
  },
  methods: {
    search() {
      this.getList(1, this.selectStatus);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
.info{
    display: flex;
    flex-direction: column;

}
.info span{
    margin-top: 20px;
    margin-left: 20px;
}
</style>