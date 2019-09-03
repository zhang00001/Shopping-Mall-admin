<template>
    <div>
        
<el-row :gutter="20" style="margin-top:8%;">
  <el-col :span="10">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
  <el-form-item label="最小提现金额" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="最大提现金额" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="提现周期" prop="name">
       每月
    <el-input v-model="ruleForm.name" style="width:90%;"></el-input> 次
  </el-form-item>
   <el-form-item label="提现时间" prop="name">
       按现处理时间
    <el-input v-model="ruleForm.name" style="width:60%;"></el-input> 个工作日进行处理
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </el-col> 
  <el-col :span="10" :offset="2">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>提现须知</span>
  
  </div>
  <div  class="text item">
    <p>1.单笔提现最低100元，最高3万元；</p>
      <p>2.单笔提现需扣除6%手续费；</p>
        <p>3.每月最多可提现5次；</p>
          <p>4.每月最多累积提现15万元；</p>
            <p>5.申请提现后，处理时间为9点-15点，工作日当天15：00之前的提现，最快2小时到账（节假日顺延）；</p>
              <p>6.绑定的银行卡仅支持大陆地区，其他地区暂不支持；</p>
            
  </div>
</el-card>
  </el-col></el-row>
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
            { required: true, message: '最小提现金额', trigger: 'blur' },
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
<style scoped>
  .text {
    font-size: 14px;
  }

  .item  p{
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>