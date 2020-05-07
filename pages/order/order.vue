<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FFE200"></uni-segmented-control>
		<view class="line"></view>
		<view class="content">
			<view class="card" v-if="current === 0">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">待付款</view>
				</view>
				<view class="card-content">
					<view class="content-left">
						<image  mode="scaleToFill" class="img" :src="goodsDetail.shop_img"></image>
					</view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">{{goodsDetail.shop_name}}</view>
							<view class="name-right">￥{{goodsDetail.shop_money}}</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 {{goodsDetail.sku_name}}</view>
							<view class="guige-right">×{{goodsDetail.shop_num}}</view>
						</view>
						<view class="times">
							订单时间：{{goodsDetail.ctime}}
						</view>
					</view>
				</view>
				<view class="linea"></view>
				<view class="card-footer">
					<view class="top">
						<view class="left"><text class="dt">订单合计：</text><text class="price">￥{{goodsList.total_shop_money}}</text></view>
						<view class="right">共{{goodsList.total_shop_num}}件</view>
					</view>
					<view class="bottom">
						<button class="action-btn recom" @click="obligations()">去付款</button>
					</view>
				</view>
			</view>
			<view class="card" v-if="current === 1">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right">待发货</view>
				</view>
				<view class="card-content">
					<view class="content-left">
						<image  mode="scaleToFill" class="img" :src="goodsDetail.shop_img"></image>
					</view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">{{goodsDetail.shop_name}}</view>
							<view class="name-right">￥{{goodsDetail.shop_money}}</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 {{goodsDetail.sku_name}}</view>
							<view class="guige-right">×{{goodsDetail.shop_num}}</view>
						</view>
						<view class="times">
							订单时间：{{goodsDetail.ctime}}
						</view>
					</view>
				</view>
				<view class="linea"></view>
				<view class="card-footer">
					<view class="top">
						<view class="left"><text class="dt">订单合计：</text><text class="price">￥{{goodsList.total_shop_money}}</text></view>
						<view class="right">共{{goodsList.total_shop_num}}件</view>
					</view>
					<view class="bottom">
						<button class="action-btn recom">联系客服</button>
					</view>
				</view>
			</view>
			<view class="card" v-if="current === 2">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right">正在配送</view>
				</view>
				<view class="card-content">
					<view class="content-left">
						<image  mode="scaleToFill" class="img" :src="goodsDetail.shop_img"></image>
					</view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">{{goodsDetail.shop_name}}</view>
							<view class="name-right">￥{{goodsDetail.shop_money}}</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 {{goodsDetail.sku_name}}</view>
							<view class="guige-right">×{{goodsDetail.shop_num}}</view>
						</view>
						<view class="times">
							订单时间：{{goodsDetail.ctime}}
						</view>
					</view>
				</view>
				<view class="linea"></view>
				<view class="card-footer">
					<view class="top">
						<view class="left"><text class="dt">订单合计：</text><text class="price">￥{{goodsList.total_shop_money}}</text></view>
						<view class="right">共{{goodsList.total_shop_num}}件</view>
					</view>
					<view class="bottom  ">
						<button class="action-btn">查看物流</button>
						<button class="action-btn recom">确认收货</button>
						<button class="action-btn recom" @click="togglePopup('center', 'image')">收货码</button>
					</view>
					<!-- 插屏弹窗 -->
					<uni-popup ref="showimage" :type="type" :mask-click="true" @change="change">
						<view class="uni-image">
							<image class="image" src="/static/uni.png" mode="scaleToFill" />
							<view class="uni-image-close" @click="cancel('image')">
								<uni-icons type="clear" color="#fff" size="30" />
							</view>
						</view>
					</uni-popup>
				</view>
			</view>
			<view class="card" v-if="current === 3">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right">交易完成</view>
				</view>
				<view class="card-content">
					<view class="content-left">
						<image  mode="scaleToFill" class="img" :src="goodsDetail.shop_img"></image>
					</view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">{{goodsDetail.shop_name}}</view>
							<view class="name-right">￥{{goodsDetail.shop_money}}</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 {{goodsDetail.sku_name}}</view>
							<view class="guige-right">×{{goodsDetail.shop_num}}</view>
						</view>
						<view class="times">
							订单时间：{{goodsDetail.ctime}}
						</view>
					</view>
				</view>
				<view class="linea"></view>
				<view class="card-footer">
					<view class="top">
						<view class="left"><text class="dt">订单合计：</text><text class="price">￥{{goodsList.total_shop_money}}</text></view>
						<view class="right">共{{goodsList.total_shop_num}}件</view>
					</view>
					<view class="bottom" @click="goEvaluate">
						<button class="action-btn recom">去评价</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrderList } from '../../api/user.js';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
