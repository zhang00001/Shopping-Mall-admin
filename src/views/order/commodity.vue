<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput">
        <span>商品Id：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="goods_id"
          style="width:200px;"
        ></el-input>
        <span>供应商：</span>
        <el-select v-model="supplier_id" placeholder="请选择" clearable>
          <el-option v-for="item in supps" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <span>仓库：</span>
        <el-select v-model="warehouse_id" placeholder="请选择" clearable>
          <el-option v-for="item in warehs" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <span>日期：</span>
        <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="goods_info.goods_id" label="商品Id"></el-table-column>
        <el-table-column prop="goods_info.title" label="商品名称"></el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <template v-if="scope.row.goods_info.img">
              <img :src="scope.row.goods_info.img" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="supplier_id_name" label="供应商"></el-table-column>
        <el-table-column prop="warehouse_id_name" label="仓库"></el-table-column>
        <el-table-column prop="goods_attribute_info.size" label="尺寸"></el-table-column>
        <el-table-column prop="goods_attribute_info.color" label="颜色"></el-table-column>
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

import {
  banner_more,
  banner_manage,
  banner_one,
  banner_del,
  classify,
  order_look_list,
  warehouse_more,
  supplier_more
} from "@/api/index";
import { POSITION } from "@/utils/enums";
import axios from "axios";
export default {
  data() {
    return {
      SelectIndex: 1,
      spGood: [],
      goodcounts2: [],
      isDisable: true,
      serchTitle: "",
      tableData: [],
      tableData2: [],
      multipleSelection: [],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      imageUrl: "",
      imageUrl2: "",
      showClass2: false,

      position: [],
      selectId: "",
      warehouse_id: "",

      supplier_id: "",

      goods_id: "",
      warehs: [],
      supps: [],
      time: new Date()
    };
  },
  created() {
    this.getSelectDate();
    this.getList(1);
  },
  methods: {
    search() {
      this.getList(this.page);
    },
    getSelectDate() {
      warehouse_more({ page: 1, limit: 10000 }).then(res => {
        this.warehs = res.data.data;
      });
      supplier_more({ page: 1, limit: 10000 }).then(res => {
        this.supps = res.data.data;
      });
    },
    handleCurrentChange(e) {
      this.SelectIndex = e;
      this.getList(e, this.serchTitle);
    },

    // 加载列表
    getList(page) {
      let time = this.time.toISOString().split("T")[0];

      order_look_list({
        page: page,
        limit: 10,
        warehouse_id: this.warehouse_id,
        supplier_id: this.supplier_id,
        goods_id: this.goods_id,
        time: time
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
 