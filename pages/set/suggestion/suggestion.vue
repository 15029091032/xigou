<template>
	<view class="container">
		<view class="uni-textarea header">
			<textarea placeholder-style="color:#999" placeholder="您的反馈将帮助我们更快成长" class="areas"/>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<button type="primary" class="cell-tits">提交意见</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
}
.header {
	margin-top: 16upx;
	margin-bottom: 68upx;
	background-color: #fff;
	font-size: 28upx;
}
.areas {
	color: #999;
	width: 100%;
	height: 380upx;
	text-indent:40upx;
}
.cell-tits {
	width: 92%;
	height: 6.75%;
	background-color: #ffe200;
	color: #333;
	font-size: 32upx;
}
</style>
