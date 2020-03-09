angular.module('starter.controllers.contactUsYouCtrl', []).controller('contactUsYouCtrl', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {
  $scope.data = {};
  $scope.submit = function () {
    if ($scope.data.customerCompany && $scope.data.customerName && $scope.data.customerPhone) {
      $hezuo.youjiang($scope.data, $scope.submitSuccess, $scope.error);
    } else {
      $showAlert.alert('请将内容填写完整');
    }
    ;
  };
  $scope.submitSuccess = function () {
    if ($scope.data.customerCompany && $scope.data.customerName && $scope.data.customerPhone) {
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
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
})