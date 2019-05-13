//这里是定义方法, 用来提交异步或多事件批量处理
//1.可以通过 this.$store.dispatch('ACTION_NAME_01',VAL).then(()=>{}); 来使用 ACTION_NAME_01 函数并传递参数 VAL;
//2.也可以在 methods 中使用 mapActions(['ACTION_NAME_01']) 来挂载, 然后直接使用 ACTION_NAME_01(VAL).then(OTHER_FUNCTION)来调用函数
//dispatch传入参数必须在一个Object中, 无法传入第3个参数

import { cacheToken, cacheWXUser} from 'js/cache';

export const saveTokenAndWXUser = function ( {commit, state}, {token, user}) {
    commit('SAVE_TOKEN', token);//修改state中token的值
    cacheToken(state.wxAppid, token);//缓存token的值

    commit('SAVE_WXUSER', user);//修改state中的wxuser信息
    cacheWXUser(state.wxAppid, user);//缓存wxuser信息
};

export const logOut=function({commit, state}){
    commit('LOGOUT');
    cacheToken(state.wxAppid, null);
};

