<template>
	<view class="container">
		<view class="c-title">{{detail.title}}</view>
		<view class="c-time">{{detail.ctime}}</view>
		<!-- <image :src="detail.imgUrl" class="c-img"></image> -->
		<rich-text :nodes="detail.content" class="c-content"></rich-text>
	</view>
</template>

<script>
	import { getNewsDetail } from '../../api/home.js';
	export default {
		data() {
			return {
				detail: {},
			}
		},
		onLoad() {
			this.gNewsDetai('1');
		},
		methods: {
			async gNewsDetai(id) {
				const data = await getNewsDetail({
					id: id, //文章id
				});
				 this.detail = data.data
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
		min-height: 100%;
		background-color: #fff;
	}
	.container{
		min-height: 100%;
		background-color: #fff;
		padding: 32upx 37upx 20upx 26upx;
		.c-title {
			font-size: 32upx;
			color: #333;
		}
		.c-time {
			font-size: 22upx;
			color: #999;
			margin-top: 28upx;
		}
		.c-img {
			width: 100%;
			height: 350upx;
			margin: 40upx 0;
		}
		.c-content {
			font-size: 28upx;
			color: #444;
		}
	}
</style>
