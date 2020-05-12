<template>
	<view class="container">
		<!-- <image src="../../../static/home/yao1.png" class="bjt"></image>
		<image src="../../../static/home/yao2.png" class="peo"></image> -->
		<image :src="url" class="bjt"></image>
	<!-- 	<view class="ewm"></view>
		<view class="yqm">
			<text class="yqm-f">邀请码:12345</text>
		</view> -->
	</view>
</template>

<script>
		import { selectPoster } from '../../../api/user.js';
	
	export default {
		data() {
			return {
				url:""
			}
		},
		onLoad(){
			this.codeView();
		},
		methods: {
			async codeView(){
				let that=this;
			  let data=await selectPoster({userId:uni.getStorageSync("dataInfo").id})
			  
			  if (data.status == 200) {
			  	that.url=data.data;
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

<style lang="scss" scoped>
page{
		min-height: 100%;
		background-color: #f6f6f6;
}
.container{
	width: 100%;
	min-height: 100%;
	.bjt {
		width: 100%;
		min-height: 1246upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.yqm {
		width: 389upx;
		height: 90upx;
		background-color: #fff;
		position: fixed;
		top: 52%;
		left: 24.13%;
		border-radius: 10upx;
		text-align: center;
		padding-top: 20upx;
		.yqm-f {
			font-size: 36upx;
			color: #333;
		}
	}
	.peo {
		width: 293upx;
		height: 89upx;
		position: fixed;
		top: 12.85%;
		left: 42.4%;
	}
	.ewm {
		width: 389upx;
		height: 389upx;
		background-color: #fff;
		position: fixed;
		top: 20.15%;
		left: 24.13%;
	}
}

</style>
