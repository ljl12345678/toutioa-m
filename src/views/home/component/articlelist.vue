<template>
  <div class="listbox">
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh"  :success-text="finishedtext" success-duration=1000>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad">
      <Articleitem v-for="(item, index) in list" :key="index" :article="item"/>
    <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { grtarticle } from '@/api/articlelist'
import Articleitem from '@/components/article/articleitem'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  components: {
    Articleitem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestep: '',
      error: false,
      refreshing: false,
      finishedtext: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      try {
        const { data } = await grtarticle({
          channel_id: this.channel.id,
          timestamp: this.timestep || Date.now()
        })
        //  if (Math.random>0.5) {
        //   JSON.parse('zfgfgb')
        //  }
        const { results } = data.data
        this.list.push(...results)
        //  状态设置为结束
        this.loading = false
        //  判断是否加载完毕
        if (results.length) {
          this.timestep = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
        console.log('请求失败', error)
      }
    },
    async onRefresh () {
    // 请求获取数据
      try {
        const { data } = await grtarticle({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        //  if (Math.random>0.5) {
        //   JSON.parse('zfgfgb')
        //  }
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshing = false
        this.finishedtext = `刷新成功，更新了${results.length}数据`
      } catch (error) {
        this.refreshing = false
        this.finishedtext = '刷新失败'
      }
      // 将数据放在列表的顶部
      // 关闭loding状态
    }

    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //      this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false;
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //      this.finished = true;
    //     }
    //   }, 1000)
    // },

  }

}
</script>

<style>
.listbox {
  height: 80vh;
  overflow-y: auto;
}
</style>
