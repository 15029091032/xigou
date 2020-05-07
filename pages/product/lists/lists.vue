<template>
	<view class="container">
		<view class="pro-box">
			<view class="item" v-for="(item, index) in proList" :key="index">
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
	</view>
</template>

<script>
import { getselectShopListByShopType } from '../../../api/home.js';
export default {
	data() {
		return {
			proList: [],
			loadingType:[]
		};
	},
	onLoad(e) {
		try {
			const res = uni.getStorageSync('loadingType');
			console.log("res========",res);
			this.loadingType = res
		} catch (e) {
			// error
		}
		this.gListByShopType('陕西省', '西安市', '雁塔区', this.loadingType, '1', '10', '11');
	},
	methods: {
		async gListByShopType(province, city, area, type, page, rows, typeid) {
			const data = await getselectShopListByShopType({
				province: province, //省
				city: city, //市
				area: area, //区
				type: type, //1个人入口首页  2企业入口首页
				page: page, // 1开始
				rows: rows, // 条数
				typeid: typeid // 分类id
			});
			this.proList = data.data;
			console.log(this.proList);
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
</style>
