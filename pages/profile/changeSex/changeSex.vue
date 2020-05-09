<template>
	<view class="container">
		
		
		<view class="list-cell b-b m-t"  @click="checkSex('男')"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">男</text>
			<image v-if="sex=='男'" src="../../../static/icon-007.png" mode=""></image>
			<image v-else src="../../../static/icon-006.png"></image>
		</view>
		<view class="list-cell b-b" @click="checkSex('女')"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">女</text>
			<image v-if="sex=='女'" src="../../../static/icon-007.png" mode=""></image>
			<image v-else src="../../../static/icon-006.png"></image>
		</view>
		<view class="list-cell b-b"  @click="checkSex('保密')"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">保密</text>
			<image v-if="sex=='保密'" src="../../../static/icon-007.png" mode=""></image>
			<image v-else src="../../../static/icon-006.png"></image>
		</view>
	</view>
</template>

<script>
	import { updateSex } from '../../../api/user.js';
	export default {
		data() {
			return {
					sex:'',
			}
		},
		onLoad(option){
			this.sex=option.sex;
		},
		onNavigationBarButtonTap:async  function(e) {
			let that=this;
		
			
					
					let d={
						'userid':uni.getStorageSync('dataInfo').id,
						'sex':this.sex,
					
					}
					let data = await updateSex(d);
					
					 
					if (data.status == 200) {
						
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
						that.$api.prePage().getUserInfo();
						setTimeout(()=>{
							uni.navigateBack()
						}, 800)
					} else {
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
					}
		},
		methods: {
			checkSex(sex){
				this.sex=sex;
				
			}
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
