import * as types from './mutation-type'


export default {
  [types.CHANGE_USERDATA](state,{userInfo}){
    state.userInfo=userInfo;
<<<<<<< HEAD
=======
  },
  [types.CHANGE_SEARCHDATA](state,search){
    state.searchData=search;
>>>>>>> 最新
  }
}
