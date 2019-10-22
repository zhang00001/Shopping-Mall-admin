<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput" style="width:100%">
        <el-row style="margin-bottom:10px;width: 100%;">
          <el-col :span="7">
            <span>商品名称</span>

            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchTitle"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="7">
            <span>商品分类</span>

            <el-select v-model="classify_id" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option v-for="item in classs" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <span>商品类型</span>

            <el-select v-model="type" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="试衣间商品" value="1"></el-option>
              <el-option label="品牌商品" value="2"></el-option>
              <el-option label="积分商品" value="3"></el-option>
              <el-option label="特价商品" value="4"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- <el-button type="primary" @click="dialogFormVisible = true">添加</el-button> -->
    </div>

    <template>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="mobile" label="用户账户"></el-table-column>
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <el-table-column prop="msg" label="评价内容"></el-table-column>
        <el-table-column prop="addtime" label="评论时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="see(scope.row)" type="text" size="small">查看订单</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">隐藏</el-button>
            <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="供货商" :label-width="formLabelWidth" prop="supplier">
            <el-input v-model="form.supplier" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import axios from "axios";
export default {
  data() {
    return {
      supplier: "",
      tableData: [],
      classs: [],
      classify_id: "",
      type: "",
      searchTitle: "",
      total: 0,

      title: "新增",
      fileLists: [],

      form: {
        mobile: "",
        name: "",
        supplier: ""
      },
      SelectIndex: 1,
      rules: {
        mobile: [{ required: true, message: "必填字段", trigger: "blur" }],

        name: [{ required: true, message: "必填字段", trigger: "blur" }],
        supplier: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getList(1, this.searchTitle, this.type, this.classify_id);
    this.getSelect();
  },
  methods: {
    getSelect() {
      http
        .post("admin/goods/goods_class_more", { page: 1, limit: 10000 })
        .then(res => {
          this.classs = res.data.data;
        });
    },
    handleCurrentChange(e) {
      this.SelectIndex = e;
      this.getList(e, this.searchTitle, this.type, this.classify_id);
    },
    search() {
      this.getList(1, this.searchTitle, this.type, this.classify_id);
    },
    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.post("admin/goods/evaluate_del", { id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList(1, this.supplier);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 加载列表
    getList(page, title, goods_type, classify_id) {
      http
        .post("admin/goods/evaluate_more", {
          page: page,
          limit: 10,
          title: title,
          goods_type: goods_type,
          classify_id: classify_id
        })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.count;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    see(e) {
      this.$router.push({
        path: "/order/index2/detail2",
        query: { id: e.order_id }
      });
    },
    // 编辑回显
    edit(e) {
      http.post("/admin/goods/evaluate_show", { id: e.id }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 新增。编辑保存
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          http.post("admin/goods/supplier_manage", this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);

              this.dialogFormVisible = false;
              this.getList(this.SelectIndex, this.supplier);
              this.$refs["form"].resetFields();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.top {
  margin: 20px 0;
  display: flex;
}
.searchInput {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
</style>
 