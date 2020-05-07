<template>
	<view>
		<view class="placeholder"></view>
		<view class="home-addr column">
			<view class="home-addr-title" style="height:100upx;">
				<view style="float: left;">
					<image src="../../static/address.png" mode=""></image>
					<text style="margin-left: 45upx;">{{ address }}</text>
				</view>
				<view style="float: right;" @click="location()">
					<image src="../../static/location.png" mode=""></image>
					<text style="margin-left: 45upx;">重新定位</text>
				</view>
			</view>
			<view class="options row" v-for="(item, index) in options" :key="index" @click="itemCity1(item, index)">
				<span>{{ item.name }}</span>
				<image v-if="item.isSelect" src="../../static/coty-line.png"></image>
				<image v-if="!item.isSelect" src=""></image>
			</view>
			<view class="line"></view>

			<view class="city-list" v-for="item in listItem" @click="itemCity(item)">
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
let provinces = require('@/static/json/provinces.json'); //省
let city = require('@/static/json/city.json'); //市
let areas = require('@/static/json/areas.json'); //区
export default {
	data() {
		return {
			address: '',
			index: 0,
			listItem: [],
			pItem: [],
			cItem: [],
			aItem: [],
			options: [{ name: '省份', isSelect: true }, { name: '城市', isSelect: false }, { name: '区县', isSelect: false }]
		};
	},
	onShow() {
		let add = uni.getStorageSync('address');
		if (add) {
			this.address = add.province + add.city + add.area;
		}
		this.listItem = provinces;
		this.pItem = provinces;
	},
	methods: {
		location() {
			let that = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：', res);
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.getLocationAddr(res.longitude, res.latitude);
				}
			});
		},
		itemCity1(item, index) {
			if (index == 0) {
				this.listItem = provinces;
				this.cItem = [];
				this.aItem = [];
			} else if (index == 1) {
				if (this.cItem.length > 0) {
					this.listItem = this.cItem;
				} else {
					uni.showToast({
						title: '请选择省份',
						icon: 'none'
					});
					return;
				}
			} else if (index == 2) {
				if (this.aItem.length > 0) {
					this.listItem = this.aItem;
				} else {
					if (this.cItem.length > 0) {
						uni.showToast({
							title: '请选择省份',
							icon: 'none'
						});
					} else {
						this.index = 1;
						uni.showToast({
							title: '请选择城市',
							icon: 'none'
						});
					}
					return;
				}
			}
			for (var i = 0; i < this.options.length; i++) {
				if (index == i) {
					this.options[i].isSelect = true;
				} else {
					this.options[i].isSelect = false;
				}
			}
			this.index = index;
		},
		getLocationAddr(longitude, latitude) {
			uni.request({
				url: 'https://restapi.amap.com/v3/geocode/regeo', //仅为示例，并非真实接口地址。
				data: {
					output: 'json',
					location: longitude + ',' + latitude,
					key: getApp().globalData.AMAP_KEY
				},
				// header: {
				//     'custom-header': 'hello' //自定义请求头信息
				// },
				success: res => {
					console.log(res.data);
					if (res.data.infocode == 10000) {
						let ob = res.data.regeocode.addressComponent;
						let obj = {
							province: ob.province,
							city: ob.city,
							area: ob.district
						};
						this.address = ob.province + ob.city + ob.district;
						try {
							uni.setStorageSync('address', obj);
						} catch (e) {}
					}
				}
			});
		},
		itemCity(item) {
			let that = this;
			if (this.index == 0) {
				this.address = item.name;
				let c = [];
				for (let i = 0; i < city.length; i++) {
					if (item.code == city[i].provinceCode) {
						c.push(city[i]);
					}
				}
				this.listItem = c;
				this.cItem = c;
				that.options[this.index].isSelect = false;
				that.options[this.index + 1].isSelect = true;
				that.options[this.index].name = item.name;
				this.index = 1;
			} else if (this.index == 1) {
				that.options[this.index].isSelect = false;
				that.options[this.index + 1].isSelect = true;
				that.options[this.index].name = item.name;
				this.address = that.options[0].name + item.name;
				this.index = 2;
				let c = [];
				for (let i = 0; i < areas.length; i++) {
					if (item.code == areas[i].cityCode) {
						c.push(areas[i]);
					}
				}
				this.listItem = c;
				this.aItem = c;
			} else if (this.index == 2) {
				that.options[this.index].name = item.name;
				this.address = this.address + item.name;
				let obj = {
					province: that.options[0].name,
					city: that.options[1].name,
					area: item.name
				};
				try {
					uni.setStorageSync('address', obj);
				} catch (e) {}
				uni.navigateBack();
			}
		}
	}
};
</script>

<style>
.placeholder {
	width: 100%;
	background: #f6f6f6;
	height: 20upx;
}
.home-addr-title {
	padding: 20upx;
}
.home-addr-title text {
	line-height: 35upx;
	font-size: 30upx;
}
.home-addr-title image {
	width: 35upx;
	height: 35upx;
	position: absolute;
	margin-top: 12upx;
}
.home-addr {
	margin: 0;
}

.row {
	flex-direction: row;
}

.column {
	flex-direction: column;
}
.options {
	width: 180upx;
	text-align: center;
	font-size: 29upx;
	display: inline-block;
	flex-direction: column;
}
.line {
	border-bottom: #f6f6f6 2px solid;
}
.options image {
	width: 40upx;
	/* display: block; */
	height: 6upx;
	display: block;
	margin-left: 65upx;
}
.city-list {
	margin: 0;
	font-size: 30upx;
	padding: 20upx 30upx;
	/* padding-left: 20upx; */
}
</style>
