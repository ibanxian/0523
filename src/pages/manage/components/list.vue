<template>
  <div>
    <el-table :data="Userlist" row-key="id" border>
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <v-del @confirm="del(scope.row.uid)"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        :page-size="size"
        layout="prev, pager, next"
        :total="UserTotal"
        :hide-on-single-page="hideSinglePage"
        :current-page="page"
        @current-change="changeCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 引入vuex仓库
import { mapGetters, mapActions } from "vuex";
// 引入请求数据文件
import { reqUserDel } from "../../../util/request";
// 引入公用提示弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      Userlist: "manage/Userlist", // 列表
      UserTotal: "manage/UserTotal", // 总数
      size: "manage/size", // 一页数量
      page: "manage/page", // 当前页码
    }),
  },
  data() {
    return {
      hideSinglePage: true, // 只有一页时是否隐藏
    };
  },
  methods: {
    ...mapActions({
      UserListActions: "manage/UserListActions", // 获取列表请求
      UserTotalActions: "manage/UserTotalActions", // 获取总数的请求
      UserPageActions: "manage/UserPageActions", // 获取当前页码的请求
    }),
    // 点击编辑按钮,传父元素,让父元素调用弹窗编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 点击了删除按钮
    del(id) {
      //点击了确定，发起删除请求
      reqUserDel({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.UserTotalActions(); // 重新获取总数
          this.UserPageActions(1); // 重新设置页码到1页
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改了当前的页码
    changeCurrentPage(page) {
      //修改一下vuex里面的page
      this.UserPageActions(page);
    },
  },
  mounted() {
    this.UserListActions(); // 进入页面就触发列表请求
    this.UserTotalActions();
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