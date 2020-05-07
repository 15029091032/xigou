<template>
	<view class="container">
		<view class="list">
			<view class="list-l">
				<image src="../../../../static/home/WechatIMG3.png"></image>
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
				<image src="../../../../static/home/WechatIMG2.png"></image>
			</view>
			<view class="list-r">
				<view class="r-t">
					<text class="t-h">服务通知</text>
					<text class="t-hb">2020-04-16 13:26:28</text>
				</view>
				<text class="r-b">亲，有新物品上心</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option:{},
			}
		},
		onLoad(option) {
			console.log(option.name)
			uni.setNavigationBarTitle({
				title: option.name
			})
		},
		methods: {
			
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
	padding-top: 10upx;
	.list {
		width: 100%;
		display: flex;
		align-items: left;
		background-color: #fff;
		border-bottom: 2upx solid #eee;
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
</style>
