app.factory('API', ['$rootScope' ,'$cookieStore', '$q', '$http', function($rootScope, $cookieStore, $q, $http){
	var baseurl = "";
	var api = {
		baseurl: baseurl
	};



	function request(url, method, data, cache) {
        var deferred = $q.defer();

        if (cache === 'false') {
            cache = false;
        } else {
            cache = cache || true;
        }
       
        $http({
            method: method,
            url: url,
            data: data,
            cache: cache
        })
            .success(function (result, status) {
                if (result && result.retCode) {
                    if (result.retCode == '200') {
                        deferred.resolve(result.returnObj);
                    } else {
                        deferred.reject(result);
                    }
                }
            })
            .error(function (data, status) {
                deferred.reject(status, 'network failed');
            });

        return deferred.promise;
    }

    //本地接口地址
    var localUrl = {
        home : "data/getRecommend.json",
        orderConfirm : "data/orderConfirm.json"
    }

    //远程接口地址
    var remoteUrl = {
        home : ""
    }

    //请求方式
    var requestMethod = "get";
    //接口地址
    api.requestUrl = localUrl;

    api.login = function(para){
    	para.t_k = "";
    	var url = baseurl + "";
    	var promise = request(
    		url, 
    		'post',
    		para
    		);
    	return promise;
    }

    //点餐列表
    api.selectFood = function(para){
        var para = { 
        };
        var promise = request(
            'data/select-food.json',
            'get',
            para
        );
        return promise;
    }

    //外卖筛选查询条件
    api.takeOutFilter = function(para){
        var para = { 
        };
        var promise = request(
            'data/takeOutFilter.json',
            'get',
            para
        );
        return promise;
    }

    //点餐筛选查询条件
    api.selectFoodFilter = function(para){
        var para = { 
        };
        var promise = request(
            'data/selectFoodFilter.json',
            'get',
            para
        );
        return promise;
    }

    //点餐筛选查询条件
    api.storeInfo = function(para){
        var para = { 
        };
        var promise = request(
            'data/storeInfo.json',
            'get',
            para
        );
        return promise;
    }

    //首页接口
    api.home = function(para) {
        var url = localUrl.home;
        var promise = request(
            url,
            requestMethod,
            para
            );
        return promise;
    }

    //订单确认
    api.orderConfirm = function(para) {
        var url = localUrl.orderConfirm;
        var promise = request(
            url,
            requestMethod,
            para
            );
        return promise;
    }



    return api;
}])