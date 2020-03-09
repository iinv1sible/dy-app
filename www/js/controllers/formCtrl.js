angular.module('starter.controllers.formCtrl', []).controller('formCtrl', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {
  $scope.data = {};
  $scope.submit = function () {
    if (!$scope.data.name) {
      $showAlert.alert('请输入您的姓名');
    } else if ((($scope.data.tel) && ($scope.data.tel.toString().length != 6) && ($scope.data.tel.toString().length != 11)) || (!$scope.data.tel)) {
      $showAlert.alert('请输入正确的手机号');
    } else if (!$scope.data.linkMan) {
      $showAlert.alert('请输入被推荐人姓名');
    } else if (!$scope.data.job) {
      $showAlert.alert('请输入被推荐人职务');
    } else if ((($scope.data.linkTel) && ($scope.data.linkTel.toString().length != 6) && ($scope.data.linkTel.toString().length != 11)) || (!$scope.data.linkTel)) {
      $showAlert.alert('请输入正确的被推荐人联系方式');
    } else if (!$scope.data.company) {
      $showAlert.alert('请输入被推荐单位');
    } else if (!$scope.data.city) {
      $showAlert.alert('请输入被推荐单位城市');
    } else {
      $hezuo.form($scope.data, $scope.submitSuccess, $scope.error);
    }
  }
  $scope.submitSuccess = function () {
    if ($scope.data.name && $scope.data.tel && $scope.data.job && $scope.data.company && $scope.data.linkMan && $scope.data.linkTel && $scope.data.city) {
      for (var key in $scope.data) {
        $scope.data[key] = '';
      }
      $state.go('tab.dash');
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