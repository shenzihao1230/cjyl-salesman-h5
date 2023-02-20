import request from '@/utils/request'

// 登录
export function Login(data){
    return request({
        url:'/salesman/user/login.do',
        method:'post',
        data
    })
}
// 获取验证码
export function verifyCode(data){
    return request({
        url:'/salesman/user/verifyCode/send.do',
        method:'post',
        data
    })
}
// 退出登录
export function logout(data){
    return request({
        url:'/salesman/user/logout.do',
        method:'post',
        data
    })
}
// 用户信息
export function apiUserInfo(data){
    return request({
        url:'/salesman/user/info.do',
        method:'post',
        data
    })
}
// 业务员服务诊所列表
export function apiClinicList(data){
    return request({
        url:'/salesman/clinic/list.do',
        method:'post',
        data
    })
}
// 近期未开单诊所数量
export function apinoOrderCount(data){
    return request({
        url:'/salesman/clinic/noOrder/count.do',
        method:'post',
        data
    })
}
// 近期未开单诊所列表
export function apinoOrderList(data){
    return request({
        url:'/salesman/clinic/noorder/list.do',
        method:'post',
        data
    })
}
// 统计信息
export function apiStatsInfo(data){
    return request({
        url:'/salesman/stats/info.do',
        method:'post',
        data
    })
}
// 统计列表
export function apiStatsList(data){
    return request({
        url:'/salesman/stats/list.do',
        method:'post',
        data
    })
}
// 账户信息
export function apiAccountInfo(data){
    return request({
        url:'/salesman/account/info.do',
        method:'post',
        data
    })
}
// 账户流水详情
export function apiAccountRecordInfo(data){
    return request({
        url:'/salesman/account/record/info.do',
        method:'post',
        data
    })
}
// 账户流水列表
export function apiAccountRecordList(data){
    return request({
        url:'/salesman/account/record/list.do',
        method:'post',
        data
    })
}
// 银行卡绑定
export function apiBankCardBinding(data){
    return request({
        url:'/salesman/bankCard/binding.do',
        method:'post',
        data
    })
}
// 我的银行卡
export function apiBankCardInfo(data){
    return request({
        url:'/salesman/bankCard/info.do',
        method:'post',
        data
    })
} 
// 申请提现
export function apiWithdrawApply(data){
    return request({
        url:'/salesman/withdraw/apply.do',
        method:'post',
        data
    })
}
// 确认提现
export function apiWithdrawConfirm(data){
    return request({
        url:'/salesman/withdraw/confirm.do',
        method:'post',
        data
    })
}
// 微信
export function wxJS(data){
    return request({
        url:`/salesman/wx/getSign.do?url=${data}`,
        method:'get'
    })
}