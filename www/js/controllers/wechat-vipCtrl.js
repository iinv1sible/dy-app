angular.module('starter.controllers.wechatVipCtrl', []).controller('wechatVipCtrl', function ($scope, $state, $httpPsd, $showAlert, $location, $httpCustom, $nongli, $httpWechat) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $scope.data = {}
      $scope.anniversary = []
      $scope.lastData = {}
      $scope.hasLastData = false
      $scope.wineList = []
      $scope.login = {}
      $scope.login.username = ''
      $scope.login.password = ''
      $httpPsd.getUserNameAndPwd({
        appUserId: $location.$$search.appUserId
      }, function(data){
        if(data){
          $scope.login.username = data.appUserPhone;
          $scope.login.password = data.appUserPassword;
          // 登录系统
          $httpPsd.login($scope.login, function(data){
            console.log(data);
            localStorage.setItem('info', JSON.stringify(data));
            $scope.info = JSON.parse(localStorage['info']);
            $httpCustom.customInfo($location.$$search.vipId, $scope.getVipSuccess)
            $httpCustom.customGetDay({
              vipId: $location.$$search.vipId,
              businessId: $scope.info.businessId
            }, $scope.getDaySuccess)
            $httpCustom.getCustomCount({
              appUserId: $location.$$search.appUserId,
              vipId: $location.$$search.vipId,
              businessId: $scope.info.businessId,
              type: 0,
              qryType: 1
            }, $scope.getCountSuccess)
            $httpCustom.lastOrder({
              vipId: $location.$$search.vipId,
              appUserId: $location.$$search.appUserId,
              meetingStatus: 1
            }, $scope.getLastSuccess);
            $httpWechat.getWineListV2({
              vipId: $location.$$search.vipId,
            }, function(data){
              $scope.wineList = data
            })
          }, function(err){
            $showAlert.alert('获取用户信息失败');
          });
        }else{
          $showAlert.alert('网络错误');
        }
      }, function(){
        $showAlert.alert('网络错误');
      })
  })
  $scope.getLastSuccess = function(data){
    if(data.resvOrder){
      $scope.hasLastData = true
      $scope.lastData = data
    }
  }
  $scope.getVipSuccess = function (data) {
    console.log(data)
    if(!data.imageUrl){
      data.imageUrl = 'images/icon_avatar@3x.png'
    }
    if(data.vipBirthday && data.vipBirthdayNl){
      var a = new Date(data.vipBirthday);
      var y = a.getFullYear();
      var m = a.getMonth() + 1;
      var d = a.getDate();
      data.vipBirthdayNl = $nongli.toLunar(y, m, d).toString();
      if(data.hideBirthdayYear == 1 && data.birthFlag == 0){
        data.vipBirthday1 = data.vipBirthday.substr(5, data.vipBirthday.length-5);
      }else if(data.hideBirthdayYear == 1 && data.birthFlag == 1){
        data.vipBirthday1 = data.vipBirthdayNl.substr(5,data.vipBirthdayNl.length-1);
      }else if(data.hideBirthdayYear == 0 &&data.birthFlag == 1){
        data.vipBirthday1 = data.vipBirthdayNl;
      }else if(data.hideBirthdayYear == 0 &&data.birthFlag == 0){
        data.vipBirthday1 = data.vipBirthday;
      }
    }
    data.createdAt = $scope.freshTime(data.createdAt);
    $scope.data = data
  }
  $scope.freshTime = function (date) {
    var date = new Date(date);
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    var dateString = date.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  $scope.getDaySuccess = function(data){
    for (var i = 0; i < data.length; i++) {
      switch (data[i].anniversaryType * 1) {
        case 1:
          data[i].anniversaryName = '生日';
          break;
        case 4:
          data[i].anniversaryName = '过寿';
          break;
        case 5:
          data[i].anniversaryName = '求婚日';
          break;
        case 6:
          data[i].anniversaryName = '订婚日';
          break;
        case 7:
          data[i].anniversaryName = '结婚日';
          break;
        case 8:
          data[i].anniversaryName = '周年庆';
          break;
        default:
          data[i].anniversaryName = '其他';
      }
      var a = new Date(data[i].anniversaryDate);
      var y = a.getFullYear();
      var m = a.getMonth() + 1;
      var d = a.getDate();
      if (m < 10) {
        m = '0' + m
      }
      ;
      if (d < 10) {
        d = '0' + d
      }
      ;
      data[i].anniversaryTime = y + '-' + m + '-' + d;
      $scope.nlDate = $nongli.toLunar(y, m, d).toString();
      if(data[i].anniversaryYearFlag == 1 && data[i].calendarType == 0){
        data[i].anniversaryTime = data[i].anniversaryTime.substr(5,data[i].anniversaryTime.length-5);
      }else if(data[i].anniversaryYearFlag == 1 && data[i].calendarType == 1){
        data[i].anniversaryTime = $scope.nlDate.substr(5,$scope.nlDate.length-1);
      }else if(data[i].anniversaryYearFlag == 0 && data[i].calendarType == 1){
        data[i].anniversaryTime = $scope.nlDate;
      }else if(data[i].anniversaryYearFlag == 0 && data[i].calendarType == 0){
        data[i].anniversaryTime = data[i].anniversaryTime;
      }
    }
    $scope.anniversary = data
  }
  $scope.getCountSuccess = function(data){
    data.allOrderAmt = (data.allOrderAmt * 1 / 10000).toFixed(2);
    $scope.count = data
  }
})