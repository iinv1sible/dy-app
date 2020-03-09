angular.module('starter.controllers.todayRemindCtrl', []).controller('todayRemindCtrl', function ($scope, $state, $httpPsd, $showAlert, $location, $operation) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.remindList = []
    $scope.data = {}
    $scope.info = {}
    $scope.keyNo = ''
    $scope.resvOrder = ''
    $scope.orderType = 0
    $httpPsd.getTodayRemind({
      appUserId: $location.$$search.appUserId,
      remindDate: $location.$$search.remindDate
    }, function(data){
      $scope.remindList = data
    }, $scope.error)
  })

  $scope.goDetail = function(keyNo, resvOrder, orderType){
    $scope.keyNo = keyNo
    $scope.resvOrder = resvOrder
    $scope.orderType = orderType
    // 获取当前用户名密码
    $scope.data.username = '';
    $scope.data.password = '';
    $httpPsd.getUserNameAndPwd({
      appUserId: $location.$$search.appUserId
    }, function(data){
      if(data){
        $scope.data.username = data.appUserPhone;
        $scope.data.password = data.appUserPassword;
        // 登录系统
        $httpPsd.login($scope.data, function(data){
          console.log(data);
          localStorage.setItem('info', JSON.stringify(data));
          console.log(JSON.parse(localStorage.getItem('info')).username);
          localStorage.setItem('loginData', JSON.stringify($scope.data));
          // 登陆成功 获取餐别区域等  宴会餐别拆分上线后需要改
          $scope.info = data
          $httpPsd.getArea($scope.info, $scope.areaSuccess, $scope.error);
        }, function(err){
          $showAlert.alert('获取用户信息失败');
        });
      }else{
        $showAlert.alert('网络错误');
      }
    }, $scope.error)
  }
  $scope.error = function (){
    $showAlert.alert('网络错误');
  }
  
  $scope.areaSuccess = function (data) {
    $httpPsd.getYArea($scope.info, $scope.YareaSuccess, $scope.error);
    $operation.getHotel($scope.info.id, $scope.getHotelSuccess, $scope.error);
    console.log(data.mealTypes);
    var mta = data.mealTypes;
    mta.sort(function (a, b) {
      return (a.resvEndTime.slice(0, 2) * 60 + a.resvEndTime.slice(3) * 1) - (b.resvEndTime.slice(0, 2) * 60 + b.resvEndTime.slice(3) * 1)
    });
    console.log(mta);
    sessionStorage['mealTypes'] = JSON.stringify(mta);
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var now = 60 * hour + min;
    sessionStorage['resvOrderTypes'] = JSON.stringify(data.resvOrderTypes);
    for (var i = 0; i < mta.length; i++) {
      if (i == mta.length - 1) {
        $scope.meal = mta[i].mealTypeName;
        sessionStorage['mealTypeName'] = $scope.meal;
        $scope.resvStartTime = mta[i].resvStartTime;
        sessionStorage['resvStartTime'] = $scope.resvStartTime;
        $scope.resvEndTime = mta[i].resvEndTime;
        sessionStorage['resvEndTime'] = $scope.resvEndTime;
        $scope.mealTypeId = mta[i].id;
        sessionStorage['mealTypeId'] = $scope.mealTypeId;
      } else if ((now - (mta[i].resvEndTime.slice(0, 2) * 60 + mta[i].resvEndTime.slice(3) * 1)) < 0) {
        $scope.meal = mta[i].mealTypeName;
        sessionStorage['mealTypeName'] = $scope.meal;
        $scope.resvStartTime = mta[i].resvStartTime;
        sessionStorage['resvStartTime'] = $scope.resvStartTime;
        $scope.resvEndTime = mta[i].resvEndTime;
        sessionStorage['resvEndTime'] = $scope.resvEndTime;
        $scope.mealTypeId = mta[i].id;
        sessionStorage['mealTypeId'] = $scope.mealTypeId;
        break;
      }
    }
    console.log(sessionStorage['mealTypeName']);
    sessionStorage['mealYTypeName'] = sessionStorage['mealTypeName'];
  };
  $scope.YareaSuccess = function (data) {
    sessionStorage['userList'] = JSON.stringify(data.appUserList);
    sessionStorage['YresvOrderTypes'] = JSON.stringify(data.resvOrderTypes);
    // 跳转详情页
    localStorage['isWechat'] = 1
    if($scope.orderType == 2){
      $state.go('myOrder-yDetail', {'resvOrder': $scope.resvOrder, 'batchNo': $scope.keyNo, 'type': 2, 'isWechat': 1});
    }else{
      $state.go('clueDetail', {'keyNo': $scope.keyNo, 'isWechat': 1});
    }
  };
  $scope.getHotelSuccess = function (data) {
    if (data.length == 1) {
      localStorage['changeHotel'] = 0;
    } else {
      localStorage['changeHotel'] = 1;
    }
    ;
    console.log(localStorage['changeHotel']);
  };
  $scope.freshTime = function () {
    var date = new Date();
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    ;
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d
    }
    ;
    var dateString = date.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
})