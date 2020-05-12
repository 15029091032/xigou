import http from './request'

/**
 * @param {data}  企业 商品管理-添加
 */
export function saveShopByUserid(data) {
	return http.httpTokenRequest({
		url: '/shop/saveShopByUserid',
		method: 'post',
	},{...data})
}

/**
 * @param {data}  企业 商品管理-列表
 */
export function selectShopsByUserid(data) {
	return http.httpTokenRequest({
		url: '/shop/selectShopsByUserid',
		method: 'post',
	},{...data})
}

/**
 * @param {data}  企业 商品-下架 商家
 */
export function upShopByUserid(data) {
	return http.httpTokenRequest({
		url: '/shop/upShopByUserid',
		method: 'post',
	},{...data})
}
/**
 * @param {data}  企业 商品-下架 商家
 */
export function deleteShopByUserid(data) {
	return http.httpTokenRequest({
		url: '/shop/deleteShopByUserid',
		method: 'post',
	},{...data})
}

/**
 * @param {data}  企业 商品-编辑详情
 */
export function selectShopByID(data) {
	return http.httpTokenRequest({
		url: '/shop/selectShopByID',
		method: 'post',
	},{...data})
}

/**
 * @param {data}  企业 商品自荐/店铺每日爆品/店铺商品
 */
export function selectShopListByUserid(data) {
	return http.httpTokenRequest({
		url: '/shop/selectShopListByUserid',
		method: 'post',
	},{...data})
}


