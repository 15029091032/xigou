<template>
	<view class="container">
		<view class="tittle">欢迎进入玺购商城</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<image class="cell-more yticon iconS" src="../../../static/home/4.png"></image>
			<input class="uni-input cell-tit" type="number" v-model="phone" placeholder="请输入手机号" />
			<image class="cell-more yticon iconS" @click='clearText()' style="width: 30upx;height: 30upx;" src="../../../static/home/5.png"></image>
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<image class="cell-more yticon iconS" src="../../../static/home/6.png"></image>
			<input class="uni-input cell-tit" type="number" v-model="numberCode" placeholder="请输入验证码" />
			<button class="mini-btn yticon btn" type="primary" @click='getCode()' size="mini">{{butCode}}</button>
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<image class="cell-more yticon iconS" src="../../../static/home/77.png"></image>
			<input class="uni-input cell-tit" v-model="pid" type="text" placeholder="请输入验证码" />
			<!-- <button class="mini-btn yticon btn" type="primary" size="mini">获取验证码</button> -->
		</view>
		<view class="btns">
			
			<button class="b-t" @click="goregister()">注册</button>
			<!-- <button class="b-f" @click="goInto()">登录</button> -->
		</view> 
	</view>
</template>

<script>
import { isEmpty } from '../../../utils/Utils.js';
import { sendSms, login, userReg } from '../../../api/index.js';
import { timeCode_b } from '../../../public/base.js';
export default {
	data() {
		return {
			address: {
				province: '陕西省',
				city: '西安市',
				area: '雁塔区'
			},
			loadingType: '1',
			phone: '15686408836',
			pid: '',
			numberCode: '',
			butCode:'获取验证码',
		};
	},
	methods: {
		goInto() {
			uni.navigateTo({
				url: '../loginTypes/loginTypes?loadingType='+this.loadingType
			});
		},
		goregister() {
			this.checkData(1);
			// uni.navigateTo({
			// 	url: '../register/register'
			// });
		},
		clearText() {
			this.phone = '';
		},
		checkData(type) {
			// 0 登陆；   1注册
			let that = this;
			if (isEmpty(this.phone)) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
			} else if (isEmpty(this.numberCode)) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
			} else {
				let d = {
					userphone: that.phone,
					smscode: that.numberCode,
					type: that.loadingType, //1企业入口  2个人入口
					province: that.address.province,
					city: that.address.city,
					pid: that.pid,
					area: that.address.area
				};
				if (type == 0) {
					//登陆
					that.login(d);
				} else {
					//1注册
					 that.register(d);
				}
			}
		},
		getCode() {
			if (isEmpty(this.phone)) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
			} else {
				this.getSend(this.phone);
			}
		},
		async getSend(phone) {
			
		if(this.butCode!='获取验证码')	return
		
		
		
		
			let data = await sendSms({
				loginName: phone
			});
			if (data.status == 200) {
				 timeCode_b(this)
				uni.showToast({
					title: "发送成功",
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		},
		async login(d) {
			let data = await login(d);
		},
		async register(d) {
			
			let data = await userReg(d);
			
			if (data.status == 200) {
			    uni.setStorageSync('dataInfo', data.data);
				uni.setStorageSync('loadingType', this.loadingType);
				uni.setStorage({
					key:'token',
					data: data.data.token,
					success() {
						
					}
				})
			
			
				uni.switchTab({
					url: '../../index/index'
				});
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		}
	},
	onLoad(e) {
		console.log('e==', e);
		this.loadingType = e.loadingType;
		this.address = uni.getStorageSync('address');
	}
};
</script>

<style lang="scss" scoped>
page,
.container {
	min-height: 100%;
	background-color: #ffffff;
}
.tittle {
	width: 100%;
	height: 174upx;
	padding-left: 100upx;
	font-size: 60upx;
	color: #444444;
	margin-top: 160upx;
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	// &.m-t{
	// 	margin-top: 16upx;
	// }
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: #999999;
		margin-right: 10upx;
	}
}
.cell-tits {
	font-size: 28upx;
	color: #aaaaaa;
}
.iconS {
	margin-right: 4.4%;
	width: 30upx;
	height: 35upx;
}
.btn {
	width: 156upx;
	height: 54upx;
	font-size: 10upx;
	color: #333333;
	background-color: #ffe200;
}
.btns {
	width: 100%;
	padding: 0 100upx;
	margin-top: 229upx;
	.b-t {
		background-color: #ffe200;
		border-radius: 46upx;
		height: 92upx;
		text-align: center;
	}
	.b-f {
		background-color: #fff;
		border-radius: 46upx;
		height: 92upx;
		border: 2upx solid #ffe200;
		margin-top: 40upx;
		color: #ffe200;
	}
}
</style>
