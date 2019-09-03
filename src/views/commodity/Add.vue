<template>
  <div class="con">
    <el-steps :active="active" style="margin-buttom:20px">
      <el-step v-if="isEdit" title="编辑商品信息" icon="el-icon-edit"></el-step>
      <el-step v-else title="填写商品信息" icon="el-icon-edit"></el-step>
      <el-step title="属性规格与图片" icon="el-icon-upload"></el-step>
      <el-step title="选择关联商品" icon="el-icon-picture"></el-step>
    </el-steps>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <template v-if="active==1">
        <div>
          <el-row :gutter="24">
            <el-col :span="2">基本信息</el-col>
            <el-col :span="22">
              <el-col :span="12">
                <el-form-item label="商品分类" prop="classify_id">
                  <el-col :span="8">
                    <el-select
                      v-model="ruleForm.classify_id"
                      placeholder="一级分类"
                      @change="loadClassTwo"
                    >
                      <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        v-for="item in classOnes"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="line" :span="1">-</el-col>
                  <el-col :span="8">
                    <el-select v-model="ruleForm.classify_id_two" placeholder="二级分类">
                      <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        v-for="item in classTwos"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品品牌" prop="brand_id">
                  <el-select v-model="ruleForm.brand_id" placeholder="请选择品牌">
                    <el-option
                      :key="item.id"
                      :label="item.title"
                      :value="item.id"
                      v-for="item in brands"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="商品类型" prop="type">
                  <el-radio v-model="ruleForm.type" label="1">试衣间商品</el-radio>
                  <el-radio v-model="ruleForm.type" label="2">品牌商品</el-radio>
                  <el-radio v-model="ruleForm.type" label="3">积分商品</el-radio>
                  <el-radio v-model="ruleForm.type" label="4">特价商品</el-radio>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="供货上架" prop="supplier_id">
                  <el-select v-model="ruleForm.supplier_id" placeholder="请选择供货商">
                    <el-option
                      :key="item.id"
                      :label="item.supplier"
                      :value="item.id"
                      v-for="item in suppliers"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品名称" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="商品简介" prop="synopsis">
                  <el-input type="textarea" v-model="ruleForm.synopsis" :rows="2"></el-input>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>

          <el-row :gutter="24" style="margin-top:20px;">
            <el-col :span="2">其他信息</el-col>
            <el-col :span="22">
              <el-col :span="12">
                <el-form-item label="商品货号" prop="number">
                  <el-input v-model="ruleForm.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品ID" prop="number">
                  <el-input v-model="ruleForm.goods_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"></el-col>
              <el-col :span="12">
                <el-form-item label="初始销量" prop="sales_volume">
                  <el-input v-model.number="ruleForm.sales_volume"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="仓库" prop="warehouse_id">
                  <el-select v-model="ruleForm.warehouse_id" placeholder="选择仓库">
                    <el-option
                      :key="item.id"
                      :label="item.title"
                      :value="item.id"
                      v-for="item in warehouses"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="赠送积分" prop="integral">
                  <el-input v-model.number="ruleForm.integral"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="兑换积分" prop="exchange_integral">
                  <el-input v-model.number="ruleForm.exchange_integral"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="生产周期（天）" prop="production_cycle">
                  <el-col :span="11">
                    <el-input v-model="ruleForm.production_cycle"></el-input>
                  </el-col>
                  <el-col :span="11">
                    <el-checkbox v-model="ruleForm.production_cycle_status">启用</el-checkbox>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="运费（元）" prop="freight">
                  <el-col :span="11">
                    <el-input v-model.number="ruleForm.freight"></el-input>
                  </el-col>
                  <el-col :span="11">
                    <el-checkbox v-model="ruleForm.freight_status">启用</el-checkbox>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="22">
                <el-form-item label="商品限购（件）" prop="limit_buy">
                  <el-col :span="11">
                    <el-input v-model.number="ruleForm.limit_buy"></el-input>
                  </el-col>
                  <el-col :span="11">
                    <el-checkbox v-model="ruleForm.limit_buy_status">启用（同一用户同一订单限购数量）</el-checkbox>
                    <p></p>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否支持会员价" prop="vip_buy_status">
                  <el-switch v-model="ruleForm.vip_buy_status"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上架" prop="shelf">
                  <el-switch v-model="ruleForm.shelf"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="启用商品评价" prop="evaluate_status">
                  <el-switch v-model="ruleForm.evaluate_status"></el-switch>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </template>
      <template v-if="active==2">
        <div>
          <el-row :gutter="24">
            <el-col :span="2">属性规格</el-col>
            <el-col :span="22">
              <el-col :span="24">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>商品规格</span>
                  </div>
                  <el-col :span="20">
                    <el-row :gutter="24">
                      <el-col :span="2">尺码：</el-col>
                      <el-col :span="12">
                        <el-checkbox-group v-model="checkedSizes">
                          <template v-for="(item,index) in sizes">
                            <el-checkbox :label="item" :key="item" style="margin-bottom:15px;"></el-checkbox>
                            <br v-if="index==8||index==20" />
                          </template>
                        </el-checkbox-group>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="sizeInput" placeholder="请输入尺码" style="width:150px"></el-input>
                        <el-button type="primary" @click="addSize">添加</el-button>
                      </el-col>
                    </el-row>
                    <el-row :gutter="24" style="margin-bottom:20px;">
                      <el-col :span="2">颜色：</el-col>
                      <el-col :span="12">
                        <el-checkbox-group v-model="checkedColors">
                          <el-checkbox
                            v-for="item in colors"
                            :label="item"
                            :key="item"
                            style="margin-bottom:15px;"
                          >{{item}}</el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                      <el-col :span="10">
                        <el-input v-model="colorInput" placeholder="请输入颜色" style="width:150px"></el-input>
                        <el-button type="primary" @click="addColor">添加</el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="1">
                    <el-button type="primary" @click="add">添加商品</el-button>
                  </el-col>
                </el-card>
              </el-col>

              <el-col :span="24">
                <el-table :data="tableData" style="width: 100%" border highlight-current-row>
                  <el-table-column label="尺码" prop="size"></el-table-column>
                  <el-table-column label="颜色" prop="color"></el-table-column>
                  <el-table-column label="进货价">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.join_money" placeholder="进货价" min="0"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="销售价格" prop="money">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.money"
                        type="number"
                        placeholder="销售价格"
                        min="0"
                        @blur="changeMoney(scope,scope.row)"
                      ></el-input>
                    </template>
                  </el-table-column>

                  <el-table-column label="vip价">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.vip_money"
                        type="number"
                        placeholder="vip价"
                        min="0"
                        @blur="changeVip(scope,scope.row)"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品库存">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.stock" type="number" placeholder="商品库存" min="0"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="SKU编号">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.sku"
                        placeholder="SKU编号"
                        @blur="changeCode(scope.row,scope)"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品图片" prop="name">
                    <template slot-scope="scope">
                      <template v-if="scope.row.img==''">
                        <el-upload
                          class="avatar-uploader"
                          :http-request="uploadFile"
                          action
                          :show-file-list="false"
                        >
                          <el-button @click="test(scope.row)">点击上传</el-button>
                        </el-upload>
                      </template>

                      <template v-else>
                        <img :src="scope.row.img" alt style="width:30px;height:30px;" />
                        <i class="el-icon-delete" @click="delImg(scope.row)"></i>
                      </template>
                    </template>
                  </el-table-column>

                  <el-table-column label="商品默认选择">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.selected" @change="changeSelect(scope.row)">是</el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="delTableData(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top:20px;">
            <el-col :span="2">商品图片</el-col>
            <el-col :span="22" style="display:flex;">
              <div class="block" style="display:flex;" v-if="showFile">
                <template v-for="(item,index) in fileList">
                  <div style="height:250px; margin-right:20px; " v-if="index<=5">
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
              </div>
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
            </el-col>
          </el-row>

          <el-row :gutter="24" style="margin-top:20px;">
            <el-col :span="2">商品详情</el-col>
            <el-col :span="22">
              <!-- <editor :init="init" v-model="data"></editor> -->
              <quill-editor
                v-model="data"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @change="onEditorChange($event)"
              ></quill-editor>
              <input
                type="file"
                multiple="multiple"
                @change="afterRead"
                id="avatar-uploader"
                style="display:none"
              />

              <!-- <vue-wangeditor id="editor" v-model="data"></vue-wangeditor> -->
            </el-col>
          </el-row>
        </div>
      </template>
      <template v-if="active==3">
        <div>
          <el-row :gutter="24">
            <el-col :span="2">关联商品</el-col>
            <el-col :span="22">
              <el-col :span="24">
                <el-col :span="12">
                  <el-col :span="8">
                    <el-select
                      v-model="classify_id1"
                      placeholder="全部分类"
                      @change="loadClassTwo2"
                      clearable
                    >
                      <el-option label="全部分类" value></el-option>
                      <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        v-for="item in classOnes"
                      ></el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="8">
                    <el-select v-model="classify_id2" placeholder="二级分类" clearable>
                      <el-option label="二级分类" value></el-option>
                      <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        v-for="item in classTwos2"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="title" placeholder="关键词"></el-input>
                  </el-col>
                  <el-col :span="1">
                    <el-button type="primary" @click="searchRelation">搜索</el-button>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-transfer
                @left-check-change="checkChange"
                @change="handleChange"
                v-model="value2"
                :data="data2"
                :button-texts="[ '移除','关联']"
                :titles="['选择关联商品', '已关联商品']"
              ></el-transfer>
            </el-col>
          </el-row>
        </div>
      </template>

      <el-form-item>
        <!-- <el-button type="primary" v-if="active==1" @click="resetForm">下一步,填写规格并上传图片</el-button> -->
        <el-button type="primary" v-if="active==1" @click="next">下一步,填写规格并上传图片</el-button>
        <template v-if="active==2">
          <el-button type="primary" @click="active=1">上一步,填写商品信息</el-button>
          <el-button type="primary" @click="next2">下一步,选择关联商品</el-button>
        </template>
        <template v-if="active==3">
          <el-button type="primary" @click="active=2">上一步,填写规格并上传图片</el-button>
          <el-button type="primary" @click="next3">完成提交商品</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

 
<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [
    {
      size: [
        "medium",
        "small",
        "large",
        "huge",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "22px",
        "24px",
        "26px",
        "32px",
        "48px"
      ]
    }
  ], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];

