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
        <el-select v-model="supplier_id" placeholder="请选择" clearable filterable>
          <el-option v-for="item in supps" :key="item.id" :label="item.supplier" :value="item.id"></el-option>
        </el-select>
        <span>仓库：</span>
        <el-select v-model="warehouse_id" placeholder="请选择" clearable>
          <el-option v-for="item in warehs" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <span>日期：</span>
        <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
        <span>订单类型</span>
        <el-select v-model="goods_type" placeholder="请选择" clearable>
          <el-option label="试衣间订单" value="1"></el-option>
          <el-option label="品牌订单" value="2"></el-option>
          <el-option label="积分特价" value="3"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="search">搜索</el-button>

      <el-button type="primary" @click="exportElex">导出</el-button>
    </div>

    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <template v-if="scope.row.goods_info.img">
              <img :src="scope.row.goods_info.img" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="goods_info.goods_id" label="商品Id"></el-table-column>
        <el-table-column prop="goods_info.number" label="货号"></el-table-column>

        <el-table-column prop="order_sn" label="订单号"></el-table-column>

        <el-table-column prop="goods_info.title" label="商品名称"></el-table-column>
        <el-table-column prop="goods_type_name" label="订单类型"></el-table-column>
        <el-table-column prop="addtime" label="时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
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
  supplier_more,
  order_look_excel
} from "@/api/index";
import { POSITION } from "@/utils/enums";
import axios from "axios";
export default {
  data() {
    return {
      goods_type: "",
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
      href: "www.baicu.com",
      supplier_id: "",

      goods_id: "",
      warehs: [],
      supps: [],
      time: new Date(new Date().setHours(0, 0, 0, 0))
    };
  },
  created() {
    this.getSelectDate();
    this.getList(this.SelectIndex);
  },
  methods: {
    exportElex(e) {
      let time = Number(this.time.getTime() / 1000).toFixed(0);
      order_look_list({
        page: 1,
        limit: 10000,
        warehouse_id: this.warehouse_id,
        supplier_id: this.supplier_id,
        goods_id: this.goods_id,
        goods_type: this.goods_type,
        time: time
      }).then(res => {
        if (res.code == 200) {
          if (res.data.count > 0) {
            window.location.href = `${process.env.BASE_API}/admin/order/order_look_excel?warehouse_id=${this.warehouse_id}&supplier_id=${this.supplier_id}&goods_id=${this.goods_id}&time=${time}&goods_type=${this.goods_type}`;
          } else {
            this.$message.error("暂无数据");
          }
        }
      });
    },
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
      let time = Number(this.time.getTime() / 1000).toFixed(0);

      order_look_list({
        page: page,
        limit: 10,
        warehouse_id: this.warehouse_id,
        supplier_id: this.supplier_id,
        goods_id: this.goods_id,
        time: time,
        goods_type: this.goods_type
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
 