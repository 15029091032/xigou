<template>
	<view class="container">
		<view class="plus-wrapper">
			<view class="plus-box">
				<view class="box-item">
					<view class="num-box">
						<text>¥</text>
						<view class="num">1980/<text>年</text></view>
					</view>
					<view class="txt">立即购买</view>
				</view>
				<view class="box-item">
					<view class="num-box">
						<text>¥</text>
						<view class="num">1980/<text>年</text></view>
					</view>
					<view class="txt">立即购买</view>
					<image class="hots" src="../../../static/icon-005.png"></image>
				</view>
			</view>
		</view>
		<view class="money">
			<text class="m-l">支付金额</text>
			<text class="m-r">¥1980</text>
		</view>
		<view class="draw">
				<view class="list-cell">
					<text class="cell-more">支付方式</text>
				</view>
				<view class="list-cells">
					<view class="cell-img">
						<image src="../../../static/temp/share_wechat.png" mode="" class="zf"></image>
						<text class="zfs">微信支付</text>
					</view>
					<image src="../../../static/icon-007.png" class="xz"></image>
				</view>
				<view class="list-cells">
					<view class="cell-img">
						<image src="../../../static/temp/WechatIMG1.png" mode="" class="zf"></image>
						<text class="zfs">支付宝支付</text>
					</view>
					<image src="../../../static/icon-006.png" class="xz"></image>
				</view>
		</view>
		<view class="list-cell kt-btn">
			 <button type="primary" class="cell-tits">开通plus会员</button>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
page{
		min-height: 100%;
		background-color: #fff;
	}
.container{
		min-height: 100%;
		background-color: #f6f6f6;
		padding: 10upx;
}
.plus-wrapper{
		margin-top: 20upx;
		padding: 30upx;
		background-color: #fff;
		.plus-box{
			display: flex;
			justify-content: space-between;
			margin-top: 30upx;
			.box-item{
				position: relative;
				display: flex;
				justify-content: space-between;
				width: 317upx;
				height: 150upx;
				padding: 20upx 0 20upx 30upx;
				background-image: url(../../../static/icon-004.png);
				background-size: 100% 100%;
				box-sizing: border-box;
				.num-box{
					display: flex;
					align-items: baseline;
					padding-top: 30upx;
					text{
						margin-right: 10upx;
						font-size: 26upx;
					}
					.num{
						font-size: 50upx;
						text{
							font-size: 24upx;
						}
					}
				}
				.txt{
					display: flex;
					align-items: center;
					width: 20upx;
					margin-top: 14upx;
					padding:0 20upx;
					line-height: 1;
					font-size: 22upx;
					border-left: 1px dashed #04202B;
					box-sizing: content-box;
				}
				.hots{
					position: absolute;
					right: 0;
					top: -16upx;
					width: 84upx;
					height: 45upx;
				}
			}
		}
	}
.money {
	width: 100%;
	height: 100upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	padding: 30upx;
	margin-top: 20upx;
	margin-bottom: 20upx;
	font-size: 30upx;
	color: #333;
}
.draw {
		width: 100%;
		height: 274upx;
		background-color: #fff;
		margin: 0 auto;
		.list-cell {
			padding: 34upx;
			.cell-more {
				font-size: 30upx;
				color: #333333;
			}
		}
		.list-cells {
			display: flex;
			justify-content: space-between;
			
			padding: 0 34upx;
			.xz {
				width: 30upx;
				height: 30upx;
			}
			.cell-img {
				height: 80upx;
				vertical-align:middle;
				.zfs {
					font-size: 30upx;
					color: #333333;
					line-height: 45upx;
				}
				.zf {
					width: 45upx;
					height: 45upx;
					margin-right: 17upx;
				}
			}
		}
	}
	.cell-tits {
		background-color: #ffe200;
		font-size: 32upx;
		color: #333;
		margin-top: 80upx;
	}
</style>
