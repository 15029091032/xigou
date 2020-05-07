<template>
	<view class="container">
		<text class="upload" v-if="this.setype == false" @click="preservation()">保存</text>
		<text class="upload" v-if="this.setype == true" @click="edit()">编辑</text>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="goset()">
			<text class="cell-tit">所属分类</text>
			<input :value="this.value" class="inp"/>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">店铺名称</text>
			<input class="uni-input" focus placeholder="请输入店铺名称"  style="font-size: 30upx;"/>
			<text class="cell-more yticon iconfont icon-icon--"></text>
		</view>
		<view class="upph">
			<text class="upph-t">店铺图像</text>
			<sunui-upimg @change="getImageInfo4" :upload_auto="true" ref="upimg4" :upimg_preview="serviceArr"></sunui-upimg>
		</view>
	</view>
</template>

<script>
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
	export default {
		data() {
			return {
				setype: false,
				serviceArr:[],
				value: '111',
			}
		},
		onLoad() {
			// 数据更新不及时时可以在下次DOM更新时使用
			this.$nextTick(function(){
				this.getInfo();
			})
			// this.getInfo();
		},
		methods: {
			async getInfo() {
				await uni.request({
					url: 'http://www.pbdpw.com/info.php',
					method: 'GET',
					data: {},
					success: res => {
						if (res.data.status == 'ok') {
							this.serviceArr = res.data.data;
							console.log('服务器返回值：', JSON.stringify(res.data.data))
						}
					}
				});
			},
			getImageInfo4(e) {
				console.log('图片返回4：', e)
			},
			goset() {
				uni.navigateTo({
					url: './shopCatetory/shopCatetory'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}
.container {
	min-height: 100%;
	background-color: #fff;
	margin-top: 10upx;
}
.upload {
		position: fixed;
		z-index: 9999;
		bottom: 96%;
		left: 88%;
		width: 60upx;
		height: 26upx;
		font-size: 26upx;
		color: #666;
	}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	margin-top: 10upx;
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
	.upph {
		width: 100%;
		height: 290upx;
		background-color: #fff;
		margin-top: 10upx;
		padding-top: 10upx;
		.upph-t {
			font-size: 28upx;
			color: #3b4144;
			margin-left: 30upx;
		}
	}
	.inp {
		font-size: 30upx;
		color: #333;
		margin-left: 40upx;
	}
</style>
