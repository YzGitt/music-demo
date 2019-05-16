import * as types from './mutation-type'


export default {
  [types.CHANGE_USERDATA](state,{userInfo}){
    state.userInfo=userInfo;
  },
  [types.CHANGE_SEARCHDATA](state,search){
    state.searchData=search;
  },
  [types.LOGOUT_USERNAME](state){
    state.userInfo={}
  }
}
