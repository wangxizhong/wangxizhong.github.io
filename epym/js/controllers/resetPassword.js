app.controller('resetPassword', ['$scope', '$http', '$cookieStore', '$timeout', '$rootScope', function($scope, $http, $cookieStore, $timeout, $rootScope){
	
	$scope.checkInfo = "验证 Checking";
	$scope.isSend = false;
	//点击发送验证码
	$scope.phoneCheck = function () {
		if(wait == 5) {
			$scope.setTime();
    	} else {
    		return;
    	}
	}

	//发送验证码倒计时
	var wait=5;
	$scope.setTime = function () {
		$scope.isSend = true;
		if (wait == 0) {  
	        $scope.checkInfo = "重发 Resend";
	        wait = 5;
	        $scope.isSend = false;
	    } else {
	    	$scope.checkInfo = wait + " s";
	        wait--;  
	        $timeout(function() {  
	            $scope.setTime();  
	        },  
	        1000)  
	    }
	}
}])