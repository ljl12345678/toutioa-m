<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载数据失败，请重试"
      :immediate-check='false'
    >
        <Commentlist  v-for="(item, index) in list" :key="index" :title="item.content" :comment="item" @reply-click="$emit('reply-click',$event)"/>
    </van-list>
  </div>
</template>

<script>
import { getcomment } from '@/api/comment'
import Commentlist from '@/components/article/commentlist'
export default {
  name: 'CommerList',
  props: {
    // articleid:{
    //     type:[Number, Object, String],
    //     require:true
    // },
    list: {
      type: Array,
      default: () => []
    },
    source: {
      type: [Number, Object, String],
      require: true
    },
    type: {
      type: String,
      validator (value) { // type传入的值
        return ['a', 'c'].includes(value) // 传入的值是否包含在数组中，返回布尔值
      },
      default: 'a'
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      // list:[],
      offset: null,
      limit: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
    //  获取数据

      try {
        const { data } = await getcomment({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.$emit('successload', data.data)
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results)
        this.loading = false
        // console.log(data);
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          // console.log(data);
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }

    // 渲染数据
    // loading设置为false
    // 判断请求数据是否为空
    // 将finish设置为false
    }
  },
  created () {
    this.onLoad()
  },
  components: {
    Commentlist
  }

}
</script>

<style>

</style>
