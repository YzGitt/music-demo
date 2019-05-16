import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
	  {
		  path: '/',
		  name: 'index',
		  component: () => import("@/view/index")
	  },
	  {
		  path: '/login',
		  name: 'login',
		  component: () => import("@/view/login/index")
	  },
	  {
		  path: '/thankyou',
		  name: 'thankyou',
		  component: () => import("@/view/thankyou/index")
	  },
	  {
		  path: '/music',
		  name: 'music',
		  component: () => import("@/view/music/index")
	  },
	  {
		  path: '/playlist',
		  name: 'playlist',
		  component: () => import("@/view/playlist/index")
	  },
	  {
		  path: '/playlist/uselist',
		  name: 'uselist',
		  component: () => import("@/view/playlist/uselist")
	  },
    {
      path: '/redio',
      name: 'redio',
      component: () => import("@/view/redio/index")
    },
    {
      path: '/mv',
      name: 'mv',
      component: () => import("@/view/MV/index")
    },
    {
      path: '/djdetail/:id',
      name: 'Djxq',
      component: () => import("@/view/redio/djDetail/Djxq")
    },
    {
      path: '/mvplay/:id',
      name: 'MvPlay',
      component: () => import("@/view/MV/MvPlay/MvPlay")
    },
    {
      path: '/search',
      name: 'search',
      component: () => import("@/view/search/index"),
      children:[
        {
          path:'/search',
          redirect:'/searchsong',
        },
        {
        path:"/searchsong",
        name:"searchsong",
        component: () => import("@/view/search/searchSong/searchSong")
        },
        {
          path:"/searchdj",
          name:"searchdj",
          component: () => import("@/view/search/searchDj/searchDj")
        },
        {
          path:"/searchmv",
          name:"searchmv",
          component: () => import("@/view/search/searchMv/searchMv")
        },
      ]
    },
    {
      path: '/preson',
      name: 'preson',
      component: () => import("@/view/preson/index")
    },
  ]
})
