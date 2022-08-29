import request from '@/utils/request'
export const getseaarchsuggestion = q => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}
export const getseaarchresult = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}