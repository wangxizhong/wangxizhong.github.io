app.factory('language', ['$cookieStore', '$rootScope', 'CN', 'EN', function($cookieStore, $rootScope, CN, EN){
	//初始化语言变量
	var lang = {};
	$rootScope.nowLang1 = {};
	$rootScope.nowLang2 = {};
	lang.setLang1 = function(lang){
		if(lang)
			$rootScope.nowLang1 = lang;
		else
			$rootScope.nowLang1 = CN;
	}
	lang.setLang2 = function(lang){
		if(lang)
			$rootScope.nowLang2 = lang;
		else
			$rootScope.nowLang2 = EN;
	}
	lang.getLang1 = function() {
		return $rootScope.nowLang1;
	}
	lang.getLang2 = function() {
		return $rootScope.nowLang2;
	}
	lang.setLang = function(lang1, lang2) {
		lang.setLang1(lang1);
		lang.setLang2(lang2);
	}
	lang.setLang(CN, EN);
	return lang;
}])