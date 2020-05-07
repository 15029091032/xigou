<template>
	<view class="container">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#ffe200"></uni-segmented-control>
		        <view class="content">
		            <view v-show="current === 0">
		                <view v-for="(item,index) in spList" :key="index" class="cat" @click="check(item)">{{item.name}}</view>
		            </view>
		            <view v-show="current === 1">
		                <view v-for="(item,index) in tsList" :key="index" class="cat" @click="check(item)">{{item.name1}}</view>
		            </view>
		            <view v-show="current === 2">
		                <view v-for="(item,index) in sxList" :key="index" class="cat" @click="check(item)">{{item.name2}}</view>
		            </view>
		        </view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	data() {
		return {
			items: ['商品分类', '热门品牌', '选择'],
			spList : [
				{ index: 1, name:'手机数码'},
				{ index: 2, name:'图书报刊'},
				{ index: 3, name:'生鲜水果'}
			],
			tsList : [
				{ index: 1, name1:'苹果'},
				{ index: 2, name1:'三星'},
				{ index: 3, name1:'华为'}
			],
			sxList : [
				{ index: 1, name2:'樱桃'},
				{ index: 2, name2:'草莓'},
				{ index: 3, name2:'荔枝'}
			],
			current: 0
		};
	},
	components: { uniSegmentedControl },
	methods: {
		onClickItem(index) {
			if (this.current !== index.currentIndex) {
				this.current = index.currentIndex;
			}
		},
		check(item) {
			var pages = getCurrentPages();
			var prepage = pages[pages.length - 2];
			//  if(this.current ==0) {
			// 	prepage.$vm.name = item.name;
			// 	this.current= 1;
			// 	prepage.$vm.name1 = item.name1;
			// 	this.current = 2;
			// 	prepage.$vm.name2 = item.name2;
			// }
			
		   uni.navigateBack({
					
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	min-height: 100%;
	background-color: #f6f6f6;
}
.container {
	min-height: 100%;
	background-color: #f6f6f6;
	.content {
		margin-top: 20upx;
		background-color: #fff;
		font-size: 28upx;
		color: #666;
		.cat {
			height: 80upx;
			line-height: 80upx;
			padding-left: 22upx;
		}
	}
}
</style>
