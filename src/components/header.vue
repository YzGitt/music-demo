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
          <router-link to="/inTheFuture" class="nav">站点规划</router-link>
            <!-- <router-link to="/mv" class="nav">MV</router-link> -->
          <router-link to="/web" class="nav">web相关</router-link>
          <router-link to="/movie" class="nav">电影</router-link>
          <router-link to="/picture" class="nav">照片</router-link>
          <router-link to="/comment" class="nav">评论</router-link>
        </div>
        <div class="fr myxuanyan">
          <router-link to="/thankyou" class="a">时光荏苒、承蒙不弃 </router-link>
          <!-- <router-link to="/" class="b" v-if="userId"><img :src="userInfo.avatarUrl" alt=""></router-link> -->
          <router-link to="/" class="b"><img src="@/assets/smile.png" alt=""></router-link>
        </div>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>
<script>
  // import {mapState}from 'vuex'
	export default {
		name: "playMusic",
        data(){
			return{
				userId:localStorage.getItem("userId"),   //用户登录状态
            }
        },
        mounted(){
            var that= this
            
          // this.$store.dispatch("getUserData")
        },
        created(){

        }
        // computed:{
        //   ...mapState(["userInfo"])
        // },
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
    width: 190px;
    color: #ccc;
    cursor: pointer;
    user-select: none;
    position: relative;
  }
  .myxuanyan .a {
    display: inline-block;
    width: 145px;
    height: 70px;
    float: left;
  }
  .myxuanyan .b{
    float:right;
    width: 55px;
     height: 70px;
    display: inline-block;
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

