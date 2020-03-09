angular.module('starter.controllers.psd2Ctrl', []).controller('psd2Ctrl', function ($scope, $timeout, $ionicPopup, $http, $httpPsd, $state, $stateParams, $showAlert, $T) {
  console.log($stateParams);
  $scope.$on('$ionicView.beforeEnter', function () {
    //$scope.info=JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.password = {};
    $scope.data = $stateParams;
    $scope.isEasy = $stateParams.isEasy
    $scope.title = '请设置新的密码'
    if($scope.isEasy){
      $scope.title = '您的密码过于简单，存在盗号风险'
    }
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
  }
  $scope.check = function () {
    console.log($scope.password);
    if ($scope.password.psd1.length < 6) {
      $scope.showAlert('密码长度不足6位');
      $scope.password.psd1 = '';
      $scope.password.psd2 = '';
    } else {
      if ($scope.password.psd1 == $scope.password.psd2) {
        $scope.data.appUserPassword = $scope.password.psd1;
        if($scope.isEasy){
          $httpPsd.changePwd({
            appUserPassword: $scope.data.appUserPassword,
            appUserPhone: $scope.data.appUserPhone
          }, $scope.success, $scope.error);
        }else{
          $httpPsd.checkPwd($scope.data, $scope.success, $scope.error);
        }
      } else {
        $scope.password.psd1 = '';
        $scope.password.psd2 = '';
        $scope.showAlert('密码输入不一致');
      }
    }
  }
  $scope.showPwd = function($event,num){
    $event.stopPropagation()
    var type = $('#psd'+num).attr('type')
    console.log(type)
    if(type == 'password'){
      $('#psd'+num).attr('type', 'text')
      $('#psd'+num).next().addClass('icon-openeyes').removeClass('icon-closedeyes')
    }else{
      $('#psd'+num).attr('type', 'password')
      $('#psd'+num).next().addClass('icon-closedeyes').removeClass('icon-openeyes')
    }
  }
})