//缓存状态或变量信息
//1.可以通过 this.$store.state.STATE_NAME_01 来获取值;
//2.也可以在 computed 中使用 mapState(['STATE_NAME_01','STATE_NAME_02']) 来挂载, 然后直接使用this.STATE_NAME_01来获取值

const state = {
    inited: false,
    wxAppid: "wx09b413cc4dbb9bc6",
    gsid: "99990000001",
    token: "",
    wxUser: {}
};

export default state
