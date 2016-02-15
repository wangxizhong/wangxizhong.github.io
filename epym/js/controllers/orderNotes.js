app.controller('orderNotesCtrl', ['$scope', '$rootScope', 'language', function($scope, $rootScope, language){
	
	//默认提示
	$scope.notesTemp = $rootScope.nowLang1.pay.notesPlaceholder + '\r\n' + $rootScope.nowLang2.pay.notesPlaceholder;
	$scope.notes = $scope.notesTemp;
	//获取焦点操作
	$scope.scrollToTop = function(){
		//点击时页面上漂
		document.getElementsByTagName("textarea")[0].scrollTop = 2000;
		document.getElementsByTagName("textarea")[0].selectionStart = 2000;
		//点击时判断是否是默认提示
		if($scope.notes == $scope.notesTemp) {
			$scope.notes = "";
		}
	}
	//失去焦点操作
	$scope.checkNotes = function() {
		if(!$scope.notes) {
			$scope.notes = $scope.notesTemp;
		}
	}
}])