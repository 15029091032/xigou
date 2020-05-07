<template>
	<view class="container">
		<view class="header">
			<image  mode="scaleToFill" class="img" src="../../../static/001.png"></image>
			<view class="name">
				<text class="n-h">商品名称</text>
				<text class="n-b">￥10</text>
			</view>
		</view>
		<view class="assess uni-textarea">
			<textarea placeholder-style="color:#999" placeholder="宝贝满足您的期待吗？说说他的优点和不足的地方吧~~" class="areas"/>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			 <button type="primary" class="cell-tits">提交反馈</button>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		min-height: 100%;
		background-color: #f6f6f6;
	}
	.container{
		min-height: 100%;
		margin-top: 10upx;
		background-color: #fff;
		.header {
			width: 100%;
			height: 235upx;
			display: flex;
			justify-content: flex-start;
			.img {
				width: 184upx;
				height: 184upx;
				margin: 29upx 33upx 22upx 22upx;
				border: 2upx dashed #000000;
			}
			.name {
				display: flex;
				flex-direction: column;
				margin: 62upx 146upx 144upx 0;
				.n-h {
					font-size: 30upx;
					color: #444;
					margin-bottom: 64upx;
				}
				.n-b {
					font-size: 24upx;
					color: #ef4321;
				}
			}	
		}
		.assess {
			width: 100%;
			height: 209upx;
			padding: 22upx 25upx 0 22upx;
		}
	}
	
	.areas {
		color: #999;
		width: 100%;
		height: 380upx;
		text-indent:40upx;
	}
	.cell-tits {
		width: 92%;
		background-color: #ffe200;
		color: #333;
		font-size: 30upx;
	}
</style>
