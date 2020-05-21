<template>
	<view class="container b-t">
	
		<view class="shopInfo">
			<image class="headImg" :src="shopUser.storeImg"></image>
			<text class="title">{{shopUser.storeName}}</text>
		</view>
		
		<view class="shopType">
			<view >
				<label :class="sta?'l_1':'l_2'" @click="shopType(true)">每日爆品</label>
				<label :class="!sta?'l_1':'l_2'" @click="shopType(false)">商品</label>
			</view>
			<view class="pro-box" v-if="sta" >
				<view class="item" v-for="(item, index) in dataList"  :key="index">
					<image :src="item.shopImg"></image>
					<view class="info">
						<view class="name">{{item.shopName}}</view>
						<view class="old-price">
							<text>¥{{item.realPrice}}</text>
						
						</view>
						<view class="vip-price">
							<image src="../../static/vip.png" mode=""></image>
							<text>¥{{item.vipPrice}}</text>
						</view>
						<view class="car-btn"><image src="../../static/car.png" mode=""></image></view>
					</view>
				</view>
			</view>
			<view class="pro-box" v-else-if="!sta" >
				<view class="item"  v-for="(item, index) in dataList1"  :key="index">
					<image :src="item.shopImg"></image>
					<view class="info">
						<view class="name">{{item.shopName}}</view>
						<view class="old-price">
							<text>¥{{item.realPrice}}</text>
						
						</view>
						<view class="vip-price">
							<image src="../../static/vip.png" mode=""></image>
							<text>¥{{item.vipPrice}}</text>
						</view>
						<view class="car-btn"><image src="../../static/car.png" mode=""></image></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { selectShopListByUserid } from '../../api/goods.js';	
	import {selectAppUserByUserid}  from '../../api/user.js'
	export default {
		components: { uniLoadMore },
		data() {
			return {
				
				sta:true,
				
				pageSize: 1,
				pageRows: 10,
				isLoadMore: false,
				loadMore:'more', //	load
				dataList:[],
				dataList1:[],
				shopUser:{}
			};
		}, 
		onLoad(opyion){
			this.userId=opyion.id
			
			Promise.all(this.shopInfo(true),this.shopHead())
			//this.shopInfo(true)
			
		},
		onReachBottom() {
		
			
			if (this.isLoadMore) {
				this.pageSize = this.pageSize + 1;
				this.shopInfo(this.sta);
			}
		},
		methods:{
			async shopHead(){
				
				let that=this;
				let d={userid:that.userId,}
				
				let data=await selectAppUserByUserid(d)
				
				if(data.status==200){
					that.shopUser=data.data;
				}else{
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
				
			},
			shopType(sta){
				this.dataList=[];
				this.dataList1=[];
				this.pageSize=1;
				this.shopInfo(sta);
			},
			async shopInfo(sta){
				let that=this;
				let d={
					userid:that.userId,
					page  :that.pageSize,
					rows:that.pageRows,
					type : sta?2:1,
				}
				let data=await selectShopListByUserid(d)
				console.log(data)
				if(data.status==200){
					if(sta){
						that.dataList= that.dataList.concat(data.data) 
						
					}else {
						that.dataList1= that.dataList1.concat(data.data) 
						
					}
					if(data.data.length==that.pageRows){
						that.isLoadMore=true;
					}else{
						that.isLoadMore=false;
					}
					that.sta=sta;
				}else{
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #97b9EE;
		background-image:url(../../static/123.png) ;
		background-repeat: no-repeat;
		background-size: 100%  90%;
	}
	.shopInfo{
		display: flex;
		padding: 6% 2% 6%;
		align-items: center;
		.headImg{width: 90upx;height: 90upx;margin-right: 20upx;}
		.title{font-size: 30upx;color:white}
	}
	.shopType{
		
		background-color: #F6F6F6;
		border-radius: 40upx 40upx 0 0;
		padding: 40upx 22upx;
		.l_1{border-bottom: 4upx solid #FFDE00;color:#333333;font-size: 28upx;padding-bottom: 10upx;border-radius: 5upx;margin-right: 51upx;}
		.l_2{color:#999999;font-size: 24upx;margin-right: 51upx;}
		}
		
		.pro-box {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			
		.item {
				background-color: white;
			margin-top: 28upx;
			position: relative;
			width: 344upx;
			margin-bottom: 20upx;
			background-color: #fff;
			border-radius: 10upx;
			overflow: hidden;
			box-shadow: 0px 4upx 7upx 0px rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				height: 344upx;
			}
			.info {
				padding: 15upx;
			}
			.name {
				font-size: 24upx;
				color: #333;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.old-price {
				margin-top: 10upx;
				font-size: 28upx;
				color: #333;
				text {
					font-size: 20upx;
				}
			}
			.vip-price {
				display: flex;
				align-items: center;
				color: #ef4321;
				font-size: 30upx;
				image {
					width: 61upx;
					height: 48upx;
				}
			}
			.car-btn {
				position: absolute;
				right: 20upx;
				bottom: 23upx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 58upx;
				height: 58upx;
				border: 1px solid rgba(240, 240, 240, 1);
				border-radius: 50%;
				image {
					width: 40upx;
					height: 40upx;
				}
			}
		}
		}
		uni-page{
			    background-color: #F6F6F6;
		}
</style>
