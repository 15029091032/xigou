<template>
	<view class="container status_bar-1">
		<!-- 头部 -->
		<!-- <div class="header">
			<text>购物车</text>
			<view class="btns" v-if="!isEdit" @click="isEdit = true">管理</view>
			<view class="btns" v-else @click="isEdit = false">完成</view>
		</div> -->
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty === true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<view class="hd-txt">总共{{ cartList.length }}件宝贝</view>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="index">
					<view class="cart-item" :class="{ 'b-b': index !== cartList.length - 1 }">
						<view class="cart-hd" @click="storeAllCheck(item)" v-if="item.shopList.length > 0">
							<image v-if="!item.checked" src="../../static/icon-006.png" mode=""></image>
							<image v-else src="../../static/icon-007.png"></image>
							{{ item.store_name }}
						</view>

						<view class="cart-box" v-for="(goods, keys) in item.shopList" :key="goods.id">
							<view class="check-box" @click="goodCheck(item, goods)">
								<image v-if="!goods.isChecked" src="../../static/icon-006.png" mode=""></image>
								<image v-else src="../../static/icon-007.png"></image>
							</view>
							<image class="image-wrapper" :src="goods.shop_img"></image>
							<view class="item-right">
								<text class="clamp title">{{ goods.shop_name }}</text>
								<text class="attr">{{ goods.sku_name }}</text>
								<text class="price">¥{{ goods.sku_price }}</text>
								<uni-number-box
									class="step"
									:min="1"
									:max="goods.stock"
									:value="goods.number > goods.stock ? goods.stock : goods.shop_num"
									:isMax="goods.number >= goods.stock ? true : false"
									:isMin="goods.number === 1"
									:index="keys"
									:parentIndex="index"
									@eventChange="numberChange"
									
								></uni-number-box>
							</view>
							<!-- <text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text> -->
						</view>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<!-- <view class="action-section">
				<view class="checkbox">
					<image :src="allChecked ? '/static/selected.png' : '/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn" :class="{ show: allChecked }" @click="clearCart">清空</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{ total }}</text>
					<text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view> -->

			<view class="cart-foot">
				<view v-if="!isEdit" class="box-wrapper">
					<view class="left" @click="goodsAllCheck">
						<image v-if="!allChecked" src="../../static/icon-006.png" mode=""></image>
						<image v-else src="../../static/icon-007.png" mode=""></image>
						<text>全选</text>
					</view>
					<view class="right">
						<view class="total">合计：¥ {{ total }}</view>
						<view class="buy-btn" @click="goConfirms()">结算</view>
					</view>
				</view>
				<view v-else class="edit-wrapper">
					<view class="empty-btn" @click="clearCart">清空购物车</view>
					<view class="delete-btn" @click="bindDelete">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { accAdd, accMul } from '../../utils/index.js';
