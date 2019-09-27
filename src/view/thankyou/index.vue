<template>
    <div>
        <headerDom></headerDom>
        <div class="content">
           <div class="title">SanYa</div>
            <div class="text">
                <div class="myCover"> “Hi! SanYa. How are you?” </div>
                <div class="myCover"> “I am ok!” </div>
                <div class="myCover"> “  嗯.......... ” </div>
                <div class="myCover"> 时光荏苒，路就在脚下。 </div>
                <div class="myCover"> 感情还需岁月磨练，平静自然了于心间。</div>
                <div class="myCover">Huluobos！NoZuoNoDieCanFly！</div>
            </div>
        
            <p style="text-align: right;">
                至此 , 敬上 !<br/>
                  Coder：Huluobos
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
        margin: 0px auto;
        /* padding: 0 200px; */
        box-sizing: border-box;
        position: fixed;
        top:100px;
        bottom: 70px;
        left: 0;
        right: 0;
    }

  
    .text{
       margin-top: 50px;
    }

    p {
        font-size: 16px;
        color: #333;
        line-height: 34px;
        text-indent: 2em;
        position: absolute;
        bottom: 30px;
        right: 30px;
    }
     .myCover {
        font-size: 16px;
        color: #333;
        line-height: 34px;
        text-align: center;
        padding: 20px 0;
    }
</style>
