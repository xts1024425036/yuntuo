// 缓存
// 引入storage的第三方库
import storage from 'good-storage';


//获取登陆token
export function getToken(appid) {
    return storage.get(appid + "_token", null);
}

//保存登陆token
export function cacheToken(appid, token) {
    storage.set(appid + "_token", token);
}

//微信用户信息
export function getWXUser(appid) {
    return storage.get(appid + "_wxuser", null);
}

export function cacheWXUser(appid, wxuser) {
    storage.set(appid + "_wxuser", wxuser);
}
