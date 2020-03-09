angular.module('starter.controllers.myClueCtrl', []).controller('MyClueCtrl', function ($scope, $http, $httpClue, $ionicPopup, $showAlert, $state) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.myClueList = [];
    $scope.isShow = true;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.title = $scope.info.operationType == 0 ? '我的线索' : '全店线索';
    $scope.myClueData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "type": 1,
      "page": 1,
      "rows": 20,
      "isAll": $scope.info.operationType
    }
    $httpClue.getMyClue($scope.myClueData, $scope.getMyClueDateSuccess);
  })
  $scope.goTrash = function () {
    $state.go('clueTrash');
  }
  $scope.goDetail = function ($event) {
    // if ($event.target === $event.currentTarget) {
    //   //从绑定目标触发
    // }
    var keyNo = $event.currentTarget.getAttribute('data-keyNo');
    $state.go('clueDetail', {'keyNo': keyNo});
  };
  $scope.doInfinite = function () {
    $httpClue.getMyClue($scope.myClueData, $scope.getMyClueDateSuccess);
  };
  $scope.goIndex = function () {
    $state.go('tab.dash')
  };
  $scope.getMyClueDateSuccess = function (data) {
    if (data != "") {
      $scope.myClueList = $scope.myClueList.concat(data.list);
      $scope.canLoad = data.hasNextPage;
      $scope.myClueData.page += 1;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    } else {
      $scope.myClueList = null;
      $scope.canLoad = false;
      $scope.isShow = false;
    }
  }
})