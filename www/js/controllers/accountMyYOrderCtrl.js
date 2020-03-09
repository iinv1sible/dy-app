angular.module('starter.controllers.accountMyYOrderCtrl', []).controller('AccountMyYOrderCtrl', function ($scope, $ionicPopup, $ionicPopover, $ionicPopup, $showAlert, $state, $stateParams, $ionicLoading, $http, $httpOrder, $operation, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.state = '排序方式';
    $scope.showSeat = false;
    $scope.showLog = false;
    $scope.showVis = false;
    $scope.LogList = [];
    $scope.trackerList = [];
    $scope.seatList = [];
    $scope.tracker = {};
    $scope.tracker.way = '电话';
    $scope.info = JSON.parse(localStorage['info']);
    $scope.resvDate = $scope.freshTime2();
    $scope.title = '宴会订单';
    $scope.showRemind = false;
    $scope.content = '保存';
    $scope.backOrderShow = false;
    $scope.isAll1 = 0;
    if($stateParams.resvStatus){
      sessionStorage['yorderParams'] = JSON.stringify($stateParams)
    }else{
      $stateParams = JSON.parse(sessionStorage['yorderParams'])
    }
    $scope.resvStatus = $stateParams.resvStatus;
    if ($stateParams.resvStatus == 1) {
      $scope.title = '待预订订单';
    } else if ($stateParams.resvStatus == 2) {
      $scope.title = '待筹备订单';
    } else if ($stateParams.resvStatus == 3) {
      if($scope.info.appOperationSet.indexOf(12) != -1){
        $scope.backOrderShow = true;
        $scope.title = '待回访订单';
      }
      if($scope.info.appOperationSet.indexOf(13) != -1){
        $scope.backOrderShow = true;
        $scope.title = '全店待回访';
        $scope.isAll1 = 1;
      }
    }
    $scope.meetingData = {
      'resvStatus': $stateParams.resvStatus,
      'appUserId': $scope.info.id,
      'businessId': $scope.info.businessId,
      'resvDate': $scope.resvDate,
      'isAll1': $scope.isAll1,
      "isAll": $scope.info.operationType
    };
    $httpOrder.getMeetingOrder($scope.meetingData, $scope.getMeetingOrderSuccess);
    console.log($stateParams);
    if ($scope.info.appOperationSet) {
      if ($scope.info.appOperationSet.indexOf(4) != -1) {
        $scope.tuitai = true;
      } else {
        $scope.tuitai = false;
      }
      if ($scope.info.appOperationSet.indexOf(3) != -1) {
        $scope.huantai = true;
      } else {
        $scope.huantai = false;
      }
    }
  });
  var state = `<ion-popover-view style="height:212px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-click="changeState($event)" data-state="2">总预算</a>
                      <a class="item text-center" ng-click="changeState($event)" data-state="1">宴会桌数</a>
                      <a class="item text-center" ng-click="changeState($event)" data-state="3">配菜标准</a>
                      <a class="item text-center" ng-click="changeState($event)" data-state="4">下单时间</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  $scope.popoverState = $ionicPopover.fromTemplate(state, {
    scope: $scope
  });
  $scope.openPopoverState = function ($event) {
    $scope.popoverState.show($event);
  };
  $scope.closePopoverState = function () {
    $scope.popoverState.hide();
  };
  $scope.changeState = function ($event) {
    var a = $event.target;
    var txt = a.innerHTML;
    $scope.state = txt;
    //重新进行排序/////////////////////
    if (txt == '总预算') {
      $scope.orderList.sort(function (a, b) {
        return b.amount - a.amount
      });
    } else if (txt == '宴会桌数') {
      $scope.orderList.sort(function (a, b) {
        return b.resvTableNum - a.resvTableNum
      });
    } else if (txt == '配菜标准') {
      $scope.orderList.sort(function (a, b) {
        return b.dishStandard - a.dishStandard
      });
    } else if (txt == '下单时间') {
      $scope.orderList.sort(function (a, b) {
        return a.createdAt - b.createdAt
      });
    }
    $scope.closePopoverState();
  };
  $scope.changeMessage = function ($event) {
    var a = $event.target;
    $scope.tracker.way = a.getAttribute("data-id");
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  //退订、换台、查看详情、查看日志/////////////
  $scope.seeLog = function ($event) {
    $event.stopPropagation();
    $scope.title1 = $scope.title;
    $scope.showLog = true;
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    $httpOrder.getLog(resvOrder, $scope.logSuccess, $scope.error);
  };
  $scope.logSuccess = function (data) {
    $scope.logList = data;
  };
  $scope.tuiding = function ($event) {
    $event.stopPropagation();
    var myPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      template: $T.T('确认要退订吗'),
      title: $T.T('易订'),
      scope: $scope,
      buttons: [
        {text: $T.T('取消')},
        {
          text: `<b>${$T.T('确认')}</b>`,
          type: 'button-assertive',
          onTap: function () {
            console.log('退订');
            var resvOrder = $event.target.getAttribute('data-resvOrder');
            var tableName = $event.target.getAttribute('data-tableName');
            var oldAppUserId = $event.target.getAttribute('data-appUserId');
            var tuidingData = {
              "resvOrder": resvOrder,
              "appUserId": $scope.info.id,
              "status": 4,
              "appUserPhone": $scope.info.username,
              "appUserName": $scope.info.surname,
              "tableName": tableName
            };
            $operation.YUnBook(tuidingData, $scope.tuidingSuccess, $scope.error);
          }
        }
      ]
    });
  };
  $scope.tuidingSuccess = function () {
    $showAlert.alert('退订成功');
    // $state.go('Ybook', {'type': 2,'back':$stateParams.back});
    $httpOrder.getMeetingOrder($scope.meetingData, $scope.getMeetingOrderSuccess);
  };
  $scope.huanzhuo = function ($event) {
    $event.stopPropagation();
    $scope.title1 = $scope.title;
    $scope.resvTableNum = $event.target.getAttribute('data-resvTableNum');
    $scope.resvOrder = $event.target.getAttribute('data-resvOrder');
    $scope.status = $event.target.getAttribute('data-status');
    var resvDate = $event.target.getAttribute('data-resvDate');
    $scope.resvDate = resvDate;
    var mealTypeId = $event.target.getAttribute('data-mealTypeId');
    var mealTypeName = $event.target.getAttribute('data-mealTypeName');
    $scope.mealTypeId = mealTypeId;
    $scope.mealTypeName = mealTypeName;
    var changeListData = {
      "resvDate": resvDate,
      "mealTypeId": mealTypeId,
      "businessId": $scope.info.businessId
    };
    $operation.getYchangeSeat(changeListData, $scope.changeListSuccess, $scope.error);
  };
  $scope.changeListSuccess = function (data) {
    console.log(data);
    $scope.showSeat = true;
    $scope.seatList = data;
  };
  $scope.hideModal = function () {
    $scope.showSeat = false;
    $scope.showLog = false;
    $scope.showVis = false;
  };
  $scope.changeSeat = function ($event) {
    var tableName = $event.target.getAttribute('data-tableName');
    var tableNum = $event.target.getAttribute('data-tableNum');
    var myPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      template: `确认要和 <span style="color:#DA4C39;">${tableName}</span> 换厅吗<br>您需要预定 <span style="color:#DA4C39;">${$scope.resvTableNum}</span> 桌,该厅剩余 <span style="color:#DA4C39;">${tableNum}</span> 桌`,
      title: $T.T('易订'),
      scope: $scope,
      buttons: [
        {text: $T.T('取消')},
        {
          text: `<b>${$T.T('确认')}</b>`,
          type: 'button-assertive',
          onTap: function () {
            console.log('退订');
            var tableAreaId = $event.target.getAttribute('data-tableAreaId');
            var tableId = $event.target.getAttribute('data-seat');
            var huanzhuoData = {
              'mealTypeId': $scope.mealTypeId,
              'mealTypeName': $scope.mealTypeName,
              'resvDate': $scope.resvDate,
              "resvOrder": $scope.resvOrder,
              "businessId": $scope.info.businessId,
              "appUserId": $scope.info.id,
              "tableId": tableId, // 目标厅位ID
              "tableAreaId": tableAreaId, // 目标厅位区域ID
              "tableName": tableName, // 目标厅位名称
              "status": $scope.status, // 状态
              "appUserName": $scope.info.surname,
              "appUserPhone": $scope.info.username,
              "meetingCheck": $scope.info.meetingCheck * 1, // 宴会是否审核
            };
            $operation.changeYseat(huanzhuoData, $scope.changeSeatSuccess, $scope.error);
          }
        }
      ]
    });
  };
  $scope.changeSeatSuccess = function () {
    $showAlert.alert('换桌成功');
    $scope.showSeat = false;
    $httpOrder.getMeetingOrder($scope.meetingData, $scope.getMeetingOrderSuccess);
  };
  $scope.goOrderDetail = function ($event) {
    var status = $event.target.getAttribute('data-status');
    if (status == 3) {
      return;
    }
    var resvOrder = $event.target.getAttribute('data-resvorder');
    var batchNo = $event.target.getAttribute('data-batchNo');
    var type = 4
    if ($scope.info.operationType == 1 || $scope.info.id == $event.target.getAttribute('data-appUserId')) {
      type = 2
    }
    $state.go('myOrder-yDetail', {'resvOrder': resvOrder, 'batchNo': batchNo, 'type': type, goBack: true});
  };
  $scope.backOrder = function ($event) {
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    var vipName = $event.target.getAttribute('data-vipName');
    var vipPhone = $event.target.getAttribute('data-vipPhone');
    var payamount = $event.target.getAttribute('data-payamount');
    var actualPayAmount = $event.target.getAttribute('data-actualPayAmount');
    var resvDate = $event.target.getAttribute('data-resvDate');
    var perPrice = $event.target.getAttribute('data-perPrice');
    var tableNo = $event.target.getAttribute('data-tableNo');
    var batchNo = $event.target.getAttribute('data-batchno');
    var appUserId = $event.target.getAttribute('data-appUserId');
    var tableAreaName = $event.target.getAttribute('data-tableAreaName');
    var resvTableNum = $event.target.getAttribute('data-resvTableNum');
    var dishStandard = $event.target.getAttribute('data-dishStandard');
    var actualTableNum = $event.target.getAttribute('data-actualTableNum');
    var resvMeetingOrderType = $event.target.getAttribute('data-resvMeetingOrderType');
    var resvMeetingOrderTypeName = $event.target.getAttribute('data-resvMeetingOrderTypeName');
    var payamount = $event.target.getAttribute('data-payamount');
    $state.go('backOrder',{'resvOrder':resvOrder,'back':true,'isYanhui':true,'resvMeetingOrderType':resvMeetingOrderType,'resvMeetingOrderTypeName':resvMeetingOrderTypeName,'actualTableNum':actualTableNum,'payamount':payamount,'resvTableNum':resvTableNum,'dishStandard':dishStandard,'isBack':0,'vipName':vipName,'appUserId':appUserId,'vipPhone':vipPhone,'batchNo':batchNo,'payamount':payamount,'resvDate':resvDate,'perPrice':perPrice,'tableNo':tableNo,'tableAreaName':tableAreaName,'actualPayAmount':actualPayAmount});
  };
  $scope.seeVis = function ($event) {
    $scope.showRemind = true;
    $scope.title1 = $scope.title;
    $scope.title = '订单跟进';
    $scope.showVis = true;
    $scope.batchNo = $event.target.getAttribute('data-batchNo');
    $scope.resvOrder = $event.target.getAttribute('data-resvOrder');
    $scope.appUserName = $event.target.getAttribute('data-appUserName');
    $scope.trackerList = JSON.parse($event.target.getAttribute('data-tracker'));
  };
  $scope.goBack = function () {
    $scope.showVis = false;
    $scope.showSeat = false;
    $scope.showLog = false;
    $scope.title = $scope.title1;
    $scope.showRemind = false;
  }
  $scope.addVis = function () {
    var Ttime = $scope.tracker.date.getTime();
    $scope.tracker.dateTime = $scope.freshTime(Ttime) + ":00";
    $scope.trackerData = {
      "batchNo": $scope.batchNo,  // 此处传批次号
      "trackerTime": $scope.tracker.dateTime, // 拜访时间
      "trackerContent": $scope.tracker.content,  // 拜访内容
      "trackerEmp": $scope.info.surname, // 拜访员工
      "trackerWay": $scope.tracker.way
    };
    $httpOrder.addVisList($scope.trackerData, $scope.addVisListSuccess, $scope.error)
  };
  $scope.addVisListSuccess = function (data) {
    $showAlert.alert('添加成功');
    $scope.tracker.content = '';
    $scope.tracker.date = null;
    $scope.trackerList.push($scope.trackerData);
    $httpOrder.getMeetingOrder($scope.meetingData, $scope.getMeetingOrderSuccess);
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
  $scope.freshTime2 = function () {
    var a = new Date();
    var m = a.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    ;
    var d = a.getDate();
    if (d < 10) {
      d = "0" + d
    }
    ;
    var dateString = a.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  //error/////////////////////////////
  $scope.error = function (data, status) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else if (status == 401) {
      localStorage.removeItem('TOKEN_KEY');
      $state.go('login');
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
    $ionicLoading.hide();
  };
  //获取列表成功///////////////////////
  $scope.getMeetingOrderSuccess = function (data) {
    console.log(data);
    $scope.orderList = data;
    for (var i = 0; i < $scope.orderList.length; i++) {
      if ($scope.orderList[i].status == 1) {
        $scope.orderList[i].imgUrl = 'img/ico_type_5@3x.png';
      } else if ($scope.orderList[i].status == 2 || $scope.orderList[i].status == 3) {
        $scope.orderList[i].imgUrl = 'img/type-1@3x.png';
      }
      if ($scope.orderList[i].dishStandard == "") {
        $scope.orderList[i].dishStandard = 0;
      }
      if (($scope.info.id != data[i].appUserId) && ($scope.info.hiddenPhoneNum == true)) {
        console.log('不一样');
        $scope.orderList[i].vipPhone = $scope.orderList[i].vipPhone.slice(0, 3) + '****' + $scope.orderList[i].vipPhone.slice(7);
      }
      $scope.orderList[i].amount = $scope.orderList[i].dishStandard * $scope.orderList[i].resvTableNum;
      $scope.orderList[i].createTime = $scope.freshTime($scope.orderList[i].createdAt);
    }
    // $scope.orderList.sort(function (a, b) {
    //   return a.createdAt - b.createdAt
    // });
  };
  $scope.goIndex = function () {
    $state.go('tab.dash')
  };
  $scope.goRemind = function () {
    $state.go('clueRemind', {'keyNo': $scope.batchNo, 'resvOrder': $scope.resvOrder, 'type': 1});
  };
  
  $scope.lock = function($event){
    $state.go('myOrder-yDetail-lock', { 
      resvOrder: $event.target.getAttribute('data-resvOrder'),
      resvDate: $event.target.getAttribute('data-resvDate'),
      mealTypeId: $event.target.getAttribute('data-mealTypeId'),
      mealTypeName: $event.target.getAttribute('data-mealTypeName'),
      tableId: $event.target.getAttribute('data-tableId'),
      tableName: $event.target.getAttribute('data-tableName'),
      resvMeetingOrderTypeName: $event.target.getAttribute('data-resvMeetingOrderTypeName')
    })
  }
})