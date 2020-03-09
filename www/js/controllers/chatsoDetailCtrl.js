angular.module('starter.controllers.chatsoDetailCtrl', []).controller('ChatsoDetailCtrl', function ($scope, $state, $stateParams, $http, $chat, $ionicPopover, $ionicLoading, $showAlert, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.qryType = $stateParams.time;
    $scope.qryType2 = $stateParams.type;
    $scope.starttime = $stateParams.starttime;
    $scope.endtime = $stateParams.endtime;
    $scope.orderList = [];
    $scope.info = JSON.parse(localStorage['info']);
    $scope.getOrderData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "qryType": $scope.qryType,
      "qryType2": $scope.qryType2,
      "page": 1,
      "rows": 10,
      'starttime': $scope.starttime,
      'endtime': $scope.endtime
    };
    $scope.getOrderData.page = 1;
    $chat.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
  });
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.orderList = [];
  $scope.canLoad = true;
  $scope.getOrderSuccess = function (data) {
    console.log(data);
    $scope.orderList = $scope.orderList.concat(data.list);
    $scope.canLoad = data.hasNextPage;
    $scope.getOrderData.page += 1;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.goOrderDetail = function ($event) {
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    console.log(resvOrder);
    if ($scope.qryType2 == 0) {
      sessionStorage.removeItem('orderData')
      $state.go('myOrder-cDetail', {'type': 4, 'resvOrder': resvOrder});
    } else {
      $state.go('myOrder-yDetail', {'type': 4, 'resvOrder': resvOrder});
    }
  };
  $scope.doInfinite = function () {
    $chat.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
    console.log(1);
  };
})