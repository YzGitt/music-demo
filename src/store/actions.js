import {xhr} from '@/util/axios/axios'
import * as types from './mutation-type'


export default {
  async getUserData({commit}){
    let id = localStorage.getItem("userId");
    await xhr.get("userInfo",{uid:id}).then(res=>{
      if (res.code===200){
        console.log(res.profile);
        const userInfo = res.profile;
        commit(types.CHANGE_USERDATA,{userInfo})
      }
    }).catch(error=>{
      console.log(error);});
  }
}
