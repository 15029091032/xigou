<template>
	<view class="container">
		<text class="upload" @click="upload()">上传</text>
		 <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FFE200"></uni-segmented-control>
		        <view class="content">
		            <view v-show="current === 0">
		                <image src="../../../static/temp/wu1.png" class="bijing" v-if="recommend==1"></image>
		                <view class="collection" v-if="recommend==0">
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
		                			<text>下架</text>
		                			<text>编辑</text>
		                			<text style="color: #ef4321;">删除</text>
		                		</view>
		                	</view>
		                </view>
		            </view>
		            <view v-show="current === 1">
		                <image src="../../../static/temp/wu1.png" class="bijing" v-if="this.recommend==1"></image>
		                <view class="collection" v-if="recommend==0">
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
		        </view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	data() {
		return {
			recommend :0,
			items: ['已发布', '草稿箱'],
			current: 1
		};
	},
	components: { uniSegmentedControl },
	methods: {
		onClickItem(index) {
			if (this.current !== index.currentIndex) {
				this.current = index.currentIndex;
			}
		},
		upload() {
			uni.navigateTo({
				url:'../uploadGoods/uploadGoods'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}
.container {
	min-height: 100%;
	background-color: #f6f6f6;
	
}
.collection {
		width: 100%;
		height: 286upx;
		margin-top: 20upx;
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
	.bijing {
		width: 41.6%;
		height: 290upx;
		margin: auto;
		position: fixed;
		left: 28%;
		top: 38%;
	}
	.upload {
		position: fixed;
		z-index: 9999;
		bottom: 96%;
		left: 88%;
		width: 60upx;
		height: 26upx;
		font-size: 26upx;
		color: #666;
	}
</style>
