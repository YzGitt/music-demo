<template>
  <div id="app">
    <router-view/>
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
}
</script>

<style>
.weikaifang{
    height: 300px;
    width: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -200px;
    font-size: 30px;
    font-family: "楷体";
    font-weight: 700;
    text-align: center;
    line-height: 300px;
}
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
