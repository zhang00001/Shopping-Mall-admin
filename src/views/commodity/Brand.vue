<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput">
        <span>品牌名称：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="serchTitle"
          style="width:200px;"
        ></el-input>
      </div>
        <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary" :disabled="isDisable" @click="delAll">批量删除</el-button>
      <el-button type="primary" :disabled="isDisable" @click="closeAll(0)">批量关闭</el-button>
      <el-button type="primary" :disabled="isDisable" @click="closeAll(1)">批量开启</el-button>
    </div>

    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="title" label="名称" width="180"></el-table-column>
        <el-table-column prop="logo" label="品牌LOGO" width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.logo">
              <img :src="scope.row.logo" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>
 
        <el-table-column prop="goods_num" label="商品数量"></el-table-column>
        <el-table-column prop="show" label="是否显示">
          <template slot-scope="scope">
            <template v-if="scope.row.show==1">是</template>
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
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>

      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="order">
            <el-input v-model="form.order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="品牌logo" :label-width="formLabelWidth" prop="logo">
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
            <el-form-item label="品牌封面图" :label-width="formLabelWidth" prop="logo">
            <el-upload
              class="avatar-uploader"
              :http-request="uploadFile2"
               
              action
              :show-file-list="false"
  
            
            >
              <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">图片尺寸为710*272比例，大小不能超过200kB,图片只能为jpg,png,gif格式</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="显示" :label-width="formLabelWidth" prop="show">
            <el-switch v-model="form.show"></el-switch>
          </el-form-item>
          <el-form-item label="是否品牌直供" :label-width="formLabelWidth" prop="supply">
            <el-switch v-model="form.supply"></el-switch>
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
          <el-table-column prop="pid" label="排序"></el-table-column>

          <el-table-column fixed="right" label="设置" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="delect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination layout="prev, pager, next" :total="total2"></el-pagination>
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
        isDisable:true,
        serchTitle:"",
      tableData: [],
      tableData2:[],
      multipleSelection:[],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      imageUrl: "",
      imageUrl2:"",
      showClass2:false,
      form: {
        title: "",
       img:'',
        logo: "",
        order:"",
        show: true,
        supply:true,
       
      },
      selectId:"",
      rules: {
        title: [{ required: true, message: "必填字段", trigger: "blur" }],

       
        order: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
   
    this.getList(1, this.serchTitle);
  },
  methods: {
    search(){
 this.getList(1, this.serchTitle);
    },
    add(){
     this.dialogFormVisible = true
     this.title='新增分类'
     this.form.id=''
    },
      handleCurrentChange(e){
       this.getList(e, this.serchTitle);
     },
        handleSelectionChange(val) {
            
        this.multipleSelection = val;
        if( this.multipleSelection.length>0){
            this.isDisable=false
        }else{
            this.isDisable=true 
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
          type: 1
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
    // 批量开启、关闭
    closeAll(e) {
    http
      .post("admin/goods/brand_show", {
        id: this.multipleSelection.map(val => val.id).toString(),
        show: e
      })
      .then(res => {
        if (res.code == 200) {
          this.getList(1, this.serchTitle);
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
  },

  handleClose(done) {
    this.$confirm("确认关闭？")
      .then(_ => {
        done();
        this.selectId = "";
      })
      .catch(_ => {});
  },
   
      //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.post("admin/goods/brand_del", { id: e.id }).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              if(this.selectId){
                this.getList(1,this.selectId);
              }else{
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
    this.imageUrl2 = "";
    this.dialogFormVisible = false;
    this.$refs["form"].resetFields();
  },
    // 加载列表
getList(page, title) {
    http
      .post("admin/goods/brand_more", {
        page: page,
        limit: 10,
        title: title
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
      http.post("admin/goods/brand_one", { id: e.id }).then(res => {
        if (res.code == 200) {
          this.title = "编辑";

          this.$nextTick(() => {
            this.imageUrl = res.data.logo;
            this.imageUrl2=res.data.img
            this.form = {
              id: e.id,

              title: res.data.title,
              order: res.data.order,
              logo: res.data.logo,
              img:res.data.img,
              show:
                res.data.show == 1
                  ? (res.data.show = true)
                  : (res.data.show = false),
              supply:
                res.data.supply == 1
                  ? (res.data.supply = true)
                  : (res.data.supply = false)
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
          console.log(this.form)
            this.form.show==true?this.form.show=1:this.form.show=0
            this.form.logo=(/(http|https):\/\/([\w.]+\/?)\S*/).test(this.form.logo)?this.form.logo.split(this.form.logo.split("/upload")[0])[1]:this.form.logo
         
         http.post("admin/goods/brand_manage", this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.imageUrl=''
              this.dialogFormVisible = false;
               if(this.selectId){
                this.getList(1,this.selectId);
              }else{
                 this.getList(1, 0);
              }
              this.$refs['form'].resetFields()
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
// 上传图片
    uploadFile2(item) {
      
      const formdata = new FormData();
      formdata.append("upload_img", item.file);
      formdata.append("type", 1);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.imageUrl2 = res.data.data.http_image;
            this.$nextTick(() => {
              this.form.img = res.data.data.image;
            });
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
       uploadFile(item) {
      
      const formdata = new FormData();
      formdata.append("upload_img", item.file);
      formdata.append("type", 1);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.data.http_image;
            this.$nextTick(() => {
              this.form.logo = res.data.data.image;
            });
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
    beforeAvatarUpload(file) {
       
        const isJPG = file.type === 'image/jpeg';
         const isPNG = file.type === 'image/png';
            const isGIF = file.type === 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG||isGIF||isPNG) {
          this.$message.error('上传头像图片只能是 jpg,png,gif 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 200kB!');
        }
        return isJPG && isLt2M;
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