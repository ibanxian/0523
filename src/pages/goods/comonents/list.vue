<template>
  <div>
    <el-table
      :data="GoodsList"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="编号" sortable width="80"></el-table-column>
      <el-table-column prop="goodsname" label="名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="$preImg+scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column label="新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
        :page-size="GoodsSize"
        layout="prev, pager, next"
        :total="GoodsTotal"
        :current-page="GoodsPage"
        @current-change="changeCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";
// 引入请求数据接口文件
import { reqGoodsDel } from "../../../util/request";
// 公用弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  computed: {
    ...mapGetters({
      GoodsList: "goods/GoodsList", // 列表数据
      GoodsTotal: "goods/GoodsTotal", // 总数
      GoodsSize: "goods/GoodsSize", // 一页条数
      GoodsPage: "goods/GoodsPage", // 当前页数
    }),
  },
  methods: {
    ...mapActions({
      GoodsListActions: "goods/GoodsListActions", // 列表请求
      GoodsTotalActions: "goods/GoodsTotalActions", // 总数请求
      GoodsPageActions: "goods/GoodsPageActions", // 当前页请求
    }),
    // 点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      //点击了确定，发起删除请求
      reqGoodsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.GoodsTotalActions(); // 总数
          this.GoodsListActions(); // 列表
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 当前页
    changeCurrentPage(page) {
      this.GoodsPageActions(page);
    },
  },
  mounted() {
    this.GoodsListActions(); // 进入分类管理就触发列表请求
    this.GoodsTotalActions(); // 总数请求
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
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