<template>
    <div>
        <headerDom></headerDom>
        <div class="content">
            <div class="banner">
                <el-carousel :interval="5000"  arrow="always" height="400px">
                    <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                        <!--这不能放 key 轮播图会在后面自动加几个-->
                        <div class="elementimgbox" style="">
                            <img :src="item.imageUrl"  style="display: block;" alt="这个图片可能上天了....">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="text">
            <span class="strs" v-for="(item,index) in this.strs" :key="index">
              {{item}}
              <br v-if="item =='，'|| item =='。'||item =='：'||item =='”'"/>
              <div style="height: 1rem;" v-if="item =='\n'"></div>
            </span>
                <div class="weixin">
                    <img src="@/assets/weixin1.jpg" alt="">
                    <div class="wxTxt">微信：Yz丶</div>
                </div>

            </div>
            <!--卡巴斯基病毒防护插件-->
            <div class="kaBaSiJi-iframe">
                <!--<iframe width="900" height="640" src="https://cybermap.kaspersky.com/cn/widget/dynamic/light" frameborder="0"></iframe>-->
                <iframe width="100%" height="700" src="https://cybermap.kaspersky.com/cn/widget/dynamic/dark" frameborder="0"></iframe>
            </div>
        </div>

    </div>
</template>

<script>
	import headerDom from "@/components/header";
	import axios from "axios"
	export default {
		data(){
			return{
				//引号中不要有，或者。结尾
				word: "黄昏来到，还未上灯。" +
				"在落日的光辉中年轻的行人驾着车辇来了。" +
				"他的驾车的马，嘴里喷着白沫，他的衣袍上蒙着尘土。" +
				"他在我的门前下车，用疲乏的声音问：“她在哪里呢？”" +
				"因为深深害羞，我不好意思说出：“她就是我.愁倦的行人.她就是我！”",
				index:0,
				letter:[],
				strs:[],
				profile:{},//网易云登录信息
				loveMusicListid:"",//0 是我喜欢，其他是别的歌单  我喜欢歌单的id
				loveMusicList:[],  //我喜欢歌单 包含每首歌的名字和id

				bannerList:[],//网易云轮播图
			}
		},
		components: {
			headerDom,
			// myfooter,
		},
		mounted(){
			//字体打印机
			this.getArr(this.word)
		},
		methods:{
			//获取网易云主页轮播图
			getBanner(){
				this.$axios.get("banner").then(res=>{
					console.log(res)
					if (res.code==200){
						this.bannerList = res.banners
					}
				}).catch(error=>{
					console.log(error);
				})
			},
			//字体打印机
			getArr(txt){
				var that = this
				this.letter = txt.split("")
				var arr = this.letter
				this.forEacharr(arr)
			},
			forEacharr(arr){
				for(var i=0;i<arr.length;i++){
					this.timeoUT(arr[i],i)
				}
			},
			timeoUT(key,index){
				var that = this
				setTimeout(function () {
					that.strs.push(key)
				},index*200)
			},
		},
		created(){
			this.getBanner();
      this.$store.dispatch("getUserData")//获取用户信息
		},
	}
</script>

<style scoped>
    .content{
        width: 100%;
        /*background-color: #ECECEC;*/
        background-color: rgb(4,22,43);
    }
    .text{
        margin: 0 auto;
        width: 1100px;
        /*background-color: #ECECEC;*/
        min-height: 430px;
        padding: 2rem;
        position: relative;
        box-sizing: border-box;
    }
    .strs{
        font-family: "楷体";
        font-size: 20px;
        font-weight: 700;
        color: #ccc;
        line-height: 2rem;
    }
    .text .weixin{
        position: absolute;
        right: 16px;
        top: 50%;
        width: 250px;
        height: 320px;
        margin-top: -125px;
    }
    .text .weixin img{
        width: 250px;
        height: 250px;
        opacity: 0.8;
    }
    .text .weixin .wxTxt{
        text-align: center;
        color: #ccc;
        height: 40px;
        line-height: 40px;
        font-size: 1rem;
    }


    /*轮播图*/
    .banner{
        width: 100%;
        margin: 0 auto;
        height: 400px;
    }
    .elementimgbox{
        background-color: rgb(4,22,43);
        margin: 0 auto;
        width: 1100px;
    }
    .elementimgbox img{
        margin: 0 auto;
    }
    /*轮播图*/


    /*卡巴斯基病毒防护start*/
    .kaBaSiJi-iframe{
        width: 100%;
        margin: 0 auto;
    }
    /*卡巴斯基病毒防护end*/



</style>

