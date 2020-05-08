<template>
	<view class="fixd-head">
		<image class="back" src="../../../static/home/WechatIMG5.png" @click="goback()"></image>
		<view class="search-bar" >
			<image src="/static/sou.png" ></image>
			
			<input   v-model="searchValue"  placeholder="请输入想要的商品"   @confirm="search()"   />
		</view>
		<view class="rest">取消</view>
	</view>
</template>

<script>
	import { getselectShopListBySearch } from '../../../api/home.js';
	
	export default {
		data() {
			return {
				searchValue:'',
				address: {},
				rows:10,
				page:1,
				loadingType: 2, //1个人入口首页  2企业入口首页
			}
		},
		onLoad(e) {
			// console.log('e==', e);
			// this.loadingType = e.loadingType;
			// this.address = uni.getStorageSync('address');
			// console.log("address:",uni.getStorageSync('address'))
		},
		methods: {
			async search() {
				uni.navigateTo({
					url: `/pages/product/lists/lists?id=1&search=${this.searchValue}`
				})
				// uni.navigateTo({
				// 	url: `/pages/product/lists/lists?fid=${this.currentId}&sid=${sid}&tid=${tid}`
				// })
	// 			let that=this;
				
			
				
	// 			let d = {
	// 				rows  : that.rows,
	// 				page  : that.page,
	// 				type: that.loadingType, //1企业入口  2个人入口
	// 				province: that.address.province,
	// 				city: that.address.city,
	// 				area: that.address.area,
	// 				search:that.searchValue,
	// 			};
	
	// 			let data = await getselectShopListBySearch(d);
	// 			console.log(data)
	// 			if (data.status == 200) {
	// 				uni.showToast({
	// 					title: data.msg,
	// 					icon: 'none'
	// 				});
					
	// 			} else {
	// 				uni.showToast({
	// 					title: data.msg,
	// 					icon: 'none'
	// 				});
	// 			}
					 
				
			},
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
.fixd-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 100;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	margin-top: 4.12%;
	.back {
		width: 28upx;
		height: 54upx;
		margin-left: 3.07%;
	}
	.search-bar {
		display: flex;
		align-items: center;
		width: 76.53%;
		height: 60upx;
		padding-left: 20upx;
		background-color: #f6f6f6;
		font-size: $font-sm;
		color: #999;
		border-radius: 28upx;
		image {
			width: 42upx;
			height: 42upx;
			margin-right: 10upx;
		}
	}
	.rest {
		font-size: 32upx;
		color: #333;
		margin-right: 20upx;
	}
}
</style>
