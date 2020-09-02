<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="goAdd()">添加</el-button>
    <!-- 数据列表 -->
    <v-list @edit="edit($event)"></v-list>
    <!-- 添加弹框 info 父传子/ hede 子传父 / ref 调用子组件的方法-->
    <v-add :info="info" @hide="hide" ref="add"></v-add>
  </div>
</template>

<script>
// 1.引入添加及列表组件
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    // 2.绑定组件
    vList,
    vAdd,
  },
  data() {
    return {
      // 在父组件触发弹窗时，传递给子组件参数
      info: {
        isShow: false, // 弹窗启动开关
        title: "添加菜单",
        isAdd: true, // 判断是否是添加/编辑
      },
    };
  },
  methods: {
    // 点击添加按钮,触发添加弹窗
    goAdd() {
      this.info = {
        isShow: true,
        title: "添加菜单",
        isAdd: true,
      };
    },
    // 子组件触发取消按钮，传递过来的
    hide() {
      this.info.isShow = false;
    },
    // 点击了编辑按钮
    edit(id) {
      this.info = {
        isShow: true,
        title: "修改菜单",
        isAdd: false,
      };
      //父组件调用子组件的方法
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>