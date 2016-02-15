app.factory('Shop', ['$rootScope', function($rootScope){
    var shop = {};
    var shopData = {};
    shop.saveShopCar = function(store_id, shop){
        shopData[store_id] = shop;
    }
    shop.getShopCar = function(store_id){
    	if(store_id && shopData[store_id])
        	return shopData[store_id];
        else 
        	return false;
    }
    shop.removeShopCar = function(store_id){
    	if (store_id && shopData[store_id])
    		delete shopData[store_id];
    	else 
    		return false;
    }
    shop.removeAll = function() {
    	shopData = {};
    }
    return shop;
}])