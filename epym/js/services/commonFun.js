app.factory('CommonFun', ['$rootScope', function($rootScope){
	var common = {};

	// 中文字符按两个算，一共的字符数
    common.cal = function (str) {
        re = /[\u4E00-\u9FA5]/g;  // 测试中文字符的正则
        if (re.test(str))
            return (str.length - str.match(re).length) + str.match(re).length * 2;
        else
            return str.length;
    };
	return common;
}])