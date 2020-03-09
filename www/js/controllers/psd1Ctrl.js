angular.module('starter.controllers.psd1Ctrl', []).controller('psd1Ctrl', function ($scope, $interval, $ionicPopup, $http, $httpPsd, $state, $showAlert, $T) {
  $scope.data = {};
  $scope.showAlert = function (txt) {
    var alertPopup = $showAlert.alert(txt);
  };
  $scope.text = '获取验证码';
  $scope.buttonDis = false;
  $scope.nextT = true;
  $scope.numT = true;
  $scope.write = function () {
    if ($scope.data.num.length == 4) {
      $scope.numT = false;
    } else {
      $scope.numT = true;
    }
  };
  var i = 60;
  $scope.success = function () {
    $scope.nextT = false;
    var timer = $interval(function () {
      if (i <= 1) {
        $interval.cancel(timer);
        $scope.buttonDis = false;
        $scope.text = '获取验证码';
        i = 60;
        return;
      }
      i--;
      $scope.text = `${$T.T('已发送')}(` + i + 's)';
    }, 1000)
  };
  $scope.success1 = function () {
    $state.go('psd2', {'appUserPhone': $scope.data.app_user_phone, 'appUserCode': $scope.data.num});
  };
  $scope.error = function (data, status) {
    if (status == 400) {
      $scope.showAlert(data.msgMessage);
      $scope.buttonDis = false;
    } else {
      $scope.showAlert('发送失败，请检查网络');
      $scope.buttonDis = false;
    }
  };

  $scope.getNum = function () {
    //console.log($scope.data);
    $scope.buttonDis = true;
    $httpPsd.getNum($scope.data, $scope.success, $scope.error);
  };
  $scope.next = function () {
    //console.log($scope.data);
    $httpPsd.next($scope.data, $scope.success1, $scope.error);
  }
})