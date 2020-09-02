<template>
  <div>
    <!-- 管理员列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹窗 -->
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
      info: {
        isShow: false,
        titie: "修改会员",
      },
    };
  },
  methods: {
    edit(id) {
      this.info = {
        isShow: true,
        title: "修改会员",
      };
      this.$refs.add.look(id); //父组件调用子组件的方法
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>