angular.module('starter.controllers.accountMessageDetailCtrl', []).controller('AccountMessageDetailCtrl', function ($scope, $state, $stateParams, $http, $httpCustom, $ionicPopover, $showAlert, $rootScope, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    console.log($scope.info);
    $scope.messageList = [];
    $scope.noticeList = [];
    $scope.isOrder = true;
    $scope.isJk = $scope.info.isJk;
    $scope.isWx = true;
    $scope.resvType = '1,4,6';
    $scope.messageNum = 0;
    $scope.orderShow = true;
    $scope.meetingOrderShow = false;
    $scope.messageShow = false;
    $scope.cardShow = false;
    $scope.cardList = [];
    $scope.sessionMess = JSON.parse(sessionStorage['messParams'] || '{}');
    console.log($scope.sessionMess)
    if($scope.sessionMess.isOrder!=undefined){
      $scope.isOrder = $scope.sessionMess.isOrder;
      $scope.isWx = $scope.sessionMess.isWx;
      $scope.resvType = $scope.sessionMess.resvType;
      $scope.messageNum = $scope.sessionMess.messageNum;
      $scope.orderShow = $scope.sessionMess.orderShow;
      $scope.meetingOrderShow = $scope.sessionMess.meetingOrderShow;
      $scope.messageShow = $scope.sessionMess.messageShow
    }
    /*var dataDay = {
    'appUserId': $scope.info.id,
    'businessId': $scope.info.businessId,
    'date': localStorage['preDate'],
    'sysIntervalDay': $scope.info.notifyBeforeDay
  };
  $httpCustom.customDayList(dataDay, $scope.getListSuccess, $scope.error);*/
    $httpCustom.getNotices($scope.info, $scope.getNoticesSuccess, $scope.error);
    if (localStorage['getDayDate'] && localStorage['oldMessage']) {
      if ($scope.freshTime(new Date().getTime()) == localStorage['getDayDate']) {
        //$showAlert.alert('已经读取过信息了');
        $scope.messageList = JSON.parse(localStorage['oldMessage']);
        if ($scope.messageList.length == 0) {
          localStorage['messageNum'] = 0;
          $rootScope.message = false;
        }
        for (var a = 0; a < $scope.messageList.length; a++) {
          if ($scope.messageList[a].yidu == false) {
            $scope.messageNum += 1;
          }
        }
      } else {
        var dataDay = {
          'appUserId': $scope.info.id,
          'businessId': $scope.info.businessId,
          'date': localStorage['preDate'],
          'sysIntervalDay': $scope.info.notifyBeforeDay
        };
        localStorage['getDayDate'] = $scope.freshTime(new Date().getTime());
        $httpCustom.customDayList(dataDay, $scope.getListSuccess, $scope.error);
      }
    } else {
      //$showAlert.alert('2');
      localStorage['getDayDate'] = $scope.freshTime(new Date().getTime());
      var dataDay = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'date': localStorage['preDate'],
        'sysIntervalDay': $scope.info.notifyBeforeDay
      };
      //$showAlert.alert('3');
      $httpCustom.customDayList(dataDay, $scope.getListSuccess, $scope.error);
      //$showAlert.alert('4');
    }
  });
  $scope.$on('$ionicView.beforeLeave', function () {
    localStorage['oldMessage'] = JSON.stringify($scope.messageList);
    if (localStorage['messageNum'] && (localStorage['messageNum'] > 0)) {
      $rootScope.message = true;
    } else {
      $rootScope.message = false;
    }
  });
  $scope.getListSuccess = function (data) {
    //$showAlert.alert(JSON.stringify(data));
    for (var a = 0; a < data.length; a++) {
      data[a].messageType = 1;
      data[a].yidu = false;
      data[a].createdTimetxt = $scope.freshTime(data[a].createdTime);
      data[a].anniversaryDatetxt = $scope.freshTime(data[a].anniversaryDate);
    }
    console.log(localStorage['getDayDate']);
    if (localStorage['oldMessage']) {
      $scope.messageList = data.concat(JSON.parse(localStorage['oldMessage']));
    } else {
      $scope.messageList = data;
    }
    for (var b = 0; b < $scope.messageList.length; b++) {
      $scope.messageList[b].sid = b;
    }
    console.log($scope.messageList);
    if ($scope.messageList.length == 0) {
      localStorage['messageNum'] = 0;
      $rootScope.message = false;
    }
    for (var c = 0; c < data.length; c++) {
      if (data[c].yidu == false) {
        $scope.messageNum += 1;
      }
    }
  };
  $scope.getNoticesSuccess = function (data) {
    console.log(data);
    $scope.wxNoticeList = data.wxNotices;
    $scope.orderNoticeList = data.orderNotices;
    $scope.orderNum = 0;
    $scope.meetingOrderNum = 0;
    $scope.cardNum = 0;
    for (var a = 0; a < $scope.orderNoticeList.length; a++) {
      if (($scope.orderNoticeList[a].resvType == 1||$scope.orderNoticeList[a].resvType == 4||$scope.orderNoticeList[a].resvType == 6) && $scope.orderNoticeList[a].status == 1) {
        $scope.orderNum += 1;
      }
      if (($scope.orderNoticeList[a].resvType == 2||$scope.orderNoticeList[a].resvType == 3||$scope.orderNoticeList[a].resvType == 5) && $scope.orderNoticeList[a].status == 1) {
        $scope.meetingOrderNum += 1;
      }
      if (($scope.orderNoticeList[a].resvType == 7) && $scope.orderNoticeList[a].status == 1) {
        $scope.cardNum += 1;
      }
    }
  }
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.freshTime = function (date) {
    var a = new Date(date);
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
  $scope.read = function (id) {
    console.log('id=' + id);
    if (localStorage['messageNum'] && (localStorage['messageNum'] > 0)) {
      localStorage['messageNum'] -= 1;
    }
    if($scope.messageList[id].yidu == false){
      $scope.messageList[id].yidu = true;
      $scope.messageNum -= 1;
    }
    for (var k = 0; k < $scope.wxNoticeList.length; k++) {
      if ($scope.wxNoticeList[k].noticeId = id) {
        $scope.wxNoticeList[k].yidu = true;
      }
    }
  };
  $scope.checkOrder = function () {
    $scope.isOrder = true;
    $scope.isWx = true;
    $scope.resvType = '1,4,6';
    $scope.orderShow = true;
    $scope.meetingOrderShow = false;
    $scope.messageShow = false;
    $scope.cardShow = false;
  };
  $scope.checkMeetingOrder = function () {
    $scope.isOrder = true;
    $scope.resvType = '2,3,5';
    $scope.isWx = false;
    $scope.orderShow = false;
    $scope.meetingOrderShow = true;
    $scope.messageShow = false;
    $scope.cardShow = false;
  };
  $scope.checkAnn = function () {
    $scope.isWx = false;
    $scope.isOrder = false;
    $scope.orderShow = false;
    $scope.meetingOrderShow = false;
    $scope.messageShow = true;
    $scope.cardShow = false;
  };
  $scope.checkCard = function () {
    $scope.isWx = false;
    $scope.isOrder = false;
    $scope.orderShow = false;
    $scope.meetingOrderShow = false;
    $scope.messageShow = false;
    $scope.cardShow = true;
  };
  $scope.read1 = function (id) {
    $scope.wxNoticeList[id].yidu = 1;
    $scope.orderNum -= 1;
    $scope.yidu(0, $scope.wxNoticeList[id].noticeId);
  };
  $scope.readNotice = function (status, status1, type, id) {
    if (status == 2 && status1 == 1) {
      $scope.orderNoticeList[id].status = 2;
      if (type == 1) {
        $scope.orderNum -= 1;
      } else {
        $scope.meetingOrderNum -= 1;
      }
    }
    if (status == 2 && status1 == 2) {

    } else {
      $scope.orderNoticeDate = {
        'noticeId': $scope.orderNoticeList[id].noticeId,
        'status': status,
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'type': 0
      };
      $httpCustom.updateOrderNotice($scope.orderNoticeDate, $scope.updateOrderNoticeSuccess, $scope.error);
    }
    if (status == 3) {
      $scope.orderNoticeList.splice(id, 1);
    }
  }
  $scope.allRead = function () {
    for (var d = 0; d < $scope.messageList.length; d++) {
      $scope.messageList[d].yidu = true;
    }
    for (var k = 0; k < $scope.wxNoticeList.length; k++) {
      $scope.wxNoticeList[k].yidu = 1;
    }
    for (var j = 0; j < $scope.orderNoticeList.length; j++) {
      $scope.orderNoticeList[j].status = 2;
    }
    $scope.messageNum = 0;
    $scope.orderNum = 0;
    $scope.meetingOrderNum = 0;
    localStorage['messageNum'] = 0;
    $scope.yidu(1, 0);
    $scope.orderNoticeDate = {
      'noticeId': 0,
      'status': 2,
      'appUserId': $scope.info.id,
      'businessId': $scope.info.businessId,
      'type': 1
    };
    $httpCustom.updateOrderNotice($scope.orderNoticeDate, $scope.updateOrderNoticeSuccess, $scope.error);
  };
  $scope.yidu = function (type, noticeId) {
    var noticeDate = {};
    noticeDate.businessId = $scope.info.businessId;
    noticeDate.type = type;
    noticeDate.noticeId = noticeId;
    $httpCustom.updateWxNotices(noticeDate, $scope.updateWxNoticesSuccess, $scope.error);
  }
  $scope.updateWxNoticesSuccess = function (data) {
    $showAlert.alert(data.msgMessage);
    console.log(data);
  }
  $scope.updateOrderNoticeSuccess = function (data) {
    console.log(data);
  }
  $scope.delete = function (id) {
    console.log('id=' + id);
    if ($scope.messageList[id].yidu == false) {
      localStorage['messageNum'] -= 1;
    }
    $scope.messageList.splice(id, 1);
    for (var c = id; c < $scope.messageList.length; c++) {
      $scope.messageList[c].sid -= 1;
    }
    console.log($scope.messageList);
  };
  $scope.deleteNotice = function (id) {
    $scope.yidu(2, $scope.wxNoticeList[id].noticeId);
    $scope.wxNoticeList.splice(id, 1);
  };
  $scope.geOrder = function (resvType, resvOrder, tableName, createTime) {
    var stateParams = {
      isOrder: $scope.isOrder,
      isWx: $scope.isWx,
      resvType: $scope.resvType,
      orderShow: $scope.orderShow,
      meetingOrderShow: $scope.meetingOrderShow,
      messageShow: $scope.messageShow
    }
    sessionStorage['messParams'] = JSON.stringify(stateParams)
    if (resvType == 1) {
      sessionStorage.removeItem('orderData')
      $state.go('myOrder-cDetail', {'type': 4, 'resvOrder': resvOrder, 'tableNo': tableName});
    } else if (resvType == 2) {
      $state.go('myOrder-yDetail', {'type': 4, 'resvOrder': resvOrder});
    } else if (resvType == 3) {
      $state.go('clueDetail', {'keyNo': resvOrder});
    } else if (resvType == 6) {
      sessionStorage.removeItem('searchParams')
      $state.go('vipList', {'createTime': createTime});
    }
  };
  $scope.goCard = function(){
    $state.go('tab.account-vip-card');
  }
  $scope.goWechatCode = function(){
    $state.go('wechatCode');
  }

  $scope.back = function(){
    sessionStorage.removeItem('messParams')
    $ionicHistory.goBack();
  }
})
