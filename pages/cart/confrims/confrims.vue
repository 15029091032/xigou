<template>
	<view class="container">
		<view class="address-box">
			<view class="box-t">收货地址</view>
			<view class="box-b">
				<view class="box-l"><image src="../../../static/111.png"></image></view>
				<view class="box-r" v-for="(item, index) in addressList" :key="index" v-if="item.isDefault==1">
					<view class="box-rt">
						<text class="box-rtt">收件人：{{item.name}}</text>
						<text>{{item.phone}}</text>
					</view>
					<view class="box-rb">{{item.proCityArea+item.address}}</view>
					<view class="box-rf" @click="goAddress(item)">
						<text>其他地址</text>
						<image src="../../../static/112.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="collection" v-for="(item, index) in arryData" :key="index" >
			<image class="colle-left" :src="item.shop_img"></image>
			<view class="colle-right">
				<view class="crh">{{item.shop_name}}</view>
				<view class="crb">规格：&nbsp{{item.sku_name}}g</view>
				<view class="crf">
					<view class="crf-l">
						<text class="c-v">✖️{{item.shop_num}}</text>
						<text class="prc">￥{{item.sku_price}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="colle-rt">
			<text>应付金额</text>
			<text>¥{{shopInfo.countPrice}}</text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="goYh()">
			<text class="cell-tit">优惠卷</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- 支付方式 -->
		<view class="draw">
				<view class="list-t">
					<text class="cell-more">选择支付方式</text>
				</view>
				<radio-group @change="radioChange">
					<view class="list-cells">
						<view class="cell-img">
							<image src="../../../static/temp/share_wechat.png" mode="" class="zf"></image>
							<text class="zfs">微信支付</text>
						</view>
						<radio value="r1" class="xz" checked="true" color='#eff200'/>
					</view>
					<view class="list-cells" >
						<view class="cell-img">
							<image src="../../../static/temp/WechatIMG1.png" mode="" class="zf"></image>
							<text class="zfs">支付宝支付</text>
						</view>
						<radio value="r2" class="xz" color='#eff200'/></label>
					</view>
				</radio-group>
		</view>
		<view class="footer">
			<view class="f-t">
				<text >合计：¥100</text>
			</view>
			<view class="f-f" @click="goPay()">
				<text class="ftt">付款</text>
			</view>
		</view>
	</view>
</template>

<script>

	import { selectAddressByUserid } from '../../../api/user.js';	
	
export default {
	data() {
		return {
			value:'r1',
			skuName:0,
			addressList:[],
			option:{},
			shopInfo:{},
			arryData:[],
		};
	},
	async onLoad(option){
	  let that=this;
	
	   that.shopInfo=option
	   console.log("shopInfo",JSON.parse(that.shopInfo.arryData))
	  /**
	   * type  1 表示商品详情多来的   2表示购物车过来的
	   * */
	  if(that.shopInfo.type==1){
		 
		   
	  }else if(that.shopInfo.type==2){
			
			  
	  }
	 
	 that.arryData=JSON.parse(that.shopInfo.arryData)
	 
	 
	 let countPrice=0;
	 
	 this.arryData.forEach(item => {
	 	countPrice=countPrice+(parseInt(item.sku_price)*parseInt(item.shop_num));
	 		
	 });
	 	 that.shopInfo.countPrice=countPrice
	 
		
		Promise.all([this.address()]);
	},
	
	methods: {
		async address(){
			  let that=this;
			let d={
				'userid':uni.getStorageSync('dataInfo').id,
				'page':1,
				'rows':100,
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
	
		// radioChange(val){
		// 	console.log(val)
		// },
		goYh() {
			uni.navigateTo({
				url:'../../user/coupon/coupon'
			})
		},
		goPay() {
			uni.navigateTo({
				url: '../../money/pay'
			})
		},
		goAddress() {
				
			uni.navigateTo({
				url: '../../address/address?type=1'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #fff;
}

.container {
	min-height: 100%;
	background-color: #f6f6f6;
	padding: 21upx 30upx 42upx 30upx;
}
.address-box {
	width: 100%;
	height: 295upx;
	background-color: #fff;
	padding: 20upx;
	.box-t {
		height: 80upx;
		font-size: 30upx;
		color: #333;
		margin-top: 10upx;
		border-bottom: 2upx solid #f6f6f6;
	}
	.box-b {
		height: 184upx;
		display: flex;
		justify-content: flex-start;
		.box-l {
			width: 80upx;
			image {
				width: 32upx;
				height: 34upx;
				margin-top: 70upx;
			}
		}
		.box-r {
			display: flex;
			flex-direction: column;
			.box-rt,
			.box-rb {
				margin-top: 10upx;
				font-size: 28upx;
				color: #444;
			}
			.box-rtt {
				margin-right: 180upx;
			}
			.box-rf {
				text {
					font-size: 26upx;
					color: #ef4321;
				}
				image {
					width: 32upx;
					height: 18upx;
					margin-left: 18upx;
				}
			}
		}
	}
}
.collection {
	width: 100%;
	min-height: 260upx;
	margin-top: 20upx;
	// margin-top: 10upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	.colle-left {
		width: 218upx;
		height: 188upx;
		margin: 40upx 0upx;
	}
	.colle-right {
		width: 62%;
		
		margin: 30upx 15upx 88upx 15upx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		.crh {
			font-size: 28upx;
			color: #666;
		}
		.crb {
			font-size: 30upx;
			color: #aaa;
			margin-top: 37upx;
		}
		.crf {
			margin-top: 20upx;
			.crf-l {
				display: flex;
				justify-content: space-between;
				.c-v {
					width: 38upx;
					height: 22upx;
					font-size: 24upx;
					color: #999;
				}
				.prc {
					font-size: 30upx;
					color: #ef4321;
					margin-left: 5upx;
				}
			}
			.c-x {
				width: 42upx;
				height: 37upx;
			}
		}
	}
}
.colle-rt {
	width: 100%;
	height: 76upx;
	padding: 15upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	text {
		font-size: 28upx;
		color: #ef4321;
	}
}
.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		margin-top: 20upx;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
.draw {
		width: 100%;
		height: 274upx;
		background-color: #fff;
		.list-t {
			font-size: 30upx;
			color: #333;
			width: 100%;
			height: 100upx;
			padding: 20upx 34upx;
		}
		.list-cells {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 34upx;
			.xz {
				width: 30upx;
				height: 30upx;
				background-image: url('../../../static/icon-007.png');
			}
			.cell-img {
				height: 80upx;
				display: flex;
				align-items: center;
				.zfs {
					font-size: 30upx;
					color: #333333;
					display: block;
					line-height: 45upx;
				}
				.zf {
					width: 45upx;
					height: 45upx;
					margin-right: 17upx;
					
				}
			}
		}
	}
	.footer {
		width: 60%;
		height: 100upx;
		
		background-color: #fff;
		bottom: 0;
		position: fixed;
		right: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		
		.f-f {
			width: 215upx;
			height: 100upx;
			background-color: #ffe200;
			font-size: 32upx;
			color: #333;
			.ftt {
				display: block;
				height: 100upx;
				padding: 30upx 70upx;
			}
		}
		.f-t {
			font-size: 26upx;
			color: #ef4321;
			margin-right: 75upx;
		}
		
	}
	
</style>
