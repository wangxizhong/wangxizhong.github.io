app.controller('selectFoodCtrl', ['$scope', '$http', '$cookieStore', '$timeout', '$rootScope', 'API', function($scope, $http, $cookieStore, $timeout, $rootScope, API){

    $scope.shopingCar_aSet = [];
    $scope.shopingCar = [];
    $scope.payCarNum = 0;
    $scope.payCarPrice = 0;

    //点餐筛选查询条件
    API.selectFoodFilter({}).then(function (data) {
        $scope.storeDis = data.dis;
        $scope.classList = data.classList;
        console.log(data);
    } , function(msg){
        console.log(msg);
    });

    //获取门店商品列表
    API.selectFood({}).then(function (data) {
        $scope.foodList = data.goodsList;
        console.log(data);
    } , function(msg){
        console.log(msg);
    });

    //套餐选择
    $scope.aSetSelect = function(index, obj, allObj) {
        obj.index = index;

        
        for(var i = 0; i < allObj.subGoodsList.length; i++) {
            if(allObj.subGoodsList[i].goodsClassify == obj.goodsClassify) {
                for(var j = 0; j < allObj.subGoodsList[i].goods.length; j++) {
                    allObj.subGoodsList[i].goods[j].isNeed = 0;
                }
                allObj.subGoodsList[i].goods[index].isNeed = 1;
                console.log(allObj.subGoodsList[i].goods);
            }
        }
    }

    //套餐添加购物车
    $scope.aSetAddFood = function(index, allObj) {
        console.log(allObj.subGoodsList);

        for(var i = 0; i < allObj.subGoodsList.length; i++) {
            for(var j = 0; j < allObj.subGoodsList[i].goods.length; j++) {
                if(allObj.subGoodsList[i].goods[j].isNeed == 1) {
                    break;
                } else if(allObj.subGoodsList[i].goods[j].isNeed != 1 && j == allObj.subGoodsList[i].goods.length - 1) {
                    alert('请选择 ' + allObj.subGoodsList[i].typeNameCn + ' 类!');
                    return;
                }
            }
        }

        //设置套餐当前数量为，并且加入购物车数组。
        if(allObj.foodCount != undefined && allObj.foodCount != 0) {
            //allObj.foodCount = allObj.foodCount + 1;
            return alert('购物车已经存在该套餐');
        } else {
            allObj.foodCount = 1;
            $scope.shopingCar.unshift(allObj);
        } 
        console.log($scope.shopingCar);

        $scope.foodNum();
    }

    //单品减餐
    $scope.oddFood = function(obj) {
        //如果商品减到0，则在json中移除，否则商品不移除，只减数量
        for(var i = 0; i < $scope.shopingCar.length; i++) {
            if($scope.shopingCar[i].goodsId == obj.goodsId && $scope.shopingCar[i].foodCount == 1) {
                $scope.shopingCar[i].foodCount = ($scope.shopingCar[i].foodCount) - 1;
                $scope.shopingCar.splice(i, 1);
                console.log($scope.shopingCar);
                break;
            } else if($scope.shopingCar[i].goodsId == obj.goodsId) {
                $scope.shopingCar[i].foodCount = ($scope.shopingCar[i].foodCount) - 1;
                console.log($scope.shopingCar);
            }
        }

        $scope.foodNum();
    }

    //单品添加购物车
    $scope.addFood = function(obj) { 
        if($scope.shopingCar.length != 0) {
            for(var i = 0; i < $scope.shopingCar.length; i++) {
                if($scope.shopingCar[i].goodsId == obj.goodsId) {
                    $scope.shopingCar[i].foodCount = parseInt($scope.shopingCar[i].foodCount) + 1;
                    console.log($scope.shopingCar);
                    break;
                } else if($scope.shopingCar[i].goodsId != obj.goodsId && i == $scope.shopingCar.length-1) {
                    $scope.shopingCar.push(obj);
                    obj.foodCount = 1;
                    console.log($scope.shopingCar);
                    break;
                }
            }
        } else {
            $scope.shopingCar.push(obj);
            obj.foodCount = 1;
        }
        
        $scope.foodNum();
        console.log($scope.shopingCar);
    }

    //购物车点击
    $scope.payCarShow = function() {
        $scope.isCover = !$scope.isCover;
        $scope.isPayCar = !$scope.isPayCar;

        $rootScope.isScroll = !$rootScope.isScroll;
    }

    //清空购物车
    $scope.clearPayCar = function() {
        for(var i = 0; i < $scope.shopingCar.length; i++) {
            $scope.shopingCar[i].foodCount = 0;
        }

        $scope.foodNum();

        $scope.shopingCar = [];
    }

    //计算当前店铺点菜总数量
    $scope.foodNum = function() {
        //算之前将数量清零
        $scope.payCarNum = 0;
        $scope.payCarPrice = 0;
        for(var i = 0; i < $scope.shopingCar.length; i++) {
            $scope.payCarNum = $scope.payCarNum + $scope.shopingCar[i].foodCount
            var price = $scope.shopingCar[i].foodCount * $scope.shopingCar[i].price;
            $scope.payCarPrice = $scope.payCarPrice + price;
        }
    }

    //商品加入购物车效果
    $(document).on('click', '.add-food-ico', function() {
        var img = $(this).parent().parent().find('img');
        var flyElm = img.clone().css('opacity', 0.75);
        $('body').append(flyElm);
        flyElm.css({
            'z-index': 9000,
            'display': 'block',
            'position': 'absolute',
            'top': $(this).offset().top +'px',
            'left': $(this).offset().left +'px',
            'width': $(this).width() +'px',
            'height': $(this).height() +'px'
        });
        flyElm.animate({
            top: $('.pay-car-ico').offset().top,
            left: $('.pay-car-ico').offset().left,
            width: 20,
            height: 32
        }, 'slow', function() {
            flyElm.remove();
        });
    }); 
}])