angular.module('starter.controllers.vipListCtrl', []).controller('vipListCtrl', function ($scope, $http, $httpPsd, $ionicPopup, $showAlert, $state, $stateParams, $location) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.login = {}
    $scope.login.username = ''
    $scope.login.password = ''
    $scope.vipList = {};
    $scope.searchParams = $location.$$search
    if(!$scope.searchParams.createTime && sessionStorage['searchParams']){
      $scope.searchParams = JSON.parse(sessionStorage['searchParams'])
    }
    if($scope.searchParams.createTime){
      sessionStorage['searchParams'] = JSON.stringify($scope.searchParams)
      viewData.enableBack = false
      $scope.createTime = $stateParams.createTime = $scope.searchParams.createTime
      $scope.isFromWechat = true
      $httpPsd.getUserNameAndPwd({
        appUserId: $scope.searchParams.appUserId
      }, function(data){
        if(data){
          $scope.login.username = data.appUserPhone;
          $scope.login.password = data.appUserPassword;
          // 登录系统
          $httpPsd.login($scope.login, function(data){
            console.log(data);
            localStorage.setItem('info', JSON.stringify(data));
            $scope.info = JSON.parse(localStorage['info']);
            $httpPsd.getArea($scope.info, function(data){
              sessionStorage['resvOrderTypes'] = JSON.stringify(data.resvOrderTypes);
            }, $scope.error);
            $httpPsd.getYArea($scope.info, function(data){
              sessionStorage['userList'] = JSON.stringify(data.appUserList);
              sessionStorage['YresvOrderTypes'] = JSON.stringify(data.resvOrderTypes);
            }, $scope.error);
            $scope.thisDate = $stateParams.createTime.substr(0,10);
            $scope.appUserData = {
              'businessId': $scope.info.businessId,
              'appUserId': $scope.info.id,
              'createTime': $stateParams.createTime
            };
            $httpPsd.getSleepVipList($scope.appUserData, $scope.getSleepVipListSuccess);
          }, function(err){
            $showAlert.alert('获取用户信息失败');
          });
        }else{
          $showAlert.alert('网络错误');
        }
      }, function(){
        $showAlert.alert('网络错误');
      })
      return
    }
    $scope.info = JSON.parse(localStorage['info']);
    $scope.thisDate = $stateParams.createTime.substr(0,10);
    $scope.appUserData = {
      'businessId': $scope.info.businessId,
      'appUserId': $scope.info.id,
      'createTime': $stateParams.createTime
    };
    $httpPsd.getSleepVipList($scope.appUserData, $scope.getSleepVipListSuccess);
  })
  $scope.getSleepVipListSuccess = function(data){
    if(data != null && data != "" && data.length > 0){
      $scope.vipList = data;
    }
  };
  $scope.goVip = function (vipId){
    $state.go('myCustom-info', {'vipId': vipId});
  };
})