import http from "@/utils/request";
import axios from "axios";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme.min.js";
import "tinymce/skins/ui/oxide/skin.min.css";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import vueWangeditor from "vue-wangeditor";
export default {
  props: {
    plugins: {
      type: [String, Array],
      default: " image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  data() {
    // const generateData = _ => {
    //     const data2 = [];
    //     for (let i = 1; i <= 15; i++) {
    //       data2.push({
    //         key: i,
    //         label: `备选项 ${ i }`,

    //       });
    //     }
    //     return data2;
    //   };
    return {
      content: null,

      data2: [],
      value2: [1, 4],
      data: "",
      isEdit: false,
      fileList: [],
      title: "", //第三步关键词
      classify_id: "", //第三步分类
      brand_id: "", //第三步品牌
      fileLists: [],
      fileList2s: [],

      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector("#avatar-uploader").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      init: {
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        // skin_url: '/tinymce/skins/ui/oxide-dark',//暗色系
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
         
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)
          if (blobInfo.blob().size > self.maxSize) {
            failure("文件体积过大");
          }
          if (blobInfo.blob().type) {
            uploadPic();
          } else {
            failure("图片格式错误");
          }
          function uploadPic() {
            let formData = new FormData();
            // 服务端接收文件的参数名，文件数据，文件名
            //  blobInfo.filename()
            formData.append("upload_img", blobInfo.blob());
            formData.append("type", 2);
            axios
              .post(process.env.BASE_API + "index/base/upload", formData)
              .then(res => {
                if (res.data.code == 200) {
                  success(res.data.data.http_image);
                } else {
                  failure(res.data.msg);
                }
              })
              .catch(err => {});
          }
        }
      },
      tableData: [], //前端显示table表格
      tableData2: [], //
      search: "",
      ruleForm: {
        goods_id: "",
        classify_id: "",
        classify_id_two: "",
        type: "",
        title: "",
        brand_id: "",
        supplier_id: "",
        synopsis: "",
        number: "",

        sales_volume: "",
        warehouse_id: "",
        integral: "",
        exchange_integral: "",
        production_cycle: "",
        production_cycle_status: true,
        limit_buy: "",
        limit_buy_status: true,
        freight: "",
        freight_status: true,
        vip_buy_status: true,
        shelf: true,
        evaluate_status: true,
        goods_attribute: "",

        goods_relation: "",
        img: "",
        imgs: [],
        detail: ""
      },
      classify_id1: "",
      classify_id2: "",
      classTwos2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      active: 1,
      value: false,
      classOnes: [], //一级分类数组
      classTwos: [], //二级分类数组
      brands: [], //商品品牌
      suppliers: [], //g供货商
      warehouses: [], //仓库
      sizes: [
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",

        "均码",
        "25码",
        "26码",
        "27码",
        "28码",
        "29码",
        "30码",
        "31码",
        "32码",
        "33码",
        "34码",
        "35码",
        "36码",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43"
      ], //商品尺码
      checkedSizes: [],
      checkedColors: [],
      checkList: [],
      sizeInput: "",
      colorInput: "",
      currentRow: "",
      rightData: "",
      colors: ["黑色", "白色", "红色", "蓝色", "黄色"], //商品尺码

      showFile: true,
      rules: {
        classify_id: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        brand_id: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        supplier_id: [
          { required: true, message: "请选择供货商", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入供货商", trigger: "blur" }],
        synopsis: [
          { required: true, message: "请输入商品简介", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入商品货号", trigger: "blur" }
        ],

        sales_volume: [
          {
            required: true,
            type: "number",
            message: "请输入初始销量，初始销量必须为数字值",
            trigger: "blur"
          }
        ],
        warehouse_id: [
          { required: true, message: "选择仓库", trigger: "change" }
        ],
        integral: [
          {
            required: true,
            type: "number",
            message: "请输入赠送积分，必须为数字",
            trigger: "blur"
          }
        ],
        exchange_integral: [
          {
            required: true,
            type: "number",
            message: "请输入兑换积分，必须为数字",
            trigger: "blur"
          }
        ],
        production_cycle: [
          { required: true, message: "请输入生产周期", trigger: "blur" }
        ],
        freight: [
          {
            required: true,
            message: "请输入运费,必须为数字值",
            trigger: "blur"
          }
        ],
        limit_buy: [
          {
            required: true,
            message: "请输入商品限购数量,必须为数字值",
            trigger: "blur",
            type: "number"
          }
        ]
      }
    };
  },
  components: {
    Editor,
    vueWangeditor
  },
  mounted() {},
  watch: {
    //监听路由变化
    $route(to, from) {
      if (to.path != from.path) {
        this.resetForm();
      }
    }
    //      fileList:function(val){
    //        debugger
    //  if(val.length>5){
    //   debugger
    //  val=  val.splice(0,5)

    //  }
    // }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    this.getSeleData();
    this.getUpdate(this.$route.query.id);
  },

  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      alert(this.content);
    },
    change(status) {
      // this.$Message.info("开关状态：" + status);
      if (status == false) {
        this.banstatus = 2;
      }
      if (status == true) {
        this.banstatus = 1;
      }
    },
    upload(url) {
      let quill = this.$refs.myQuillEditor.quill;
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, "image", url);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
    afterRead() {
      let files = event.target.files;
     
      if (files.length > 0) {
        Array.prototype.forEach.call(files, file => {
          var that = this;
          var form = new FormData();
          form.append("upload_img", file);
          form.append("type", 2);
          //   form.append("token", this.$common._getCookie("ht_token"));
          var xhr = new XMLHttpRequest();
          xhr.open("POST", process.env.BASE_API + "index/base/upload", true);
          xhr.onreadystatechange = callback;
          xhr.send(form);

          function callback(res) {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
               
                let url = JSON.parse(res.currentTarget.response).data;
                console.log(url);
                that.upload(url.http_image);
              } else return false;
            }
          }
        });
      }
      //   let file = event.target.files;
      //   // 此时可以自行将文件上传至服务器
      //   console.log(file);
    },

    getUpdate(e) {
      if (e) {
        this.isEdit = true;
        http
          .post("admin/goods/goods_one", { id: this.$route.query.id })
          .then(res => {
            if (res.code == 200) {
              this.loadClassTwo(res.detail.classify_id);

              this.$nextTick(() => {
                this.ruleForm = {
                  id: res.detail.id,
                  classify_id: res.detail.classify_id,
                  classify_id_two: res.detail.classify_id_two,
                  type: res.detail.type.toString(),
                  title: res.detail.title,
                  brand_id: res.detail.brand_id,
                  supplier_id: res.detail.supplier_id,
                  synopsis: res.detail.synopsis,
                  number: res.detail.number,
                  goods_id: res.detail.goods_id,
                  sales_volume: res.detail.sales_volume,
                  warehouse_id: res.detail.warehouse_id,
                  integral: res.detail.integral,
                  exchange_integral: res.detail.exchange_integral,
                  production_cycle: res.detail.production_cycle,
                  production_cycle_status:
                    res.detail.production_cycle_status == "1" ? true : false,
                  limit_buy: res.detail.limit_buy,
                  limit_buy_status:
                    res.detail.limit_buy_status == "1" ? true : false,
                  freight: res.detail.freight,
                  freight_status:
                    res.detail.freight_status == "1" ? true : false,
                  vip_buy_status:
                    res.detail.vip_buy_status == "1" ? true : false,
                  shelf: res.detail.shelf == "1" ? true : false,
                  evaluate_status:
                    res.detail.evaluate_status == "1" ? true : false,

                  goods_relation: res.detail.realtion
                };

                this.fileList = res.detail.imgs ? res.detail.imgs : [];
                this.fileList[0] = res.detail.img;
                this.data = res.detail.detail;
                this.tableData = res.detail.data;
                this.tableData.forEach(val => {
                  val.selected = val.selected == "1" ? true : false;
                });
              });
            }
          });
      } else {
        // 新增
        if (sessionStorage.getItem("product")) {
          this.$confirm("有数据处于暂存状态，是否继续", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "放弃",
            type: "warning"
          })
            .then(() => {
              if (sessionStorage.getItem("product")) {
                this.$nextTick(() => {
                  this.ruleForm = JSON.parse(sessionStorage.getItem("product"));
                });
              }
              if (sessionStorage.getItem("tableData")) {
                this.tableData = JSON.parse(
                  sessionStorage.getItem("tableData")
                );
              }
              if (sessionStorage.getItem("data")) {
                this.data = JSON.parse(sessionStorage.getItem("data"));
              }
              if (sessionStorage.getItem("fileList")) {
                this.fileList = JSON.parse(sessionStorage.getItem("fileList"));
              }
            })
            .catch(() => {
              this.resetForm();
            });
        }
      }
    },
    changeMoney(e, index) {
      this.$nextTick(() => {
       
        if (Number(index.money) < Number(index.join_money)) {
          this.$message.error("销售价价不能小于进货价");

          this.tableData[e.$index].money = null;
        }
        if (Number(index.money) < Number(index.vip_money)) {
          this.$message.error("销售价价不能小于Vip价");

          this.tableData[e.$index].money = null;
        }
      });
    },
    changeVip(e, index) {
      this.$nextTick(() => {
        if (Number(index.vip_money) < Number(index.join_money)) {
          this.$message.error("vip价不能小于进货价");

          this.tableData[e.$index].vip_money = null;
        }
        if (Number(index.vip_money) > Number(index.money)) {
          this.$message.error("vip价不能大于销售价");

          this.tableData[e.$index].vip_money = null;
        }
      });
    },
    changeCode(e, i) {
      this.$nextTick(() => {
        if (e.sku !== null) {
          if (/[\u4e00-\u9fa5]/.test(e.sku)) {
            this.$message.error("不能含有中文字符");
            console.log(i.$index);
            this.tableData[i.$index].sku = 0;
          }
        }
      });
    },
    test(e) {
      this.currentRow = e;
    },
    searchRelation() {
      this.loadProduct(this.classify_id, this.brand_id, this.title);
    },
    check(e) {},
    checkChange(e) {
      
    
    },
    handleChange(value, direction, movedKeys) {
      this.rightData = movedKeys;
    },
    // 提交商品
    next3() {
     
      if (this.value2.length >= 4) {
        this.$message.error("最多只能选择四个");
      } else {
        this.$nextTick(() => {
          this.ruleForm.goods_relation = this.rightData.toString();
          this.ruleForm.shelf == true
            ? (this.ruleForm.shelf = "1")
            : (this.ruleForm.shelf = "0");
          this.ruleForm.production_cycle_status == true
            ? (this.ruleForm.production_cycle_status = "1")
            : (this.ruleForm.production_cycle_status = "0");
          this.ruleForm.limit_buy_status == true
            ? (this.ruleForm.limit_buy_status = "1")
            : (this.ruleForm.limit_buy_status = "0");
          this.ruleForm.freight_status == true
            ? (this.ruleForm.freight_status = "1")
            : (this.ruleForm.freight_status = "0");
          this.ruleForm.vip_buy_status == true
            ? (this.ruleForm.vip_buy_status = "1")
            : (this.ruleForm.vip_buy_status = "0");
          this.ruleForm.evaluate_status == true
            ? (this.ruleForm.evaluate_status = "1")
            : (this.ruleForm.evaluate_status = "0");
          /(http|https):\/\/([\w.]+\/?)\S*/.test(this.fileList[0])
            ? (this.ruleForm.img = this.fileList[0].split(
                this.fileList[0].split("/upload")[0]
              )[1])
            : this.fileList[0],
            (this.ruleForm.imgs = []);
          this.fileList.forEach(val => {
            if (/(http|https):\/\/([\w.]+\/?)\S*/.test(val)) {
              this.ruleForm.imgs.push(val.split(val.split("/upload")[0])[1]);
            } else {
              this.ruleForm.imgs.push(val);
            }
          }),
            (this.ruleForm.detail = this.data);

          this.tableData.forEach(val => {
            val.selected == true ? (val.selected = "1") : (val.selected = "0"),
              (val.img = /(http|https):\/\/([\w.]+\/?)\S*/.test(val.img)
                ? val.img.split(val.img.split("/upload")[0])[1]
                : val.img);
          });

          if (this.$route.query.id) {
            sessionStorage.getItem("del")
              ? (this.tableData2 = JSON.parse(sessionStorage.getItem("del")))
              : (this.tableData2 = []);
            if (this.tableData2.length > 0) {
              this.tableData2.forEach(val => {
                val.img = /(http|https):\/\/([\w.]+\/?)\S*/.test(val.img)
                  ? val.img.split(val.img.split("/upload")[0])[1]
                  : val.img;
                val.selected == "true"
                  ? (val.selected = "1")
                  : (val.selected = "0");
              });
            }

            this.ruleForm.goods_attribute = this.tableData.concat(
              this.tableData2
            );
          } else {
            this.ruleForm.goods_attribute = this.tableData;
          }

          http.post("admin/goods/goods_manage", this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);

              this.$nextTick(() => {
                this.resetForm();

                if (this.$route.query.id) {
                  this.$router.go(-1);
                } else {
                  this.active = 1;
                }
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      }
    },
    // 设为主图
    setImg(item, index) {
      this.showFile = false;

      let selectImg = this.fileList[0];
      this.fileList[0] = item;
      this.fileList[index] = selectImg;
      this.showFile = true;
    },
    // 删除商品图
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

    changeSelect(e) {
      if (e.selected == true) {
        this.tableData.forEach(val => (val.selected = false));
        e.selected = true;
      }
    },
    delTableData(e, index) {
      this.$confirm("是否删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (index.id) {
            index.status = 0;
            this.tableData2.push(index);
            this.tableData.splice(e, 1);
            sessionStorage.setItem("del", JSON.stringify(this.tableData2));
          } else {
            this.tableData.splice(e, 1);
          }
        })
        .catch(() => {});
    },
    delImg(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          e.img = "";
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 添加商品
    add() {
      if (this.checkedSizes.length < 1 || this.checkedColors.length < 1) {
        this.$message.error("至少选择一种尺码和颜色");
      } else {
        // let color=this.checkedColors
        // let size=this.checkedSizes

        this.checkedColors.forEach(color => {
          this.checkedSizes.forEach(size => {
            if (
              this.tableData.some(val => val.color == color && val.size == size)
            ) {
              this.$message.error(color + "和" + size + "已添加");
            } else {
              this.tableData.push({
                id: "",
                size: size,
                color: color,
                money: 0,
                join_money: 0,
                vip_money: 0,
                stock: 0,
                img: "",
                selected: false,
                sku: 0,
                status: 1
              });
            }
          });
        });

        this.checkedSizes = [];
        this.checkedColors = [];
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    next2() {
      if (this.fileList.length <= 0) {
        return this.$message.error("请上传商品图");
      } else {
        sessionStorage.setItem("fileList", JSON.stringify(this.fileList));
      }
      if (this.data == "") {
        return this.$message.error("请输入商品详情");
      } else {
        sessionStorage.setItem("data", JSON.stringify(this.data));
      }
      if (this.tableData.length > 0) {
        sessionStorage.setItem("tableData", JSON.stringify(this.tableData));
        this.active = 3;
      } else {
        this.$message.error("请填写商品规格");
      }

      this.value2 = this.ruleForm.goods_relation.map(val => val.id);

      this.loadProduct(this.classify_id1, this.classify_id2, this.title);
    },
    loadProduct(classify_id, classify_id_two, title) {
      http
        .post("admin/goods/goods_more", {
          page: 1,
          limit: 10000,
          classify_id: classify_id,
          classify_id_two: classify_id_two,
          title: title,
          del_goods_id: this.ruleForm.id ? this.ruleForm.id : ""
        })
        .then(res => {
          if (res.code == 200) {
            this.data2 = [];
            res.data.data.forEach(val => {
              this.data2.push({
                key: val.id,
                label: val.title
              });
            });
          }
        });
    },
    // 添加颜色
    addSize() {
      if (this.sizeInput == "") {
        this.$message.error("请输入尺码");
      } else {
        this.sizes.push(this.sizeInput);
        this.sizeInput = "";
      }
    },
    // 添加颜色
    addColor() {
      if (this.colorInput == "") {
        this.$message.error("请输入颜色");
      } else {
        this.colors.push(this.colorInput);
        this.colorInput = "";
      }
    },

    // 获取下拉数据
    getSeleData() {
      http
        .post("admin/goods/goods_class_more", { page: 1, limit: 10000, pid: 0 })
        .then(res => {
          if (res.code == 200) {
            this.classOnes = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        }),
        http
          .post("admin/goods/brand_more", { page: 1, limit: 10000 })
          .then(res => {
            if (res.code == 200) {
              this.brands = res.data.data;
            } else {
              this.$message.error(res.msg);
            }
          });
      http
        .post("admin/goods/supplier_more", { page: 1, limit: 10000 })
        .then(res => {
          if (res.code == 200) {
            this.suppliers = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        });
      http
        .post("admin/goods/warehouse_more", { page: 1, limit: 10000 })
        .then(res => {
          if (res.code == 200) {
            this.warehouses = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    loadClassTwo2(e) {
      this.classify_id2 = "";
      this.classTwos2 = [];
      if (e == "") {
        this.classify_id2 = "";
      } else {
        http
          .post("admin/goods/goods_class_more", {
            page: 1,
            limit: 10000,
            pid: e
          })
          .then(res => {
            if (res.code == 200) {
              this.classTwos2 = res.data.data;
            } else {
              this.$message.error(res.msg);
            }
          });
      }
    },
    loadClassTwo(e) {
      this.ruleForm.classify_id_two = "";

      http
        .post("admin/goods/goods_class_more", { page: 1, limit: 10000, pid: e })
        .then(res => {
          if (res.code == 200) {
            this.classTwos = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 下一步
    next() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.active = 2;
          sessionStorage.setItem("product", JSON.stringify(this.ruleForm));
        }
      });
    },

    resetForm() {
      sessionStorage.setItem("data", "");
      sessionStorage.setItem("tableData", "");
      sessionStorage.setItem("del", "");
      sessionStorage.setItem("fileList", "");
      sessionStorage.setItem("product", "");
      this.ruleForm = Object.assign({}, this.$options.data().ruleForm);
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

            this.currentRow.img = res.data.data.http_image;
            // console.log( this.currentRow.id)
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {});
    },
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
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.con {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
.demo-ruleForm {
  margin-top: 20px;
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
