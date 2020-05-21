<template>
	<view class="content status_bar-1">
		<view class="f6-bg">
			<view class="header">
				<text v-if="loadingType == 2">{{address.area}}</text>
				<text v-if="loadingType == 1">分类</text>
				<view class="search-bar" @click="search()">
					<image src="/static/sou.png" mode=""></image>
					请输入想要的商品
				</view>
				<view class="btns">
					<image v-if="loadingType == 2" src="/static/msg.png"  mode="" @click="goNotice()"></image>
					<image v-if="loadingType == 1" @click="isStore = !isStore" src="../../static/icon-001.png" mode=""></image>
				</view>
			</view>
			<view class="con-wrapper">
				<scroll-view scroll-y class="left-aside">
					<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
						{{item.name}}
					</view>
				</scroll-view>
				<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop" v-if="isStore">
					<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
						<text class="s-item">{{item.name}}</text>
						<view class="t-list">
							<view @click="navToList(item.id, titem.id)"  class="t-item" v-for="titem in item.threeList" :key="titem.id">
								<image :src="titem.img"></image>
								<text>{{titem.name}}</text>
							</view>
						</view>
						
					</view>
				</scroll-view>
				<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop" v-else>
					<view class="store-list">
						<view v-for="item in slist" :key="item.id" class="store-item" :id="'main-'+item.id">
							<image src="../../static/123.png" mode="" ></image>
							<view class="name">店铺名称</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getaddress,empty_b} from '../../public/base.js'
	import { getFristTypeList , getSristTypeList} from '../../api/home.js';
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: [],
				Arrlist: [],
				isStore:true,
				loadingType: 2, //1是企业  2是个人
				address:{
					province: "获取中",
					city: "获取中",
					area: "获取中"
				}
			}
		},
		onLoad(e){
		  let that=this;
			
			
			try{
				that.loadingType= uni.getStorageSync('loadingType');
				
				if(!empty_b(that.loadingType)){
					
					that.loadingType = 2;
				}
			}catch(e){
				
				that.loadingType = 2;
			}
			if(that.loadingType==2){
				try{
					
					let obj=uni.getStorageSync('address')
					
					if(!empty_b(obj)){
						that.getadd()
					}else{
						that.address=obj;
					}
				}catch(e){
					that.getadd()
				}
			}
		// 	// this.loadData();
		// 	console.log('---====',e)
		
		},
		onHide() {
			try {
			    uni.removeStorageSync('tabId');	
				
			} catch (e) {
			    // error
			}
		},
		onShow() {
			this.gFristTypeList()
			try {
			    const value = uni.getStorageSync('tabId');
			    if (value) {
					this.currentId=value;
			        console.log(value,'======');
					this.gSristTypeList(value)
			    }
			} catch (e) {
			    // error
			}
			// this.gSristTypeList("1")
			// this.gSristTypeList(value)
		},
		 // onLoad(option){
		 //    const goodItem = JSON.parse(option.goodItem);
			// console.log(goodItem)
		 //  },
		methods: {
			goNotice() {
				uni.navigateTo({
					url: '../user/myNotice/myNotice'
				});
			},
			getadd(){
				let that=this;
				getaddress(function(data){
					
				let obj = {
					province: data.address.province,
					city: data.address.city,
					area: data.address.district
				};
				uni.setStorageSync('address', obj);
				that.address=obj;
					
				},function(err){
					// console.log("地址",err)
						// that.getadd()
				})
				
			},
			async gFristTypeList() {
				let that=this;
				const data = await getFristTypeList({
				});
				// console.log(data)
				this.flist = data.data
				if(that.flist.length>0&&!uni.getStorageSync('tabId')){
					that.currentId=that.flist[0].id;
					that.gSristTypeList(that.flist[0].id)
				}
				// this.currentId = item.id;
			},
			async gSristTypeList(pid) { // 一级分类id查询二、三级的分类
				const data = await getSristTypeList({
					pid: pid,
				});
				this.slist = data.data
				//  for(let i of this.slist){
				// 	this.Arrlist = i.threeList
				// 	// console.log(this.Arrlist)
				// }
			},
			// async loadData(){
			// 	let list = await this.$api.json('cateList');
			// 	list.forEach(item=>{
			// 		if(!item.pid){
			// 			this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
			// 		}else if(!item.picture){
			// 			this.slist.push(item); //没有图的是2级分类
			// 		}else{
			// 			this.tlist.push(item); //3级分类
			// 		}
			// 	}) 
			// },
			//一级分类点击
			tabtap(item){
				 console.log(item)
				if(!this.sizeCalcState){ 
					this.calcSize();
				}
				this.gSristTypeList(item.id)
				this.currentId = item.id;
				let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
				console.log(index)
				try{
					this.tabScrollTop = this.slist[1].top;	
				}catch(e){
					//TODO handle the exception
				}
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid){
				uni.navigateTo({
					url: `/pages/product/lists/lists?fid=${this.currentId}&sid=${sid}&tid=${tid}`
				})
			},
			search() {
				uni.navigateTo({
					url: '../index/search/search'
				});
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background-color: #fff;
		height: 100%;
	}
	.content {
		height: 100%;
		background-color: #FFFFFF;
	}

	.content {
		display: flex;
		flex-direction: column;
	}
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 20upx;
		text{
			font-size: 36upx;
			color: #333333;
		}
		.search-bar{
			display: flex;
			align-items: center;
			width:540upx;
			height: 60upx;
			padding-left: 20upx;
			background-color: #F6F6F6;
			border-radius:28upx;
			font-size: $font-sm;
			color: #999999;
			image{
				width: 42upx;
				height: 42upx;
				margin-right: 10upx;
			}
		}
		.btns image{
			width: 44upx;
			height: 40upx;
		}
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding:0 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 170upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 100%;
			height: 140upx;
		}
	}
	.con-wrapper{
		flex: 1; 
		display: flex;
		overflow: hidden;
	}
	.store-list{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.store-item{
		position: relative;
		width: 245upx;
		height: 320upx;
		margin-bottom: 20upx;
		border-radius: 10upx;
		image{
			width: 245upx;
			height: 320upx;
		}
		.name{
			position: absolute;
			left: 50%;
			top: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			width:200rpx;
			height:80rpx;
			background:rgba(255,255,255,0.9);
			border-radius:8rpx;
			transform: translate(-50%,-50%);
			font-size: 28upx;
			color:#333;
		}
	}
</style>
