<template>
	<view class="container">
		<view class="box"></view>
		<view class="btns">
			<button class="b-t" @click="goInto(1)">企业入口</button>
			<button class="b-f" @click="goInto(2)">个人入口</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		
		};
	},
	methods: {
		goInto(loadingType) {
			uni.navigateTo({
				url: './loginTypes/loginTypes?loadingType='+loadingType
			});
		}
	},


};
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #ffffff;
}
.container {
	min-height: 100%;
	background-color: #ffffff;
	.box {
		width: 270upx;
		height: 270upx;
		border-radius: 10upx;
		background-color: #aaa;
		margin: 100upx auto;
	}
	.btns {
		width: 100%;
		padding: 0 100upx;
		.b-t {
			background-color: #ffe200;
			border-radius: 46upx;
			height: 92upx;
			text-align: center;
		}
		.b-f {
			background-color: #fff;
			border-radius: 46upx;
			height: 92upx;
			border: 2upx solid #ffe200;
			margin-top: 40upx;
			color: #ffe200;
		}
	}
}
</style>
