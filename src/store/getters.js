//返回需要计算state的结果, 跟computed差不多，接收state作为参数，不接受组件传参数
//1.可以通过this.$store.getters.GETTERS_NAME_01 来获取值;
//2.也可以在 computed 中使用 mapGetters(['GETTERS_NAME_01','GETTERS_NAME_02']) 来挂载, 然后直接使用this.GETTERS_NAME_01来获取值


// 类似计算属性 算出当前歌曲
// export const currentSong = (state) => {
// 	return state.playList[state.currentIndex] || {}
// }
