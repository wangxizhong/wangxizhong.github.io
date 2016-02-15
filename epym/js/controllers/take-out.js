app.controller('takeOutCtrl', ['$scope', '$http', '$cookieStore', '$timeout', '$rootScope', 'API', function($scope, $http, $cookieStore, $timeout, $rootScope, API){


    $scope.filterTemp = 0;
	//获取外卖筛选菜单信息
    API.takeOutFilter({}).then(function (data) {
        $scope.filterList = data;
        console.log($scope.filterList);
    } , function(msg){
        console.log(msg);
    });

    //筛选菜单左侧大类点击
    $scope.allTypeClick = function(para) {      
        console.log(para);
        $scope.typeDetail = para.categorySmalls;
    }

    $scope.isScrollBody = function(filter) {
        //点击其他位置时，不传参数处理
        if(!filter) {
            filterTemp = 0;
            $rootScope.isScrollBody = false;
            return;
        }
        //传参处理
        if(filter == filterTemp) {
            $rootScope.isScrollBody = false;
        } else {
            $rootScope.isScrollBody = true;
        }
        filterTemp = filter;
    }


    $('.filter-child-right').scroll(function(e){
        if($(this).innerHeight() + $(this).scrollTop() >= $(this).find('.filter-click').height()) {
            console.log('bottom');
            e.preventDefault();
           return false;
        }
        if($(this).scrollTop() == 0) {
            console.log('top');
             e.preventDefault();
               return false;
        }
     });
}])