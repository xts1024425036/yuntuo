import axios from '@/api/http.js'

//查询客户订单
export function findOrders(pageNo, df, st) {
    let pagesize = st === "uncomplete" ? 5 : 8;
    return axios.get('/ctmOrders?page=' + pageNo + '&df=' + df + '&st=' + st + '&pageSize=' + pagesize);
}

//给问题单的反馈打分
export function scoreIssueOrder(issueid, score) {
    return axios.post('/score/issue?id=' + issueid + '&stars=' + score);
}

//给普通订单打分
export function scoreOrder(orderid, score) {
    return axios.post('/score/delivery?id=' + orderid + '&stars=' + score);
}

//修改订单状态为已收货
export function commitOrderReceived(orderid) {
    return axios.post('/ctmOrders/status/received?orderid=' + orderid);
}

//修改订单状态为已安装
export function commitOrderInstalled(orderid) {
    return axios.post('/ctmOrders/status/installed?orderid=' + orderid);
}

export function createIssueOrder(orderid, issueDesc) {
    var params = {sourceOrderid: orderid, issueDesc: issueDesc};
    return axios.post('/ctmOrders/issueCreate', params);
}
