<template>
  <!-- @closed="close"  Dialog 关闭动画结束时的回调 -->
  <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree
          :data="MenuList"
          show-checkbox
          node-key="id"
          ref="tree"
          :props="{children:'children',label:'title'}"
        ></el-tree>
      </el-form-item>
      <el-form-item label="角色状态" :label-width="formLabelWidth">
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
// 引进vuex的仓库辅助参数
import { mapGetters, mapActions } from "vuex";
// 引进axios请求数据文件
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../util/request";
// 引进公共提示文件
import { warningAlert, successAlert } from "../../../util/alert";
export default {
  props: ["info"], // 父传子 子组件用props接收参数
  computed: {
    ...mapGetters({
      MenuList: "menu/MenuList",
      RoleList: "role/reqRoleList",
    }),
  },
  data() {
    return {
      formLabelWidth: "120px",
      // form 表单初始数据
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      MenuListAction: "menu/MenuListAction",
      RoleListAction: "role/RoleListAction",
    }),
    // 子组件点击了取消
    cancel() {
      this.$emit("hide");
    },
    // 数据重置
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      //重置树形控件
      this.$refs.tree.setCheckedKeys([]);
    },
    // close 弹框消失
    close() {
      !this.info.isAdd && this.empty();
    },
    // 点击了确定按钮
    add() {
      // this.$refs.tree.getCheckedKeys() 获取树形控件上的选中的key
      // JSON.stringify 把数组转成字符串数组
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加角色成功");
          // 弹窗消失
          this.cancel();
          // 清空数据
          this.empty();
          // 列表刷新
          this.RoleListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 查看详情 父组件调取子组件的方法,编辑
    look(id) {
      reqRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // JSON.parse() 把字符串数组转成真数组
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    // 点击了修改按钮
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改角色成功");
          // 弹窗消失
          this.cancel();
          // 清空数据
          this.empty();
          // 列表刷新
          this.RoleListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //如果menuList数组是个空的，要在进入页面就发起请求 =>菜单管理列表
    if (this.MenuList.length == 0) {
      this.MenuListAction();
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