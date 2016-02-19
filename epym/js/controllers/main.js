app.controller('mainCtrl', function(language){
	
});

app.controller('pymCtelCtrl', function($scope, $http, $stateParams, $uibModal){
    $scope.ctelQuery = function() {
      $http.get('data/ctel_query.json').success(function(data) {
        console.log(data.returnObj.type);
      });
    };
    
    $scope.ctelPym = function(billAmt) {
      console.log("ctelPym start");
      
      $http.get('data/ctel_query_'+$scope.goodsID+'.json').success(function(data) {
        console.log(data.returnObj.type);
        if (data.resultCode == '00000') {
          $uibModal.open({ 
            templateUrl: 'myModalContent.html',
            controller: 'modalContentCtrl',
            windowClass: 'large-Modal'
          });
          setTimeout(function(){document.getElementById('form').submit();}, 200);
        } else {
          alert("您輸入的號碼不存在，請輸入正確的手機號碼。\nInvalid Phone No.");
        }
      }).error(function (data, status, headers, config) {
        console.log("ctel_query error");
      });;
      
      $http.get('data/merSignMsg.json').success(function(data) {
        $scope.merSignMsg = data.merSignMsg;
        $scope.merCert = data.merCert;
      }).error(function (data, status, headers, config) {
        console.log("error");
      });
      
      console.log("ctelPym done!");
    };
    
    $scope.submit = function() {
      console.log("form submit");
    };
});

app.controller('modalContentCtrl', function($scope, $uibModalInstance, $sce){
    $scope.cancel = function() {
      console.log("dismiss");
      $uibModalInstance.dismiss('cancel');
    };
});
