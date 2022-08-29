import request from '@/utils/request'
export const grtarticle = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}

export const getarticle = (id) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${id}`,
    })
}
export const addcollect = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}
export const delecollect = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
    })
}
export const addlike = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}
export const delelike = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,
    })
}