<template>
	<view class="container">
		<!-- <text class="upload"  @click="preservation()">保存</text> -->
<!-- 		<text class="upload" v-if="setype == true" @click="edit()">编辑</text> -->
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="goset()">
			<text class="cell-tit">所属分类</text>
			<input v-model="value.value" class="inp"/>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">店铺名称</text>
			<input class="uni-input" focus placeholder="请输入店铺名称" v-model="store_name"  style="font-size: 30upx;"/>
			<text class="cell-more yticon iconfont icon-icon--"></text>
		</view>
		<view class="upph">
			<text class="upph-t">店铺图像</text>
			<image   @click="open()"  class="headImg" :src="shopHeadImg"></image>
			<!-- <sunui-upimg @change="getImageInfo4" :upload_auto="true" ref="upimg4" :upimg_preview="serviceArr"></sunui-upimg> -->
		</view>
		<uni-popup ref="popup" type="bottom" class="popus">
			<view class="see">
				<button type="default" plain class="btn" @click="upheadImg('camera')">拍照上传</button>
				<button type="default" plain class="btn" @click="upheadImg('album')">本地上传</button>
			</view>
			<view class="rest">
				<button type="default" plain class="btn" @click="close()">取消</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import base from '../../../api/request/index.js';
	import { updateStore } from '../../../api/goods.js';
	import { selectAppUserByUserid } from '../../../api/user.js';
	export default {
		data() {
			return {
				setype: false,
				serviceArr:[],
				value: {value:'请选择',id:0},
				shopHeadImg:'../../../static/up.png',
				store_name:"",
				userDetail:"",
			}
		},
			components: { uniPopup },
		onLoad() {
			this.selectUser()
		},
		onNavigationBarButtonTap(e) {
		       console.log(e);
					var webView = this.$mp.page.$getAppWebview();  
					console.log( this.isEdit)
					  if(e.index==0){
						
							this.preservation()
						 
					  }
		   },
		methods: {
		 async	selectUser(){
				let that=this;
				let d={userid:uni.getStorageSync('dataInfo').id}
			    let data=await	selectAppUserByUserid(d)
			 
				
			 if (data.status == 200) {
			    uni.setStorageSync('dataInfo', data.data);
			 	that.userDetail=data.data;
				that.value.value=that.userDetail.storeTypName
				that.value.id=that.userDetail.storeTypeId
				console.log(that.value)
				that.store_name=that.userDetail.storeName
				that.shopHeadImg=that.userDetail.storeImg
			 } else {
			 	uni.showToast({
			 		title: data.msg,
			 		icon: 'none'
			 	});
			 }
			 
			},
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
	
			upheadImg(type){
				let that=this;
				//that.close()
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [type], //从相册选择
				    success: function (res) {
				       
						 const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
						            url: base.baseUrl+'user/upload', 
						            filePath: tempFilePaths[0],
						            name: 'file',
						            success: (data) => {
										console.log(data.statusCode)
										if(data.statusCode==200){
											that.close()
											that.shopHeadImg=JSON.parse(data.data).data
										
										}else{
											uni.showToast({
												title: data.msg,
												icon: 'none'
											});
										}
						                
						            }
						        });
				    },
					})
						
			},
			async	preservation(url){
					 let that=this;
					 let d={
						
						 userid:uni.getStorageSync('dataInfo').id,
						 store_img:that.shopHeadImg,
						 store_name:that.store_name,
						 store_type_id:that.value.id,
						 store_typ_name :that.value.value,
						 }
					 
					 console.log(d)
					
					 let data= await updateStore(d)
					 
					 if(data.status==200){
						 console.log(d)
						 uni.showToast({
						 	title: data.msg,
						 	icon: 'none'
						 });
						 this.selectUser()
						 setTimeout(()=>{
						 	uni.navigateBack({})
						 }, 800)
						
					 }else{
						 uni.showToast({
						 	title: data.msg,
						 	icon: 'none'
						 });
					 }
						
					},
			getImageInfo4(e) {
				console.log('图片返回4：', e)
			},
			goset() {
				uni.navigateTo({
					url: './shopCatetory/shopCatetory'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}
.container {
	min-height: 100%;
	background-color: #fff;
	margin-top: 10upx;
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
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	margin-top: 10upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: #444444;
		margin-right: 10upx;
	}
}
	.upph {
		width: 100%;
		height: 400upx;
		background-color: #fff;
		margin-top: 10upx;
		padding-top: 10upx;
		.upph-t {
			font-size: 28upx;
			color: #3b4144;
			margin-left: 30upx;
		}
	}
	.inp {
		font-size: 30upx;
		color: #333;
		margin-left: 40upx;
	}
	.headImg{
		width: 200upx;
		    height: 200upx;
		    display: flex;
		    margin: 40upx;
	}

.popus {
	.rest,
	.see {
		background-color: #fff;
		padding: 0 30upx;
		border: none;
		font-size: 32upx;
		color: #333;
	}
	.rest {
		margin-top: 20upx;
	}
	.btn {
		border: none;
	}
}
</style>
