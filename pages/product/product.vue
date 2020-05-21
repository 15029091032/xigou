<template>
	<view class="container">
		<!-- <image src="../../static/select.png" class="fenxiang" @click="share()"></image> -->
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400">
				<swiper-item class="swiper-item" v-for="(item, index) in imgUrls" :key="index">
					<view class="image-wrapper"><image :src="item" class="loaded" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{ dataDetail.shopName }}</text>
			<view class="price-box">
				<view class="p-box">
					<image src="../../static/vip.png" class="p-t"></image>
					<text class="v-p">¥{{ dataDetail.vipPrice }}</text>
				</view>
				<text class="p-b">市场指导价：{{ dataDetail.sellPrice }}</text>
				<text class="p-f">成交量：{{ dataDetail.saleNum }}</text>
			</view>
		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec(1)">
				<text class="tit">规格</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{ sItem.name }}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</view>
		<!-- 评价 -->
		<!-- <view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->

		<view class="detail-desc">
			<view class="d-header"><text>商品详情</text></view>
			<view class="c-content">
				<view><image mode="widthFix" v-for="(item, index) in desc" :key="index" class="c_img" :src="item"></image></view>
			</view>
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view open-type="switchTab" class="p-b-btn" @click="shopLink()">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>店铺</text>
			</view>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>客服</text>
			</navigator>
			<view class="p-b-btn" :class="{ active: favorite }" @click="toFavorite">
				<text class="yticon icon-shoucang "></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="black" style="background-color: #FFF55C;margin: 0;flex: 1;" class=" action-btn no-border add-cart-btn" @click="toggleSpec(2)">加入购物车</button>
				<button type="black" style="background-color: #FFE200;margin: 0;flex: 1;" class=" action-btn no-border buy-now-btn" @click="toggleSpec(3)">立即购买</button>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec(4)">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<!-- <image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image> -->
					<view class="right">
						<text class="price">¥{{ skuPrice }}</text>
					</view>
				</view>
				<text class="r-g">规格</text>
				<view class="r-h">
					<!-- 	<view class="r-hf"><text>{{editItem.secondeTypeId}}</text></view>
					<view class="r-ht"><text>{{editItem.secondeTypeId}}</text></view> -->
					<view
						v-for="(item, index) in dataDetail.skuList"
						:key="index"
						:name="item.id"
						@click="choiceSku(item.id, item.skuPrice, item.skuName)"
						:class="index == 0 ? 'r-hf status_but' : 'r-ht status_but'"
					>
						<text>{{ item.skuName }}</text>
					</view>
				</view>

				<view class="item-right">
					<text class="r-tl">数量</text>
					<uni-number-box class="r-tr" :min="1" :max="9"></uni-number-box>
				</view>
				<!-- <view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>规格</text>
					<view class="item-list">
						<text 
							v-for="(childItem, childIndex) in specChildList" 
							v-if="childItem.pid === item.id"
							:key="childIndex" class="tit"
							:class="{selected: childItem.selected}"
							@click="selectSpec(childIndex, childItem.pid)"
						>
							{{childItem.name}}
						</text>
					</view>
				</view> -->
				<button class="btn" @click="toggleSpec(5)">完成</button>
			</view>
		</view>
		<view class="shareBg"  v-if="shareType">
			<view class="title">分享到</view>
			<view class="cont">
				<view class="c" @click="share('wechat')">
					<view><image class="img"  src="../../static/ic_share_wechat.png"></image></view>
					<view class="t">微信分享</view>
				</view>
				<view class="c" @click="share('moment')">
					<view><image class="img"  src="../../static/ic_share_moment.png"></image></view>
					<view class="t">朋友圈分享</view>
				</view>
		
			</view>
			<view class="clean">
				 <button class="mini-btn" @click="shareType=!shareType">取消</button>
			</view>
		</view>
		<view  :animation="animationData" class="heidBG" v-if="shareType" @click="shareType=!shareType"></view>
	</view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box.vue';
