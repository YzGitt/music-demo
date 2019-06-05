<template>
  <div>
    <div class="header">
      <div class="box">
          <h1 class="fl">
            <a href="/">Huluobos</a>
            <img src="@/assets/huluoboslogo.png" alt="" >
          </h1>
        <div class="listNav fl">
          <router-link to="/music" class="nav">音乐</router-link>
          <router-link :to="'/playlist?userId='+ userId" class="nav">个人收藏</router-link>
          <router-link to="/redio" class="nav">电台</router-link>
          <router-link to="/mv" class="nav">MV</router-link>
          <!--<router-link to="/web" class="nav">web相关</router-link>-->
          <!--<router-link to="/" class="nav">电影</router-link>-->
          <!--<router-link to="/picture" class="nav">照片</router-link>-->
          <!--<router-link to="/comment" class="nav">评论</router-link>-->
        </div>
        <div class="fr myxuanyan clearfix">
          <!--<router-link to="/thankyou" class="a">时光荏苒、承蒙不弃 </router-link>-->
          <div class="search fl" @keyup.enter="submit">
            <el-input
              class="inp"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input21"
            >
            </el-input>
          </div>
          <!--<router-link to="/thankyou" class="a">时光荏苒、承蒙不弃 </router-link>-->
          <!--<router-link to="/login" class="b" v-if="userId"><img :src="userInfo.avatarUrl" alt=""></router-link>-->
          <!---->
          <el-dropdown class="b fl" style="height: 46px;" v-if="userId"  @command="handleCommand">
            <router-link to="#" class="b" ><img :src="userInfo.avatarUrl" alt=""></router-link>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="logoutUser">退出登录</el-dropdown-item>
              <el-dropdown-item command="thank">鸣谢</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to="/login" class="b" v-else><img src="@/assets/smile.png" alt=""></router-link>
        </div>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>
<script>
  import {mapState}from 'vuex'
	export default {
		name: "playMusic",
    inject:["reload"],
        data(){
			return{
				userId:"",   //用户登录状态
        input21:"",//搜索
            }
        },
        mounted(){
			      var that= this
	        that.userId = localStorage.getItem("userId");
          this.$store.dispatch("getUserData")
        },
        computed:{
          ...mapState(["userInfo"])
        },
        methods: {
          //搜索
          submit() {
            this.$router.push("/search");
            this.reload()
            localStorage.setItem("search", this.input21)
          },
          //退出登录
          handleCommand(command) {
            if (command === "logoutUser") {
              localStorage.clear()
              this.reload()
              this.$axios.get("logout").then(res => {
                if (res.code === 200) {
                  this.$message({
                    center: true,
                    showClose: true,
                    message: "您的网易云账户已经退出成功.....",
                    type: "success"
                  });

                }
              })
            }
            if (command === "thank") {
              this.$router.push("/thankyou");
            }
            if (command === "a") {
              this.$router.push("/preson");
            }
          }
        }
	}
</script>
<style scoped>
  .header{
    /*width: 100%;*/
    box-sizing: border-box;
    background: #242424;
    border-bottom: 1px solid #000;
    height: 70px;
  }
  .box{
    width: 1100px;
    margin: 0 auto;
    height: 70px;
  }
  .box h1{
    height: 70px;
    line-height: 70px;
    position: relative;
    cursor: pointer;
    margin-right: 20px;
    display: inline-block;
    width: 200px;
    text-align: center;
      text-align: center;
  }
  .box h1 a{
    font-family: "仿宋";
  }
  .box h1 img{
    border: none;
    display: block;
    height: 40px;
    position: absolute;
    top: 14px;
    left: 150px;
  }
  .myxuanyan .search{
    width: 158px;
    height: 70px;
    border-radius: 32px;
    padding-right: 80px;
  }
  .myxuanyan .search input{
    width: 95%;
    margin: 0;
    padding: 0;
    background: transparent;opacity: 1;

  }
  .listNav{
    display: inline-block;
    height: 70px;
    line-height: 70px;
  }
  .listNav .nav{
    display: inline-block;
    width: 94px;
    height: 70px;
    color: #ccc;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .listNav .nav:hover{
    background-color: #000;
    color: #fff;
  }
  .myxuanyan{
    height: 70px;
    line-height: 70px;
    color: #ccc;
    cursor: pointer;
    user-select: none;
    position: relative;
  }
  .myxuanyan .a {
    padding-right:50px;
    display: block;
  }
  .myxuanyan .b img{
    height: 40px;
    position: absolute;
    top: 15px;
    right: 0;
  }

  .border{
    background-color: #C20C0C;
    height: 5px;
  }
</style>

