<template>
	<view class="container">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#FFE200"></uni-segmented-control>
		<view class="content" v-if="current === 0">
			<view class="card">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">待付款</view>
				</view>
				<view class="card-content">
					<view class="content-left"><image mode="scaleToFill" class="img" src="../../../static/001.png"></image></view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">商品名称</view>
							<view class="name-right">￥35.00</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 100g</view>
							<view class="guige-right">×1</view>
						</view>
						<view class="times">订单时间：2020-04-17</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="top">
						<view class="left">
							<text class="dt">订单合计：</text>
							<text class="price">￥1035.00</text>
						</view>
						<view class="right">共1件</view>
					</view>
					<view class="bottom">
						<view class="botton-t">
							<text>收件人：马花藤</text>
							<text>18360570821</text>
						</view>
						<view class="botton-f">陕西省西安市长安区南长安街壹号</view>
					</view>
				</view>
				<view class="btns" v-if="this.type == false">
					<button class="mini-btn action-btn recom" size="mini">联系买家</button>
					<button class="mini-btn action-btn recom" size="mini">确认发货</button>
				</view>
			</view>
			<view class="card">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">待发货</view>
				</view>
				<view class="card-content">
					<view class="content-left"><image mode="scaleToFill" class="img" src="../../../static/001.png"></image></view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">商品名称</view>
							<view class="name-right">￥35.00</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 100g</view>
							<view class="guige-right">×1</view>
						</view>
						<view class="times">订单时间：2020-04-17</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="top">
						<view class="left">
							<text class="dt">订单合计：</text>
							<text class="price">￥1035.00</text>
						</view>
						<view class="right">共1件</view>
					</view>
					<view class="bottom">
						<view class="botton-t">
							<text>收件人：马花藤</text>
							<text>18360570821</text>
						</view>
						<view class="botton-f">陕西省西安市长安区南长安街壹号</view>
					</view>
				</view>
				<view class="btns" v-if="this.type == true">
					<button class="mini-btn action-btn recom" size="mini">联系买家</button>
					<button class="mini-btn action-btn recom" size="mini">确认发货</button>
				</view>
			</view>
			<view class="card">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">已完成</view>
				</view>
				<view class="card-content">
					<view class="content-left"><image mode="scaleToFill" class="img" src="../../../static/001.png"></image></view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">商品名称</view>
							<view class="name-right">￥35.00</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 100g</view>
							<view class="guige-right">×1</view>
						</view>
						<view class="times">订单时间：2020-04-17</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="top">
						<view class="left">
							<text class="dt">订单合计：</text>
							<text class="price">￥1035.00</text>
						</view>
						<view class="right">共1件</view>
					</view>
					<view class="bottom">
						<view class="botton-t">
							<text>收件人：马花藤</text>
							<text>18360570821</text>
						</view>
						<view class="botton-f">陕西省西安市长安区南长安街壹号</view>
					</view>
				</view>
				<view class="btns" v-if="this.type == true">
					<button class="mini-btn action-btns recoms" size="mini">查看物流</button>
					<button class="mini-btn action-btns recoms" size="mini">联系买家</button>
				</view>
			</view>
		</view>
		<view class="content" v-if="current === 1">
			<view class="card">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">待付款</view>
				</view>
				<view class="card-content">
					<view class="content-left"><image mode="scaleToFill" class="img" src="../../../static/001.png"></image></view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">商品名称</view>
							<view class="name-right">￥35.00</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 100g</view>
							<view class="guige-right">×1</view>
						</view>
						<view class="times">订单时间：2020-04-17</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="top">
						<view class="left">
							<text class="dt">订单合计：</text>
							<text class="price">￥1035.00</text>
						</view>
						<view class="right">共1件</view>
					</view>
					<view class="bottom">
						<view class="botton-t">
							<text>收件人：马花藤</text>
							<text>18360570821</text>
						</view>
						<view class="botton-f">陕西省西安市长安区南长安街壹号</view>
					</view>
				</view>
				<view class="btns" v-if="this.type == false">
					<button class="mini-btn action-btn recom" size="mini">联系买家</button>
					<button class="mini-btn action-btn recom" size="mini">确认发货</button>
				</view>
			</view>
		</view>
		<view class="content" v-if="current === 2">
			<view class="card">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">待发货</view>
				</view>
				<view class="card-content">
					<view class="content-left"><image mode="scaleToFill" class="img" src="../../../static/001.png"></image></view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">商品名称</view>
							<view class="name-right">￥35.00</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 100g</view>
							<view class="guige-right">×1</view>
						</view>
						<view class="times">订单时间：2020-04-17</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="top">
						<view class="left">
							<text class="dt">订单合计：</text>
							<text class="price">￥1035.00</text>
						</view>
						<view class="right">共1件</view>
					</view>
					<view class="bottom">
						<view class="botton-t">
							<text>收件人：马花藤</text>
							<text>18360570821</text>
						</view>
						<view class="botton-f">陕西省西安市长安区南长安街壹号</view>
					</view>
				</view>
				<view class="btns" v-if="this.type == true">
					<button class="mini-btn action-btn recom" size="mini">联系买家</button>
					<button class="mini-btn action-btn recom" size="mini">确认发货</button>
				</view>
			</view>
		</view>
		<view class="content" v-if="current === 3">
			<view class="card">
				<view class="card-hd">
					<view class="hd-left">订单编号：C01254638820</view>
					<view class="hd-right ">已完成</view>
				</view>
				<view class="card-content">
					<view class="content-left"><image mode="scaleToFill" class="img" src="../../../static/001.png"></image></view>
					<view class="content-right">
						<view class="name">
							<view class="name-left">商品名称</view>
							<view class="name-right">￥35.00</view>
						</view>
						<view class="guige">
							<view class="guige-left">规格 100g</view>
							<view class="guige-right">×1</view>
						</view>
						<view class="times">订单时间：2020-04-17</view>
					</view>
				</view>
				<view class="card-footer">
					<view class="top">
						<view class="left">
							<text class="dt">订单合计：</text>
							<text class="price">￥1035.00</text>
						</view>
						<view class="right">共1件</view>
					</view>
					<view class="bottom">
						<view class="botton-t">
							<text>收件人：马花藤</text>
							<text>18360570821</text>
						</view>
						<view class="botton-f">陕西省西安市长安区南长安街壹号</view>
					</view>
				</view>
				<view class="btns" v-if="this.type == true">
					<button class="mini-btn action-btns recoms" size="mini">查看物流</button>
					<button class="mini-btn action-btns recoms" size="mini">联系买家</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	data() {
		return {
			items: ['全部', '待付款', '待发货', '已完成'],
			current: 0,
			type: true,
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
};
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
.img {
	width: 141upx;
	height: 118upx;
}
.card {
	width: 100%;
	min-height: 390upx;
	padding: 20upx;
	margin-bottom: 10upx;
}
.card-hd {
	display: flex;
	justify-content: space-between;
	height: 40upx;
}
.card-content {
	width: 100%;
	padding-top: 30upx;
	display: flex;
	justify-content: space-between;
	.content-left {
		width: 141upx;
		height: 118upx;
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
	height: 200upx;
	margin-top: 20upx;
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70upx;
		border-bottom: 1upx solid #ccc;
		border-top: 1upx solid #ccc;
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
	margin-top: 20upx;
	width: 100%;
	height: 90upx;
	background-color: #f6f6f6;
	// margin-bottom: 60upx;
	display: flex;
	flex-direction: column;
	border-bottom: 1upx solid #ccc;
	// align-items: center;
	.botton-t {
		display: flex;
		justify-content: space-between;
		font-size: 26upx;
		// line-height: 50upx;
		color: #333;
	}
	.botton-f {
		font-size: 26upx;
		color: #333;
	}
}
.btns {
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
.action-btns{
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
			&.recoms{
				background: #fff9f9;
				color: #666666;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}		
</style>
