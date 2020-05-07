<template>
	<view class="content">
		<view class="row b-b">
			<!-- <text class="tit">收货人</text> -->
			<input class="input" type="text" v-model="addressData.name"/>
		</view>
		<view class="row b-b">
			<!-- <text class="tit">手机号</text> -->
			<input class="input" type="number" v-model="addressData.mobile"/>
		</view>
		<view class="row b-b zdy">
			<pickerAddress @change="change" class="input">{{addressData.addressName}}</pickerAddress>
		</view>
		<view class="row b-b"> 
			<!-- <text class="tit">详细地址</text> -->
			<input class="input" type="text" v-model="addressData.area"/>
		</view>
		
		<view class="row default-row">
			<text class="tit">默认地址</text>
			<switch :checked="addressData.defaule" color="#00ff33" @change="switchChange" />
		</view>
		<view class="row default-row">
			<text class="del" type="primary" @click="togglePopup('center', 'tip')">删除收货地址</text>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref="showtip" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">警告</text>
				<text class="uni-tip-content">这是一个通过自定义 popup，自由扩展的 警告弹窗。点击遮罩不会关闭弹窗。</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="cancel('tip')">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	export default {
		data() {
			return {
				type: '',
				addressData: {},
			}
		},
		onLoad(option){
			this.addressData = JSON.parse(option.data)
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail;
			},
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
		}
	}
</script>

<style lang="scss" scoped>
page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 100upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			margin-left: 20upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.zdy {
		display: flex;
		justify-content: space-between;
	}
	.del {
		color: #ef4321 !important;
		width: 100%;
		background-color: #FFFFFF;
		text-align: left;
		font-size: 30upx;
	}
	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			/* padding: 15px;
	*/
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
</style>
