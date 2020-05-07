<template>
	<view class="container">
		<image src="../../../static/temp/wu1.png" class="bijing" v-if="this.recommend==1"></image>
		<view class="collection" v-if="this.recommend==0">
			<image class="colle-left" src="../../../static/xiangji.png"></image>
			<image src="../../../static/home/bao.png" class="cl-t"></image>
			<view class="colle-right">
				<view class="crh">博纳天纯由猫粮博纳天纯由猫粮</view>
				<view class="crb">￥10.9</view>
				<view class="crf">
					<view class="crf-l">
						<image class="c-v" src="../../../static/vip.png"></image>
						<text class="prc">￥9.9</text>
					</view>
				</view>
				<view class="caozuo">
					<text>上架</text>
					<text>编辑</text>
					<text style="color: #ef4321;">删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommend :0
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
			position: relative;
		}
		.cl-t {
			position: absolute;
			width: 49upx;
			height: 65upx;
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
			.caozuo {
				width: 250upx;
				display: flex;
				justify-content: space-between;
				font-size: 26upx;
				color: #999;
				margin: 60upx 20upx 31upx 250upx;
			}
		}
	}
}
.bijing {
	width: 41.6%;
	height: 290upx;
	margin: auto;
	position: fixed;
	left: 28%;
	top: 38%;
}
</style>
