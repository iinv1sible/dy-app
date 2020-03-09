angular.module('starter.controllers.formJixianCtrl', []).controller('formJixianCtrl', function ($scope,  $hezuo, $showAlert, $state, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.data.customerName = $scope.info.surname;
    $scope.data.phone = $scope.info.username;
    $scope.data.departmentName = $scope.info.businessName;
    $scope.data.post = $scope.info.appTypeName;
  })
  $scope.submit = function () {
    if (!$scope.data.customerName) {
      $showAlert.alert('请输入姓名');
    } else if (!$scope.data.post) {
      $showAlert.alert('请输入职位');
    } else if (!$scope.data.departmentName) {
      $showAlert.alert('请输入单位名称');
    } else if (!$scope.data.phone) {
      $showAlert.alert('请输入联系电话');
    } else {
      $hezuo.guanggao({
        customerName: $scope.data.customerName,
        phone: $scope.data.phone,
        departmentName: $scope.data.departmentName,
        post: $scope.data.post
      }, function(data){
        if(data.msgCode==0){
          $showAlert.alert('感谢您的咨询，极鲜网顾问会第一时间跟您联系');
          $ionicHistory.goBack();
        }else{
          $showAlert.alert(data.msg?data.msg:'提交失败');
        }
      }, function(err){
        $showAlert.alert('提交失败');
      })
    }
  }
  
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
})