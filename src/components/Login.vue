<template>
  <div class="login_container">
    <!-- 登录盒子 -->
    <div class="login_box">
      <!-- 用户头像 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button @click="submitForm('loginFormRef')" type="primary"
            >登录</el-button
          >
          <el-button @click="resetForm('loginFormRef')" type="info"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单校验规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入登入名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) return this.$message.error("登陆失败");
        this.$message.success("登陆成功");
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem("token", res.data.token);
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_box .avater_box {
  height: 130px;
  width: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 5px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login_box .avater_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
