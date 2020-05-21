<template>
	<view class="container">
		
		 <uni-segmented-control :current="(current)" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FFE200"></uni-segmented-control>
		        <view class="content">
		            <view v-show="current === 0">
		                <image src="../../../static/temp/wu1.png" class="bijing" v-if="listData.class1.length<=0"></image>
		                <view class="collection" v-for="(item,index) in listData.class1"  :key="index">
		                	<image class="colle-left" :src="item.shopImg"></image>
		                	<!-- <image src="../../../static/home/bao.png" class="cl-t"></image> -->
		                	<view class="colle-right">
		                		<view class="crh">{{item.shopName}}</view>
		                		<view class="crb">￥{{item.realPrice}}</view>
		                		<view class="crf">
		                			<view class="crf-l">
		                				<image class="c-v" src="../../../static/vip.png"></image>
		                				<text class="prc">￥{{item.vipPrice}}</text>
		                			</view>
		                		</view>
		                		<view class="caozuo">
		                			<text @click="upTopGoods(item.id)">下架</text>
		                			<text  @click="upload(item.id)">编辑</text>
		                			<text style="color: #ef4321;"  @click="deleteGoods(item.id)">删除</text>
		                		</view>
		                	</view>
		                </view>
					
		            </view>
		            <view v-show="current === 1 ">
		                <image src="../../../static/temp/wu1.png" class="bijing" v-if="listData.class2.length<=0"></image>
		                <view class="collection" v-for="(item,index) in listData.class2"  :key="index">
		                	<image class="colle-left" :src="item.shopImg"></image>
		                	<!-- <image src="../../../static/home/bao.png" class="cl-t"></image> -->
		                	<view class="colle-right">
		                		<view class="crh">{{item.shopName}}</view>
		                		<view class="crb">￥{{item.realPrice}}</view>
		                		<view class="crf">
		                			<view class="crf-l">
		                				<image class="c-v" src="../../../static/vip.png"></image>
		                				<text class="prc">￥{{item.vipPrice}}</text>
		                			</view>
		                		</view>
		                		<view class="caozuo">
		                			<text @click="upTopGoods(item.id)">上架</text>
		                			<text  @click="upload(item.id)">编辑</text>
		                			<text style="color: #ef4321;" @click="deleteGoods(item.id)">删除</text>
		                		</view>
		                	</view>
		                </view>
		            </view>
		        </view>
	</view>
</template>

<script>
		import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';

import {selectShopsByUserid,upShopByUserid,deleteShopByUserid} from '../../../api/goods.js';
export default {
	data() {
		return {
		
			items: ['已发布', '草稿箱'],
			current: 0,
			listData:{
				class1:[],
				class2:[],
			},
			pageSize: 1,
			pageRows: 10,
			isLoadMore: false,
			loadMore:'more', //	load
		};
	},
	components: { uniSegmentedControl,uniLoadMore},
	onLoad(){
		this.selectGoods()
	},
	onReachBottom() {
		// console.log("pageSize:",this.pageSize)
		// console.log("pageRows:",this.pageRows)
		// console.log("isLoadMore:",this.isLoadMore)
		
		if (this.isLoadMore) {
			this.pageSize = this.pageSize + 1;
			this.shopInfo();
		}
	},
	methods: {
	 async	selectGoods(){
		
		 let that=this;
			let d={
				userid:uni.getStorageSync('dataInfo').id,
				page  :that.pageSize,
				rows:that.pageRows,
				type :(that.current+1)
			}
			let data=await selectShopsByUserid(d)
			if (data.status == 200) {
				if(data.data.length==that.pageRows){
					that.isLoadMore=true;
				}else{
					that.isLoadMore=false;
				}
				if((that.current+1)==1){
					
					that.listData.class1=that.listData.class1.concat(data.data)  
				}else if((that.current+1)==2){
					that.listData.class2=that.listData.class2.concat(data.data);
				}
			
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		},
		async  upTopGoods(id){
			
			let that=this;
						
						let data=await upShopByUserid({shopid:id})
						if (data.status == 200) {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
							setTimeout(()=>{
								that.selectGoods()
							},800)
							
						} else {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
						}
			
		},
		async deleteGoods(id){
			let that=this;
						
						let data=await deleteShopByUserid({shopid:id})
						if (data.status == 200) {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
							setTimeout(()=>{
								that.selectGoods()
							},800)
							
						} else {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
						}
			
		},
		onClickItem(index) {
			if (this.current !== index.currentIndex) {
				this.current = index.currentIndex;
				this.pageSize=1;
				this.listData={class1:[],class2:[]};
			}
			console.log(this.listData.class1.length)
			console.log(this.listData.class2.length)
				if(this.listData.class1.length<=0||this.listData.class2.length<=0){
					this.selectGoods()
				}
			
			
			
		},
		upload(id) {
			
			uni.navigateTo({
				url:'../uploadGoods/editGoods?id='+id
			})
		}
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index)
		if(e.index==0){
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
			margin: 40upx 0upx 50upx 30upx;
			position: relative;
		}
		.cl-t {
			position: absolute;
			width: 49upx;
			height: 65upx;
		}
		.colle-right {
			margin: 60upx 15upx 88upx 15upx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.crh {
				
				font-size: 28upx;
				color: #666;
			}
			.crb {
				line-height: 20px; 
				font-size: 26upx;
				color: #333;
			}
			.crf {
				
				display: flex;
				justify-content: space-between;
				.crf-l {
					display: flex;
					.c-v {
						width: 50upx;
						height: 50upx;
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
