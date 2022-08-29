<template>
  <div class="search-contain">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
     <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isresult = false"

    />
</form>
<Searchresult v-if="isresult" :serchresulttext="searchText"/>
<Searchsuggestion v-else-if="searchText" :serchtext="searchText" @search="onSearch"/>
<Searchhistory v-else :searchhistory = searchhistorylist @allclear="searchhistorylist=[]" @search="onSearch"/>

  </div>
</template>

<script>
import Searchhistory from './component/searchhistory'
import Searchresult from './component/searchresult'
import Searchsuggestion from './component/searchsuggestion'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIt',
  data () {
    return {
      searchText: '',
      isresult: false,
      searchhistorylist: getItem('TOUTIAO-SEARCH-HISTORY') || []
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchhistorylist.indexOf(val)
      if (index != -1) {
        this.searchhistorylist.splice(index, 1)
      }
      this.searchhistorylist.unshift(val)
      this.isresult = true
      console.log(val)
    },
    onCancel () {
      this.$router.back()
    }

  },
  components: {
    Searchhistory,
    Searchresult,
    Searchsuggestion

  },
  watch: {
    searchhistorylist: {
      handler (val) {
        setItem('TOUTIAO-SEARCH-HISTORY', val)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-contain{
    padding-top: 108px;
    .van-search__action {
    color: #fff;
}
    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
}

</style>
