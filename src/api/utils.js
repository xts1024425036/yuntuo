import axios from '@/api/http.js'

//发送验证码
export function sendVCodeToMobile(mobile) {
    const url = '/sms/vcode/send';
    return axios.post(url, {type: "wxbind", mobile: mobile});
}

