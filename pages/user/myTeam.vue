<template>
	<view class="content">
		<view class="header">
			<view class="user-info">
				<view class="left">
					<view class="name">{{userDetail.nickname}}</view>
					<!-- <view class="link">
						企业入驻
						<text class="yticon icon-you"></text>
					</view> -->
					<view class="link" @click="linkEnte" >{{userDetail.type==1?'企业入驻':'已入驻'}} <text class="yticon icon-you"></text></view>
				</view>
				<!-- <image class="avatar" src="/static/avatar.png" mode=""></image> -->
			</view>
			<view class="num-wrapper">
				<view class="left">
					<view class="num">{{userDetail.umoney}}</view>
					<view class="txt">账户余额</view>
				</view>
				<view class="right">
					<view class="link" @click="goselectDet(userDetail.umoney)">
						查看详情
						<text class="yticon icon-you"></text>
					</view>
					<view class="btn" @click="goWithDraw(userDetail.umoney)">
						<image src="/static/icon-003.png" mode=""></image>
						<text>提现</text>
					</view>
				</view>
			</view>
		</view>
		<view class="team-wrapper">
			<view class="title">团队成员</view>
			<view class="scroll-box">
				<scroll-view scroll-y="true" style="height: 100%;">
					 <view class="empty_bg">
						 <image src="../../static/temp/wu1.png" class="img"  v-if="list.length==0" ></image>
					 </view>
					<block v-for="(item,index) in list" :key="index" v-if="list.length>0">
						<view class="item">
							<image src="../../static/avatar.png" mode=""></image>
							<text>{{item.name}}</text>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
		import { selecttTeamByUserid,selectAppUserByUserid } from '../../api/user.js';
	export default{
		data(){
			return {
				list:[],
				userDetail:{},
			}
		},
		onLoad(){
			this.getUserInfo()
			this.teamList();
		},
		methods:{
			linkEnte(){
				
				//跳转企业入驻
				uni.navigateTo({
					url:'enterprisesInto/qiYeRuZhu',
				})
				
			},
			goWithDraw(money) {
				uni.navigateTo({
					url: `./withdraw/withdraw?money=${money}`,
				})
			},
			goselectDet(money){
			
				uni.navigateTo({
					url:`drawDetail/drawDetail?money=${money}`,
				})
			},
			async getUserInfo(){
				let that=this;
				 
				let data= await selectAppUserByUserid({userid:uni.getStorageSync('dataInfo').id})
				
				console.log("userInfo",data)
				if (data.status == 200) {
					that.userDetail=data.data;
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
				
				
			},
			async teamList(){
				let that=this;
				let data=await selecttTeamByUserid({userid :uni.getStorageSync("userInfo").id,page:1,rows:1});
				if (data.status == 200) {
					that.list=data.data;
					
				
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="stylus">
	
	
	.empty_bg{
		width: 100%;
		    text-align: center;
			.img{
				width:50%;
				    margin-top: 10%;
				    height: 300upx;
			}
	}
	
page
	width 100%
	height 100%
	background-color #F6F6F6
.content
	display flex
	flex-direction column
	width 100%
	height 100%
.header
	padding 10upx 20upx 40upx
	margin-top 10upx
	background-color #fff
	height 340upx
	.user-info
		display flex
		justify-content space-between
		.left
			.name
				font-size 34upx
				color #222
			.link
				
				width: fit-content
				padding: 15upx 24upx 15upx 24upx
				
				
				margin-top 10upx
				font-size 22upx
				background rgba(255, 226, 0, 1)
				border-radius 0px 20upx 20upx 0px
				.icon-you
					margin-top 5upx
					font-size 20upx
		.avatar
			width 100upx
			height 100upx
			border-radius 50%
	.num-wrapper
		display flex
		justify-content space-between
		align-items center
		margin-top 28upx
		padding 0 40upx
		color #fff
		height 160upx
		background linear-gradient(31deg, rgba(255, 161, 109, 1) 0%, rgba(255, 213, 47, 1) 99%)
		box-shadow 0px 12upx 7upx 0px rgba(255, 190, 16, 0.18)
		border-radius 16upx
		.num
			font-size 50upx
		.txt
			font-size 22upx
		.link
			display flex
			align-items center
			font-size 30upx
			.icon-you
				font-size 22upx
		.btn
			display flex
			align-items center
			margin-top 10upx
			font-size 28upx
			image
				width 38upx
				height 29upx
				margin-right 10upx
.team-wrapper
	flex 1			
	display flex
	flex-direction column
	padding 0 20upx
	margin-top 10upx
	background-color #fff
	overflow hidden
	.title
		display flex
		align-items center
		height 100upx
		font-size 32upx
		border-bottom 1upx solid #eee
	.scroll-box
		flex 1
		overflow hidden
		.item
			display flex
			align-items center
			padding 23upx 0
			font-size 32upx
			image
				width 88upx
				height 88upx
				margin-right 20upx
</style>
