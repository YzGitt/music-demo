<template>
    <div>
        <headerDom></headerDom>
        <div class="content">
                <el-table :data="showMusicList" stripe style="width: 100%;min-height: 900px">

                    <el-table-column type="index" label="序号" width="50"></el-table-column>

                    <el-table-column type="selection" prop="" label="选择" width="50">

                    </el-table-column>

                    <el-table-column prop="al" label="图片" width="170">
                        <template slot-scope="scope">
                            <img
                                    :src="scope.row.al.picUrl"
                                    alt
                                    style="max-height:150px;width:150px;display:block"
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="歌名"></el-table-column>
                    <el-table-column prop="h.br" label="码率" width="100"></el-table-column>
                    <el-table-column prop="ar[0].name" label="明星"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="400">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="deleteMusicDetail(scope.row.id)">删除</el-button> -->
                        <el-button
                                size="mini"
                                type="danger"
                                @click="playMusic(scope.row.name,scope.row.id)"
                        >播放</el-button>
                    </template>
                </el-table-column>

                </el-table>


            <div class="paged">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="10"
                        @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </div>

    </div>

</template>

<script>
	import headerDom from "@/components/header";
	export default {
		name: "detail",
		components: {
			headerDom
		},
		data() {
			return {
				checkAll: false,  //是否全选
				checkedCities: [], //选完了的数组
				// cities: ['上海', '北京', '广州', '深圳'], // 数据渲染
				isIndeterminate: false,
                showMusicList:[], //展示的值
				loveMusicList:[],//获取的值
				total:0,



				 phoneNum:'18332725321',
                pwd:'Huluobos1',
            }
		},
		methods: {
			handleCurrentChange(val) {
				var endindex = val * 10;
				var startindex = val * 10 - 10;
				this.showMusicList = this.loveMusicList.slice(startindex, endindex);
			},
            // 网易云登录后获取我的收藏喜欢的歌单 拿到歌单的id

			// 拿到每首歌的信息
			getMyMusic(id) {
				let that = this
				that.$axios.get("myMusicDetail", { id: id,br:999000 }).then(result => {
		
					that.loveMusicList = result.playlist.tracks;
					that.total = result.playlist.trackCount;
					that.handleCurrentChange(1);
				}).catch(error => {
					console.log(error);
				});
			},
			//删除歌曲
			// deleteMusicDetail(key) {
			// 	let that = this
			// 	that.$axios.get("tracks", {op:'del', pid: that.$route.query.id,tracks: key}).then(res => {
			// 		console.log(res);
			// 		that.$message({
            //   			center: true,
            //   			showClose: true,
            //   			message: "删除成功.....",
            //   			type: "success"
            // 		});
			// 	}).catch(error => {
			// 		console.log(error);
			// 	});
			// },
			//播放音乐
			playMusic(item, key) {
				this.$axios.get("eachMusicUrl", { id: key }).then(res => {
					this.$notify({
						duration: 0,
						title: item,
						position: "bottom-right",
						dangerouslyUseHTMLString: true,
						message:
						'<audio controls="controls" loop="loop" autoplay="autoplay" src="' +
						res.data[0].url +
						'"></audio>'
					});
				}).catch(error => {
					console.log(error);
				});
			},
			 // 网易云登录
            // login() {
            //     let that = this;
            //     that.$axios.get("login", { phone: that.phoneNum, password: that.pwd }).then(res => {
            //         localStorage.setItem("userId", res.profile.userId);
            //         localStorage.setItem("nickname", res.profile.nickname);
            //         localStorage.setItem("avatarUrl", res.profile.avatarUrl);
            //         // localStorage.setItem("mytoken",res.profile)
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
                
            // },
            

        },
		created() {
			let that = this
			
			that.getMyMusic(that.$route.query.id)
			// that.login();
		},
	}
</script>

<style scoped>
    .content{
        width: 1100px;
        margin: 50px auto 0;
    }
    .el-checkbox-group label{
        display: block;
    }


    .paged {
        margin: 30px auto 0px;
        display: flex;
        justify-content: space-around;
    }

</style>