<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in RoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入vuex仓库
import { mapGetters, mapActions } from "vuex";
// 引入请求数据axios
import {
  reqUserAdd,
  reqUserDetail,
  reqUserUpdate,
} from "../../../util/request";
// 引入公用提示
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      RoleList: "role/RoleList", // 角色
      UserTotal: "manage/UserTotal", // 总数
    }),
  },
  data() {
    return {
      formLabelWidth: "120px",
      // 初始数据
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      RoleListAction: "role/RoleListAction", // 获取角色请求
      UserListActions: "manage/UserListActions", // 获取列表请求
      UserTotalActions: "manage/UserTotalActions", // 获取总数的请求
    }),
    // 弹窗消失后动作
    close() {
      !this.info.isAdd && this.empty();
    },
    // 重置数据
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 点击了取消按钮
    cancel() {
      this.info.isShow = false;
    },
    // 正则规则
    reg() {
      this.isok = true;
      if (this.form.roleid == "") {
        warningAlert("所属角色不能为空");
        this.isok = false;
        return;
      }
      if (this.form.username == "") {
        warningAlert("用户名称不能为空");
        this.isok = false;
        return;
      }
      if (this.form.password == "") {
        warningAlert("密码不能为空");
        this.isok = false;
        return;
      }
    },
    // 点击了添加按钮
    add() {
      this.reg();
      this.isok &&
        reqUserAdd(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.empty(); // 重置数据
            this.cancel(); // 关掉窗口
            this.UserListActions(); // 刷新列表
            this.UserTotalActions(); // 请求总数
          } else {
            warningAlert(res.data.msg);
          }
        });
    },
    // 父组件调用子组件的方法 查看某个数据
    look(id) {
      reqUserDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    // 点击了修改按钮
    update() {
      this.reg();
      this.isok &&
        reqUserUpdate(this.form).then((res) => {
          if (res.data.code == 200) {
            this.cancel(); // 弹窗消失
            this.empty(); // 重置数据
            this.UserListActions(); // 刷新列表
          }
        });
    },
  },
  mounted() {
    // 判断有没有角色数据,没有就触发请求下
    if (this.RoleList.length == 0) {
      this.RoleListAction();
    }
  },
};
</script>

<style scoped>
.el-input,
.el-select {
  width: 300px;
}
.el-select-dropdown__item i:before {
  padding-right: 10px;
}
</style>