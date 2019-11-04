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
    <el-table :data="tableData" stripe style="margin-top:20px;" border>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="申请时间">
        <template slot-scope="scope">
          <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
        </template>
      </el-table-column>
      <el-table-column prop="order_sn" label="订单号" width="300"></el-table-column>

      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="nick" label="昵称"></el-table-column>
      <el-table-column prop="pay_type" label="支付方式"></el-table-column>

      <el-table-column prop="money_huokuan" label="货款" width="80"></el-table-column>
      <el-table-column prop="money_yajing" label="押金" width="80"></el-table-column>
      <el-table-column prop="logistics_status_name" label="状态" width="80"></el-table-column>
      <el-table-column prop="msg" label="信息"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
    ></el-pagination>
  </div>
</template>
<script>
import { order_vip_more } from "@/api/index";
export default {
  data() {
    return {
      selectStatus: "1",
      radio1: "0",
      tableData: [],
      orderType: [
        // { value: "0", label: "全部订单" },
        { value: "0", label: "待发货" },
        { value: "1", label: "已发货" },
        { value: "2", label: "已完成" }
      ],
      total: 0,
      page: 1
    };
  },
  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
    this.getOrder(this.page);
  },
  methods: {
    changeRadio() {
      this.getOrder(this.page);
    },
    handleCurrentChange(e) {
      this.page = e;
      this.getOrder(this.page);
    },
    handleClick(e) {
      this.$router.push({
        path: "vip/detail",
        query: { id: e.id, page: this.page }
      });
    },
    getOrder(page) {
      order_vip_more({
        page: page,
        limit: 10,
        logistics_status: this.radio1
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.count;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>