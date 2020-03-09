angular.module('starter.controllers.accountMyCustomInfoCtrl', []).controller('AccountMyCustomInfoCtrl', function ($scope, $state, $stateParams, $httpPsd, $ionicLoading, $http, $httpCustom, $ionicPopover, $showAlert, $ionicActionSheet, $T, $httpCunjiu) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.meetingStatus = localStorage['meetingOrder'] * 1;
    $scope.typeText = '普通';
    $scope.qryTypeText = '最近30天';
    $scope.qryType = 0;
    $scope.type = 0;
    $scope.showWine = false;
    $scope.wineList = [];
    $scope.nolast = true;
    console.log($stateParams.vipId);
    $scope.info = JSON.parse(localStorage['info']);
    $scope.vipId = $stateParams.vipId;
    $scope.isJk = $scope.info.isJk;
    $scope.isJkVip = false;
    if($stateParams.isYan){
      $scope.typeText = '宴会';
      $scope.type = 1;
    }
    $scope.getCountData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "vipId": $scope.vipId,
      "type": $scope.type,
      'qryType': $scope.qryType
    };
    $scope.getLastOrderData = {
      "vipId": $scope.vipId,
      "appUserId": $scope.info.id,
      "meetingStatus": $scope.meetingStatus
    };
    $scope.showLoading();
    $httpCustom.getCustomCount($scope.getCountData, $scope.getCountSuccess);
    $httpCustom.customList($scope.info.businessId, $scope.getCustomListSuccess);
    $httpCustom.lastOrder($scope.getLastOrderData, $scope.getLastSuccess,$scope.errorLast);
    $httpCustom.customInfo($scope.vipId, $scope.customInfoSuccess);
  });
  $scope.goOrderDetail = function ($event) {
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    var type = $event.target.getAttribute('data-type');
    if (type == 0) {
      sessionStorage.removeItem('orderData')
      $state.go('myOrder-cDetail', {'type': 4, 'resvOrder': resvOrder});
    } else {
      $state.go('myOrder-yDetail', {'type': 3, 'resvOrder': resvOrder});
    }
    ;
  };
  $scope.customInfoSuccess = function (data) {

    $scope.customInfo = data;
    $scope.customInfo.tag = data.tag.split(',');
    $scope.tag = data.tag;
    var crmData = {
      "vipPhone": data.vipPhone,
      'businessId': $scope.info.businessId
    };
    // $httpPsd.getVipWine(crmData, $scope.getVipWineSuccess);
    $httpCunjiu.getVipHasWine({
      businessId: $scope.info.businessId,
      phone: $scope.customInfo.vipPhone
    }, function(data){
      if(data.code==200){
        $scope.showWine = true;
      }else{
        $scope.showWine = false;
      }
    });
    $httpPsd.getCrmUser({
      businessId: $scope.info.businessId,
      key: $scope.customInfo.vipPhone
    }, function(data){
      if(data.code==200 && data.data){
        $scope.isJkVip = true;
        $scope.customInfo.memberID = data.data.memberInfo.memberID;
      }else{
        $scope.isJkVip = false;
      }
    });

  };
  $scope.goRecord = function () {
    if ($scope.info.operationType!=1&&$scope.customInfo.appUserId!=$scope.info.id) {
      return
    }
    $state.go('myCustom-info-record', {'vipId': $scope.vipId, 'type': $scope.type});
  };
  $scope.goAppUser = function () {
    if ($scope.info.operationType!=1&&$scope.customInfo.appUserId!=$scope.info.id) {
      return
    }
    if($scope.info.appOperationSet.indexOf(11) != -1){
      $state.go('marketerList', {'vipId': $scope.vipId, 'appUserId': $scope.customInfo.appUserId});
    }else {
      $showAlert.alert("您无权修改所属营销");
    }
  };
  $scope.goTag = function () {
    $state.go('myCustom-tag', {'tag': $scope.tag, 'vipId': $scope.vipId});
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
    $ionicLoading.hide();
  };
  $scope.getLastSuccess = function (data) {
    $scope.lastOrder = data;
    $scope.nolast = false;
    $ionicLoading.hide();
  };
  $scope.getVipWineSuccess = function(data){
    $scope.wineList = data;
    console.log(data);
    if($scope.wineList.length > 0){
      $scope.showWine = true;
    }
  }
  $scope.getCountSuccess = function (data) {
    console.log(data);
    $scope.count1 = data.monthOrderNum;
    $scope.count2 = data.monthOrderNum == 0 ? 0 : parseInt((data.allOrderAmt / data.monthOrderNum));
    $scope.count3 = data.allResvNum == 0 ? 0 : parseInt((data.allOrderAmt / data.allResvNum));
    $scope.count4 = (data.allOrderAmt * 1 / 10000).toFixed(2);
    $scope.count5 = data.allOrderNum;
    $scope.count6 = data.plNum;
    $scope.count7 = data.allResvNum
  };
  $scope.getCustomListSuccess = function (data) {
    $scope.buttonList = [];
    data.push({"vipClassId": 0, "vipClassName": "未分类"});
    for (var i = 0; i < data.length; i++) {
      var button = {'text': data[i].vipClassName, 'id': data[i].vipClassId};
      $scope.buttonList.push(button);
    }

    //console.log($scope.customIdList);
  };
  $scope.changeClassSuccess = function (data) {
    $httpCustom.customInfo($scope.vipId, $scope.customInfoSuccess, $scope.error);
    $showAlert.alert(data.msgMessage);
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
    $ionicLoading.hide();
  };
  $scope.errorLast = function (data) {
    if (data && data.msgMessage) {
      // console.log(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
    $scope.nolast = true;
    $ionicLoading.hide();
  };
  $scope.show = function () {
    if ($scope.info.operationType!=1&&$scope.customInfo.appUserId!=$scope.info.id) {
      return
    }
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: $scope.buttonList,
      titleText: $T.T('选择想要更换的分组'),
      cancelText: $T.T('取消'),
      cancel: function () {
        hideSheet();
      },
      buttonClicked: function (index) {
        var changeData = {
          "vipId": $scope.vipId,
          "vipClassId": $scope.buttonList[index].id,
          "vipClassName": $scope.buttonList[index].text
        };
        $httpCustom.changeClass(changeData, $scope.changeClassSuccess, $scope.error);
        hideSheet();
      }
    });

    // // For example's sake, hide the sheet after two seconds
    // $timeout(function() {
    //   hideSheet();
    // }, 2000);

  };
  var chooseType = `<ion-popover-view style="height:106px;width:100px;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event)" data-id="普通">{{'普通'|T}}</a>
                     <a class="item text-center" ng-click="choose($event)" data-id="宴会">{{'宴会'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
  $scope.popover = $ionicPopover.fromTemplate(chooseType, {
    scope: $scope
  });
  $scope.openPopover = function ($event, num) {
    $event.stopPropagation();
    $scope.popover.show($event);
  };
  $scope.closePopover = function (num) {
    $scope.popover.hide();
  };
  $scope.choose = function ($event) {
    var a = $event.target;
    var txt = a.getAttribute("data-id");
    $scope.closePopover();
    $scope.typeText = txt;
    if ($scope.typeText == '普通') {
      $scope.type = 0;
      $scope.getCountData.type = 0;
      $httpCustom.getCustomCount($scope.getCountData, $scope.getCountSuccess, $scope.error);
    } else if ($scope.typeText == '宴会') {
      $scope.type = 1;
      $scope.getCountData.type = 1;
      $httpCustom.getCustomCount($scope.getCountData, $scope.getCountSuccess, $scope.error);
    }
  };
  $scope.goInfoDetail = function () {
    if ($scope.info.operationType!=1&&$scope.customInfo.appUserId!=$scope.info.id) {
      return
    }
    $state.go('myCustom-info-detail', {'vipId': $scope.vipId});
  }
  /////////////////////////////////////////////
  $scope.changeQryType = function () {
    if ($scope.qryType == 0) {
      $scope.qryType = 1;
      $scope.qryTypeText = '全部';
    } else {
      $scope.qryType = 0;
      $scope.qryTypeText = '最近30天';
    }
    $scope.getCountData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "vipId": $scope.vipId,
      "type": $scope.type,
      'qryType': $scope.qryType
    };
    $httpCustom.getCustomCount($scope.getCountData, $scope.getCountSuccess, $scope.error);
  }
  $scope.goCunjiu = function(phone){
    $state.go('myCustomInfoCunjiu', {phone: phone});
  };
  $scope.goCard = function(memberID){
    if ($scope.info.operationType!=1&&$scope.customInfo.appUserId!=$scope.info.id) {
      return
    }
    $state.go('myCustomInfoCard', {memberID: memberID});
  };
})
