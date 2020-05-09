<template>
	<view class="container">
		<view class="num-wrapper">
			<view class="left">
				<view class="num">{{this.money}}</view>
				<view class="txt">账户余额</view>
			</view>
		</view>
		<view class="transaction">
			<view class="t-h">交易明细</view>
			
			<!-- <view class="t-b">
				<view class="tbh">2020年2月15日&nbsp&nbsp13:24:25</view>
				<view class="tbf">
					<text>订单支付</text>
					<text>￥+100</text>
				</view>
			</view> -->
		<!-- 	<view class="t-b">
				<view class="tbh">2020年2月16日&nbsp&nbsp13:24:25</view>
				<view class="tbf">
					<text>订单支付</text>
					<text>￥-100</text>
				</view>
			</view>
			<view class="t-b">
				<view class="tbh">2020年2月15日&nbsp&nbsp13:24:25</view>
				<view class="tbf">
					<text>订单支付</text>
					<text>￥+150</text>
				</view>
			</view> -->
		</view>
		<view  :style="noStatus" class="noOrder" ><image src="../../../static/temp/wu1.png" mode=""></image></view>
	</view>
</template>

<script>
		import { selectAccountByUserid } from '../../../api/user.js';
	export default {
		data() {
			return {
				dataList:{},
				noStatus:'display:none',
				money:0,
			}
		},
		onLoad(option){
			//上一个页面返回来的月
			this.money=option.money
			this.selectDetail();
		},
		methods: {
		async selectDetail(){
			let that=this;
			 let data= await	selectAccountByUserid({userid:uni.getStorageSync('dataInfo').id,page:1,rows:10})
			 
			 console.log(data)
			 if(data.status==200){
				
				that.dataList = data.data;
				if(that.dataList.length==0){
					that.noStatus='display:block';
				}
			 }else{
				 uni.showToast({
				 	title: data.msg,
				 	icon: 'none'
				 });
			 }
			},
		}
	}
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}

.container {
	min-height: 100%;
	padding: 41upx 20upx;
	background-color: #f6f6f6;
	.num-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40upx;
		color: #fff;
		height: 160upx;
		background: linear-gradient(31deg, rgba(255, 161, 109, 1) 0%, rgba(255, 213, 47, 1) 99%);
		box-shadow: 0px 12upx 7upx 0px rgba(255, 190, 16, 0.18);
		border-radius: 16upx;
		.num {
			font-size: 50upx;
		}
		.txt {
			font-size: 22upx;
		}
	}
	.transaction {
		width: 94.67%;
		margin: 40upx auto;
		background-color: #FFFFFF;
		padding: 0 19upx;
		border-radius: 10upx;
		.t-h {
			width: 100%;
			height: 89upx;
			line-height: 89upx;
			font-size: 32upx;
			color: #333333;
		}
		.t-b {
			width: 100%;
			height: 120upx;
			.tbh {
				margin-top: 26upx;
				font-size: 24upx;
				color: #999999;
			}
			.tbf {
				display: flex;
				justify-content: space-between;
				margin-top: 15upx;
				font-size: 28upx;
				color: #333333;
			}
		}
	}
}
.noOrder{text-align: center;    margin-top: 20%;}
	.noOrder>image{width: 40%;height: 260upx;}
</style>
