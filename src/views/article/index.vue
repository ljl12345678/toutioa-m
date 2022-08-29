<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="IT头条"
    >
    <van-icon  slot="left" name="arrow-left" @click="$router.back()"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | filtertime }}</div>
          <Userfollow  :artid="article.art_id" v-model="article.is_followed" class="follow-btn"/>
          <!-- 当我们传给子组件的数据既要用又要改 -->
          <!-- 简写方式就是 -->
          <!-- :isfollow = "article.is_followed"
          @upadtaisfollow="article.is_followed = $event" -->
          <!-- v-model = "值"
          :value\
          @input -->

          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
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
          >关注</van-button> -->

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="article.content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <Commerlist
        :source="article.art_id"
        @successload = "commentcount = $event.total_count"
        :list="commentlist"
        @reply-click="onreplayclick"
        />

        <div class="article-bottom"
        >
         <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="commentcount"
        color="#777"
      />
      <Collect  class="van-icon" v-model="article.is_collected" :collectid="article.art_id" @input="article.is_collected = $event"/>

      <Like class="van-icon" v-model="article.attitude" :likeid="article.art_id" @input="article.attitude = $event"/>

      <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <van-popup
      v-model="show"
      position="bottom">
      <Commentpost :target="article.art_id" @post-success = 'onpostsuccess'/>
    </van-popup>
  </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errstatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadgetarticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->

    <!-- /底部区域 -->
    <!-- 回复评论 -->
    <van-popup
      v-model="isshow"
      position="bottom"
      :style="{ height: '100%' }">
     <Commerreplay :comment = "commentsigle" @close="isshow = false" v-if="isshow"/>
    </van-popup>
    <!-- 回复评论 -->
  </div>
</template>

<script>

import { getarticle } from '@/api/articlelist'
import { ImagePreview } from 'vant'
import Collect from '@/components/article/collect'
import Like from '@/components/article/like'
import Commerlist from '@/components/article/commer'
import Userfollow from '@/components/article/use-follow'
import Commentpost from '@/components/article/comment-post'
import Commerreplay from '@/components/article/commentreplay'
// ImagePreview({
//   images: [
//     'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
//     'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
//   ],
//    startPosition: 0,
//   onClose() {
//     console.log('关闭');
//   },
// });
export default {
  name: 'ArticleIndex',
  provide: function () {
    return {
      articleid: this.articleid
    }
  },
  components: {
    Userfollow,
    Collect,
    Like,
    Commerlist,
    Commentpost,
    Commerreplay

  },
  props: {
    articleid: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      errstatus: 0,
      commentcount: 2,
      show: false,
      commentlist: [],
      isshow: false,
      commentsigle: {} // 个人评论

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadgetarticle()
  },
  mounted () {},
  methods: {
    async loadgetarticle () {
      this.loading = true
      try {
        const { data } = await getarticle(this.articleid)
        this.article = data.data
        this.loading = false
        setTimeout(() => {
          this.previweimg()
        }, 0)

        console.log(data)
      } catch (error) {
        this.loading = false
        if (error.response && error.response.status === 404) {
          this.errstatus = 404
        }
        this.$toast('数据获取失败')
      }
    },
    previweimg () {
      const artivlecontent = this.$refs['article.content']
      const imgs = artivlecontent.querySelectorAll('img')
      const imgages = []
      imgs.forEach((obj, index) => {
        imgages.push(obj.src)

        obj.onclick = () => {
          ImagePreview({
            images: imgages,
            startPosition: index,
            onClose () {
              console.log('关闭')
            }
          })
        }
      })
    },
    async onfollow () {
      this.isload = true
      try {
        if (this.article.is_followed) {
        // 已关注，取消关注
          // eslint-disable-next-line no-undef
          const { data } = await delefollow(this.article.art_id)
          this.article.is_followed = false
          console.log(data)
        } else {
        // 取消关注，要关注
          // eslint-disable-next-line no-undef
          const { data } = await addfollow(this.article.art_id)
          console.log(data)
          this.article.is_followed = true
        }
      } catch (error) {
        // eslint-disable-next-line no-undef
        if (this.response && response.status === 400) {
          const message = '不能关注自己'
          console.log(message)
        }
        // eslint-disable-next-line no-undef
        this.$toast(message)
      }
      this.isload = false
    },
    onpostsuccess (data) {
      this.show = false

      console.log(data, 676767)
      this.commentlist.unshift(data.new_obj)
      console.log(this.commentlist, 89898)
    },
    onreplayclick (val) {
      this.commentsigle = val
      console.log(val)
      this.isshow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
   /deep/ .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
