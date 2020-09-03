<template>
  <div>
    <el-table
      :data="SeckList"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";
// 引入请求数据接口文件
import { reqSpecDel } from "../../../util/request";
// 公用弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  computed: {
    ...mapGetters({
      SeckList: "seck/SeckList", // 活动列表数据
    }),
  },
  methods: {
    ...mapActions({
      SeckListActions: "seck/SeckListActions", // 活动列表请求
    }),
    // 点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      //点击了确定，发起删除请求
      reqSpecDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.SpecTotalActions(); // 总数请求
          this.SpecPageActions(1); // 设置到1页，触发列表更新
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    
  },
  mounted() {
    this.SeckListActions(); // 进入分类管理就触发列表请求
  },
};
</script>

<style scoped>
</style>