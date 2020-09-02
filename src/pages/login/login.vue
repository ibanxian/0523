<template>
  <div class="login">
    <div class="con">
      <h3>登入</h3>
      <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
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
    };
  },
  methods: {
    ...mapActions({
      InfoActions: "user/InfoActions", // 用户数据请求
    }),
    login() {
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
  margin-bottom: 15px;
}
.btn-box {
  text-align: center;
}
</style>>