<template>
    <div>
      <headerDom></headerDom>
      <div class="wraper">
        <div class="box">
          <div class="img fl">
            <img :src="userInfo.avatarUrl" alt="">
          </div>
          <div class="centent clearfix">
            <p class="title">用户: <span>{{userInfo.nickname}}</span>您好</p>
            <div class="detile">
              <h1>截止目前的您的收藏结果如下：</h1>
              <p>歌手共关注 <span>{{subInfo.artistCount}}</span>位</p>
              <p>电台共订阅 <span>{{subInfo.djRadioCount}}</span>个</p>
              <p>歌单共收藏 <span>{{subInfo.subPlaylistCount}}</span>个</p>
              <p>MV共收藏 <span>{{subInfo.mvCount}}</span>部</p>
            </div>
          </div>
          <el-table
            ref="multipleTable"
            :data="loveMusicListDetail"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
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
              width="200"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作"  align="center">
              <template slot-scope="scope">
                <el-button  size="large" @click="subYn(scope.row.id)" type="danger">取消收藏</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection()" >取消选择</el-button>
            <el-button @click="subYnAll()" type="danger">取消收藏</el-button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import headerDom from "@/components/header";
  import {mapState} from "vuex"
    export default {
        name: "index",
      inject:["reload"],
      data(){
          return{
            subInfo:{},//用户收藏信息
            loveMusicListDetail:[],//收藏列表
            loading:true,//加载等待
            multipleSelection: []
          }
      },
      components:{
        headerDom,
      },
      methods:{
          getUserDel(){
            this.$axios.get("userSub").then(res=>{
              console.log(res);
              if (res.code===200){
                this.subInfo=res
              }
            })
          },
        //取消全选
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log(this.multipleSelection);
        },
        //获取收藏的歌单
        getMusicList(){
          let that = this
          var userId = localStorage.getItem("userId")
          that.$axios.get("myMusiclist",{uid:userId}).then(result=>{
            console.log(result);
            that.loveMusicListDetail = result.playlist   //0 是我喜欢，其他是别的歌单
            for (var i=0;i<that.loveMusicListDetail.length;i++){
              that.loveMusicListDetail[i].time =  new Date((that.loveMusicListDetail[i].createTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
            }
          }).catch(error=>{
            console.log(error);
          })
        },
        //收藏取消
        subYn(id){
          let uid =id
          this.$axios.get("subEdie",{id:uid,t:2}).then(res=>{
            console.log(res);
            if (res.code===200){
              this.$message({
                message: "取消收藏成功",
                type: 'success'
              },1000);
              this.getMusicList()
              this.reload()
              console.log(1);
            }
          })
        },
        //多选取消收藏
        subYnAll(){
          let flag=true;
          let ul=[];
          for (let i= 0;i<=this.multipleSelection.length;i++){
            let mid=this.multipleSelection[i]
            ul.push("mid")
          }
          this.$confirm('是否取消收藏', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            for (let j=0;j<=ul.length;j++){
              this.$axios.get("subEdie",{id:ul[j],t:2}).then(res=>{
                console.log(res);
                if (res.code===200){
                }else{
                  flag=false
                }
              })
            }
            if (flag){
              this.$message({
                message: "取消收藏成功",
                type: 'success'
              },1000);
              this.getMusicList()
              this.reload()
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });

        }
      },
      computed:{
        ...mapState(["userInfo"])
      },
      mounted(){
          this.getUserDel()
        this.getMusicList()
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
  .box{
    padding: 40px;
    .img{
      border: 1px solid #eeee;
      img{
        width: 208px;
        height: 208px;
      }
    }
    .centent{
      margin-left:230px ;
      .title{
        font-size: 18px;
        text-align: center;
        font-weight: 500;
      }
      .detile{
        margin-top: 15px;
        h1{
          font-size: 16px;
        }
        p{
          margin-top: 10px;
          font-size: 14px;
          span{
            color: red;
          }
        }
      }
    }
    }

}

</style>
