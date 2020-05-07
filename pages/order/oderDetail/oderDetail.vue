<template>
	<view class="container">
		<view class="card" >
			<view class="card-hd">
				<view class="hd-left">订单编号：C01254638820</view>
				<view class="hd-right">待付款</view>
			</view>
			<view class="line"></view>
			<view class="card-content">
				<view class="content-left">
					<image  mode="scaleToFill" class="img" src="../../../static/001.png"></image>
				</view>
				<view class="content-right">
					<view class="name">
						酒心巧克力美味更持久
					</view>
					<view class="guige">
						<view class="guige-left">数量 ×2</view>
						<view class="guige-right">￥198</view>
					</view>
				</view>
			</view>
			<view class="card-footer">
				成交时间：2020-4-18 &nbsp&nbsp 15:34
			</view>
		</view>
		<view class="detail">
			<view class="namber">订单编号：&nbsp20179139173130</view>
			<view class="times">创建时间:&nbsp2020-4-18&nbsp15:00</view>
			<view class="price">订单总价：&nbsp￥198.00</view>
			<view class="byPlan">待付款:&nbsp￥396.00</view>
		</view>
		 <view class="goBy">
			 <button class="mini-btn btn" type="default" size="mini">去付款</button>
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

<style lang="scss">
	page{
		min-height: 100%;
		background-color: #f6f6f6;
		// position: relative;
	}
	.container{
		min-height: 100%;
		margin-top: 10upx;
		// position: relative;
		background-color: #fff;
	}
	.line {
		border: 2upx solid #eee;
		margin-top: 20upx;
	}
	.img {
			width: 210upx;
			height: 167upx ;
		}
	.card {
		width: 100%;
		height: 400upx;
		padding: 40upx 30upx;
	}
	.card-hd {
		display: flex;
		justify-content: space-between;
	}
	.card-content {
		width: 100%;
		padding-top: 30upx;
		display: flex;
		justify-content: space-between;
		.content-left {
			width: 141upx;
			height: 118upx ;
		}
		.content-right {
			height: 118upx;
			width: 64%;
			margin-left: 30upx;
			.name {
				padding-top: 30upx;
				font-size: 30upx;
				color: #333333;
			}
			.guige {
				padding-top: 50upx;
				display: flex;
				justify-content: space-between;
				.guige-left {
					font-size: 24upx;
					color: #999;
				}
				.guige-right {
					font-size: 26upx;
					color: #ef4321;
				}
			}
		}
	}
	.hd-left {
		font-size: 26upx;
		color: #666666;
	}
	.hd-right {
		font-size: 26upx;
		color: #aaaaaa;
	}
.card-footer {
	width: 100%;
	height: 73upx;
	margin-top: 80upx;
	padding: 20upx;
	border-top: 2upx solid #eee;
	font-size: 26upx;
	color: #666;
}
.detail {
	border-top: 30upx solid #f6f6f6;
	width: 100%;
	height: 250upx;
	padding: 29upx;
	font-size: 26upx;
	line-height: 40upx;
	.byPlan {
		color: #ef4321;
	}
}
.goBy {
	position: absolute;
	bottom: 19upx;
	right: 31upx;
	.btn {
		width: 150upx;
		height: 60upx;
		border-radius: 10upx;
		color: #ffe200;
	}
}
</style>
