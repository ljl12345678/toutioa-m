<template>
  <div class="sesrchresult">
<van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败请重试"
    >
    <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getseaarchresult } from '@/api/search'
export default {
  name: 'SesrchResult',
  props: {
    serchresulttext: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async  onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getseaarchresult({
          page: this.page,
          per_page: this.per_page,
          q: this.serchresulttext
        })
        const { results } = data.data
        this.list.push(...results)
        console.log(data)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        // 加载失败显示
        this.error = true
      }

      // 加载状态结束

      // 数据全部加载完成
    }
  }
}
</script>

<style>

</style>
