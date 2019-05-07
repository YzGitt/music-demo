<template>
  <div class="content">
    <div class="bt-top">
      <div class="title">
        <!--<h2>基于网易云的高质量音乐试听系统设计</h2>-->
        <h2>音乐试听系统</h2>
        <!---->
        <div class="py">Design of High Quality Music Audio System Based on Netease Cloud</div>
      </div>
    </div>
    <div class="login-box">
      <div class="use-login">用户登录</div>
      <div class="line">
        <div class="line-title">手机号：</div>
        <div class="line-input">
          <el-input placeholder="请输入手机号" v-model="phoneNum" clearable></el-input>
        </div>
      </div>
      <div class="line">
        <div class="line-title">密码：</div>
        <div class="line-input">
          <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        </div>
      </div>
      <div class="line">
        <div class="zhuyi">注 ：请使用网易云账户的手机号和密码登录</div>
      </div>
      <div class="line">
        <el-button size="medium " type="danger" round @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNum: "18332725321", //登录所用的手机号 18332725321
      pwd: "zhang11111?" //登录所用的密码    zhang11111?
    };
  },
  mounted() {
    var he = $(document).height();
    $(".content").height(he - 70);
  },
  methods: {
    login() {
      let that = this;
      if (that.phoneNum == "" || that.pwd == "") {
        this.$alert("手机号或者密码不能为空", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        // 网易云登录
        that.$axios
          .get("login", { phone: that.phoneNum, password: that.pwd })
          .then(res => {
            console.log(res);
            if (res.msg) {
              that.$alert({
                title: "成功提示的文案",
                type: "success",
                center,
                showIcon
              });
            }
            localStorage.setItem("userId", res.profile.userId);
            localStorage.setItem("nickname", res.profile.nickname);
            localStorage.setItem("avatarUrl", res.profile.avatarUrl);
            // localStorage.setItem("mytoken",res.profile)
            that.$message({
              center: true,
              showClose: true,
              message: "您的网易云账户已经登录成功.....",
              type: "success"
            });
            console.log(res);
            setTimeout(() => {
              that.$router.push("/");
            }, 1000);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.content {
  width: 100%;
  background-color: rgb(4, 22, 43);
}
.bt-top .title {
  max-width: 1100px;
  margin: 0 auto;
}
.bt-top .title h2 {
  text-align: center;
  color: #fafad2;
  font-size: 62px;
  font-family: "楷体";
}
.bt-top .title .py {
  text-align: center;
  color: #fafad2;
  font-size: 24px;
  font-family: "微软雅黑";
  letter-spacing: 4px;
}
.login-box {
  width: 800px;
  height: 450px;
  border: 3px solid #e8f0f5;
  border-radius: 8px;
  padding: 30px 60px;
  box-sizing: border-box;
  margin: 30px auto 0;
}
.use-login {
  color: #ffe4b5;
  font-size: 40px;
  text-align: center;
  height: 80px;
  line-height: 80px;
}
.login-box .line {
  height: 80px;
  line-height: 80px;
  width: 80%;
  margin: 0 auto;
}
.line .line-title {
  width: 100px;
  float: left;
  font-size: 18px;
  color: #fff;
}
.line .line-input {
  width: 80%;
  float: right;
}

.zhuyi {
  color: #999;
  float: right;
}
.el-button {
  width: 80%;
  margin: 20px auto;
  display: block;
}
.el-button--danger {
  background-color: #c20c0c;
  border-color: #c20c0c;
}
</style>

