<template>  
    <view class="container status_bar-1">  
		<view class="header">
			<view class="tool">
				<view class="item">
					<image style="height: 34upx;" src="/static/msg.png" mode="" @click="goNews()"></image>
				</view>
				<view class="item"  @click="handleSetUp">
					<image src="/static/icon-002.png" mode="" ></image>
				</view>
				<!-- <uni-nav-bar  right-text="菜单" ></uni-nav-bar> -->
			</view>
			<view class="user-info">
				<view class="left">
					<view class="name">{{userDetail.nickname}}</view>
					<view class="link" @click="linkEnte" >{{userDetail.type==1?'企业入驻':'已入驻'}} <text class="yticon icon-you"></text></view>
				</view>
				<image class="avatar" :src="userDetail.headImg" mode=""></image>
			</view>
			<view class="num-wrapper" >
				<view class="left">
					<view class="num">{{userDetail.umoney}}</view>
					<view class="txt">账户余额</view>
				</view>
				<view class="right">
					<view class="link" @click="goselectDet(userDetail.umoney)">查看详情<text class="yticon icon-you"></text></view>
					<view class="btn" @click="goWithDraw(userDetail.umoney)">
						<image src="/static/icon-003.png" mode=""></image>
						<text>提现</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="order-wrapper">
			<view class="order-title">
				<text>我的订单</text>
				<text class="link" @click="oderView()">更多<text class="yticon icon-you"></text></text>
			</view>
			<view class="order-box">
				<view class="order-item" @click="oderView()">
					<image src="../../static/slices/1.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="oderView()">
					<image src="../../static/slices/2.png" mode=""></image>
					<text>待发货</text>
				</view>
				<view class="order-item" @click="oderView()">
					<image src="../../static/slices/4.png" mode=""></image>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="oderView()">
					<image src="../../static/slices/3.png" mode=""></image>
					<text>待评价</text>
				</view>
			</view>
		</view>
		<!-- plus -->
		<view class="plus-wrapper" @click="plus()"  v-if="userDetail.type==1">
			<view class="plus-title">
				<view class="title">成为PLUS会员</view>
				<view class="more">
					立即续费
					<text class="yticon icon-you"></text>
				</view>
			</view>
			<view class="plus-box">
				<view class="box-item">
					<view class="num-box">
						<text>¥</text>
						<view class="num">1980/<text>年</text></view>
					</view>
					<view class="txt">立即购买</view>
				</view>
				<view class="box-item">
					<view class="num-box">
						<text>¥</text>
						<view class="num">1980/<text>年</text></view>
					</view>
					<view class="txt">立即购买</view>
					<image class="hots" src="../../static/icon-005.png"></image>
				</view>
			</view>
		</view>
		<!-- 基础服务 -->
		<view class="service">
			<view class="se-title">基础服务</view>
			<view class="se-box">
				<view class="item" @click="goAddress()">
					<image src="../../static/slices/5.png" mode=""></image>
					<view class="txt">收货地址</view>
				</view>
				<view class="item">
					<image src="../../static/slices/9.png" mode=""></image>
					<view class="txt">平台服务</view>
				</view>
				<view class="item" @click="goCoupon()">
					<image src="../../static/slices/13.png" mode=""></image>
					<view class="txt">优惠卷</view>
				</view>
				<view class="item" @click="goMyCollection()">
					<image src="../../static/slices/10.png" mode=""></image>
					<view class="txt">我的收藏</view>
				</view>
			</view>
		</view>
		<!-- 企业服务 -->
		<view class="service company">
			<view class="se-title">企业服务</view>
			<view class="se-box">
				<block v-for="(item,index) in companyList" :key="index">
					<view class="item" @click="goCompanyDetail(item)">
						<image :src="item.img" mode=""></image>
						<view class="txt">{{item.title}}</view>
					</view>
				</block>
			</view>
		</view>
		<view style="height: 20upx;"></view>
	</view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { selectAppUserByUserid } from '../../api/user.js';
	import { mapState } from 'vuex'; 
    export default {
		components: {
			listCell,uniNavBar
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userDetail:{},
				companyList:[
					{
						img:require('../../static/slices/12.png'),
						title:'商品自荐',
						url: '/pages/user/recommend/recommend'
					},
					{
						img:require('../../static/slices/7.png'),
						title:'邀请码',
						url: '/pages/user/Invite/Invite'
					},
					{
						img:require('../../static/slices/11.png'),
						title:'我的团队',
						url:'/pages/user/myTeam'
					},
					{
						img:require('../../static/slices/8.png'),
						title:'商品管理',
						url: '/pages/user/goodsManage/goodsManage'
					},
					{
						img:require('../../static/slices/6.png'),
						title:'我卖出的',
						url: '/pages/user/mySell/mySell'
					},
					{
						img:require('../../static/slices/2.png'),
						title:'店铺设置',
						url: '/pages/user/shopSet/shopSet'
					}
				]
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad(){
			if(!this.hasLogin){
				
				uni.navigateTo({
				    url: '../login/login'
				});
			}else{
				this.getUserInfo() 
			}
			//console.log(this.hasLogin)
			// if(!this.hasLogin){
			//  return	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	});
			// }
		
		},
		onShow(){	
			// if(!uni.getStorageSync("dataInfo")){
			// 	console.log(1)
			// 	uni.navigateTo({
			// 	    url: '../login/login'
			// 	});
			// }
			
			// 	this.getUserInfo() 
			// console.log(this.hasLogin)
			// if(!this.hasLogin){
			//  return	uni.navigateTo({
			// 		url: '/pages/login/login?type="我的"'
			// 	});
			// }
		},
		onNavigationBarButtonTap(e) {
		    console.log("success")        
		}, 
		// #ifndef MP
		// onNavigationBarButtonTap(e) {
		// 	console.log(e)
		// 	const index = e.index;
		// 	if (index === 0) {
		// 		this.navTo('/pages/set/set');
		// 	}else if(index === 1){
		// 		// #ifdef APP-PLUS
		// 		const pages = getCurrentPages();
		// 		const page = pages[pages.length - 1];
		// 		const currentWebview = page.$getAppWebview();
		// 		currentWebview.hideTitleNViewButtonRedDot({
		// 			index
		// 		});
		// 		// #endif
		// 		uni.navigateTo({
		// 			url: '/pages/notice/notice'
		// 		})
		// 	}
		// },
		// // #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
		
        methods: {
			async getUserInfo(){
				let that=this;
				 
				let data= await selectAppUserByUserid({userid:uni.getStorageSync('dataInfo').id})
				
				console.log("userInfo",data)
				if (data.status == 200) {
					that.userDetail=data.data;
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
				
				
			},
			linkEnte(){
				
				//跳转企业入驻
				uni.navigateTo({
					url:'enterprisesInto/qiYeRuZhu',
				})
				
			},
			 goselectDet(money){
			
				uni.navigateTo({
					url:`drawDetail/drawDetail?money=${money}`,
				})
			},
			handleSetUp(){
				uni.navigateTo({
					url:'../set/set'
				})
			},
			goNews() {
				uni.navigateTo({
					url:'./myNotice/myNotice'
				})
			},
			plus() {
				uni.navigateTo({
					url: 'plus/plus'
				})
			},
			// 企业服务路由
			goCompanyDetail(item){
				if(uni.getStorageSync('loadingType')==2){
					return  uni.showModal({
									content: '请您登陆企业账号',
									showCancel:true,
									cancelText:"再想想",
									cancelColor:"#FF0000",
									confirmText:"确定",
									confirmColor:"#4399FC",
									success: function (res) {
										if (res.confirm) {
											uni.reLaunch({
											    url: '../login/login'
											});
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
				}
				uni.navigateTo({
					url:item.url
				})
			},
			oderView() {
				uni.navigateTo({
					url:'../order/order'
				})
			},
			goWithDraw(money) {
				uni.navigateTo({
					url: `./withdraw/withdraw?money=${money}`,
				})
			},
			goCoupon() {
				uni.navigateTo({
					url:'./coupon/coupon'
				})
			},
			goAddress() {
				uni.navigateTo({
					url:'../address/address?type=2'
				})
			},
			goMyCollection() {
				uni.navigateTo({
					url:'myCollection/myCollection'
				})
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	page{
		min-height: 100%;
		background-color: #fff;
	}
	.container{
		min-height: 100%;
		background-color: #f6f6f6;
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	.header{
		padding: 0 20upx 40upx;
		background-color: #fff;
		.tool{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-top: 30upx;
			.item{
				margin-left: 30upx;
			}
			image{
				width: 36upx;
				height: 40upx;
			}
		}
		.user-info{
			display: flex;
			justify-content: space-between;
			margin-top: 30upx;
			.left{
				.name{
					font-size: 34upx;
					color: #222;
				}
				.link{
					    width: fit-content;
					display: flex;
					align-items: center;
					
					margin-top: 10upx;
					font-size: 22upx;
					background:rgba(255,226,0,1);
					border-radius:0px 20upx 20upx 0px;
					padding: 12upx 20upx;
					.icon-you{
						margin-top: 5upx;
						font-size: 20upx;
						
					}
				}
			}
			.avatar{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
			}
		}
		.num-wrapper{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 28upx;
			padding: 0 40upx;
			color: #fff;
			height:160upx;
			background:linear-gradient(31deg,rgba(255,161,109,1) 0%,rgba(255,213,47,1) 99%);
			box-shadow:0px 12upx 7upx 0px rgba(255,190,16,0.18);
			border-radius:16upx;
			.num{
				font-size: 50upx;
			}
			.txt{
				font-size: 22upx;
			}
			.link{
				display: flex;
				align-items: center;
				font-size: 30upx;
				.icon-you{
					font-size: 22upx;
				}
			}
			.btn{
				display: flex;
				align-items: center;
				margin-top: 10upx;
				font-size: 28upx;
				image{
					width: 38upx;
					height: 29upx;
					margin-right: 10upx;
				}
			}
		}
	}
	.order-wrapper{
		padding: 30upx;
		margin-top: 18upx;
		background-color: #fff;
		.order-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32upx;
			.link{
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #999999;
				.yticon{
					font-size: 20upx;
				}
			}
		}
		.order-box{
			display: flex;
			.order-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 25%;
				margin-top: 40upx;
				image{
					width: 40upx;
					height: 35upx;
				}
				text{
					margin-top: 16upx;
					font-size: 28upx;
					color: #515151;
				}
			}
		}
	}
	.plus-wrapper{
		margin-top: 20upx;
		padding: 30upx;
		background-color: #fff;
		.plus-title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32upx;
			.title{
				font-size: 32upx;
				color: #333;
			}
			.more{
				display: flex;
				align-items: center;
				color: #999999;
				font-size: 24upx;
			}
		}
		.plus-box{
			display: flex;
			justify-content: space-between;
			margin-top: 30upx;
			.box-item{
				position: relative;
				display: flex;
				justify-content: space-between;
				width: 317upx;
				height: 150upx;
				padding: 20upx 0 20upx 30upx;
				background-image: url(../../static/icon-004.png);
				background-size: 100% 100%;
				box-sizing: border-box;
				.num-box{
					display: flex;
					align-items: baseline;
					padding-top: 30upx;
					text{
						margin-right: 10upx;
						font-size: 26upx;
					}
					.num{
						font-size: 50upx;
						text{
							font-size: 24upx;
						}
					}
				}
				.txt{
					display: flex;
					align-items: center;
					width: 20upx;
					margin-top: 14upx;
					padding:0 20upx;
					line-height: 1;
					font-size: 22upx;
					border-left: 1px dashed #04202B;
					box-sizing: content-box;
				}
				.hots{
					position: absolute;
					right: 0;
					top: -16upx;
					width: 84upx;
					height: 45upx;
				}
			}
		}
	}
	.service{
		padding: 25upx 32upx;
		margin-top: 20upx;
		background-color: #fff;
		.se-title{
			font-size: 32upx;
		}
		.se-box{
			display: flex;
			flex-wrap: wrap;
			padding:10upx 0upx;
			.item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			
				
				width: 25%;
				    margin-top: 40upx;
				image{
					width: 40upx;
					height: 38upx;
				}
				.txt{
					margin-top: 20upx;
					color: #555;
					font-size: 24upx;
				}
				&:nth-child(4n){
					margin-right: 0;
				}
			}
		}
		&.company .se-box{
			padding: 0;
			.item{
				
				    width: 32.3%;
				margin-top: 40upx;
				&:nth-child(3n){
					margin-right: 0;
				}
				&:nth-child(4n){
					
				}
			}
		}
		
	}
</style>