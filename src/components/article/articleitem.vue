<template>
 <van-cell class="article-item" :to="{name:'article',params:{articleid:article.art_id}
 }">
    <div slot="title" class="title van-multi-ellipsis--l2" >{{article.title}}</div>
    <div class="cover-wrap" v-if="article.cover.type===3" slot="title">
       <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
            <van-image
            class="line-img"
            width="100"
            height="100"
            :src="img"
            />
       </div>
    </div>
    <div slot="label">
        <span>{{article.aut_name}} </span>
        <span>{{article.comm_count}}评论 </span>
        <span>{{article.pubdate | filtertime}} </span>
    </div>
    <div>
        <van-image
            class="right-cover"
            fit="cover"
            slot="default" v-if="article.cover.type===1"
            width="100"
            height="100"
            :src="article.cover.images[0]"
            />
    </div>
 </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {

    .title{
        font-size: 32px;
        color: #3a3a3a;

    }
    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding: 25px 0;
    }
    .right-cover{
        width: 232px;
        height: 146px !important;

    }
    .van-cell__label {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .cover-wrap {
        display: flex ;
        .cover-item{
            flex: 1 ;
            padding: 15px;
            .line-img {
                height: 146px !important;
            }
        }

    }
}
</style>
