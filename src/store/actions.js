import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_USER,RESET_USER} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqShops,reqUser,reqLogout} from '../api/index'
export default {
 async getAddress({commit,state}){
    const {latitude, longitude} = state
    const result =await reqAddress(latitude+','+longitude)
    if(result.code===0){
      const address=result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
 async getCategorys({commit}){
   const result=await reqFoodCategorys()
   if(result.code===0){
     const categorys=result.data
     commit(RECEIVE_CATEGORYS,{categorys})
   }
  },
 async reqShops({commit,state}){
   const{longitude,latitude} =state
    const result=await reqShops({longitude,latitude})
   if(result.code===0){
     const shops=result.data
     commit(RECEIVE_SHOPS,{shops})
   }
  },
  saveUser({commit},user){
   commit(RECEIVE_USER,{user})
  },
 async getUser({commit}){
   const result=await reqUser()
   if(result.code===0){
     const user=result.data
     commit(RECEIVE_USER,{user})
   }
  },
   async logout ({commit}){
     const result =await reqLogout()
     if(result.code===0){
       commit(RESET_USER)
     }
   }
}
