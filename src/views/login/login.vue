<template>
  <div class="bg">
    <div class="con">
   
      <div class="card">
        <el-form
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
          label-width="80px"
        >
          <div style="text-align: center;    margin-bottom: 10%;">
           <p>试衣盒子后台管理</p>
          </div>

          <el-form-item prop="username" label="用户名">
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              autocomplete="on"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              name="password"
              :type="pwdType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              autocomplete="on"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

       
          <el-form-item style="margin-bottom: 60px">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="handleLogin"
              class="login"
            >立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
     
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
 
 

 
import http from "@/utils/request";
import { mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
  
    return {
      routers: [],
      name: "",
      btn: [],
 
      loginForm: {
        username: "",
        password: "",
       
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
       
      },
      loading: false,
      pwdType: "password",
     

      dialogVisible: false
    };
  },
  mounted() {
    
  },
  methods: {
    
     
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;

          http
            .post("/admin/base/login", {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            .then(res => {
              
              if (res.code == "200") {
               
                sessionStorage.token = res.data.token;
                sessionStorage.username=this.loginForm.username
                this.loading = false;
                 
                  this.$router.push({ path: "/home" });
                 
              } else {
                this.loading = false;
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },

    
  }
};
</script>

<style scoped  rel="stylesheet/scss" lang="scss" >
 

.card {
  /* padding: 240px; */
  width: 47vw;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 10px 0px rgba(251, 80, 88, 0.14);

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-title {
  text-align: center;
}
 
.con {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 84vh;

  margin: 0;
}
 
.bg {
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/bg@2x.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 22vw;
  
  background: $defulColor;
  font-size: 20px;
   
  border: none;
}
</style>
 
