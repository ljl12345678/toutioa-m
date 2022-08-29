import request from '@/utils/request'
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
export const sendsms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,

    })
}
export const getuserinfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',

    })
}

export const getuserchannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels',

    })
}
export const addfollow = target => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}
export const delefollow = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,

    })
}