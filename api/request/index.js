
const baseUrl = 'http://121.40.77.15:80/app/';
// const baseUrl = 'http://192.168.0.160:9071';
// const baseUrl = 'http://rc.lingyepro.com:9071';

const LoginUrl = 'login/login'
const httpRequest = (opts, data) => {
	var token = "";
	try {
	    token = uni.getStorageSync('token');
	} catch (e) {
		console.log(e,'catch')
	}
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'token': token,
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			// 'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		uni.request(httpDefaultOpts).then(
			(res) => {
				uni.hideLoading();
				if (res[1]) {
					if (res[1].statusCode == "200") {
						if(httpDefaultOpts.url == `${baseUrl}${LoginUrl}`){
							console.log(res,'res')
							uni.setStorage({
								key:'token',
								data:res[1].header.token,
								success() {
									// console.log('存储成功')
								}
							})
						}
						resolve(res[1].data)
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							mask:true
						})
						reject(response)
					}
				} else {
					reject(response)
				}
			}
		).catch(
			(response) => {
				reject(response)
				uni.showToast({
					title: '请求失败',
					icon: 'none',
					mask:true
				})
				
			}
		)
	})
	return promise
};
//带Token请求
const httpTokenRequest = (opts, data) => {
	var token = "";
	try {
	    token = uni.getStorageSync('token');
	} catch (e) {
		console.log(e,'catch')
	}
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			// "Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		uni.request(httpDefaultOpts).then(
			(res) => {
				uni.hideLoading();
				if (res[1]) {
					if (res[1].statusCode == "200" || res[1].statusCode == 200) {
						resolve(res[1].data)
					} else if(res[1].statusCode == "502"){
						uni.showToast({
							title: '未登录，请先登录',
							mask:true,
							duration:2000,
							icon:'none',
							success() {
								uni.removeStorage({
								    key:'userInfo',
								    success: function (res) {
								        uni.removeStorage({
								            key: 'token',
								            success: function (res) {
												setTimeout(res=>{
													uni.navigateTo({
														url: '/pages/login/login'
													});
												},2000)
								            }
								        });
								    }
								});
							}
						});
					}
				} else {
					reject(response)
				}
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};

export default {
	baseUrl,
	LoginUrl,
	httpRequest,
	httpTokenRequest
}
