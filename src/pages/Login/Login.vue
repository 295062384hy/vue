<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isduanxin}" @click="isduanxin=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isduanxin}" @click="isduanxin=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isduanxin}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="iphone">
              <button :disabled="!isiphone||timer>0 " class="get_verification" :style="{color:isiphone?timer==0?'black':'':''}" @click="sendCode">
               {{timer>0?`已发送(${timer}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isduanxin}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isshoupwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button " :class="isshoupwd?'on':'off'" @click="isshoupwd=!isshoupwd">
                  <div class="switch_circle" :class="isshoupwd?'right':''"></div>
                  <span class="switch_text">{{isshoupwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha"  alt="captcha" @click="updateCaptcha" ref="a">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="tologin">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox} from 'mint-ui'
  import {reqPwdLogin,reqSmsLogin,reqSendCode} from '../../api/index'
  export default {
    data(){
      return{
        isduanxin:true,
        iphone:'',//短信登录的电话号
        timer:0,
        isshoupwd:false,
        code:'',//短信登录的验证码
        name:'',// 密码登录的三个参数
        pwd:'',
        captcha:''
      }
    },
    computed:{
      isiphone(){
        return /^1\d{10}$/.test(this.iphone)
      }
    },
    methods: {
     async sendCode() {
        this.timer = 30
        const a = setInterval(() => {
          this.timer--
          if (this.timer === 0) {
            clearInterval(a)
          }
        }, 1000)
        //发送短信的验证码
        const result=await reqSendCode(this.phone)
       if(result.code===0){  //验证码发送成功
         Toast('发送成功')
       }else{   //验证码发送失败
         this.timer=0
         MessageBox.alert(result.msg).then(res=>{})
       }
      },
      updateCaptcha(){
        this.$refs.a.src='http://localhost:4000/captcha?time='+Date.now()

      },
    async  tologin(){
        let result
       if(this.isduanxin) {//表示采用的是短信的登录
         if(!this.isiphone){return alert('请输入正确的电话号码')}else if(!/^\d{6}$/.test(code)){return alert('请输入正确的验证码')}
         //短信登录的请求发送
          result=await reqSmsLogin(this.phone,this.code)

       }else{//表示采用的密码登录
         const {name,pwd,captcha}=this
         if(!this.name){return alert('请输入名字')} else if(!this.pwd){return alert('请输入密码')} else if(!/^.{4}$/.test(this.captcha)){return alert('请输入正确的验证码')}
               result=await reqPwdLogin({name,pwd,captcha})

       }
      this.timer=0
      this.updateCaptcha()
       //判断请求的成功失败登录
      if(result.code===0){
         const user=result.data
         this.$store.dispatch('saveUser',user)
        this.$router.replace('/profile')

      }else{
        MessageBox.alert(result.msg)
      }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
