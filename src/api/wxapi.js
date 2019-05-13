import axios from '@/api/http.js'

//获取微信jssdk配置
export function getJssdkConfig(appid) {
    var curUrl = encodeURIComponent(window.location.href.split('#')[0]);
    const url = 'https://tp.ymdatas.com/wxsvr/api/jssdk/config?appid=' + appid + '&url=' + curUrl;
    return axios.post(url);
}

//调取支付,totalFee支付金额单位为分
export function postJsapiPay(orderid, gsid, totalFee, openid) {
    var params = {accountno: orderid, gsid: gsid, totalFee: totalFee, wxbody: "", openid: openid};
    return axios.post("https://tp.ymdatas.com/wxsvr/api/pay/jsapi", params);
}

