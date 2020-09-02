<template>
  <div>
    <el-table
      :data="ClassList"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="$preImg+scope.row.img" />
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
  </div>
</template>

<script>
// 引入vuex状态辅助函数
import { mapGetters, mapActions } from "vuex";
// 引入请求数据接口文件
import { reqCateDel } from "../../../util/request";
// 公用弹窗文件
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  computed: {
    ...mapGetters({
      ClassList: "classify/ClassList", // 列表数据
    }),
  },
  methods: {
    ...mapActions({
      ClassListAction: "classify/ClassListAction", // 列表请求
    }),
    // 点击了编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      //点击了确定，发起删除请求
      reqCateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 进入分类管理就触发列表请求
    this.ClassListAction();
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>