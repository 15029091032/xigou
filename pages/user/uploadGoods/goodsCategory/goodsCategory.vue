<template>
	<view class="container">
	<!-- 	<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#ffe200"></uni-segmented-control> -->
		       <view class="list_leb">
				   <label   v-for="(item,index) in items" :key="index" class="leb"   @click="tabList($event,index)" >{{item.name}}</label>
			 </view>
				<view class="content">
		            <view v-show="current === 0">
		                <view v-for="(item,index) in spList" :key="index" class="cat" @click="check(item)">{{item.name}}</view>
		            </view>
		            <view v-show="current === 1">
		                <view v-for="(item,index) in tsList" :key="index" class="cat" @click="check(item)">{{item.name}}</view>
		            </view>
		            <view v-show="current === 2">
		                <view v-for="(item,index) in sxList" :key="index" class="cat" @click="check(item)">{{item.name}}</view>
		            </view>
		        </view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import {selectFristTypeList,selectTypeListByPid} from '../../../../api/user.js'
export default {
	data() {
		return {
			items: [{name:'请选择',id:-1}, {name:'请选择',id:-1}, {name:'请选择',id:-1}],
			spList : [
			],
			tsList : [
				
			],
			sxList : [
			
			],
			current: 0
		};
	},
	components: { uniSegmentedControl },
	async onLoad(){
			let that=this;
			let data =await selectFristTypeList();
			
			if(data.status==200){
				that.spList=data.data;
			}else{
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
			
			console.log(data)
	},
	methods: {
	
		onClickItem(index) {
		// console.log(index)
		// 	if (this.current !== index.currentIndex) {
		// 		this.current = index.currentIndex;
		// 	}
		},
		tabList(e,indx){
			// console.log(e.target.style)
			// console.log(indx)
			// return
			let that=this;
			console.log(indx)
			if(indx==0){
				that.current=indx;
			}else if(indx==1){
				if(that.tsList.length>0){
					that.current=indx;
				}
			}else if(indx==3){
				if(that.sxList.length>0){
					that.current=indx;
				}
			}
		},
		check(item) {
			let that=this;
			that.current+=1;
			if(that.current==1){
				
				that.TowType(item.id,item.name)
			}else if(that.current==2){
				
				for(let i=0;i<that.tsList.length;i++)
				if(that.tsList[i].id==item.id){
					if(that.tsList[i].threeList.length==0){
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
						that.current=1;
					}else{
				
						that.items[1].name=item.name;
						that.items[1].id=item.id;
						that.sxList=that.tsList[i].threeList;
						
					}
					
					
				}
				
				
				
			}else{
			
								that.items[2].name=item.name;
								that.items[2].id=item.id;	
				 
					let pages = getCurrentPages();             //获取所有页面栈实例列表
				 	let nowPage = pages[ pages.length - 1];    //当前页页面实例
					console.log("nowPage",nowPage)
				 	let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					console.log("prevPage",prevPage)
				 	prevPage.ooa =that.items ;         //修改上一页data里面的couponNumber参数值为value
				
				 	uni.navigateBack({                         //uni.navigateTo跳转的返回，默认1为返回上一级
				 	    delta: 1
				 	});
				 
			
			
		
			}
			
			
		
		},
		async TowType(pid,name){
			
			
			let that=this;
			let data =await selectTypeListByPid({"pid":pid});
			
			if(data.status==200){
				
				if(data.data.length==0){
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
					that.current=0;
				}else{
					that.items[0].name=name;
					that.items[0].id=pid;
					that.tsList=data.data;
				}
			}else{
				uni.showToast({
					title: data.msg,
					icon: 'none'
				});
			}
			
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
		
		background-color: #fff;
		font-size: 28upx;
		color: #666;
		.cat {
			height: 80upx;
			line-height: 80upx;
			padding-left: 22upx;
		}
	}
	.list_leb{
		display: flex;
		align-items: center;
		
		
		.leb{
		
			font-size: 15upx;
			padding: 30upx;
			text-align: center;
			}
	}
}
</style>
