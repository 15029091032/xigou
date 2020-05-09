 let wait=60;
export function timeCode_b(that) {
				
			if (wait == 0) {
			   
				that.butCode='获取验证码';
			 
			
			    wait = 60;
			} else {
			   that.butCode="验证码(" + wait + ")";
			
			   
			    wait--;
			    setTimeout(function() {
			      timeCode_b(that)
			    },
			    1000)
			}	
}
//防止sql注入
export function detSql(param){
	  re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
	      if ( re.test(param) ){
	
	        return false;
	      }
	      return true;
}
//防止sql注入
export function empty_b(param){
	  if(param==null||param==""||param==undefined||param=="undefined"||param=="null")   return false;
	 
	     return param
}
//手机号码
// export function empty_b(phone){
// 	  if (phone.substring(0,1) == 1) {
// 	            if (that.phone != 1) {
// 	                 that.phone = "";
// 	                   return false
// 	            }
// 	        } else if (that.phone.length == 2) {
// 	            if (that.phone == '11' || that.phone == '12') {
// 	                 that.phone = "1";
// 	                   return false
// 	            }
// 	        }
// 	        that.phone = that.phone.replace(/\D/g, '')
// 	        return true
// }



/**
 * 1 app/home/ 搜索  
 * 2 app/home/selectShopListByShopType 分类下的商品列表
 * 3 app/home/selectNewShopList 首页  最新商品/附近商品
 * 4 app/home/selectHome 首页 
 * 5 app/login/sendSms 发送验证码
 * 6 app/user/selectConpostByUserid 优惠券列表
 * 7 address/deleteAddress 删除用户地址
 * 8 address/updateAddress 编辑用户地址
 * 9 address/addAddress 添加地址
 * 10 app/address/selectAddressByUserid 我的地址列表
 * 11 login/register 注册
 * 12 app/login/login 登录
 * 13 selectConlectShopsByUserid 我的收藏
 * 14 shop/sureConlectShopsByUserid 取消收藏
 * 15 app/shop/selectShopByid 商品详情
 * 16 addOrderShop  加入购物车
 * 17
 * 18
 * 19
 * 20
 * 
 * 
 * */
