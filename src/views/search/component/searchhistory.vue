<template>
  <div class="searchhistory">
     <van-cell title="搜索历史">
      <div v-if="isshowhistory">
        <span style="padding-right : 5px" @click="$emit('allclear')">全部删除</span>
        <span @click="isshowhistory = false">完成</span>
      </div>

      <van-icon name="delete" v-else @click="isshowhistory = true"/>
     </van-cell>
     <van-cell :title="item" v-for="(item,index) in searchhistory" :key="index" @click="clearhistory(item, index)">
        <van-icon name="close" v-if="isshowhistory"/>
     </van-cell>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isshowhistory: false
    }
  },
  props: {
    searchhistory: {
      type: Array,
      require: true
    }
  },
  methods: {
    clearhistory (item, index) {
      if (this.isshowhistory) {
        // eslint-disable-next-line vue/no-mutating-props
        this.searchhistory.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>

</style>
