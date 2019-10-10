<template>
  <div>
    <div class="top">
      <!-- <div class="demo-input-suffix searchInput">
        <span>名称：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="serchTitle"
          style="width:200px;"
        ></el-input>
      </div>-->
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
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="position" label="位置">
          <template slot-scope="scope">
            <template v-if="scope.row.position==-3">积分商城</template>
            <template v-if="scope.row.position==118">男装</template>
            <template v-if="scope.row.position==98">女装</template>
            <template v-if="scope.row.position==145">童装</template>
            <template v-if="scope.row.position==2">推荐</template>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <template v-if="scope.row.img">
              <img :src="scope.row.img" alt style="width:30px;height:30px;" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="链接类型" width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.type=='1'">商品</template>
            <template v-if="scope.row.type=='2'">专题</template>
            <template v-if="scope.row.type=='3'">链接地址</template>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <template v-if="scope.row.status==1">正常</template>
            <template v-else>否</template>
          </template>
        </el-table-column>-->

        <el-table-column label="操作" width="100">
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
        <el-form :model="form" ref="form" :rules="rules" label-width="auto">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="位置" prop="position">
                <el-select v-model="form.position" placeholder="请选择">
                  <el-option label="首页推荐" value="2"></el-option>

                  <el-option
                    v-for="(item,index) in position"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  <el-option label="积分商城" value="-3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="排序" prop="position">
                <el-input v-model="form.order"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="链接类型" prop="position">
                <el-select v-model="form.type" placeholder="请选择" @change="changeSpa">
                  <el-option label="专题页" value="2"></el-option>
                  <el-option label="商品" value="1"></el-option>
                  <el-option label="链接地址" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :http-request="uploadFile"
              action
              :show-file-list="false"
              :file-list="fileLists"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:710px;height:272px;" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <template v-if="form.type=='3'">
            <el-form-item label="链接地址">
              <el-input v-model="form.url_id"></el-input>
            </el-form-item>
          </template>
        </el-form>
        <AddGoods
          v-if="form.type=='1'"
          :status="'Vip'"
          :spGood="spGood"
          ref="headerChild"
          :goodcounts2="goodcounts2"
        ></AddGoods>
        <Addspecial v-if="form.type=='2'" ref="Addspecial" :spGood="spGood"></Addspecial>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import AddGoods from "@/components//AddGoods";
import Addspecial from "@/components/Addspecial";
import {
  banner_more,
  banner_manage,
  banner_one,
  banner_del,
  classify
} from "@/api/index";
import { POSITION } from "@/utils/enums";
import axios from "axios";
export default {
  components: {
    AddGoods,
    Addspecial
  },
  data() {
    return {
      spGood: [],
      goodcounts2: [],
      isDisable: true,
      serchTitle: "",
      tableData: [],
      tableData2: [],
      multipleSelection: [],
      total: 0,
      total2: 0,
      title: "新增",
      fileLists: [],
      imageUrl: "",
      imageUrl2: "",
      showClass2: false,
      form: {
        name: "",
        img: "",
        url_id: "",
        position: "",
        order: "",
        type: "1" //链接类型
      },
      position: [],
      selectId: "",
      rules: {
        name: [{ required: true, message: "必填字段", trigger: "blur" }],
        order: [{ required: true, message: "必填字段", trigger: "blur" }],
        url: [{ required: true, message: "必填字段", trigger: "blur" }],
        position: [{ required: true, message: "必填字段", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getList(1, this.serchTitle);
    this.position = POSITION;
    classify({}).then(res => {
      this.position = res.data;
    });
  },
  methods: {
    changeSpa() {
      this.spGood = [];
      banner_one({ id: this.form.id }).then(res => {
        if (res.code == 200) {
          this.$nextTick(() => {
            if (this.form.type == res.data.type) {
              this.spGood[0] = res.data.info;
            }
            if (this.form.type == res.data.type) {
              this.spGood[0] = res.data.info;
            }
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    add() {
      this.title = "新增Banner";

      this.cel();
      this.form.id = "";
      this.dialogFormVisible = true;
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
          banner_del({ id: e.id }).then(res => {
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
      if (this.form.name) {
        this.$refs["form"].resetFields();
      }
    },
    // 加载列表
    getList(page) {
      banner_more({
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
        banner_one({ id: e.id }).then(res => {
          if (res.code == 200) {
            this.title = "编辑";

            this.$nextTick(() => {
              this.imageUrl = res.data.img;

              this.form = {
                id: e.id,
                order: e.order,
                name: res.data.name,
                position: res.data.position.toString(),
                type: res.data.type.toString(),
                url_id: res.data.url_id
              };

              if (this.form.type == "1") {
                this.spGood[0] = res.data.info;
              }
              if (this.form.type == "2") {
                this.spGood[0] = res.data.info;
              }
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

          this.form.logo = /(http|https):\/\/([\w.]+\/?)\S*/.test(
            this.form.logo
          )
            ? this.form.logo.split(this.form.logo.split("/upload")[0])[1]
            : this.form.logo;

          // 商品
          if (this.form.type == "1") {
            this.form.url_id = this.$refs.headerChild.goods
              .map(val => val.id)
              .toString();
          }
          // 专题
          if (this.form.type == "2") {
            this.form.url_id = this.$refs.Addspecial.goods
              .map(val => val.id)
              .toString();
          }
          // 链接地址
          if (this.form.type == "2") {
          }
          banner_manage(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
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