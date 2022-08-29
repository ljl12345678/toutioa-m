<template>
  <div class="layout-contain">

      <router-view></router-view>
        <van-tabbar v-model="active" class="layout-tabar" route>
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="qu">
            <i slot="icon" class="toutiao toutiao-wenda"></i>
            <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="viedo">
            <i slot="icon" class="toutiao toutiao-shipin"></i>
            <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="my">
            <i slot="icon" class="toutiao toutiao-wode"></i>
            <span class="text">{{$store.state.user? '我的': '未登录'}}</span>
        </van-tabbar-item>
     </van-tabbar>

  </div>

</template>

<script>
export default {
  name: 'LayOut',
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style scoped lang="less">
.layout-contain {
    .layout-tabar {
        .toutiao {
            font-size: 40px;
        }
        .text{
            font-size: 20px;
        }
    }
}
</style>
