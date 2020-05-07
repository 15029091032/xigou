<template>
	<view class="container">
		<image :src="editItem.shopImg" @error="onImageErrors('editItem')"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				editItem : {},
			}
		},
		onLoad:  function (option) { 
			this.editItem = JSON.parse((option.editItem));
			
			console.log(this.editItem)
		},
		methods: {
			// 图片加载错误处理
			onImageErrors(key) {
				this.shopImg = '../../../static/temp/cate11.jpg';
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
		padding-top: 10upx;
		background-color: #f6f6f6;
	}
</style>
