angular.module('starter.controllers.myCustomSourCtrl', []).controller('myCustomSourCtrl', function ($scope, $http, $httpCustom, $ionicPopover, $showAlert, $ionicLoading, $state, $stateParams, $ionicScrollDelegate) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });
  $scope.$on('$ionicView.enter', function (event, viewData) {
    //viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.type = $stateParams.type;
    $scope.page = 1;
    $scope.canLoad = false;
    $scope.customList = [];
    $scope.getCustom();
    /*for (var i=0;i<$scope.arr.length;i++){
      $scope.arr[i].colorId=i%4;
    }
    $scope.customList=$scope.arr;*/
  });
  $scope.bgColor = [
    {"background-color": "#D76959"},
    {"background-color": "#76A6DF"},
    {"background-color": "#E7B45F"},
    {"background-color": "#5CBBA4"}
  ];
  $scope.getCustomSuc = function (data) {
    console.log(data);
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].colorId = i % 4;
    }
    $scope.customList = $scope.customList.concat(data.list);
    $scope.page++;
    $scope.canLoad = data.hasNextPage;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  }
  $scope.getCustom = function () {
    var data = {
      appUserId: $scope.info.id,
      businessId: $scope.info.businessId,
      page: $scope.page,
      rows: 20
    };
    if ($scope.type == 1) {
      $httpCustom.leijiCustom(data, $scope.getCustomSuc, $scope.error);
    } else {
      $httpCustom.huanxingCustom(data, $scope.getCustomSuc, $scope.error);
    }
  };
  $scope.doInfinite = function () {
    $scope.getCustom();
  };
  $scope.goCustom = function () {
    $state.go('myCustom');
  };
  $scope.goInfo = function ($event) {
    var a = $event.target;
    var vipId = a.getAttribute('data-vipId');
    $state.go('myCustom-info', {'vipId': vipId});
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
})