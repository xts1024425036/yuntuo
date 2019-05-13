//处理修改state的值, 同步操作, 非异步.  建议方法名大写
//1.可以通过 this.$store.commit('MUTATION_NAME_01',VAL) 来使用 MUTATION_NAME_01 函数并传递参数 VAL;
//2.也可以在 methods 中使用 mapMutations(['MUTATION_NAME_01']) 来挂载, 然后直接使用 MUTATION_NAME_01(VAL)来调用函数
import { getToken, getWXUser} from 'js/cache';

const mutations = {
    initStore(state) {
        console.log("init store state");
        state.inited = true;
        let _wxappid = state.wxAppid;
        state.token = getToken(_wxappid);
        state.wxUser = getWXUser(_wxappid);
    },
    SAVE_TOKEN(state, val) {
        state.token = val;
    },
    SAVE_WXUSER(state, user) {
        state.wxUser = user;
    },
    LOGOUT(state) {
        state.token = null;
    }

};

export default mutations;