import { sureConlectShopsByUserid, addOrderShop } from '../../api/cart.js';
import { selectShopByid } from '../../api/home.js';

export default {
	components: {
		// uniPopup,
		uniNumberBox
	},
	data() {
		return {
			editItemId: {}, // 接受上个页面传递过来的数据
			dataDetail: {},
			specClass: 'none',
			specSelected: [],
			skuid: -1,
			skuPrice: -1,
			favorite: false,
			number: 1,
			imgUrls: [],
			desc: [],
			type: 0,
			skuList: [],
			price: 0,
			shareType:false,
			animationData:""
		};
	},
	async onLoad(option) {
		let that = this;
		that.editItemId = option.id;

		const data = await selectShopByid({ shopid: that.editItemId, userid: uni.getStorageSync('dataInfo').id });

		that.dataDetail = data.data;
		if (data.data.is_conlect == 1) {
			that.favorite = true;
		}
		that.imgUrls = that.dataDetail.imgUrls.split(',');
		that.desc = that.dataDetail.detilas.split(',');
		that.skuid = that.dataDetail.skuList[0].id;
		that.skuPrice = that.dataDetail.skuList[0].skuPrice;
		that.skuName = that.dataDetail.skuList[0].skuName;


		uni.$on('getNumber', function(data) {
			that.number = data.number;
		});
		that.imgSty()
	},
	onReady(option) {
		// setTimeout(function() {
		// 	let arry = document.getElementsByClassName('c_img');
		// 	console.log('arry', arry.length);
		// 	for (let i = 0; i < arry.length; i++) {
		// 		arry[i].style.height = '100%';
		// 		arry[i].getElementsByTagName('img')[0].style.opacity = 1;

		// 		arry[i].getElementsByTagName('img')[0].style.position = 'initial';
		// 	}
		// }, 1000);
	},
	onNavigationBarButtonTap(e) {

			let that=this;
						console.log( e.index)
						  if(e.index==0){
							let that=this;
							that.shareType=!that.shareType;
						
						  }
	   },
	methods: {
		imgSty(){
			let view = uni.createSelectorQuery().select('.c_img');
					view.fields({
						size: true
					}, 
				    data => {
						console.log(data)
			}).exec();
		
		// 	alert(1)
		// 	const query = uni.createSelectorQuery('.c_img').select('.c_img');
		// 	query.fields({id:true,dataset:true},data=>{
		// 		console.log(data)
		// 	}).exec();

		},
		//规格弹窗开关
		toggleSpec(type) {
			let that = this;
			if (that.specClass === 'show') {
				that.specClass = 'hide';
				setTimeout(() => {
					that.specClass = 'none';
				}, 250);
			} else if (that.specClass === 'none') {
				that.specClass = 'show';
				that.skuPrice = that.dataDetail.skuList[0].skuPrice;
			}
			if (type == 4) return;

			if (type == 5) {
				if (that.type == 1) {
					console.log('规格', that.number);
				} else if (that.type == 2) {
					this.addshopCar();
				} else if (that.type == 3) {
				

					console.log(that.dataDetail.shopImg);
					let arryData = [
						{
							sku_price: that.skuPrice,
							shop_img: that.dataDetail.shopImg,
							sku_name: this.skuName,
							id: that.skuid,
							shopid: that.dataDetail.shopid,
							shop_name: this.dataDetail.shopName,
							shop_num: that.number
						}
					];

					uni.navigateTo({
						url: `../cart/confrims/confrims?type=1&arryData=${JSON.stringify(arryData)}`
					});
				}
			} else {
				that.type = type;
			}

			/*
			  type : 
			   1 表示点击规格
			   2 表示加入购物车
			   3 表示立即购买
			   4 表示赢藏面板
			   5表示点击完成
			*/
		},
		//选择规格
		selectSpec(index, pid) {
			let list = this.specChildList;
			list.forEach(item => {
				if (item.pid === pid) {
					this.$set(item, 'selected', false);
				}
			});

			this.$set(list[index], 'selected', true);
			//存储已选择
			/**
			 * 修复选择规格存储错误
			 * 将这几行代码替换即可
			 * 选择的规格存放在specSelected中
			 */
			this.specSelected = [];
			list.forEach(item => {
				if (item.selected === true) {
					this.specSelected.push(item);
				}
			});
		},
		//分享
		share(type) {
		
			
			let that=this;
			
			that.shareType=!that.shareType;
	
			if(type=='wechat'){
				
			}else if(type=='moment'){
				
			} 
			uni.share({
			    provider: "weixin",
			    scene:type=='wechat'? "WXSceneSession" : "WXSenceTimeline",
			    type: 1,
				title:that.dataDetail.shopName,
			    summary:that.dataDetail.shopName,
			    success: function (res) {
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					});
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					});
			        console.log("fail:" + JSON.stringify(err));
			    },
				})
		},
		async addshopCar() {
			let that = this;
			let d = {
				userid: uni.getStorageSync('dataInfo').id,
				shopid: that.dataDetail.shopid,
				skuid: that.skuid,
				shop_price: that.skuPrice,
				num: that.number,
				type: uni.getStorageSync('loadingType')
			};

			let data = await addOrderShop(d);

			uni.showToast({
				title: data.msg,
				icon: 'none'
			});
		},
		//收藏
		async toFavorite() {
			let that = this;

			let d = {
				userid: uni.getStorageSync('dataInfo').id,
				shopid: that.editItemId
			};

			let data = await sureConlectShopsByUserid(d);

			if (data.status == 200) {
				this.favorite = !this.favorite;
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
		},
		shopLink() {
			uni.navigateTo({
				url: '../shop/shop?id=' + this.dataDetail.userid
			});
		},
		choiceSku(id, price, skuName) {
			this.skuid = id;
			this.skuPrice = price;
			this.skuName = skuName;

			var skuArry = document.getElementsByClassName('status_but');
			for (let i = 0; i < skuArry.length; i++) {
				skuArry[i].className = ' status_but r-ht';
			}

			document.getElementsByName(id)[0].className = ' status_but r-hf';
		},
		buy() {
			this.toggleSpec();
			// uni.navigateTo({
			// 	url: `/pages/order/createOrder`
			// });
		},
		stopPrevent() {}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
	padding-bottom: 160upx;
}
.icon-you {
	font-size: $font-base + 2upx;
	color: #888;
}
.fenxiang {
	width: 64upx;
	height: 64upx;
	position: fixed;
	z-index: 999;
	right: 0;
	top: var(--status-bar-height);

	padding-top: 10upx;
}
.r-g {
	font-size: 24upx;
	color: #333;
}
.r-h {
	display: flex;
	margin-top: 17upx;
	color: #666;
	border-radius: 6upx;
	.r-ht {
		width: 113upx;
		height: 50upx;
		font-size: 24upx;
		padding-top: 6upx;
		background-color: #f6f6f6;
		border: 2upx solid #f6f6f6;
		text-align: center;
		margin-left: 10px;
	}
	.r-hf {
		width: 113upx;
		height: 50upx;
		font-size: 24upx;
		padding-top: 6upx;
		background-color: #ffe200;
		border: 2upx solid #ffe200;
		text-align: center;
		margin-left: 20upx;
	}
}

