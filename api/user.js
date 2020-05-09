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

/**
 * @param {data} 删除用户地址
 */
export function deleteAddress(data) {
	return http.httpTokenRequest({
		url: 'address/deleteAddress',
		method: 'post',
	},{...data})
}




/**
 * @param {data} 我的收藏
 */
export function selectConlectShopsByUserid(data) {
	return http.httpTokenRequest({
		url: 'shop/selectConlectShopsByUserid',
		method: 'post',
	},{...data})
}





/**
 * @param {data} 添加用户地址
 */
export function addAddress(data) {
	return http.httpTokenRequest({
		url: 'address/addAddress',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 优惠券列表
 */
export function selectConpostByUserid(data) {
	return http.httpTokenRequest({
		url: 'user/selectConpostByUserid',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 用户个人信息
 */
export function selectAppUserByUserid(data) {
	return http.httpTokenRequest({
		url: 'user/selectAppUserByUserid',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 交易明细列表
 */
export function selectAccountByUserid(data) {
	return http.httpTokenRequest({
		url: 'user/selectAccountByUserid',
		method: 'post',
	},{...data})
}
/**
 * @param {data} 修改手机号
 */
export function updatePhone(data) {
	return http.httpTokenRequest({
		url: 'user/updatePhone',
		method: 'post',
	},{...data})
}
/**
 * @param {data} 绑定微信/支付宝
 */
export function updateAccount(data) {
	return http.httpTokenRequest({
		url: 'user/updateAccount',
		method: 'post',
	},{...data})
}


/**
 * @param {data} 修改昵称
 */
export function updateNickname(data) {
	return http.httpTokenRequest({
		url: 'user/updateNickname',
		method: 'post',
	},{...data})
}
/**
 * @param {data} 修改性别
 */
export function updateSex(data) {
	return http.httpTokenRequest({
		url: 'user/updateSex',
		method: 'post',
	},{...data})
}


/**
 * @param {data} 修改头像
 */
export function updateHeadImg(data) {
	return http.httpTokenRequest({
		url: 'user/updateHeadImg',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 意见反馈
 */
export function addFeedBack(data) {
	return http.httpTokenRequest({
		url: 'user/addFeedBack',
		method: 'post',
	},{...data})
}






