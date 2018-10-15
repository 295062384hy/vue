import {CLEAR_CART,RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS,RECEIVE_USER,RESET_USER,RECEIVE_GOODS,RECEIVE_INFO,RECEIVE_RATINGS,DECREMENT_FOOD_COUNT,INCREMENT_FOOD_COUNT} from './mutation-types'
import Vue from 'vue'
export default {
[RECEIVE_ADDRESS](state,{address}){
  state.address=address
},
  [RECEIVE_CATEGORYS](state,{categorys}){
  state.categorys=categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops
  },
  [RECEIVE_USER](state,{user}){
    state.user=user
  },
  [RESET_USER](state,){
    state.user={}
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods=goods
  },
  [RECEIVE_INFO](state,{info}){
    state.info=info
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings=ratings
  },

  //添加食物的数量
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count++
    }else {
     // food.count=1
      Vue.set(food,'count',1)
      //想购物车这个的对象中加入food。其中选择食物的额food
      state.cartFoods.push(food)
    }

  },
  [DECREMENT_FOOD_COUNT](state,{food}){
  if(food.count){
    food.count--
    if(food.count===0){
      state.cartFoods.splice(state.cartFoods.indexOf(food),1)
    }
  }
  },
  [CLEAR_CART](state,){
    state.cartFoods.forEach(food=>{
      food.count=0
    })
    state.cartFoods=[]
  },

}
