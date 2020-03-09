angular.module('starter.controllers.accountMyCustomInfoTagCtrl', []).controller('AccountMyCustomInfoTagCtrl', function ($scope, $state, $stateParams, $http, $httpCustom, $ionicPopover, $showAlert) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.addShowTag = false;
    console.log($stateParams.tag);
    console.log($stateParams.vipId);
    if (!$stateParams.tag) {
      $scope.tag = '';
    } else {
      $scope.tag = $stateParams.tag.toString();
    }
    $scope.vipId = $stateParams.vipId;
    $scope.data = {};
    if ($scope.tag == '') {
      $scope.tagListArr = [];
      $scope.tagList = [];
    } else {
      $scope.tagListArr = $scope.tag.split(',');
      $scope.tagList = $scope.tag.split(',');
      for (var i = 0; i < $scope.tagList.length; i++) {
        var tagName = $scope.tagList[i];
        $scope.tagList[i] = {};
        $scope.tagList[i].tagName = tagName;
        $scope.tagList[i].id = i;
      }
      ;
    }
    $httpCustom.customInfo($scope.vipId, $scope.customInfoSuccess, $scope.error);
  });
  $scope.remove = function ($event) {
    var tagId = +$event.target.getAttribute('data-id');
    $scope.tagList.splice(tagId, 1);
    $scope.tagListArr.splice(tagId, 1);
    $scope.customInfo.tag = $scope.tagListArr.toString();
    $httpCustom.updateCustom($scope.customInfo, $scope.updateCustomSuccess, $scope.error);
    console.log($scope.customInfo);
  };
  $scope.addTagName = function () {
    console.log($scope.data.tagName);
    $scope.addShowTag = false;
    var txt = $scope.data.tagName;
    $scope.tagListArr.push(txt);
    $scope.tagList.push({'tagName': txt, 'id': $scope.tagList.length});
    $scope.customInfo.tag = $scope.tagListArr.toString();
    $httpCustom.updateCustom($scope.customInfo, $scope.updateCustomSuccess, $scope.error);
    console.log($scope.customInfo);
  };
  $scope.addTagShow = function () {
    $scope.addShowTag = true;
  };
  $scope.updateCustomSuccess = function (data) {
    $scope.data.tagName = '';
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