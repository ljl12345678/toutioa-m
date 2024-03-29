// 封装本地存储操作莫快

// 存储数据
export const setItem = (key, value) => {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        window.localStorage.setItem(key, value)
    }
    // 获取数据
export const getItem = key => {
        const data = window.localStorage.getItem(key)
        try {
            return JSON.parse(data)
        } catch (error) {
            return data
        }
    }
    // 删除数据
export const removeitem = key => {
    window.localStorage.removeItem(key)
}