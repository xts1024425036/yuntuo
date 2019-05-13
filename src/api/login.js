import axios from '@/api/http.js'

export function wxOAuthLogin(appid, code, state) {
    const url = '/oauth/wx?appid=' + appid + '&code=' + code + '&state=' + state;
    return axios.post(url);
}

export function wxCheckMobileBind() {
    return axios.post("/user/wxCheckMobile");
}

export function wxBindMobile(mobile, vcode) {
    return axios.post('/user/wxBindMobile', {mobile: mobile, vcode: vcode});
}
