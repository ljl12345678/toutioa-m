import dayjs from 'dayjs'
import Vue from 'vue'
//加载中文语言包
import 'dayjs/locale/zh-cn'


// 配置为中文

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.filter('filtertime', value => {
    return dayjs().to(dayjs(value))
})

// console.log(dayjs().format('YYYY-MM-DD'));
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn' // 加载中文语言包
// import relativeTime from 'dayjs/plugin/relativeTime' // 加载相对时间
// import Vue from 'vue'

// dayjs.extend(relativeTime)
// dayjs.locale('zh-cn')

// // 相对现在的时间 过滤器
// Vue.filter('relativeTime', value => {
//     return dayjs(value).from(dayjs())
// })

// // // 指定格式的时间 过滤器
// // Vue.filter('dataTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
// //     return dayjs(value).format(format)
// // })

// // // 到处的函数
// // export const dataFormat = (value, format = 'YYYY-MM-DD') => {
// //     return dayjs(value).format(format)
// // }