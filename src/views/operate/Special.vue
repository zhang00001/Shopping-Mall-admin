<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput">
        <span>专题标题：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchTitle"
          style="width:200px;"
        ></el-input>
      </div>

      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="add">添加</el-button>
      <!-- <el-button type="primary" @click="toggleSelection">{{allTitle}}</el-button>
      <el-button type="primary" @click="delAll" :disabled="isDisable">批量删除</el-button>-->
    </div>

    <template>
      <el-table
        :data="tableData"
        ref="recordTable"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="标题"></el-table-column>
        <el-table-column prop="classify_id" label="分类"></el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width:100px;height:100px;" />
          </template>
        </el-table-column>

        <el-table-column prop="addtime" label="发布时间">
          <template slot-scope="scope">
            <template v-if="scope.row.addtime">{{scope.row.addtime|formatDate}}</template>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="是否显示"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editGood(scope.row)" type="text" size="small">查看商品</el-button>
            <el-button @click="addGood(scope.row)" type="text" size="small">新增商品</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
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

      <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="form" ref="form" :rules="rules" label-width="auto">
          <el-form-item label="专题标题" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专题分类" prop="classify_id">
            <el-select v-model="form.classify_id" placeholder="请选择分类">
              <el-option
                v-for="item in moreClass"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="展示图片" prop="img" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :http-request="uploadFile"
              action
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="商品详情" :visible.sync="dialogFormVisible3">
         <div  class="dialog-footer">
          <el-button type="primary" @click="deleteGood" :disabled="isdel">删除</el-button>
        </div>
        <el-table :data="tableData2" border   v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
     @selection-change="handleSelectionChange2">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="编号" width="55"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
        </el-table>
          <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total2"
          @current-change="handleCurrentChange2"
        ></el-pagination>
      </div>
      </el-dialog>
      <el-dialog title="添加商品" :visible.sync="dialogFormVisible2" >
        <SelectGoods :Id="selectId" :status="'sp'" ref="headerChild" v-if="dialogFormVisible2"  ></SelectGoods>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveGood">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import SelectGoods from "@/components/SelectGoods";
import http from "@/utils/request";
import { POSITION } from "@/utils/enums";
import {
  special_more,
  goods_class_more,
  special_one,
  special_manage,
  special_del,
  special_goods_join,
  special_goods_data,special_goods_del
} from "@/api/index";
import axios from "axios";
export default {
  components: {
    SelectGoods
  },
  data() {
    return {
      imageUrl: "",
      moreClass: [],
      isDisable: true,
      searchTitle: "",
      multipleSelection: [],
      isdel:true,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      supplier: "",
      tableData: [],
      tableData2: [],
      total: 0,
total2:0,
      title: "新增",
      fileLists: [],
      value: [],
loading:false,
      allTitle: "全选",
      selAll: false,
      form: {
        name: "",
        classify_id: "",
        img: ""
      },
multipleSelection2:{},
      rules: {
        name: [{ required: true, message: "必填字段", trigger: "blur" }],

        classify_id: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getList(1);
    this.getClass();
  },
  methods: {
    editGood(e) {
      this.selectId = e.id;
      this.dialogFormVisible3 = true;

      this.getspecial_goods_data(1);
    },
    addGood(e) {
      this.selectId = e.id;
      this.dialogFormVisible2 = true;
    },
    getspecial_goods_data(page) {
      this.loading=true
      special_goods_data({
        special_id: this.selectId,
        page: page,
        limit: 10
      }).then(res => {
         this.loading=false
        this.tableData2 = res.data.data;
        this.total2=res.data.count
      });
    },
    saveGood() {
      let goods = this.$refs.headerChild.checkList.map(val => val.id);

      if (goods.length > 0) {
        special_goods_join({
          special_id: this.selectId,
          goods_id: goods.toString()
        }).then(res => {
          if (res.code == 200) {
            this.dialogFormVisible2 = false;
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    getClass() {
      goods_class_more({ page: 1, limit: 10000 }).then(res => {
        this.moreClass = res.data.data;
      });
    },
    add() {
      this.title = "添加专题";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.form.id = "";
      });
    },
    handleCurrentChange(e) {
      this.getList(e, this.searchTitle);
    },
    handleCurrentChange2(e){
 this.getspecial_goods_data(e);
    },
    search() {
      this.getList(1, this.searchTitle);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },
    handleSelectionChange2(val){
      
 this.multipleSelection2 = val;
  
      if (this.multipleSelection2.length > 0) {
        this.isdel = false;
      } else {
        this.isdel = true;
      }
    },
    deleteGood(){
special_goods_del({id: this.multipleSelection2.map(val=>val.id).toString()}).then(res=>{
  if(res.code==200){
    this.$message.success(res.msg)
     this.getspecial_goods_data(1);

  }else{
     this.$message.error(res.msg)
  }
})
    },
    handleClose() {
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
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
            type: 3
          })
          .then(res => {
            if (res.code == 200) {
              this.getList(1, this.serchTitle);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {});
      });
    },

    handleChange(value) {
      console.log(value);
    },

    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          special_del({ id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList(1);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 加载列表
    getList(page) {
      special_more({
        page: page,
        limit: 10
      }).then(res => {
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
        special_one({ id: e.id }).then(res => {
          if (res.code == 200) {
            this.title = "编辑";
            this.imageUrl = res.data.img;
            this.$nextTick(() => {
              this.form = {
                id: e.id,
                name: res.data.name,
                classify_id: res.data.classify_id,
                img: res.data.img
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
          special_manage(this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);

              this.dialogFormVisible = false;
              this.getList(1);

              this.$refs["form"].resetFields();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    // 上传图片

    uploadFile(item) {
      const formdata = new FormData();
      formdata.append("upload_img", item.file);
      formdata.append("type", 6);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.data.http_image;
            this.$nextTick(() => {
              this.form.img = res.data.data.image;
            });
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
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
 