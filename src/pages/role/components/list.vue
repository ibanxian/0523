<template>
  <div>
    <el-table
      :data="RoleList"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="角色编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del @confirm="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";
// 引入请求数据接口文件
import { reqRoleList, reqRoleDel } from "../../../util/request";
// 公用弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  computed: {
    ...mapGetters({
      RoleList: "role/RoleList",
    }),
  },
  methods: {
    ...mapActions({
      RoleListAction: "role/RoleListAction",
    }),
    // 点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    // 点击了删除
    del() {
      reqRoleDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.RoleListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 进入页面进调用列表数据
    this.RoleListAction();
  },
};
</script>

<style>
</style>