<template>
	<view class="container">
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<input class="cell-tit" v-if="this.typeVule.loginType=='zhifubao'" v-model="typeVule.alipayno" placeholder="请输入支付宝账号"  />
			<input class="cell-tit" v-if="this.typeVule.loginType=='weixin'" v-model="typeVule.wechatno" placeholder="请输入微信账号"  />
			<!-- <text class="cell-tit" v-if="this.typeVule=='zhifubao'" :vaule="this.typeVule.alipayno">请输入支付宝账号</text>
			<text class="cell-tit" v-if="this.typeVule=='weixin'" :vaule="this.typeVule.wechatno">请输入微信账号</text> -->
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			
			<input class="cell-tit" v-if="this.typeVule.loginType=='zhifubao'" v-model="typeVule.alipayName" placeholder="请输入支付宝实名姓名"  />
				<input class="cell-tit" v-if="this.typeVule.loginType=='weixin'" v-model="typeVule.wechatName" placeholder="请输入姓名"  />
			
		</view>
	</view>
</template>

<script>
	
import { updateAccount } from '../../../api/user.js';
export default {
	data() {
		return {
			typeVule:''
		};
	},
	onLoad(option) {
		this.typeVule = option
		
		
	},
	onNavigationBarButtonTap:async  function(e) {
		let that=this;
	
		
				
				let d={'userid':uni.getStorageSync('dataInfo').id}
				
				if(that.typeVule.loginType=="zhifubao"){
					d.accountno=that.typeVule. alipayno;
					d.account_name=that.typeVule.alipayName
					d.type=2
				}else if(that.typeVule.loginType=="weixin"){
					d.accountno=that.typeVule.wechatno;
					d.account_name=that.typeVule.wechatName
					d.type=1
				}
				let data = await updateAccount(d);
				
				 
				if (data.status == 200) {
					
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
					that.$api.prePage().getUserInfo();
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
	},
	methods: {
		
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
		color: #999999;
		margin-right: 10upx;
	}
}
</style>
