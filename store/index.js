import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {
			// console.log("state",state)
			// console.log("provider",provider)
			
			 
			
			uni.setStorageSync('dataInfo', provider);
			uni.setStorageSync('loadingType', provider.type);
			uni.setStorage({key:'token',	data: provider.token,success() {}})
			state.hasLogin = true;
			state.dataInfo = provider;
		
			 console.log("vuex用户信息储存:",state);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
