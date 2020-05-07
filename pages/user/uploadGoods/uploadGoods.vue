<template>
	<view class="container">
			<uni-list class="sort" >
			    <uni-list-item title="所属分类" :note="this.name+this.name1+this.name2" @click="goCatetory()"></uni-list-item>
			</uni-list>
			<uni-list class="sort">
			    <uni-list-item title="商品标题:" note="请输入宝贝名称" :show-arrow="false"></uni-list-item>
			</uni-list>
			<view class="upph">
				<text class="upph-t">商品主图(最多上传5张)</text>
				<sunui-upimg @change="getImageInfo4" :upload_auto="true" ref="upimg4" :upimg_preview="serviceArr"></sunui-upimg>
			</view>
			<view class="norms">
				<view class="nleft">
					<view class="guige">
						<text class="g-t">商品规格</text>
						<input class="uni-input g-f" focus placeholder="请输入商品规格" />
					</view>
					<view class="guige">
						<text class="g-t">价格：</text>
						<input class="uni-input g-f" type="number"  placeholder="请输入价格" />
					</view>
				</view>
				<image src="../../../static/slices/xinzeng.png" class="xj" @click="addNorms()"></image>
			</view>
			<view class="norms" v-show="add_tr">
				<view class="nleft">
					<view class="guige">
						<text class="g-t">商品规格</text>
						<input class="uni-input g-f" focus placeholder="请输入商品规格" />
					</view>
					<view class="guige">
						<text class="g-t">价格：</text>
						<input class="uni-input g-f" type="number"  placeholder="请输入价格" />
					</view>
				</view>
				<image src="../../../static/slices/xinzeng.png" class="xj" @click="addNorms()"></image>
			</view>
			<view class="norms price">
				<view class="nleft">
					<view class="guige">
						<text class="g-t">vip价格</text>
						<input class="uni-input g-f" type="number" placeholder="请输入价格" />
					</view>
					<view class="guige">
						<text class="g-t">市场指导价格</text>
						<input class="uni-input g-f" type="number"  placeholder="请输入价格" />
					</view>
				</view>
			</view>
			<view class="num">
				<text class="num-t">成交量</text>
				<input class="uni-input num-f"  placeholder="请输入成交量" />
			</view>
			<view class="gnews">
				<text class="gnews-t">商品详情页</text>
				<image src="../../../static/001.png" class="gnews-f"></image>
			</view>
			<uni-list class="sort buts" >
			    <uni-list-item  :show-switch="true" title="爆品推荐" @switchChange="switchChange" />
			</uni-list>
			<view class="handle">
				<view class="drafft">
					<image src="../../../static/slices/cgx.png"></image>
					<text class="tit">草稿箱</text>
				</view>
				<view class="issue">
					<image src="../../../static/slices/fb.png"></image>
					<text class="tit">发布</text>
				</view>
			</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
	export default {
		data() {
			return {
				serviceArr:[],
				name: '1',
				name1: '2',
				name2: '3',
				add_tr : false
			}
		},
		components: {uniList,uniListItem},
		onLoad() {
			// 数据更新不及时时可以在下次DOM更新时使用
			this.$nextTick(function(){
				this.getInfo();
			})
			// this.getInfo();
		},
		methods: {
			goCatetory() {
				uni.navigateTo({
					url: './goodsCategory/goodsCategory'
				})
			},
			addNorms() {
				this.add_tr = true
			},
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none',
					color:'#4CD964'
				})
			},
			
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
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}
/deep/uni-switch .uni-switch-input.uni-switch-input-checked {
	background-color: #4CD964 !important;
	border-color: #4CD964 !important;
}
.container {
	min-height: 100%;
	background-color: #f6f6f6;
	.sort {
		width: 100%;
		height: 120upx;
		margin-top: 10upx;
		background-color: #fff;
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
.norms {
	width: 100%;
	min-height: 120upx;
	padding: 0 30upx;
	margin-top: 10upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	.xj {
		width: 42upx;
		height: 42upx;
		margin-top: 40upx;
	}
	.nleft {
		width: 90%;
		display: flex;
		justify-content: space-between;
		.guige {
			
			.g-t {
				font-size: 24upx;
				color: #666;
			}
			.g-f {
				font-size: 28upx;
				color: #999;
			}
		}
	}
}
.num {
	width: 100%;
	height: 120upx;
	padding: 0 30upx;
	margin-top: 10upx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.num-t {
		font-size: 24upx;
		 color: #666;
	}
	.num-f {
		font-size: 28upx;
		color: #999;
	}
}
.gnews {
	width: 100%;
	min-height: 260upx;
	background-color: #fff;
	padding: 0 30upx;
	margin-top: 10upx;
	display: flex;
	flex-direction: column;
	.gnews-t {
		font-size: 24upx;
		 color: #666;
		 margin-bottom: 20upx;
	}
	.gnews-f {
		width: 176upx;
		height: 176upx;
	}
}
.handle {
	position: fixed;
	background-color: #fff;
	left: 0;
	bottom: 0;
	display: flex;
	width: 100%;
	height: 80upx;
	justify-content: space-around;
	.drafft,
	.issue {
		// vertical-align: middle;
		image {
			width: 38upx;
			height: 36upx;
		    margin-top: 10upx;
			margin-right: 20upx;
			vertical-align:text-top;
		}
		/deep/.tit {
			font-size: 24upx;
			color: #666;
			
		}
	}
}
.buts {
	margin-bottom: 80upx;
}
</style>
