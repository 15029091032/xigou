
/***
 * 判断字符串是否为空
 * @param arg1
 * @param arg2
 * @returns
 */
export function isEmpty(str) {
	if(undefined==str){
		return true;
	}else if(''==str){
		return true;
	}else if(null==str){
		return true;
	}else{
		return false;
	}
}

