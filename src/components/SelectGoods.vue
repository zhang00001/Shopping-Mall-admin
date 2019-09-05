<template>
  <div>
    <div style="display:flex">
      <p style="margin-right:20px;">选择商品</p>
      <el-select v-model="classify_id" placeholder="一级分类" clearable>
        <el-option label="全部" value></el-option>
        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in classOnes"></el-option>
      </el-select>
      <el-select v-model="brand_id" placeholder="全部品牌" clearable>
        <el-option label="全部" value></el-option>
        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in classTwos"></el-option>
      </el-select>
      <el-input v-model="serchTitle" placeholder="关键词" style="width:200px;"></el-input>
      <el-button type="primary" @click="searchRelation">搜索</el-button>
    </div>
    <div
      style="margin-top:20px;display: flex;
    justify-content: space-between;"
      class="transfer"
    >
      <ul
        class="infinite-list"
        v-infinite-scroll="load"
        style="overflow:auto;height:300px;width:400px;"
      >
        <!-- <li  class="infinite-list-item">{{ i }}</li> -->
        选择商品
        <el-checkbox-group
          v-model="checkList"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-checkbox v-for="item in goodcounts" :key="item.id" :label="item">{{item.title}}</el-checkbox>
        </el-checkbox-group>

        <p v-if="noMore">没有更多了</p>
      </ul>

      <!-- <i class='el-icon-circle-plus-outline' @click="add"></i>
      <i class='el-icon-remove-outline' @click="remove"></i>-->
      <ul class="infinite-list" style="overflow:auto;height:300px;width:400px;">
        <!-- <li  class="infinite-list-item">{{ i }}</li> -->
        <!-- 已选择
        <el-checkbox-group v-model="checkList2">
          <el-checkbox v-for="item in goodcounts2" :key="item.id"   :label="item">{{item.title}}</el-checkbox>
        </el-checkbox-group>-->
      </ul>
    </div>
    <!-- <div style="margin-top:20px;" class="transfer">
      <el-transfer v-model="defulGood" :data="selectGood" :titles="['未选择', '已选择']"></el-transfer>
    </div>-->
  </div>
</template>
<script>
import {
  goods_class_more,
  brand_more,
  goods_more,
  advertisement_log_data,
  special_goods_data
} from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      checkList: [],
      goodcounts: [],
      classify_id: "",
      brand_id: "",
      serchTitle: "",
      classOnes: [],
      classTwos: [],

      goodcounts2: [],
      checkList2: [],
      page: 0
    };
  },
  props: ["Id", "status", "isintegral"],
  created() {
    this.getClsss();

    // 新商品
    this.getGoods1(1);
  },
  destroyed() {},
  methods: {
    add() {
      this.goodcounts2 = this.checkList;

      this.checkList = [];
    },
    remove() {
      this.checkList = [];
    },
    load() {
      this.page = this.page + 1;
      this.getGoods1(this.page);
    },

    searchRelation() {
      this.getGoods1(1, this.classify_id, this.brand_id, this.serchTitle);
    },
    getClsss() {
      goods_class_more({ page: 1, limit: 10000, pid: 0 }).then(res => {
        this.classOnes = res.data.data;
      });
      brand_more({ page: 1, limit: 10000 }).then(res => {
        this.classTwos = res.data.data;
      });
    },
    // 积分商城
    getGoods1(page, classify_id, brand_id, serchTitle) {
      let parmas = {
        page: page,
        limit: 10,
        classify_id: classify_id,
        brand_id: brand_id,
        title: serchTitle
      };
      if (this.isintegral) {
        parmas.type = 3;
      }
      this.loading = true;
      goods_more(parmas).then(res => {
        this.loading = false;
        if (res.data.data.length > 0) {
          if (page == 1) {
            this.goodcounts = res.data.data;
          } else {
            this.goodcounts = this.goodcounts.concat(res.data.data);
          }
        } else {
          this.noMore = true;
        }
      });
    }
  }
};
</script>
<style scoped >
.transfer .el-transfer-panel {
  width: 400px;
}
.el-checkbox-group {
  flex-direction: column;
  display: flex;
}
.el-checkbox {
  margin-top: 15px;
}
</style>
  
 