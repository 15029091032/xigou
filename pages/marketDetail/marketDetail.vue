<template>
	<view class="container">
		<image src="../../static/xys.png" class="c-img"></image>
		<view class="c-body">
			<view class="c-title">
				<view class="ctl">
					<text class="c-name">{{market.name}}</text>
					<image :src="market.sex=='女'?'../../static/nv.png':'../../static/nan.png'" class="sex"></image>
				</view>
				<image class="ctr" src="../../static/erweima.png" @click="togglePopup('center', 'image')"></image>
			</view>
			<text class="userAge">{{market.age}}岁</text>
			<view class="c-footer">
				<text class="job">工作职称：{{market.job}}</text>
				<text class="jobYear">工作年限：{{market.jobYear}}</text>
				<text class="label">个性签名：{{market.label}}</text>
			</view>
			<image class="back" src="../../static/home/WechatIMG5.png" @click="goBack()"></image>
		</view>
		<!-- 插屏弹窗 -->
		<uni-popup ref="showimage" :type="type" :mask-click="true" @change="change">
			<view class="uni-image">
				<image class="image" src="../../static/uni.png" mode="scaleToFill" />
				<view class="uni-image-close" @click="cancel('image')">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { getMarketDetail } from '../../api/home.js';
	export default {
		data() {
			return {
				type: '',
				market: {},
			}
		},
		onLoad() {
			this.gMarketDetai('1');
		},
		methods: {
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
			
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			async gMarketDetai(id) {
				const data = await getMarketDetail({
					id: id, //营销师id
				});
				 this.market = data.data
				 console.log(this.market)
			},
			goBack() {
				uni.navigateBack({
					
				})
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
		background-color: #f6f6f6;
		.c-img {
			width: 100%;
			height: 910upx;
			position: fixed;
			top: 0;
			z-index: 998;
		}
		.c-body {
			width: 100%;
			height: 423upx;
			position: fixed;
			bottom: 62upx;
			background-color: #fff;
			border-radius: 50upx 50upx 0 0;
			z-index: 1000;
			padding: 50upx 42upx 10upx 42upx;
			.c-title {
				display: flex;
				justify-content: space-between;
				.ctr {
					width: 44upx;
					height: 44upx;
				}
				.ctl {
					.sex {
						width: 38upx;
						height: 38upx;
					}
					.c-name {
						font-size: 36upx;
						color: #333;
						margin-right: 10upx;
					}
				}
			}
			.userAge {
				font-size: 30upx;
				color: #666;
				margin: 10upx 0;
			}
			.c-footer {
				display: flex;
				flex-direction: column;
				font-size: 30upx;
				color: #333;
				line-height: 60upx;
			}
		}
	}
	.back {
		width: 50upx;
		height: 50upx;
		opacity: 0.5;
		border-radius: 50%;
		position: fixed;
		top: 60upx;
		left: 40upx;
		color: #fff;
		z-index: 1001;
	}
	/* 插屏广告 */
		.uni-image {
			position: fixed;
			z-index: 1002;
			right: 22.5%;
			bottom: 70%;
		}
	
		.image {
			width: 400upx;
			height: 400upx;
		}
	
		.uni-image-close {
			margin-top: -500upx;
			text-align: right;
		}
.uni-popup {
	z-index: 1002;
	
}		
		
</style>
