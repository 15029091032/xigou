<template>
	<view class="container b-t">
		<image src="../../static/temp/wu1.png" class="bijing" v-show="remom==0"></image>
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="goAsupervise(item)" v-show="remom==1">
			<view class="wrapper">
				<view class="address-box">
					<view>
						<image src="../../static/111.png" class="a-m"></image>
						<text class="name">收件人：{{item.name}}</text>
					</view>
					<view>
						<text class="mobile">{{item.phone}}</text>
					</view>
					
				</view>
				<view class="u-box">
					<text class="address">{{item.proCityArea}} {{item.address}}</text>
				</view>
			</view>
		</view>
		<!-- <text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可
		</text> -->
		
		<button class="add-btn" @click="addAddress('add')">添加新地址</button>
	</view>
</template>

<script>
	import { selectAddressByUserid,updateAddress } from '../../api/user.js';	
	export default {
		data() {
			return {
				remom :1,
				source: 0,
				addressList: [],
				
			}
		},
		 onLoad(option){
				
			this.option=option;
			this.selectAddress()
		},
		methods: {
			async selectAddress(){
					
				this.type = this.option.type;
				let that=this;
						let d={
							'userid':uni.getStorageSync('dataInfo').id,
							'page':1,
							'rows':20,
						}
						let data = await selectAddressByUserid(d);
						
						 
						 
						 
						if (data.status == 200) {
							
							that.addressList=data.data;
							
						} else {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
						}
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			// 收货地址管理
		async	goAsupervise(item) {
				//1代表订单点击过来的
				//二表示地址我的地址点击过来的
				if(this.type==1){
						
						let that=this;
								let d={
									'name':item.name,
									'phone':item.phone,
									'pro_city_area':item.proCityArea,
									'address':item.address,
									'is_default':1,
									'id':item.id,
									'userid':uni.getStorageSync('dataInfo').id,
								}
								let data = await updateAddress(d);
								
								 
								if (data.status == 200) {
									
									uni.showToast({
										title: data.msg,
										icon: 'none'
									});
									that.$api.prePage().address();
									setTimeout(()=>{
										uni.navigateBack()
									}, 800)
								} else {
									uni.showToast({
										title: data.msg,
										icon: 'none'
									});
								}
				}else if(this.type==2){
					
					uni.navigateTo({
						url: `./adressSupervise/adressSupervise?data=${JSON.stringify(item)}`
					})
				}
				
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.selectAddress()
				//console.log(data)
				//this.addressList.unshift(data);
				
				//console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		min-height: 100%;
		background-color: #fff;
	}
	.container{
		min-height: 100%;
		padding-top: 10upx;
		background-color: #f6f6f6;
		padding-bottom: 150upx;
	}
	.a-m {
		width: 32upx;
		height: 34upx;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		    margin-bottom: 10upx;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		justify-content: space-between;
		/* align-items: center; */
		.tag {
			font-size: 32upx;
		}
		.address{
			font-size: 30upx;
			color: $font-color-dark;
		}
		.name {
			font-size: 30upx;
			color: #333333;
			margin-left: 10upx;
		}
		.mobile {
			font-size: 28upx;
			color: #666;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
		.address {
			font-size: 28upx;
			color: #444444;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 0upx;
		right: 0upx;
		bottom: 0upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 32upx;
		color: #333;
		background-color: #ffe200;
		border: none;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
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
