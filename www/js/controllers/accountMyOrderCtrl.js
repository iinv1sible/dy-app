angular.module('starter.controllers.accountMyOrderCtrl', []).controller('AccountMyOrderCtrl', function ($scope, $orderTime, $cordovaDatePicker, $state, $stateParams, $ionicPopover, ionicDatePicker, $ionicLoading, $http, $httpOrder, $httpCustom, $ionicPopup, $showAlert, $timeout, $httpPsd, $ionicScrollDelegate, $T, $compile) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.canSubmit = $scope.info.appUserOprationId.indexOf('2') > -1 ? true : false // 是否允许提交预订申请
    if($scope.canSubmit && $scope.info.appUserOprationDetailId){
      $scope.yudingSubmit = $scope.info.appUserOprationDetailId.indexOf('2-1') > -1 ? true : false
      $scope.jiazhuoSubmit = $scope.info.appUserOprationDetailId.indexOf('2-2') > -1 ? true : false
      $scope.huanzhuoSubmit = $scope.info.appUserOprationDetailId.indexOf('2-3') > -1 ? true : false
      $scope.tuidingSubmit = $scope.info.appUserOprationDetailId.indexOf('2-4') > -1 ? true : false
    }
    $ionicScrollDelegate.scrollTop();
    console.log($scope.info);
    $scope.businessId = $scope.info.businessId;
    $scope.isJk = $scope.info.isJk;
    $scope.isStore = false;
    $scope.sumPrice = 0;
    var module = $scope.info.appModuleSet;
    $scope.backOrderShow = false;
    $scope.backOrderName = '';
    $scope.backOrderShow1 = false;
    if($scope.info.appOperationSet.indexOf(12) != -1){
      $scope.backOrderShow = true;
      $scope.backOrderName = '待回访';
    }
    if($scope.info.appOperationSet.indexOf(13) != -1){
      $scope.backOrderShow = true;
      $scope.backOrderName = '全店待回访';
    }
    //$httpPsd.getArea($scope.info,$scope.areaSuccess,$scope.error);
    if (module.indexOf(10) != -1) {
      $scope.meetingShow = true;
    } else {
      $scope.meetingShow = false;
    }
    ;
    viewData.enableBack = false;
    if(localStorage['customerInfo']){
      $stateParams = JSON.parse(localStorage['customerInfo'])
    }
    if ($stateParams.type == 1 && !localStorage['customerInfo']) {
      $scope.showTime = false;
      $scope.isCanyin = true;
      $scope.isYanhui = false;
      $scope.state = $scope.canSubmit?'已提交申请':'今日预到';
      $scope.meal = '全部餐次';
      $scope.ymeal = '全部餐次';
      $scope.isCanyin = true;
      $scope.isYanhui = false;
      $scope.area = '全部区域';
      $scope.tableAreaId = '';
      //$scope.getOrderFlashData.qryType=0;
      if($scope.canSubmit){
        state = `<ion-popover-view style="height:216px;width:120px;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                     <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="" data-id="已提交申请">{{'已提交申请'|T}}</a>
                     <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="1" data-id="成功申请">{{'成功申请'|T}}</a>
                     <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="2" data-id="失败申请">{{'失败申请'|T}}</a>
                     <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="3" data-id="等待中申请">{{'等待中申请'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      }else{
        var height = 400
        if($scope.info.operationType!=1){
          height = 216
        }
        if($scope.backOrderShow){
          height += 54
        }
        state = `<ion-popover-view style="height:${height}px;max-height:400px;width:120px;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                     <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店预到">{{'全店预到'|T}}</a>
                     <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店订单">{{'全店订单'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="今日预到">{{'今日预到'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="更多预到">{{'更多预到'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="历史订单">{{'历史订单'|T}}</a>
                     <a ng-if="backOrderShow" class="item text-center" ng-click="choose($event,1)" data-id="${$scope.backOrderName}">{{backOrderName|T}}</a>
                     <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="散客订单">{{'散客订单'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="退订查询">{{'退订查询'|T}}</a>
                     <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="异常订单">{{'异常订单'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      }
      $scope.popoverState = $ionicPopover.fromTemplate(state, {
        scope: $scope
      });
      $scope.openPopover = function ($event, num) {
        if (num == 1) {
          $scope.popoverState.show($event);
        } else if (num == 2) {
          $scope.popoverMeal.show($event);
        } else if (num == 3) {
          $scope.popoverMealY.show($event);
        }
      };
      $scope.closePopover = function (num) {
        if (num == 1) {
          $scope.popoverState.hide();
        } else if (num == 2) {
          $scope.popoverMeal.hide();
        } else if (num == 3) {
          $scope.popoverMealY.hide();
        }
      };
      $scope.showLoading();
      $httpPsd.getArea($scope.info, $scope.areaSuccess, $scope.error);
      $httpPsd.getYArea($scope.info, $scope.YareaSuccess, $scope.error);
      $scope.getOrderData = {
        "appUserId": $scope.info.id,
        'businessId': $scope.businessId,
        "qryType": 0,
        "mealTypeId": '',
        "vipName": '',
        "starttime": $scope.freshTime($scope.getMealDate().getTime()),
        "endtime": $scope.freshTime($scope.getMealDate().getTime()),
        "startYtime": $scope.freshTime($scope.getMealDate().getTime()),
        "endYtime": $scope.freshTime($scope.getMealDate().getTime()),
        "page": 1,
        "rows": 10,
        'canLoad': $scope.canLoad,
        'meal': $scope.meal,
        'state': $scope.state,
        'area': '全部区域',
        'tableAreaId': ''
      };
      if($scope.state == '已提交申请'){
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.getOrderData.flag = ''
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.disstarttime = $scope.getOrderData.disstarttime = false
        $scope.disendtime = $scope.getOrderData.disendtime = false
        $scope.canLoad = $scope.getOrderData.canLoad = false
        $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
      }else{
        $httpOrder.getOrder($scope.getOrderFlashData, $scope.getOrderFlashSuccess, $scope.error);
      }
      localStorage['scrollTop'] = 0;
    } else if ($stateParams.type > 1 || localStorage['customerInfo']) {
      $scope.showLoading();
      $httpPsd.getArea($scope.info, $scope.areaSuccess, $scope.error);
      $httpPsd.getYArea($scope.info, $scope.YareaSuccess, $scope.error);
      $scope.orderList = $stateParams.orderList;
      $scope.getOrderData = $stateParams.getOrderData;
      $scope.canLoad = $stateParams.getOrderData.canLoad;
      $scope.state = $stateParams.getOrderData.state;
      $scope.area = $stateParams.getOrderData.area;
      $scope.tableAreaId = $stateParams.getOrderData.tableAreaId;
      if($stateParams.getOrderData.isCanyin){
        $scope.meal = $stateParams.getOrderData.meal;
        if($stateParams.getOrderData.state == '全店待回访'||$stateParams.getOrderData.state == '待回访订单'||$stateParams.getOrderData.state == '待回访'||$stateParams.getOrderData.state == '历史订单'||$stateParams.getOrderData.state == '全店订单'){
          $scope.backOrderShow1 = true;
          $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
        }
        if($stateParams.getOrderData.state == '已提交申请' || $stateParams.getOrderData.state == '成功申请' || $stateParams.getOrderData.state == '失败申请' || $stateParams.getOrderData.state == '等待中申请'){
          $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
        }
      }else{
        $scope.ymeal = $stateParams.getOrderData.meal;
        if($stateParams.getOrderData.state == '已完成'){
          $scope.backOrderShow1 = true;
          $httpOrder.getYOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
        }
      }
      console.log($stateParams);
      $scope.isCanyin = $stateParams.getOrderData.isCanyin;
      $scope.isYanhui = $stateParams.getOrderData.isYanhui;
      $scope.showYanhui = $stateParams.getOrderData.showYanhui;
      $scope.showTime = $stateParams.getOrderData.showTime;

      $scope.disstarttime = $scope.getOrderData.disstarttime
      $scope.disendtime = $scope.getOrderData.disendtime
      $scope.starttime = $scope.getOrderData.starttime
      $scope.endtime = $scope.getOrderData.endtime
      if ($scope.isYanhui) {
        state = `<ion-popover-view style="height:212px;width:120px;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                    <a class="item text-center" ng-if="!info.hiddenPhoneNum" ng-click="choose($event,1)" data-id="全店已确认">{{'全店已确认'|T}}</a>
                    <a class="item text-center" ng-if="!info.hiddenPhoneNum" ng-click="choose($event,1)" data-id="全店已完成">{{'全店已完成'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="已确认">{{'已确认'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="待预订">{{'待预订'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="已失效">{{'已失效'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="已完成">{{'已完成'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      }else{
        if($scope.canSubmit){
          state = `<ion-popover-view style="height:216px;width:120px;">
                   <ion-content style="background-color: transparent;" overflow-scroll="true">
                     <div class="list">
                       <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="" data-id="已提交申请">{{'已提交申请'|T}}</a>
                       <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="1" data-id="成功申请">{{'成功申请'|T}}</a>
                       <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="2" data-id="失败申请">{{'失败申请'|T}}</a>
                       <a ng-if="canSubmit" class="item text-center" ng-click="choose($event,1)" data-type="3" data-id="等待中申请">{{'等待中申请'|T}}</a>
                     </div>
                   </ion-content>
                 </ion-popover-view>`;
        }else{
          var height = 400
          if($scope.info.operationType!=1){
            height = 216
          }
          if($scope.backOrderShow){
            height += 54
          }
          state = `<ion-popover-view style="height:${height}px;max-height:400px;width:120px;">
                   <ion-content style="background-color: transparent;" overflow-scroll="true">
                     <div class="list">
                       <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店预到">{{'全店预到'|T}}</a>
                       <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店订单">{{'全店订单'|T}}</a>
                       <a class="item text-center" ng-click="choose($event,1)" data-id="今日预到">{{'今日预到'|T}}</a>
                       <a class="item text-center" ng-click="choose($event,1)" data-id="更多预到">{{'更多预到'|T}}</a>
                       <a class="item text-center" ng-click="choose($event,1)" data-id="历史订单">{{'历史订单'|T}}</a>
                       <a ng-if="backOrderShow" class="item text-center" ng-click="choose($event,1)" data-id="${$scope.backOrderName}">{{backOrderName|T}}</a>
                       <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="散客订单">{{'散客订单'|T}}</a>
                       <a class="item text-center" ng-click="choose($event,1)" data-id="退订查询">{{'退订查询'|T}}</a>
                       <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="异常订单">{{'异常订单'|T}}</a>
                     </div>
                   </ion-content>
                 </ion-popover-view>`;
        }
      }
      $scope.popoverState = $ionicPopover.fromTemplate(state, {
        scope: $scope
      });
      $scope.openPopover = function ($event, num) {
        if (num == 1) {
          $scope.popoverState.show($event);
        } else if (num == 2) {
          $scope.popoverMeal.show($event);
        } else if (num == 3) {
          $scope.popoverMealY.show($event);
        }
      };
      $scope.closePopover = function (num) {
        if (num == 1) {
          $scope.popoverState.hide();
        } else if (num == 2) {
          $scope.popoverMeal.hide();
        } else if (num == 3) {
          $scope.popoverMealY.hide();
        }
      };
    }
    $scope.showShu = false;
    $scope.showKe = false;
    $scope.showDish = false;
    $scope.dishList = [];
    $scope.propertyId = null;
    $scope.propertyName = '';
    $scope.orderProperty = [];
    $scope.keList = [];
    $scope.guestList = [];
    $scope.propertyBatchNo = null;
    $scope.customerVipPhone = null;
    $scope.cantChooseProperty = false;
    // $scope.chuangjian = true;
    $scope.keData = {};
    // $scope.keData.man = true;
    if(localStorage['scrollTop1']!= 0){
      $ionicScrollDelegate.scrollTo(0,localStorage['scrollTop1'],false);
    }


    if(localStorage['customerInfo']){
      $scope.showShu = true;
      var customerInfo = JSON.parse(localStorage['customerInfo'])
      $scope.propertyBatchNo = customerInfo.propertyBatchNo
      $scope.getKeData = {
        "batchNo": $scope.propertyBatchNo, // 批次号
        "businessId": $scope.info.businessId, // 酒店ID
        "appUserId": $scope.info.id, // 用户ID
      };
      $httpOrder.getKe($scope.getKeData, $scope.getKeSuccess, $scope.error);
      $httpOrder.getGuest($scope.getKeData, $scope.getQuestSuccess, $scope.error);
      localStorage.removeItem('customerInfo')
    }
  });
  // 获取当前餐别日期 跨天餐别
  $scope.getMealDate = function(){
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var now = 60 * hour + min;
    console.log('当前餐别是否跨天',sessionStorage['isKuaTian'])
    if(sessionStorage['isKuaTian'] == 1){
      if(sessionStorage['resvStartTime']<sessionStorage['resvEndTime']){
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate() - 1;
        time = new Date(year + '/' + month + '/' +date)
      }else{
        if(now < sessionStorage['lastMealEndTime']*1){
          var year = time.getFullYear();
          var month = time.getMonth() + 1;
          var date = time.getDate() - 1;
          time = new Date(year + '/' + month + '/' +date)
        }
      }
    }
    return time
  }
  if ($stateParams.getOrderData) {
    $scope.showTime = $stateParams.getOrderData.showTime;
    $scope.disstarttime = $stateParams.getOrderData.disstarttime;
    $scope.disendtime = $stateParams.getOrderData.disendtime;
    $scope.starttime = $stateParams.getOrderData.starttime;
    $scope.endtime = $stateParams.getOrderData.endtime;
    $scope.startgettime = $stateParams.getOrderData.startgettime;
    $scope.endgettime = $stateParams.getOrderData.endgettime;
    $scope.startYtime = $stateParams.getOrderData.startYtime;
    $scope.endYtime == $stateParams.getOrderData.endYtime;
    $scope.startgettime = '2004-01-01';
  } else {
    $scope.showTime = false;
    $scope.disstarttime = true;
    $scope.disendtime = true;
  }
  $scope.goIndex = function () {
    $state.go('tab.dash')
  };
  $scope.goOrderDetail = function ($event) {
    var nowTransform = $("#order-scroll .scroll")[0].style.transform;
    var myScrollTop = 0;
    if(nowTransform){
      var startIndex = nowTransform.indexOf('(')+1;
      var endIndex = nowTransform.indexOf(')');
      var nowTranslate = nowTransform.substring(startIndex,endIndex);
      var translateArr = nowTransform.split(",");
      myScrollTop=translateArr[1].replace(/-|px/g, "");
    }else {
      myScrollTop = document.getElementById('order-scroll').getElementsByClassName("scroll")[0].scrollTop;
    }
    console.log(myScrollTop);
    localStorage['scrollTop1'] = myScrollTop;
    var flag = $event.target.getAttribute('data-flag');
    var submitStatus = $event.target.getAttribute('data-submitStatus');
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    var tableNo = $event.target.getAttribute('data-tableNo');
    var tableName = $event.target.getAttribute('data-tableName');
    var tableAreaName = $event.target.getAttribute('data-tableAreaName');
    sessionStorage.removeItem('orderData')
    if(flag != undefined && flag != ''){
      // $state.go('myOrder-cDetail', {
      //   'type': 3 + (new Date().getTime()),
      //   'getOrderData': $scope.getOrderData,
      //   'orderList': $scope.orderList,
      //   'canBook': false,
      //   'submitId': $event.target.getAttribute('data-submitId')
      // });
      var seatDataFor = {
        'mealTypeId': $event.target.getAttribute('data-mealTypeId'),
        'mealTypeName': $event.target.getAttribute('data-mealTypeName'),
        'mealTypeIdA': $event.target.getAttribute('data-mealTypeIdA'),
        'mealTypeIdB': $event.target.getAttribute('data-mealTypeIdB'),
        'resvDate': $event.target.getAttribute('data-resvDate'),
        'resvStartTime': '',
        'resvEndTime': '',
      };
      var mealTypes = JSON.parse(sessionStorage['mealTypes']);
      mealTypes.map(item=>{
        if(item.id == seatDataFor.mealTypeId){
          if(seatDataFor.mealTypeIdA){
            seatDataFor.resvStartTime = item.resvStartTime
            seatDataFor.resvEndTime = item.bandEndTime
          }else if(seatDataFor.mealTypeIdB){
            seatDataFor.resvStartTime = item.bandEndTime
            seatDataFor.resvEndTime = item.resvEndTime
          }else{
            seatDataFor.resvStartTime = item.resvStartTime
            seatDataFor.resvEndTime = item.resvEndTime
          }
        }
      })
      if(flag!=1 && submitStatus == 1){
        $state.go('myOrder-cDetail', {
          'type': 4,
          'getOrderData': $scope.getOrderData,
          'orderList': $scope.orderList,
          'submitId': $event.target.getAttribute('data-submitId'),
          'seatDataFor': seatDataFor,
          'resvStartTime': seatDataFor.resvStartTime,
          'resvEndTime': seatDataFor.resvEndTime,
          'isSubmitOrder': $scope.canSubmit
        });
      }else if(flag!=1 && submitStatus != 1){
        $state.go('myOrder-cDetail', {
          'type': 3 + (new Date().getTime()),
          'getOrderData': $scope.getOrderData,
          'orderList': $scope.orderList,
          'resvOrder': resvOrder,
          'tableAreaName': tableAreaName,
          'tableNo': tableName
        });
      }
      return
    }
    console.log(resvOrder);
    if ($scope.isCanyin) {
      console.log($scope.getOrderData);
      $state.go('myOrder-cDetail', {
        'type': 3 + (new Date().getTime()),
        'getOrderData': $scope.getOrderData,
        'orderList': $scope.orderList,
        'resvOrder': resvOrder,
        'tableAreaName': tableAreaName,
        'tableNo': tableNo
      });
    } else {
      $state.go('myOrder-yDetail', {
        'type': 3 + (new Date().getTime()),
        'getOrderData': $scope.getOrderData,
        'orderList': $scope.orderList,
        'resvOrder': resvOrder
      });
    }
  };
  $scope.editSubmitOrder = function($event){
    var flag = $event.target.getAttribute('data-flag');
    var seatDataFor = {
      'mealTypeId': $event.target.getAttribute('data-mealTypeId'),
      'mealTypeName': $event.target.getAttribute('data-mealTypeName'),
      'mealTypeIdA': $event.target.getAttribute('data-mealTypeIdA'),
      'mealTypeIdB': $event.target.getAttribute('data-mealTypeIdB'),
      'resvDate': $event.target.getAttribute('data-resvDate'),
      'resvStartTime': '',
      'resvEndTime': '',
      // 'isKuaTian': $scope.isKuaTian,
      // 'showDate': $scope.showDate,
      // 'status': $scope.status,
      'tableAreaId': $event.target.getAttribute('data-tableAreaId'),
      // 'peicai': $scope.peicai,
      'area': $event.target.getAttribute('data-tableAreaName'),
      // 'state': $scope.state,
      // 'confirm': $scope.confirm,
      // 'rows': 60
    };
    var mealTypes = JSON.parse(sessionStorage['mealTypes']);
    mealTypes.map(item=>{
      if(item.id == seatDataFor.mealTypeId){
        if(seatDataFor.mealTypeIdA){
          seatDataFor.resvStartTime = item.resvStartTime
          seatDataFor.resvEndTime = item.bandEndTime
        }else if(seatDataFor.mealTypeIdB){
          seatDataFor.resvStartTime = item.bandEndTime
          seatDataFor.resvEndTime = item.resvEndTime
        }else{
          seatDataFor.resvStartTime = item.resvStartTime
          seatDataFor.resvEndTime = item.resvEndTime
        }
      }
    })
    $state.go('myOrder-cDetail', {
      'type': 2,
      'getOrderData': $scope.getOrderData,
      'orderList': $scope.orderList,
      'resvOrder': $event.target.getAttribute('data-resvOrder'),
      'tableAreaName': $event.target.getAttribute('data-tableAreaName'),
      'tableNo': $event.target.getAttribute('data-tableNo'),
      // 'isChangeTable': isChangeTable,
      'seatDataFor': seatDataFor,
      // 'seatDetail': $scope.seatDetail,
      'resvStartTime': seatDataFor.resvStartTime,
      'resvEndTime': seatDataFor.resvEndTime,
      // 'isKuaTian': $scope.isKuaTian,
      // 'desttime': desttime
    });
  }
  $scope.typeTime = function () {
    return (new Date().getTime());
  };
  if ($stateParams.getOrderData) {
    $scope.canLoad = $stateParams.getOrderData.canLoad;
  } else {
    $scope.canLoad = true;
  }
  $scope.freshTime = function (date) {
    var date = new Date(date);
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m;
    }
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    var dateString = date.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.info = JSON.parse(localStorage['info']);
  $scope.businessId = $scope.info.businessId;
  if ($stateParams.getOrderData) {
    $scope.state = $stateParams.getOrderData.state;
  } else {
    $scope.state = $scope.canSubmit?'已提交申请':'今日预到';
  }
  if ($stateParams.getOrderData) {
    if($stateParams.getOrderData.isCanyin){
      $scope.meal = $stateParams.getOrderData.meal;
    }else{
      $scope.ymeal = $stateParams.getOrderData.meal;
    }
  } else {
    $scope.meal = "全部餐别";
    $scope.ymeal = "全部餐别";
  }
  $scope.getOrderFlashData = {
    "appUserId": $scope.info.id,
    'businessId': $scope.businessId,
    "qryType": 0,
    "mealTypeId": '',
    "vipName": '',
    "starttime": $scope.freshTime($scope.getMealDate().getTime()),
    "endtime": $scope.freshTime($scope.getMealDate().getTime()),
    "startYtime": $scope.freshTime($scope.getMealDate().getTime()),
    "endYtime": $scope.freshTime($scope.getMealDate().getTime()),
    "page": 1,
    "rows": 10,
    'area': '全部区域',
    'tableAreaId': ''
  };
  $scope.getOrderData = {
    'isCanyin': true,
    'isYanhui': false,
    "appUserId": $scope.info.id,
    'businessId': $scope.businessId,
    "qryType": 0,
    "mealTypeId": '',
    "vipName": '',
    "starttime": $scope.freshTime(new Date().getTime()),
    "endtime": $scope.freshTime(new Date().getTime()),
    "startYtime": $scope.freshTime(new Date().getTime()),
    "endYtime": $scope.freshTime(new Date().getTime()),
    "page": 1,
    "rows": 10,
    'canLoad': $scope.canLoad,
    'meal': $scope.meal,
    'state': $scope.state,
    'flag': ''
  };
  if($scope.isCanyin){
    $scope.getOrderData.meal = $scope.meal
  }else{
    $scope.getOrderData.meal = $scope.ymeal
  }
  if ($stateParams.getOrderData) {
    $scope.getOrderData = $stateParams.getOrderData;
    console.log($scope.getOrderData);
    console.log(999999999999999999);
  }
  $scope.getOrderFlashSuccess = function (data) {
    console.log(data);
    $scope.orderList = [];
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].perPrice = parseInt(data.list[i].payamount / data.list[i].resvNum);
    }
    $scope.orderList = $scope.orderList.concat(data.list);
    console.log($scope.orderList);
    $scope.canLoad = !data.isLastPage;
    $scope.getOrderData.canLoad = $scope.canLoad;
    $ionicLoading.hide();
  };
  $scope.getOrderSuccess = function (data) {
    console.log(data);
    if (!$scope.orderList) {
      $scope.orderList = [];
    }
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].perPrice = parseInt(data.list[i].payamount / data.list[i].resvNum);
    }
    $scope.orderList = data.list;
    for(var a=0;a<$scope.orderList.length;a++){
      if (($scope.info.id != $scope.orderList[a].appUserId) && ($scope.info.hiddenPhoneNum == true)) {
        $scope.orderList[a].vipPhone = $scope.orderList[a].vipPhone.slice(0, 3) + '****' + $scope.orderList[a].vipPhone.slice(7);
      }
    }
    console.log($scope.orderList);
    $scope.canLoad = !data.isLastPage;
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.getOrderData.canLoad = $scope.canLoad;
    console.log($scope.getOrderData.canLoad);
    $ionicLoading.hide();
    if(localStorage['scrollTop1']!= 0){
      $ionicScrollDelegate.scrollTo(0,localStorage['scrollTop1'],false);
    }
  };
  $scope.getSubmitSuccess = function (data) {
    console.log(data);
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].perPrice = parseInt(data.list[i].payamount / data.list[i].resvNum);
      data.list[i].tableNo = data.list[i].tableName
    }
    if ($scope.getOrderData.page == 1) {
      $scope.orderList = [];
      $scope.orderList = data.list;
    }else{
      $scope.orderList = $scope.orderList.concat(data.list);
    }
    console.log($scope.orderList)
    $scope.canLoad = !data.isLastPage;
    $scope.getOrderData.canLoad = $scope.canLoad;
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $ionicLoading.hide();
    if(localStorage['scrollTop1']!= 0){
      $ionicScrollDelegate.scrollTo(0,localStorage['scrollTop1'],false);
    }
  };
  $scope.error = function (data) {
    $scope.isSubmit = false
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
    $ionicLoading.hide();
  };
  $scope.doInfinite = function () {
    console.log('加载更多');
    $scope.getOrderData.page += 1;
    $scope.showLoading();
    if ($scope.isCanyin) {
      if($scope.state == '已提交申请' || $scope.state == '成功申请' || $scope.state == '失败申请' || $scope.state == '等待中申请'){
        $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
      }else{
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      }
    } else {
      var params = JSON.parse(JSON.stringify($scope.getOrderData))
      if($scope.state == '全店已确认' || $scope.state == '全店已完成'){
        delete params['appUserId']
      }
      $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
    }
  };
  /////////////////////////////////////////////////starttime
  $scope.backOrderShow = false;
  $scope.backOrderName = '';
  if($scope.info.appOperationSet.indexOf(12) != -1){
    $scope.backOrderShow = true;
    $scope.backOrderName = '待回访';
  }
  if($scope.info.appOperationSet.indexOf(13) != -1){
    $scope.backOrderShow = true;
    $scope.backOrderName = '全店待回访';
  }
  if($scope.canSubmit){
    var state = `<ion-popover-view style="height:216px;width:120px;">
              <ion-content style="background-color: transparent;" overflow-scroll="true">
                <div class="list">
                  <a class="item text-center" ng-click="choose($event,1)" data-type="" data-id="已提交申请">{{'已提交申请'|T}}</a>
                  <a class="item text-center" ng-click="choose($event,1)" data-type="1" data-id="成功申请">{{'成功申请'|T}}</a>
                  <a class="item text-center" ng-click="choose($event,1)" data-type="2" data-id="失败申请">{{'失败申请'|T}}</a>
                  <a class="item text-center" ng-click="choose($event,1)" data-type="3" data-id="等待中申请">{{'等待中申请'|T}}</a>
                </div>
              </ion-content>
            </ion-popover-view>`;
  }else{
    var height = 400
    if($scope.info.operationType!=1){
      height = 216
    }
    if($scope.backOrderShow){
      height += 54
    }
    var state = `<ion-popover-view style="height:${height}px;max-height:400px;width:120px;">
                  <ion-content style="background-color: transparent;" overflow-scroll="true">
                    <div class="list">
                      <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店预到">{{'全店预到'|T}}</a>
                      <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店订单">{{'全店订单'|T}}</a>
                      <a class="item text-center" ng-click="choose($event,1)" data-id="今日预到">{{'今日预到'|T}}</a>
                      <a class="item text-center" ng-click="choose($event,1)" data-id="更多预到">{{'更多预到'|T}}</a>
                      <a class="item text-center" ng-click="choose($event,1)" data-id="历史订单">{{'历史订单'|T}}</a>
                      <a ng-if="backOrderShow" class="item text-center" ng-click="choose($event,1)" data-id="${$scope.backOrderName}">{{backOrderName|T}}</a>
                      <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="散客订单">{{'散客订单'|T}}</a>
                      <a class="item text-center" ng-click="choose($event,1)" data-id="退订查询">{{'退订查询'|T}}</a>
                      <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="异常订单">{{'异常订单'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  }
  $scope.popoverState = $ionicPopover.fromTemplate(state, {
    scope: $scope
  });
  $scope.openPopover = function ($event, num) {
    if (num == 1) {
      $scope.popoverState.show($event);
    } else if (num == 2) {
      $scope.popoverMeal.show($event);
    } else if (num == 3) {
      $scope.popoverMealY.show($event);
    }
  };
  $scope.closePopover = function (num) {
    if (num == 1) {
      $scope.popoverState.hide();
    } else if (num == 2) {
      $scope.popoverMeal.hide();
    } else if (num == 3) {
      $scope.popoverMealY.hide();
    }
  };
  $scope.openArea = function ($event) {
    $scope.popoverArea.show($event);
  }
  $scope.closeArea = function () {
    $scope.popoverArea.hide();
  }
  $scope.choose = function ($event, num) {
    change($event, num);
  };
  $scope.chooseArea = function ($event) {
    var a = $event.target;
    var txt = a.getAttribute("data-areaname");
    $scope.tableAreaId = a.getAttribute("data-tableId");
    $scope.getOrderData.tableAreaId = $scope.tableAreaId;
    $scope.area = txt;
    $scope.getOrderData.page = 1;
    $scope.getOrderData.area = $scope.area;
    $scope.showLoading();
    $scope.orderList = [];
    if ($scope.isCanyin) {
      if($scope.state == '已提交申请' || $scope.state == '成功申请' || $scope.state == '失败申请' || $scope.state == '等待中申请'){
        $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
      }else{
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      }
    } else {
      var params = JSON.parse(JSON.stringify($scope.getOrderData))
      if($scope.state == '全店已确认' || $scope.state == '全店已完成'){
        delete params['appUserId']
      }
      $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
    }
    $scope.closeArea();
  };
  $scope.changeC = function () {
    $scope.isCanyin = true;
    $scope.isYanhui = false;
    $scope.showTime = false;
    $scope.isStore = false;
    $scope.backOrderShow1 = false;
    $scope.getOrderData.isCanyin = true;
    $scope.getOrderData.isYanhui = false;
    //$scope.getOrderFlashData.qryType=0;
    $scope.state = $scope.canSubmit?'已提交申请':'今日预到';
    $scope.meal = '全部餐次';
    $scope.getOrderData.state = $scope.state;
    $scope.getOrderData.meal = $scope.meal;
    if($scope.canSubmit){
      state = `<ion-popover-view style="height:216px;width:120px;">
                <ion-content style="background-color: transparent;" overflow-scroll="true">
                  <div class="list">
                    <a class="item text-center" ng-click="choose($event,1)" data-type="" data-id="已提交申请">{{'已提交申请'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-type="1" data-id="成功申请">{{'成功申请'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-type="2" data-id="失败申请">{{'失败申请'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-type="3" data-id="等待中申请">{{'等待中申请'|T}}</a>
                  </div>
                </ion-content>
              </ion-popover-view>`;
    }else{
      var height = 400
      if($scope.info.operationType!=1){
        height = 216
      }
      if($scope.backOrderShow){
        height += 54
      }
      state = `<ion-popover-view style="height:${height}px;max-height:400px;width:120px;">
                <ion-content style="background-color: transparent;" overflow-scroll="true">
                  <div class="list">
                    <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店预到">{{'全店预到'|T}}</a>
                    <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="全店订单">{{'全店订单'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-id="今日预到">{{'今日预到'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-id="更多预到">{{'更多预到'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-id="历史订单">{{'历史订单'|T}}</a>
                    <a ng-if="backOrderShow" class="item text-center" ng-click="choose($event,1)" data-id="${$scope.backOrderName}">{{backOrderName|T}}</a>
                    <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="散客订单">{{'散客订单'|T}}</a>
                    <a class="item text-center" ng-click="choose($event,1)" data-id="退订查询">{{'退订查询'|T}}</a>
                    <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="异常订单">{{'异常订单'|T}}</a>
                  </div>
                </ion-content>
              </ion-popover-view>`;
    }
    $scope.popoverState = $ionicPopover.fromTemplate(state, {
      scope: $scope
    });
    $scope.openPopover = function ($event, num) {
      if (num == 1) {
        $scope.popoverState.show($event);
      } else if (num == 2) {
        $scope.popoverMeal.show($event);
      } else if (num == 3) {
        $scope.popoverMealY.show($event);
      }
    };
    $scope.closePopover = function (num) {
      if (num == 1) {
        $scope.popoverState.hide();
      } else if (num == 2) {
        $scope.popoverMeal.hide();
      } else if (num == 3) {
        $scope.popoverMealY.hide();
      }
    };
    $scope.showLoading();
    $scope.orderList = [];
    if($scope.state == '已提交申请'){
      $scope.showTime = true;
      $scope.endgettime = '2030-01-01';
      $scope.startgettime = '2004-01-01';
      $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
      $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
      $scope.getOrderData.flag = ''
      $scope.getOrderData.starttime = $scope.starttime;
      $scope.getOrderData.endtime = $scope.endtime;
      $scope.disstarttime = $scope.getOrderData.disstarttime = false
      $scope.disendtime = $scope.getOrderData.disendtime = false
      $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
    }else{
      $httpOrder.getOrder($scope.getOrderFlashData, $scope.getOrderSuccess, $scope.error);
    }
  };
  $scope.changeY = function () {
    $scope.isCanyin = false;
    $scope.isYanhui = true;
    $scope.showYanhui = false;
    $scope.isStore = false;
    $scope.backOrderShow1 = false;
    $scope.getOrderData.isCanyin = false;
    $scope.getOrderData.isYanhui = true;
    $scope.endgettime = '2030-01-01';
    $scope.startgettime = '2004-01-01';
    $scope.starttime = $scope.freshTime(new Date().getTime());
    $scope.endtime = ''
    $scope.getOrderData.starttime = $scope.starttime;
    $scope.getOrderData.endtime = $scope.endtime
    //$scope.getOrderFlashData.qryType=1;
    //$scope.getOrderData.qryType = 1;
    $scope.state = '已确认';
    $scope.ymeal = '全部餐次';
    $scope.getOrderData.state = $scope.state;
    $scope.getOrderData.meal = $scope.ymeal;
    state = `<ion-popover-view style="height:212px;width:120px;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                    <a class="item text-center" ng-if="!info.hiddenPhoneNum" ng-click="choose($event,1)" data-id="全店已确认">{{'全店已确认'|T}}</a>
                    <a class="item text-center" ng-if="!info.hiddenPhoneNum" ng-click="choose($event,1)" data-id="全店已完成">{{'全店已完成'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="已确认">{{'已确认'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="待预订">{{'待预订'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="已失效">{{'已失效'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-id="已完成">{{'已完成'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
    $scope.popoverState = $ionicPopover.fromTemplate(state, {
      scope: $scope
    });
    $scope.openPopover = function ($event, num) {
      if (num == 1) {
        $scope.popoverState.show($event);
      } else if (num == 2) {
        $scope.popoverMeal.show($event);
      } else if (num == 3) {
        $scope.popoverMealY.show($event);
      }
    };
    $scope.closePopover = function (num) {
      if (num == 1) {
        $scope.popoverState.hide();
      } else if (num == 2) {
        $scope.popoverMeal.hide();
      } else if (num == 3) {
        $scope.popoverMealY.hide();
      }
    };
    $scope.showLoading();
    $scope.orderList = [];
    $httpOrder.getYOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
  };
  $scope.changeS = function () {
    $scope.isCanyin = false;
    $scope.isYanhui = false;
    $scope.showYanhui = false;
    $scope.isStore = true;
    $scope.backOrderShow1 = false;
    $scope.endgettime = '2030-01-01';
    $scope.startgettime = '2004-01-01';
    $scope.starttime = $scope.endtime = $scope.freshTime(new Date().getTime());
    //$scope.getOrderFlashData.qryType=1;
    //$scope.getOrderData.qryType = 1;
    $scope.showLoading();
    $scope.storeList = [];
    $scope.storeData = {};
    $scope.storeData.appUserId = $scope.info.id;
    $scope.storeData.businessId = $scope.info.businessId;
    $scope.storeData.date = "1";
    $httpOrder.getUserStore($scope.storeData, $scope.getUserStoreSuccess, $scope.error);
  };
  $scope.getUserStoreSuccess = function (data) {
    $scope.sumPrice = 0;
    if(data.code = 200 && data.data){
      $scope.storeList = data.data;
      console.log($scope.storeList);
      for (var i = 0;i< $scope.storeList.length;i++){
        $scope.sumPrice += Number($scope.storeList[i].amount);
      }
    }
    $ionicLoading.hide();
  };
  var change = function ($event, num) {
    localStorage['scrollTop1'] = 0;
    var a = $event.target;
    var txt = a.getAttribute("data-id");
    $scope.closePopover(num);
    if (num == 1) {
      $scope.state = txt;
      $scope.getOrderData.state = $scope.state;
      if (txt == '更多预到') {
        $scope.backOrderShow1 = false;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 1;
        $scope.disstarttime = false;
        $scope.disendtime = false;
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() + 86400000);
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime() + 86400000 * 30);
        /////////////////////////////////////////////////////////
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() + 86400000);
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime() + 86400000 * 30);
        ////////////////////////////////////////////////////////
        $scope.startgettime = $scope.starttime;
        $scope.endgettime = '2030-01-01';
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '历史订单') {
        $scope.backOrderShow1 = true;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 2;
        $scope.disstarttime = false;
        $scope.disendtime = false;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '散客订单') {
        $scope.backOrderShow1 = false;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 6;
        $scope.disstarttime = false;
        $scope.disendtime = false;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '全店待回访') {
        $scope.backOrderShow1 = true;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 8;
        $scope.disstarttime = false;
        $scope.disendtime = false;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '待回访') {
        $scope.backOrderShow1 = true;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 7;
        $scope.disstarttime = false;
        $scope.disendtime = false;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      }else if (txt == '全店订单') {
        $scope.backOrderShow1 = true;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 5;
        $scope.disstarttime = false;
        $scope.disendtime = false;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 7);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '退订查询') {
        $scope.backOrderShow1 = false;
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 3;
        $scope.disstarttime = false;
        $scope.disendtime = true;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '异常订单') {
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 4;
        $scope.disstarttime = false;
        $scope.disendtime = true;
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        //////////////////////////////////////////////////////////
        $scope.startgettime = '2004-01-01';
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.disstarttime = $scope.disstarttime;
        $scope.getOrderData.disendtime = $scope.disendtime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '今日预到') {
        $scope.backOrderShow1 = false;
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 0;
        $scope.starttime = $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime());
        //////////////////////////////////////////////////////////
        $scope.startgettime = $scope.starttime;
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '全店预到') {
        $scope.backOrderShow1 = false;
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 0;
        $scope.starttime = $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $orderTime.starttime = $scope.freshTime($scope.getMealDate().getTime());
        //////////////////////////////////////////////////////////
        $scope.startgettime = $scope.starttime;
        $scope.endgettime = $scope.endtime;
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.getOrderData.startgettime = $scope.starttime;
        $scope.getOrderData.endgettime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getOrderQ($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if(txt == '已提交申请' || txt == '成功申请' || txt == '失败申请' || txt == '等待中申请'){
        $scope.orderList = [];
        $scope.showTime = true;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.getOrderData.page = 1;
        $scope.starttime = $scope.freshTime($scope.getMealDate().getTime() - 86400000 * 30);
        $scope.endtime = $scope.freshTime($scope.getMealDate().getTime());
        $scope.getOrderData.flag = a.getAttribute("data-type")
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.disstarttime = $scope.getOrderData.disstarttime = false
        $scope.disendtime = $scope.getOrderData.disendtime = false
        $ionicScrollDelegate.scrollTo(0, 0,false);
        $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
      } else if (txt == '已确认') {
        $scope.backOrderShow1 = true;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.showYanhui = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 0;
        $scope.starttime = $scope.freshTime(new Date().getTime());
        $scope.endtime = ''
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getYOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '待预订') {
        $scope.backOrderShow1 = false;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.showYanhui = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 1;
        $scope.starttime = $scope.endtime = $scope.freshTime(new Date().getTime());
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $orderTime.starttime = $scope.freshTime(new Date().getTime());
        //////////////////////////////////////////////////////////
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getYOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '已失效') {
        $scope.backOrderShow1 = false;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.showYanhui = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 2;
        $scope.starttime = $scope.endtime = $scope.freshTime(new Date().getTime());
        //////////////////////////////////////////////////////////
        $orderTime.endtime = $orderTime.starttime = $scope.freshTime(new Date().getTime());
        //////////////////////////////////////////////////////////
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getYOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '已完成') {
        $scope.backOrderShow1 = true;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.showYanhui = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 3;
        $scope.starttime = ''
        $scope.endtime = $scope.freshTime(new Date().getTime());
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.showLoading();
        $httpOrder.getYOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '全店已确认') {
        $scope.backOrderShow1 = true;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.showYanhui = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 0;
        $scope.starttime = $scope.freshTime(new Date().getTime());
        $scope.endtime = ''
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.showLoading();
        var params = JSON.parse(JSON.stringify($scope.getOrderData))
        delete params['appUserId']
        $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
      } else if (txt == '全店已完成') {
        $scope.backOrderShow1 = true;
        $scope.endgettime = '2030-01-01';
        $scope.startgettime = '2004-01-01';
        $scope.orderList = [];
        $scope.showTime = false;
        $scope.showYanhui = false;
        $scope.getOrderData.page = 1;
        $scope.getOrderData.qryType = 3;
        $scope.starttime = ''
        $scope.endtime = $scope.freshTime(new Date().getTime());
        $scope.getOrderData.showTime = $scope.showTime;
        $scope.getOrderData.starttime = $scope.starttime;
        $scope.getOrderData.endtime = $scope.endtime;
        $scope.showLoading();
        var params = JSON.parse(JSON.stringify($scope.getOrderData))
        delete params['appUserId']
        $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
      }
    } else if (num == 2) {
      $scope.orderList = [];
      $scope.meal = a.innerText;
      $scope.getOrderData.meal = $scope.meal;
      $scope.getOrderData.page = 1;
      $scope.endgettime = '2030-01-01';
      $scope.startgettime = '2004-01-01';
      $scope.getOrderData.mealTypeId = a.getAttribute('data-mealId');
      $scope.showLoading();
      if ($scope.isCanyin) {
        if($scope.state == '已提交申请' || $scope.state == '成功申请' || $scope.state == '失败申请' || $scope.state == '等待中申请'){
          $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
        }else{
          $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
        }
      } else {
        var params = JSON.parse(JSON.stringify($scope.getOrderData))
        if($scope.state == '全店已确认' || $scope.state == '全店已完成'){
          delete params['appUserId']
        }
        $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
      }
    } else if (num == 3) {
      $scope.orderList = [];
      $scope.ymeal = a.innerText;
      $scope.getOrderData.meal = $scope.ymeal;
      $scope.getOrderData.page = 1;
      $scope.getOrderData.mealTypeId = a.getAttribute('data-mealId');
      $scope.showLoading();
      if ($scope.isCanyin) {
        if($scope.state == '已提交申请' || $scope.state == '成功申请' || $scope.state == '失败申请' || $scope.state == '等待中申请'){
          $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
        }else{
          $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
        }
      } else {
        var params = JSON.parse(JSON.stringify($scope.getOrderData))
        if($scope.state == '全店已确认' || $scope.state == '全店已完成'){
          delete params['appUserId']
        }
        $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
      }
    }
  };
  $scope.newIpObj = function (num) {
    localStorage['scrollTop1'] = 0;
    var ipObj1 = {
      callback: function (date) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + date, new Date(date));
        $scope.orderList = [];
        // if (date > (new Date().getTime())) {
        //   $scope.endtime = $scope.freshTime(date);
        //   $scope.getOrderData.endtime = $scope.endtime;
        // } else if (num == 2) {
        //   $scope.endtime = $scope.freshTime(date);
        //   $scope.getOrderData.endtime = $scope.endtime;
        // } else {
        //   $scope.starttime = $scope.freshTime(date);
        //   $scope.getOrderData.starttime = $scope.starttime;
        // }
        if (num == 2) {
          if (date < new Date($scope.starttime).getTime()) {
            $showAlert.alert('请选择开始时间之后的日期');
            return
          }
          $scope.endtime = $scope.freshTime(date);
          $scope.getOrderData.endtime = $scope.endtime;
        } else {
          if (date > new Date($scope.endtime).getTime()) {
            $showAlert.alert('请选择结束时间之前的日期');
            return
          }
          $scope.starttime = $scope.freshTime(date);
          $scope.getOrderData.starttime = $scope.starttime;
        }
        $scope.showLoading();
        if($scope.state == '已提交申请' || $scope.state == '成功申请' || $scope.state == '失败申请' || $scope.state == '等待中申请'){
          $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
        }else{
          $httpOrder.getOrder($scope.getOrderData, $scope.getOrderSuccess, $scope.error);
        }
      },
      from: new Date($scope.startgettime), //Optional
      to: new Date($scope.endgettime), //Optional
      weeksList: ["日", "一", "二", "三", "四", "五", "六"],
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup',       //Optional
      dateFormat: 'yyyy-MM-dd'
    };
    return ipObj1;
  };
  $scope.openDatePicker = function (num) {
    var timePicker = $scope.newIpObj(num);
    ionicDatePicker.openDatePicker(timePicker);
  };
  $scope.newIpObj1 = function (num) {
    var ipObj1 = {
      callback: function (date) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + date, new Date(date));
        $scope.orderList = [];
        if (num == 2) {
          $scope.endtime = $scope.freshTime(date);
          console.log($scope.endgettime);
          $scope.getOrderData.endtime = $scope.endtime;
        } else {
          $scope.starttime = $scope.freshTime(date);
          $scope.getOrderData.starttime = $scope.starttime;
        }
        $scope.showLoading();
        var params = JSON.parse(JSON.stringify($scope.getOrderData))
        if($scope.state == '全店已确认' || $scope.state == '全店已完成'){
          delete params['appUserId']
        }
        $httpOrder.getYOrder(params, $scope.getOrderSuccess, $scope.error);
      },
      from: new Date($scope.startgettime), //Optional
      to: new Date($scope.endgettime), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup',       //Optional
      dateFormat: 'yyyy-MM-dd'
    };
    return ipObj1;
  };
  $scope.newIpObj2 = function (num) {
    var ipObj1 = {
      callback: function (date) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + date, new Date(date));
        $scope.storeList = [];
        if (num == 2) {
          $scope.endtime = $scope.freshTime(date);
          console.log($scope.endgettime);
        } else {
          $scope.starttime = $scope.freshTime(date);
        }
        $scope.showLoading();
        $scope.storeData.appUserId = $scope.info.id;
        $scope.storeData.businessId = $scope.info.businessId;
        $scope.storeData.date = Number($scope.endtime.replace(/-/g,"")) - Number($scope.starttime.replace(/-/g,""));
        $httpOrder.getUserStore($scope.storeData, $scope.getUserStoreSuccess, $scope.error);
      },
      from: new Date($scope.startgettime), //Optional
      to: new Date($scope.endgettime), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup',       //Optional
      dateFormat: 'yyyy-MM-dd'
    };
    return ipObj1;
  };
  $scope.openDatePicker1 = function (num) {
    if (num == 2) {
      $scope.endgettime = new Date().getTime() + 86400000 * 3650;
    } else {
      $scope.startgettime = new Date().getTime() - 86400000 * 3650;
    }
    if ($scope.state == '全店已确认' || $scope.state == '已确认'){
      $scope.startgettime = new Date().getTime()
    }
    if ($scope.state == '全店已完成' || $scope.state == '已完成'){
      $scope.endgettime = new Date().getTime()
    }
    var timePicker = $scope.newIpObj1(num);
    ionicDatePicker.openDatePicker(timePicker);
  };
  $scope.openDatePicker2 = function (num) {
    if (num == 2) {
      $scope.endgettime = new Date().getTime() + 86400000 * 3650;
    } else {
      $scope.startgettime = new Date().getTime() - 86400000 * 3650;
    }
    var timePicker = $scope.newIpObj2(num);
    ionicDatePicker.openDatePicker(timePicker);
  };
  $scope.click = function () {
    console.log(1);
  };
  $scope.areaSuccess = function (data) {
    $scope.mealTypes = data.mealTypes;
    var mealTypesLength = $scope.mealTypes.length * 53 + 53;
    var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,2)" data-mealId="" data-id="全部餐别">
                        {{'全部餐别'|T}}
                     </a>
                     <a class="item text-center" ng-click="choose($event,2)" ng-repeat="meal in mealTypes" data-id={{meal.mealTypeName}} data-mealId={{meal.id}}>
                        {{meal.mealTypeName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
    $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
      scope: $scope
    });
    $scope.tableAreas = data.tableAreas;
    var tableAreasLength = $scope.tableAreas.length > 5 ? 265 : $scope.tableAreas.length * 53 + 53;
    var area = `<ion-popover-view style="height:${tableAreasLength}px;width:150px;;padding-top:0;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                     <a class="item text-center"  ng-click="chooseArea($event)" data-areaname="全部区域" data-tableId="">{{'全部区域'|T}}</a>
                     <a class="item text-center"  ng-click="chooseArea($event)" data-areaname={{table.tableAreaName}} ng-repeat="table in tableAreas"
                     data-tableId={{table.id}}>
                        {{table.tableAreaName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
    $scope.popoverArea = $ionicPopover.fromTemplate(area, {
      scope: $scope
    });
    $ionicLoading.hide();
  };
  $scope.YareaSuccess = function (data) {
    $scope.mealYTypes = data.mealTypes;
    var mealTypesLengthy = $scope.mealYTypes.length * 53 + 53;
    var mealy = `<ion-popover-view style="height:${mealTypesLengthy}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,3)" data-mealId="" data-id="全部餐别">
                        {{'全部餐别'|T}}
                     </a>
                     <a class="item text-center" ng-click="choose($event,3)" ng-repeat="meal in mealYTypes" data-id={{meal.mealTypeName}} data-mealId={{meal.id}}>
                        {{meal.mealTypeName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
    $scope.popoverMealY = $ionicPopover.fromTemplate(mealy, {
      scope: $scope
    });
    $ionicLoading.hide();
  };
  /////////////////订单属性记录//////////////////////////////////////
  $scope.seeShu = function ($event) {
    $scope.showShu = true;
    $scope.propertyBatchNo = $event.target.getAttribute('data-batchNo');
    $scope.customerVipPhone = $event.target.getAttribute('data-vipPhone');
    // console.log('propertyId=' + $scope.propertyId);
    // $httpOrder.getProperty($scope.businessId, $scope.getPropertySuccess, $scope.error);
    $scope.getKeData = {
      "batchNo": $scope.propertyBatchNo, // 批次号
      "businessId": $scope.info.businessId, // 酒店ID
      "appUserId": $scope.info.id, // 用户ID
    };
    $httpOrder.getKe($scope.getKeData, $scope.getKeSuccess, $scope.error);
    $httpOrder.getGuest($scope.getKeData, $scope.getQuestSuccess, $scope.error);
  };
  $scope.backOrder = function (a,$event) {
    var nowTransform = $("#order-scroll .scroll")[0].style.transform;
    var myScrollTop = 0;
    if(nowTransform){
      var startIndex = nowTransform.indexOf('(')+1;
      var endIndex = nowTransform.indexOf(')');
      var nowTranslate = nowTransform.substring(startIndex,endIndex);
      var translateArr = nowTransform.split(",");
      myScrollTop=translateArr[1].replace(/-|px/g, "");
    }else {
      myScrollTop = document.getElementById('order-scroll').getElementsByClassName("scroll")[0].scrollTop;
    }
    console.log(myScrollTop);
    localStorage['scrollTop1'] = myScrollTop;
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    var vipName = $event.target.getAttribute('data-vipName');
    var vipPhone = $event.target.getAttribute('data-vipPhone');
    var payamount = $event.target.getAttribute('data-payamount');
    var actualPayAmount = $event.target.getAttribute('data-actualPayAmount');
    var resvDate = $event.target.getAttribute('data-resvDate');
    var perPrice = $event.target.getAttribute('data-perPrice');
    var isBack = $event.target.getAttribute('data-isBack');
    var tableNo = $event.target.getAttribute('data-tableNo');
    var batchNo = $event.target.getAttribute('data-batchno');
    var appUserId = $event.target.getAttribute('data-appUserId');
    var tableAreaName = $event.target.getAttribute('data-tableAreaName');
    var actualTableNum = $event.target.getAttribute('data-actualTableNum');
    var resvTableNum = $event.target.getAttribute('data-resvTableNum');
    $state.go('backOrder',{'resvOrder':resvOrder,'getOrderData': $scope.getOrderData,'orderList': $scope.orderList,'isBack':isBack,'actualTableNum':actualTableNum,'isYanhui':a,'vipName':vipName,'appUserId':appUserId,'vipPhone':vipPhone,'batchNo':batchNo,'payamount':payamount,'resvDate':resvDate,'perPrice':perPrice,'tableNo':tableNo,'tableAreaName':tableAreaName,'resvTableNum':resvTableNum, 'actualPayAmount': actualPayAmount});
  };
  // $scope.getPropertySuccess = function (data) {
  //   console.log(data);
  //   $scope.orderProperty = data;
  //   $scope.property = `<ion-popover-view style="height:${data.length >= 5 ? 265 : 53 * data.length}px;width:120px;">
  //                      <ion-content style="background-color: transparent;" overflow-scroll="true">
  //                        <div class="list">
  //                          <a class="item text-center" ng-repeat="property in orderProperty" data-propertyId="{{property.id}}" data-propertyName="{{property.propertyName}}" ng-click="chooseProperty($event)">
  //                            {{property.propertyName}}
  //                          </a>
  //                        </div>
  //                      </ion-content>
  //                    </ion-popover-view>`;
  //   $scope.popoverProperty = $ionicPopover.fromTemplate($scope.property, {
  //     scope: $scope
  //   });
  //   $scope.openProperty = function ($event) {
  //     $scope.popoverProperty.show($event);
  //   }
  //   $scope.closeProperty = function () {
  //     $scope.popoverProperty.hide();
  //   }
  //   $scope.chooseProperty = function ($event) {
  //     $scope.propertyName = $event.target.getAttribute('data-propertyName');
  //     $scope.propertyId = $event.target.getAttribute('data-propertyId');
  //     console.log($scope.propertyId);
  //     $scope.popoverProperty.hide();
  //   }
  // };
  $scope.getKeSuccess = function (data) {
    console.log(data);
    if (data.length>0) {
      $scope.keList = data;
      $('#hostBtn').hide()
      var str = `<div ng-repeat="item in keList track by $index" class="row" style="background:#fff;border-bottom:1px solid #ddd;padding:10px 12px;align-items:center;margin: 0;" ng-click="goCusDetail(item.masterCustomerId,$event)">
                  <span class="icon icon-close-r" style="margin-right: 10px;" ng-click="delDetail(item.id,1,$event)"></span>
                  <div class="col">
                    <div>{{item.vipName}} {{item.vipSex=='男'?'先生':'女士'}}</div>
                    <div style="font-size:12px;color:#999;">{{item.vipPhone}}</div>
                  </div>
                  <span class="icon icon-arrow-right"></span>
                </div>`
      var template = angular.element(str)
      var htmltemp = $compile(template)($scope)
      $('#hostDiv').html('')
      $('#hostDiv').append(htmltemp)
    } else {
      $scope.keList = [];
    }
    // for (var i = 0; i < data.customers.length; i++) {
    //   data.customers[i].keId = i;
    // }
    // if (data.property['propertyId']) {
    //   $scope.propertyName = data.property.propertyName;
    //   $scope.propertyId = data.property.propertyId;
    //   $scope.cantChooseProperty = true;
    // } else {
    //   $scope.propertyName = '';
    //   $scope.propertyId = 0;
    //   $scope.cantChooseProperty = false;
    // }
  };
  $scope.getQuestSuccess = function (data) {
    if (data.length>0) {
      $scope.guestList = data;
      var str = `<div ng-repeat="item in guestList track by $index" class="row" style="background:#fff;border-bottom:1px solid #ddd;padding:10px 12px;align-items:center;margin: 0;" ng-click="goCusDetail(item.guestCustomerId,$event)">
                  <span class="icon icon-close-r" style="margin-right: 10px;" ng-click="delDetail(item.id,2,$event)"></span>
                  <div class="col">
                    <div>{{item.vipName}} {{item.vipSex=='男'?'先生':'女士'}}</div>
                    <div style="font-size:12px;color:#999;">{{item.vipPhone}}</div>
                  </div>
                  <span class="icon icon-arrow-right"></span>
                </div>`
      var template = angular.element(str)
      var htmltemp = $compile(template)($scope)
      $('#guestDiv').html('')
      $('#guestDiv').append(htmltemp)
    } else {
      $scope.guestList = [];
    }
  };
  $scope.hideShu = function () {
    $scope.showShu = false;
    $scope.orderProperty = [];
    $scope.keList = [];
    $scope.guestList = [];
    $scope.cantChooseProperty = false;
  };
  $scope.addKe = function ($event,type) {
    $event.stopPropagation();
    var typename = ''
    if(type==1){
      typename = '主客'
    }else{
      typename = '宾客'
    }
    $scope.keData = {};
    $scope.keData.customerSex='男'
    var html = `<div>
                  <div class="row" style="padding:10px 0">
                    <label style="line-height:34px;margin-right:5px;">{{'电话'|T}}</label>
                    <input class="col" type="tel" style="padding: 0;text-align:right" ng-model="keData.customerPhone" id="customerPhone" ng-change="select()" />
                  </div>
                  <div class="row" style="padding:10px 0">
                    <label style="line-height:34px;margin-right:5px;">{{'姓名'|T}}</label>
                    <input class="col" type="text" style="padding: 0;text-align:right" ng-model="keData.customerName" />
                  </div>
                  <div class="row" style="padding:10px 0">
                    <label>{{'性别'|T}}</label>
                    <div class="col" style="padding: 0;text-align: right;">
                      <a class="icon icon-check" ng-click="changeGender($event)" ng-class={'icon-check-r':keData.customerSex=='男'}></a><span class="span-black"  style="font-size: 14px;" data-id="男士">{{'男士'|T}}</span>
                      <a class="icon icon-check" ng-click="changeGender($event)" ng-class={'icon-check-r':keData.customerSex=='女'}></a><span class="span-black" style="font-size: 14px;" data-id="女士">{{'女士'|T}}</span>
                    </div>
                  </div>
                </div>`;
    var popup = $ionicPopup.show({
      cssClass: "er-popup white-popup underPopover",
      template: html,
      title: $T.T(`${typename}信息`),
      scope: $scope,
      buttons: [
        { text: $T.T('取消') },
        { text: $T.T('保存'),
          type: 'button-assertive',
          onTap: function () {
            if($scope.customerVipPhone == $scope.keData.customerPhone){
              $showAlert.alert('不可添加预订人为主/宾客');
              $scope.addKe(type)
              return
            }
            var guestIndex = $scope.guestList.findIndex(function(item){
              return item.vipPhone == $scope.keData.customerPhone
            })
            var isKe = false
            if($scope.keList.length==0) isKe = false
            else isKe = $scope.keList[0].vipPhone == $scope.keData.customerPhone
            if(guestIndex>-1 || isKe){
              $showAlert.alert('不可重复添加主/宾客');
              $scope.addKe(type)
              return
            }
            if(type==1){
              $scope.newKe()
            }else{
              $scope.newGuest()
            }
          }
        }
      ]
    });
    // if ($scope.propertyId == 0) {
    //   $showAlert.alert('请先选择订单属性');
    // } else {
    //   if ($scope.cantChooseProperty == false) {
    //     $scope.newShu();
    //   }
    //   $scope.showShu = false;
    //   $scope.showKe = true;
    //   $scope.keData = {};
    //   $scope.keData.man = true;
    // }
  };
  $scope.delDetail = function(id, type, e){
    e.stopPropagation()
    var params = {
      id: id
    }
    var popup = $ionicPopup.show({
      cssClass: "er-popup white-popup",
      template: `<div style="text-align:center;">${$T.T('是否确认删除')}</div>`,
      title: $T.T('提示'),
      scope: $scope,
      buttons: [
        { text: $T.T('取消') },
        { text: $T.T('保存'),
          type: 'button-assertive',
          onTap: function () {
            if(type==1){
              console.log('删除主客')
              $httpOrder.delKe($.param(params), $scope.delKeSuccess, $scope.error)
            }else{
              console.log('删除宾客')
              $httpOrder.delGuest($.param(params), $scope.delGuestSuccess, $scope.error)
            }
          }
        }
      ]
    });
  };
  $scope.delKeSuccess = function (data){
    $showAlert.alert(data.msg);
    $('#hostBtn').show()
    $httpOrder.getKe($scope.getKeData, $scope.getKeSuccess, $scope.error);
  }
  $scope.delGuestSuccess = function (data){
    $showAlert.alert(data.msg);
    $httpOrder.getGuest($scope.getKeData, $scope.getQuestSuccess, $scope.error);
  }
  $scope.goCusDetail = function(id, e){
    console.log('详情')
    $scope.getOrderData.showYanhui = $scope.showYanhui
    $scope.getOrderData.isYanhui = $scope.isYanhui
    $scope.getOrderData.isCanyin = $scope.isCanyin
    $scope.getOrderData.disstarttime = $scope.disstarttime
    $scope.getOrderData.disendtime = $scope.disendtime
    $scope.getOrderData.starttime = $scope.starttime
    $scope.getOrderData.endtime = $scope.endtime
    var customerInfo = {
      getOrderData: $scope.getOrderData,
      orderList: $scope.orderList,
      propertyBatchNo: $scope.propertyBatchNo
    }
    localStorage['customerInfo'] = JSON.stringify(customerInfo)
    $state.go('myCustom-info', {'vipId': id});
  };
  // $scope.seeKeDetail = function ($event) {
  //   var id = $event.target.getAttribute('data-id');
  //   $scope.showShu = false;
  //   $scope.showKe = true;
  //   $scope.keData = $scope.keList[id];
  //   $scope.keData.man = ($scope.keData.customerSex == '男' ? true : false);
  //   $scope.chuangjian = false;
  // };
  $scope.changeGender = function ($event) {
    var a = $event.target;
    var txt = a.nextElementSibling.getAttribute("data-id");
    console.log(txt);
    if (txt == '男士') {
      $scope.keData.customerSex = '男';
    } else if (txt == '女士') {
      $scope.keData.customerSex = '女';
    }
  };
  $scope.showTips = function(){
    var html = `<div><b>${$T.T('主客：')}</b>${$T.T('订单的实际买单客人')}</div>
                <div>${$T.T('如果订单有主客，“易订”系统会根据该订单的消费行为和金额，统计客户分类和价值，并在“易订”的价值体系中体现。')}</div>
                <div>${$T.T('提示：预订人为买单人，无需添加主客')}</div>
                <div style="margin-top:10px;"><b>${$T.T('宾客：')}</b>${$T.T('不参与买单的陪同客人')}</div>
                <div>${$T.T('如果订单有宾客，“易订”系统会根据该订单的消费行为，统计客户分类，不会根据消费金额统计此客人的细分价值。')}</div>
                <div>${$T.T('例如，客户A宴请客户B，订单完成后，客户B的最近就餐时间/消费次数等数据变更，但是金额（人均消费、消费总金额等）不变更。')}</div>`;
    var popup1 = $ionicPopup.show({
      cssClass: "er-popup",
      template: html,
      title: $T.T('主客与宾客'),
      scope: $scope,
      buttons: [
        {text: $T.T('关闭'), type: 'button-assertive'}
      ]
    });
  };
  // $scope.newShu = function () {
  //   var data = {
  //     'propertyId': $scope.propertyId * 1,
  //     'propertyName': $scope.propertyName,
  //     'batchNo': $scope.propertyBatchNo
  //   };
  //   $httpOrder.newShu(data, $scope.newShuSuccess, $scope.error);
  // };
  $scope.newKe = function () {
    // console.log($scope.propertyId);
    // if ($scope.chuangjian) {
      // var a = $scope.keList.length;
      // $scope.keList[a] = {};
      // $scope.keList[a].propertyId = $scope.propertyId;
      // $scope.keList[a].propertyName = $scope.propertyName;
      // $scope.keList[a].batchNo = $scope.propertyBatchNo;
      // $scope.keList[a].appUserId = $scope.info.id;
      // $scope.keList[a].businessId = $scope.info.businessId;
      // $scope.keList[a].masterCustomer = $scope.keData;
      // $scope.keList[a].masterCustomer.businessId = $scope.info.businessId;
      // $scope.keList[a].masterCustomer.appUserId = $scope.info.id;
      var params = {
        batchNo: $scope.propertyBatchNo,
        businessId: $scope.info.businessId,
        appUserId: $scope.info.id,
        customerName: $scope.keData.customerName,
        customerPhone: $scope.keData.customerPhone,
        customerSex: $scope.keData.customerSex
      }
      var reg = /^\d+$/;
      if ($scope.keData.customerName && (($scope.keData.customerPhone + '').length == 11) && (reg.test($scope.keData.customerPhone) == true)) {
        // console.log($scope.keData.man);
        // $scope.keList[a].masterCustomer.customerSex = ($scope.keData.man == true ? '男' : '女');
        $httpOrder.newKe($.param(params), $scope.newKeSuccess, $scope.error)
      } else {
        console.log($scope.keData.customerName);
        console.log(($scope.keData.customerPhone * 1));
        $showAlert.alert('请填写正确的客户姓名和号码');
        $scope.addKe($event,1)
      }
    // } else {
    //   var data = {};
    //   data.masterCustomerId = $scope.keData.id;
    //   data.businessId = $scope.info.businessId;
    //   data.appUserId = $scope.info.id;
    //   data.masterCustomer = $scope.keData;
    //   if (data.masterCustomer.customerName && (data.masterCustomer.customerPhone.length == 11)) {
    //     data.masterCustomer.customerSex = (data.masterCustomer.man == true ? '男' : '女');
    //     $httpOrder.updateKe(data, $scope.updateKeSuccess, $scope.error)
    //   } else {
    //     console.log(data.masterCustomer);
    //     $showAlert.alert('请填写正确的客户姓名和号码');
    //   }
    // }
  };
  $scope.newGuest = function(){
    // var a = $scope.guestList.length;
    // $scope.guestList[a] = {};
    // $scope.guestList[a].batchNo = $scope.propertyBatchNo;
    // $scope.guestList[a].appUserId = $scope.info.id;
    // $scope.guestList[a].businessId = $scope.info.businessId;
    // $scope.guestList[a].masterCustomer = $scope.keData;
    // $scope.guestList[a].masterCustomer.businessId = $scope.info.businessId;
    // $scope.guestList[a].masterCustomer.appUserId = $scope.info.id;
    var params = {
      batchNo: $scope.propertyBatchNo,
      businessId: $scope.info.businessId,
      appUserId: $scope.info.id,
      customerName: $scope.keData.customerName,
      customerPhone: $scope.keData.customerPhone,
      customerSex: $scope.keData.customerSex
    }
    var reg = /^\d+$/;
    if ($scope.keData.customerName && (($scope.keData.customerPhone + '').length == 11) && (reg.test($scope.keData.customerPhone) == true)) {
      // console.log($scope.keData.man);
      // $scope.guestList[a].masterCustomer.customerSex = ($scope.keData.man == true ? '男' : '女');
      $httpOrder.newGuest($.param(params), $scope.newGuestSuccess, $scope.error)
    } else {
      console.log($scope.keData.customerName);
      console.log(($scope.keData.customerPhone * 1));
      $showAlert.alert('请填写正确的客户姓名和号码');
      $scope.addKe($event,2)
    }
  }
  $scope.newKeSuccess = function (data) {
    $('#hostBtn').hide()
    $showAlert.alert('添加成功');
    $scope.showShu = true;
    // $scope.showKe = false;
    $httpOrder.getKe($scope.getKeData, $scope.getKeSuccess, $scope.error);
  };
  $scope.newGuestSuccess = function (data) {
    $showAlert.alert('添加成功');
    $scope.showShu = true;
    // $scope.showKe = false;
    $httpOrder.getGuest($scope.getKeData, $scope.getQuestSuccess, $scope.error);
  };
  // $scope.newShuSuccess = function (data) {
  //   $showAlert.alert('提交订单属性成功');
  // };
  // $scope.updateKeSuccess = function (data) {
  //   $showAlert.alert('更新成功');
  //   $scope.showShu = true;
  //   $scope.showKe = false;
  //   $scope.chuangjian = true;
  //   $httpOrder.getKe($scope.getKeData, $scope.getKeSuccess, $scope.error);
  // }
  // $scope.hideKe = function ($event) {
  //   $scope.showShu = true;
  //   $scope.showKe = false;
  //   $scope.chuangjian = true;
  // };
  // $scope.newIpObj5 = function () {
  //   var ipObj10 = {
  //     callback: function (date) {  //Mandatory
  //       console.log(date);
  //       var a = new Date(date);
  //       var y = a.getFullYear();
  //       var m = a.getMonth() + 1;
  //       if (m < 10) {
  //         m = '0' + m
  //       }
  //       ;
  //       var d = a.getDate();
  //       if (d < 10) {
  //         d = '0' + d
  //       }
  //       ;
  //       $scope.keData.customerBirthday = y + '-' + m + '-' + d;
  //     },
  //     from: new Date(1900, 1, 1),
  //     inputDate: new Date(),      //Optional
  //     mondayFirst: false,          //Optional
  //     closeOnSelect: true,       //Optional
  //     templateType: 'popup',       //Optional
  //     dateFormat: 'yyyy-MM-dd'
  //   };
  //   return ipObj10;
  // };
  // $scope.openDatePicker5 = function () {
  //   var timePicker = $scope.newIpObj5();
  //   ionicDatePicker.openDatePicker(timePicker);
  // };
  //////////////////////////////////////////////
  $scope.seesee = function (id1, id2) {
    console.log(1);
    var dishData = {
      'businessId': $scope.info.businessId,
      'appUserId': $scope.info.id,
      'id': id1,
      'vipId': id2
    };
    $httpOrder.getDishDetail(dishData, $scope.dishDetailSuccess, $scope.error);
    $scope.showDish = true;
    $scope.dishList = [];
  };
  $scope.dishDetailSuccess = function (data) {
    console.log(data);
    $scope.dishList = data;
  };
  $scope.hideDish = function () {
    $scope.showDish = false;
  };
  ////////////////////主客模糊查询//////////////////////////
  $scope.select = function () {
    //console.log($scope.data.vipPhone.length);
    $scope.keData.customerPhone = $scope.keData.customerPhone.trim();
    if ($scope.keData.customerPhone.length > 11) {
      var reg = /[-,+,\s]/g;
      console.log('我来了');
      $scope.keData.customerPhone = $scope.keData.customerPhone.replace(reg, '');
      if ($scope.keData.customer[0] == 8) {
        console.log(1);
        $scope.keData.customerPhone = $scope.keData.customerPhone.slice(2);
      }
    }
    if ($scope.keData.customerPhone && $scope.keData.customerPhone.toString().length >= 4) {
      var mohuData = {
        "appUserId": $scope.info.id,
        "searchText": $scope.keData.customerPhone,
        'businessId': $scope.info.businessId,
        "type": 0,
        "all": 1
      };
      console.log(mohuData);
      $httpCustom.selectCustom(mohuData, $scope.selectSuccess, $scope.selectError);
      // $httpOrder.mohuKe(mohuData, $scope.selectSuccess, $scope.selectError);
    } else {
      if ($scope.closePopover1) {
        $scope.popover1.hide();
        $('body').removeClass('popover-open')
      }
      ;
    }
  };
  $scope.selectSuccess = function (data) {
    console.log(data);
    if ($scope.closePopover1) {
      $scope.popover1.hide();
      $('body').removeClass('popover-open')
    }
    ;
    if ((data.length > 0) && (data instanceof Array)) {
      var mohuLength = data.length > 5 ? 265 : data.length * 53;
      $scope.mohu = data;
      var template1 = `<ion-popover-view class="mohuPopover" style="height:${mohuLength}px;width:230px;">
                 <ion-content style="background-color: transparent;" overflow-scroll="true">
                   <div class="list">
                     <a class="item" ng-repeat="person in mohu" ng-click="mohuCheck($event)" data-phone={{person.vipPhone}} data-name={{person.vipName}} data-gender={{person.vipSex}}>
                       {{person.vipPhone}}
                       {{person.vipName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      $scope.popover1 = $ionicPopover.fromTemplate(template1, {
        scope: $scope
      });
      $scope.openPopover1 = function ($event) {
        $scope.popover1.show($event);
      };
      $scope.closePopover1 = function () {
        $scope.popover1.hide();
        $('body').removeClass('popover-open')
      };
      var input = document.getElementById('customerPhone');
      $scope.openPopover1(input);
      $('.mohuPopover').parent().parent().css({'z-index': '13'})
    }else{
      $scope.popover1.hide();
      $('body').removeClass('popover-open')
    }
  };
  $scope.selectError = function () {
    if ($scope.closePopover1) {
      $scope.popover1.hide();
      $('body').removeClass('popover-open')
    }
    ;
  };
  $scope.mohuCheck = function ($event) {
    var a = $event.target;
    $scope.keData.customerPhone = a.getAttribute('data-phone');
    $scope.keData.customerName = a.getAttribute('data-name');
    // $scope.keData.customerCompany = a.getAttribute('data-company');
    // $scope.keData.hobby = a.getAttribute('data-hobby');
    // $scope.keData.customerAddress = a.getAttribute('data-customerAddress');
    // $scope.keData.detest = a.getAttribute('data-detest');
    // $scope.keData.telephone = a.getAttribute('data-telephone');
    // $scope.keData.shortPhoneNum = a.getAttribute('data-shortPhoneNum');
    // $scope.keData.customerBirthday = a.getAttribute('customerBirthday');
    $scope.keData.customerSex = a.getAttribute('data-gender');
    // $scope.keData.man = ($scope.keData.customerSex == '男' ? true : false);
    $scope.popover1.hide();
    $('body').removeClass('popover-open')
  };
  $scope.submitDetail = function(type, $event){
    var submitStatus = $event.target.getAttribute('data-submitStatus')
    var submitData = {
      submitId: $event.target.getAttribute('data-submitId')
    }
    if(type==1){

    }else{
      if($scope.isSubmit){
        return
      }
      if(submitStatus == 1 && !$scope.yudingSubmit){
        $showAlert.alert('您无权重新提交预订申请')
        return
      }
      if(submitStatus == 2 && !$scope.jiazhuoSubmit){
        $showAlert.alert('您无权重新提交加桌申请')
        return
      }
      if(submitStatus == 3 && !$scope.huanzhuoSubmit){
        $showAlert.alert('您无权重新提交换桌申请')
        return
      }
      if(submitStatus == 4 && !$scope.tuidingSubmit){
        $showAlert.alert('您无权重新提交退订申请')
        return
      }
      $scope.isSubmit = true
      $httpOrder.reSendSubmit(submitData, function(data){
        $scope.isSubmit = false
        if(data.msgCode==0){
          $showAlert.alert(data.msgMessage || '提交成功')
          $scope.getOrderData.page = 1
          $httpOrder.getSubmit($scope.getOrderData, $scope.getSubmitSuccess, $scope.error);
        }else{
          $showAlert.alert(data.msgMessage || '提交申请失败')
        }
      }, $scope.error)
    }
  }
})
