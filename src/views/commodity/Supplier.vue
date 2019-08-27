<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput" >
        <span>供货商/联系人：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="supplier"
          style="width:200px;"
        ></el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
     <el-button type="primary" @click="toggleSelection">{{allTitle}}</el-button>
      <el-button type="primary" @click="delAll" :disabled="isDisable">批量删除</el-button>
    </div>

    <template>
      <el-table :data="tableData" border   ref='recordTable'  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" ></el-table-column>
        <el-table-column prop="supplier" label="名称" ></el-table-column>
        <el-table-column prop="name" label="联系人" ></el-table-column>
        <el-table-column prop="mobile" label="联系方式" ></el-table-column>
        <el-table-column prop="goods_num" label="商品数量" ></el-table-column>
        <el-table-column label="操作"  >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
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
          isDisable: true,
              multipleSelection: [], allTitle: "全选",
      selAll: false,
      supplier: "",
      tableData: [],

      total: 0,

      title: "新增",
      fileLists: [],

      form: {
        mobile: "",
        name: "",
        supplier: ""
      },

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
    this.getList(1, this.supplier);
  },
  methods: {
    handleCurrentChange(e){
 this.getList(e, this.supplier);
    },
       handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    handleClose() {
      
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
    },
    search() {
      this.getList(1, this.supplier);
    },
       toggleSelection() {
          
      if (this.selAll) {
        this.selAll = false;
        this.allTitle = "全选";
        this.tableData.forEach(row => {
          this.$refs.recordTable.toggleRowSelection(row, false);
        });
      } else {
        this.allTitle = "取消全选";
        this.tableData.forEach(row => {
          this.$refs.recordTable.toggleRowSelection(row, true);
        });
        this.selAll = true;
      }
    },
    //   批量删除
    delAll() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http
          .post("admin/goods/batch_del", {
            id: this.multipleSelection.map(val => val.id).toString(),
            type: 2
          })
          .then(res => {
            if (res.code == 200) {
              this.getList(1, this.supplier);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {});
      });
    },
    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.post("admin/goods/supplier_del", { id: e.id }).then(res => {
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
    getList(page, supplier) {
      http
        .post("admin/goods/supplier_more", {
          page: page,
          limit: 10,
          supplier: supplier
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
    // 编辑回显
    edit(e) {
      (this.dialogFormVisible = true),
        http.post("admin/goods/supplier_one", { id: e.id }).then(res => {
          if (res.code == 200) {
            this.title = "编辑";

            this.$nextTick(() => {
              this.form = {
                id: e.id,
                mobile: res.data.mobile,
                name: res.data.name,
                supplier: res.data.supplier
              };
            });
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
              this.getList(1, this.supplier);
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
  margin: 20px 0;    display: flex;
}
.searchInput{
    display: flex;align-items: center;    margin-right: 20px;
}
</style>
 