angular.module('starter.controllers.accountMyOrderYDetailSettleCtrl', []).controller('accountMyOrderYDetailSettleCtrl', function ($scope, $ionicPopup, $ionicPopup, $showAlert, $state, $stateParams, $ionicLoading, $operation, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.data = $stateParams.order
    console.log($scope.data)
  })
  $scope.save = function(){
    var reg = /^\d+$/;
    if($scope.data.tableNum && reg.test($scope.data.tableNum) == false){
      $showAlert.alert('桌数必须为数字');
      return
    }else if($scope.data.dishesPrice && reg.test($scope.data.dishesPrice) == false){
      $showAlert.alert('菜品金额必须为数字');
      return
    }else if($scope.data.drinksPrice && reg.test($scope.data.drinksPrice) == false){
      $showAlert.alert('酒水金额必须为数字');
      return
    }else if($scope.data.weddingPrice && reg.test($scope.data.weddingPrice) == false){
      $showAlert.alert('婚庆金额必须为数字');
      return
    }else if(!$scope.data.actualMoney){
      $showAlert.alert('请输入实收金额');
      return
    }else if($scope.data.actualMoney && (reg.test($scope.data.actualMoney) == false)){
      $showAlert.alert('实收金额必须为数字');
      return
    }
    $ionicPopup.confirm({
      cssClass: "er-popup",
      template: `是否确认结账`,
      title: $T.T('易订'),
      scope: $scope,
      buttons: [
        {text: $T.T('取消')},
        {
          text: `<b>${$T.T('确认')}</b>`,
          type: 'button-assertive',
          onTap: function () {
            var huanzhuoData = {
              tableNum: $scope.data.tableNum,
              dishesPrice: $scope.data.dishesPrice,
              drinksPrice: $scope.data.drinksPrice,
              weddingPrice: $scope.data.weddingPrice,
              actualMoney: $scope.data.actualMoney,
              meetingBatchNo: $scope.data.meetingBatchNo
            };
            $operation.settleYseat(huanzhuoData, $scope.changeSeatSuccess, $scope.error);
          }
        }
      ]
    });
  }
  $scope.changeSeatSuccess = function(){
    $showAlert.alert('结账成功');
    $state.go('Ybook', {'type': 2,'back': $stateParams.back});
  }
  $scope.error = function (data, status) {
    $showAlert.alert('连接失败，请检查网络');
    $ionicLoading.hide();
  };
})