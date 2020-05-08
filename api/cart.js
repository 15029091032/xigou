import http from './request'

/**
 * @param {data} 购物车数量修改
 */
export function updateOrderShopNum(data) {
	return http.httpTokenRequest({
		url: 'shop/updateOrderShopNum',
		method: 'post',
	},{...data})
}

/**
 * @param {data} 购物车列表
 */
export function selectOrderShopsByUserid(data) {
	return http.httpTokenRequest({
		url: 'shop/selectOrderShopsByUserid',
		method: 'post',
	},{...data})
}


/**
 * 	收藏商品
 * 
 * */
 export function sureConlectShopsByUserid(data) {
 	return http.httpTokenRequest({
 		url: 'shop/sureConlectShopsByUserid',
 		method: 'post',
 	},{...data})
 }
 
 /**
  * 	删除购物车
  * 
  * */
  export function deleteOrderShop(data) {
  	return http.httpTokenRequest({
  		url: 'shop/deleteOrderShop',
  		method: 'post',
  	},{...data})
  }
  
 /**
  * 	加入购物车
  * 
  * */
  export function addOrderShop(data) {
  	return http.httpTokenRequest({
  		url: 'shop/addOrderShop',
  		method: 'post',
  	},{...data})
  }
  