import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqShops} from '../api/index'
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
  }
}
