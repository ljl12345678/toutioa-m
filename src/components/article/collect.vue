<template>
  <div class="collect-contain">
    <van-icon
       :color="value ? '#ffa500' : '#777'"
       :name="value ? 'star' : 'star-o'"
        @click="oncollect"
        :loading = "load"
      />
  </div>
</template>

<script>
import { addcollect, delecollect } from '@/api/articlelist'
export default {
  name: 'CollectList',
  props: {
    value: {
      type: Boolean,
      require: true
    },
    collectid: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      load: false
    }
  },
  methods: {
    async oncollect () {
      try {
        this.load = true
        if (this.value) {
          await delecollect(this.collectid)
        // 取消关注
        } else {
          await addcollect(this.collectid)
        // 关注
        }
        this.$emit('input', !this.value)

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败请重试')
      }
      this.load = false
    }
  }

}
</script>

<style scoped lang="less">

</style>
