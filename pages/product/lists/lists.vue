<template>
	<view class="container">
		<view class="pro-box">
			<view class="item" v-for="(item, index) in proList" :key="index" @click="navToDetailPage(item)">
				<image :src="item.shopImg"></image>
				<view class="info">
					<view class="name">{{ item.shopName }}</view>
					<view class="old-price">
						<text>¥</text>
						{{ item.sellPrice }}
					</view>
					<view class="vip-price">
						<image src="../../../static/vip.png" mode=""></image>
						<text>¥{{ item.vipPrice }}</text>
					</view>
					<view class="car-btn"><image src="../../../static/car.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<view  :style="noStatus" class="noOrder" ><image src="../../../static/temp/wu1.png" mode=""></image></view>
	</view>
</template>

<script>
import { getselectShopListByShopType,getselectShopListBySearch } from '../../../api/home.js';
export default {
	data() {
		return {
			proList: [],
			loadingType:[],
			noStatus:'display:none',
		};
	},
	onLoad(options) {
		try {
			const res = uni.getStorageSync('loadingType');
			// console.log("res========",res);
			this.loadingType = res
		} catch (e) {
			// error
		}
		//{province: "陕西省", city: "西安市", area: "雁塔区"}
		
			//id值为1表示从搜索过来的
			if(options.id==1){
				
				this.gListBySearch( this.loadingType, '1', '10', options.search);
			}else{
		
				this.gListByShopType( this.loadingType, '1', '10', options.tid);
			}
		
		
	},
	methods: {
		async gListBySearch( type, page, rows, search) {
			const data = await getselectShopListBySearch({
				province: uni.getStorageSync('address').province, //省
				city: uni.getStorageSync('address').city, //市
				area: uni.getStorageSync('address').area, //区
				type: type, //1个人入口首页  2企业入口首页
				page: page, // 1开始
				rows: rows, // 条数
				search: search // 分类id
			});
			
			
			if (data.status == 200) {
				this.proList = data.data;
				if(this.proList.length==0){
					this.noStatus='display:block';
				}
			} else {
				this.proList =[];
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		},
		async gListByShopType( type, page, rows, typeid) {
			const data = await getselectShopListByShopType({
				province: uni.getStorageSync('address').province, //省
				city: uni.getStorageSync('address').city, //市
				area: uni.getStorageSync('address').area, //区
				type: type, //1个人入口首页  2企业入口首页
				page: page, // 1开始
				rows: rows, // 条数
				typeid : typeid // 分类id
			});
			this.proList = data.data;
			if (data.status == 200) {
				this.proList = data.data;
				if(this.proList.length==0){
					this.noStatus='display:block';
				}
			} else {
				this.proList =[];
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		},
		//详情页
		navToDetailPage(item) {
			
			
			let id = item.id;
		
			uni.navigateTo({
				url: `/pages/product/product?id=${id}&editItem=${JSON.stringify(item)}`
			});
		},
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
	padding: 20upx;
}

.pro-box {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.item {
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
	.noOrder{width: 100%;text-align: center;margin-top:45%;}
	.noOrder>image{width: 40%;height: 260upx;}
	.container{background-color: white;}
	uni-page-body{background-color: white;}
</style>