import { mapState } from 'vuex';
import uniNumberBox from '@/components/uni-number-box.vue';
import { updateOrderShopNum, selectOrderShopsByUserid,deleteOrderShop } from '../../api/cart.js';
export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: false, //空白页现实  true|false
			cartList: [],
			isEdit: false,
			loadingType: '',
			dataInfo: ''
		};
	},
	onLoad() {
	
		try {
			
			const loadingType = uni.getStorageSync('loadingType');
			const dataInfo = uni.getStorageSync('dataInfo');
			console.log('userInfo========', dataInfo.id);
			console.log('loadingType========', loadingType);
			this.loadingType = loadingType;
			this.dataInfo = dataInfo.id;
		} catch (e) {
			// error
		}
		this.loadData();
	},
	onShow(){
	console.log("hasLogin的状态：",this.hasLogin)
	console.log("empty的状态：",this.empty)
	},
	watch: {
		//显示空白页
		cartList(e) {
			let empty = e.length === 0 ? true : false;
			if (this.empty !== empty) {
				this.empty = empty;
			}
		}
	},
	computed: {
		...mapState(['hasLogin'])
	},
	 onNavigationBarButtonTap(e) {  
	        console.log(e);
			var webView = this.$mp.page.$getAppWebview();  
			console.log( this.isEdit)
			  if(e.index==0){
				
				 
				 if (!this.isEdit){
					
					 webView.setTitleNViewButtonStyle(0, {  
					     text: '完成',  
					 }); 
					 
					 this.isEdit = true
				 }else{
					 
					webView.setTitleNViewButtonStyle(0, {
					    text: '管理',   
					}); 
					 this.isEdit = false;
				 }
			  }
	    },
	methods: {
		async add(obj) {
			let data = await updateOrderShopNum(obj);
		},
		//请求数据
		async loadData() {
			console.log(31)
			// let list = await this.$api.json('cartList');
			const data = await selectOrderShopsByUserid({
				page: '1',
				rows: '10',
				userid: this.dataInfo,
				type: this.loadingType
			});
			console.log(this.cartList);
			// this.cartList = data.data;
			let list = data.data;
		
			let cartList = list.map(item => {
				
				item.checked = false;
				console.log(item);
				item.shopList.forEach((goods, index) => {
					goods.isChecked = false;
				});
				return item;
			});
			
			
		
			
			this.cartList = cartList;
			this.calcTotal(); //计算总价
		},
		// 确认订单
		goConfirms() {
			
		
			let arryData=[];
			this.cartList.forEach(item => {
				 item.shopList.forEach(goods => {
					 if(goods.isChecked==true){
						arryData.push(goods)
					 }
				 })
		
			});
		
			uni.navigateTo({
				url: `./confrims/confrims?type=2&arryData=${JSON.stringify(arryData)}`,
			});
		
		},
		// //监听image加载完成
		// onImageLoad(key, index) {
		// 	this.$set(this[key][index], 'loaded', 'loaded');
		// },
		// //监听image加载失败
		// onImageError(key, index) {
		// 	this[key][index].image = '/static/errorImage.jpg';
		// },
		navToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		// 店铺全选
		storeAllCheck(item) {
			if (item.checked) {
				item.checked = false;
				item.shopList.forEach((googs, index) => {
					googs.isChecked = false;
				});
			} else {
				item.checked = true;
				item.shopList.forEach((googs, index) => {
					googs.isChecked = true;
				});
			}

			this.calcTotal();
		},
		// 商品选中
		goodCheck(item, goods) {
			console.log('--------------');
			let checkArr = [];
			goods.isChecked = !goods.isChecked;
			item.shopList.forEach(item => {
				if (item.isChecked) {
					checkArr.push(item);
				}
			});
			if (checkArr.length == item.shopList.length) {
				item.checked = true;
			} else {
				item.checked = false;
			}
			this.calcTotal();
			
			console.log("cartList+++++",this.cartList)
		},

		// 商品全选
		goodsAllCheck() {
			if (this.allChecked) {
				this.allChecked = false;
				this.cartList.forEach(item => {
					item.checked = false;
					item.shopList.forEach(goods => {
						goods.isChecked = false;
					});
				});
			} else {
				this.allChecked = true;
				this.cartList.forEach(item => {
					item.checked = true;
					item.shopList.forEach(goods => {
						goods.isChecked = true;
					});
				});
			}
			this.calcTotal();
		},
		//选中状态处理
		check(type, index) {
			if (type === 'item') {
				this.cartList[index].checked = !this.cartList[index].checked;
			} else {
				const checked = !this.allChecked;
				const list = this.cartList;
				list.forEach(item => {
					item.checked = checked;
				});
				this.allChecked = checked;
			}
			this.calcTotal(type);
		},
		//数量
		async addDel(obj) {
			let data = await updateOrderShopNum(obj);
			console.log(data);
		},
		numberChange(data) {
			console.log(data, '加减');
			console.log(this.cartList[data.parentIndex].shopList[data.index].id, 'id');
			var id = this.cartList[data.parentIndex].shopList[data.index].id
			var obj = {
				id:id,
				num:data.number
			}
			this.addDel(obj)
			
			// updateOrderShopNum({
			// 	id:id,
			// 	num:data.number
			// })
			// this.add({})
			// this.cartList[data.index].number = data.number;
			this.cartList[data.parentIndex].shopList[data.index].shop_num = data.number;
			this.calcTotal();
		},
		//删除
		 bindDelete(index) {
			let self = this;
			
		
			uni.showModal({
				content: '是否要删除该商品？',
				success: res => {
					if (res.confirm) {
						
						
					
						
						let arryShop=[];
					
					    self.cartList.forEach((item, index) => {
							
					    	var arr = item.shopList.filter(goods => {
								if(goods.isChecked==true)
								arryShop.push(goods.id);
					     		return goods.isChecked == false;
					    	});
					    	item.shopList = arr;
							
					    });
						
					 self.deleteShop(arryShop)
						
						
					} else if (res.cancel) {
					    console.log('用户点击取消');
					}
				
					self.calcTotal();
				}
			});
		},
		async deleteShop(arryShop){
			
			let data = await deleteOrderShop({'ids':JSON.stringify(arryShop)})
			
			if (data.status == 200) {
			  
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
		//清空
		clearCart() {
				let self = this;
			uni.showModal({
				content: '清空购物车？',
				success: e => {
					if (e.confirm) {
						
						
												
							let arryShop=[];
											
						   self.cartList.forEach((item, index) => {
													
						   	var arr = item.shopList.filter(goods => {
										
									arryShop.push(goods.id);
						    		return goods.isChecked == false;
						   	});
						   	item.shopList = arr;
													
						   });
												
						self.deleteShop(arryShop)
						
						
					}
				}
			});
		},
		//计算总价
		calcTotal() {
			let goods = this.cartList;
			if (goods.length === 0) {
				this.empty = true;
				return;
			}
			let total = 0;
			let checked = true;
			goods.forEach(item => {
				item.shopList.forEach(goods => {
					if (goods.isChecked === true) {
						total += accMul(goods.sku_price, goods.shop_num);
					} else {
						checked = false;
						console.log(checked, 'checked');
					}
				});
			});
			this.allChecked = checked;
			this.total = total;
			// goods.list.forEach(item => {
			// 	console.log(item)
			// 	// if (item.isChecked === true) {
			// 	// 	total += item.price * item.number;
			// 	// } else if (checked === true) {
			// 	// 	checked = false;
			// 	// }
			// });
			// this.allChecked = checked;
			// this.total = Number(total.toFixed(2));
		},
		//创建订单
		createOrder() {
			let list = this.cartList;
			let goodsData = [];
			list.forEach(item => {
				if (item.checked) {
					goodsData.push({
						attr_val: item.attr_val,
						number: item.number
					});
				}
			});

			uni.navigateTo({
				url: `/pages/order/createOrder?data=${JSON.stringify({
					goodsData: goodsData
				})}`
			});
			this.$api.msg('跳转下一页 sendData');
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
	background-color: #f6f6f6;
}
.container {
	padding: 0 20upx 134upx;
	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;
		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}
		.empty-tips {
			display: flex;
			font-size: $font-sm + 2upx;
			color: $font-color-disabled;
			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}
}
/* 购物车列表项 */
.cart-item {
	display: flex;
	flex-direction: column;
	position: relative;
	margin-top: 30upx;
	background-color: #fff;
	.cart-hd {
		display: flex;
		align-items: center;
		height: 80upx;
		padding: 0 28upx;
		font-size: 28upx;
		color: #666;
		border-bottom: 1px solid #eee;
		image {
			width: 40upx;
			height: 40upx;
			margin-right: 22upx;
		}
	}
	.cart-box {
		display: flex;
		align-items: center;
		position: relative;
		padding: 37upx 0;
		.check-box {
			display: flex;
			justify-content: center;
			width: 92upx;
			height: 100%;
			image {
				width: 40upx;
				height: 40upx;
			}
		}
	}
	.image-wrapper {
		width: 175upx;
		height: 175upx;
		flex-shrink: 0;
		position: relative;
		image {
			border-radius: 8upx;
		}
	}
	.checkbox {
		position: absolute;
		left: -16upx;
		top: -16upx;
		z-index: 8;
		font-size: 44upx;
		line-height: 1;
		padding: 4upx;
		color: $font-color-disabled;
		background: #fff;
		border-radius: 50px;
	}
	.item-right {
		display: flex;
		flex-direction: column;
		width: 416upx;
		position: relative;
		padding-left: 30upx;
		.title,
		.price {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			height: 40upx;
			line-height: 40upx;
		}
		.attr {
			font-size: $font-sm + 2upx;
			color: #aaa;
			height: 50upx;
			line-height: 50upx;
		}
		.price {
			height: 50upx;
			line-height: 50upx;
			font-size: 24upx;
			color: #ef4321;
		}
		.step {
			left: auto;
			right: 20upx;
			bottom: -20upx;
			width: 161upx;
			background: #fff;
			border: 2upx solid #eeeeee;
			border-radius: 5upx;
			font-size: 24upx;
			color: #999;
		}
	}
	.del-btn {
		padding: 4upx 10upx;
		font-size: 34upx;
		height: 50upx;
		color: $font-color-light;
	}
}
/* 底部栏 */
.action-section {
	/* #ifdef H5 */
	margin-bottom: 100upx;
	/* #endif */
	position: fixed;
	left: 30upx;
	bottom: 30upx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 690upx;
	height: 100upx;
	padding: 0 30upx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16upx;
	.checkbox {
		height: 52upx;
		position: relative;
		image {
			width: 52upx;
			height: 100%;
			position: relative;
			z-index: 5;
		}
	}
	.clear-btn {
		position: absolute;
		left: 26upx;
		top: 0;
		z-index: 4;
		width: 0;
		height: 52upx;
		line-height: 52upx;
		padding-left: 38upx;
		font-size: $font-base;
		color: #fff;
		background: $font-color-disabled;
		border-radius: 0 50px 50px 0;
		opacity: 0;
		transition: 0.2s;
		&.show {
			opacity: 1;
			width: 120upx;
		}
	}
	.total-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40upx;
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.coupon {
			font-size: $font-sm;
			color: $font-color-light;
			text {
				color: $font-color-dark;
			}
		}
	}
	.confirm-btn {
		padding: 0 38upx;
		margin: 0;
		border-radius: 100px;
		height: 76upx;
		line-height: 76upx;
		font-size: $font-base + 2upx;
		background: $uni-color-primary;
		box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
	}
}
/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
	color: $uni-color-primary;
}
/* 头部 */
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 20upx;
	font-size: 36upx;
	.btns {
		font-size: 32upx;
	}
}
.hd-txt {
	margin-top: 40upx;
	font-size: 28upx;
	color: #666;
}
.cart-foot {
	z-index: 20;
	position: fixed;
	left: 0;
	bottom: 0upx;
	width: 100%;
	padding: 0 24upx 0 50upx;
	background-color: #fff;
	border-top: 1px solid #eee;
	.box-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 108upx;

		.left {
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #999;
			image {
				width: 40upx;
				height: 40upx;
				margin-right: 22upx;
			}
		}
		.right {
			display: flex;
			align-items: center;
			.total {
				font-size: 28upx;
				color: #ef4321;
			}
			.buy-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 192upx;
				height: 80upx;
				margin-left: 30upx;
				background: rgba(255, 226, 0, 1);
				box-shadow: 0px 2upx 14upx 0px rgba(0, 0, 0, 0.06);
				border-radius: 40upx;
				font-size: 32upx;
			}
		}
	}
	.edit-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 108upx;
		.empty-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 212upx;
			height: 80upx;
			font-size: 32upx;
			border: 2upx solid rgba(255, 126, 0, 1);
			box-shadow: 0px 2upx 14upx 0px rgba(0, 0, 0, 0.06);
			border-radius: 40upx;
		}
		.delete-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 162upx;
			height: 80upx;
			margin-left: 20upx;
			font-size: 32upx;
			border: 2upx solid rgba(255, 226, 0, 1);
			box-shadow: 0px 2upx 14upx 0px rgba(0, 0, 0, 0.06);
			border-radius: 40upx;
		}
	}
}
</style>
