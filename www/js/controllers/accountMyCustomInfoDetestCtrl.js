angular.module('starter.controllers.accountMyCustomInfoDetestCtrl', []).controller('AccountMyCustomInfoDetestCtrl', function ($scope, $state, $stateParams, $http, $httpCustom, $ionicPopover, $showAlert) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.addShowDetest = false;
    console.log($stateParams.detest);
    console.log($stateParams.vipId);
    if (!$stateParams.detest) {
      $scope.detest = ''
    } else {
      $scope.detest = $stateParams.detest.toString();
    }
    $scope.vipId = $stateParams.vipId;
    $scope.data = {};
    if ($scope.detest == '') {
      $scope.detestListArr = [];
      $scope.detestList = [];
    } else {
      $scope.detestListArr = $scope.detest.split(',');
      $scope.detestList = $scope.detest.split(',');
      for (var i = 0; i < $scope.detestList.length; i++) {
        var detestName = $scope.detestList[i];
        $scope.detestList[i] = {};
        $scope.detestList[i].detestName = detestName;
        $scope.detestList[i].id = i;
      }
      ;
    }
    $httpCustom.customInfo($scope.vipId, $scope.customInfoSuccess, $scope.error);
  });
  $scope.remove = function ($event) {
    var detestId = +$event.target.getAttribute('data-id');
    $scope.detestList.splice(detestId, 1);
    $scope.detestListArr.splice(detestId, 1);
    $scope.customInfo.detest = $scope.detestListArr.toString();
    $httpCustom.updateCustom($scope.customInfo, $scope.updateCustomSuccess, $scope.error);
    console.log($scope.customInfo);
  };
  $scope.addDetestName = function () {
    console.log($scope.data.detestName);
    $scope.addShowDetest = false;
    var txt = $scope.data.detestName;
    $scope.detestListArr.push(txt);
    $scope.detestList.push({'detestName': txt, 'id': $scope.detestList.length});
    $scope.customInfo.detest = $scope.detestListArr.toString();
    $httpCustom.updateCustom($scope.customInfo, $scope.updateCustomSuccess, $scope.error);
    console.log($scope.customInfo);
  };
  $scope.addDetestShow = function () {
    $scope.addShowDetest = true;
  };
  $scope.updateCustomSuccess = function (data) {
    $scope.data.detestName = '';
    $showAlert.alert('更新成功');
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.customInfoSuccess = function (data) {
    $scope.customInfo = data;
  };

})