.item-right {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20upx;
	margin-top: 40upx;
	.r-tl {
		font-size: 24upx;
		color: #333;
	}
	.r-tr {
		position: static;
	}
}
.btn {
	width: 100%;
	background-color: #eff200;
	height: 100upx;
	color: #333;
	font-size: 32upx;
	margin-bottom: 0;
	bottom: 0;
	left: 0;
	text-align: center;
	position: fixed;
	z-index: 999;
}
.carousel {
	height: 722upx;
	position: relative;
	swiper {
		height: 100%;
	}
	.image-wrapper {
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-content: center;
		height: 750upx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
}

/* 标题简介 */
.introduce-section {
	background: #fff;
	padding: 20upx 30upx;

	.title {
		font-size: 30upx;
		color: #666;
		height: 50upx;
		line-height: 50upx;
	}
	.price-box {
		display: flex;
		justify-content: space-between;
		height: 64upx;
		padding: 10upx 0;
		.p-box {
			width: 100upx;
			height: 64upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.p-t {
				width: 48upx;
				height: 42upx;
			}
			.v-p {
				/* margin-bottom: 10upx; */
				color: #ef4321;
				font-size: 30upx;
			}
		}
		.p-b,
		.p-f {
			font-size: 28upx;
			color: #aaa;
		}
	}
}
/* 分享 */
.share-section {
	display: flex;
	align-items: center;
	color: $font-color-base;
	background: linear-gradient(left, #fdf5f6, #fbebf6);
	padding: 12upx 30upx;
	.share-icon {
		display: flex;
		align-items: center;
		width: 70upx;
		height: 30upx;
		line-height: 1;
		border: 1px solid $uni-color-primary;
		border-radius: 4upx;
		position: relative;
		overflow: hidden;
		font-size: 22upx;
		color: $uni-color-primary;
		&:after {
			content: '';
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
			left: -20upx;
			top: -12upx;
			position: absolute;
			background: $uni-color-primary;
		}
	}
	.icon-xingxing {
		position: relative;
		z-index: 1;
		font-size: 24upx;
		margin-left: 2upx;
		margin-right: 10upx;
		color: #fff;
		line-height: 1;
	}
	.tit {
		font-size: $font-base;
		margin-left: 10upx;
	}
	.icon-bangzhu1 {
		padding: 10upx;
		font-size: 30upx;
		line-height: 1;
	}
	.share-btn {
		flex: 1;
		text-align: right;
		font-size: $font-sm;
		color: $uni-color-primary;
	}
	.icon-you {
		font-size: $font-sm;
		margin-left: 4upx;
		color: $uni-color-primary;
	}
}

.c-list {
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	background: #fff;
	.c-row {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		position: relative;
	}
	.tit {
		width: 140upx;
	}
	.con {
		flex: 1;
		color: $font-color-dark;
		.selected-text {
			margin-right: 10upx;
		}
	}
	.bz-list {
		height: 40upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		text {
			display: inline-block;
			margin-right: 30upx;
		}
	}
	.con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: $font-color-dark;
		line-height: 40upx;
	}
	.red {
		color: $uni-color-primary;
	}
}

/* 评价 */
.eva-section {
	display: flex;
	flex-direction: column;
	padding: 20upx 30upx;
	background: #fff;
	margin-top: 16upx;
	.e-header {
		display: flex;
		align-items: center;
		height: 70upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.tit {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 4upx;
		}
		.tip {
			flex: 1;
			text-align: right;
		}
		.icon-you {
			margin-left: 10upx;
		}
	}
}
.eva-box {
	display: flex;
	padding: 20upx 0;
	.portrait {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		border-radius: 100px;
	}
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-base;
		color: $font-color-base;
		padding-left: 26upx;
		.con {
			font-size: $font-base;
			color: $font-color-dark;
			padding: 20upx 0;
		}
		.bot {
			display: flex;
			justify-content: space-between;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
}
/*  详情 */
.detail-desc {
	background: #fff;
	margin-top: 16upx;
	.d-header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		position: relative;

		text {
			padding: 0 20upx;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		&:after {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300upx;
			height: 0;
			content: '';
			border-bottom: 1px solid #ccc;
		}
	}
}

/* 规格选择弹窗 */
.attr-content {
	padding: 10upx 30upx;
	.a-t {
		display: flex;
		image {
			width: 170upx;
			height: 170upx;
			flex-shrink: 0;
			margin-top: -40upx;
			border-radius: 8upx;
		}
		.right {
			display: flex;
			flex-direction: column;
			padding-left: 24upx;
			font-size: $font-sm + 2upx;
			color: $font-color-base;
			line-height: 42upx;
			.price {
				font-size: $font-lg;
				color: $uni-color-primary;
				margin-bottom: 10upx;
			}
			.selected-text {
				margin-right: 10upx;
			}
		}
	}
	.attr-list {
		display: flex;
		flex-direction: column;
		font-size: $font-base + 2upx;
		color: $font-color-base;
		padding-top: 30upx;
		padding-left: 10upx;
	}
	.item-list {
		padding: 20upx 0 0;
		display: flex;
		flex-wrap: wrap;
		text {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20upx;
			margin-bottom: 20upx;
			border-radius: 100upx;
			min-width: 60upx;
			height: 60upx;
			padding: 0 20upx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.selected {
			background: #fbebee;
			color: $uni-color-primary;
		}
	}
}

/*  弹出层 */
.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;

	&.show {
		display: block;
		.mask {
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		.mask {
			animation: hidePopup 0.2s linear both;
		}
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		min-height: 40vh;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;
	}
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}
		100% {
			transform: translateY(0%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(120%);
		}
	}
}

/* 底部操作菜单 */
.page-bottom {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 95;
	display: flex;
	// justify-content: center;
	align-items: center;
	width: 100%;
	height: 100upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);

	.p-b-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-sm;
		color: $font-color-base;
		width: 70upx;
		height: 80upx;
		.yticon {
			font-size: 40upx;
			line-height: 48upx;
			color: $font-color-light;
		}
		&.active,
		&.active .yticon {
			color: $uni-color-primary;
		}
		.icon-fenxiang2 {
			font-size: 42upx;
			transform: translateY(-2upx);
		}
		.icon-shoucang {
			font-size: 46upx;
		}
	}
	.action-btn-group {
		display: flex;
		height: 100%;
		// border-radius: 100px;
		overflow: hidden;
		// box-shadow: 0 20upx 40upx -16upx #fa436a;
		// box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		// background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
		margin-left: 20upx;
		position: relative;
		flex: 1;
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28upx;
			width: 0;
			border-right: 1px solid rgba(255, 255, 255, 0.5);
		}
		.action-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base;
			padding: 0;
			border-radius: 0;
			background: transparent;
		}
	}
}
.c_img {
	width: 100%;
	// height: 1000upx;
}

