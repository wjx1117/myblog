<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理后台登录</span>
      </div>
      <el-form
        :model="admin"
        status-icon
        :rules="rules"
        ref="admin"
        label-width="100px"
        class="demo-admin"
      >
      <el-form-item label="用户名" prop="account">
          <el-input v-model="admin.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="admin.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox v-model="admin.rember" label="记住我">记住我</el-checkbox>
          <el-button type="primary" @click="submitForm('admin')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
</template>
<script>
export default {
  name: "Login",
  data() {
    var checkAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      admin: {
        password: localStorage.getItem("password") || "",
        account: localStorage.getItem("account") || "",
        rember: localStorage.getItem("rember") == 1 || false
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur"}]
      },
    };
  },
  methods: {
    submitForm() {
      let params = {
        account : this.admin.account,
        password : this.admin.password
      }
      this.$api.login.login(params)
      .then(res => {
        if(res.data.code == 200) {
          this.$store.state.id = res.data.data.id
          this.$store.state.account = res.data.data.account
          this.$store.state.token = res.data.data.token

          if(this.admin.rember) {
            localStorage.setItem("account",this.admin.account)
            localStorage.setItem("password",this.admin.password)
            localStorage.setItem("rember",this.admin.rember ? 1 : 0)
          }

          this.$message({
            message: '登陆成功',
            type: 'success',
            center: true
          });

          this.$router.push('/dashboard/article')
        } else {
          this.$message({
            message: '登陆失败',
            type: 'error',
            center : true
          });
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
};
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
</style>