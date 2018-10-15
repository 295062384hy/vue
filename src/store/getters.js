export default {
  // 总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre,food)=>
      pre+food.count
    ,0)
  },

  // 总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre,food)=>
       pre+food.count*food.price,0)
  }

}
