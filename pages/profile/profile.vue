<template>
	<view class="container">
		<view class="list-cells b-b m-t" @click="open()" hover-class="cell-hover" :hover-stay-time="50">
			<image class="avatar " src="/static/avatar.png" mode=""></image>
			<view class="m-t">
				<text class="cell-tits">修改</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
			<uni-popup ref="popup" type="bottom" class="popus">
				<view class="see">
					<button type="default" plain class="btn">拍照上传</button>
					<button type="default" plain class="btn">本地上传</button>
				</view>
				<view class="rest">
					<button type="default" plain class="btn" @click="close()">取消</button>
				</view>
			</uni-popup>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" @click="pitName()">
			<text class="cell-tit">昵称</text>
			<text class="cell-tits">傲娇鬼</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50" @click="changeSex()">
			<text class="cell-tit">性别</text>
			<text class="cell-tits">男</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	data() {
		return {};
	},
	components: { uniPopup },
	methods: {
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		pitName(){
			uni.navigateTo({
				url:'./pitName/pitName'
			})
		},
		changeSex() {
			uni.navigateTo({
				url:'./changeSex/changeSex'
			})
		},
	}
};
</script>

<style lang="scss" scoped>
page {
	background: $page-color-base;
}
.list-cells {
	display: flex;
	align-items: center;
	line-height: 60upx;
	position: relative;
	padding: 10upx 30upx;
	background: #fff;
	justify-content: space-between;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: #444444;
		margin-right: 10upx;
	}
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: #444444;
		margin-right: 10upx;
	}
}
.cell-tits {
	font-size: 28upx;
	color: #aaaaaa;
}
.avatar {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}
.popus {
	.rest,
	.see {
		background-color: #fff;
		padding: 0 30upx;
		border: none;
		font-size: 32upx;
		color: #333;
	}
	.rest {
		margin-top: 20upx;
	}
	.btn {
		border: none;
	}
}
</style>
