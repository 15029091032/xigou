<template>

				
	<view class="container  status_bar-1">
			<view class="f6-bg">
		<view class="header">
			<image class="back" src="../../../static/home/WechatIMG5.png" @click="goback()"></image>
			
			<view class="search-bar" >
				<input   v-model="searchValue"  placeholder="请输入想要的商品"   @confirm="search()"   />
			</view>
			<view class="btns" @click="clean()">
					<view class="rest">取消</view>
			</view>
		</view>			
				
<!-- 	<view class="header">
		<image class="back" src="../../../static/home/WechatIMG5.png" @click="goback()"></image>
		<view class="search-bar" >
			<image src="/static/sou.png" ></image>
			
			<input   v-model="searchValue"  placeholder="请输入想要的商品"   @confirm="search()"   />
		</view>
		<view class="rest">取消</view>
	</view> -->
	</view>
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
			clean(){
				this.searchValue="";
			},
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
		.btns .rest{
			font-size: 30upx;
		}
	}
	.back{
		width: 50upx;
		    height: 60upx;
		
	}
</style>
