<template>
	<view class="container  status_bar-1">
			<view class="f6-bg">
		<view class="header">
			<view class="addr_sty"  v-if="loadingType == 2" @click="sCity()">{{address.area}}<image src="../../static/home/down.png" class="icon_btoom"></image></view>
			<!-- <view class="search-bar">
				<image src="/static/sou.png" mode="" @click="togo()" ></image>
				请输入想要的商品
			</view> -->
			<view class="search-bar" @click="search()">
				<image src="/static/sou.png" mode=""></image>
				请输入想要的商品
			</view>
			<view class="btns">
					<image v-if="loadingType == 1" class="img" src="/static/scan.png"  @click="scan()"></image>
					<image src="/static/msg.png"  mode="" @click="goNotice()"></image>
			</view>
		</view>
		<!-- <view class="fixd-head status_bar-1"> -->
			<!-- <view class="citys" v-if="loadingType == 2" @click="sCity()">
				<span>{{address.area}}</span>
				<image src="../../static/home/down.png"></image>
			</view> -->
		<!-- 	<view class="search-bar" @click="search()">
				<image src="/static/sou.png" mode=""></image>
				请输入想要的商品
			</view> -->
			<!-- <view class="btns">
				<image v-if="loadingType == 1" src="/static/scan.png" mode=""></image>
				<image src="/static/msg.png" mode="" @click="goNotice()"></image>
			</view> -->
		<!-- </view> -->
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<!-- 背景色区域 -->
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in shufflingInfoList" :key="index" class="carousel-item" @click="navToDetailPage({ title: '轮播广告' })">
					<image :src="item.imgUrl" @error="onImageError('shufflingInfoList', index)" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<!-- <view class="swiper-dots">
				<text class="num">{{ swiperCurrent + 1 }}</text>
				<text class="sign">/</text>
				<text class="num">{{ swiperLength }}</text>
			</view> -->
		</view>
		<!-- 每日爆品 -->
		<view class="seckill-section m-t">
			<view class="s-header">每日爆品</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in shopInfoList" :key="index" @click="navToDetailPage(item)" class="floor-item" style="background-color: #F6F6F6;">
						<image class="bao" src="../../static/home/bao.png"></image>
						<view class="floor-item" style="margin-top: 20upx;">
							<image style="margin-top: 10upx;" :src="item.shopImg" mode="aspectFit" @error="onImageErrors('shopInfoList', index)"></image>
							<view class="info">
								<text class="title clamp">{{ item.shopName }}</text>
								<view class="old-price">￥{{ item.sellPrice }}</view>
								<view class="vip-price">
									<image src="/static/vip.png"></image>
									￥{{ item.vipPrice }}
								</view>
							</view>
						</view>
						<view class="car-btn"><image src="../../static/car.png" mode=""></image></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(item, index) in shopTypeList" :key="index" @click="gocate(item)">
				<image :src="item.img" @error="onImageErrore('shopTypeList', index)"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 优秀营销师 -->
		<view class="scroll-x-box" v-if="loadingType == 1">
			<view class="title">优秀营销师</view>
			<scroll-view class="scroll-box" scroll-x>
				<view class="scroll-wrapper">
					<view class="item" v-for="(item, index) in marketingUserList" :key="index" @click="goMmarket(item)" style="padding: 20upx;">
						<image :src="item.headImg" mode="" @error="onImageErrorb('marketingUserList', index)"></image>
						<view class="name clamp1">{{ item.name }}</view>
						<view class="des " style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; display: block;width:150upx; font-size: 24upx;">
							{{ item.label }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 新闻列表 -->
		<view class="news-wrapper" v-if="loadingType == 1">
			<block v-for="(item, index) in wordsInfoList" :key="index">
				<view class="news-item" @click="gonewsdetail(item)">
					<view class="txt">
						<view class="title">{{ item.title }}</view>
						<view class="time">{{ item.ctime }}</view>
					</view>
					<image :src="item.imgUrl" mode="" @error="onImageErrorc('wordsInfoList', index)"></image>
				</view>
			</block>
		</view>
		<!-- 优质店铺 -->
		<!-- <view class="store-wrapper">
			<view class="s-header">优质店铺</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="store-list">
					<view class="item" v-for="(item, index) in storeList" :key="index">
						<image src="../../static/001.png" mode=""></image>
						<view class="title">{{ item.name }}</view>
						<view class="link">进店</view>
					</view>
				</view>
			</scroll-view>
		</view> -->
		<!-- 最新商品 -->
		<view class="pro-list">
			<!-- <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text"></uni-segmented-control> -->
			<view class="class-personal" v-for="(item, index) in items" :key="index" @click="onClickItem(index)">
				<text :style="{ 'font-weight': item.isSelected == true ? '600' : '400' }">{{ item.name }}</text>
				<!-- <span v-if="item.isSelected"></span> -->
			</view>

			<view class="pro-box">
				<block v-for="(item, index) in proList" :key="index" v-show="current === 0">
					<view class="item" @click="navToDetailPage(item)">
						<image :src="item.shopImg" mode="aspectFit"></image>
						<view class="info">
							<view class="name">{{ item.shopName }}</view>
							<view class="old-price">
								<text>¥</text>
								{{ item.sellPrice }}
							</view>
							<view class="vip-price">
								<image src="../../static/vip.png" mode=""></image>
								<text>¥{{ item.vipPrice }}</text>
							</view>
							<view class="car-btn"><image src="../../static/car.png" mode=""></image></view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<uni-load-more :status="loadMore"></uni-load-more>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import { getSelectHome, getSelect } from '../../api/home.js';
export default {
	components: { uniLoadMore },
	data() {
		return {
			titleNViewBackground: '',
			items: [
				{
					name: '附近商家',
					isSelected: true
				},
				{
					name: '最新商品',
					isSelected: false
				} 
			],
			address: {},
			current: 0,
			loadingType: 2, //1个企业  2企业个人
			swiperCurrent: 0,
			swiperLength: 0,
			shufflingInfoList: [], // 首页轮播
			shopInfoList: [], // 每日爆品
			shopTypeList: [], //分类
			marketingUserList: [], // 营销师
			wordsInfoList: [],
			proList: [], // 最新商品
			category: 1, //1最新商品  2附近商品
			pageSize: 1,
			pageRows: 20,
			isLoadMore: false,
			loadMore:'more', //	loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
			// storeList: [], // 优质店铺
		};
	},

	onLoad() {
		// this.loadData();
		try {
			let obj = {
				province: '陕西省',
				city: '西安市',
				area: '雁塔区'
			};
			uni.setStorageSync('address', obj);
		} catch (e) {
			// error
		}	
	
		// let that = this;
		// uni.getLocation({
		// 	type: 'wgs84',
		// 	success: function(res) {
				
		// 		console.log('当前位置的经度：', res);
		// 		console.log('当前位置的经度：' + res.longitude);
		// 		console.log('当前位置的纬度：' + res.latitude);
				
		// 		Promise.all([this.gSelectHome(), this.gSelect()]);
		// 		that.getLocationAddr(res.longitude, res.latitude);
		// 	}
		// });
		//Promise.all([this.gSelectHome(), this.gSelect()]);
	},
	onShow() {

		let add = uni.getStorageSync('address');
		if (add) {
			this.address = add;
		}
	
		try {
			let d = uni.getStorageSync('loadingType');
			if (d) {
				this.loadingType = d;
			}
		} catch (e) {
			this.loadingType = '2';
		}
		if (this.loadingType == '1') {
			this.items = [
				{
					name: '最新商品',
					isSelected: false
				}
			];
		}

		Promise.all([this.gSelectHome(), this.gSelect()]);
	},
	onPullDownRefresh() {
		
		this.pageSize = 1;
		this.proList = [];
		Promise.all([this.gSelectHome(), this.gSelect()]).then(res => {
			uni.stopPullDownRefresh();
		});
		//
	},
	onReachBottom() {
		if (this.isLoadMore) {
			this.pageSize = this.pageSize + 1;
			this.gSelect();
		}
	},
	methods: {
		scan(){
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
			    }
			});
		},
		onClickItem(index) {
			let that = this;
			console.log('====', index);
			for (var i = 0; i < this.items.length; i++) {
				if (index == i) {
					that.items[i].isSelected = true;
				} else {
					that.items[i].isSelected = false;
				}
			}

			if (this.items[index].name != '最新商品') {
				this.category = 2;
			} else {
				this.category = 1;
			}
			this.gSelect();
		},
		search() {
			uni.navigateTo({
				url: './search/search'
			});
		},
		goNotice() {
			uni.navigateTo({
				url: '../user/myNotice/myNotice'
			});
		},
		gocate(item) {
			// 商品分类
			let id = item.id;
			try {
			    uni.setStorageSync('tabId', id);
			} catch (e) {
			    // error
			}
			uni.switchTab({
				// url: `../category/category?id=${id}&goodItem=${JSON.stringify(item)}`
				url: '../category/category',
			});
		},
		//详情页
		navToDetailPage(item) {
			
			
			let id = item.id;
		
			uni.navigateTo({
				url: `/pages/product/product?id=${id}&editItem=${JSON.stringify(item)}`
			});
		},
		gonewsdetail(item) {
			// 新闻详情
			let id = item.id;
			uni.navigateTo({
				url: `../newsDetail/newsDetail?id=${id}`
			});
		},
		goMmarket(item) {
			// 营销师详情
			let id = item.id;
			uni.navigateTo({
				url: `../marketDetail/marketDetail?id=${id}`
			});
		},
		//监听image加载失败
		onImageError(key, index) {
			console.log([key][index]);
			this[key][index].imgUrl = '../../static/temp/banner1.jpg';
		},
		onImageErrorc(key, index) {
			console.log([key][index]);
			this[key][index].imgUrl = '../../static/001.png';
		},
		onImageErrorb(key, index) {
			console.log([key][index]);
			this[key][index].headImg = '../../static/avatar.png';
		},

		onImageErrore(key, index) {
			let img = '../../static/home/t' + index + '.png';
			if (index < 10) {
				this[key][index].img = img;
			}
		},
		onImageErrors(key, index) {
			this[key][index].shopImg = '../../static/temp/cate11.jpg';
		},
		sCity() {
			uni.navigateTo({
				url: '../city/city'
			});
		},
		/**
		 * 请求静态数据只是为了代码不那么乱
		 * 分次请求未作整合
		 */
		// async loadData() {
		// 	let carouselList = await this.$api.json('carouselList');
		// 	this.titleNViewBackground = carouselList[0].background;
		// 	this.swiperLength = carouselList.length;
		// 	this.carouselList = carouselList;

		// 	let goodsList = await this.$api.json('goodsList');
		// 	this.goodsList = goodsList || [];
		// },
		//轮播图切换修改背景色
		swiperChange(e) {
			// const index = e.detail.current;
			// this.swiperCurrent = index;
			// this.titleNViewBackground = this.carouselList[index].background;
		},

		async gSelectHome() {
			const data = await getSelectHome({
				province: this.address.province, //省
				city: this.address.city, //市
				area: this.address.area, //区
				type: this.loadingType //1个人入口首页  2企业入口首页
			});
			
			this.shufflingInfoList = data.data.shufflingInfoList;
			this.shopInfoList = data.data.shopInfoList;
			this.shopTypeList = data.data.shopTypeList;
			this.marketingUserList = data.data.marketingUserList;
			this.wordsInfoList = data.data.wordsInfoList;
		},
		async gSelect() {
			let that = this;
			that.loadMore='loading'
			const data = await getSelect({
				province: this.address.province, //省
				city: this.address.city, //市
				area: this.address.area, //区
				type: this.loadingType, //1个人入口首页  2企业入口首页
				page: this.pageSize, // 1开始
				rows: this.pageRows, // 条数
				category: this.category // 1最新商品  2附近商品
			});
			if (data.data) {
				that.proList = that.proList.concat(data.data);
			}
			// console.log('that.proList===', data.data);
			// console.log('that.proList===', that.proList);
			if (data.data.length == that.pageRows) {
				that.isLoadMore = true;
				that.loadMore='more'
			} else {
				that.loadMore='noMore'
				that.isLoadMore = false;
			}
			// this.storeList = data.data
		},
		getLocationAddr(longitude, latitude) {
			uni.request({
				url: 'https://restapi.amap.com/v3/geocode/regeo', //仅为示例，并非真实接口地址。
				data: {
					output: 'json',
					location: longitude + ',' + latitude,
					key: getApp().globalData.AMAP_KEY
				},
				// header: {
				//     'custom-header': 'hello' //自定义请求头信息
				// },
				success: res => {
					console.log(res.data);
					if (res.data.infocode == 10000) {
						let ob = res.data.regeocode.addressComponent;
						let obj = {
							province: ob.province,
							city: ob.city,
							area: ob.district
						};
						this.address = obj;
						try {
							uni.setStorageSync('address', obj);
						} catch (e) {}
					}
				}
			});
		},
	},
	// #ifndef MP
	// 标题栏input搜索框点击
	onNavigationBarSearchInputClicked: async function(e) {
		this.$api.msg('点击了搜索框');
	},

	//点击导航栏 buttons 时触发
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.$api.msg('点击了扫描');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			uni.navigateTo({
				url: '/pages/notice/notice'
			});
		}
	}
	// #endif
};
</script>

