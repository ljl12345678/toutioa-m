import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
    // 定义
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
    state: {
        // 一个对象，存储用户登录信息（token等信息）
        user: getItem(TOKEN_KEY)
    },
    getters: {},
    mutations: {
        setuser(state, data) {
            state.user = data
                // 未来防治刷新把数据备份到本地存储
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})