<template>
  <div>
      <div class="top">
        <h2>主播电台</h2>
        <ul class="clearfix djul">
          <li v-for="(djs,index) in tableData ">
            <router-link to="#">
              <img :src="djs.picUrl" alt="">
            </router-link>
            <h3 class="p-mid f-thide "><router-link :to="{name:'Djxq',params:{id: djs.id}}" >{{djs.name}}</router-link></h3>
            <p class="f-thide">by <span>{{djs.dj.nickname}}</span></p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
    export default {
        name: "searchDj",
      data(){
          return{
            tableData:[],
            count:0
          }
      },
      methods:{
          getDjSearch(){
            const txt=localStorage.getItem("search")
            console.log(111);
            this.$axios.get("searchAll",{type:1009,keywords:txt,limit:10}).then(res=>{
              if (res.code===200){
                this.count=res.result.djRadiosCount;
                this.tableData=res.result.djRadios;
                console.log(res);
              }
            })
          }
      },
      created(){
          this.getDjSearch()
      }
    }
</script>

<style lang="scss" scoped>

div{
  .top{
      padding-top: 15px;
      /*height: 571px;*/
      h2{
        color: black;
        font-weight: 500;
        text-align: center;
        padding-bottom:10px;
        border-bottom: 1px solid #eee;
      }
      .djul{
        padding-top: 10px;
        li{
          float: left;
          margin: 0 14px 40px 14px ;
          width: 150px;
          a{
            width: 150px;
            height: 150px;
            img{
              width: 150px;
              height: 150px;
            }
          }
          .p-mid{
            margin: 8px 0 6px;
            line-height: 16px;
            font-size: 14px;
            font-weight: normal;
            a{
              color: black;
            }
          }
          p{
            line-height: 18px;
            color: #999;
            span{
              color: #333;
            }
          }
        }
      }
  }
}
</style>
