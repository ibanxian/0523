<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="goAdd">添加</el-button>
    <!-- 角色列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹窗 info自定义属性父传子 -->
    <v-add :info="info" @hide="hide" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      // 父组件触发添加添加按钮时，传递给子组件的参数
      info: {
        isShow: false, // 弹窗开关
        titie: "添加角色", // 弹窗标题
        isAdd: true, // 添加/修改
      },
    };
  },
  methods: {
    // 点击了添加按钮
    goAdd() {
      this.info = {
        isShow: true,
        title: "添加角色",
        isAdd: true,
      };
    },
    // 子组件点击了取消按钮
    hide() {
      this.info.isShow = false;
    },
    // 获取子组件编辑的请求,触发弹窗,然后调用子组件add.look动作
    edit(id) {
      this.info = {
        isShow: true,
        title: "修改角色",
        isAdd: false,
      };
      this.$refs.add.look(id) // 触发子组件动作  通过ref父组件调取子组件的方法
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>