<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="accountManagement()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">账号管理</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="goProfile()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="goSuggestion()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">意见与反馈</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('用户协议')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户协议</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<!-- <view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view> -->
		<view class="list-cell m-t b-b" @click="navTo('版本检测')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">版本检测</text>
			<text class="ct">v{{version}}</text>
		</view>
		<view class="list-cell b-b" @click="goout()" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">退出登录</text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			 <button type="primary" class="cell-tits" v-if="type==1">切换成个人账号</button>
			 <button type="primary" class="cell-tits" v-if="type==2">切换成企业账号</button>
		</view> 
		<!-- <view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 1.0.3</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view> -->
	</view>
</template>

<script>
	
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
					version:'1.0.0',
					type:uni.getStorageSync('loadingType'),
			};
		},
		onLoad(){
			console.log(this.type)
			try{
				this.version=plus.runtime.version
			}catch(e){
				//TODO handle the exception
			}
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				
			
				// uni.navigateTo({
				// 	url: '../login/login'
				// })
				// this.$api.msg(`跳转到${url}`);
			},
			goout() {
				let that=this;
			// uni.setStorageSync('dataInfo', provider);
			// uni.setStorageSync('loadingType', provider.type);
			// uni.setStorage({key:'token',	data: provider.token,success() {}})
			
			uni.removeStorage({
			    key: 'token',
			    success: function (res) {
			       uni.removeStorageSync('dataInfo');
			       uni.removeStorageSync('loadingType');
				    that.logout();
					console.log("删除成功")
				   uni.reLaunch({
				       url: '../login/login'
				   });
			    }
			});
			  
			
			},
			// 账号管理
			accountManagement() {
				uni.navigateTo({
					url:'../accountManagement/accountManagement'
				})
			},
			goProfile() {
				uni.navigateTo({
					url:'../profile/profile'
				})
			},
			goSuggestion() {
				uni.navigateTo({
					url:'suggestion/suggestion'
				})
			},
			toLogout(){
				let that=this;
				uni.showModal({
				    content: '确定要切换企业账号么',
				    success: (e)=>{
				    	if(e.confirm){
							
							let dataInfo=uni.getStorageSync("dataInfo");
							dataInfo.type=that.type==1?2:1;
						
							
							uni.setStorageSync("dataInfo",dataInfo)
							uni.setStorageSync("loadingType",that.type==1?2:1)
				    	//	this.logout();
				    		setTimeout(()=>{
				    			uni.reLaunch({
				    			    url: '../index/index'
				    			});
				    		}, 200)
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

		}
	}
</script>

<style lang='scss' scoped>
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
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
	.ct {
		font-size: 28upx;
		color: #aaa;
	}
	.cell-tits {
		width: 92%;
		background-color: #ffe200;
		color: #333;
		font-size: 32upx;
	}
</style>
