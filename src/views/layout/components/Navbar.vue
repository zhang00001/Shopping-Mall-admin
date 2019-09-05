<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="title">试衣盒子</div>
    <div
      style="     margin-left: auto;  display: flex;  justify-content: center;align-items: center;"
    >
     <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="false"></hamburger>
 
      <breadcrumb></breadcrumb> -->
   
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="require('@/assets/images/img@2x.png')" />
          <span>{{ info }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/home">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="ref_home">
        <a @click="refView()">
          <i class='el-icon-refresh-left'></i>
          <!-- <img :src="require('@/assets/images/ref.png')" alt /> -->
        </a>

        <router-link to="/home">
        <i class='el-icon-s-home'></i>
          <!-- <img :src="require('@/assets/images/home.png')" alt /> -->
        </router-link>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
 
 
 
 
import http from "@/utils/request"
export default {
  components: {
   
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  data() {
    return {
  
   
 
      name
    };
  },
  props: ["info"],
  created() {},
  methods: {
     toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$confirm("您确定要退出吗?", "退出管理平台", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {


            
   sessionStorage.clear();
          this.$router.push({ path: "/login" });
            
       
        })
        .catch(() => {});
    },
    refView() {
      location.reload();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ref_home {
  display: flex;
  align-content: center;
  margin-left: 20px;
  a {
    display: flex;
    align-content: center;
  }
  i {
    padding: 0 40px;
    border-left: 1px solid #fff;
    cursor: pointer;    color: #fff;font-size: 24px;
  }
}
.navbar {
      background: #30c2a6;
  height: 70px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  margin-left: -20px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;

    right: 35px;
    .avatar-wrapper {
      cursor: pointer;

      position: relative;
      display: flex;
      align-content: center;
      span {font-size: 20px;
    color: #fff;
        margin: 0 10px;
      }
      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 12px;
        font-size: 24px;
        color: #fff;
      }
    }
  }
}
.title {
  margin-left: 60px;
  width: 124px;

  font-size: 30px;
 
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 70px;

  
 
}
</style>

