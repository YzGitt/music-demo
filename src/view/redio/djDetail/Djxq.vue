<template>
  <div>
    <headerDom></headerDom>
    <div class="wraper">
      <div class="wraper-1">
        <div class="top">
          <div class="img-left fl" >
            <img :src="djData.picUrl" alt="">
          </div>
          <div class="text-right clearfix">
            <i></i>
            <p class="p-top">{{djData.name}}</p>
            <p class="p-footer">{{djData.rcmdText}}</p>
            <p class="p-mid">详情:{{djData.desc}}</p>

            <div class="btn"><span>是否订阅：</span><el-button type="text" @click="subDj" :class="djData.subed?'on':''">{{djData.subed?"已订阅":"订阅"}}</el-button></div>
          </div>
        </div>
        <h2 class="act">节目列表 <span>共{{djCount}}期</span></h2>
        <el-table
          :data="showDjList"
          stripe
          style="width: 100%"
          v-loading="loading">
          <el-table-column
            prop="serialNum"
            label="期号"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="节目名"
            width="320"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="time"
            label="日期"
            width="240"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click="getMusicDetail(scope.row.id)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="playDj(scope.row.name,scope.row.mainTrackId)"
              >播放</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paged">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="djCount"
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
  // import '../js/index'
  // import '../js/player'
  // import '../js/player_database'
  // import '../js/playlist'
    export default {
        name: "Djxq1",
        components:{
          headerDom,
        },
        data(){
        return{
          loading:true,
          tableData:[],//节目目录
          djData:{},//电台详情
          djCount:333,//节目数量
          showDjList:[],//分页数据
          flag:false
         }
        },
        methods:{
          //获取电台详情
          getDjDetail(){
            const id = this.$route.params.id
            this.$axios.get("djDetail",{rid:id}).then(res=>{
              console.log(res);
              if (res.code===200){
                this.djData=res.djRadio
              }
            })
          },
          //获取节目目录
          getDjProgram(){
            let that = this
            const id = this.$route.params.id
            this.$axios.get("djProgram",{rid:id,limit:9900}).then(res=>{
              // console.log(res);
              this.djCount=res.count;
              this.tableData=res.programs;
              that.handleCurrentChange(1)
              for (var i=0;i<this.tableData.length;i++){
                this.tableData[i].time =  new Date((this.tableData[i].createTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
              }
              this.loading=false
            })
          },
          handleCurrentChange(val) {
            var endindex = val * 10;
            var startindex = val * 10 - 10;
            this.showDjList = this.tableData.slice(startindex, endindex);
          },
          getMusicDetail(id){

          },
          //播放电台内容
          playDj(item,id){
              this.$axios.get("djSong",{id:id}).then(res=>{
                console.log(res.data);
                const song = res.data[0];
                if (res.code===200){
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
                }
              })
          },
          //订阅电台
          subDj(){
            const id = this.$route.params.id
            if (this.djData.subed){
              this.$confirm('是否取消订阅', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$axios.get("djSubYn",{rid:id,t:0}).then(res=>{
                    if (res.code===200){}
                    this.$message({
                      type: 'success',
                      message: '取消订阅成功!'
                    });
                    this.getDjDetail()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }
            else{
              this.$confirm('是否订阅', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$axios.get("djSubYn",{rid:id,t:1}).then(res=>{
                  if (res.code===200){}
                  this.$message({
                    type: 'success',
                    message: '订阅成功!'
                  });
                  this.getDjDetail()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }
          },
        },
        mounted(){
          this.getDjDetail();
          this.getDjProgram()
        }
    }
</script>

<style lang="scss" scoped>
  @import "../css/player.css";
.wraper{
  width: 980px;
  margin: 0 auto;
  .wraper-1{
    padding: 47px 30px 40px 39px;
    .paged {
      margin: 30px auto 0px;
      display: flex;
      justify-content: space-around;
    }
    .top{
      .img-left{
        border: 1px solid #eeee;
        img{
          width: 208px;
          height: 208px;
        }
      }
      .text-right{
        margin-left:230px ;
        .p-top{
          font-size:20px ;
          font-weight: 700;
        }
        .p-footer{
          margin-top: 30px;
        }
        .p-mid{
          margin-top: 30px;
        }
        .btn{
          margin-top: 30px;
          .on{
            color: red;
          }
          button{
            border:0;
            background-color: #fff;
          }
        }
      }
    }
    .act{
      font-size: 20px;
      line-height: 28px;
      span{
        margin: 9px 0 0 20px;
        color: #999;
        font-size: 12px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
  }
}
</style>
