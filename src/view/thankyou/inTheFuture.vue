<template>
    <div>
        <headerDom></headerDom>
        <div class="content">
           <div class="title">对未来的展望</div>
            <div class="text">
                <div class="myCover">音乐的模块以后还是要做的，播放器会优化。推送的音乐还要加上网易云热歌的推送。还会增加个人收藏夹的整理操作，</div>
                <div class="myCover">网易云现有功能有个现象是从a歌单想要移到b歌单，批量选中后收藏到a歌单后，这些选中的歌曲还在b中存储。<br/>这个想要优化咯。功能暂定“移动选中的歌曲”。</div>
                <div class="myCover">web相关主推一些web学习资料</div>
                <div class="myCover">电影这个就是会做一个电影站的导航，可以免费看的新出电影那种。</div>
                <div class="myCover">照片的话...我觉得还是保留比较好，等自己有女朋友了在这里存照片就好了（秀本秀）</div>
                <div class="myCover">评论就是做个类似qq空间的东西，来了别跑堂，记得踩踩QAQ.</div>
                <div class="myCover">当然了，最重要的还是要把我平日里写的乱糟糟的找个模块装进去。</div>
                <div class="myCover"></div>

            </div>
            <p style="text-align: right;">
              最后，我承认，我做的很垃圾。<br/>你不用再强调了好吧！
            </p>
        
        </div>
    </div>

</template>

<script>
	import headerDom from "@/components/header";

	export default {
		name: "index",
		components: {
			headerDom,
		},
	}
</script>

<style scoped>
  .title {
        text-align: center;
        font-size: 30px;
        color: #000;
        font-family: '微软雅黑';
        font-weight: 700;
        height: 75px;
        line-height: 75px;
    }
    .content {
        width: 1100px;
        margin: 20px auto;
        padding-top: 30px;
        box-sizing: border-box;
    }

  
    .text{
       margin-top: 50px;
    }

    p {
        font-size: 16px;
        color: #333;
        line-height: 34px;
        text-indent: 2em;
    }
     .myCover {
        font-size: 16px;
        color: #333;
        line-height: 34px;
        text-align: center;
        padding: 20px 0;
    }
</style>
