<template>
  <div class="channel-edit">
      <van-cell>
        <div slot="title" class="title-text">
            我的频道
        </div>
        <van-button type="danger" round size="mini" plain class="edit-btn" @click="isedie=!isedie">{{isedie? '完成':'编辑'}}</van-button>
      </van-cell>
      <van-grid :column-num="4" :gutter="10" class="my-grid">
        <van-grid-item v-for="(value, index) in mychannel" :key="index" class="gide-item" @click="onmychannel(value, index)">
            <van-icon slot="icon" name="clear" v-show="isedie && !fixchannel.includes(value.id)"></van-icon>
            <span slot="text" class="text" :class="{active: index===active}">{{value.name}}</span>
        </van-grid-item>
      </van-grid>
       <van-cell>
        <div slot="title" class="title-text">
            推荐频道
        </div>
      </van-cell>
      <van-grid :column-num="4" :gutter="10" class="reccommed-grid">
        <van-grid-item v-for="(value,index) in recommedchannel" :key="index"  :text="value.name" class="gide-item" icon="plus" @click="onaddchannel(value)"/>
      </van-grid>
  </div>
</template>

<script>
import { getAllChannel, addUserChannel, deletuserchannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  data () {
    return {
      allchannel: [],
      isedie: false,
      fixchannel: [0]
    }
  },
  props: {
    mychannel: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  created () {
    this.loadAllChannel()
  },
  methods: {
    async loadAllChannel () {
      try {
        const { data } = await getAllChannel()
        console.log(data)
        this.allchannel = data.data.channels
      } catch (error) {
        console.log('获取数据失败')
      }
    },
    async onaddchannel (addchannel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.mychannel.push(addchannel)
      console.log('22')
      if (this.user) {
        await addUserChannel({
          id: addchannel.id,
          seq: this.mychannel.length
        })
        console.log('11')
      } else {
        setItem('TOUTIAO-CHANNELS', this.mychannel)
      }
    },
    onmychannel (value, index) {
      if (this.isedie) {
        if (this.fixchannel.includes(value.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('channel-active', this.active - 1, true)
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.mychannel.splice(index, 1)
        this.deletechannel(value)
      } else {
        this.$emit('channel-active', index, false)
      }
    },
    async deletechannel (value) {
      if (this.user) {
        await deletuserchannel(value.id)
      } else {
        setItem('TOUTIAO-CHANNELS', this.mychannel)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommedchannel () {
      const channelss = []
      this.allchannel.forEach(channel => {
        const ret = this.mychannel.find(mychannel => {
          return mychannel.id === channel.id
        })
        if (!ret) {
          channelss.push(channel)
        }
      })

      return channelss
    }

  }
}
</script>

<style scoped lang="less">

.channel-edit {
    padding: 60px 0;
    .title-text {
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;

    }
   /deep/ .gide-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text,
            .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active{
                color: red;
                }
            .van-grid-item__icon-wrapper {
                position:unset;
            }
        }
    }
    /deep/.my-grid {
       .gide-item{
        .van-icon-clear{
            position: absolute;
            right: -2px;
            top: -5px;
            font-size: 20px;
            color: #cacaca;
            z-index: 2;
        }
       }
    }

   /deep/ .reccommed-grid {
        .gide-item {
            .van-grid-item__content {
                flex-direction: row ;
                white-space: nowrap;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
                .van-grid-item__text {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
