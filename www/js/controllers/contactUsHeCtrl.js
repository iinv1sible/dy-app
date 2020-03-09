angular.module('starter.controllers.contactUsHeCtrl', []).controller('contactUsHeCtrl', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state, $stateParams, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  })
  $scope.checkbox = {};
  $scope.data = {};
  if($stateParams.type == 2){
    $scope.checkbox.two = true
  }
  $scope.submit = function () {
    var txt = '';
    if ($scope.checkbox.one) {
      txt += '区域销售合作,';
    }
    if ($scope.checkbox.two) {
      txt += '平台广告发布,';
    }
    if ($scope.checkbox.three) {
      txt += '软件产品对接,';
    }
    if ($scope.checkbox.four) {
      txt += '其他';
    }
    $scope.data.cooperationMethod = txt;
    console.log($scope.checkbox);
    if ($scope.data.customerName && $scope.data.phone) {
      $hezuo.hezuo($scope.data, $scope.submitSuccess, $scope.error);
    } else {
      $showAlert.alert('请将内容填写完整');
    }
  }
  $scope.submitSuccess = function () {
    if ($scope.data.customerName && $scope.data.phone) {
      for (var key in $scope.data) {
        $scope.data[key] = '';
      }
      for (var key in $scope.checkbox) {
        $scope.checkbox[key] = false;
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
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
})