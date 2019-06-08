<template>
  <div>
    <headerDom></headerDom>
    <div class="wraper">
      <div class="wraper-1">
        <div class="top">
          <h2 class="h2-top">
            <img class="bgc" src="../../../view/MV/imgs/MV.png"></img>
            {{mvDetail.name}}
            <span class="span-top">
            {{mvDetail.artistName}}
            </span>
          </h2>
        </div>
        <div class="video-box">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
        </div>
        <div class="centent">
          <h4>MV简介</h4>
          <p>发布日期:{{mvDetail.publishTime}}</p>
          <p>播放次数: {{mvDetail.playCount>=10000?mvDetail.playCount/10000+"万":mvDetail.playCount}}</p>
          <p class="p-xq">详情:{{mvDetail.desc}}</p>
        </div>
        <div class="rating">
          <h4>评论 <span>共{{count}}条评论</span></h4>
          <div class="box-rat">
            <div class="rat-img">
              <img :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="content-my clearfix">
              <div class="text-input">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入评论内容"
                  v-model="textarea"
                  maxlength="140">
                </el-input>
                <div class="btn-foot fr">
                  <span class="fonts">{{140-textarea.length}}</span>
                  <el-button type="primary" class=" btn" size="mini" @click="putRats">评论</el-button>
                </div>
              </div>
            </div>
          </div>
          <h4>评论 <span>共{{count}}条评论</span></h4>
          <div class="rating-hot">
            <p class="p-hot">热门评论</p>
            <ul>
              <li class="hot-text" v-for="(rat,index) in mvHotRat" :key="index">
                <div class="avg">
                  <img :src="rat.user.avatarUrl" alt="">
                </div>
                <div class="text-left">
                  <p class="p-hot-left"><span>{{rat.user.nickname}}：</span>{{rat.content}}</p>
                  <div class="hot-foot">
                    <span>{{rat.time | formatDate}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <p class="p-hot1">全部评论({{count}})条</p>
            <ul>
              <li class="hot-text" v-for="(rat,index) in mvAllRat" :key="index">
                <div class="avg">
                  <img :src="rat.user.avatarUrl" alt="">
                </div>
                <div class="text-left">
                  <p class="p-hot-left"><span>{{rat.user.nickname}}：</span>{{rat.content}}</p>
                  <div class="hot-foot">
                    <span>{{rat.time | formatDate}}</span>
                  </div>
                </div>
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
  import {formatDates}from"@/filters/filter"
  import {mapState} from "vuex"
    export default {
        name: "MvPlay",
        components:{
          headerDom
        },
      data() {
        return {
          mvDetail:{},//mv详情
          mvHotRat:[],//热门评论
          mvAllRat:[],//全部评论
          textarea:"",//评论内容
          count:0,//评论数
          playerOptions: {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "",
              src: "http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=d2be248e4cdb50965b30a0b52195d7c1&wsTime=1557145556" //视频url地址
            }],
            poster: "@/assets/668125.png", //你的封面地址
            // width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true,
              durationDisplay: true,
              remainingTimeDisplay: false,
              fullscreenToggle: true  //全屏按钮
            }
          },//vue视频播放器插件设置
        }
      },
      computed:{
        ...mapState(["userInfo"])
      },
      methods:{
          //mv详情
          getMvDetail(){
           const id = this.$route.params.id
            this.$axios.get("mvDetail",{mvid:id}).then(res=>{
              if (res.code===200){
                this.mvDetail=res.data
              }
            })
          },
          //mv播放url
          getMvUrl(){
            const id = this.$route.params.id
            this.$axios.get("mvUrl",{id:id}).then(res=>{
              if (res.code===200){
                // console.log(res);
                const url=res.data.url;
                this.playerOptions.sources[0].src=url
              }
            })
          },
          //获取热门MV评论
          getMvHot(){
            const id = this.$route.params.id
            this.$axios.get("HotRat",{id:id,type:1}).then(res=>{
              if (res.code===200){
                // console.log(res);
                this.mvHotRat=res.hotComments;
              }
            })
          },
          //获取全部评论
          getAllRat(){
            const id = this.$route.params.id
            this.$axios.get("mvRatings",{id:id}).then(res=>{
              if (res.code===200){
                console.log(res);
                this.mvAllRat=res.comments;
                this.count=res.total
              }
            })
          },
          //评论
          putRats(){
            const id = this.$route.params.id
            const txt=this.textarea
            this.$axios.get("putRat",{t:1,type:1,id:id,content:txt}).then(res=>{
              console.log(res);
              if (res.code===200){
                this.$message({
                  message: "评论成功",
                  type: 'success'
                });
              }
            })
          }
      },
      filters:{
        formatDate(time){
          var data = new Date(time);
          return formatDates(data,'yyyy-MM-dd')
        }
      },
      mounted(){
        this.getMvDetail()
        this.getMvUrl()
        this.getMvHot()
        this.getAllRat()
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
    .top{
      padding: 10px;
      .h2-top{
        font-size: 20px;
        font-weight: 700;
        .span-top{
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .centent{
      padding-top: 20px;
      h4{
        font-size: 18px;
        font-weight: 500;
        border-bottom:1px solid #ccc;
      }
      p{
        line-height: 18px;
        color: #999;
      }
      .p-xq{
        line-height: 18px;
        margin-top: 7px;
        color: #000;
      }
    }
    .rating{
      padding-top: 20px;
      .box-rat{
        margin-top: 20px;
        margin-bottom: 20px;
        .rat-img{
          float: left;
          width: 50px;
          height: 50px;
          margin-right: -100px;
          img{
            float: left;
            width: 50px;
            height: 50px;
            margin-right: -100px;
          }
        }
        .content-my{
          .text-input{
            margin-left: 62px;
            .btn-foot{
              clear: both;
              padding-top: 10px;
              .fonts{
                margin-right: 5px;
              }
            }
          }
        }
      }
      h4{
        font-size: 18px;
        font-weight: 500;
        border-bottom:1px solid #ccc;
        span{
          margin: 9px 0 0 20px;
          font-size: 12px;
          color: #666;
        }
      }
      .rating-hot{
        padding-top: 10px;
        .p-hot{
          font-size: 12px;
          color: red;
          height: 20px;
          font-weight: 700;
        }
        .hot-text{
          padding: 15px 0;
          border-top: 1px dotted #ccc;
          .avg{
            width: 50px;
            height: 50px;
            float: left;
            img{
              width: 50px;
              height: 50px;
              margin-right: -100px;
            }
          }
          .text-left{
            margin-left: 60px;
            .p-hot-left{
              span{
                color: #0c73c2;
                margin-right: 5px;
                -webkit-line-clamp:2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
            .hot-foot{
              margin-top: 15px;
              text-align: right;
              span{
                float: left;
                margin: 0 !important;
              }
            }
          }
        }
        .p-hot1{
          padding-top: 23px;
          font-size: 12px;
          color: #333;
          height: 20px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
