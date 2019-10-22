 




<template>
  <div>
    <div>
      <el-radio-group v-model="selectStatus" style="margin-top:20px;" @change="changeSelect">
        <el-radio-button :label="item.id" v-for="item in adverts" :key="item.id">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="top">
      <div class="demo-input-suffix searchInput">
        <span>商品搜索：</span>

        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="title"
          style="width:200px;"
        ></el-input>
      </div>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="add">新增商品</el-button>
      <el-button type="primary" :disabled="isDisable" @click="delAll">批量删除</el-button>

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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="Id" width="55"></el-table-column>
        <!-- <el-table-column prop="id" label="货号" width="55"></el-table-column> -->
        <el-table-column prop="title" label="名称"></el-table-column>
        <!-- <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt style="width:100px;height:100px" />
          </template>
        </el-table-column>

        <el-table-column prop="order" label="排序"></el-table-column>-->

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button> -->
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

      <el-dialog title="管理商品" :visible.sync="dialogFormVisible">
        <SelectGoods
          :Id="selectId"
          :status="'ad'"
          :adId="selectStatus"
          ref="headerChild"
          v-if="dialogFormVisible"
          :Ishome="false"
          :isintegral="isintegral"
        ></SelectGoods>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveGood">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import http from "@/utils/request";
import SelectGoods from "@/components/SelectGoods";
import {
  package_manage,
  package_more,
  package_del,
  goods_more,
  package_one,
  goods_class_more,
  brand_more,
  advertisement_more,
  advertisement_log,
  advertisement_del_data,
  advertisement_log_data,
  special_goods_del
} from "@/api/index";
import axios from "axios";
export default {
  components: {
    SelectGoods
  },
  data() {
    return {
      isintegral: true,
      selectId: "",
      SelectIndex: 1,
      selectStatus: "",
      serchTitle: "",
      imageUrl: "",
      title: "",
      multipleSelection: [],
      adverts: [], //广告位

      isDisable: true,
      allTitle: "全选",

      supplier: "",
      tableData: [],

      total: 0,

      dialogFormVisible: false
    };
  },
  created() {
    this.getAdv();
  },
  methods: {
    delAll() {
      this.$confirm("确认删除选中商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        advertisement_del_data({
          id: this.multipleSelection.map(val => val.id).toString()
        })
          .then(res => {
            if (res.code == 200) {
              this.getList(1);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {});
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0) {
        this.isDisable = false;
      } else {
        this.isDisable = true;
      }
    },

    add() {
      this.dialogFormVisible = true;
      this.selectId = this.selectStatus;
    },
    saveGood() {
      let goods = this.$refs.headerChild.checkList.map(val => val.id);

      if (goods.length > 0) {
        advertisement_log({
          advertisement_id: this.selectStatus,
          goods_id: goods.toString(),
          classif_id: "-3"
        }).then(res => {
          if (res.code == 200) {
            this.dialogFormVisible = false;
            this.$message.success(res.msg);
            this.getList(1);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    changeSelect() {
      this.getList(1);
    },
    getAdv() {
      advertisement_more({ page: 1, limit: 100 }).then(res => {
        if (res.code == 200) {
          if (res.data.data.length > 0) {
            this.adverts = res.data.data.filter(val => val.position == 2);
            this.selectStatus = this.adverts.map(val => val.id)[0];
            this.getList(1);
          }
        }
      });
    },

    search() {
      this.getList(1, this.supplier);
    },

    //删除
    delect(e) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          advertisement_del_data({ id: e.id }).then(res => {
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
    handleCurrentChange(e) {
      this.SelectIndex = e;
      this.getList(e);
    },
    // 加载列表
    getList(page) {
      advertisement_log_data({
        page: page,
        limit: 10,
        classif_id: "-3",
        advertisement_id: this.selectStatus,
        title: this.title
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total = res.count;
        } else {
          this.$message.error(res.msg);
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
 