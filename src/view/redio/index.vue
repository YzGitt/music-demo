<template>
      <div>
        <headerDom></headerDom>
        <div class="g-bd">
          <div class="g-wrap">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="(item,index) in bannerListdj" :key="index">
                <div class="elementimgbox" style="">
                  <img :src="item.imageUrl"  style="display: block;" alt="这个图片可能上天了....">
                </div>
              </el-carousel-item>
            </el-carousel>
            <div class="redio-top f-cb">
              <div class="left fl">
                  <div class="redio-title f-cb">
                      <h3 class="fl"><a href="#" class="a-right">推荐节目</a></h3>
                      <!--<a href="#" class="a-left more">更多></a>-->
                  </div>
                  <ul class="redio-lis">
                    <li class="itm" v-for="(dj,index) in Djlis" :key="index">
                      <a href="#" class="a-left fl">
                        <img :src="dj.picUrl" alt="">
                      </a>
                      <div class="cnt fl">
                        <h3 class="f-thide">
                          <router-link :to="{name:'Djxq',params:{id: dj.id}}" href="#" class="s-fcl" >
                            {{dj.copywriter}}
                          </router-link>
                        </h3>
                        <p class="f-thide">
                          <router-link :to="{name:'Djxq',params:{id: dj.id}}" href="#" class="s-fc4" >
                            {{dj.name}}
                          </router-link>
                        </p>
                      </div>
                      <p href="#" class="tag">
                        {{dj.category}}
                      </p>
                    </li>
                  </ul>
              </div>
              <div class="right fr">
                <div class="redio-title">
                  <h3 class="fl"><a href="#" class="a-right">我订阅的电台（{{count}}）</a></h3>
                  <router-link  to="#" class="a-left more">更多></router-link>
                </div>
                <ul class="redio-lis">
                  <li class="itm" @mouseenter="enter1(index)" @mouseleave="leave1(index)" v-for="(mydj,index) in djFollow" :key="index">
                    <a href="#" class="a-left fl">
                      <img :src="mydj.picUrl" alt="">
                      <i class="u-bub u-bub-1">
                        <b class="f-alpha">
                          <em>{{mydj.newProgramCount}}</em>
                        </b>
                      </i>
                    </a>
                    <div class="cnt fl">
                      <h3 class="f-thide">
                        <router-link :to="{name:'Djxq',params:{id: mydj.id}}"  class="s-fcl">
                          {{mydj.name}}
                        </router-link>
                      </h3>
                      <p class="f-thide">
                        <router-link  :to="{name:'Djxq',params:{id: mydj.id}}" class="s-fc4">
                          by {{mydj.dj.nickname}}
                        </router-link>
                      </p>
                    </div>
                    <!--<el-button type="danger" icon="el-icon-delete" circle class="btn" v-show="flag1&&cindex===index"></el-button>-->
                    <span class="tag">
                      {{mydj.programCount}}期
                    </span>
                  </li>
                </ul>
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
      data(){
          return{
            flag:false,//点击图片播放
            flag1:false,//鼠标走过显示删除按钮
            Djlis:[],//电台推荐列表
            djFollow:[],//订阅的电台列表
            bannerListdj:[],//轮播图
            cindex:-1,//控制单行操作显隐
            count:1,//订阅的电台数
          }
      },
        components:{
          headerDom
        },
      methods:{
          //获取轮播图
        getBanner() {
          this.$axios.get("banner").then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.bannerListdj = res.banners
            }
          }).catch(error => {
            console.log(error);
          })
        },
        enter1(i){
          this.cindex = i
          this.flag1=true
        },
        leave1(i){
          this.cindex = -1
          this.flag1=false
        },
        //获取推荐电台
        getDj(){
          this.$axios.get("djRec").then(res=>{
            console.log(res.djRadios);
            if (res.code===200){
                this.Djlis=res.djRadios;
            }
          }).catch(error=>{
            console.log(error);
          })
        },
        //获取用户订阅电台
        getUserDJ(userId){
          this.$axios.get("djSub",{limit:10}).then(res=>{
            console.log(res);
            if (res.code===200){
              this.count=res.count
                this.djFollow=res.djRadios
            }
          }).catch(error=>{
            console.log(error);
          })
        },
        //更多用户的订阅
        //点击进入电台详情
        djDetail(id){

        }
      },
      created(){
          this.getDj();
        this.getBanner()
      },
      mounted(){
          let id=localStorage.getItem("userId");
          this.getUserDJ(id)
      }
    }
