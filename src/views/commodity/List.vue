<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix" style="width:100%">
        <el-row style="margin-bottom:10px;">
          <el-col :span="6">
            <span>商品</span>

            <el-input
              placeholder="商品名称/货号/商品Id"
              prefix-icon="el-icon-search"
              v-model="searchTitle"
              style="width:200px;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span>商品分类</span>

            <el-select v-model="classify_id" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option v-for="item in classs" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>商品类型</span>

            <el-select v-model="type" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="试衣间商品" value="1"></el-option>
              <el-option label="品牌商品" value="2"></el-option>
              <el-option label="积分商品" value="3"></el-option>
              <el-option label="特价商品" value="4"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>商品品牌</span>
            <el-select v-model="brand_id" placeholder="请选择" clearable>
              <el-option v-for="item in brands" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>上下架</span>

            <el-select v-model="shelf" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-col>

          <el-col :span="6">
            <span>仓库</span>

            <el-select v-model="warehouse_id" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in warehouses"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>供货商</span>

            <el-select v-model="supplier_id" placeholder="请选择" clearable>
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in suppliers"
                :key="item.id"
                :label="item.supplier"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="Add">新增</el-button>
            <el-button type="primary" @click="toggleSelection">{{allTitle}}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <template>
      <el-table
        :data="tableData"
        border
        ref="recordTable"
        :show-overflow-tooltip="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="title" label="名称" width="300"></el-table-column>
        <el-table-column prop="supplier" label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width:50px;height:50px" />
          </template>
        </el-table-column>
        <el-table-column prop="number" label="货号"></el-table-column>
        <el-table-column prop="goods_id" label="商品ID"></el-table-column>
        <el-table-column prop="integral" label="赠送积分"></el-table-column>
        <el-table-column prop="sales_volume" label="销量"></el-table-column>
        <!-- <el-table-column prop="supplier" label="排序"></el-table-column> -->
        <el-table-column prop="shelf" label="上架">
          <template slot-scope="scope">
            <template v-if="scope.row.shelf==0">下架</template>
            <template v-else>上架</template>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-select v-model="value" :disabled="isDisable" placeholder="批量操作">
          <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button
          style="    margin-left: 20px;"
          type="primary"
          @click="delAll"
          :disabled="isDisable"
        >确定</el-button>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
      options: [
        {
          value: "0",
          label: "批量下架"
        },
        {
          value: "1",
          label: "批量上架"
        },
        {
          value: "2",
          label: "批量删除"
        },
        {
          value: "3",
          label: "关闭积分赠送"
        }
      ],
      value: "",
      isDisable: true,
      multipleSelection: [],
      allTitle: "全选",
      selAll: false,
      supplier: "",
      tableData: [],
      supplier_id: "",
      warehouse_id: "",
      shelf: "",
      brand_id: "",
      type: "",
      classify_id: "",
      searchTitle: "",
      classs: [],
      brands: [],
      warehouses: [],
      suppliers: [],
      total: 0,
      page: 1,
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
  watch: {},
  created() {
    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page);
    }
    this.getList(
      this.page,
      this.searchTitle,
      this.classify_id,
      this.type,
      this.brand_id,
      this.shelf,
      this.warehouse_id,
      this.supplier_id
    );

    this.geSelectData();
  },
  methods: {
    handleCurrentChange(e) {
      this.page = e;
      this.getList(
        this.page,
        this.searchTitle,
        this.classify_id,
        this.type,
        this.brand_id,
        this.shelf,
        this.warehouse_id,
        this.supplier_id
      );
    },
    Add() {
      this.$router.push({ path: "add", query: { page: this.page } });
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
      this.getList(
        this.page,
        this.searchTitle,
        this.classify_id,
        this.type,
        this.brand_id,
        this.shelf,
        this.warehouse_id,
        this.supplier_id
      );
    },
    geSelectData() {
      http
        .post("admin/goods/goods_class_more", { page: 1, limit: 10000 })
        .then(res => {
          this.classs = res.data.data;
        });
      http
        .post("admin/goods/brand_more", { page: 1, limit: 10000 })
        .then(res => {
          this.brands = res.data.data;
        });
      http
        .post("admin/goods/warehouse_more", { page: 1, limit: 10000 })
        .then(res => {
          this.warehouses = res.data.data;
        });
      http
        .post("admin/goods/supplier_more", { page: 1, limit: 10000 })
        .then(res => {
          this.suppliers = res.data.data;
        });
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
      let msg;
      let url;
      let data;
      if (this.value == 0) {
        msg = "是否批量下架";
        (url = "admin/goods/goods_batch_shelf"),
          (data = {
            id: this.multipleSelection.map(val => val.id).toString(),
            shelf: 0
          });
      }
      if (this.value == 1) {
        msg = "是否批量上架";
        url = "admin/goods/goods_batch_shelf";
        data = {
          id: this.multipleSelection.map(val => val.id).toString(),
          shelf: 1
        };
      }
      if (this.value == 2) {
        msg = "是否批量删除";
        url = "admin/goods/goods_batch_del";
        data = {
          id: this.multipleSelection.map(val => val.id).toString()
        };
      }
      if (this.value == 3) {
        msg = "是否批量关闭积分赠送";
        url = "admin/goods/goods_integral_status";
        data = {
          id: this.multipleSelection.map(val => val.id).toString(),
          status: 0
        };
      }

      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http
          .post(url, data)
          .then(res => {
            if (res.code == 200) {
              this.getList(
                this.page,
                this.searchTitle,
                this.classify_id,
                this.type,
                this.brand_id,
                this.shelf,
                this.warehouse_id,
                this.supplier_id
              );
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
          http.post("admin/goods/goods_del", { id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList(
                this.page,
                this.searchTitle,
                this.classify_id,
                this.type,
                this.brand_id,
                this.shelf,
                this.warehouse_id,
                this.supplier_id
              );
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 加载列表
    getList(
      page,
      title,
      classify_id,
      type,
      brand_id,
      shelf,
      warehouse_id,
      supplier_id
    ) {
      http
        .post("admin/goods/goods_more", {
          page: page,
          limit: 10,
          title: title,
          classify_id: classify_id,
          type: type,
          brand_id: brand_id,
          shelf: shelf,
          warehouse_id: warehouse_id,
          supplier_id: supplier_id,
          del_goods_id: ""
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
      this.$router.push({ path: "edit", query: { id: e.id, page: this.page } });
      // http.post("admin/goods/goods_one", { id: e.id }).then(res => {
      //   if (res.code == 200) {
      //    sessionStorage.setItem("edit",JSON.stringify(res.detail))

      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // });
    },
    // 新增。编辑保存
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          http.post("admin/goods/supplier_manage", this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);

              this.dialogFormVisible = false;
              this.getList(
                this.page,
                this.searchTitle,
                this.classify_id,
                this.type,
                this.brand_id,
                this.shelf,
                this.warehouse_id,
                this.supplier_id
              );

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
.block {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
</style>
 