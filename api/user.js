import http from './request'

/**
 * @param {data} 获取用户评价列表
 */
export function getUserCommentList(data) {
	return http.httpTokenRequest({
		url: '/user/getUserCommentList',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 获取预约电话
 */
export function getStoreOrderPhone(data) {
	return http.httpTokenRequest({
		url: '/user/getStoreOrderPhone',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 添加店铺评价
 */
export function addStoreComment(data) {
	return http.httpTokenRequest({
		url: '/user/addStoreComment',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 获取用户预约列表
 */
export function getStoreOrderList(data) {
	return http.httpTokenRequest({
		url: '/user/getStoreOrderList',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 删除用户评价
 */
export function deleteUserComment(data) {
	return http.httpTokenRequest({
		url: '/user/delComment',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 我的订单
 */
export function getOrderList(data) {
	return http.httpTokenRequest({
		url: '/order/selectOrderListByStatus',
		method: 'post',
	},{...data})
}



/**
 * @param {data} 我的地址列表
 */
export function selectAddressByUserid(data) {
	return http.httpTokenRequest({
		url: 'address/selectAddressByUserid',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 编辑用户地址
 */
export function updateAddress(data) {
	return http.httpTokenRequest({
		url: 'address/updateAddress',
		method: 'post',
	},{...data})
}



