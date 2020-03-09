angular.module('starter.controllers.clueMarketerListCtrl', []).controller('clueMarketerListCtrl', function ($scope, $http, $httpClue, $ionicPopup, $showAlert, $state, $stateParams,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.appUserData = {
      'businessId': $scope.info.businessId,
      'appUserId': $scope.info.id
    };
    $scope.data = {};
    $scope.data.keyNo = $stateParams.keyNo;
    $scope.data.status = $stateParams.status;
    $scope.data.statusName = $stateParams.statusName;
    $scope.data.appUserId = $scope.info.id;
    $scope.data.businessId = $scope.info.businessId;
    $httpClue.getAppUserList($scope.appUserData, $scope.getAppUserListSuccess);
  })
  $scope.check = function (index, $event) {
    var isCheck = $scope.appUserList[index].isCheck;
    if (isCheck == 1) {
      $scope.appUserList[index].isCheck = 0;
      $scope.data.newAppUserId = '';
      $scope.data.newAppUserName = '';
      $scope.data.newAppUserPhone = '';
    } else {
      $scope.data.newAppUserId = $scope.appUserList[index].appUserId;
      $scope.data.newAppUserName = $scope.appUserList[index].appUserName;
      $scope.data.newAppUserPhone = $scope.appUserList[index].appUserPhone;
      $scope.appUserList[index].isCheck = 1;
      for (i = 0; i < $scope.appUserList.length; i++) {
        if (i != index) {
          $scope.appUserList[i].isCheck = 0;
        }
      }
    }
  };
  $scope.commit = function () {
    $httpClue.assign($scope.data, $scope.assignSuccess);
  };
  $scope.getAppUserListSuccess = function (data) {
    $scope.appUserList = data;
  }
  $scope.assignSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.makeSure('指派成功');
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('指派失败');
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
            $state.go('myClue');
          }
        }
      ]
    });
  };
})