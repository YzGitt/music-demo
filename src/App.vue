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
