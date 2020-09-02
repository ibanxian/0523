<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="goAdd">添加</el-button>
    <!-- 管理员列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹窗 info自定义属性父传子 -->
    <v-add :info="info" ref="add"></v-add>
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
      // 传递给子组件的信息
      info: {
        isShow: false,
        titie: "添加管理员",
        isAdd: true,
      },
    };
  },
  methods: {
    // 点击添加按钮
    goAdd() {
      this.info = {
        isShow: true,
        titie: "添加管理员",
        isAdd: true,
      };
    },
    // 子组件传过来的编辑按钮
    edit(id) {
      this.info = {
        isShow: true,
        title: "修改管理员",
        isAdd: false,
      };
      //父组件调用子组件的方法
      this.$refs.add.look(id);
    },
  },
};
</script>
<style scoped>
</style>