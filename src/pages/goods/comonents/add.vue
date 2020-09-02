<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close" @opened="createEditor">
    <el-form :model="form">
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="form.first_cateid" @change="changeFirstId">
          <el-option label="--请选择--" value disabled></el-option>
          <!-- 少一个动态的数据 -->
          <el-option
            v-for="item in ClassList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="form.second_cateid">
          <el-option label="--请选择--" value disabled></el-option>
          <!-- 少一个动态的数据 -->
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="form.goodsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" :label-width="formLabelWidth">
        <el-input v-model="form.market_price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <!-- 原生的上传文件 -->
        <div class="upload-box">
          <h3 class="upload-add">+</h3>
          <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
          <input class="upload-file" @change="changeImg" type="file" />
        </div>
      </el-form-item>
      <el-form-item label="商品规格" :label-width="formLabelWidth">
        <el-select v-model="form.specsid" @change="changeSpecId">
          <el-option label="--请选择--" value disabled></el-option>
          <!-- 少一个动态的数据 -->
          <el-option
            v-for="item in SpecList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品属性" :label-width="formLabelWidth">
        <el-select v-model="form.specsattr" multiple>
          <el-option label="--请选择--" value disabled></el-option>
          <!-- 少一个动态的数据 -->
          <el-option v-for="item in attrList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" :label-width="formLabelWidth">
        <el-radio :label="1" v-model="form.isnew">是</el-radio>
        <el-radio :label="2" v-model="form.isnew">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" :label-width="formLabelWidth">
        <el-radio :label="1" v-model="form.ishot">是</el-radio>
        <el-radio :label="2" v-model="form.ishot">否</el-radio>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" :label-width="formLabelWidth">
        <!-- 富文本编辑器的节点 -->
        <div id="editor" v-if="info.isShow"></div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
      <el-button type="primary" @click="update" v-else>修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 富文本编辑器
import E from "wangeditor";
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";
// 公用弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";
// 请求接口文件
import {
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../util/request";
export default {
  props: ["info"], // 父传子，props接受参数
  computed: {
    ...mapGetters({
      ClassList: "classify/ClassList", // 商品分类列表数据
      SpecList: "spec/SpecList", // 商品规格列表数据
    }),
  },
  data() {
    return {
      formLabelWidth: "120px",
      // 表单数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类列表
      secondCateList: [],
      // 商品规格列表
      attrList: [],
      // 图片地址初始值
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      ClassListAction: "classify/ClassListAction", // 商品分类列表请求
      SpecListActions: "spec/SpecListActions", // 商品规格列表请求
      GoodsListActions: "goods/GoodsListActions", // 列表请求
      GoodsTotalActions: "goods/GoodsTotalActions", // 总数请求
    }),
    // 点击了确定按钮
    add() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();
      reqGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty(); // 清空数据
          this.cancel(); // 弹框消失
          this.GoodsListActions(); // 重新获取列表
          this.GoodsTotalActions(); // 重新获取商品总数
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 二级分类获取
    changeFirstId() {
      //找到当前first_cateid对应的那条数据的children，赋值给secondCateList,遍历
      this.secondCateList = this.ClassList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      // 因为更换了一级分类，二级分类重置
      this.form.second_cateid = "";
    },
    // 商品属性获取
    changeSpecId() {
      // 当商品规格变了，就计算一下商品属性要展示的数组列表
      this.attrList = this.SpecList.find(
        (item) => item.id == this.form.specsid
      ).attrs;
      // 选中的商品属性重置
      this.form.specsattr = [];
    },
    // 重置数据
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      this.secondCateList = [];
      this.attrList = [];
    },
    //点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //弹框关闭完成后
    close() {
      // 如果是编辑，取消了，就要清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 上传文件
    changeImg(e) {
      let file = e.target.files[0];
      // 显示上传大小 2M
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件格式不能超过2M");
        return;
      }
      // 图片类型
      let imgTypeArr = [".jpg", ".jpeg", ".png", ".gif"];
      // 获取到后缀名 lastIndexOf 查找下标, slice提取后缀
      var extname = file.name.slice(file.name.lastIndexOf("."));
      // 判断文件格式是否正确
      if (!imgTypeArr.includes(extname)) {
        warningAlert("请上传正确的图片格式");
        return;
      }
      this.imgUrl = URL.createObjectURL(file); // 提取图片地址 imgUrl要在data中声明
      this.form.img = file; // 数据保存到form表单中
    },
    // 查看某一条详情
    look(id) {
      reqGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id; // 传个id，方便修改
        this.imgUrl = this.$preImg + res.data.list.img; // 图片赋值
        this.form.specsattr = res.data.list.specsattr.split(",");
        // 计算二级分类
        this.secondCateList = this.ClassList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        // 计算商品属性
        this.attrList = this.SpecList.find(
          (item) => item.id == this.form.specsid
        ).attrs;
      });
    },
    // 点击了修改按钮
    update() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();
      reqGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.empty(); // 清空数据
          this.cancel(); // 弹框消失
          this.GoodsListActions(); // 重新获取列表
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //创建编辑器
    createEditor() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //给富文本编辑器赋值
      this.editor.txt.html(this.form.description);
    },
  },
  mounted() {
    if (this.ClassList.length == 0) {
      this.ClassListAction(); // 商品分类列表
    }
    if (this.SpecList.length == 0) {
      this.SpecListActions(true); // 商品规格列表
    }
  },
};
</script>

<style scoped>
.el-input,
.el-select {
  width: 300px;
}
.el-select-dropdown__item i:before {
  padding-right: 10px;
}
.upload-box {
  width: 150px;
  height: 150px;
  border: 1px dashed #cccccc;
  position: relative;
}
.upload-add {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 40px;
  color: #666;
  font-weight: 400;
}
.upload-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.upload-file {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>