<template>
  <div style="width:600px;margin:0 auto;margin-top:50px;">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="password_old">
        <el-input v-model="ruleForm.password_old" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password_new">
        <el-input v-model="ruleForm.password_new" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_new_re">
        <el-input v-model="ruleForm.password_new_re" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from "@/utils/request";
import { account_set } from "@/api/index";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password_old: "",
        password_new: "",
        password_new_re: ""
      },
      rules: {
        username: [{ required: true, message: "必填字段", trigger: "blur" }],
        password_old: [
          { required: true, message: "必填字段", trigger: "blur" }
        ],
        password_new: [
          { required: true, message: "必填字段", trigger: "blur" }
        ],
        password_new_re: [
          { required: true, message: "必填字段", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          account_set(this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$alert("密码修改成功，请重新登录", {
                confirmButtonText: "确定"
              })
                .then(() => {
                  sessionStorage.clear();
                  this.$router.push({ path: "/login" });
                })
                .catch(() => {});
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>