<template>
  <div>
    <div class="top">
      <!-- <div class="demo-input-suffix searchInput"> -->
      <!-- <span>名称：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="supplier"
          style="width:200px;"
        ></el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>-->
      <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
      <!-- <el-button type="primary" @click="toggleSelection">{{allTitle}}</el-button> -->
      <!-- <el-button type="primary" @click="delAll" :disabled="isDisable">批量删除</el-button> -->
    </div>

    <template>
      <el-table
        :data="tableData"
        border
        ref="recordTable"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="show" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.show" alt style="width:100px;height:100px" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="order" label="排序"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
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

      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        width="80%"
      >
        <el-form :model="form" ref="form" :rules="rules" label-width="auto">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="排序" prop="order">
            <el-input v-model="form.order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="show">
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
          <el-form-item label="图片">
            <div style="display: flex;">
              <template v-for="(item,index) in fileList">
                <div style="height:250px; margin-right:20px; " v-if="index<=5" :key="item.id">
                  <div>
                    <el-image
                      :src="item"
                      fit="cover"
                      style="width:200px;height:200px;  border-radius:15px; "
                    ></el-image>
                  </div>

                  <div style="margin-top:15px;">
                    <el-button style="padding: 10px;" v-if="index==0">商品主图</el-button>
                    <el-button style="padding: 10px;" v-else @click="setImg(item,index)">设为主图</el-button>
                    <el-button style="padding: 10px;" @click="delProductImg(item,index)">删除图片</el-button>
                  </div>
                </div>
              </template>

              <template v-if="fileList.length<5">
                <el-upload
                  class="avatar-uploader"
                  :http-request="uploadFile2"
                  action
                  multiple
                  :show-file-list="false"
                  :file-list="fileLists"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </template>
            </div>
          </el-form-item>
        </el-form>
        <div>
          <Editor ref="editor" :content="data"></Editor>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import AddGoods from "@/components/AddGoods";
import {
  package_manage,
  package_more,
  package_del,
  goods_more,
  package_one,
  goods_class_more,
  brand_more
} from "@/api/index";
import axios from "axios";
import Editor from "@/components/Editor";
export default {
  components: {
    AddGoods,
    Editor
  },
  data() {
    return {
      data: "",
      SelectIndex: 1,
      serchTitle: "",
      imageUrl: "",
      data: [],
      fileList: [],
      goodcounts2: [],
      isDisable: true,
      multipleSelection: [],
      multipleSelection2: [],
      allTitle: "全选",
      selAll: false,
      supplier: "",
      tableData: [],
      tableData2: [],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      classOnes: [],
      classTwos: [],
      classify_id: "",
      brand_id: "",
      form: {
        title: "",
        price: "",
        order: "",
        show: "",
        detail: "",
        img: []
      },

      rules: {
        title: [{ required: true, message: "必填字段", trigger: "blur" }],

        price: [{ required: true, message: "必填字段", trigger: "blur" }],
        order: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getList(this.SelectIndex, this.supplier);

    this.getClss();
  },
  methods: {
    uploadFile2(item) {
      const formdata = new FormData();
      formdata.append("upload_img", item.file);
      formdata.append("type", 1);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {
            console.log(this.fileList.length);
            if (this.fileList.length < 5) {
              this.fileList.push(res.data.data.http_image);
            } else {
            }
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
    // 设为主图
    setImg(item, index) {
      this.showFile = false;
      let selectImg = this.fileList[0];
      this.fileList[0] = item;
      this.fileList[index] = selectImg;
      this.showFile = true;
    },
    delProductImg(item, index) {
      this.$confirm("是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.fileList.splice(index, 1);
        })
        .catch(() => {});
    },
    searchRelation() {
      this.getGoods(this.classify_id, this.brand_id, this.serchTitle);
    },
    getClss() {
      goods_class_more({ page: 1, limit: 10000, pid: 0 }).then(res => {
        this.classOnes = res.data.data;
      });
      brand_more({ page: 1, limit: 10000 }).then(res => {
        this.classTwos = res.data.data;
      });
    },
    getGoods(classify_id, brand_id, serchTitle) {
      goods_more({
        page: 1,
        limit: 1000000,
        classify_id: classify_id,
        brand_id: brand_id,
        title: serchTitle
      }).then(res => {
        if (res.data.data.length > 0) {
          res.data.data.forEach(val => {
            this.data.push({
              key: val.id,
              label: val.title
            });
          });
        }
      });
    },
    handleCurrentChange(e) {
      this.SelectIndex = e;
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
      this.getList(this.SelectIndex, this.supplier);
    },

    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          package_del({ id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList(this.SelectIndex, this.supplier);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 加载列表
    getList(page) {
      package_more({
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
        package_one({ id: e.id }).then(res => {
          if (res.code == 200) {
            this.title = "编辑";

            this.$store.commit("set_selectGood", res.data.goods_id);
            this.$nextTick(() => {
              this.form = {
                id: e.id,
                title: res.data.title,
                price: res.data.price,
                order: res.data.order,
                detail: res.data.detail,
                show: res.data.show
              };
              this.data = res.data.detail;
              this.fileList = res.data.imgs ? res.data.imgs : [];
              this.fileList[0] = res.detail.img;
              (this.imageUrl = res.data.show), (this.data = res.data.detail);
            });
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    uploadFile(item) {
      const formdata = new FormData();
      formdata.append("upload_img", item.file);
      formdata.append("type", 5);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.data.http_image;
            this.$nextTick(() => {
              this.form.show = res.data.data.image;
            });
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
    // 新增。编辑保存
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$nextTick(() => {
            this.form.detail = this.$refs.editor.content;
            let imgs = [];
            this.fileList.forEach(val => {
              if (/(http|https):\/\/([\w.]+\/?)\S*/.test(val)) {
                imgs.push(val.split(val.split("/upload")[0])[1]);
              } else {
                imgs.push(val);
              }
            }),
              (this.form.img = JSON.stringify(imgs));
            package_manage(this.form).then(res => {
              if (res.code == 200) {
                this.$message.success(res.msg);

                this.getList(this.SelectIndex, this.supplier);
                this.clearData();
              } else {
                this.$message.error(res.msg);
              }
            });
          });
        }
      });
    },
    clearData() {
      this.data = "";
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
      (this.fileList = []), (this.imageUrl = "");
    }
    // toggleSelection() {
    //   if (this.selAll) {
    //     this.selAll = false;
    //     this.allTitle = "全选";
    //     this.tableData.forEach(row => {
    //       this.$refs.recordTable.toggleRowSelection(row, false);
    //     });
    //   } else {
    //     this.allTitle = "取消全选";
    //     this.tableData.forEach(row => {
    //       this.$refs.recordTable.toggleRowSelection(row, true);
    //     });
    //     this.selAll = true;
    //   }
    // },
    //   批量删除
    // delAll() {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     http
    //       .post("admin/goods/batch_del", {
    //         id: this.multipleSelection.map(val => val.id).toString(),
    //         type: 2
    //       })
    //       .then(res => {
    //         if (res.code == 200) {
    //           this.getList(this.SelectIndex, this.supplier);
    //         } else {
    //           this.$message.error(res.msg);
    //         }
    //       })
    //       .catch(() => {});
    //   });
    // },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
 