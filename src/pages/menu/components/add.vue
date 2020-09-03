<template>
  <!-- @closed="close"  Dialog 关闭动画结束时的回调 -->
  <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
    <el-form :model="form">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="changePid">
          <el-option label="顶级菜单" :value="0"></el-option>
          <!-- 少一个动态的数据 -->
          <el-option v-for="item in MenuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" :label-width="formLabelWidth">
        <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
        <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
      </el-form-item>
      <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type===1">
        <el-select v-model="form.icon" placeholder="请选择目录图标">
          <el-option value="el-icon-setting">
            <i class="el-icon-setting">el-icon-setting</i>
          </el-option>
          <el-option value="el-icon-goods">
            <i class="el-icon-goods">el-icon-goods</i>
          </el-option>
          <el-option value="el-icon-user">
            <i class="el-icon-user">el-icon-user</i>
          </el-option>
          <el-option value="el-icon-camera">
            <i class="el-icon-camera">el-icon-camera</i>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
        <el-select v-model="form.url">
          <el-option value label="--请选择--" disabled></el-option>
          <!-- 渲染二级路由规则 -->
          <el-option
            v-for="item in indexRoutes"
            :key="item.path"
            :label="item.name+' ------ '+item.path"
            :value="'/'+item.path"
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
// 引入公共弹窗组件
import { successAlert, warningAlert } from "../../../util/alert";
// 引入路由规则页面，取动态二级路由
import { indexRoutes } from "../../../router";
// 引入数据获取文件axios
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate,
} from "../../../util/request";
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"], // 父传子，props接受参数
  computed: {
    ...mapGetters({
      MenuList: "menu/MenuList",
    }),
  },
  data() {
    return {
      indexRoutes: indexRoutes, // 动态路由规则
      // 表单数据
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      // 重置表单数据
      empty() {
        this.form = {
          pid: 0,
          title: "",
          icon: "",
          type: 1,
          url: "",
          status: 1,
        };
      },
    };
  },
  methods: {
    // 请求菜单列表状态层
    ...mapActions({
      MenuListAction: "menu/MenuListAction",
    }),
    // 修改了changePid
    changePid() {
      // 如果菜单类型是顶级菜单0，菜单类型就是目录1，不是菜单类型就是菜单2
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // 正则
    reg() {
      this.isok = true;
      if (this.form.title == "") {
        warningAlert("菜单名称不得为空");
        this.isok = false;
        return;
      }
      if (this.form.type === 1 && this.form.icon == "") {
        warningAlert("菜单图标不得为空");
        this.isok = false;
        return;
      }
      if (this.form.type === 2 && this.form.url == "") {
        warningAlert("菜单地址不得为空");
        this.isok = false;
        return;
      }
    },
    // 点击了添加按钮
    add() {
      this.reg();
      this.isok &&
        reqMenuAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            //添加成功
            successAlert(res.data.msg);
            //弹框消失
            this.$emit("hide");
            // 重置表单数据
            this.empty();
            // 触发列表更新
            this.MenuListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
    },
    // 查看单一条数据，编辑按钮
    look(id) {
      reqMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 点击了编辑的修改按钮
    update(id) {
      this.reg();
      this.isok &&
        reqMenuUpdate(this.form).then((res) => {
          if (res.data.code === 200) {
            // 更新成功
            successAlert("更新成功");
            //弹框消失
            this.$emit("hide");
            // 重置表单数据
            this.empty();
            // 触发列表更新
            this.MenuListAction();
          }
        });
    },
    // 点击取消按钮
    cancel() {
      this.$emit("hide");
    },
    // 弹窗关闭后执行动作
    close() {
      // 如果是编辑状态，取消了，就要清空
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