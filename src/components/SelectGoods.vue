<template>
  <div>
    <div style="display:flex">
      <p style="margin-right:20px;">选择商品</p>
      <el-select v-model="classify_id" placeholder="一级分类" clearable @change='selectClass'>
        <el-option label="一级分类" value></el-option>
        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in classOnes"></el-option>
      </el-select>
      <el-select v-model="classify_id_two" placeholder="二级分类" clearable>
        <el-option label="二级分类" value></el-option>
        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in classTwos"></el-option>
      </el-select>
        <el-select v-model="brand_id" placeholder="全部品牌" clearable>
        <el-option label="品牌" value></el-option>
        <el-option :key="item.id" :label="item.title" :value="item.id" v-for="item in bands"></el-option>
      </el-select>
      
       <el-select v-model="type" placeholder="商品类型" clearable>
               <!-- <el-option label="全部" value="" ></el-option> -->
              <el-option label="试衣间商品" value="1"  :disabled="!Ishome||!Ishome2"   v-if='!isintegral'></el-option>
              <el-option label="品牌商品" value="2" :disabled="!Ishome&&Ishome2"  v-if='!isintegral' ></el-option>
              <el-option label="积分商品" value="3" :disabled="Ishome"  v-if='isintegral'></el-option>
                 <el-option label="积分商品" value="3"    v-if="status=='sp'"></el-option>
            <!-- <el-option label="特价商品" value="4" :disabled="!Ishome"></el-option> -->
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
        style="overflow:auto;height:300px;width:400px;    overflow-x: hidden;
    overflow-y: scroll;"
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
  special_goods_data,
} from "@/api/index";
export default {
  data() {
    return {
      loading: false,
      noMore: false,
      checkList: [],
      goodcounts: [],bands:[],
      classify_id: "",
      brand_id: "",
      serchTitle: "",
      classOnes: [],
      classTwos: [],
classify_id_two:"",type:"",
      goodcounts2: [],
      checkList2: [],
      page: 0
    };
  },
  props: ["Id", "status", "isintegral","adId","Ishome","Ishome2"],
  created() {
    this.getClsss();
 console.log(this.Ishome2)
 
    // 新商品
    this.getGoods1(1);
  },
  destroyed() {},
  methods: {
    selectClass(){
      this.classTwos=[]
        this.classify_id_two=''
        
        goods_class_more({
          page: 1,
          limit: 10000,
          pid: this.classify_id
        }).then(res => {
          if (res.code == 200) {
            this.classTwos = res.data.data;  
          } else {
            this.$message.error(res.msg);
          }
        });
      

   
    },
    add() {
      this.goodcounts2 = this.checkList;

      this.checkList = [];
    },
    remove() {
      this.checkList = [];
    },
    load() {
      this.page = this.page + 1;
     this.getGoods1( this.page, this.classify_id,this.classify_id_two, this.brand_id, this.serchTitle);
    },

    searchRelation() {
      this.getGoods1(1, this.classify_id,this.classify_id_two, this.brand_id, this.serchTitle);
    },
    getClsss() {
      goods_class_more({ page: 1, limit: 10000, pid: 0 }).then(res => {
        this.classOnes = res.data.data;
      });
      brand_more({ page: 1, limit: 10000 }).then(res => {
        this.bands = res.data.data;
      });
    },
    // 积分商城
    getGoods1(page, classify_id,classify_id_two, brand_id, serchTitle) {
         let parmas = {
        page: page,
        limit: 10,
        classify_id: classify_id,
        classify_id_two:classify_id_two,
        brand_id: brand_id,
        title: serchTitle,
        type:this.type,
        advertisement_id:this.adId,
      };
      if (this.isintegral) {
        parmas.type = 3;
      }else{
parmas.type = 0;
      }
      this.loading = true;
      goods_more(parmas).then(res => {
        
        this.loading = false;
          //  this.goodcounts = res.data.data;
          //  debugger
        if (res.data.data.length > 0) {
          if (page == 1) {
            this.goodcounts = res.data.data;
          } else {
            (this.noMore = false),
              (this.goodcounts = this.goodcounts.concat(res.data.data));
          }
        } else {
          if (page == 1) {
            this.noMore = true;
            this.goodcounts = [];
          } else {
            this.noMore = true;
          }
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
  
 