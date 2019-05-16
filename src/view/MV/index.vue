<template>
    <div>
      <headerDom></headerDom>
          <div class="wraper">
            <div class="wraper-1">
                <div class="top">
                  <h2>MV推荐</h2>
                </div>
                <ul class="mv-uls clearfix">
                  <li class="mv-list" v-for="(mv,index) in AllMv" :key="index">
                    <router-link :to="{name:'MvPlay',params:{id: mv.id}}">
                      <div class="img">
                        <img :src="mv.picUrl" alt="">
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
                        <img class="bgc" src="../../view/MV/imgs/MV.png"></img>
                        {{mv.name}}
                      </router-link>
                    </h4>
                    <h5 class="name f-thide">
                      <router-link to="#" class="name-a">{{mv.artistName}}</router-link>
                    </h5>
                  </li>
                </ul>
                <div class="top">
                <h2>MV排行</h2>
              </div>
                <ul class="mv-uls clearfix">
                <li class="mv-list" v-for="(mv,index) in mvRites" :key="index">
                  <router-link :to="{name:'MvPlay',params:{id: mv.id}}" >
                    <div class="img">
                      <img :src="mv.cover" alt="">
                      <p class="p-tr">
                        {{mv.playCount>10000?mv.playCount/10000+"万":mv.playCount}}
                      </p>
                      <p class="p-bl">
                      </p>
                    </div>
                  </router-link>
                  <h4  class="title f-thide">
                    <router-link to="#" class="title-h4">
                      <img class="bgc" src="../../view/MV/imgs/MV.png"></img>
                      {{mv.name}}
                    </router-link>
                  </h4>
                  <h5 class="name f-thide">
                    <router-link to="#" class="name-a">{{mv.artistName}}</router-link>
                  </h5>
                </li>
              </ul>
                <div class="top">
                <h2>我收藏的MV</h2>
              </div>
                <ul class="mv-uls clearfix">
                <li class="mv-list" v-for="(mv,index) in mvMycol" :key="index">
                  <router-link :to="{name:'MvPlay',params:{id: mv.vid}}" >
                    <div class="img">
                      <img :src="mv.coverUrl" alt="">
                      <p class="p-tr">
                        {{mv.playTime>10000?mv.playTime/10000+"万":mv.playTime}}
                      </p>
                      <p class="p-bl">
                        {{mv.durationms | formatDate}}
                      </p>
                    </div>
                  </router-link>
                  <h4  class="title f-thide">
                    <router-link to="#" class="title-h4">
                      <img class="bgc" src="../../view/MV/imgs/MV.png"></img>
                      {{mv.title}}
                    </router-link>
                  </h4>
                  <h5 class="name f-thide">
                    <router-link to="#" class="name-a">{{mv.creator[0].userName}}</router-link>
                  </h5>
                </li>
              </ul>
            </div>
          </div>
    </div>
</template>

<script>
import headerDom from "@/components/header";
import {formatDate} from "@/filters/filter"
    export default {
        name: "index",
      components:{
        headerDom
      },
      data(){
          return{
            AllMv:[],//推荐MV
            mvRites:[],//mv排行
            mvMycol:[],//收藏的mv
          }
      },
      methods:{
          //推荐MV
          getAllMv(){
            this.$axios.get("mvLized").then(res=>{
              if (res.code===200){
                this.AllMv=res.result;
              }
            })
          },
        //mv排行
          getMvRite(){
            this.$axios.get("mvRite",{limit:10}).then(res=>{
              if (res.code===200){
                this.mvRites=res.data
              }
            })
          },
        //我收藏的MV
        getMyMv(){
          this.$axios.get("MvCol",{limit:10}).then(res=>{
            console.log(res);
            if (res.code===200){
              this.mvMycol=res.data
            }
          })

        }
      },
      filters:{
        formatDate(time){
          return formatDate(time)
        },
      },
      created(){
          this.getAllMv()
          this.getMvRite()
          this.getMyMv()
      }
    }
</script>

<style lang="scss" scoped>
.wraper{
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  .wraper-1{
    padding: 40px;
    background-color: #fff;
    /*height: 893px;*/
    .top{
      border-bottom: 1px solid red;
      padding: 10px;
      h2{
        font-size: 20px;
        font-weight: 700;
      }
    }
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
  }
}
</style>
