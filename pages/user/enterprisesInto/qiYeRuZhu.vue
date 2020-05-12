<template>
	<view class="container">
		<view class="box1">
			<view class="imgs" @click="open(0)"><image class="img" :src="imgUrl[0].src"></image></view>
			<view class="imgs"  @click="open(1)"><image class="img" :src="imgUrl[1].src"></image></view>
		</view>
		<view class="box2">
			<view class="imgs"  >
				<view class="text-box" scroll-y="true"><text>上传法人身份证正面</text></view>
			</view>
			<view class="imgs">
				<view class="text-box" scroll-y="true"><text>上传法人身份证反面</text></view>
			</view>
		</view>
		<view class="box1">
			<view class="imgs" @click="open(2)"><image class="img" :src="imgUrl[2].src"></image></view>
		</view>
		<view class="box2">
			<view class="imgs" >
				<view class="text-box" scroll-y="true"><text>上传营业执照电子版</text></view>
			</view>
		</view>
		
		<view class="lists">
			<view class="list">
				<text class="list_text">姓名</text>
				<input class="list_put" v-model="realname" type="text"  placeholder="请输入姓名" />
			</view>
			<view class="list">
				<text class="list_text">电话</text>
				<input class="list_put" v-model="phone"  type="number"  placeholder="请输入电话" />
			</view>
			<view class="list">
				<text class="list_text">店铺</text>
				<input class="list_put" type="text" v-model="store_name"  placeholder="请输入店铺名称" />
			</view>
			<view class="list">
				<text class="list_text">是否餐饮行业</text>
				<switch  color="#43d96c" @change="switchChange" class="list_switch" />
			</view>
		</view>
		
		
		<view class="box1">
			<view class="imgs" @click="open(3)"><image class="img" :src="imgUrl[3].src"></image></view>
		</view>
		<view class="box2">
			<view class="imgs">
				<view class="text-box" scroll-y="true"><text>上传餐饮经营许可证</text></view>
			</view>
		</view>
		
		
		<view class="next_bg">
			  <button type="primary" class="next" @click="upZIZHI()">下一步</button>
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
import { realAppUser} from '../../../api/user.js';
export default {
	data() {
		return {
			imgUrl:[{
				src:'../../../static/the_front_of_id_card.png',
				status:false,
				},
				{
				src:'../../../static/person_id_card.png',
				status:false,
				},
				{
				src:'../../../static/business_license.png',
				status:false,
				},
				{
				src:'../../../static/business_license.png',
				status:false,
				}], 
				realname:'',
				phone:'',
				is_cater:2,
				store_name:'',
				Imgtype:false,
		};
	},
	components: { uniPopup },
	methods: {
		  switchChange: function (e) {
				this.is_cater=e.target.value?1:2
		            console.log('switch1 发生 change 事件，携带值为', e.target.value)
		        },
		open(type) {
			this.Imgtype=type;
			console.log(this.Imgtype)
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		upheadImg(type){
			let that=this;
			that.close()
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
										that.imgUrl[that.Imgtype].src=JSON.parse(data.data).data;
										that.imgUrl[that.Imgtype].status=true;
										//that.upZIZHI(JSON.parse(data.data).data)
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
		async	upZIZHI(url){
		
				 let that=this;
				 let d={
					 
					 userid:uni.getStorageSync('dataInfo').id,
					 idcard_front:that.imgUrl[0].src,
					 idcaard_back:that.imgUrl[1].src,
					 business_img:that.imgUrl[2].src,
					 cater_img:that.imgUrl[3].src,
					 realname:that.realname,
					 phone:that.phone,
					 is_cater:that.is_cater,
					 store_name:that.store_name,
					 
					 
					 
					 
				 }
				 for (let i = 0; i < that.imgUrl.length; i++) {
						if(that.imgUrl[i].status==false){
							if(i==0){
							return	uni.showToast({
									title: "请上传法人身份证正面",
									icon: 'none'
								});
							}else if(i==1){
								return	uni.showToast({
										title: "上传法人身份证反面",
										icon: 'none'
									});
							}else if(i==2){
								return	uni.showToast({
										title: "上传营业执照电子版",
										icon: 'none'
									});
							}else if(i==3){
								return	uni.showToast({
										title: "上传餐饮经营许可证",
										icon: 'none'
									});
							}
						}
				 }
				 
			 
				 if(!that.realname){
					 return	uni.showToast({
					 		title: "请输入姓名",
					 		icon: 'none'
					 	});
				 }
				 if(!that.phone){
				 					 return	uni.showToast({
				 					 		title: "请输入电话",
				 					 		icon: 'none'
				 					 	});
				 }
				 if(!that.store_name){
				 					 return	uni.showToast({
				 					 		title: "请输入商店名称",
				 					 		icon: 'none'
				 					 	});
				 }
				 
				 console.log("d:",d)
				 let data= await realAppUser(d)
				 
				 if(data.status==200){
					 
					 uni.showToast({
					 	title: data.msg,
					 	icon: 'none'
					 });
					 
					 // setTimeout(()=>{
					 // 	that.getUserInfo()
					 // }, 800)
					
				 }else{
					 uni.showToast({
					 	title: data.msg,
					 	icon: 'none'
					 });
				 }
					
				}
	}
};
</script>

<style lang="scss">
page {
	min-height: 100%;
	background-color: #f6f6f6;
}

.container {
	min-height: 100%;

	.box1 {
		display: flex;

		background: white;
		margin: 20upx 0 0upx;
		.imgs {
			width: 50%;
			height: 250upx;
			padding: 20upx;
			.img {
				width: 100%;
				height: 100%;
			}
			.text-box {
				font-size: 20upx;
				text-align: center;
			}
		}
	}
	.box2 {
		display: flex;
		background: white;
		.imgs {
			width: 50%;
			padding: 0upx 0 20upx;
			.text-box {
				font-size: 20upx;
				text-align: center;
			}
		}
	}
	.lists{
		margin-top: 20upx;
		background: white;
		padding: 20upx 20upx 20upx 10upx;
		.list{
			display: flex;
			padding: 20upx;
			    align-items: center;
			.list_text{font-size: 30upx;padding-right: 20upx;}
			.list_put{font-size: 30upx;}
			.list_switch{position: absolute; right: 0;}
		}
		
	}
	.next_bg{
		text-align: center;
		width: 100%;
		
		margin: 50upx 0 100upx;
		.next{width: 90%;background-color: #FFE200;color:  black;}
	}
	.see{
		background-color: white;
		.btn{border: 0;}
		
	}
	.rest{
		background-color: white;
		.btn{border: 0;}
	}
	
}
</style>
