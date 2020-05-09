<template>
	<view class="container">
		<view class="num-wrapper">
			<view class="left">
				<view class="num">{{money}}</view>
				<view class="txt">账户余额</view>
			</view>
			<view class="right" @click="GoDrawDetail()">
				<view class="link">
					查看详情
					<text class="yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="h-d">
			
			<input class="uni-input " v-model="price" type="number" focus placeholder="请输入提现金额" />
		</view>
		<view class="draw">
			<view class="list-cell">
				<text class="cell-more">提现至</text>
			</view>
			<view class="list-cells">
				<view class="cell-img">
					<image src="../../../static/temp/share_wechat.png" mode="" class="zf"></image>
					<text class="zfs">微信支付</text>
				</view>
				<image :src="redioArry[0].src" @click="redioWay(0)" class="xz"></image>
			</view>
			<view class="list-cells">
				<view class="cell-img">
					<image src="../../../static/temp/WechatIMG1.png" mode="" class="zf"></image>
					<text class="zfs">支付宝支付</text>
				</view>
				<image :src="redioArry[1].src"  @click="redioWay(1)" class="xz"></image>
			</view>
		<view class="log-out-btn">
			 <button type="primary" class="cell-tits" @click="but()">确认提现</button>
		</view> 
	</view>
 </view>	
</template>

<script>
	import { selectAppUserByUserid } from '../../../api/user.js';
	import { detSql,empty_b } from '../../../public/base.js';
export default {
	data() {
		return {
			price:0,
			money:0,
			redioArry:[{src:'../../../static/icon-007.png',},{src:'../../../static/icon-006.png',}],
			redioStatus:1,
			userDetail:{},
		};
	},
	onLoad(option){
		this.money=option.money;
	},
	methods: {
		GoDrawDetail() {
			
			
			uni.navigateTo({
				url:`../drawDetail/drawDetail?money=${this.money}`,
			})
		},
		redioWay(count){
			let that=this;
			if(count==0){
				that.redioStatus=1;
				that.redioArry[0].src='../../../static/icon-007.png'
				
				that.redioArry[1].src='../../../static/icon-006.png'
				
			}else if(count==1){
				that.redioStatus=2;
				that.redioArry[0].src='../../../static/icon-006.png'
			
				that.redioArry[1].src='../../../static/icon-007.png'
				
			}
		
		},
	  async but(){
			
			
			let that=this;
			
			
			 
			let data= await selectAppUserByUserid({userid:uni.getStorageSync('dataInfo').id})
			
			console.log("userInfo",data)
			if (data.status == 200) {
				that.userDetail=data.data;
				if(that.redioStatus==1){
					
					if(!empty_b(that.userDetail.wechatno)||!empty_b(that.userDetail.wechatName)){
						
						uni.navigateTo({
							url: 'bindAccount/bindAccount?loginType=weixin'
							
						})
						
					}else{
						
						if(parseInt(that.price)==0){
							uni.showToast({
								title: "请输入正确的金额",
								icon: 'none'
							});
							return
						}else if(parseInt(that.price)>parseInt(that.userDetail.umoney)){
						
							uni.showToast({
								title: "金额不正确",
								icon: 'none'
							});
							return
						}
						
					}
				}else if(that.redioStatus==2){
					if(!empty_b(that.userDetail.alipayno)||!empty_b(that.userDetail.alipayName)){
						uni.navigateTo({
							url:'bindAccount/bindAccount?loginType=zhifubao'
						})
					}else{
						if(parseInt(that.price)==0){
							uni.showToast({
								title: "请输入正确的金额",
								icon: 'none'
							});
							return
						}else if(parseInt(that.price)>parseInt(that.userDetail.umoney)){
						
							uni.showToast({
								title: "金额不正确",
								icon: 'none'
							});
							return
						}
					}
					
				}
				
			} else {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
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
	padding: 0 20upx;
	background-color: #f6f6f6;
	.num-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 41upx;
		padding: 0 40upx;
		color: #fff;
		height: 160upx;
		background: linear-gradient(31deg, rgba(255, 161, 109, 1) 0%, rgba(255, 213, 47, 1) 99%);
		box-shadow: 0px 12upx 7upx 0px rgba(255, 190, 16, 0.18);
		border-radius: 16upx;
		.num {
			font-size: 50upx;
		}
		.txt {
			font-size: 22upx;
		}
		.link {
			display: flex;
			align-items: center;
			font-size: 30upx;
			.icon-you {
				font-size: 22upx;
			}
		}
	}
}
.cell-tits {
		width: 92%;
		background-color: #ffe200;
		color: #333;
		font-size: 32upx;
		margin-top: 80upx;
	}
	.h-d {
		width: 94.67%;
		height: 120upx;
		background-color: #FFFFFF;
		padding-left: 36upx;
		padding-top: 30upx;
		margin: 20upx auto;
		border-radius: 10upx;
		.num {
			font-size: 36upx;
			color: #333333;
		}
	}
	.draw {
		width: 94.67%;
		height: 274upx;
		background-color: #fff;
		margin: 0 auto;
		.list-cell {
			padding: 34upx;
			.cell-more {
				font-size: 30upx;
				color: #333333;
			}
		}
		.list-cells {
			display: flex;
			justify-content: space-between;
			padding: 0 34upx;
			.xz {
				width: 30upx;
				height: 30upx;
			}
			.cell-img {
				display: flex;
				height: 80upx;
				.zfs {
					font-size: 30upx;
					color: #333333;
					
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
</style>
