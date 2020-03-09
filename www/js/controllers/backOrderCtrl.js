angular.module('starter.controllers.backOrderCtrl', []).controller('backOrderCtrl', function ($scope, $http, $ionicHistory, $httpPsd, $httpClue, $ionicPopup, $ionicPopover, $showAlert, $state, $stateParams, $ionicLoading, $qupload, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.data = $stateParams;
    console.log($stateParams)
    $scope.tousuShow = false;
    $scope.data.updateAppUserId = $scope.info.id;
    $scope.data.businessId = $scope.info.businessId;
    $scope.data.updateAppUserName = $scope.info.surname;
    $scope.data.bataiScore = 0;
    $scope.data.salesScore = 0;
    $scope.data.serviceScore = 0;
    $scope.data.dishScore = 0;
    $scope.data.businessId = $scope.info.businessId;
    $scope.data.weddingCompanyScore = 0;
    $scope.data.complain = 0;
    $scope.showState = false;
    $scope.getOrderData = $stateParams.getOrderData;
    $scope.orderList = $stateParams.orderList;
    if ($stateParams.getOrderData != null && $stateParams.isYanhui == false) {
      $scope.getOrderData.isCanyin = true;
      $scope.getOrderData.isYanhui = false;
      $scope.getOrderData.showTime = $stateParams.getOrderData.showTime;
    }
    if ($stateParams.getOrderData != null && $stateParams.isYanhui == true) {
      $scope.getOrderData.isCanyin = false;
      $scope.getOrderData.isYanhui = true;
      $scope.getOrderData.showYanhui = $stateParams.getOrderData.showYanhui;
      $scope.getOrderData.starttime = $stateParams.getOrderData.starttime;
      $scope.getOrderData.starttime = $stateParams.getOrderData.starttime;
      $scope.getOrderData.disstarttime = false;
      $scope.getOrderData.disendtime = false;
    }
    if($scope.data.isBack == 1){
      $httpPsd.getCallon($scope.data,$scope.getCallonSuccess);
    }
  });
  $scope.changeGender = function (num,$event) {
    var a = $event.target;
    $scope.changeChoose(num);
    // $scope.data.vipSex = a.nextElementSibling.innerHTML[0];
  };
  $scope.changeChoose = function (num) {
    if(num == 1){
      $scope.data.bataiScore = 1;
    }
    if(num == 2){
      $scope.data.bataiScore = 2;
    }
    if(num == 3){
      $scope.data.bataiScore = 3;
    }
    if(num == 4){
      $scope.data.salesScore = 1;
    }
    if(num == 5){
      $scope.data.salesScore = 2;
    }
    if(num == 6){
      $scope.data.salesScore = 3;
    }
    if(num == 7){
      $scope.data.serviceScore = 1;
    }
    if(num == 8){
      $scope.data.serviceScore = 2;
    }
    if(num == 9){
      $scope.data.serviceScore = 3;
    }
    if(num == 10){
      $scope.data.dishScore = 1;
    }
    if(num == 11){
      $scope.data.dishScore = 2;
    }
    if(num == 12){
      $scope.data.dishScore = 3;
    }
    if(num == 13){
      $scope.tousuShow = true;
      $scope.data.complain = 1;
    }
    if(num == 14){
      $scope.tousuShow = false;
      $scope.data.complain = 0;
    }
    if(num == 15){
      $scope.data.weddingCompanyScore = 1;
    }
    if(num == 16){
      $scope.data.weddingCompanyScore = 2;
    }
    if(num == 17){
      $scope.data.weddingCompanyScore = 3;
    }
  };
  $scope.save = function(){
    if($scope.data.bataiScore == 0||$scope.data.salesScore == 0||$scope.data.serviceScore == 0||$scope.data.dishScore == 0){
      $showAlert.alert('满意度必选');
      return;
    };
    var reg = /^\d+$/;
    if (($scope.data.actualPayAmount != null) && ($scope.data.actualPayAmount != '') && (reg.test($scope.data.actualPayAmount) == false)) {
      $showAlert.alert('实收金额应为数字');
      return;
    }
    if (($scope.data.actualTableNum != null) && ($scope.data.actualTableNum != '') && (reg.test($scope.data.actualTableNum) == false)) {
      $showAlert.alert('实开桌数应为数字');
      return;
    }
    if($scope.data.handledDate != undefined){
      var Ttime = $scope.data.handledDate.getTime();
      $scope.data.handledAt = $scope.freshTime(Ttime) + ":00";
    }
    if($scope.data.isBack == 0){
      $httpPsd.saveCallon($scope.data, $scope.saveCallonSuccess,$scope.error);
    }else{
      $httpPsd.updateCallon($scope.data, $scope.updateCallonSuccess,$scope.error);
    }
  };
  $scope.saveCallonSuccess = function(data){
    if (data.msgCode == 0) {
      $scope.makeSure(data.msgMessage);
    } else {
      if (data.msgCode == 1) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('提交失败');
      }
    }
  };
  $scope.updateCallonSuccess = function(data){
    if (data.msgCode == 0) {
      $scope.makeSure(data.msgMessage);
    } else {
      if (data.msgCode == 1) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('提交失败');
      }
    }
  };
  $scope.getCallonSuccess = function(data){
    if(data.bataiScore == 1){
      $scope.changeChoose(1);
    }
    if(data.bataiScore == 2){
      $scope.changeChoose(2);
    }
    if(data.bataiScore == 3){
      $scope.changeChoose(3);
    }
    if(data.salesScore == 1){
      $scope.changeChoose(4);
    }
    if(data.salesScore == 2){
      $scope.changeChoose(5);
    }
    if(data.salesScore == 3){
      $scope.changeChoose(6);
    }
    if(data.serviceScore == 1){
      $scope.changeChoose(7);
    }
    if(data.serviceScore == 2){
      $scope.changeChoose(8);
    }
    if(data.serviceScore == 3){
      $scope.changeChoose(9);
    }
    if(data.dishScore == 1){
      $scope.changeChoose(10);
    }
    if(data.dishScore == 2){
      $scope.changeChoose(11);
    }
    if(data.dishScore == 3){
      $scope.changeChoose(12);
    }
    if(data.complain == 1){
      $scope.changeChoose(13);
    }
    if(data.complain == 0){
      $scope.changeChoose(14);
    }
    if(data.weddingCompanyScore == 1){
      $scope.changeChoose(15);
    }
    if(data.weddingCompanyScore == 2){
      $scope.changeChoose(16);
    }
    if(data.weddingCompanyScore == 3){
      $scope.changeChoose(17);
    }
    $scope.data.vipComplaints = data.vipComplaints;
    $scope.data.handleSuggestion = data.handleSuggestion;
    $scope.data.handlerName = data.handlerName;
    $scope.data.vipSuggestion = data.vipSuggestion;
    var time = (new Date()).getTime() - data.createdAt;
    if(time/(1000*60*60*24) > 1){
      $scope.showState = true;
    }
    $scope.data.handledDate = new Date(data.handledAt.substr(0, data.handledAt.length-3));
  }
  $scope.error = function (data) {
    $ionicLoading.hide();
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
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
            if($stateParams.back == true){
              $ionicHistory.goBack();
            }else{
              $state.go('myOrder', {
                'type': 1 + (new Date().getTime()),
                'getOrderData': $scope.getOrderData,
                'orderList': $scope.orderList
              });
            }
          }
        }
      ]
    });
  };
  $scope.back = function(){
    if($stateParams.back == true){
      $ionicHistory.goBack();
    }else{
      $state.go('myOrder', {
        'type': 1 + (new Date().getTime()),
        'getOrderData': $scope.getOrderData,
        'orderList': $scope.orderList
      });
    }
  };
  //时间处理///////////////
  $scope.freshTime = function (time) {
    var date = new Date(time);
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    ;
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d
    }
    ;
    var h = date.getHours();
    if (h < 10) {
      h = "0" + h
    }
    ;
    var min = date.getMinutes();
    if (min < 10) {
      min = "0" + min
    }
    ;
    var dateString = date.getFullYear() + "-" + m + "-" + d + " " + h + ":" + min;
    return dateString;
  };
});