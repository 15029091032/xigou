<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="change()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">更换手机</text>
			<text class="cell-tits">18360570821</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('zhifubao')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">支付宝绑定</text>
			<text class="cell-tits">未绑定</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('weixin')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">微信绑定</text>
			<text class="cell-tits">未绑定</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		change() {
			uni.navigateTo({
				url: './changPhone/changPhone'
			});
		},
		navTo(type) {
			// console.log(e)
			uni.navigateTo({
				url: `bindAccount/bindAccount?loginType=${type}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: #444444;
		margin-right: 10upx;
	}
}
.cell-tits {
	font-size: 28upx;
	color: #aaaaaa;
}
</style>
