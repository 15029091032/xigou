<template>
	<view class="content">
		<view class="row b-b">
			<!-- <text class="tit">收货人</text> -->
			<input class="input" type="text" v-model="addressData.name"/>
		</view>
		<view class="row b-b">
			<!-- <text class="tit">手机号</text> -->
			<input class="input" type="number" v-model="addressData.phone"/>
		</view>
		<view class="row b-b zdy">
			<pickerAddress @change="change" class="input">{{addressData.proCityArea}}</pickerAddress>
		</view>
		<view class="row b-b"> 
			<!-- <text class="tit">详细地址</text> -->
			<input class="input" type="text" v-model="addressData.address"/>
		</view>
		
		<view class="row default-row">
			<text class="tit">默认地址</text>
			<switch :checked="isdefault" color="#00ff33" @change="switchChange" />
		</view>
		<view class="row default-row">
			<text class="del" type="primary" @click="togglePopup('center', 'tip')">删除收货地址</text>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref="showtip" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">友情提示</text>
				<text class="uni-tip-content">确定要删除次地址吗？</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('cancel')">再想想</text>
					<text class="uni-tip-button" @click="cancel('remove')">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	import {updateAddress,deleteAddress} from '../../../api/user.js';

	export default {
		data() {
			return {
				type: '',
				addressData: {},
				isdefault:false
			}
		},
		onLoad(option){
		
			this.addressData = JSON.parse(option.data)
			
			this.isdefault=this.addressData.isDefault==1? true : false
			
				
		},
		onNavigationBarButtonTap:async  function(e) {
			let that=this;
		 this.addressData.isDefault=this.isdefault?1 :2;
		 
		 console.log(this.addressData);
					
					let d={
						'name':this.addressData.name,
						'phone':this.addressData.phone,
						'pro_city_area':this.addressData.proCityArea,
						'address':this.addressData.address,
						'is_default':this.addressData.isDefault,
						'id':this.addressData.id
					}
					let data = await updateAddress(d);
					
					 
					if (data.status == 200) {
						
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
						that.$api.prePage().selectAddress();
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
			switchChange(e){
				this.isdefault = e.detail.value;
			},
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
			
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
		async	cancel(type) {
			let that=this;
				if(type=="remove"){
					console.log(that.addressData.id)
					
				
					
					let data = await deleteAddress({id:that.addressData.id});
					
					 
					if (data.status == 200) {
						
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
						that.$api.prePage().selectAddress();
						setTimeout(()=>{
							uni.navigateBack()
						}, 800)
					} else {
						uni.showToast({
							title: data.msg,
							icon: 'none'
						});
					}
					
				}
				that.$refs['showtip' ].close()
				
			},
			change(e) {
				if(e.data==undefined){
					return
				}
				let area='';
				for(let i=0;i<e.data.length;i++){
					area+=e.data[i];
				}
				this.addressData.proCityArea=area;
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 100upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			margin-left: 20upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.zdy {
		display: flex;
		justify-content: space-between;
	}
	.del {
		color: #ef4321 !important;
		width: 100%;
		background-color: #FFFFFF;
		text-align: left;
		font-size: 30upx;
	}
	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			/* padding: 15px;
	*/
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
</style>
