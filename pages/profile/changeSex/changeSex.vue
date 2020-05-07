<template>
	<view class="container">
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">男</text>
			<image src="../../../static/icon-007.png" ></image>
		</view>
		<view class="list-cell b-b"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">女</text>
			<image src="../../../static/icon-006.png" ></image>
		</view>
		<view class="list-cell b-b"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">保密</text>
			<image src="../../../static/icon-006.png" ></image>
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
			color: #999999;
			margin-right:10upx;
		}
	}
	image {
		width: 28upx;
		height: 28upx;
	}
</style>
