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