<style lang="scss">
/* #ifdef MP */
.mp-search-box {
	position: absolute;
	left: 0;
	top: 30upx;
	z-index: 9999;
	width: 100%;
	padding: 0 80upx;
	.ser-input {
		flex: 1;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		font-size: 28upx;
		color: $font-color-base;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.6);
	}
}
page {
	.cate-section {
		position: relative;
		z-index: 5;
		border-radius: 16upx 16upx 0 0;
		margin-top: -20upx;
	}
	.carousel-section {
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
		.carousel {
			.carousel-item {
				padding: 0;
			}
		}
		.swiper-dots {
			left: 45upx;
			bottom: 40upx;
		}
	}
}
/* #endif */

page {
	background: #f6f6f6;
}
.m-t {
	margin-top: 16upx;
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;
	padding-top: 10px;
	// margin-top: 100upx;
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}

	.titleNview-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 426upx;
		transition: 0.4s;
	}
}
.carousel {
	width: 100%;
	height: 350upx;

	.carousel-item {
		width: 100%;
		height: 100%;
		padding: 0 20upx;
		overflow: hidden;
	}

	image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
}
.swiper-dots {
	display: flex;
	position: absolute;
	left: 60upx;
	bottom: 15upx;
	width: 72upx;
	height: 36upx;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
	background-size: 100% 100%;

	.num {
		width: 36upx;
		height: 36upx;
		border-radius: 50px;
		font-size: 24upx;
		color: #fff;
		text-align: center;
		line-height: 36upx;
	}

	.sign {
		position: absolute;
		top: 0;
		left: 50%;
		line-height: 36upx;
		font-size: 12upx;
		color: #fff;
		transform: translateX(-50%);
	}
}
/* 分类 */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx 0;
	margin: 0upx 20upx;
	background: #fff;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 46upx;
		margin-bottom: 25upx;
		font-size: 22upx;
		color: #666666;
		&:nth-child(5n) {
			margin-right: 0;
		}
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 90upx;
		height: 90upx;
		margin-bottom: 14upx;
		border-radius: 50%;
	}
}
.ad-1 {
	width: 100%;
	height: 210upx;
	padding: 10upx 0;
	background: #fff;
	image {
		width: 100%;
		height: 100%;
	}
}
/* 秒杀专区 */
.seckill-section {
	padding: 4upx 20upx 24upx;
	.s-header {
		display: flex;
		align-items: center;
		height: 92upx;
		line-height: 1;
		.s-img {
			width: 140upx;
			height: 30upx;
		}
		.tip {
			font-size: $font-base;
			color: $font-color-light;
			margin: 0 20upx 0 40upx;
		}
		.timer {
			display: inline-block;
			width: 40upx;
			height: 36upx;
			text-align: center;
			line-height: 36upx;
			margin-right: 14upx;
			font-size: $font-sm + 2upx;
			color: #fff;
			border-radius: 2px;
			background: rgba(0, 0, 0, 0.8);
		}
		.icon-you {
			font-size: $font-lg;
			color: $font-color-light;
			flex: 1;
			text-align: right;
		}
	}
	.floor-list {
		white-space: nowrap;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	.floor-item {
		position: relative;
		width: 320upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;
		background-color: #fff;
		image {
			width: 320upx;
			height: 222upx;
		}
		.info {
			padding: 10upx 10upx 23upx;
			.title {
				font-size: 24upx;
				color: #666;
			}
			.old-price {
				color: #333333;
				font-size: 26upx;
			}
			.vip-price {
				display: flex;
				align-items: center;
				color: #ef4321;
				font-size: 28upx;
				image {
					width: 61upx;
					height: 54upx;
					margin-right: 6upx;
				}
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

.f-header {
	display: flex;
	align-items: center;
	height: 140upx;
	padding: 6upx 30upx 8upx;
	background: #fff;
	image {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		margin-right: 20upx;
	}
	.tit-box {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.tit {
		font-size: $font-lg + 2upx;
		color: #font-color-dark;
		line-height: 1.3;
	}
	.tit2 {
		font-size: $font-sm;
		color: $font-color-light;
	}
	.icon-you {
		font-size: $font-lg + 2upx;
		color: $font-color-light;
	}
}
/* 团购楼层 */
.group-section {
	background: #fff;
	.g-swiper {
		height: 650upx;
		padding-bottom: 30upx;
	}
	.g-swiper-item {
		width: 100%;
		padding: 0 30upx;
		display: flex;
	}
	image {
		width: 100%;
		height: 460upx;
		border-radius: 4px;
	}
	.g-item {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.left {
		flex: 1.2;
		margin-right: 24upx;
		.t-box {
			padding-top: 20upx;
		}
	}
	.right {
		flex: 0.8;
		flex-direction: column-reverse;
		.t-box {
			padding-bottom: 20upx;
		}
	}
	.t-box {
		height: 160upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		line-height: 1.6;
	}
	.price {
		color: $uni-color-primary;
	}
	.m-price {
		font-size: $font-sm + 2upx;
		text-decoration: line-through;
		color: $font-color-light;
		margin-left: 8upx;
	}
	.pro-box {
		display: flex;
		align-items: center;
		margin-top: 10upx;
		font-size: $font-sm;
		color: $font-base;
		padding-right: 10upx;
	}
	.progress-box {
		flex: 1;
		border-radius: 10px;
		overflow: hidden;
		margin-right: 8upx;
	}
}
/* 分类推荐楼层 */
.hot-floor {
	width: 100%;
	overflow: hidden;
	margin-bottom: 20upx;
	.floor-img-box {
		width: 100%;
		height: 320upx;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
		}
	}
	.floor-img {
		width: 100%;
		height: 100%;
	}
	.floor-list {
		white-space: nowrap;
		padding: 20upx;
		padding-right: 50upx;
		border-radius: 6upx;
		margin-top: -140upx;
		margin-left: 30upx;
		background: #fff;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;
	}
	.scoll-wrapper {
		display: flex;
		align-items: flex-start;
	}
	.floor-item {
		width: 180upx;
		margin-right: 20upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		line-height: 1.8;
		image {
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
		}
		.price {
			color: $uni-color-primary;
		}
	}
	.more {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex-shrink: 0;
		width: 180upx;
		height: 180upx;
		border-radius: 6upx;
		background: #f3f3f3;
		font-size: $font-base;
		color: $font-color-light;
		text:first-child {
			margin-bottom: 4upx;
		}
	}
}
/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;
	.guess-item {
		display: flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 40upx;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 3px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}
	.price {
		font-size: $font-lg;
		color: $uni-color-primary;
		line-height: 1;
	}
}

.scroll-x-box {
	margin-top: 40upx;
	padding: 0 20upx;
	.title {
		font-size: 32upx;
		color: #000;
	}
	.scroll-box {
		overflow: hidden;
	}
	.scroll-wrapper {
		display: flex;
		.item {
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 200upx;
			margin-right: 20upx;
			margin-top: 20upx;
			padding: 25upx 20upx;
			background-color: #fff;
			image {
				width: 102upx;
				height: 102upx;
				border-radius: 50%;
			}
			.name {
				margin: 14upx 0 15upx;
				font-size: 30upx;
				color: #000;
				font-weight: bold;
			}
			.des {
				font-size: 24upx;
				color: #666666;
			}
		}
	}
}
.news-wrapper {
	margin-top: 30upx;
	padding: 0 20upx;
	background-color: #fff;
	.news-item {
		display: flex;
		justify-content: space-between;
		padding: 30upx 0;
		border-bottom: 1upx solid #eee;
		.txt {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 475upx;
			.title {
				font-size: 28upx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.time {
				font-size: 22upx;
				color: #999999;
			}
		}
		image {
			width: 200upx;
			height: 150upx;
			border-radius: 5px;
		}
	}
}
.store-wrapper {
	padding: 0 20upx;
	.s-header {
		padding: 40upx 0 22upx;
		font-size: 32upx;
		color: #333;
	}
	.floor-list {
		overflow: hidden;
	}
	.store-list {
		display: flex;
	}
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 192upx;
		background-color: #fff;
		padding-bottom: 12upx;
		margin-right: 20upx;
		border-radius: 10upx;
		image {
			width: 192upx;
			height: 166upx;
		}
		.title {
			padding: 12upx 0;
			font-size: 26upx;
			color: #000;
		}
		.link {
			display: inline-block;
			border: 1px solid rgba(255, 227, 0, 1);
			border-radius: 14upx;
			font-size: 22upx;
			color: rgba(255, 227, 0, 1);
			padding: 2upx 10upx;
		}
	}
}
.link-1 {
	display: inline-block;
	border: 1px solid rgba(255, 227, 0, 1);
	border-radius: 14upx;
	font-size: 22upx;
	color: rgba(255, 227, 0, 1);
	padding: 2upx 10upx;
}
.pro-list {
	padding: 0 20upx;
	.title {
		padding: 50upx 0 20upx;
		font-size: 32upx;
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
}
.class-personal {
	margin: 20upx 10upx;
	display: inline-block;
}
.class-personal text {
	display: inline-block;
	// position: absolute;
	z-index: 100;
}
.class-personal span {
	position: absolute;
	display: block;
	background: rgba(255, 227, 0, 1);
	width: 60upx;
	height: 10upx;
	margin-left: 30upx;
	margin-top: -18upx;
	z-index: 1;
	opacity: 0.65;
}
.bao {
	position: absolute;
	width: 50upx !important;
	height: 65upx !important;
	z-index: 999999;
}
.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 20upx;
		text{
			font-size: 36upx;
			color: #333333;
		}
		.icon_btoom{
			    width: 16upx;
			    height: 16upx
		}
		.addr_sty{display: flex;
    align-items: center;font-size: 30upx;
	    overflow: hidden;
	    width: 100upx;
	    white-space: nowrap;}
		.search-bar{
			display: flex;
			align-items: center;
			width:540upx;
			height: 60upx;
			padding-left: 20upx;
			background-color: #F6F6F6;
			border-radius:28upx;
			font-size: $font-sm;
			color: #999999;
			image{
				width: 42upx;
				height: 42upx;
				margin-right: 10upx;
			}
		}
		.btns image{
			width: 44upx;
			margin: 10upx;
		
			height: 40upx;
		}
	}
</style>
