<template>
	<view class="container">
		<view class="fenlei" v-for="(item, index) in fenList" :key="index" @click="selete(item)">{{item.name}}</view>
	</view>
</template>

<script>
	import {selectFristTypeList,selectTypeListByPid} from '../../../../api/user.js'

	export default {
		data() {
			return {
				fenList: [
					// { index:1, cate: "分类一" },
					// { index:2, cate: "分类二" },
					// { index:3, cate: "分类三" },
					// { index:4, cate: "分类四" },
					// { index:5, cate: "分类五" },
					// { index:6, cate: "分类六" },
				],
			}
		},
		onLoad(){
			this.getType()
		},
		methods: {
		 async getType(){
				let that=this;
				let data=await selectFristTypeList({})
				if(data.status==200){
					 that.fenList=data.data
					console.log(that.fenList)
				}else{
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
			},
			selete(item) {
				
			
				console.log(item.id)
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2];
				prepage.$vm.value = {value:item.name,id:item.id};
				console.log(item.name)
				uni.navigateBack({})
			},
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
	.fenlei {
		padding: 36upx 32upx;
		height: 100upx;
		background-color: #fff;
		font-size: 30upx;
		color: #333;
	}
}
</style>
