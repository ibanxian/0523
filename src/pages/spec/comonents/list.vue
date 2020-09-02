<template>
  <div>
    <el-table
      :data="SpecList"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="规格编号" sortable width="120"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="150"></el-table-column>
      <el-table-column label="规格属性" sortable width="520">
        <template slot-scope="scope">
          <el-tag type="success" v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
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
    <div class="page">
      <el-pagination
        background
        :page-size="SpecSize"
        layout="prev, pager, next"
        :total="SpecTotal"
        :current-page="SpecPage"
        @current-change="changeCurrentPage"
      ></el-pagination>
    </div>
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
      SpecList: "spec/SpecList", // 列表数据
      SpecTotal: "spec/SpecTotal", // 总数
      SpecSize: "spec/SpecSize", // 一页条数
      SpecPage: "spec/SpecPage", // 当前页数
    }),
  },
  methods: {
    ...mapActions({
      SpecListActions: "spec/SpecListActions", // 列表请求
      SpecTotalActions: "spec/SpecTotalActions", // 总数请求
      SpecPageActions: "spec/SpecPageActions", // 当前页请求
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
    // 当前页
    changeCurrentPage(page) {
      this.SpecPageActions(page);
    },
  },
  mounted() {
    this.SpecListActions(); // 进入分类管理就触发列表请求
    this.SpecTotalActions(); // 总数请求
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
.el-tag {
  margin: 0 2px;
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