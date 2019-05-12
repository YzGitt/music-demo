<template>
  <div>
    <ul class="mv-uls clearfix">
      <li class="mv-list" v-for="(mv,index) in AllMv" :key="index">
        <router-link :to="{name:'MvPlay',params:{id: mv.id}}">
          <div class="img">
            <img :src="mv.cover" alt="">
            <p class="p-tr">
              {{mv.playCount>10000?mv.playCount/10000+"万":mv.playCount}}
            </p>
            <p class="p-bl">
              {{mv.duration | formatDate}}
            </p>
          </div>
        </router-link>
        <h4  class="title f-thide">
          <router-link to="#" class="title-h4">
            <img class="bgc" src="@/assets/MV.png"></img>
            {{mv.name}}
          </router-link>
        </h4>
        <h5 class="name f-thide">
          <router-link to="#" class="name-a">{{mv.artistName}}</router-link>
        </h5>
      </li>
    </ul>
    <div class="paged">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "@/filters/filter"
    export default {
        name: "searchMv",
        data(){
          return{
            AllMv:[],//搜索到相关的MV
            pagenum:1,//当前第几页
            count:1,
              djCount :1,
              pag:1
          }
        },
      //过滤时间
      filters:{
        formatDate(time){
          return formatDate(time)
        }
      },
      methods: {
        getSearchMv() {
          const txt = localStorage.getItem("search")
          this.$axios.get("searchAll", {type: 1004, keywords: txt, offset: this.pagenum - 1}).then(res => {
            if (res.code === 200) {
              this.AllMv = res.result.mvs
              this.count = res.result.mvCount
            }
          })
        },
        handleCurrentChange(val) {
          console.log(val);
          this.pag = val * 10;
          this.getSearchMv()
        }
      },
      created(){
        this.getSearchMv()
        }
    }
</script>

<style lang="scss" scoped>
div{
  .mv-uls{
    padding-top: 11px;
    .mv-list{
      padding: 1px 0 25px 18px;
      float: left;
      width: 159px;
      line-height: 1.5;
      overflow: hidden;
      .img{
        width: 159px;
        height: 90px;
        position: relative;
        zoom: 1;
        img{
          width: 100%;
          height: 90px;
          border: 0;
        }
        .p-tr{
          position: absolute;
          top: 0;
          right: 0;
          padding-right: 5px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          box-sizing: border-box;
          text-align: right;
          text-shadow: -2px 1px rgba(0,0,0,.4);
          background-position: 0 0;
        }
        .p-bl{
          position: absolute;
          bottom: 0;
          left: 0;
          padding-left: 5px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-shadow: -2px 1px rgba(0,0,0,.4);
          background-position: 0 -25px;
        }
      }
      .f-thide{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
      .title{
        width: 100%;
        height: auto;
        margin: 7px 0 1px;
        border: none;
        font-size: 14px;
        font-weight: normal;
        .title-h4{
          color: #000;
          .bgc{
            width: 30px;
            height: 21px;
          }
        }
      }
      .name{
        width: 100%;
        font-weight: normal;
        .name-a{
          color: #666;
        }
      }
    }
  }
  .paged{
    margin: 30px auto 0px;
    display: flex;
    justify-content: space-around;
  }
    .paged{
        margin: 30px auto 0px;
        display: flex;
        justify-content: space-around;
    }
}
</style>
