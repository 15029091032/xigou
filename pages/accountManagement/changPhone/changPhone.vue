<template>
	<view class="container">
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-more yticon iconfont icon-shouji iconS"></text>
			
			<input class="cell-tit" type="number" v-model="phone" placeholder="请输入手机号" />
			<text class="cell-more yticon iconfont icon-icon--"></text>
		</view>
		<view class="list-cell b-b m-t"   hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-more yticon iconfont icon-youxiang_huaban iconS"></text>
			<input class="cell-tit" type="number"  v-model="code" placeholder="请输入验证码" />
			 <button class="mini-btn yticon btn" type="primary" size="mini" @click="sendCode" >{{butCode}}</button>
		</view>
	</view>
</template>

<script>
	import { timeCode_b } from '../../../public/base.js';
	import { updatePhone } from '../../../api/user.js';
	import { sendSms,  } from '../../../api/index.js';
	export default {
		data() {
			return {
				phone:'',
				butCode:'获取验证码',
				code:''
			}
		},
		onNavigationBarButtonTap:async  function(e) {
			let that=this;
		
			
					
					let d={
						'userid':uni.getStorageSync('dataInfo').id,
						'userphone':this.phone,
						'smsCode':this.code,
					
					}
					let data = await updatePhone(d);
					
					 
					if (data.status == 200) {
						
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
						that.$api.prePage().getUserInfo();
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
		methods: {
			async sendCode(){
				let that=this;
				
				if(this.butCode!='获取验证码')	return
				
				if(that.phone.length!=11){
					return uni.showToast({
						title: "请输入正确的手机号码",
						icon: 'none'
					});
				}
				//this.phone
				timeCode_b(that)
				
				let data = await sendSms({
					loginName: phone
				});
				
				if (data.status == 200) {
					 timeCode_b(this)
					uni.showToast({
						title: "发送成功",
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
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
		// &.m-t{
		// 	margin-top: 16upx; 
		// }
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: #999999;
			margin-right:10upx;
		}
	}
	.cell-tits {
				font-size: 28upx;
				color: #aaaaaa;
			}
	.iconS {
		margin-right: 4.4%;
	}
	.btn {
		
		height: 54upx;
		font-size: 10upx;
		color: #333333;
		background-color: #FFE200;
	}
</style>
