<template>
	<view class="container">
		<view class="p-p" @click="selete()" v-for="(item,index) in couponList" :key="index">
			<image src="../../../static/youhui/1.png" class="yhimg"></image>
			<view class="yhgz">
				<view class="yh-t">
					<text class="yh-tl">￥</text>
					<text class="yh-tr">50</text>
				</view>
				<view class="yh-b">满300元可用</view>
				<view class="yh-f">2020年1月21日-2020年3月21日</view>
			</view>
		</view> 
		<!-- <view class="p-p">
			<image src="../../../static/youhui/2.png" class="yhimg"></image>
			<view class="yhgz">
				<view class="yh-t">
					<text class="yh-tl">￥</text>
					<text class="yh-tr">50</text>
				</view>
				<view class="yh-b">满300元可用</view>
				<view class="yh-f">2020年1月21日-2020年3月21日</view>
			</view>
		</view> -->
		<view  v-if="couponList.length==0" class="noOrder" ><image src="../../../static/temp/wu1.png" mode=""></image></view>
	</view>
</template>

<script>
		import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { selectConpostByUserid } from '../../../api/user.js';	
	export default {
		data() {
			return {
				pageSize: 1,
				pageRows: 10,
				isLoadMore: false,
				loadMore:'more', //	load
				couponList:[],
			}
		},
		onLoad(){
			this.couponInfo();
		},
		onReachBottom() {
			// console.log("pageSize:",this.pageSize)
			// console.log("pageRows:",this.pageRows)
			// console.log("isLoadMore:",this.isLoadMore)
			
			if (this.isLoadMore) {
				this.pageSize = this.pageSize + 1;
				this.couponInfo(this.sta);
			}
		},
		methods: {
			selete() {
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2];
				// prepage.$vm.value = item.cate;
				// uni.navigateBack({
					
				// })
			},
			async couponInfo(){
				let that=this;
				let d={
					'userid':uni.getStorageSync('dataInfo').id,
					'page':that.pageSize,
					'rows':that.pageRows,
				}
				let data = await selectConpostByUserid(d);
				 
				 
				if (data.status == 200) {
					
					that.isLoadMore=data.data.length==that.pageRows ? true: false;
				
					that.couponList=that.couponList.concat(data.data);
					
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		min-height: 100%;
		background-color: #f6f6f6;
		.container {
			padding-top: 10upx;
			.p-p {
				position: relative;
				
				.yhimg {
					width: 91.2%;
					height: 240upx;
					margin: 10upx 33upx;	
				}
				.yhgz {
					position: absolute;
					top: 32upx;
					color: #ffff;
					margin-left: 60upx;
					.yh-tr {
						font-size: 100upx;
					}
					.yh-b {
						font-size: 24upx;
						height: 26upx;
						line-height: 35upx;
					}
					.yh-f {
						font-size: 24upx;
						margin-top: 10upx;
					}
				}
			}
		}
	}
	.noOrder{width: 100%;text-align: center;margin-top:45%;}
	.noOrder>image{width: 40%;height: 260upx;}
</style>
