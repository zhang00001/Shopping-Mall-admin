<template>
  <div>
 
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="申请时间" >
        
             <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
               
          </template>
      

      </el-table-column>
      <el-table-column prop="order_sn" label="订单号" width="300"></el-table-column>
      
           <el-table-column prop="mobile" label="手机号" ></el-table-column>
              <el-table-column prop="nick" label="昵称"  ></el-table-column>
   <el-table-column prop="pay_type" label="支付方式" ></el-table-column>



                
       <el-table-column prop="money_huokuan" label="货款" width="80"></el-table-column>
        <el-table-column prop="money_yajing" label="押金" width="80"></el-table-column>
        <el-table-column prop="status_name" label="状态" width="80">

 
        </el-table-column>
          <el-table-column prop="msg" label="信息"></el-table-column>
             
              <el-table-column label="操作">
 <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
  
      </template>

              </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>
<script>
import { order_vip_more } from "@/api/index";
export default {
  data() {
    return {
      selectStatus: "1",
      tableData: [{
          id:46
      }],
      total: 0
    };
  },
  created() {
    this.getOrder(1);
  },
  methods: {
    handleCurrentChange(e) {
      this.getOrder(e);
    },
   handleClick(e){
      
  this.$router.push({ path: "vip/detail", query: { id: e.id } });
     
      
  
   },
    getOrder(page) {
      order_vip_more({ page: page, limit: 10}).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>