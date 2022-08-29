<template>
  <div class="home-contain">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
        <van-button type="primary" slot="title" size="small" round icon="search" color="blue" class="search-btn" to="/search">
          搜索
        </van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 标签列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable  >
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <artivlelist :channel="obj"/>
      </van-tab>
      <div class="placeholder" slot="nav-right">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div slot="nav-right" class="humberger-btn" @click="isshow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 标签列表 -->
    <!-- 弹出层 -->
    <van-popup
        v-model="isshow"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <Channeldeit :mychannel="channels" :active="active" @channel-active="onupdataactive"/>

      </van-popup>
    <!-- 弹出层 -->

  </div>
</template>

<script>
import { getuserchannels } from '@/api/user'
import artivlelist from '@/views/home/component/articlelist'
import Channeldeit from '@/views/home/component/channeledit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'IndexIt',
  data () {
    return {
      active: 0,
      channels: [],
      isshow: false
    }
  },
  created () {
    this.loadchannels()
  },
  components: {
    artivlelist,
    Channeldeit
  },
  methods: {
    async loadchannels () {
      try {
      // this.channels = data.data.channels
      // console.log(data);
        let channels = []
        if (this.user) {
          const { data } = await getuserchannels()

          channels = data.data.channels
        } else {
          const loadchannels = getItem('TOUTIAO-CHANNELS')
          // console.log(loadchannels);
          if (loadchannels) {
            channels = loadchannels
          } else {
            const { data } = await getuserchannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('频道获取数据失败')
      }
    },
    onupdataactive (index, isshow = true) {
      console.log(index)
      this.active = index
      this.isshow = isshow
    }

  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-contain {
  margin-top: 172px;
  padding-bottom: 100px;
  .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb !important;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
 /deep/ .channel-tabs {

  .van-tabs__wrap{
    position: fixed;
     top: 92px;
    left: 0;
    right: 0;
   height: 82px;
   z-index: 1;
   }
   .van-tab--active {
     color: #333 !important;
   }
   .van-tabs__nav{
     padding-bottom: 0;
   }
   .van-tabs__line {
     width: 31px;
     height: 6px;
     background-color: #3296fa;
    bottom: 4px;
   }
    .van-tab {
      border-right: 1px solid #edeff3;
      width: 200px;
      font-size: 30px;
      color: #777;
    }
    .humberger-btn {
      position: fixed;
      right: 0 !important;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      .toutiao {
        font-size: 33px;
      }
      &::before{
        content: '';
        position: absolute;
        left: 0;
        background-image: url(~@/assets/gradient-gray-line.png);
        height: 100%;
        width: 1px;
        background-size: contain;

      }
    }
  }
  }

</style>
