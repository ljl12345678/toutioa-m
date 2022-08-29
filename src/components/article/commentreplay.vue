<template>
  <div class="comment-replay">
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'" >
        <van-icon slot="left" name="cross" @click="$emit('close')" ></van-icon>
    </van-nav-bar>
    <div class="scroll">
    <CommentItem :comment="comment"/>
    <van-cell>全部回复</van-cell>
    <Commentlist :source = "comment.com_id" type="c" :list = "commentlist"/>
    </div>

    <div class="post-wrap">
        <van-button size="small" round class="van-button" @click="show = true">写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup
      v-model="show"
      position="bottom">
       <Commentpost :target="comment.com_id" @post-success="onpostsuccess" />
    </van-popup>
    <!-- 发布评论 -->
  </div>
</template>

<script>
import CommentItem from '@/components/article/commentlist'
import Commentlist from '@/components/article/commer'
import Commentpost from '@/components/article/comment-post'
export default {
  name: 'CommenPlay',
  // inject:{
  //     articleid:{
  //         type:[Object,String,Number],
  //         default:null
  //     }
  // },
  props: {
    comment: {
      type: Object,
      require: false
    }

  },
  data () {
    return {
      show: false,
      commentlist: [5]
    }
  },
  components: {
    CommentItem,
    Commentlist,
    Commentpost
  },
  methods: {
    onpostsuccess (data) {
      // 更新回复数量
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.reply_count++
      // 关闭弹层
      this.show = false
      // 将内容显示出来
      this.commentlist.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.post-wrap{
    height: 88px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .van-button {
        width: 60%;
    }
    }
.scroll {
    position: fix;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}
</style>
