<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="add1">添加</el-button>
    </div>

    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="name" label="分类图标" width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.icon">
              <img :src="scope.row.icon" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="pid" label="级别">
          <template slot-scope="scope">
            <template v-if="scope.row.pid==0">一级</template>
          </template>
        </el-table-column>
        <el-table-column prop="goods_num" label="商品数量"></el-table-column>
        <el-table-column prop="show" label="是否显示">
          <template slot-scope="scope">
            <template v-if="scope.row.show==0">是</template>
            <template v-else>否</template>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column label="设置" width="200">
          <template slot-scope="scope">
            <el-button @click="subordinates(scope.row)" type="text" size="small">查看下级</el-button>
            <el-button type="text" size="small" @click="addClass(scope.row)">新增下级</el-button>
            <!-- <el-button type="text" size="small">转移商品</el-button> -->
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="设置" width="100">
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

      <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close='false'>
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="order">
            <el-input v-model="form.order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类图标" :label-width="formLabelWidth" prop="icon">
            <el-upload
              class="avatar-uploader"
              :http-request="uploadFile"
              action
              :show-file-list="false"
              :file-list="fileLists"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">图片尺寸为90*90比例，大小不能超过200kB,图片只能为jpg,png,gif格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="显示" :label-width="formLabelWidth" prop="show">
            <el-switch v-model="form.show"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 查看下级模态框 -->
      <el-dialog title="下级分类" :visible.sync="showClass2" :before-close="handleClose">
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="id" label="编号" width="180"></el-table-column>
          <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
 <el-table-column prop="name" label="分类图标" width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.icon">
              <img :src="scope.row.icon" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>
          <el-table-column prop="pid" label="级别">
            <template slot-scope="scope">
              <template v-if="scope.row.pid">二级</template>
            </template>
          </el-table-column>
          <el-table-column prop="goods_num" label="商品数量"></el-table-column>
          <el-table-column prop="show" label="是否显示">
            <template slot-scope="scope">
              <template v-if="scope.row.show==0">是</template>
              <template v-else>否</template>
            </template>
          </el-table-column>
          <el-table-column prop="order" label="排序"></el-table-column>

          <el-table-column fixed="right" label="设置" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
         
        <div class="block">
          <el-pagination layout="prev, pager, next" :total="total2"   @current-change="handleCurrentChange2"></el-pagination>
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
      tableData: [],
      tableData2: [],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      imageUrl: "",
      showClass2: false,
      form: {
        name: "",
        pid: 0,
        icon: "",
        show: true,
        order: ""
      },
      selectId: "",
      rules: {
        name: [{ required: true, message: "必填字段", trigger: "blur" }],

        icon: [{ required: true, message: "请上传图片", trigger: "blur" }],
        order: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getList(1, 0);
  },
  methods: {
    handleCurrentChange(e) {
      this.getList(e, 0);
    },
    handleCurrentChange2(e){
   this.getList(e, this.selectId);
    },
    //  新增下级
    addClass(e) {
      this.title='新增下级'
 
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.form.pid = e.id;
        this.form.id=''
      });
    },
    // 新增一级
    add1() {
           this.title='新增分类';
      (this.dialogFormVisible = true), (this.selectId = "");
      this.$nextTick(()=>{
        this.form.id='',
         this.form.pid = 0;
      })
    },
    handleClose(done) {
      
          done();
          this.selectId = "";
       
    },
    //   查看下级
    subordinates(e) {
      this.showClass2 = true;
      this.getList(1, e.id);
      this.selectId = e.id;
    },
    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.post("admin/goods/goods_class_del", { id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              if (this.selectId) {
                this.getList(1, this.selectId);
              } else {
                this.getList(1, 0);
              }
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    cel() {
      this.imageUrl = "";
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 加载列表
    getList(page, pid) {
      http
        .post("admin/goods/goods_class_more", {
          page: page,
          limit: 10,
          pid: pid
        })
        .then(res => {
          if (res.code == 200) {
            if (pid == 0) {
              this.tableData = res.data.data;
              this.total = res.data.count;
            } else {
              this.tableData2 = res.data.data;
              this.total2 = res.data.count;
            }
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 编辑回显
    edit(e) {
      (this.dialogFormVisible = true),
        http.post("admin/goods/goods_class_one", { id: e.id }).then(res => {
          if (res.code == 200) {
            this.title = "编辑";

            this.$nextTick(() => {
              this.imageUrl = res.data.icon;
              this.form = {
                id: e.id,
                name: res.data.name,
                pid: res.data.pid,
                icon: res.data.icon,
                show:
                  res.data.show == 0
                    ? (res.data.show = true)
                    : (res.data.show = false),
                order: res.data.order
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
          this.form.show == true ? (this.form.show = 0) : (this.form.show = 1);
         if((/(http|https):\/\/([\w.]+\/?)\S*/).test(this.form.icon)){
       this.form.icon=    this.form.icon.split( this.form.icon.split("/upload")[0])[1]
         }
          http.post("admin/goods/goods_class_manage", this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.imageUrl = "";
              this.dialogFormVisible = false;
              if (this.selectId) {
                this.getList(1, this.selectId);
              } else {
                this.getList(1, 0);
              }
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
      formdata.append("type", 1);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {

            this.$message({

             
	message: res.data.msg,
	type: 'success',
	duration: 500
            });
            this.imageUrl = res.data.data.http_image;
            this.$nextTick(() => {
              this.form.icon = res.data.data.image;
            });
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
    beforeAvatarUpload(file) {
  
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG || isGIF || isPNG) {
        this.$message.error("上传头像图片只能是 jpg,png,gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200kB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.top {
  margin: 20px 0;
}
</style>
<style>
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