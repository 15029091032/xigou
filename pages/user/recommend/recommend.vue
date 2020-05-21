<template>
	<view class="container">
		<!-- <image src="../../../static/temp/wu1.png" class="bijing" v-if=""></image> -->
		<view class="collection" v-for="(item, index) in dataList" :key="index" v-if="dataList.length != 0">
			<image class="colle-left" :src="item.shopImg"></image>
			<!-- <image src="../../../static/home/bao.png" class="cl-t"></image> -->
			<view class="colle-right">
				<view class="crh">{{ item.shopName }}</view>
				<view class="crb">￥{{ item.realPrice }}</view>
				<view class="crf">
					<view class="crf-l">
						<image class="c-v" src="../../../static/vip.png"></image>
						<text class="prc">￥{{ item.vipPrice }}</text>
					</view>
				</view>
				<view class="caozuo">
					<!-- <text>上架</text>
					<text>编辑</text> -->
					<image class="topImg" @click="upShop(item)" src="../../../static/issue.png"></image>
				</view>
			</view>
		</view>
			
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { selectShopListByUserid } from '../../../api/goods.js';
import { sortShopByUserid } from '../../../api/user.js';
export default {
	data() {
		return {
			recommend: 0,
			dataList: [],
			pageSize: 1,
			pageRows: 10,
			isLoadMore: false,
			loadMore:'more', //	load
		};
	},
	onLoad() {
		this.viewData(true);
	},
	onReachBottom() {
		// console.log("pageSize:",this.pageSize)
		// console.log("pageRows:",this.pageRows)
		// console.log("isLoadMore:",this.isLoadMore)
		
		if (this.isLoadMore) {
			this.pageSize = this.pageSize + 1;
			this.viewData(true);
		}
	},
	methods: {
		async viewData(sta) {
			let that = this;

			let data = await selectShopListByUserid({ userid: uni.getStorageSync('dataInfo').id, page: that.pageSize, rows: that.pageRows, type: 1 });
			console.log('data', data);
			if (data.status == 200) {
				if(data.data.length==that.pageRows){
					that.isLoadMore=true;
				}else{
					that.isLoadMore=false;
				}
				if(sta){
					that.dataList = that.dataList.concat(data.data);
				}else{
					that.dataList = data.data;
				}
			
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		},
		async upShop(item) {
			let that = this;

			let data = await sortShopByUserid({ shopid: item.id });
			
			if (data.status == 200) {
				that.viewData(false);
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
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
	padding-top: 10upx;
	.collection {
		width: 100%;
		height: 286upx;
		// margin-top: 10upx;
		background-color: #fff;
		display: flex;
		// justify-content: space-between;
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
			width: 70%;
			margin: 50upx 40upx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.crh {
				font-size: 28upx;
				color: #666;
			}
			.crb {
				line-height: 50upx;
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
				text-align: right;
				font-size: 26upx;
				color: #999;
				width: 100%;
				margin: 30upx 0upx 31upx 0upx;
				.topImg {
					width: 60upx;
					height: 60upx;
					padding: 10upx;
				}
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
