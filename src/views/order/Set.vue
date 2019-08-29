<template>
    <div style="margin-top:20px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="formSet">
  <el-form-item label="品牌/特价/积分订单超过" prop="name">
    <el-input v-model="ruleForm.name" style="width:400px;"></el-input> 
    <span class='labRight' >分，未付款，订单自动关闭</span>
  </el-form-item>
   <el-form-item label="试衣间订单超过" prop="name">
    <el-input v-model="ruleForm.name" style="width:400px;"></el-input> 
    <span class='labRight' >分，自动审核通过</span>
  </el-form-item>
  <el-form-item label="品牌/特价/积分订单超过" prop="name">
    <el-input v-model="ruleForm.name" style="width:400px;"></el-input> 
    <span class='labRight' >天，未收货，订单自动完成</span>
  </el-form-item>
  <el-form-item label="订单完成超过" prop="name">
    <el-input v-model="ruleForm.name" style="width:400px;"></el-input> 
    <span class='labRight' >天，自定结束交易，不能申请售后，不能评价</span>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
   
  </el-form-item>
</el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style    scoped>
    .labRight{
       margin-left:10px;color:#606266 
    }
    .formSet{
        width: 60%;
    margin: 0 auto;
    margin-top: 25vh;
    }
</style>
 