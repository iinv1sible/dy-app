angular.module('starter.controllers.marketerListCtrl', []).controller('marketerListCtrl', function ($scope, $http, $httpClue, $ionicPopup, $showAlert, $state, $stateParams,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.appUserData = {
      'businessId': $scope.info.businessId,
      'appUserId': $stateParams.appUserId
    };
    $scope.data = {};
    $scope.data.vipId = $stateParams.vipId;
    $httpClue.getAppUserList1($scope.appUserData, $scope.getAppUserListSuccess);
  })
  $scope.check = function (index, $event) {
    var isCheck = $scope.appUserList[index].isCheck;
    if (isCheck == 1) {

    } else {
      $scope.data.newAppUserId = $scope.appUserList[index].appUserId;
      $scope.data.newAppUserName = $scope.appUserList[index].appUserName;
      $scope.appUserList[index].isCheck = 1;
      for (i = 0; i < $scope.appUserList.length; i++) {
        if (i != index) {
          $scope.appUserList[i].isCheck = 0;
        }
      }
    }
  };
  $scope.commit = function () {
    $scope.data.operateUserId = $scope.info.id
    $httpClue.updateVipAppUser($scope.data, $scope.updateVipAppUserSuccess);
  };
  $scope.getAppUserListSuccess = function (data) {
    $scope.appUserList = data;
    $scope.data.newAppUserId = $scope.appUserList[0].appUserId;
    $scope.data.newAppUserName = $scope.appUserList[0].appUserName;
    for(var i=0;i<data.length;i++){
      if(data[i].appUserId == $stateParams.appUserId){
        $scope.appUserList[i].isCheck = 1;
      }
    }
    // if($stateParams.appUserId != 0){
    //   $scope.appUserList[0].isCheck = 1;
    // }
  }
  $scope.updateVipAppUserSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.makeSure('更新成功');
    } else {
      if (data.msgMessage) {
        $scope.showAlert(data.msgMessage);
      } else {
        $scope.showAlert('更新失败');
      }
    }
  };
  $scope.makeSure = function (txt) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      title: $T.T('易订'),
      template: $T.T(txt),
      buttons: [
        {
          text: $T.T('确认'),
          type: 'button-assertive',
          onTap: function () {
            $state.go('myCustom-info', {'vipId': $stateParams.vipId});
          }
        }
      ]
    });
  };
})