.shareBg {
	background-color: white;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;

	box-shadow: 0px 0px 26px #c7c0c0;
	z-index: 998;
	padding: 5% 0;
	.title,
	.clean {
		width: 100%;
		text-align: center;
		margin: 20upx 0;
		line-height: 50upx;
		font-size: 30upx;
	}
	.cont {
		display: flex;
		flex-wrap: wrap;
		.c {
			width: 25%;
			align-items: center;
			justify-content: center;
			text-align: center;
			.img{
				width: 120upx;
				    height: 120upx
					
			}
			.t{
				font-size: 24upx;
			}
		}
	}
	.clean{
		margin-top: 10%;
		.mini-btn{
		    margin: 0 6%;
		    border-radius: 100upx;
			font-size: 30upx;
		}
		.uni-button:after{
			border-radius: 100upx;
		}
	}
}
.heidBG{
		position: fixed;
	    z-index: 997;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
	    background: rgba(0,0,0,.6);
}
.c_img>img{
	
		position: initial;
		opacity: 1;
	
}

// view class="shareBg">
// 			<text class="title">分享到</text>
// 			<view class="cont">
// 				<view>1</view>
// 				<view>1</view>
// 				<view>1</view>
// 				<view>1</view>
// 				<view>1</view>
// 			</view>
// 			<text class="clean">取消</text>
// 		</view>
// .uni-image{
// 	img{
// 		    position: initial;opacity: 0;
// 	}
// }
</style>
