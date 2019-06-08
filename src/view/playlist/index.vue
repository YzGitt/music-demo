<template>
    <div>
        <headerDom></headerDom>
        <div class="content">
            <el-table :data="loveMusicListDetail" stripe style="width: 100%;min-height: 900px;">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column prop="coverImgUrl" label="图片" width="250">
                    <template slot-scope="scope">
                        <img :src="scope.row.coverImgUrl" alt style="max-height:150px;width:150px;display:block">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="歌单名称"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="日期"
                        sortable
                        width="200">
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button  size="large" @click="toDetail(scope.row.id,scope.row.name)">查看歌单列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
	import headerDom from "@/components/header";
	export default {
		name: "index",
        data(){
			return{
				loveMusicListDetail:[]
        }
        },
		components: {
			headerDom,
		},
        methods:{
	        // 网易云登录后获取我的收藏的歌单 拿到歌单的id
	        getMusicList(){
		        let that = this
                var userId = that.$route.query.userId
		        that.$axios.get("myMusiclist",{uid:userId}).then(result=>{
			        that.loveMusicListDetail = result.playlist   //0 是我喜欢，其他是别的歌单
                    for (var i=0;i<that.loveMusicListDetail.length;i++){
	                    that.loveMusicListDetail[i].time =  new Date((that.loveMusicListDetail[i].createTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
                    }
		        }).catch(error=>{
			        console.log(error);
		        })
	        },
            //去每个歌单的列表页
	        toDetail(id,name){
		        this.$router.push("/music?id="+id + "&name=" + name)
	        },
	        //获取歌单的所有收藏者
	        toUseList(id){
		        this.$router.push("/playlist/uselist?id="+id)
            },
        },
        created(){
	        this.getMusicList()
        },
	}
</script>

<style scoped>
    .content{
        width: 1100px;
        margin: 50px auto 0;
    }
</style>
