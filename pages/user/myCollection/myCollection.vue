<template>
	<view class="container">
		<view class="collection">
			<image class="colle-left" src="../../../static/xiangji.png"></image>
			<view class="colle-right">
				<view class="crh">博纳天纯由猫粮博纳天纯由猫粮</view>
				<view class="crb">￥10.9</view>
				<view class="crf">
					<view class="crf-l">
						<image class="c-v" src="../../../static/vip.png"></image>
						<text class="prc">￥9.9</text>
					</view>
					<image class="c-x" src="../../../static/shc.png"></image>
				</view>
			</view>
		</view>
		<view class="collection">
			<image class="colle-left" src="../../../static/xiangji.png"></image>
			<view class="colle-right">
				<view class="crh">博纳天纯由猫粮博纳天纯由猫粮</view>
				<view class="crb">￥10.9</view>
				<view class="crf">
					<view class="crf-l">
						<image class="c-v" src="../../../static/vip.png"></image>
						<text class="prc">￥9.9</text>
					</view>
					<image class="c-x" src="../../../static/shc.png"></image>
				</view>
			</view>
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
		background-color: #f6f6f6;
	}
	.container{
		min-height: 100%;
		background-color: #f6f6f6;
		padding-top: 10upx;
		.collection {
			width: 100%;
			height: 286upx;
			// margin-top: 10upx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			.colle-left {
				width: 188upx;
				height: 188upx;
				margin: 40upx 15upx 50upx 35upx;
			}
			.colle-right {
				margin: 30upx 15upx 88upx 15upx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.crh {
					font-size: 28upx;
					color: #666;
				}
				.crb {
					font-size: 26upx;
					color: #333;
				}
				.crf {
					display: flex;
					justify-content: space-between;
					.crf-l {
						.c-v {
							width: 38upx;
							height: 22upx;
						}
						.prc {
							font-size: 30upx;
							color: #ef4321;
							margin-left: 5upx;
						}
					}
					.c-x {
						width: 42upx;
						height: 37upx;
					}
				}
			}
		}
	}
</style>
