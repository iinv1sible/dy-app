angular.module('starter.controllers.rechargeCtrl', []).controller('RechargeCtrl', function ($scope,  $httpPsd, $showAlert, $ionicPopup, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.cardNo = null;
    $scope.data = {};
    $scope.data.phone = null;
    $scope.data.cardNo = null;
    $scope.data.businessId = $scope.info.businessId;
  });
  $scope.phoneChange = function () {
    if($scope.data.phone.length == 11){
      var reg = /^\d+$/;
      if(!$scope.data.phone || !reg.test($scope.data.phone)){
        $showAlert.alert('请输入正确的手机号');
      }else {
        $scope.data.key = $scope.data.phone;
        $httpPsd.getCrmUser($scope.data,$scope.getCrmUserSuccess, $scope.error);
      }
    }
  };
  $scope.cardNoChange = function () {
    if($scope.data.cardNo.length == 8){
      $scope.data.key = $scope.data.cardNo;
      $httpPsd.getCrmUser($scope.data,$scope.getCrmUserSuccess, $scope.error);
    }
  };
  $scope.getCrmUserSuccess = function (data) {
    console.log(data);
    if(data && data.code == "200"){
      $scope.data.cardNo = data.data.memberInfo.memberCode;
      $scope.cardNo = $scope.data.cardNo;
      $scope.data.vipName = data.data.memberInfo.memberName;
      if($scope.data.phone == null){
        $scope.data.phone = data.data.memberInfo.phone;
      }
    }else {
      $showAlert.alert('该会员不存在,请核对手机号');
    }
  };
  $scope.error = function (data) {
    if (data && data.Msg) {
      $showAlert.alert(data.Msg);
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
  $scope.check = function () {
    $scope.storeData = {};
    $scope.storeData.businessId = $scope.info.businessId;
    $scope.storeData.type = "2";
    $scope.storeData.memberCode = $scope.data.cardNo;
    $scope.storeData.appUserId = $scope.info.id;
    if($scope.storeData.memberCode == null||$scope.storeData.memberCode == ''){
      $showAlert.alert("会员卡号为空");
      return;
    }
    if($scope.cardNo != $scope.data.cardNo){
      var confirmPopup = $ionicPopup.confirm({
        cssClass: "er-popup",
        title: $T.T('会员卡号不匹配提醒'),
        template: $T.T('请注意，当前页面的会员卡号与手机号码对应的不是同一客户，请确认是否充值到该会员卡号中'),
        buttons: [
          {text: $T.T('取消')},
          {
            text: $T.T('确认'),
            type: 'button-assertive',
            onTap: function () {
              $httpPsd.payOrStore($scope.storeData,$scope.payOrStoreSuccess);
            }
          }
        ]
      });
    }else {
      $httpPsd.payOrStore($scope.storeData,$scope.payOrStoreSuccess);
    }
  };
  $scope.payOrStoreSuccess = function (data) {
    console.log(data);
    if(data && data.code == "200"){
      window.location.href = data.data.url;
    }else {
      $showAlert.alert(data.msg);
    }
  };
})
