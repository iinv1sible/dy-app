angular.module('starter.controllers.accountCtrl', []).controller('AccountCtrl', function ($scope, $state, $httpPsd, $ionicPopover, $showAlert, $rootScope) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.info = $scope.info = JSON.parse(localStorage['info']);
    $scope.isJk = $scope.info.isJk;
    console.log($scope.info)
    $httpPsd.getWxNoticeNum($scope.info, $scope.getWxNoticeNumSuccess, $scope.error);
    if ($scope.info.appModuleSet) {
      var module = $scope.info.appModuleSet;
      if (module.indexOf(4) != -1) {
        $scope.tongzhi = true;
      } else {
        $scope.tongzhi = false;
      }
      ;
    } else {
      $scope.tongzhi = false;
    }
    if ($scope.info.imageUrl == '') {
      $scope.imageUrl = 'images/icon_avatar@3x.png';
    } else {
      $scope.imageUrl = $scope.info.imageUrl;
    }
  });
  $scope.getWxNoticeNumSuccess = function (data) {
    if (localStorage['messageNum'] == undefined) {
      localStorage['messageNum'] = 0;
    }
    $scope.messageNum = Number(data.orderNum) + Number(data.num) + Number(localStorage['messageNum']);
  }
  $scope.goTong = function () {
    if ($scope.tongzhi) {
      $state.go('tab.account-message-detail');
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  }
  $scope.goPage = function (url) {
    $state.go(url);
  }

})
