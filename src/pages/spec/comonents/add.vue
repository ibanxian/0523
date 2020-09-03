<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
    <el-form :model="form">
      <el-form-item label="规格名称" :label-width="formLabelWidth">
        <el-input v-model="form.specsname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="规格属性"
        :label-width="formLabelWidth"
        v-for="(item,index) in attrArr"
        :key="index"
      >
        <el-input v-model="item.value" autocomplete="off"></el-input>
        <el-button type="primary" @click="addAttr" v-if="index==0">新增规格属性</el-button>
        <el-button type="danger" @click="del(index)" v-else>删除</el-button>
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
  reqSpecAdd,
  reqSpecDetail,
  reqSpecUpdate,
} from "../../../util/request";
export default {
  props: ["info"], // 父传子，props接受参数
  data() {
    return {
      formLabelWidth: "120px",
      // form初始数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      // 属性初始值
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      SpecListActions: "spec/SpecListActions", // 列表请求
      SpecTotalActions: "spec/SpecTotalActions", // 总数请求
    }),
    // 新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    // 删除规格属性
    del(index) {
      this.attrArr.splice(index, 1);
    },
    // 正则规则
    reg() {
      this.isok = true;
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空");
        this.isok = false;
        return;
      }
      if (this.attrArr.some((item) => item.value === "")) {
        warningAlert("规格属性均不能为空");
        this.isok = false;
        return;
      }
    },
    // 点击了确定按钮
    add() {
      this.reg();
      //attrArr=[{value:"1"},{value:"2"},{value:"3"}] -->["1","2","3"]
      // 先map循环出每一项，然后json.stringfy转为字符串数组
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      this.isok &&
        reqSpecAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty(); // 清空数据
            this.cancel(); // 弹框消失
            this.SpecListActions(); // 重新获取列表
            this.SpecTotalActions(); // 总数请求
          } else {
            warningAlert(res.data.msg);
          }
        });
    },
    // 查看某一条详情
    look(id) {
      reqSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        //form.attrs=[64G,128G,256G] -->[{value:"64G"},{value:"128G"},{value:"256G"}]
        this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    // 点击了修改按钮
    update() {
      this.reg();
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      this.isok &&
        reqSpecUpdate(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("更新成功");
            this.empty(); // 清空数据
            this.cancel(); // 弹框消失
            this.SpecListAction(); // 重新获取列表
          } else {
            warningAlert(res.data.msg);
          }
        });
    },
    // 重置数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
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
</style>