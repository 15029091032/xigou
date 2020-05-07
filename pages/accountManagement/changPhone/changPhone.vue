<template>
	<view class="container">
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-more yticon iconfont icon-shouji iconS"></text>
			<text class="cell-tit">请输入手机号</text>
			<text class="cell-more yticon iconfont icon-icon--"></text>
		</view>
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-more yticon iconfont icon-youxiang_huaban iconS"></text>
			<text class="cell-tit">2245</text>
			 <button class="mini-btn yticon btn" type="primary" size="mini">获取验证码</button>
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
		width: 156upx;
		height: 54upx;
		font-size: 10upx;
		color: #333333;
		background-color: #FFE200;
	}
</style>
