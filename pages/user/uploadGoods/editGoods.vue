<template>
	<view class="container">
			<uni-list class="sort" >
			    <uni-list-item title="所属分类" :note="nameType.shopType" @click="goCatetory()"></uni-list-item>
			</uni-list>
			<uni-list class="sort s-name ">
				<text class="s-title">商品标题</text>
				<input class="s-name"  v-model="shop_name" placeholder="请输入宝贝名称" />
			  <!--  <uni-list-item title="商品标题:" note="请输入宝贝名称" :show-arrow="false"></uni-list-item> -->
			</uni-list>
			<view class="upph">
				<text class="upph-t">商品主图(最多上传5张)</text>
				<sunui-upimg @change="getImageInfo4" :upload_auto="true" ref="upimg4" upload_count="5" :url="url" :upimg_preview="getEditArryImg1" ></sunui-upimg>
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
				<sunui-upimg @change="getImageInfo5" :upload_auto="true" ref="upimg5" upload_count="5" :url="url" :upimg_preview="getEditArryImg2" ></sunui-upimg>
			</view>
			<uni-list class="sort buts" >
			    <uni-list-item  :show-switch="true" title="爆品推荐"   @switchChange="switchChange" />
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
	</view>
</template>

<script>
	import base_url from '../../../api/request/index.js';
	import {empty_b} from '../../../public/base.js';
	import {updateShopByUserid,selectShopByID} from '../../../api/goods.js';
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
	
	
	export default {
		data() {
			return {
				itemid:'',
				itemData:{},
				items:[],
				serviceArr:[],
				serviceArr5:[],
				nameType:[{name:"请",id:false},{name:"选",id:false},{name:"择",id:false}],
				add_tr : false,
				url:base_url.baseUrl+'user/upload',
				switch_check:2,
				shop_name:'',
				sku:[],
				sell_price:'',
				vip_price:'',
				number:'',
				getEditArryImg1:[],
				getEditArryImg2:[],
			}
		},
		components: {uniList,uniListItem},
		onLoad(option) {
			if(empty_b(option.id)){
				this.itemid= option.id
				 this.viewData() 
			}
			  
			  
			this.push_skuData()
		},
		onShow: function() {
			let pages = getCurrentPages();
	// 		console.log("page",pages)
			console.log("page",pages.length)
			let currPage = pages[pages.length-1];
		try{
			if(currPage.ooa){
				 
				this.nameType={
					shopType:currPage.ooa[0].name+currPage.ooa[1].name+currPage.ooa[2].name,
					firstTypeId:currPage.ooa[0].id,
					secondeTypeId:currPage.ooa[1].id,
					threeTypeId:currPage.ooa[2].id,
				}
				
				
				console.log("this.nameType:",JSON.stringify(this.nameType))
			}
		}catch(e){
			//TODO handle the exception
		}

			
		},
		methods: {
		   async viewData(){
			 
				let that=this;
				
				let data=await selectShopByID({shopid: that.itemid});
				console.log("data",data)
				if (data.status == 200) {
				
					that.itemData=data.data;
					
					that.nameType={
						shopType:that.itemData.shopType,
						firstTypeId:that.itemData.firstTypeId,
						secondeTypeId:that.itemData.secondeTypeId,
						threeTypeId:that.itemData.threeTypeId,
					}
					that.shop_name=that.itemData.shopName;
					that.serviceArr=that.itemData.imgUrls;
					that.serviceArr5=that.itemData.detilas;
					
					
					for (let i=0;i<(that.itemData.imgUrls).split(",").length;i++) {
						that.getEditArryImg1.push({path:(that.itemData.imgUrls).split(",")[i]})
					}
					for (let i=0;i<(that.itemData.detilas).split(",").length;i++) {
						that.getEditArryImg2.push({path:(that.itemData.detilas).split(",")[i]})
					}
					that.sku=[];
					for (let i = 0; i < that.itemData.skuList.length; i++) {	
						that.sku.push({sku_name:that.itemData.skuList[i].skuName,sku_price:that.itemData.skuList[i].skuPrice,status:true})	 		  
					}
					that.sell_price=that.itemData.sellPrice
					that.vip_price=that.itemData.vipPrice
					that.number=that.itemData.saleNum
					that.switch_check= that.itemData.isBurst;
					
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
				
			},
			push_skuData(){
					this.sku.push({sku_name:'',sku_price:'',status:true})
			},
			delete_skuData(indx){
				this.sku[indx].status=false;
			},
		 async	sub(type){
				let that=this;
				console.log()
			
				if(!empty_b(that.nameType.firstTypeId)){
					return uni.showToast({
						title: "请选择所属分类",
						icon: 'none'
					});
				}else if(!empty_b(that.shop_name)){
					return uni.showToast({
						title: "请输入宝贝名称",
						icon: 'none'
					});
				}else if(that.serviceArr.length<=0){
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
			
				if(that.serviceArr5.length<=0){
					return uni.showToast({
						title: "商品详情图片至少上传一张",
						icon: 'none'
					});
				}
				
			
				let d={
					shop_name :that.shop_name,
					shop_img:(that.serviceArr.split(','))[0],
					img_urls   :that.serviceArr,
					saleNum:that.number,
					 sell_price  :that.sell_price,
					 vip_price   :that.vip_price,
					 is_burst   :that.switch_check,
					first_type_id  :that.nameType.firstTypeId,
					seconde_type_id  :that.nameType.secondeTypeId,
					three_type_id   :that.nameType.threeTypeId,
					userid :uni.getStorageSync('dataInfo').id,
					 detilas   :that.serviceArr5,
					 is_send :type,
					 sku :JSON.stringify(sku),
					 shopid:that.itemid
				} 
			
				//console.log("上传的数据：真多啊！：",d)
				
				let data=await updateShopByUserid(d)
				
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
				// uni.showToast({
				// 	title: 'change:' + e.value,
				// 	icon: 'none',
				// 	color:'#4CD964'
				// })
			},
			
		
			getImageInfo4(e) {
				let str="";
				for(let i=0;i<e.length;i++){
					str+=e[i]+','
				}
					this.serviceArr=str.substring(0,str.length-1);
					
					console.log(this.serviceArr)
			},
			getImageInfo5(e){
			
				let str="";
				for(let i=0;i<e.length;i++){
					str+=e[i]+','
				}
					this.serviceArr5=str.substring(0,str.length-1);
					console.log(this.serviceArr)
			}
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
		
	
		.s-title{font-size: 28upx;padding: 20upx 0 6upx 30upx;}
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
		.guige {
			
			.g-t {
				font-size: 24upx;
				color: #666;
			}
			.g-f {
				font-size: 28upx;
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
		font-size: 24upx;
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
</style>
