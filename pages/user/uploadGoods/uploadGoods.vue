<template>
	<view class="container">
			<uni-list class="sort" >
			    <uni-list-item  title="所属分类" :note="nameType[0].name+nameType[1].name+nameType[2].name" @click="goCatetory()"></uni-list-item>
			</uni-list>
			<uni-list class="sort s-name">
				<text class="s-title">商品标题</text>
				<input class="s-name"  v-model="shop_name" placeholder="请输入宝贝名称" />
			  <!--  <uni-list-item title="商品标题:" note="请输入宝贝名称" :show-arrow="false"></uni-list-item> -->
			</uni-list>
			<view class="upph">
				<text class="upph-t">商品主图(最多上传5张)</text>
				<view class="listimg">
					
					<view class="imgsub" v-for="(item,index) in shopHeadImg"   v-if="item.open==false"     :key="index" >
						<image     class="headImg" :src="item.img">
							<uni-view data-v-7d89e041="" class="sunui-img-removeicon right" @click="delImg(index)">×</uni-view>
						</image>
					</view>
					<view  class="imgsub" v-for="(item,index) in shopHeadImg"   v-if="item.open==true&&(shopHeadImg.length-1)<5"  @click="open(1)"    :key="index" >
						<image     class="headImg" :src="item.img"></image>
					</view>
					
				</view>
				<!-- <sunui-upimg @change="getImageInfo4" :upload_auto="true" ref="upimg4" upload_count="5" :url="url" :upimg_preview="serviceArr"></sunui-upimg> -->
			</view>
			<view class="norms" v-for="(item, index) in sku" :key="index" v-if="item.status" >
				<view class="nleft">
					<view class="guige">
						<text class="g-t">商品规格</text>
						<input class="uni-input g-f" v-model="item.sku_name"  placeholder="请输入商品规格" />
					</view>
					<view class="guige">
						<text class="g-t">价格：</text>
						<input class="uni-input g-f" type="number" v-model="item.sku_price"  placeholder="请输入价格" />
					</view>
				</view>
				<image  v-if="(sku.length-1)!=index" src="../../../static/slices/shanchu.png" class="xj" @click="delete_skuData(index)"></image>
				<image  v-if="(sku.length-1)==index" src="../../../static/slices/xinzeng.png" class="xj" @click="push_skuData()"></image>
			</view>
		 
			<view class="norms price">
				<view class="nleft">
					<view class="guige">
						<text class="g-t">vip价格</text>
						<input class="uni-input g-f" type="number" v-model="vip_price" placeholder="请输入VIP价格" />
					</view>
					<view class="guige">
						<text class="g-t">市场指导价格</text>
						<input class="uni-input g-f" type="number"  v-model="sell_price" placeholder="请输入指导价格" />
					</view>
				</view>
			</view>
			<view class="num">
				<text class="num-t">成交量</text>
				<input class="uni-input num-f" v-model="number"  placeholder="请输入成交量" />
			</view>
			<!-- <view class="gnews">
				<text class="gnews-t">商品详情页</text>
				<image src="../../../static/001.png" class="gnews-f"></image>
			</view> -->
			<view class="upph">
				<text class="upph-t">商品详情图片(最多上传5张)</text>
				<view class="listimg">
					
					<view class="imgsub" v-for="(item,index) in shopHeadImg5"   v-if="item.open==false"     :key="index" >
						<image     class="headImg" :src="item.img">
							<uni-view data-v-7d89e041="" class="sunui-img-removeicon right" @click="delImg(index)">×</uni-view>
						</image>
					</view>
					<view  class="imgsub" v-for="(item,index) in shopHeadImg5"   v-if="item.open==true&&(shopHeadImg5.length-1)<5"  @click="open(2)"    :key="index" >
						<image     class="headImg" :src="item.img"></image>
					</view>
					
				</view>
				
			</view>
			<uni-list class="sort buts" >
			    <uni-list-item  :show-switch="true" title="爆品推荐" @switchChange="switchChange" />
			</uni-list>
			<view class="handle">
				<view class="drafft">
					<image src="../../../static/slices/cgx.png"></image>
					<text class="tit" @click="sub(2)">草稿箱</text>
				</view>
				<view class="issue">
					<image src="../../../static/slices/fb.png"></image>
					<text class="tit" @click="sub(1)">发布</text>
				</view>
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
	import base from '../../../api/request/index.js';
	import {empty_b} from '../../../public/base.js';
	import {saveShopByUserid,selectShopByID} from '../../../api/goods.js';
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	
	export default {
		data() {
			return {
				img_type:0,
				itemid:'',
				itemData:{},
				items:[],
				serviceArr:[],
				serviceArr5:[],
				nameType:[{name:"请",id:false},{name:"选",id:false},{name:"择",id:false}],
				add_tr : false,
				switch_check:2,
				shop_name:'',
				sku:[],
				sell_price:'',
				vip_price:'',
				number:'',
				shop_img:'',
				shopHeadImg:[{img:'../../../static/up.png',status:true,open:true}],
				shopHeadImg5:[{img:'../../../static/up.png',status:true,open:true}],
			}
		},
		components: {uniList,uniListItem,uniPopup},
		onLoad(option) {
		
			  
			this.push_skuData()
		},
		onShow(){
			console.log(this.nameType)
		},
	
		methods: {
			delImg(index){
				if(this.img_type==1){
					this.shopHeadImg.splice(index,1)
					console.log(this.shopHeadImg)
				}else if(this.img_type==2){
					this.shopHeadImg5.splice(index,1)
					console.log(this.shopHeadImg)
				}
				
				
			},
			upheadImg(type){
				
				let that=this;
				that.close()
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
											
											if(that.img_type==1){
												that.shopHeadImg.unshift({img:JSON.parse(data.data).data,status:true,open:false})
												if(that.shopHeadImg.length>=6){
													that.shopHeadImg[that.shopHeadImg.length-1].status=false;
												}
											}else if(that.img_type==2){
												that.shopHeadImg5.unshift({img:JSON.parse(data.data).data,status:true,open:false})
												if(that.shopHeadImg5.length>=6){
													that.shopHeadImg5[that.shopHeadImg5.length-1].status=false;
												}
											}
											
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
			open(type) {
				this.img_type=type
				this.$refs.popup.open();
			},
			close() {
				//this.img_type=0;
				this.$refs.popup.close();
			},
			push_skuData(){
					this.sku.push({sku_name:'',sku_price:'',status:true})
			},
			delete_skuData(indx){
				this.sku[indx].status=false;
			},
		 async	sub(type){
				let that=this;
		
			
				if(!empty_b(that.nameType[0].id)||!empty_b(that.nameType[1].id)||!empty_b(that.nameType[2].id)){
					return uni.showToast({
						title: "请选择所属分类",
						icon: 'none'
					});
				}else if(!empty_b(that.shop_name)){
					return uni.showToast({
						title: "请输入宝贝名称",
						icon: 'none'
					});
				}
				that.serviceArr="";
			for (let i = 0; i < that.shopHeadImg.length; i++) {
				if(!that.shopHeadImg[i].open){
				
					if(i==0){
						that.shop_img=that.shopHeadImg[i].img
					}
					that.serviceArr+=that.shopHeadImg[i].img+","
				}
			}
			that.serviceArr5=""
			for (let i = 0; i < that.shopHeadImg5.length; i++) {
				if(!that.shopHeadImg5[i].open){
					console.warn(JSON.stringify(that.shopHeadImg5[i].img))
					that.serviceArr5+=that.shopHeadImg5[i].img+","
					console.warn(JSON.stringify(that.serviceArr5))
				}
			}
			
			 that.serviceArr= that.serviceArr.substr(0,that.serviceArr.length-1)
			 that.serviceArr5= that.serviceArr5.substr(0,that.serviceArr5.length-1)	 
			
			
				 if(!empty_b(that.serviceArr)){
					return uni.showToast({
						title: "请上传至少一张的商品主图",
						icon: 'none'
					});
				}
		
				
				
				let count=0;
				let sku=[];
				for (let i=0;i<that.sku.length;i++) {
					if(that.sku[i].status){
						if(!empty_b(that.sku[i].sku_name)){
							count=1;
						}else if(!empty_b(that.sku[i].sku_price)){
						 	count=2;
						}else{
						  sku.push({sku_name:that.sku[i].sku_name,price:that.sku[i].sku_price});
						 } 
					}
				}
			
				if(count==1){
					return uni.showToast({
						title: "您的商品规格还没有填写完整",
						icon: 'none'
					});
				}else if(count==2){
					return uni.showToast({
						title: "您的商品规格价格还没有填写",
						icon: 'none'
					});
				}
				if(!empty_b(that.sell_price)){
					return uni.showToast({
						title: "请输入指导价格",
						icon: 'none'
					});
				}
				if(!empty_b(that.vip_price)){
					return uni.showToast({
						title: "请输入VIP价格",
						icon: 'none'
					});
				}
				if(!empty_b(that.number)){
					return uni.showToast({
						title: "请输入成交量",
						icon: 'none'
					});
				}
				
				if(!empty_b(that.serviceArr5)){
					return uni.showToast({
						title: "请上传至少一张的商品详情如",
						icon: 'none'
					});
				}
				let d={
					shop_name :that.shop_name,
					shop_img:that.shop_img,
					img_urls   :that.serviceArr,
					 sell_price  :that.sell_price,
					 vip_price   :that.vip_price,
					 is_burst   :that.switch_check,
					 number:that.number,
					first_type_id  :that.nameType[0].id,
					seconde_type_id  :that.nameType[1].id,
					three_type_id   :that.nameType[2].id,
					userid :uni.getStorageSync('dataInfo').id,
					 detilas  :that.serviceArr5,
					 is_send :type,
					 sku :sku,
				}
	
				let data=await saveShopByUserid(d)
				
			if (data.status == 200) {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
				that.$api.prePage().selectGoods();
				setTimeout(()=>{
				
					uni.navigateBack()
				}, 800)
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
			},
			goCatetory() {
				uni.navigateTo({
					url: './goodsCategory/goodsCategory'
				})
			},
			addNorms() {
				this.add_tr = true
			},
			switchChange(e) {
				
				this.switch_check= e.value ? 1 :2;
			
			},
			
		
			
		}
	}
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}
/deep/uni-switch .uni-switch-input.uni-switch-input-checked {
	background-color: #4CD964 !important;
	border-color: #4CD964 !important;
}
.container {
	min-height: 100%;
	background-color: #f6f6f6;
	.sort {
		width: 100%;
		height: 120upx;
		margin-top: 10upx;
		background-color: #fff;
	}
	.s-name{
		
		.s-title{font-size: 28upx;padding: 20upx 0 20upx;padding-left: 30upx;}
		.s-name{font-size: 28upx;padding-left: 30upx;}
	}
	
}
.upph {
	width: 100%;
	
	background-color: #fff;
	margin-top: 10upx;
	padding-top: 10upx;
	.upph-t {
		font-size: 28upx;
		color: #3b4144;
		margin-left: 30upx;
	}
}
.norms {
	width: 100%;
	min-height: 120upx;
	padding: 0 30upx;
	margin-top: 10upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	.xj {
		width: 42upx;
		height: 42upx;
		margin-top: 40upx;
	}
	.nleft {
		width: 90%;
		display: flex;
		justify-content: space-between;
		padding-top: 10upx;
		.guige {
			
			.g-t {
				font-size: 30upx;
				color: #666;
			}
			.g-f {
				font-size: 30upx;
				color: #999;
			}
		}
	}
}
.num {
	width: 100%;
	height: 120upx;
	padding: 0 30upx;
	margin-top: 10upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.num-t {
		font-size: 30upx;
		 color: #666;
	}
	.num-f {
		font-size: 28upx;
		color: #999;
	}
}
.gnews {
	width: 100%;
	min-height: 260upx;
	background-color: #fff;
	padding: 0 30upx;
	margin-top: 10upx;
	display: flex;
	flex-direction: column;
	.gnews-t {
		font-size: 24upx;
		 color: #666;
		 margin-bottom: 20upx;
	}
	.gnews-f {
		width: 176upx;
		height: 176upx;
	}
} 
.handle {
	padding-top: 10upx;
	    box-shadow: 0 0 6upx #dadada;
	position: fixed;
	background-color: #fff;
	left: 0;
	bottom: 0;
	display: flex;
	width: 100%;
	height: 80upx;
	justify-content: space-around;
	.drafft,
	.issue {
		// vertical-align: middle;
		image {
			width: 38upx;
			height: 36upx;
		    margin-top: 10upx;
			margin-right: 20upx;
			vertical-align:text-top;
		}
		/deep/.tit {
			font-size: 24upx;
			color: #666;
			
		}
	}
}
.buts {
	margin-bottom: 80upx;
}

.headImg{
	width: 200upx;
	    height: 200upx;
	    padding: 20upx;
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
.listimg{
	   
	display: flex;
	    flex-wrap: wrap;
		.imgsub{
			width: 33%;    text-align: center;    position: relative;margin-top: 20upx;
			.sunui-img-removeicon{
				    position: absolute;
					    color: #fff;
					    width: 17px;
					    height: 17px;
					    line-height: 17px;
					    z-index: 2;
					    text-align: center;
					    background-color: #e54d42;
						    top: 0;
						    right: 0;
			}
		}
}

.uni-list-item__content-title{
	    padding: 9upx 0;
}
</style>
