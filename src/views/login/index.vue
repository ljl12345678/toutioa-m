<template>
  <div class="login-container">
    <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录页面" >
        <template #left>
        <van-icon name="cross" size="18" @click="$router.back()"/>
        </template>
      </van-nav-bar>
      <!-- 登录表单 -->
      <van-form @submit="onSubmit" ref="loginForm">
        <van-cell-group inset>
          <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile"
          :rules="userformdata.mobile" type="number" maxlength="11"><i slot="left-icon" class="toutiao toutiao-shouji"></i></van-field>
          <van-field
            name="code"
            placeholder="请输入验证码" v-model="user.code"
             :rules="userformdata.code" type="number" maxlength="6"><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <!-- time倒计时时间 -->
                <van-count-down :time="1000*10" format="ss s" v-if="iscountdownshow" @finish="iscountdownshow = false"/>
                <van-button round class="send-sms-btn" size="small" type="default" @click="onSendsms" native-type="button" v-else>
                验证码
                </van-button>
                </template>
            </van-field>
        </van-cell-group>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
  </van-form>
  </div>
</template>

<script>
import { login, sendsms } from '@/api/user'
export default {
  name: 'LoginIt',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userformdata: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }
        ]
      },
      iscountdownshow: false
    }
  },
  methods: {
    // 给van-file组件配置检验功能
    // 党提交时自动触发验证功能
    async onSubmit () {
    // 获取表单数据
      const user = this.user
      console.log(user)
      // 表单验证

      // 在组件中用this.$toast调用
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        // 0持续
        duration: 0
      })
      // 提交表单请求登录
      try {
        const res = await login(this.user)
        this.$toast.success('登录成功')
        console.log(res)
        this.$store.commit('setuser', res.data.data)
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败')
          console.log('手机号验证码错误')
        } else {
          this.$toast.fail('登录失败')
          console.log('失败', err)
        }
      }

    // 根据请求响应结果处理后续操作
    },
    async onSendsms () {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }

      // 验证通过显示倒计时
      this.iscountdownshow = true
      // 请求发送验证码
      try {
        const res = await sendsms(this.user.mobile)
        this.$toast('发送成功')
        console.log('发送成功', res)
      } catch (error) {
        // 发送失败关闭倒计时
        this.iscountdownshow = false
        console.log('发送失败', error)
        if (error.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;

  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}

</style>
