angular.module('starter.controllers.accountMyCustomInfoHobbyCtrl', []).controller('AccountMyCustomInfoHobbyCtrl', function ($scope, $state, $stateParams, $http, $httpCustom, $ionicPopover, $showAlert) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.addShowTag = false;
    console.log($stateParams);
    if (!$stateParams.hobby) {
      $scope.hobby = '';
    } else {
      $scope.hobby = $stateParams.hobby.toString();
    }
    $scope.vipId = $stateParams.vipId;
    $scope.data = {};
    if ($scope.hobby == '') {
      $scope.hobbyListArr = [];
      $scope.hobbyList = [];
    } else {
      $scope.hobbyListArr = $scope.hobby.split(',');
      $scope.hobbyList = $scope.hobby.split(',');
      for (var i = 0; i < $scope.hobbyList.length; i++) {
        var hobbyName = $scope.hobbyList[i];
        $scope.hobbyList[i] = {};
        $scope.hobbyList[i].hobbyName = hobbyName;
        $scope.hobbyList[i].id = i;
      }
      ;
    }
    $httpCustom.customInfo($scope.vipId, $scope.customInfoSuccess, $scope.error);
  });
  $scope.remove = function ($event) {
    var hobbyId = +$event.target.getAttribute('data-id');
    $scope.hobbyList.splice(hobbyId, 1);
    $scope.hobbyListArr.splice(hobbyId, 1);
    $scope.customInfo.hobby = $scope.hobbyListArr.toString();
    $httpCustom.updateCustom($scope.customInfo, $scope.updateCustomSuccess, $scope.error);
    console.log($scope.customInfo);
  };
  $scope.addHobbyName = function () {
    console.log($scope.data.hobbyName);
    $scope.addShowHobby = false;
    var txt = $scope.data.hobbyName;
    $scope.hobbyListArr.push(txt);
    $scope.hobbyList.push({'hobbyName': txt, 'id': $scope.hobbyList.length});
    $scope.customInfo.hobby = $scope.hobbyListArr.toString();
    $httpCustom.updateCustom($scope.customInfo, $scope.updateCustomSuccess, $scope.error);
    console.log($scope.customInfo);
  };
  $scope.addHobbyShow = function () {
    $scope.addShowHobby = true;
  };
  $scope.updateCustomSuccess = function (data) {
    $scope.data.hobbyName = '';
    $showAlert.alert('更新成功');
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      console.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.customInfoSuccess = function (data) {
    $scope.customInfo = data;
  };

})