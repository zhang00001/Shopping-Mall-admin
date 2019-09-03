<template>
  <el-container>
    <el-header>
      <navbar :info="name"></navbar>
    </el-header>
    <el-container style="    padding-top: 70px;
    position: relative;
    height: 100vh; ">
       
   <sidebar class="sidebar-container" :isCollapse="isCollapse"></sidebar>
     
   
      <el-container>
        <el-main  >
          <div class="top"  >
            <i :class="icon" @click="changeSidebar"></i>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="(item,index)  in levelList"
                :key="item.path"
                v-if="item.meta.title"
                :to="item.redirect||item.path"
              >{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <app-main   ></app-main>
              <!-- <i class='el-icon-arrow-up' @click="backTop" style="      position: absolute;
    bottom: 20vh;
    right: 100px;
    font-size: 24px;
    color: rgb(48, 194, 166);
    border: 1px solid;
    border-radius: 50%;
    padding: 5px;"></i> -->
        </el-main>
      
      </el-container>
    </el-container>

  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import http from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
 


  computed: {},
  data() {
    return {
      routers: [],
      name: "",
      btn: [],
      levelList: null,
      icon: "el-icon-s-fold",
      isCollapse: false
    };
  },
  created() {
    this.getBreadcrumb();
 
    this.name =sessionStorage.getItem('username') ;
  
  },

  watch: {
    $route() {
      this.getBreadcrumb();
    }},
    methods: {
     

 
      changeSidebar() {
        if (this.isCollapse) {
          this.isCollapse = false;
          this.icon = "el-icon-s-unfold";
        } else {
          this.isCollapse = true;
          this.icon = "el-icon-s-fold";
        }
      },
      getBreadcrumb() {
      
        this.levelList = this.$route.matched.filter(item => item.meta.title);
    
      }
    }
 
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%; 
}
.el-header {
  height: 70px !important; 
    position: fixed;
    top: 0;
    width: 100vw;  z-index: 999;
}
.top {
  display: flex;
  font-size: 20px;
  align-items: center;
  i {
    margin-right: 20px;
  }
}
</style>
