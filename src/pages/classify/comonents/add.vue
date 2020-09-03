<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
    <el-form :model="form">
      <el-form-item label="上级分类" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择上级分类">
          <el-option label="--请选择--" :value="0" disabled></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
          <!-- 少一个动态的数据 -->
          <el-option
            v-for="item in ClassList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!=0">
        <!-- 原生的上传文件 -->
        <div class="upload-box">
          <h3 class="upload-add">+</h3>
          <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
          <input class="upload-file" @change="changeImg" type="file" />
        </div>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";
// 公用弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";
// 请求接口文件
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
} from "../../../util/request";
export default {
  props: ["info"], // 父传子，props接受参数
  computed: {
    ...mapGetters({
      ClassList: "classify/ClassList", // 列表数据
    }),
  },
  data() {
    return {
      formLabelWidth: "120px",
      // form初始数据
      form: {
        pid: 0,
        catename: "",
        status: 1,
        img: null,
      },
      // 图片地址初始值
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      ClassListAction: "classify/ClassListAction", // 列表请求
    }),
    // 重置数据
    empty() {
      this.form = {
        pid: "",
        catename: "",
        status: 1,
        img: null,
      };
      this.imgUrl = "";
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
      console.log(file);
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
    // 正则规则
    reg() {
      this.isok = true;
      if (this.form.pid === "") {
        warningAlert("上级分类不能为空");
        this.isok = false;
        return;
      }
      if (this.form.catename == "") {
        warningAlert("分类名称不能为空");
        this.isok = false;
        return;
      }
      if (form.pid != 0 && this.imgUrl == "") {
        warningAlert("图片不能为空");
        this.isok = false;
        return;
      }
    },
    // 点击了确定按钮
    add() {
      this.reg();
      this.isok &&
        reqCateAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty(); // 清空数据
            this.cancel(); // 弹框消失
            this.ClassListAction(); // 重新获取列表
          } else {
            warningAlert(res.data.msg);
          }
        });
    },
    // 查看某一条详情
    look(id) {
      reqCateDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id; // 传个id，方便修改
        this.imgUrl = this.$preImg + res.data.list.img; // 图片赋值
      });
    },
    // 点击了修改按钮
    update() {
      this.reg();
      this.isok &&
        reqCateUpdate(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("更新成功");
            this.empty(); // 清空数据
            this.cancel(); // 弹框消失
            this.ClassListAction(); // 重新获取列表
          } else {
            warningAlert(res.data.msg);
          }
        });
    },
  },
  mounted() {},
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