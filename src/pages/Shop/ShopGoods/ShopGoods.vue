<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="typesUl">
          <li class="menu-item " v-for="(good,index) in goods" :key="index" :class="{current:index===currentIndex}" @click="selectItem(index)">
            <img class="icon" :src="good.icon" v-if="good.icon">
            <span class="text bottom-border-1px">{{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
   <Food :food="food" ref="foods"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import Food from '../../../components/Food/Food.vue'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return{
        food:{},
        scrollY: 0, // 右侧列表Y轴方向滑动的坐标
        tops: [], // 右侧分类li的top值组成的数据
      }
    },

    computed:{
      ...mapState(['goods']),
      // 当前分类的下标
      currentIndex () {
        const {scrollY,tops}=this
        const index=tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1])
//        console.log(index)
        if(this.index!=index){
          this.index=index
          if(this.leftScroll) {
            this.leftScroll.scrollToElement(this.$refs.typesUl.children[index], 200)

          }
        }
//        console.log(index)
        return index
      }
    },
    mounted (){
      this.$store.dispatch('getGoods',()=>{
//        new BScroll('.foods-wrapper',{
//          click: true
//        })
//
//        new BScroll('.menu-wrapper',{
//          click: true
//        })
        this.$nextTick(()=>{
          // 初始化滚动对象
          this._initScroll()
          // 初始化tops数据
          this._initTops()

        })

      })


    },

    components:{
      ShopCart,
      Food
    },
    methods:{
      showFood(food){ //用来对点击的食物详情进行显示
        this.food=food
        this.$refs.foods.toggleShow()
      },
      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        // 得到所有分类li的伪数组
//        const lis = this.$refs.foodsUl.querySelectorAll('.food-list-hook')
        const lis = this.$refs.foodsUl.querySelectorAll(' .food-list-hook')
//        console.log(lis)
        lis.forEach(li => {
          top += li.clientHeight

          tops.push(top)
        })

        // 更新状态
        this.tops = tops
  },
      _initScroll () {
        this.rightScroll= new BScroll('.foods-wrapper',{
          click: true,
          probeType: 1
        })

        this.leftScroll= new BScroll('.menu-wrapper',{
          click: true
        })

        this.rightScroll.on('scroll',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
        this.rightScroll.on('scrollEnd',({x,y})=>{
          this.scrollY=Math.abs(y)
        })

      },
      selectItem(index){
        // 得到index对应的目标位置的y坐标
        const y = -this.tops[index]
        // 立即更新scrollY
        this.scrollY = -y
        // 让右侧列表滚动到此处
        this.rightScroll.scrollTo(0, y, 300)
      }
    },
  }

</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 235px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
