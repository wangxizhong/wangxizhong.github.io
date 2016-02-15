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
      
      $uibModal.open({ 
        templateUrl: 'myModalContent.html',
        controller: 'modalContentCtrl',
        windowClass: 'large-Modal'
      });
      
      $http.get('data/merSignMsg.json').success(function(data) {
        $scope.merSignMsg = data.merSignMsg;
        $scope.merCert = data.merCert;
              
        /*
        var form = angular.element('#form');
        //console.log(form);
        //form.submit();
        
        var epos = angular.element('#epos');
        epos.append('<p>added</p>');
        console.log(epos);
        
        epos.load('tpl/home/index.html', {
          merSignMsg: $scope.merSignMsg,
          merCert: $scope.merCert,
          billNo: "66668888"
        }, function(response, status, xhr) {
          console.log(status);
          if (status == 'error') {
            console.log("Sorry but there was an error: ");
          }
        });
        */
        
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
    $scope.url_iframe = $sce.trustAsResourceUrl('https://ebankpfovaopay.dccnet.com.cn/servlet/ICBCEBusinessServlet');
     
    $scope.cancel = function() {
      console.log("dismiss");
      $uibModalInstance.dismiss('cancel');
    };
});

app.directive('epos-directive', function(){
  return {
    link: function(scope, element, attrs) {
      console.log("merSignMsg:"+scope.merSignMsg);
      //here your all jQuery code will lie to ensure binding
      $(element).load('tpl/home/index.html', function (data) {
        console.log(data);
      });
    }
  }
});