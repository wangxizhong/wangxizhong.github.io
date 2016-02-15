app.controller('homeCtrl', ['$scope', '$rootScope', 'language', 'API', function($scope, $rootScope, language, API){
	console.log($rootScope.nowLang1);
	//首页顶部菜单数据
	$scope.modelData = [{
		lang1 : $rootScope.nowLang1.home.takeout,
		lang2 : $rootScope.nowLang2.home.takeout,
		iconUrl : "img/takeout.png"
	} , {
		lang1 : $rootScope.nowLang1.home.payatStore,
		lang2 : $rootScope.nowLang2.home.payatStore,
		iconUrl : "img/payatStore.png"
	} , {
		lang1 : $rootScope.nowLang1.home.livingPayment,
		lang2 : $rootScope.nowLang2.home.livingPayment,
		iconUrl : "img/livingPayment.png"
	}];
	//接口请求页面数据
	API.home({}).then(function(data){
		console.log(data);
		//将数据放入页面
		$scope.activityData = data.adverts;
		$scope.recommendsData = data.recommends;
		//完善menus数据
		var modelLength = $scope.modelData.length;
	} , function(data){
		console.log(data);
	});
}])