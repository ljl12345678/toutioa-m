<template>
  <van-button

            round
            size="small"
            v-if="isfollow"
            @click="onfollow"
            :loading = "isload"
          >已关注</van-button>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            @click="onfollow"
            :loading = "isload"
          >关注</van-button>
</template>

<script>
import { delefollow } from '@/api/user'
export default {
  name: 'UserFollow',
  props: {
    isfollow: {
      type: Boolean,
      require: true
    },
    artid: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      isload: false
    }
  },
  model: {
    prop: 'isfollow',
    event: 'upadtaisfollow'
  },
  methods: {
    async onfollow () {
      this.isload = true
      try {
        if (this.isfollow) {
        // 已关注，取消关注
          const { data } = await delefollow(this.artid)

          console.log(data)
        } else {
        // 取消关注，要关注
        }
        this.$emit('upadtaisfollow', !this.isfollow)
      } catch (error) {
        // eslint-disable-next-line no-undef
        if (this.response && response.status === 400) {
          this.$toast('不能关注自己')
        }
        this.$toast('加载数据失败')
      }
      this.isload = false
    }
  }
}
</script>

<style>

</style>
