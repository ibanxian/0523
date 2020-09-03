<template>
  <div class="login">
    <div class="con">
      <h3>登入</h3>
      <el-form :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="输入密码" clearable show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUserLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      InfoActions: "user/InfoActions", // 用户数据请求
    }),
    login() {
      // 正则
      if (this.user.username == "") {
        warningAlert("请输入账户");
        return;
      }
      if (this.user.password == "") {
        warningAlert("请输入密码");
        return;
      }
      reqUserLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("登陆成功");
          //将用户信息保存 vuex
          this.InfoActions(res.data.list);
          this.$router.push("/");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #5b3243, #2b3d5f);
  position: fixed;
  left: 0;
  top: 0;
}
.con {
  width: 380px;
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
}
.el-input {
  margin-bottom: 5px;
}
.el-form-item {
  margin-bottom: 25px;
}
.btn-box {
  text-align: center;
}
</style>>