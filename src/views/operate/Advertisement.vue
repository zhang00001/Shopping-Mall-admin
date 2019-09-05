<template>
  <div>
    <div class="top">
      <div class="demo-input-suffix searchInput">
        <span>广告名称：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="serchTitle"
          style="width:200px;"
        ></el-input>
      </div>
      <el-button type="primary" @click="add">添加</el-button>
      <!-- <el-button type="primary" :disabled="isDisable" @click="delAll">批量删除</el-button>
      <el-button type="primary" :disabled="isDisable" @click="closeAll(0)">批量关闭</el-button>
      <el-button type="primary" :disabled="isDisable" @click="closeAll(1)">批量开启</el-button>-->
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
        <el-table-column prop="name" label="广告名称" width="180"></el-table-column>
        <el-table-column prop="position" label="广告位置" width="180"></el-table-column>
        <el-table-column prop="order" label="排序" width="180"></el-table-column>
        <el-table-column prop="icon" label="广告图片" width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.icon">
              <img :src="scope.row.icon" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>

        <el-table-column prop="show" label="状态">
          <template slot-scope="scope">
            <template v-if="scope.row.show==1">正常</template>
            <template v-else>否</template>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="editGood(scope.row)">管理商品</el-button> -->
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
        <el-form :model="form" ref="form" :rules="rules" label-width="auto">
          <el-form-item label="广告名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="广告位置" prop="position">
            <el-select v-model="form.position" placeholder="请选择">
              <el-option
                v-for="item in position"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="排序" prop="order">
            <el-input v-model="form.order"></el-input>
          </el-form-item>
          <el-form-item label="广告图标">
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
          <el-button @click="cel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="管理商品" :visible.sync="dialogFormVisible2">
        <SelectGoods :Id='selectId'   :status="'ad'"  ref="headerChild" v-if="dialogFormVisible2"></SelectGoods>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveGood">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import { POSITION } from "@/utils/enums";
import {
  advertisement_more,
  advertisement_manage,
  advertisement_one,
  advertisement_del,advertisement_log
} from "@/api/index";
import axios from "axios";
import SelectGoods from "@/components/SelectGoods";
export default {
  components: {
    SelectGoods
  },
  data() {
    return {
      isDisable: true,
selectId:"",
serchTitle:"",
      tableData: [],
      tableData2: [],
      position: [],
      dialogFormVisible2: false,
      multipleSelection: [],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      imageUrl: "",
      imageUrl2: "",
      showClass2: false,
      form: {
        order: "",
        name: "",
        icon: "",
        position: ""
      },
     
      rules: {
        name: [{ required: true, message: "必填字段", trigger: "blur" }],

        position: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.position = POSITION;
    this.getList(1, this.serchTitle);
  },
  methods: {
    editGood(e) {
       this.selectId=e.id
  this.dialogFormVisible2=true
    },
    add() {
      this.dialogFormVisible = true;
      this.title = "新增广告";
      this.form.id = "";
    },
    saveGood(){
let goods= this.$refs.headerChild.defulGood
 
if(goods.length>0){
  advertisement_log({advertisement_id:this.selectId,goods_id:goods.toString()}).then(res=>{
   if(res.code==200){
     this.dialogFormVisible=false
   this.$message.success(res.msg)
   }else{
     this.$message.error(res.msg)
   }
  })
}
    },
    handleCurrentChange(e) {
      this.getList(e, this.serchTitle);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
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
          advertisement_del({ id: e.id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);

              this.getList(1);
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
    getList(page) {
      advertisement_more({
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
        advertisement_one({ id: e.id }).then(res => {
          if (res.code == 200) {
            this.title = "编辑";

            this.$nextTick(() => {
              this.imageUrl = res.data.icon;

              this.form = {
                id: e.id,

                order: res.data.order,
                name: res.data.name,
                icon: res.data.icon,
                position: res.data.position
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
          console.log(this.form);

          this.form.icon = /(http|https):\/\/([\w.]+\/?)\S*/.test(
            this.form.icon
          )
            ? this.form.icon.split(this.form.icon.split("/upload")[0])[1]
            : this.form.icon;

          advertisement_manage(this.form).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.imageUrl = "";
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
      formdata.append("type", 1);
      axios
        .post(process.env.BASE_API + "index/base/upload", formdata)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.imageUrl = res.data.data.http_image;
            this.$nextTick(() => {
              this.form.icon = res.data.data.image;
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