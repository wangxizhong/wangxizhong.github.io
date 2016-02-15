app.controller('orderConfirmationCtrl', ['$scope', '$rootScope', 'language', 'API', function($scope, $rootScope, language, API){
	//地址
	$scope.addressData = [];
	//银行卡
	$scope.cardListData = [];
	//订单数据
	$scope.orderData = [];
	API.orderConfirm({}).then(function(data) {
		console.log(data);
		$scope.addressData = data.addrs;
		$scope.cardListData = data.cardList;
	} , function(data) {
		console.log(data);
	});
}])