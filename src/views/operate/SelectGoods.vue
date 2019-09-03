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
    <div style="margin-top:20px;" class='transfer'>
      <el-transfer v-model="defulGood" :data="selectGood"  :titles="['未选择', '已选择']"></el-transfer>
    </div>
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
      classify_id: "",
      brand_id: "",
      serchTitle: "",
      classOnes: [],
      classTwos: [],
      defulGood: [],
      selectGood: []
    };
  },
  props: ["Id", "status"],
  created() {
    console.log(this.status);
    this.getClsss();

    this.getAdGood(1);
  },
  destroyed() {
    (this.defulGood = []), (this.selectGood = []);
  },
  methods: {
    getAdGood(page) {
      
      if (this.status == "sp") {
        special_goods_data({ special_id: this.Id, page: page, limit: 10 }).then(
          res => {
            if (res.code == 200) {
              if (res.data.data.length > 0) {
                
                this.getGoods();
                this.defulGood = res.data.data.map(val => Number(val.goods_id));
              }
            } else {
              this.$message.error(res.msg);
            }
          }
        );
      }
      if (this.status == "ad") {
        advertisement_log_data({
          advertisement_id: this.Id,
          page: page,
          limit: 10
        }).then(res => {
          if (res.code == 200) {
            if (res.data.length > 0) {
              this.getGoods();
              this.defulGood = res.data.map(val => Number(val.goods_id));
            }
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    searchRelation() {
      this.getGoods(this.classify_id, this.brand_id, this.serchTitle);
    },
    getClsss() {
      goods_class_more({ page: 1, limit: 10000, pid: 0 }).then(res => {
        this.classOnes = res.data.data;
      });
      brand_more({ page: 1, limit: 10000 }).then(res => {
        this.classTwos = res.data.data;
      });
    },
    getGoods(classify_id, brand_id, serchTitle) {
      goods_more({
        page: 1,
        limit: 1000000,
        classify_id: classify_id,
        brand_id: brand_id,
        title: serchTitle
      }).then(res => {
        
        if (res.data.data.length > 0) {
          res.data.data.forEach(val => {
            this.selectGood.push({
              key: val.id,
              label: val.title
            });
          });
        }else{
           this.selectGood=[]
        }
      });
    }
  }
};
</script>
<style >

.transfer .el-transfer-panel{
      width: 400px;
}
</style>
  
 