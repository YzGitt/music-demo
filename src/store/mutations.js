import * as types from './mutation-type'


export default {
  [types.CHANGE_USERDATA](state,{userInfo}){
    state.userInfo=userInfo;
  }
}
