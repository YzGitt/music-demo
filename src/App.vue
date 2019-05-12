<template>
  <div id="app">
    <router-view  v-if="isRouterAlive"/>
      <div class="footerfixed"></div>
      <myfooter></myfooter>
  </div>
</template>

<script>
    import myfooter from "./components/myfooter";
export default {
  name: 'App',
	components: {
		myfooter,
	},
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 3d7263a56a3b3f098ad469c432bd447cc10a509a
}
</script>

<style>
    .footerfixed {
        height: 70px;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    a {
        text-decoration: none;
        color: #f1f1f1;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }
</style>
