<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    background-color="#333858"
    text-color="#fff"
    active-text-color="#0BB9FF"
    style="height:100%;"
    :collapse="isCollapse"
    :unique-opened="true"
  >
    <template v-for="(items,key) in routers">
      <template v-if="items.meta.hidden==false">
        <template v-if="items.children.length>0">
          <el-submenu :index="items.path" :key="key">
            <template slot="title">
              <i :class="items.meta.icon"></i>
              <span>{{items.meta.title }}</span>
            </template>
            <el-menu-item-group>
              <template v-for="(item,key2) in items.children">
                <template v-if="item.meta.hidden==false">
                  <router-link :to="items.path+'/'+item.path" :key="key2">
                    <el-menu-item :index="items.path+'/'+item.path">
                      <i :class="item.meta.icon"></i>
                      <span slot="title">{{ item.meta.title }}</span>
                    </el-menu-item>
                  </router-link>
                </template>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <router-link :to="items.path" :key="key">
            <el-menu-item :index="items.path">
              <i :class="items.meta.icon"></i>
              <span slot="title">{{ items.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </template>
    </template>
  </el-menu>
</template>
      
      


<script>
import http from "@/utils/request";
export default {
  computed: {},
  data() {
    return {};
  },
  beforeCreate: function() {},
  created: function() {
    // this.routers = this.$router.options.routes;

    let power = sessionStorage.getItem("power");

    switch (power) {
      case "0":
        this.routers = this.$router.options.routes;
        break;
      case "1":
        this.routers = this.$router.options.routes.filter(
          val => val.path == "/commodity" || val.path == "/home"
        );
        break;
      case "2":
        this.routers = this.$router.options.routes.filter(
          val => val.path == "/order" || val.path == "/home"
        );
        break;
      case "3":
        this.routers = this.$router.options.routes.filter(
          val => val.path == "/member" || val.path == "/home"
        );
        break;
      case "4":
        this.routers = this.$router.options.routes.filter(
          val => val.path == "/operate" || val.path == "/home"
        );
        break;
      default:
        this.routers = this.$router.options.routes.filter(
          val => val.path == "/home"
        );
    }
  },
  props: ["isCollapse"],
  methods: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" >
.el-menu-item i,
.el-submenu__title i {
  color: #fff;
}
</style>
<style  >
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  height: 100vh;
}
.el-menu-vertical-demo {
  height: 100vh;
}
</style>