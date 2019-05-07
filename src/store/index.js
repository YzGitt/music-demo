import Vue from 'vue'
import Vuex from 'vuex'
import actions from'./actions'
import mutations from'./mutations'


Vue.use(Vuex)

export default new Vuex.Store({
  state:{
<<<<<<< HEAD
    userInfo:{}
=======
    userInfo:{},//用户信息
    searchData:"",//搜索信息数量
>>>>>>> 最新
  },
  mutations,
  actions

})
