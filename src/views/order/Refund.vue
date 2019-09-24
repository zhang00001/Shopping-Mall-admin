<template>
  <div>
    <el-radio-group v-model="orderType" style="margin-top:20px;" @change='getOrder(1)'>
      <el-radio-button label="1">全部申请</el-radio-button>
      <el-radio-button label="2">待处理</el-radio-button>
      <el-radio-button label="3">已完成</el-radio-button>
        <el-radio-button label="4">已拒绝</el-radio-button>
          <el-radio-button label="5">退货中</el-radio-button>
    </el-radio-group><br>
    <el-col :span="6" style="margin-top:20px;">
      <span>订单分类</span>

      <el-select v-model="selectStatus" placeholder="请选择" clearable @change="getOrder">
        <el-option label="全部" value=''></el-option>
        <el-option label="试衣间商品" value="1"></el-option>
        <el-option label="品牌商品" value="2"></el-option>
        <el-option label="积分特价商品" value="3"></el-option>
      </el-select>
    </el-col>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="申请时间" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="用户账户"></el-table-column>
      <el-table-column prop="address" label="退款金额"></el-table-column>
      <el-table-column prop="address" label="申请状态"></el-table-column>
      <el-table-column prop="address" label="处理时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>
<script>
import { order_back } from "@/api/index";
export default {
  data() {
    return {
      selectStatus: "",
      tableData: [],orderType:'1',
      total: 0
    };
  },
  created() {
    this.getOrder(1);
  },
  methods: {
    handleCurrentChange(e) {
      this.getOrder(e);
    },
    handleClick(e) {
      if (this.selectStatus == 1) {
        this.$router.push({ path: "index/detail", query: { id: e.id } });
      }
      if (this.selectStatus == 2) {
        this.$router.push({ path: "index2/detail2", query: { id: e.id } });
      }
      if (this.selectStatus == 3) {
        this.$router.push({ path: "index3/detail3", query: { id: e.id } });
      }
    },
    getOrder(page) {
      order_back({ page: page, limit: 10, type: this.selectStatus }).then(
        res => {
   
          if (res.code == 200) {
              this.tableData = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    }
  }
};
</script>