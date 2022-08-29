<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像"   is-link>
      <van-image
        class="avatar"
        round
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="内容"  is-link/>
    <van-cell title="性别" value="内容"  is-link/>
    <van-cell title="生日" value="内容"  is-link/>
  </div>
</template>

<script>
export default {
  name: 'UserProfile'

}
</script>

<style scoped lang ="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;

  }
}
</style>
