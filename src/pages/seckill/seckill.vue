<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="goAdd()">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vAdd from "./comonents/add";
import vList from "./comonents/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      // 在父组件触发弹窗时，传递给子组件参数
      info: {
        isShow: false,
        title: "添加秒杀活动",
        isAdd: true,
      },
    };
  },
  methods: {
    // 点击添加按钮
    goAdd() {
      this.info = {
        isShow: true,
        title: "添加秒杀活动",
        isAdd: true,
      };
    },
    // 子组件点了编辑按钮
    edit(id) {
      this.info = {
        isShow: true,
        title: "编辑秒杀活动",
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