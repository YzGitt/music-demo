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
        <div class="rihht" @click="showSet">没有账号请注册</div>
        <div class="zhuyi">注 ：请使用网易云账户的手机号和密码登录</div>
      </div>
      <div class="line">
        <el-button size="medium " type="danger" round @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
    </div>
    <el-dialog title="注册" :visible.sync="dialogFormVisible"  :modal-append-to-body="false">
      <el-form :model="addform" label-width="80px" :rules="rules" ref="addUserForm">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addform.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addform.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="addform.captcha" auto-complete="off">
            <el-button slot="append" @click="daojishi">{{countAdd>0?this.countAdd:"获取验证码"}}</el-button>
          </el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeUsername" resetFields>取 消</el-button>
        <el-button type="primary" @click="closeUsernameyes('addUserForm')" resetFields>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNum: "13274319587", //登录所用的手机号 18332725321
      pwd: "Nanianxiatian123" , //登录所用的密码    zhang11111?
      addform:{
        phone: "",
        password: "",
        nickname: "",
        captcha: ""
      },//添加用户表单数据
      countAdd:'',//计时器数字
      timer:null,//计时器
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
      },//表单规则
      dialogFormVisible:false,
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
    },
    showSet(){
      this.dialogFormVisible=true
    },
    closeUsername(){
      this.dialogFormVisible=false
      this.$refs['addUserForm'].resetFields();
    },
    //关闭添加用户弹出框并清空表内数据，确认添加
    closeUsernameyes(formName){
      this.$refs[formName].validate(valid=>{
        this.$axios.get("conCaptcha",{phone:this.addform.phone,captcha:this.addform.captcha}).then(res=>{
          console.log(res);
          let flag =false;
          if (res.code===200){
            console.log(11);
            flag=true;
          } else{
            this.$message({
              message: "验证码错误",
              type: 'error'
            });
          }
        })
        console.log(flag);
        if (valid&&flag) {
          this.$axios.get("setUser",this.addform).then(res=>{
            console.log(res);
            if (res.code === 200){
              this.$message({
                message: "创建用户成功",
                type: 'success'
              });
              this.dialogFormVisible=false;
              this.$refs['addUserForm'].resetFields();
            }
          })
        }
        else{
          this.$message({
            message: "校验未通过",
            type: 'error'
          });
        }
      })

    },
    //验证码获取倒计时
     daojishi(){
      const count=60;
      if (!this.timer) {
        this.countAdd=count;
        this.timer=setInterval(()=>{
          this.countAdd--;
          if(this.countAdd<=0){
            clearInterval(this.timer)
          }
        },1000);
        this.$axios.get("getCaptcha",{phone:this.addform.phone}).then(res=>{
          if (res.code===200){
              //显示警告框
              this.$message({
                message: "已发送验证码",
                type: 'success'
              });
          } else{
            //显示警告框
            this.$message({
              message: "手机号码错误",
              type: 'error'
            });
            //停止计时器
            this.countAdd=0;
            clearInterval(this.timer);
          }
        })
      }
    },
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
.rihht{
  float: left;
  color: red;
  cursor: pointer;
}
.line .el-button {
  width: 80%;
  margin: 20px auto;
  display: block;
}
.line .el-button--danger {
  background-color: #c20c0c;
  border-color: #c20c0c;
}
</style>