</script>

<style lang="scss" scoped>
div{
  /*background: #f5f5f5;*/
  .g-bd{
    width: 980px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
    .g-wrap{
      padding: 40px;
      background-color: #fff;
      .elementimgbox{
        background-color: rgb(4,22,43);
        margin: 0 auto;
        /*width: 1100px;*/
        img{
          width: 900px;
          height: 300px;
        }
      }
      .redio-top{
        margin-top: 10px;
        .left{
          width: 426px;
          .redio-title{
            height: 40px;
            width: 426px;
            border-bottom: 2px solid #c20c0c;
            position: relative;
            h3{
              font-size: 24px;
              width: 120px;
              a{
                cursor: pointer;
                color: black;
              }
              .a-right{
                font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
              }
            }
            .a-left{
              color: #666;
              position: absolute;
              right: 0;
            }
            .more{
              /*float: right;*/
              margin-top: 14px;
            }
          }
          .redio-lis{
            height: 600px;
            border: 1px solid #e2e2e2;
            border-top: none;
            .itm{
              width: 424px;
              height: 40px;
              padding: 10px 0;
              line-height: 40px;
              .a-left{
                margin-left: 20px;
                width: 40px;
                height: 40px;
                position: relative;
                display: block;
                img{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
                .ply{
                  position: absolute;
                  width: 30px;
                  height: 30px;
                  top: 50%;
                  left: 50%;
                  overflow: hidden;
                  margin: -7px 0 0 -6px;
                  background-position: 0 -85px;
                }
              }
              .cnt{
                width: 254px;
                margin: 1px 0 0 10px;
                line-height: 20px;
                .f-thide{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                  .s-fcl{
                    color: #333;
                  }
                  .s-fc4{
                    color: #999;
                  }
                }
              }
              .tag{
                margin: 1px 0 0 10px;
                display: inline-block;
                position: relative;
                top: -1px;
                height: 16px;
                overflow: hidden;
                padding: 0 6px;
                border: 1px solid #999;
                line-height: 16px;
                color: #999;
                vertical-align: middle;
                font-size: 12px;
              }
            }
          }
        }
        .right{
          width: 426px;
          .redio-title{
            height: 40px;
            width: 426px;
            border-bottom: 2px solid #c20c0c;
            position: relative;
            h3{
              font-size: 24px;
              a{
                cursor: pointer;
                color: black;
              }
              .a-right{
                font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
              }
            }
            .a-left{
              color: #666;
              position: absolute;
              right: 0;
            }
            .more{
              /*float: right;*/
              margin-top: 14px;
            }
          }
          .redio-lis{
            height: 600px;
            border: 1px solid #e2e2e2;
            border-top: none;
            .itm{
              width: 424px;
              height: 40px;
              padding: 10px 0;
              line-height: 40px;
              border-bottom: 1px solid #e7e7e7;
              .a-left{
                margin-left: 20px;
                width: 40px;
                height: 40px;
                position: relative;
                display: block;
                img{
                  display: block;
                  width: 100%;
                  height: 100%;
                }
                .u-bub{
                  position: absolute;
                  top: -10px;
                  right: -15px;
                  width: 29px;
                  display: block;
                  zoom: 1;
                  height: 22px;
                  color: #fff;
                  text-align: center;
                  line-height: 23px;
                  font-weight: bold;
                  .f-alpha{
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 22px;
                    width: 25px;
                    background-color: rgba(	220,20,60,.5);
                    border-radius: 50%;
                  }

                }

              }
              .cnt{
                width: 254px;
                margin: 1px 0 0 10px;
                line-height: 20px;
                .f-thide{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                  .s-fcl{
                    color: #333;
                  }
                  .s-fc4{
                    color: #999;
                  }
                }
              }
              .btn{
                opacity: 0.5;
              }
              .tag{
                margin: 1px 5px 0 10px;
                /*line-height: 16px;*/
                float: right;
                color: #999;
              }
            }
          }
        }
      }
    }
  }

}

</style>
