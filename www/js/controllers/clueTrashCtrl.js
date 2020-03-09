angular.module('starter.controllers.clueTrashCtrl', []).controller('clueTrashCtrl', function ($scope, $http, $httpClue, $interval, $ionicPopup, $showAlert, $state, $ionicScrollDelegate,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $ionicScrollDelegate.scrollTop();
    $scope.data = {};
    $scope.data.keyNo = '';
    $scope.data.status = '';
    $scope.data.statusName = '';
    $scope.myTrashClueList = [];
    $scope.isShow = true;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data.appUserId = $scope.info.id;
    $scope.myClueData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "type": 0,
      "page": 1,
      "rows": 20,
      "isAll": $scope.info.operationType
    }
    $httpClue.getMyClue($scope.myClueData, $scope.getMyTrashClueDateSuccess);
  })
  $scope.$on('$ionicView.beforeLeave', function () {
    $interval.cancel($scope.timer);
  });
  $scope.goSearch = function () {
    $state.go('clueSearch');
  };
  $scope.goDetail = function ($event) {
    var keyNo = $event.currentTarget.getAttribute('data-keyNo');
    $state.go('clueDetail', {'keyNo': keyNo});
  };
  $scope.doInfinite = function () {
    $httpClue.getMyClue($scope.myClueData, $scope.getMyTrashClueDateSuccess);
  };
  $scope.getMyTrashClueDateSuccess = function (data) {
    if (data != "") {
      $scope.myTrashClueList = $scope.myTrashClueList.concat(data.list);
      $scope.canLoad = data.hasNextPage;
      $scope.myClueData.page += 1;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    } else {
      $scope.myTrashClueList = null;
      $scope.canLoad = false;
      $scope.isShow = false;
    }
  };
  $scope.recover = function () {
    if ($scope.data.keyNo != '') {
      $scope.data.businessId = $scope.info.businessId;
      $httpClue.recoverClue($scope.data, $scope.recoverClueSuccess);
    } else {
      $showAlert.alert('请选择线索');
    }
  };
  $scope.showAlert = function (txt) {
    var alertPopup = $showAlert.alert(txt);
  };
  $scope.recoverClueSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.makeSure('恢复成功');
      $scope.myClueData = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        "type": 0,
        "page": 1,
        "rows": 20,
        "isAll": $scope.info.operationType
      };
      $scope.myTrashClueList = [];
      $httpClue.getMyClue($scope.myClueData, $scope.getMyTrashClueDateSuccess);
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('恢复失败');
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
            $scope.timer = $interval(function () {
              $state.go('myClue');
            }, 2000);
          }
        }
      ]
    });
  };
  $scope.check = function (index, $event) {
    var isCheck = $scope.myTrashClueList[index].isCheck;
    if (isCheck == 1) {
      $scope.myTrashClueList[index].isCheck = 0;
      $scope.data.keyNo = '';
      $scope.data.status = '';
      $scope.data.statusName = '';
    } else {
      $scope.data.keyNo = $scope.myTrashClueList[index].keyNo;
      $scope.data.status = $scope.myTrashClueList[index].status;
      $scope.data.statusName = $scope.myTrashClueList[index].statusName;
      $scope.myTrashClueList[index].isCheck = 1;
      for (i = 0; i < $scope.myTrashClueList.length; i++) {
        if (i != index) {
          $scope.myTrashClueList[i].isCheck = 0;
        }
      }
    }
  }
})