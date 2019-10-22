<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput"></div>
    </div>

    <template>
      <el-table :data="tableData" border ref="recordTable">
        <el-table-column prop="addtime" label="时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="address" label="地区"></el-table-column>
        <el-table-column prop="type" label="浏览器"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";

import { admin_log } from "@/api/index";
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],

      total: 0
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    handleCurrentChange(e) {
      this.getList(e);
    },

    // 加载列表
    getList(page) {
      admin_log({ page: page, limit: 10 }).then(res => {
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
</style>
 