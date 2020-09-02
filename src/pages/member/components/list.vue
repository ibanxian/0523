<template>
  <div>
    <el-table :data="MemberList" row-key="id" border>
      <el-table-column prop="uid" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        :page-size="MemberSize"
        layout="prev, pager, next"
        :total="MemberTotal"
        :current-page="MemberPage"
        @current-change="changeCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      MemberList: "member/MemberList", // 列表数据
      MemberTotal: "member/MemberTotal", // 会员总数
      MemberSize: "member/MemberSize", // 一页条数
      MemberPage: "member/MemberPage", // 当前页
    }),
  },
  data() {
    return {
      Userlist: {},
    };
  },
  methods: {
    ...mapActions({
      MemberListActions: "member/MemberListActions", // 列表请求
      MemberTotalActions: "member/MemberTotalActions", // 会员总数
      MemberPageActions: "member/MemberPageActions", // 当前页
    }),
    // 点击了编辑按钮，通知父组件，调用弹窗子组件
    edit(id) {
      this.$emit("edit", id);
    },
    // 当前页被修改
    changeCurrentPage(page) {
      // 触发vuex里的page修改动作，进而在vuex里更新了列表
      this.MemberPageActions(page);
    },
  },
  mounted() {
    this.MemberListActions(); // 进入列表页就触发列表请求
    this.MemberTotalActions(); // 进入列表页就触发会员总数请求
  },
};
</script>

<style scoped>
.el-table {
  width: 90%;
  margin: 10px auto;
  margin-bottom: 20px;
}
.page {
  width: 90%;
  margin: 10px auto;
  overflow: hidden;
}
.el-pagination {
  float: right;
}
</style>