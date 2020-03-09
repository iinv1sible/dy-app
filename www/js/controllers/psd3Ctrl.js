angular.module('starter.controllers.psd3Ctrl', []).controller('psd3Ctrl', function ($scope, $timeout, $ionicPopup, $http, $httpPsd, $state, $stateParams, $showAlert, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.password = {};
  });

  $scope.showAlert = function (txt) {
    var alertPopup = $showAlert.alert(txt);
  };
  $scope.showConfirm = function (txt) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      title: $T.T('易订'),
      template: $T.T(txt),
      buttons: [
        {
          text: $T.T('确认'),
          type: 'button-assertive',
          onTap: function () {
            $state.go('login');
          }
        }
      ]
    });
  };
  $scope.error = function (data, status) {
    console.log(data)
    if (status == 400) {
      $scope.showAlert(data.msgMessage);
      if(data.msgCode==2){
        $scope.password.psd1 = '';
        $scope.password.psd2 = '';
      }
      $scope.buttonDis = false;
    } else {
      $scope.showAlert('发送失败，请检查网络');
      $scope.buttonDis = false;
    }
  };
  $scope.success = function () {
    $scope.password.psd1 = '';
    $scope.password.psd2 = '';
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('loginData');
    $scope.showConfirm('修改成功');
  };
  $scope.cancel = function () {
    $state.go('tab.dash');
  };
  $scope.check = function () {
    console.log($scope.password);
    if ($scope.password.psd1.length < 6) {
      $scope.showAlert('密码长度不足6位');
      $scope.password.psd1 = '';
      $scope.password.psd2 = '';
    } else {
      if ($scope.password.psd1 == $scope.password.psd2) {
        $scope.data.appUserPassword = $scope.password.psd1;
        $scope.data.appUserId = $scope.info.id;
        $httpPsd.changePwd($scope.data, $scope.success, $scope.error);
      } else {
        $scope.password.psd1 = '';
        $scope.password.psd2 = '';
        $scope.showAlert('密码输入不一致');
      }
    }
  }
})