<template>
  <div class="collect-contain">
    <van-icon
       :color="value === 1 ? '#ffa500' : '#777'"
       :name="value === 1 ? 'good-job' : 'good-job-o'"
        @click="onlike"
        :loading = "load"
      />
  </div>
</template>

<script>
import { addlike, delelike } from '@/api/articlelist'

export default {
  name: 'ListUt',
  props: {
    value: {
      type: Number,
      require: true
    },
    likeid: {
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
    async onlike () {
      try {
        this.load = true
        let status = -1
        if (this.value === 1) {
          await delelike(this.likeid)
        // 取消关注
        } else {
          await addlike(this.likeid)
          status = 1
        // 关注
        }
        this.$emit('input', status)

        //    this.$toast.success(!this.value? '收藏成功' :'取消收藏')
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
