<template>
    <div>
      <headerDom></headerDom>
      <div class="wraper">
        <div class="wraper-1">
          <div class="search-input" @keyup.enter="submitSearch">
            <el-input v-model="input" placeholder="请输入搜索内容">
              <el-button slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
            </el-input>
          </div>
          <div class="search-res">
            <div class="txt">
              <span>搜索"{{searchDataName}}",，找到 {{songCount}}个结果，</span>
            </div>
            <ul class="ul-box clearfix">
              <li :class="{'li-box':'searchsong'===this.$route.name}" style="border-left: 1px solid #eee">
                <router-link :to="{name:'searchsong'}"><em>单曲</em></router-link>
              </li>
              <li :class="{'li-box':'searchmv'===this.$route.name}">
                <router-link :to="{name:'searchmv'}"><em>MV</em></router-link>
              </li>
              <li :class="{'li-box':'searchdj'===this.$route.name}">
                <router-link :to="{name:'searchdj'}"><em>电台</em></router-link>
              </li>
            </ul>
            <div class="content">
              <keep-alive>
                <router-view @getCount="getVal" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import headerDom from "@/components/header";
    export default {
        name: "index",
        inject:["reload"],
      components:{
        headerDom
      },
      data(){
          return{
            input:"",
            songCount:1,
            searchDataName:"",
            searchWhat:"首歌曲"
          }
      },
      methods:{
        submitSearch(){
          localStorage.setItem("search",this.input)
          this.reload()
        },
        getVal(msg){//msg就是传过来的数据了  这只是个形参  名字可以随意
          this.songCount=msg;//然后将数据赋值给chindVal
        }
      },
      mounted(){
          this.searchDataName=localStorage.getItem("search");
      }
    }
</script>

<style lang="scss" scoped>
.wraper{
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  .wraper-1{
    padding: 40px;
    background-color: #fff;
    .search-input{
      width: 320px;
      height: 40px;
      margin: 0 auto;
      .el-input{
        width: 320px;
      }
    }
    .search-res{
      padding-top: 47px;
      .txt{
        margin: 28px 0 17px;
      }
      .ul-box{
        height: 39px;

        li{
          float: left;
          height: 39px;
          font-size: 14px;
          width: 108px;
          margin: 0 auto;
          text-align: center;
          border-right: 1px solid #eee;
          box-sizing: border-box;
          a{
            padding-left: 2px;
            margin: 0 auto;
            color: #333;
            em{
              padding: 2px 2px 0 0;
              line-height: 37px;
              cursor: pointer;
              text-align: center;
            }
          }
        }
        .li-box{
          border-top: 3px solid red;

        }
      }
      .content{
        padding-top: 10px;
      }
    }
  }
}
</style>