// import uniCard from '@/components/uni-card/uni-card.vue'
export default {
	data() {
		return {
			items: ['待付款', '待发货', '待收货', '待评价'],
			current: 0,
			type:'',
			goodsDetail:[],
			goodsList:[],
		};
	},
	components: {
		
	},
	onLoad(){
		this.gOrderList("804029",'1','1','1','11')
	},
	methods: {
		async gOrderList(userid,type,status,page,rows) {
			const data = await getOrderList({
				userid: userid,
				type: type,
				status: status,
				page: page,
				rows: rows,
			});
			
			for(let val of data.data)
			this.goodsList = val
			for(let i of this.goodsList.shopList)
			this.goodsDetail = i
			console.log(this.goodsList,111)
			console.log(this.goodsDetail,222)
		},
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		obligations() {
			uni.navigateTo({
				url:'./oderDetail/oderDetail'
			})
		},
		goEvaluate() {
			uni.navigateTo({
				url:'evaluate/evaluate'
			})
		},
		togglePopup(type, open) {
			switch (type) {
				case 'top':
					this.content = '顶部弹出 popup'
					break
		
				case 'bottom':
					this.content = '底部弹出 popup'
					break
				case 'center':
					this.content = '居中弹出 popup'
					break
			}
			this.type = type
			this.$nextTick(() => {
				this.$refs['show' + open].open()
			})
		},
		cancel(type) {
			this.$refs['show' + type].close()
		},
		change(e) {
			console.log('是否打开:' + e.show)
		},
	}
};
</script>

<style lang="scss" scoped>
.line, 
.linea{
	border: 2upx solid #eee;
	margin-top: 20upx;
}
.img {
		width: 141upx;
		height: 118upx ;
	}
.card {
	width: 100%;
	height: 390upx;
	padding: 20upx;
}
.card-hd {
	display: flex;
	justify-content: space-between;
}
.card-content {
	width: 100%;
	padding-top: 30upx;
	display: flex;
	justify-content: space-between;
	.content-left {
		width: 141upx;
		height: 118upx ;
	}
	.content-right {
		height: 118upx;
		width: 76%;
		margin-left: 30upx;
		.name {
			display: flex;
			justify-content: space-between;
			.name-left {
				font-size: 30upx;
				color: #000;
			}
			.name-right {
				font-size: 24upx;
				color: #ef4321;
			}
		}
		.guige {
			display: flex;
			justify-content: space-between;
			.guige-left {
				font-size: 24upx;
				color: #999;
			}
			.guige-right {
				font-size: 22upx;
				color: #969696;
			}
		}
		.times {
			font-size: 20upx;
			color: #969696;
		}
	}
}

.card-footer {
	width: 100%;
	height: 149upx;
	margin-top: 20upx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			.dt {
				font-size: 28upx;
				color: #5a5a5a;
			}
			.price {
				font-size: 30upx;
				color: #ef4321;
			}
		}
		.right {
			font-size: 26upx;
			color: #5a5a5a;
		}
	}
}

.hd-left {
	font-size: 28upx;
	color: #3c3c3c;
}
.hd-right {
	font-size: 26upx;
	color: #aaaaaa;
}
.bottom {
	padding-top: 20upx;
	padding-bottom: 30upx;
	width: 100%;
	height: 100upx;
	display: flex;
	justify-content: flex-end;
}
.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: #666666;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
/* 插屏广告 */
	.uni-image {
		position: relative;
	}

	.image {
		width: 400upx;
		height: 400upx;
	}

	.uni-image-close {
		margin-top: -500upx;
		text-align: right;
	}
</style>
