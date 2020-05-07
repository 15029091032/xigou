import http from './request'

/**
 * @param {data} 首页
 */
export function getSelectHome(data) {
	return http.httpTokenRequest({
		url: 'home/selectHome',
		method: 'post',
	},{...data})
}
export function getSelect(data) {
	return http.httpTokenRequest({
		url: 'home/selectNewShopList',
		method: 'post',
	},{...data})
}
export function getNewsDetail(data) {
	return http.httpTokenRequest({
		url: 'home/selectWordsById',
		method: 'post',
	},{...data})
}
export function getMarketDetail(data) {
	return http.httpTokenRequest({
		url: 'home/selectMarketingUserById',
		method: 'post',
	},{...data})
}
export function getFristTypeList(data) {
	return http.httpTokenRequest({
		url: 'home/selectFristTypeList',
		method: 'post',
	},{...data})
}
export function getSristTypeList(data) {
	return http.httpTokenRequest({
		url: 'home/selectTypeListByPid',
		method: 'post',
	},{...data})
}
export function getselectShopListByShopType(data) {
	return http.httpTokenRequest({
		url: 'home/selectShopListByShopType',
		method: 'post',
	},{...data})
}

export function getselectShopListBySearch(data) {
	return http.httpTokenRequest({
		url: 'home/selectShopListBySearch',
		method: 'post',
	},{...data})
}