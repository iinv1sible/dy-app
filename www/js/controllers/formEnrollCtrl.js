angular.module('starter.controllers.formEnrollCtrl', []).controller('formEnrollCtrl', function ($scope,  $hezuo, $showAlert, $state, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.data.customerName = $scope.info.surname;
    $scope.data.phone = $scope.info.username;
    $scope.data.departmentName = $scope.info.businessName;
    $scope.data.post = $scope.info.appTypeName;
    $scope.data.num = '';
  })
  $scope.submit = function () {
    if (!$scope.data.customerName) {
      $showAlert.alert('请输入姓名');
    } else if ((($scope.data.phone) && ($scope.data.phone.toString().length != 6) && ($scope.data.phone.toString().length != 11)) || (!$scope.data.phone)) {
      $showAlert.alert('请输入正确的手机号');
    } else if (!$scope.data.departmentName) {
      $showAlert.alert('请输入单位');
    } else if (!$scope.data.post) {
      $showAlert.alert('请输入职位');
    } else if (!$scope.data.num) {
      $showAlert.alert('请输入报名人数');
    } else {
      $hezuo.formEnroll(JSON.stringify($scope.data), function (data) {
        if (data.msgCode==0) {
          $showAlert.alert('提交成功');
          $ionicHistory.goBack();
        } else {
          $showAlert.alert(data.msgMessage?data.msgMessage:'提交失败');
        }
      }, function (data) {
        if (data && data.msgMessage) {
          $showAlert.alert(data.msgMessage)
        } else {
          $showAlert.alert('提交失败，请检查网络');
        }
      });
    }
  }
  
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
})