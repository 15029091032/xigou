import http from './request'

/**
 * @param {data} 登录 
 */
export function login(data) {
  return http.httpRequest({
    url: http.LoginUrl,
    method:'post',
    },{...data})
}

/**
 * @param {data} 注册 
 */
export function userReg(data) {
  return http.httpRequest({
    url: '/login/register',
    method:'post',
    },{...data})
}

/**
 * @param {data} 注册 
 */
export function sendSms(data) {
  return http.httpRequest({
    url: '/login/sendSms',
    method:'post',
    },{...data})
}




/**
 * @param {data} 获取VIP价格列表 
 */
export function getVipPrice(data) {
  return http.httpRequest({
    url: '/index/getVipPrice',
    method:'post',
    },{...data})
}

/**
 * @param {data} 获取客服联系方式
 */
export function getContactInfo(data) {
  return http.httpRequest({
    url: '/index/getContactInfo',
    method:'post',
    },{...data})
}

/**
 * @param {data} 消息列表
 */
// export function selectMessgeList(data) {
//   return http.httpRequest({
//     url: 'index/selectMessgeList',
//     method:'post',
//     },{...data})
// }


export function selectMessgeList(data) {
	return http.httpTokenRequest({
		url: 'shop/selectMessgeList',
		method: 'post',
	},{...data})
}





