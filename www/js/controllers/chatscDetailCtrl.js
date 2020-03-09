angular.module('starter.controllers.chatscDetailCtrl', []).controller('ChatscDetailCtrl', function ($scope, $state, $stateParams, $http, $chat, $ionicPopover, $ionicLoading, $showAlert, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log($stateParams);
    $scope.qryType = $stateParams.time;
    $scope.qryType2 = $stateParams.type;
    $scope.starttime = $stateParams.starttime;
    $scope.endtime = $stateParams.endtime;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.classList = [];
    $scope.getCustomData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "qryType": $scope.qryType,
      "qryType2": $scope.qryType2,
      "page": 1,
      "rows": 12,
      'starttime': $scope.starttime,
      'endtime': $scope.endtime
    };
    $scope.getCustomData.page = 1;
    $chat.getCustom($scope.getCustomData, $scope.getCustomSuccess, $scope.error);
  });
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.classList = [];
  $scope.canLoad = true;
  $scope.getCustomSuccess = function (data) {
    console.log(data);
    $scope.classList = $scope.classList.concat(data.list);
    console.log($scope.classList);
    $scope.canLoad = data.hasNextPage;
    $scope.getCustomData.page += 1;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.doInfinite = function () {
    $chat.getCustom($scope.getCustomData, $scope.getCustomSuccess, $scope.error);
    console.log(1);
  };
  $scope.bgColor = (function () {
    var a = Math.ceil(5 * Math.random());
    switch (a) {
      case 1:
        return {"background-color": "#D76959"};
        break;
      case 2:
        return {"background-color": "#82C97C"};
        break;
      case 3:
        return {"background-color": "#76A6DF"};
        break;
      case 4:
        return {"background-color": "#E7B45F"};
        break;
      case 5:
        return {"background-color": "#5CBBA4"};
        break;
    }
  })();
  $scope.goInfo = function ($event) {
    var a = $event.target;
    var vipId = a.getAttribute('data-vipId');
    $state.go('myCustom-info', {'vipId': vipId});
  };
})