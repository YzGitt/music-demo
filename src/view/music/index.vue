<template>
  <div>
    <headerDom></headerDom>
    <div class="content">
      <div class="myMusic">
        <h2>歌单：<span class="wight">{{title}}</span></h2>
        <el-table :data="showloveMusicList" stripe style="width: 100%;min-height: 900px">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
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
              <el-button size="mini" @click="getMusicDetail(scope.row.id)">查看</el-button>
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
  </div>
</template>

<script>
import headerDom from "@/components/header";
export default {
  name: "index",
  components: {
    headerDom
  },
  data() {
    return {
        // 获取列表的预置信息
        key:"",
	    title:"主推音乐",

      profile: {}, //网易云登录信息
      myloveMusicList: "", //0 是我喜欢，其他是别的歌单  我喜欢歌单的相关，从这里拿总数和id、
      loveMusicList: [], //歌单 包含每首歌的名字和id
      showloveMusicList: [], //歌单,前端分页后数据
	    total:333,//歌单总数
      //该歌单总数量
    };
  },
  methods: {
    handleCurrentChange(val) {
      var endindex = val * 10;
      var startindex = val * 10 - 10;
      this.showloveMusicList = this.loveMusicList.slice(startindex, endindex);
    },

    // 网易云登录后获取我的收藏喜欢的歌单 拿到歌单的id
    getMusicList(userId) {
      let that = this;
      that.$axios
        .get("myMusiclist", { uid: userId })
        .then(result => {
          that.myloveMusicList = result.playlist[0]; //0 是我喜欢，其他是别的歌单
            // console.log( that.myloveMusicList)
          that.getMyMusic(this.myloveMusicList.id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 网易云获取我的收藏喜欢的歌单 的列表 拿到歌单的列表  拿到每首歌的信息
    getMyMusic(id) {
    	let that = this
	    that.$axios.get("myMusicDetail", { id: id,br:999000 }).then(result => {
        	console.dir(result)
	        that.loveMusicList = result.playlist.tracks;
	        that.total = result.playlist.tracks.length;
	        that.handleCurrentChange(1);
        }).catch(error => {
          console.log(error);
        });
    },
    //获取每首歌的详情
    getMusicDetail(key) {
      this.$axios.get("lyric", { id: key }).then(res => {
          // console.log(res);
        }).catch(error => {
          console.log(error);
        });
    },
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
    }
  },
  created() {

	  //      localStorage是在浏览器的东西所以不能再这个服务端操作的时候获取，应该都在mounted浏览器操作的时候获取
  },
    mounted(){
	    let that = this
	    var userId = localStorage.getItem("userId");
	    if (that.$route.query){
		    if (that.$route.query.id){
			    that.key = that.$route.query.id
			    that.title = that.$route.query.name
			    this.getMyMusic(that.key);
		    }else{
			    this.getMusicList(userId);
		    }
	    } else {
		    this.getMusicList(userId);
	    }
    }
};
</script>

<style scoped>
/*歌曲列表*/
.myMusic {
  width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 40px 0;
  background-color: #fff;
  cursor: pointer;
}
.pagef {
  width: 500px;
}
.paged {
  margin: 30px auto 0px;
  display: flex;
  justify-content: space-around;
}
    .wight{
        font-weight: 300;
        color: #F56C6C;
    }
</style>
