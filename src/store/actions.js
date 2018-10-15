import {CLEAR_CART,RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_USER,RESET_USER,RECEIVE_RATINGS,RECEIVE_INFO,RECEIVE_GOODS,DECREMENT_FOOD_COUNT,INCREMENT_FOOD_COUNT} from './mutation-types'
import {reqAddress, reqFoodCategorys, reqShops,reqUser,reqLogout,reqShopInfo,reqShopRatings,reqShopGoods} from '../api/index'
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
   },
  //获取用户的信息getGoods.   getRatings   getInfo
  async getGoods({commit},cb){
   const result=await reqShopGoods()
    if(result.code===0){
     const goods=result.data
     commit(RECEIVE_GOODS,{goods})

      typeof cb ==='function' && cb()
    }
  },
  async getRatings({commit}){
    const result=await reqShopRatings()
    if(result.code===0){
      const ratings=result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  async getInfo({commit}){
    const result=await reqShopInfo()
    if(result.code===0){
      const info=result.data
      commit(RECEIVE_INFO,{info})
    }
  },


  //更新购买的个数组件
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){  //增加
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {  //减少
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //清除购物车
  clearCart({commit}){
   commit(CLEAR_CART)
  }
}


