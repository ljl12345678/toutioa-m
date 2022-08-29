<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="addcomment"
      :disabled = "!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import {pubcomment} from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject:{
    articleid:{
        type:[Object,String,Number],
        default:null
    }
},
  props: {
    target:{
        type:[Object,String,Number],
        require:true
    },
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  async  addcomment(){
    this.$toast.loading({
      message: '登录中...',
      forbidClick: true,
      // 0持续
      duration:0
    });
    try {
        const {data} = await pubcomment({
            target: this.target,
            content: this.message,
            art_id: this.articleid
        })
        console.log(data);
        // 关闭弹层
         this.message = ''
         this.$emit('post-success', data.data)
         this.$toast.success('发布成功')
        // 将列表显示到列表顶部
        // 清空文本框
       




    } catch (error) {
        this.$toast.fail('发表失败')
    }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
