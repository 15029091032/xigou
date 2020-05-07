<template>
	<view class="content">
		<view class="header">
			<view class="user-info">
				<view class="left">
					<view class="name">Ethwe:Y</view>
					<view class="link">
						企业入驻
						<text class="yticon icon-you"></text>
					</view>
				</view>
				<image class="avatar" src="/static/avatar.png" mode=""></image>
			</view>
			<view class="num-wrapper">
				<view class="left">
					<view class="num">0.00</view>
					<view class="txt">账户余额</view>
				</view>
				<view class="right">
					<view class="link">
						查看详情
						<text class="yticon icon-you"></text>
					</view>
					<view class="btn">
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
					<block v-for="(item,index) in list" :key="index">
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
	export default{
		data(){
			return {
				list:[
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					},
					{
						name:'昵称'
					}
				]
			}
		}
	}
</script>

<style lang="stylus">
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
				display flex
				align-items center
				width 130upx
				height 40upx
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
