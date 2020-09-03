<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动时限" :label-width="formLabelWidth">
        <el-date-picker
          v-model="speckillTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00']"
        ></el-date-picker>
      </el-form-item>
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
        <el-select v-model="form.second_cateid" @change="changesecondId">
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
      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select v-model="form.goodsid">
          <el-option label="--请选择--" value disabled></el-option>
          <!-- 少一个动态的数据 -->
          <el-option
            v-for="item in goodList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
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
  reqSeckAdd,
  reqSeckDetail,
  reqSeckUpdate,
} from "../../../util/request";
export default {
  props: ["info"], // 父传子，props接受参数
  computed: {
    ...mapGetters({
      ClassList: "classify/ClassList", // 商品分类列表数据
      GoodsList: "goods/GoodsList", // 列表请求
    }),
  },
  data() {
    return {
      formLabelWidth: "120px",
      // form初始数据
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 二级分类暂时存放
      secondCateList: [],
      // 商品列表暂时存放
      goodList: [],
      // 活动时间暂时存放
      speckillTime: [],
    };
  },
  methods: {
    ...mapActions({
      ClassListAction: "classify/ClassListAction", // 商品分类列表请求
      GoodsListActions: "goods/GoodsListActions", // 列表请求
      SeckListActions: "seck/SeckListActions", // 活动列表请求
    }),
    // 二级分类
    changeFirstId() {
      this.secondCateList = this.ClassList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      this.form.second_cateid = "";
      this.form.goodsid = "";
    },
    // 商品列表
    changesecondId() {
      this.goodList = this.GoodsList.filter(
        (item) => item.second_cateid == this.form.second_cateid
      );
      this.form.goodsid = "";
    },
    // 规则
    req() {
      this.isok = true;
      if (this.form.title == "") {
        warningAlert("活动名称不能为空");
        this.isok = false;
        return;
      }
      if (this.speckillTime == "") {
        warningAlert("活动时限不能为空");
        this.isok = false;
        return;
      }
      if (this.form.first_cateid == "") {
        warningAlert("一级分类不能为空");
        this.isok = false;
        return;
      }
      if (this.form.second_cateid == "") {
        warningAlert("二级分类不能为空");
        this.isok = false;
        return;
      }
      if (this.form.goodsid == "") {
        warningAlert("商品不能为空");
        this.isok = false;
        return;
      }
    },
    // 点击了确定按钮
    add() {
      this.req();
      if (this.isok) {
        // 时间转换
        this.form.begintime = this.speckillTime[0].getTime();
        this.form.endtime = this.speckillTime[1].getTime();
        reqSeckAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty(); // 清空数据
            this.cancel(); // 弹框消失
            this.SeckListActions(); // 重新获取列表
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    // 查看某一条详情
    look(id) {
      reqSeckDetail({ id: id }).then((res) => {
        // 二级分类
        this.form = res.data.list;
        this.form.id = id;
        this.secondCateList = this.ClassList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        // 商品
        this.goodList = this.GoodsList.filter(
          (item) => item.second_cateid == this.form.second_cateid
        );
        // 时间
        let begintime = new Date(parseInt(this.form.begintime));
        let endtime = new Date(parseInt(this.form.endtime));
        this.speckillTime = [begintime, endtime];
      });
    },
    // 点击了修改按钮
    update() {
      this.req();
      if (this.isok) {
        // 时间转换
        this.form.begintime = this.speckillTime[0].getTime();
        this.form.endtime = this.speckillTime[1].getTime();
        reqSeckUpdate(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("更新成功");
            this.empty(); // 清空数据
            this.cancel(); // 弹框消失
            this.SeckListActions(); // 重新获取列表
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    // 重置数据
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.secondCateList = [];
      this.goodList = [];
      this.speckillTime = "";
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
  },
  mounted() {
    if (this.ClassList.length == 0) {
      this.ClassListAction(); // 商品分类列表
    }
    if (this.GoodsList.length == 0) {
      this.GoodsListActions(true); // 商品列表
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
</style>