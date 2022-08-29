<template>
  <div class="searchsuggestion">
    <van-cell :title="obj" icon="search" v-for="(obj,index) in suggestion" :key="index" @click="$emit('search', obj)">
        <div slot="title" v-html="hightlight(obj)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getseaarchsuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestion: []

    }
  },
  props: {
    serchtext: {
      type: String,
      require: true
    }
  },
  watch: {
    serchtext: {
      handler: debounce(function (value) {
        this.loadgetseaarchsuggestion(value)
      }, 1000),
      immediate: true
    }
  },
  methods: {
    async loadgetseaarchsuggestion (q) {
      try {
        const { data } = await getseaarchsuggestion(q)
        this.suggestion = data.data.options
      } catch (error) {
        console.log('获取数据失败')
      }
    },
    hightlight (obj) {
    // 如果需要根据变量动态的创建正则表达式，则需要手动newregexp
      const hightlightstr = `<span style="color:red">${this.serchtext}</span>`
      const reg = new RegExp(this.serchtext, 'gi')
      return obj.replace(reg, hightlightstr)
    }
  }
}
</script>

<style>

</style>
