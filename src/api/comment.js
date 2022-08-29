import request from '@/utils/request'
export const getcomment = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}
export const addcommentlike = target => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}
export const delecommentlike = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`,


    })
}
export const pubcomment = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data

    })
}