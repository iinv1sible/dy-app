angular.module('starter.controllers.chatsDetailCtrl', []).controller('ChatsDetailCtrl', function ($scope, $ionicPopover, $stateParams, $ionicLoading, $http, $chat, $showAlert, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.saleList = [];
    $scope.starttime = $stateParams.starttime;
    $scope.endtime = $stateParams.endtime;
    $scope.businessList = [];
    $scope.waibuShow = false;
    $scope.weekNum = $scope.todayWeek();
    $scope.info = JSON.parse(localStorage['info']);
    $scope.langEN = localStorage['lang']=='en'?true:false;
    console.log($scope.info.appModuleSet);
    if ($scope.info.appModuleSet) {
      if ($scope.info.appModuleSet.indexOf(7) != -1) {
        $scope.showA = true;
      } else {
        $scope.showA = false;
      }
      if ($scope.info.appModuleSet.indexOf(6) != -1) {
        $scope.boss = true;
      } else {
        $scope.boss = false;
      }
    } else {
      $scope.boss = false;
      $scope.showA = false;
    }
    $scope.brandType = $scope.info.brandType * 1;
    $scope.businessId = $scope.info.businessId;
    $scope.getRankingData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "qryType": 0,
      "qryType2": 0,
      "starttime": '',
      'endtime': ''
    };
    $scope.getRankingListData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "qryType": 0,
      "qryType2": 0,
      "starttime": '',
      'endtime': ''
    };
    $scope.getBusinessRankingData = {
      "brandType": 0,
      "businessId": $stateParams.businessId,
      "qryType": $stateParams.qryType,
      "qryType2": $stateParams.qryType2,
      'starttime': $scope.starttime,
      'endtime': $scope.endtime
    };
    $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
  });
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.todayWeek = function () {
    var d = (new Date().getTime() + 1) - (new Date(new Date().getFullYear(), 0, 1).getTime());
    var w = new Date(new Date().getFullYear(), 0, 1).getDay();
    var tw = new Date().getDay();
    var dNum = Math.ceil(d / 1000 / 60 / 60 / 24);
    console.log(dNum);
    dNum = dNum - 7 + w;
    dNum = dNum - tw - 1;
    var wNum = 0;
    wNum = dNum / 7 + 2;
    return wNum;
  };
  $scope.getBusinessRankSuccess = function (data) {
    console.log(data);
    var sum = 0;
    for (var i = 0; i < data.rankList.length; i++) {
      data.rankList[i].color = $scope.color();
      sum += data.rankList[i].orderNum * 1;
    }
    for (var i = 0; i < data.rankList.length; i++) {
      data.rankList[i].width = data.rankList[i].orderNum * 1 / sum * 100;
    }
    $scope.saleList = data.rankList;
    $ionicLoading.hide();
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.color = function () {
    var a = Math.ceil(4 * Math.random());
    switch (a) {
      case 1:
        return "#82C97C";
        break;
      case 2:
        return "#76A6DF";
        break;
      case 3:
        return "#E7B45F";
        break;
      case 4:
        return "#5CBBA4";
        break;
    }
  };
})