angular.module('starter.controllers.accountPersonTagCtrl', []).controller('AccountPersonTagCtrl', function ($scope, $state, $stateParams, $http, $httpPsd, $httpCustom, $ionicPopover, $showAlert) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.addShowTag = false;
    $scope.data = {};
    $scope.info = JSON.parse(localStorage['info']);
    $httpPsd.getTags($scope.info, $scope.getTagsSuccess, $scope.error);
  });
  $scope.$on('$ionicView.beforeLeave', function () {
    console.log(',' + $scope.tagList.toString());
    var data = {
      appUserId: $scope.info.id,
      newTag: ',' + $scope.tagList.toString()
    }
    $httpPsd.changeTags(data, $scope.updateSuccess, $scope.error);
  });
  $scope.removeRepeat = function (array) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
      //如果当前数组的第i已经保存进了临时数组，那么跳过，
      //否则把当前项push到临时数组里面
      if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    for (var a = 0; a < n.length; a++) {
      if (n[a] == '') {
        n.splice(a, 1);
      }
    }
    return n;
  };
  $scope.remove = function ($event) {
    var txt = +$event.target.getAttribute('data-tag');
    console.log(txt);
    $scope.tagList.splice(txt, 1);
    console.log($scope.tagList);
  };
  $scope.addHobbyName = function () {
    console.log($scope.data.hobbyName);
    if ($scope.data.hobbyName) {
      $scope.addShowHobby = false;
      var txt = $scope.data.hobbyName;
      $scope.tagList.push(txt);
      $scope.tagList = $scope.removeRepeat($scope.tagList);
      $scope.data.hobbyName = '';
    } else {
      $scope.addShowHobby = false;
    }
  };
  $scope.addHobbyShow = function () {
    $scope.addShowHobby = true;
  };
  $scope.updateSuccess = function (data) {
    console.log(111);
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      console.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.getTagsSuccess = function (data) {
    console.log(data);
    $scope.tagList = $scope.removeRepeat(data.userTag.split(','));
    console.log($scope.tagList);
  };

})