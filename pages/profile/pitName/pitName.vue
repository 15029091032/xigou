<template>
	<view class="container">
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			
			<input class="cell-tit" v-model="nickname"  placeholder="请输入您要修改的昵称" />
			<text class="cell-more yticon iconfont icon-icon--"></text>
		</view>
	</view>
</template>

<script>
import { updateNickname } from '../../../api/user.js';
	export default {
		data() {
			return {
				nickname:'',
			}
		},
		onLoad(option){
			this.nickname=option.nickname;
		},
		onNavigationBarButtonTap:async  function(e) {
			let that=this;
		
			
					
					let d={
						'userid':uni.getStorageSync('dataInfo').id,
						'nickname':this.nickname,
					
					}
					let data = await updateNickname(d);
					
					 
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
</style>
