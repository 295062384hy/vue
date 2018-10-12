import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import Msite from '../pages/Msite/msite.vue'
import Profile from '../pages/Profile/profile.vue'
import Order from '../pages/Order/order.vue'
import Search from '../pages/Search/search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/shop.vue'
import Goods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import Ratings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import Info from '../pages/Shop/ShopInfo/ShopInfo.vue'

export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:Msite,
      meta:{ok:true}
    },
    {
      path:'/profile',
      component:Profile,
      meta:{ok:true}
    },
    {
      path:'/order',
      component:Order,
      meta:{ok:true}
    },
    {
      path:'/search',
      component:Search,
      meta:{ok:true}
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:Goods,
        },
        {
          path:'/shop/ratings',
          component:Ratings,
        },
        {
          path:'/shop/info',
          component:Info,
        },
        {
          path:'',
          component:Goods,
        },
      ]
    },
  ]
})
