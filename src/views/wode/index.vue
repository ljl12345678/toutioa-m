<template>
  <div class="wode-contain">
     <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image :src="userinfo.photo" round fit="cover" class="avatar"/>
         <span class="text">{{userinfo.name}}</span>
        </div>

        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userinfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userinfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>

    </div>

    <div class="header notlogin" v-else>
        <div class="login-btn" @click="$router.push('./login')">
          <img src="~@/assets/mobile.png" alt="" class="mobile-img">
          <span class="text">登录 / 注册</span>
        </div>
    </div>

    <van-grid :column-num="2" class="grid-nav" clickable>
        <van-grid-item  class="grid-item" >
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
        <van-cell title="消息通知" is-link  />
        <van-cell title="小智同学" is-link class="mb9" />
        <van-cell title="退出登录" class="loginout-cell" v-if="user" @click="onlogout" clickable/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getuserinfo } from '@/api/user'
export default {
  name: 'WodeIndex',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onlogout () {
    // 退出登录提示
    // 清除登录状态，user
    // 在组件中需要this、.$
      this.$dialog.confirm({
        title: '确认退出吗'
      }).then(() => {
        // on confirm清除登录状态
        this.$store.commit('setuser', null)
      })
        .catch(() => {
        // on cancel
        })
    },
    async loadgetuserinfo () {
      try {
        const { data } = await getuserinfo()
        this.userinfo = data.data
        console.log(data)
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    if (this.user) {
      this.loadgetuserinfo()
    }
  }
}
</script>

<style scoped lang="less">
.wode-contain {
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.notlogin{
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile-img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  .text {
    font-size: 28px;
    color: #fff;
  }
}
}
.user-info{
  .base-info{
    height: 231px;

    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      .text {
        font-size: 30px;
        color: #fff;

      }
      .avatar {
      margin-right: 23px;
      width: 132px;
      height: 132px;
      border: 1px solid #fff;
    }
    }

  }
  .data-stats{
    height: 130px;
    display: flex;
    .data-item{
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid-nav{
  .grid-item{
    height: 141px;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      font-size: 28px;
    }
  }
}
.loginout-cell {
  text-align: center;
  color: #986262;
 margin-top: 9px;
}

}

</style>
