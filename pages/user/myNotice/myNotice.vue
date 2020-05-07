<template>
	<view class="container">
		<view class="title">
			<view class="t-t" @click="gonews('服务通知')">
				<image src="../../../static/home/WechatIMG3.png" mode=""></image>
				<text class="miaoshu">服务通知</text>
			</view>
			<view class="t-t" @click="gonews('优惠促销')">
				<image src="../../../static/home/WechatIMG1.png" mode=""></image>
				<text class="miaoshu">优惠促销</text>
			</view>
			<view class="t-t">
				<image src="../../../static/home/WechatIMG4.png" mode=""></image>
				<text class="miaoshu">对话</text>
			</view>
		</view>
		<view class="tbody">
			<view class="list">
				<view class="list-l">
					<image src="../../../static/home/WechatIMG3.png"></image>
				</view>
				<view class="list-r">
					<view class="r-t">
						<text class="t-h">服务通知</text>
						<text class="t-hb">2020-04-16 13:26:28</text>
					</view>
					<text class="r-b">亲，有新物品上心</text>
				</view>
			</view>
			<view class="list">
				<view class="list-l">
					<image src="../../../static/home/WechatIMG2.png"></image>
				</view>
				<view class="list-r">
					<view class="r-t">
						<text class="t-h">优惠通知</text>
						<text class="t-hb">2020-04-16 13:26:28</text>
					</view>
					<text class="r-b">亲，有新物品上心</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
			}
		},
		methods: {
			gonews(name) {
				uni.navigateTo({
					url: `./severnews/severnews?name=${name}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
		min-height: 100%;
		background-color: #f6f6f6;
	}
.container {
	min-height: 100%;
	background-color: #f6f6f6;
	margin-top: 13upx;
	padding: 20upx;
	.title {
		width: 94.67%;
		height: 220upx;
		margin: auto;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		padding-top: 33upx;
		.t-t {
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 110upx;
				height: 110upx;
			}
			.miaoshu {
				font-size: 24upx;
				color: #666;
				margin-top: 10upx;
			}
		}
	}
	.tbody {
		margin-top: 20upx;
		width: 100%;
		min-height: 240upx;
		padding: 0 20upx 20upx 20upx;
		.list {
			width: 100%;
			height: 100upx;
			display: flex;
			align-items: left;
			border-bottom: 2upx solid #eee;
			margin-bottom: 5upx;
			.list-l {
				image {
					width: 80upx;
					height: 80upx;
					margin-right: 21upx;
				}
			}
			.list-r {
				display: flex;
				flex-direction: column;
				width: 83.2%;
				.r-t {
					display: flex;
					justify-content: space-between;
					.t-h {
						font-size: 28upx;
						color: #333;
					}
					.t-hb {
						font-size: 20upx ;
						color: #999;
						// margin-right: 20upx;
					}
				}
				.r-b {
					font-size: 24upx;
					color: #666;
				}
			}
		}
	}
}	
</style>
