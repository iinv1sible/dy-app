angular.module('starter.controllers.myCustomInfoCardCtrl', []).controller('myCustomInfoCardCtrl', function ($scope, $showAlert, $ionicLoading, $state, $stateParams, $T, $ionicHistory, $httpPsd) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.memberID = $stateParams.memberID;
    $scope.isVip = false;
    $scope.cardList = [];
    if($scope.memberID && $scope.memberID != ''){
      $scope.isVip = true;
      $scope.cardData = {};
      $scope.cardData.businessId = $scope.info.businessId;
      $scope.cardData.memberID = $scope.memberID;
      $httpPsd.getCardList($scope.cardData,$scope.getCardListSuccess);
    }
  })

  $scope.getCardListSuccess = function(data){
    if(data.code == 200 && data.data){
      $scope.cardList = data.data;
      console.log(data);
    }
  }

  $scope.error = function (data) {
    $scope.isSave = false
    $ionicLoading.hide()
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };

  $scope.goback = function(){
    $ionicHistory.goBack();
  };

})
