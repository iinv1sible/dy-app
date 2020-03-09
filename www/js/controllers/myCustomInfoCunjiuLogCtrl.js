angular.module('starter.controllers.myCustomInfoCunjiuLogCtrl', []).controller('myCustomInfoCunjiuLogCtrl', function ($scope, $showAlert, $ionicLoading, $stateParams, $T, $ionicHistory, $httpCunjiu) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {}
    $scope.isVip = false
    if($stateParams.phone){
      $scope.isVip = true
    }else{
      $scope.isVip = false
    }
    $scope.data.phone = $stateParams.phone || ''
    $scope.wineLog = []
    $scope.getLogData()
  })
  $scope.getLogData = function(){
    $httpCunjiu.getWineLogs({
      businessId: $scope.info.businessId,
      phone: $scope.data.phone,
      vipId: ''
    }, function(data){
      $scope.wineLog = data
    },$scope.error)
  }
  $scope.error = function (data) {
    $ionicLoading.hide()
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.goback = function(){
    $ionicHistory.goBack();
  }
  $scope.selectCustom = function () {
    if ($scope.data.phone.length == 11) {
      $scope.getLogData()
    }
  };
})
