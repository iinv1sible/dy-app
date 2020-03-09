angular.module('starter.controllers.contactUsYiCtrl', []).controller('contactUsYiCtrl', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {
  $scope.data = {};
  $scope.data.imageUrl = '';
  $scope.submit = function () {
    if ($scope.data.detail && $scope.data.phone) {
      for (var key in $scope.data) {
        $scope.data[key] = '';
      }
      $state.go('tab.account');
      $showAlert.alert('提交成功');
    } else {
      $showAlert.alert('请将内容填写完整');
    }
    ;
  };
  $scope.submitSuccess = function () {

  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
})