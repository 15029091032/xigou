	<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">收货人</text>
			<input class="input" type="text" v-model="addressData.name"/>
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile"/>
		</view>
		<view class="row b-b zdy">
			<!-- <text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text> -->
			<text class="tit">所在地区</text>
			<pickerAddress @change="change" class="input">{{txt}}</pickerAddress>
			<!-- <input class="input" type="text" v-model="dizhi" /> -->
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.area"/>
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaule" color="#00ff33" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">保存地址</button>
	</view>
</template>

<script>
	import pickerAddress from '../../components/pickerAddress/pickerAddress.vue'
	import { addAddress } from '../../api/user.js';
	export default {
		data() {
			return {
				txt:'请选择',
				addressData: {
					name: '',
					mobile: '',
					// addressName: '在地图选择',
					address: '',
					area: '',
					default: false
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				
				
				this.addressData.default = e.detail.value;
			},
			//三级联动
			change(data) {
			    this.txt = data.data.join('')
				 this.address=this.txt
			    console.log(data.data.join(''))
			},
			//地图选择地址
			// chooseLocation(){
			// 	uni.chooseLocation({
			// 		success: (data)=> {
			// 			this.addressData.addressName = data.name;
			// 			this.addressData.address = data.name;
			// 		}
			// 	})
			// },
			
			//提交
		 async confirm(){
				let cont = this.addressData;
				cont.address=this.txt;
				if(!cont.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(cont.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!cont.address||cont.address=='请选择'){
					this.$api.msg('请选择所在地区');
					return;
				}
				if(!cont.area){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				
				
				
				let that=this;
				
				
						let d={
							'name':cont.name,
							'phone':cont.mobile,
							'pro_city_area':cont.address,
							'address':cont.area,
							'is_default':cont.default? 1 : 2,
							'userid':uni.getStorageSync('dataInfo').id,
						}
						console.log(d)
						// return
						let data = await addAddress(d);
						
						
					    console.log("data:",data)
						 
						 
						 
						if (data.status == 200) {
							
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
								//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
							that.$api.prePage().refreshList(cont, that.manageType);
							that.$api.msg(`地址${that.manageType=='edit' ? '修改': '添加'}成功`);
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
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #333;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	.zdy {
		display: flex;
		justify-content: space-between;
	}
</style>
