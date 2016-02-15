app.controller('storeInfo', ['$scope', '$http', '$cookieStore', '$timeout', '$rootScope', 'API', function($scope, $http, $cookieStore, $timeout, $rootScope, API){

	$scope.isCall = false;

	//查询店铺信息
    API.storeInfo({}).then(function (data) {
    	$scope.storeInfo = data;
        console.log(data);
    } , function(msg){
        console.log(msg);
    });
}])