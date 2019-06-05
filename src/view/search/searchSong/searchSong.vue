<template>
  <div>
    <el-table
      :data="searchSongData"
      stripe
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        prop="name"
        label="歌曲名"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="artists[0].name"
        label="演唱者"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="album.name"
        label="专辑名"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
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
        :total="count"
        :page-size="10"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "searchSong",
      data(){
          return{
            searchSongData:[],//歌曲
            count:0,//数量
            loading:true,//加载等待
            midData:"",//中间变量
            pagenum:1,//当前第几页
          }
      },
      methods:{
          getSearchSongData(){
            const txt=localStorage.getItem("search")
            console.log(111);
            this.$axios.get("searchAll",{keywords:txt,offset:this.pagenum}).then(res=>{
              if (res.code===200){
                this.count=res.result.songCount;
                this.searchSongData=res.result.songs;
                this.loading=false
              }
              console.log(res);
            })
          },
        handleCurrentChange(val){
          this.pagenum=val-1;
          this.getSearchSongData()
        },
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
      created(){
          this.getSearchSongData();
      },
      watch:{
        'count':function(){
          this.$emit('getCount',this.count);//主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
        }
      }

    }
</script>

<style lang="scss" scoped>
div{
  .paged{
    margin: 30px auto 0px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
