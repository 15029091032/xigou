<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="change()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">更换手机</text>
			<text class="cell-tits">{{userDetail.userphone}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('zhifubao')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">支付宝绑定</text>
			<text class="cell-tits" >{{(userDetail.alipayno==''||userDetail.alipayName=='')?'未绑定':'已绑定'}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('weixin')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">微信绑定</text>
			<text class="cell-tits">{{(userDetail.wechatno==''||userDetail.wechatName=='')?'未绑定':'已绑定'}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	
	import { selectAppUserByUserid } from '../../api/user.js';
export default {
	data() {
		return {
			userDetail:{},
		};
	},
	onLoad(){
			this.getUserInfo()
	},
	methods: {
		async getUserInfo(){
			let that=this;
			 
			let data= await selectAppUserByUserid({userid:uni.getStorageSync('dataInfo').id})
			
		
			if (data.status == 200) {
				that.userDetail=data.data;
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
			
			
		},
		change() {
			uni.navigateTo({
				url: './changPhone/changPhone'
			});
		},
		navTo(type) {
			let that=this;
			// console.log(e)
			uni.navigateTo({
				url: `bindAccount/bindAccount?loginType=${type}&wechatno=${that.userDetail.wechatno}&wechatName=${that.userDetail.wechatName}&alipayno=${that.userDetail.alipayno}&alipayName=${that.userDetail.alipayName}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
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
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: #444444;
		margin-right: 10upx;
	}
}
.cell-tits {
	font-size: 28upx;
	color: #aaaaaa;
}
</style>
