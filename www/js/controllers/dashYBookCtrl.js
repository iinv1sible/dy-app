angular.module('starter.controllers.dashYBookCtrl', []).controller('DashYBookCtrl', function ($scope, $ionicTabsDelegate, $seatData, $calendar,$calendarY, $detail, $timeout, $http, $httpPsd, $operation, $ionicPopover, $showAlert, $cordovaDatePicker, $stateParams, $ionicPopup, $state, $ionicLoading, $timeout, ionicDatePicker,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.loading = 0;
    console.log($detail);
    $detail[0] = 135;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.isYp = $scope.info.isYp == 1 ? true : false
    viewData.enableBack = false;
    $scope.seatData = {};
    $scope.table = [];
    $scope.tableNew = [];
    $scope.isKan = false;
    $scope.showModal = false;
    $scope.tablePic = '';
    $scope.picId = 0;
    $scope.todayTime = new Date().getTime();
    $scope.onClicK = false;
    $scope.dbclickTip = false
    if (!localStorage['dbclickTip']) {
      $scope.dbclickTip = true
    }
    $scope.clickTip = function () {
      $scope.dbclickTip = false
      localStorage.setItem('dbclickTip', 'dbclickTip')
    }
    //日历参数////////////////////////////
    $scope.calender = false;
    $scope.showDetail = false;
    $scope.changeName = '档期看板';
    var isValue = false
    for(var i in $stateParams){
      if($stateParams[i]){
        isValue = true
      }
    }
    if(isValue){
      sessionStorage['ybookParams'] = JSON.stringify($stateParams)
    }else{
      $stateParams = JSON.parse(sessionStorage['ybookParams'])
    }
    console.log('-----------------------'+isValue)
    console.log(sessionStorage['ybookParams'])
    if($stateParams.back == 1){
      $scope.showDetail = true;
      $scope.changeName = '厅位界面';
    }
    $scope.showBack = false;
    $scope.dateList = [];
    $scope.weekList = ['日', '一', '二', '三', '四', '五', '六'];
    $scope.dateYear = new Date().getFullYear();
    $scope.dateMonth = new Date().getMonth();
    $scope.mealList = eval("(" + sessionStorage['mealYTypes'] + ")");
    $scope.mealTypeId1 = sessionStorage['mealYTypeId'];
    for (var i = 0; i < $scope.mealList.length; i++) {
      if ($scope.mealList[i].id == $scope.mealTypeId1) {
        $scope.resvStartTime = $scope.mealList[i].resvStartTime;
        $scope.resvEndTime = $scope.mealList[i].resvEndTime;
      }
    }
    //权限////////////////////////////////////////////////////////////////////////////////////////
    if ($scope.info.appOperationSet.indexOf(8) != -1) {
      $scope.lockAuthority = true;
    } else {
      $scope.lockAuthority = false;
    }
    if ($scope.info.appOperationSet.indexOf(5) != -1) {
      $scope.chakan = true;
    } else {
      $scope.chakan = false;
    }
    if ($scope.info.appOperationSet.indexOf(1) != -1 && $scope.info.appOperationSet.indexOf(9) != -1) {
      $scope.yuding = true;
    } else {
      $scope.yuding = false;
    }
    if (localStorage['changeHotel'] == 0) {
      $scope.changeHotel = false;
    } else {
      $scope.changeHotel = true;
    }
    //进入界面类型////////////////////////////////////////////////////////////////////////////////
    if ($stateParams.type == 1) {
      $scope.time = new Date().getTime();
      if ($stateParams.keyNo != null) {
        $scope.showTime = $stateParams.resvDate;
        $scope.seatData.resvDate = $stateParams.resvDate;
        $scope.seatData.mealTypeId = $stateParams.mealTypeId;
        $scope.meal = $stateParams.mealTypeName;
        $scope.showBack = true;
      } else {
        $scope.showTime = $scope.freshTime($scope.time);
        $scope.showTime1 = $scope.freshTime(new Date().getTime() + 86400000 * 30);
        $scope.seatData.resvDate = $scope.freshTime(new Date().getTime());
        $scope.seatData.mealTypeId = sessionStorage['mealYTypeId'];
        $scope.meal = sessionStorage['mealYTypeName'];
      }
      $scope.seatData.tableAreaId = "";
      $scope.seatData.peicai = "";
      $scope.seatData.status = "";
      $scope.seatData.confirm = "";
      $scope.seatData.appUserId = $scope.info.id;
      $scope.seatData.businessId = $scope.info.businessId;
      $scope.state = "全部状态";
      $scope.area = "全部区域";
      $scope.showLoading();
      // $scope.lookData = {};
      // $scope.lookData.businessId = $scope.info.businessId;
      // $scope.lookData.startDate = $scope.showTime;
      // $scope.lookData.endDate = $scope.showTime1;
      // $scope.lookData.appUserId = $scope.info.id;
      // $scope.list = [];
      // for(var i=0;i<10;i++){
      //   var lookDate = {};
      //   lookDate.date = $scope.freshTime(new Date().getTime() + 86400000 * i);
      //   lookDate.date1 = lookDate.date.substr(5,lookDate.date.length-4);
      //   $scope.list[i] = lookDate;
      // }
      // $httpPsd.getYLook($scope.lookData, $scope.getYLookSuccess);
      $httpPsd.getYArea($scope.info, $scope.areaSuccess, $scope.error);
      $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
    } else if ($stateParams.type == 2) {
      console.log($seatData);
      $scope.showLoading();
      $scope.showTime = $seatData.resvDate;
      $scope.showTime1 = $scope.freshTime(new Date($seatData.resvDate).getTime() + 86400000 * 30);
      $scope.seatData = $seatData;
      $scope.area = $seatData.area;
      $scope.meal = $seatData.meal;
      $scope.time = $seatData.time;
      $httpPsd.getYArea($scope.info, $scope.areaSuccess, $scope.error);
      $httpPsd.getYSeat($seatData, $scope.seatSuccess, $scope.error);
    }
  });
  // $scope.$on('$ionicView.beforeLeave', function() {
  //   //打开tab选项卡
  //   $ionicTabsDelegate.showBar(true);
  // });
  //宴会参数设置///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // state 和 action/////////////////////////////////////////////////////////////////////////////////////////////////////
  //   var state =`<ion-popover-view style="max-height:159px;width:120px;">
  //                    <ion-content style="background-color: transparent;">
  //                      <div class="list">
  //                        <a class="item text-center" ng-click="chooseState($event)" data-status="">全部状态</a>
  //                        <a class="item text-center" ng-click="chooseState($event)" data-status="1">待预订</a>
  //                        <a class="item text-center" ng-click="chooseState($event)" data-status="2">已确认</a>
  //                      </div>
  //                    </ion-content>-
  //                  </ion-popover-view>`;
  var action = `<ion-popover-view style="max-height:53px;width:120px;">
                   <ion-content style="background-color: transparent;">
                     <div class="list">
                       <a class="item text-center" ng-click="chooseAction($event)">{{'切换酒店'|T}}</a>
                     </div>
                   </ion-content>
                 </ion-popover-view>`;
  $scope.popoverAction = $ionicPopover.fromTemplate(action, {
    scope: $scope
  });
  //函数列表////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //切换酒店////////////////////////////////////////////
  $scope.chooseAction = function ($event) {
    $scope.popoverAction.hide();
    $operation.getHotel($scope.info.id, $scope.operationSuccess.getHotelList, $scope.error);
  };
  $scope.operationSuccess = {
    'getHotelList': function (data) {
      $scope.hotelList = data;
      var myPopup = $ionicPopup.show({
        cssClass: "er-popup",
        template: `<button class="button button-assertive button-block" ng-repeat="hotel in hotelList" ng-click="changeHotel($event)" data-typeId={{hotel.typeId}} data-businessName={{hotel.businessName}} data-businessId={{hotel.businessId}}>{{hotel.businessName}}</button>`,
        title: $T.T('切换酒店'),
        scope: $scope,
        buttons: [
          {
            text: $T.T('取消'),
            type: 'button-positive'
          }
        ]
      });
      $scope.changeHotel = function ($event) {
        var button = $event.target;
        $scope.changeHotelData = {
          "appUserId": $scope.info.id,
          "businessId": button.getAttribute("data-businessId"),
          "businessName": button.getAttribute("data-businessName"),
          "typeId": button.getAttribute("data-typeId")
        };
        myPopup.close();
        $operation.changeHotel($scope.changeHotelData, $scope.operationSuccess.changeHotel, $scope.error);
        console.log(button.getAttribute("data-businessName"));
      };
    },
    'changeHotel': function (data) {
      $scope.showLoading();
      $scope.loginData = JSON.parse(localStorage['loginData']);
      $operation.getPassword(localStorage['TOKEN_KEY'], $scope.operationSuccess.getPassword, $scope.error);
      $showAlert.alert(data.msgMessage);
    },
    'getPassword': function (data) {
      localStorage['TOKEN_KEY'] = data.token;
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': data.token
        }
      };
      $http.get('https://phone.zhidianfan.com:9091' + '/user', config)
        .success(function (data) {
          localStorage.setItem('info', JSON.stringify(data));
          $scope.loading = 0;
          $ionicLoading.hide();
          $state.go('tab.dash');
        })
    }
  };
  //$state函数/////////////////////////////////
  //返回首页
  $scope.goIndex = function () {
    $state.go('tab.dash')
  };
  //$ionicLoading函数///////////////////////////
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
    $scope.loading = 1;
    var a = $timeout(function () {
      if ($scope.loading == 1) {
        $state.go('tab.dash')
        $showAlert.alert('网络不稳定，请稍后再试');
        $ionicLoading.hide();
        $timeout.cancel(a);
      } else {
        $timeout.cancel(a);
      }
    }, 60000)
  };
  //popover函数///////////////////////////////////////////////////////////////
  $scope.openPopover = function ($event, num) {
    if (num == 1) {
      $scope.popoverState.show($event);
    } else if (num == 2) {
      $scope.popoverMeal.show($event);
    } else if (num == 3) {
      $scope.popoverArea.show($event);
    } else if (num == 4) {
      if ($scope.changeHotel) {
        $scope.popoverAction.show($event);
      } else {
        $showAlert.alert('没有可进行操作');
      }
    }
  };
  $scope.closePopover = function (num) {
    if (num == 1) {
      $scope.popoverState.hide();
    } else if (num == 2) {
      $scope.popoverMeal.hide();
    } else if (num == 3) {
      $scope.popoverArea.hide();
    } else if (num == 4) {
      $scope.popoverAction.hide();
    }
  };
  //时间处理函数/////////////////////////////////////////////////
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
    var dateString = date.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  $scope.freshTime1 = function (time) {
    var date = new Date(time);
    var d = date.getDate();
    return d;
  };
  //桌位图片模态框//////////////////////////////////////////////////////////////////////
  $scope.showPic = function (title, txt) {

  };
  $scope.nextPic = function () {
    $scope.picId += 1;
    var nextUrl = $scope.seat[$scope.picId].tableUrl;
    $scope.picTitle = $scope.seat[$scope.picId].tableAreaName + " " + $scope.seat[$scope.picId].tableName;
    if (nextUrl == '') {
      // $scope.tablePic = 'images/img_nopic@3x.png';
    } else if (nextUrl != '') {
      $scope.tablePic = nextUrl;
    }
  };
  $scope.prePic = function () {
    if ($scope.picId >= 1) {
      $scope.picId -= 1;
      var preUrl = $scope.seat[$scope.picId].tableUrl;
      $scope.picTitle = $scope.seat[$scope.picId].tableAreaName + " " + $scope.seat[$scope.picId].tableName;
      if (preUrl == '') {
        // $scope.tablePic = 'images/img_nopic@3x.png';
      } else if (preUrl != '') {
        $scope.tablePic = preUrl;
      }
    }
  };
  $scope.showSeat = function ($event) {
    var title = $event.target.getAttribute('data-tableAreaName') + " " + $event.target.getAttribute('data-tableName');
    var url = $event.target.getAttribute('data-picUrl');
    var id = $event.target.getAttribute('data-picId');
    if (url == '') {
      // url = 'images/img_nopic@3x.png';
    }
    if (url != '') {
      url = url.replace('http', 'https')
      var div = document.getElementById('imgYan');
      var PSV = new PhotoSphereViewer({
        // Path to the panorama
        panorama: url,

        // Container
        container: div,

        // Deactivate the animation
        time_anim: false,

        // Display the navigation bar
        navbar: false,
        tilt_up_max: Math.PI,
        tilt_down_max: Math.PI,

        // Resize the panorama
        size: {
          width: '100%',
          height: '300px'
        },
        ondblclick: function() {
          if ($('.imgDiv').hasClass('fullsreen-con')) {
            $('.imgDiv').removeClass('fullsreen-con')
            $('#imgYan').height('300px')
            $('.bar-stable.bar.bar-header').show()
          } else {
            $('.imgDiv').addClass('fullsreen-con')
            $('#imgYan').height('100%')
            $('.bar-stable.bar.bar-header').hide()
          }
          PSV.fitToContainer()
        }
      })
    }
      $scope.showModal = true;
      $scope.tablePic = url;
      $scope.device = '';
      $scope.sofa = $event.target.getAttribute('data-sofa');
      $scope.washroom = $event.target.getAttribute('data-washroom');
      $scope.television = $event.target.getAttribute('data-television');
      $scope.isLockerRoom = $event.target.getAttribute('data-islockerroom');
      $scope.led = $event.target.getAttribute('data-led');
      $scope.light = $event.target.getAttribute('data-light');
      $scope.catwalk = $event.target.getAttribute('data-catwalk');
      if($scope.sofa == 1){
        $scope.device += '沙发、';
      }
      if($scope.washroom == 1){
        $scope.device += '独卫、';
      }
      if($scope.television == 1){
        $scope.device += '电视、';
      }
      if($scope.isLockerRoom == 1){
        $scope.device += '可做试衣间、';
      }
      if($scope.led == 1){
        $scope.device += 'led、';
      }
      if($scope.light == 1){
        $scope.device += '灯光、';
      }
      if($scope.catwalk == 1){
        $scope.device += 'T台、';
      }
      if($scope.device == ''){
        $scope.device = '无';
      }else {
        $scope.device = $scope.device.substr(0,$scope.device.length-1);
      }
      $scope.roomArea = $event.target.getAttribute('data-roomArea') + 'm²';
      $scope.floorHeight = $event.target.getAttribute('data-floorHeight') == 0 ? false : $event.target.getAttribute('data-floorHeight');
      $scope.picTitle = title;
      $scope.picId = id * 1;
      $scope.tableId = $event.target.getAttribute("data-seat");
      $scope.tableName = $event.target.getAttribute('data-tablename');
      $scope.maxPeopleNum = $event.target.getAttribute('data-maxpeoplenum');
      $scope.minAmount = $event.target.getAttribute('data-minamount') == ''?'无':$event.target.getAttribute('data-minamount');
      $scope.tableRemark = $event.target.getAttribute('data-tableremark') == ''?'无':$event.target.getAttribute('data-tableremark');
      $scope.tType = $event.target.getAttribute('data-ttype');
      $scope.tTypeId = $event.target.getAttribute('data-ttype');
      if($scope.tType == 0){
        $scope.tType = '包厢';
      }else if($scope.tType == 1){
        $scope.tType = '散台';
      }else {
        $scope.tType = '卡座';
      }
      $scope.picTitle = title;
      $scope.picId = id * 1;
      $scope.pillar = $event.target.getAttribute('data-pillar') == 1 ? '有' : '无';
      $scope.roomArea = $event.target.getAttribute('data-roomArea');
      $scope.floorHeight = $event.target.getAttribute('data-floorHeight');
    // }
    $scope.tableUrl = url;
  };
  $scope.hideModal = function () {
    $scope.showModal = false;
    $('.imgDiv').removeClass('fullsreen-con')
    $('#imgYan').height('300px')
    $('.bar-stable.bar.bar-header').show()
  };
  //桌位选择//////////////////////////////////////////////////////////////////////////
  $scope.selected = function ($event) {
    $scope.isKan = false;
    var img = $event.target;
    var id = img.getAttribute('data-id');
    if ($scope.seat[id].selected == true) {
      $scope.seat[id].selected = false;
      console.log($scope.table.indexOf(img));
      $scope.table.splice($scope.table.indexOf(img), 1);
    } else if ($scope.seat[id].selected == false) {
      if ($scope.table.length == 0) {
        $scope.seat[id].selected = true;
        $scope.table.push(img);
      } else if ((img.getAttribute('data-state') < 2)  && ($scope.table[0].getAttribute('data-isOPer') >= 1) && ($scope.table[0].getAttribute('data-state') < 2) && (img.getAttribute('data-isOPer') >= 1)) {
        $scope.table.push(img);
        for (var i = 0; i < $scope.seat.length; i++) {
          $scope.seat[i].selected = false;
        }
        for (var a = 0; a < $scope.table.length; a++) {
          $scope.seat[$scope.table[a].getAttribute('data-id')].selected = true;
        }
      } else {
        for (var i = 0; i < $scope.seat.length; i++) {
          $scope.seat[i].selected = false;
        }
        $scope.table = [];
        $scope.seat[id].selected = true;
        $scope.table.push(img);
      }
    }
    console.log($scope.table);
  };
  //左滑、右滑下拉刷新////////////////////////////////////////////////////////////////
  $scope.left = function () {
    console.log('left');
    $scope.time += 86400000;
    $scope.showTime = $scope.freshTime($scope.time);
    $scope.showTime1 = $scope.freshTime($scope.time + 86400000 * 30);
    $scope.showLoading();
    $scope.seatData.resvDate = $scope.showTime;
    $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
  };
  $scope.right = function () {
    console.log('right');
    if (($scope.time - 80000000) > $scope.todayTime) {
      $scope.time -= 86400000;
      $scope.showTime = $scope.freshTime($scope.time);
      $scope.showTime1 = $scope.freshTime($scope.time + 86400000 * 30);
      $scope.showLoading();
      $scope.seatData.resvDate = $scope.showTime;
      $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
    }
  };
  $scope.refresh = function () {
    //simulate async response
    //Stop the ion-refresher from spinning
    $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
    console.log('刷新成功');
    $scope.$broadcast("scroll.refreshComplete");
  };
  //更改状态、区域、餐别、时间重新获取桌位//////////////////////////////////////////////
  $scope.chooseState = function ($event) {
    console.log($scope.seatData);
    $scope.seatData.status = $event.target.getAttribute('data-status');
    $scope.state = $event.target.innerHTML;
    $scope.popoverState.hide();
    $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
  };
  $scope.compareTime = function () {
    var date = new Date();
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
    var dateString = date.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  $scope.chooseMeal = function ($event) {
    $scope.seatData.mealTypeId = $event.target.getAttribute('data-mealId');
    $scope.resvEndTime = $event.target.getAttribute('data-resvEndTime');
    $scope.resvStartTime = $event.target.getAttribute('data-resvStartTime');
    $scope.meal = $event.target.innerHTML;
    $scope.popoverMeal.hide();
    $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
  };
  $scope.chooseArea = function ($event) {
    $scope.seatData.tableAreaId = $event.target.getAttribute('data-tableAreaId');
    $scope.area = $event.target.getAttribute("data-areaname");
    $scope.popoverArea.hide();
    $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
  };
  $scope.showCalender = function () {
    $scope.calender = true;
    $scope.luckDay();
  };
  $scope.luckDay = function () {
    $scope.luckyDate = {
      'businessId': $scope.info.businessId,
      'luckyDay': String($scope.dateYear) + $scope.addPreZero($scope.dateMonth + 1)
    };
    $httpPsd.getLuckyDay($scope.luckyDate, $scope.getLuckyDateSuccess);
  };
  $scope.getLuckyDateSuccess = function (data) {
    $scope.dateList = $calendarY.drawCld($scope.dateYear, $scope.dateMonth, data, $scope.info.isLuckyDay);
  };
  $scope.luckDay1 = function () {
    $scope.luckyDate = {
      'businessId': $scope.info.businessId,
      'luckyDay': String($scope.dateYear) + $scope.addPreZero($scope.dateMonth + 1)
    };
    $httpPsd.getLuckyDay($scope.luckyDate, $scope.getLuckyDateSuccess1);
  };
  $scope.getLuckyDateSuccess1 = function (data) {
    $scope.dateList1 = $calendarY.drawCld($scope.dateYear, $scope.dateMonth, data, $scope.info.isLuckyDay);
    $scope.luckDay2();
  };
  $scope.luckDay2 = function () {
    var dateYear = $scope.dateYear;
    var dateMonth = $scope.dateMonth;
    if($scope.dateMonth + 2 > 12){
      dateYear = $scope.dateYear + 1;
      dateMonth = $scope.dateMonth - 10;
    }else{
      dateMonth = $scope.dateMonth + 2;
    }
    $scope.luckyDate = {
      'businessId': $scope.info.businessId,
      'luckyDay': String(dateYear) + $scope.addPreZero(dateMonth)
    };
    $httpPsd.getLuckyDay($scope.luckyDate, $scope.getLuckyDateSuccess2);
  };
  $scope.getLuckyDateSuccess2 = function (data) {
    var dateYear = $scope.dateYear;
    var dateMonth = $scope.dateMonth;
    if($scope.dateMonth + 2 > 12){
      dateYear = $scope.dateYear + 1;
      dateMonth = $scope.dateMonth - 11;
    }else{
      dateMonth = $scope.dateMonth + 1;
    }
    $scope.dateList2 = $calendarY.drawCld(dateYear, dateMonth, data, $scope.info.isLuckyDay);
    $scope.luckDay3();
  };
  $scope.luckDay3 = function () {
    var dateYear = $scope.dateYear;
    var dateMonth = $scope.dateMonth;
    if($scope.dateMonth + 3 > 12){
      dateYear = $scope.dateYear + 1;
      dateMonth = $scope.dateMonth - 10;
    }else{
      dateMonth = $scope.dateMonth + 3;
    }
    $scope.luckyDate = {
      'businessId': $scope.info.businessId,
      'luckyDay': String(dateYear) + $scope.addPreZero(dateMonth)
    };
    $httpPsd.getLuckyDay($scope.luckyDate, $scope.getLuckyDateSuccess3);
  };
  $scope.getLuckyDateSuccess3 = function (data) {
    var dateYear = $scope.dateYear;
    var dateMonth = $scope.dateMonth;
    if($scope.dateMonth + 3 > 12){
      dateYear = $scope.dateYear + 1;
      dateMonth = $scope.dateMonth - 10;
    }else{
      dateMonth = $scope.dateMonth + 2;
    }
    $scope.dateList3 = $calendarY.drawCld(dateYear, dateMonth, data, $scope.info.isLuckyDay);
    var aa = new Date($scope.time).getMonth();
    for(var i=0;i<31;i++){
      var lookDate = {};
      var d = $scope.freshTime1($scope.time + 86400000 * i);
      var bb = new Date($scope.time + 86400000 * i).getMonth();
      if(aa == bb){
        for(var a=0;a<$scope.dateList1.length;a++){
          if($scope.dateList1[a].ylr == d||$scope.dateList1[a].yylr == d){
            lookDate.nlr = $scope.dateList1[a].nlr;
            lookDate.color = $scope.dateList1[a].color;
          }
        }
      }else if(aa + 1 == bb||aa - 11 == bb){
        for(var a=0;a<$scope.dateList2.length;a++){
          if($scope.dateList2[a].ylr == d||$scope.dateList2[a].yylr == d){
            lookDate.nlr = $scope.dateList2[a].nlr;
            lookDate.color = $scope.dateList2[a].color;
          }
        }
      }else if(aa + 2 == bb||aa - 11 == bb){
        for(var a=0;a<$scope.dateList3.length;a++){
          if($scope.dateList3[a].ylr == d||$scope.dateList3[a].yylr == d){
            lookDate.nlr = $scope.dateList3[a].nlr;
            lookDate.color = $scope.dateList3[a].color;
          }
        }
      }
      lookDate.date = $scope.freshTime($scope.time + 86400000 * i);
      lookDate.date1 = lookDate.date.substr(5,lookDate.date.length-4);
      $scope.list[i] = lookDate;
    }
    $httpPsd.getYLook($scope.lookData, $scope.getYLookSuccess);
  };
  $scope.addPreZero = function (num) {
    return ('0' + num).slice(-2);
  }
  $scope.hideCalender = function ($event) {
    var id = $event.target.getAttribute('data-id');
    $scope.dateList[id].color = 'red';
    if ($event.target.getAttribute('data-date') != '') {
      $scope.calender = false;
      var day = $event.target.getAttribute('data-date');
      if (day == '吉' || day == '上上吉' || day == '上吉') {
        day = $event.target.getAttribute('data-datej');
      }
      var txt = $scope.dateYear + ',' + ($scope.dateMonth + 1) + ',' + day;
      var date = new Date($scope.dateYear * 1, ($scope.dateMonth) * 1, (day * 1)).getTime() * 1 + 1;
      $scope.time = date;
      $scope.showTime = $scope.freshTime($scope.time);
      $scope.showTime1 = $scope.freshTime($scope.time + 86400000 * 30);
      $scope.showLoading();
      $('.area-row')[0].scrollLeft = 0;
      $('.date-row')[0].scrollTop = 0;
      $scope.seatData.resvDate = $scope.showTime;
      $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
    }
  };
  $scope.addYear = function () {
    $scope.dateYear += 1;
    $scope.luckDay();
  };
  $scope.minusYear = function () {
    if (($scope.dateYear == new Date().getFullYear()) || (($scope.dateYear == new Date().getFullYear() + 1) && $scope.dateMonth < new Date().getMonth())) {
      console.log('不能减小了');
    } else {
      $scope.dateYear -= 1;
      $scope.luckDay();
    }
  };
  $scope.addMonth = function () {
    if ($scope.dateMonth == 11) {
      $scope.dateMonth = 0;
      $scope.dateYear += 1;
    } else {
      $scope.dateMonth += 1;
    }
    $scope.luckDay();
  };
  $scope.minusMonth = function () {
    if (($scope.dateYear == new Date().getFullYear()) && ($scope.dateMonth == new Date().getMonth())) {
      console.log('不能减小了');
    } else {
      if ($scope.dateMonth == 0) {
        $scope.dateMonth = 11;
        $scope.dateYear -= 1;
      } else {
        $scope.dateMonth -= 1;
      }
      $scope.luckDay();
    }
  };
  $scope.dateCancel = function () {
    $scope.calender = false;
  };
  $scope.dateToday = function () {
    $scope.calender = false;
    $scope.dateYear = new Date().getFullYear();
    $scope.dateMonth = new Date().getMonth();
    $scope.time = new Date().getTime();
    $scope.showTime = $scope.freshTime($scope.time);
    $scope.showTime1 = $scope.freshTime($scope.time + 86400000 * 30);
    $scope.showLoading();
    $('.area-row')[0].scrollLeft = 0;
    $('.date-row')[0].scrollTop = 0;
    $scope.seatData.resvDate = $scope.showTime;
    $httpPsd.getYSeat($scope.seatData, $scope.seatSuccess, $scope.error);
  };
  // var ipObj1 = {
  //   callback: function (date) {  //Mandatory
  //     console.log('Return value from the datepicker popup is : ' + date, new Date(date));
  //     $scope.time=date;
  //     $scope.showTime=$scope.freshTime($scope.time);
  //     $scope.showLoading();
  //     $scope.seatData.resvDate=$scope.showTime;
  //     $httpPsd.getYSeat($scope.seatData,$scope.seatSuccess,$scope.error);
  //   },
  //   from: new Date(), //Optional
  //   to: new Date(2020, 8, 1), //Optional
  //   inputDate: new Date(),      //Optional
  //   mondayFirst: false,          //Optional
  //   closeOnSelect: true,       //Optional
  //   templateType: 'popup',       //Optional
  //   dateFormat: 'yyyy-MM-dd'
  // };
  // $scope.openDatePicker = function(){
  //   ionicDatePicker.openDatePicker(ipObj1);
  // };
  //开始宴会预定/////////////////////////////////////////////////////////////////////////
  $scope.book = function () {
    console.log(localStorage['meetingBook']);
    if (localStorage['meetingBook'] * 1) {
      $scope.onClick = true;
      $timeout(function () {
        $scope.onClick = false;
      }, 500);
      if(!$scope.isKan){
        if ($scope.table.length == 0) {
          $showAlert.alert('请选择一张桌位')
        } else if ($scope.table[0].getAttribute('data-isOper') >= 1) {
          if ($scope.yuding) {
            if ($scope.table[0].getAttribute('data-state') <= 2) {
              var txt = "";
              for (var i = 0; i < $scope.table.length; i++) {
                txt += $scope.table[i].getAttribute('data-seat');
                if (i != $scope.table.length - 1) {
                  txt += ","
                }
              }
              var seatCheck = {
                "resvDate": $scope.showTime,
                "mealTypeId": $scope.seatData.mealTypeId,
                "checkedTableSet": txt,
                'businessId': $scope.info.businessId
              };
              $httpPsd.tableYCheck(seatCheck, $scope.seatCheckSuccess, $scope.error);
              //$state.go('myOrder-cDetail', {'type': 1,'seat':txt,'date':$scope.dateString});
            } else {
              $showAlert.alert('无法执行此操作');
            }
          } else {
            $showAlert.alert('您无权执行此操作');
          }
          ;
        } else {
          $showAlert.alert('您无权操作此桌位');
        }
      }else{
        if ($scope.tableNew.length == 0) {
          $showAlert.alert('请选择一张桌位')
        } else if ($scope.tableNew[0].getAttribute('data-isOper') >= 1) {
          if ($scope.yuding) {
            //$scope.tableNew[0].getAttribute('data-state') <= 2
            if (1 == 1) {
              var mealList = JSON.parse(sessionStorage['mealYTypes']);
              // $scope.mealListFilter = []
              // mealList.map(function(item) {
              //   if(item.mealTypeName.indexOf('午') != -1||item.mealTypeName.indexOf('中') != -1||item.mealTypeName.indexOf('晚') != -1){
              //     $scope.mealListFilter.push(item)
              //   }
              // })
              var html = '<a class="button button-balanced button-small button-outline custom-info-tag-a" data-id="{{value.id}}" data-name="{{value.mealTypeName}}" ng-class="{\'active\':value.active}" ng-repeat="value in mealList track by $index" style="margin-bottom: 3px;" ng-click="active($event)">{{value.mealTypeName}}</a>';
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: html,
                title: $T.T('请选择需要预订的餐别'),
                scope: $scope,
                buttons: [
                  {text: $T.T('取消')},
                  {
                    text: `<b>${$T.T('确认')}</b>`,
                    type: 'button-assertive',
                    onTap: function () {
                      var tags = document.getElementsByClassName('custom-info-tag-a active');
                      if(tags.length == 0){
                        $showAlert.alert('请选择餐别');
                        $scope.myPopup();
                        return;
                      }
                      var txt = $scope.tableNew[0].getAttribute('data-seat');
                      var date = $scope.tableNew[0].getAttribute('data-resvdate');
                      var seatCheck = {
                        "resvDate": date,
                        "mealTypeId": $scope.mealTypeId,
                        "checkedTableSet": txt,
                        'businessId': $scope.info.businessId
                      };
                      $httpPsd.tableYCheck(seatCheck, $scope.seatCheckSuccess1, $scope.error);
                    }
                  }
                ]
              });
              //$state.go('myOrder-cDetail', {'type': 1,'seat':txt,'date':$scope.dateString});
            } else {
              $showAlert.alert('无法执行此操作');
            }
          } else {
            $showAlert.alert('您无权执行此操作');
          }
          ;
        } else {
          $showAlert.alert('您无权操作此桌位');
        }
      }
    } else {
      $showAlert.alert('您无权执行此操作');
    }
  };
  $scope.active = function ($event) {
    var arrTags = document.getElementsByClassName('custom-info-tag-a active');
    if(arrTags.length > 0){
      arrTags[0].className = 'button button-balanced button-small button-outline custom-info-tag-a';
    }
    $event.target.className = 'button button-balanced button-small button-outline custom-info-tag-a active';
    $scope.mealTypeId = $event.target.getAttribute('data-id');
    $scope.mealTypeName = $event.target.getAttribute('data-name');
  };
  //success 或者 error函数//////////////////////////////////////////////////////////////
  $scope.error = function (data, status) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else if (status == 401) {
      localStorage.removeItem('TOKEN_KEY');
      $state.go('login');
    } else {
      -
        $showAlert.alert('连接失败，请检查网络');
    }
    $scope.loading = 0;
    $ionicLoading.hide();
  };
  //区域餐次获取成功//////////////////////////////////////
  $scope.areaSuccess = function (data) {
    sessionStorage['userList'] = JSON.stringify(data.appUserList);
    $scope.mealTypes = data.mealTypes;
    var mealTypesLength = $scope.mealTypes.length * 53;
    $scope.tableAreas = data.tableAreas;
    var tableAreasLength = $scope.tableAreas.length > 5 ? 265 : $scope.tableAreas.length * 53 + 53;
    var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                   <ion-content style="background-color: transparent;">
                     <div class="list">
                       <a class="item text-center" ng-click="chooseMeal($event)"
                       ng-repeat="meal in mealTypes" data-mealId={{meal.id}}
                       data-resvStartTime={{meal.resvStartTime}} data-resvEndTime={{meal.resvEndTime}}>
                          {{meal.mealTypeName}}
                       </a>
                     </div>
                   </ion-content>
                 </ion-popover-view>`;
    var area = `<ion-popover-view style="height:${tableAreasLength}px;width:150px;;padding-top:0;">
                   <ion-content style="background-color: transparent;">
                     <div class="list">
                       <a class="item text-center"  ng-click="chooseArea($event)" data-areaname="全部区域" data-tableAreaId="">{{'全部区域'|T}}</a>
                       <a class="item text-center"  ng-click="chooseArea($event)" data-areaname={{table.tableAreaName}} ng-repeat="table in tableAreas"
                       data-tableAreaId={{table.id}}>
                          {{table.tableAreaName}}
                       </a>
                     </div>
                   </ion-content>
                 </ion-popover-view>`;
    $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
      scope: $scope
    });
    $scope.popoverArea = $ionicPopover.fromTemplate(area, {
      scope: $scope
    });
  };
  //宴会桌位获取成功/////////////////////////////////////
  $scope.seatSuccess = function (data) {
    console.log(data);
    for (var i = 0; i < data.tables.length; i++) {
      data.tables[i].id = i;
      data.tables[i].selected = false;
    }
    $scope.top1 = data.tsds.tableNum;
    $scope.top2 = data.tsds.kxCou;
    $scope.top3 = data.tsds.dqrCou;
    $scope.top4 = data.tsds.qrCou;
    $scope.seat = data.tables;
    $scope.loading = 0;
    $scope.lookData = {};
    $scope.lookData.businessId = $scope.info.businessId;
    $scope.lookData.startDate = $scope.showTime;
    $scope.lookData.endDate = $scope.showTime1;
    $scope.lookData.appUserId = $scope.info.id;
    $scope.list = [];
    $scope.luckDay1();
    $scope.seatDetail = [];
    $scope.table = [];
  };
  $scope.getYLookSuccess = function(data){
    console.log(data);
    for(var i=0;i<data.length;i++){
      // if(data[i].mealTypeName.indexOf('午') != -1||data[i].mealTypeName.indexOf('中') != -1){
      //   $scope.meal1 = '午';
      // }
      // if(data[i].mealTypeName.indexOf('晚') != -1){
      //   $scope.meal1 = '晚';
      // }
      $scope.meal1 = data[i].mealTypeName.substr(0, 2)
      if(data[i].estatus == 1){
        $("#"+data[i].resvDate+data[i].tableId+data[i].mealTypeId).addClass('blue');
      }else if(data[i].estatus == 2){
        $("#"+data[i].resvDate+data[i].tableId+data[i].mealTypeId).addClass('green');
      }else{
        $("#"+data[i].resvDate+data[i].tableId+data[i].mealTypeId).addClass('red');
      }
      // if(data[i].orderCou == 0){
      //   if(data[i].preorderCou == 0){
      //     $scope.cou = '';
      //   }else {
      //     $scope.cou = data[i].preorderCou;
      //   }
      // }else{
      //   $scope.cou = data[i].orderCou;
      // }
      $scope.cou = data[i].preorderCou + data[i].orderCou;
      if($scope.cou == 1||$scope.cou == 0){
        $scope.cou = '';
      }
      $scope.cou = $scope.meal1 + $scope.cou;
      $("#"+data[i].resvDate+data[i].tableId+data[i].mealTypeId).text($scope.cou);
    }
    $ionicLoading.hide();
  };
  $scope.chooseTable = function($event){
    var arrTags = document.getElementsByClassName('table-item text-center choose');
    if(arrTags.length > 0 && arrTags[0].className!=$event.target.className){
      arrTags[0].className = 'table-item text-center';
    }
    if($event.target.className.indexOf('choose') != -1){
      $event.target.className = 'table-item text-center';
      $scope.isKan = false;
      $scope.tableNew = [];
    }else{
      $event.target.className = 'table-item text-center choose';
      $scope.isKan = true;
      $scope.tableNew = [];
      $scope.tableNew.push($event.target);
    }
  };
  $scope.showAlert = function (txt) {
    var alertPopup = $showAlert.alert(txt);
  };
  //桌位预定检查状态成功////////////////////////////////////
  $scope.seatCheckSuccess = function (data) {
    console.log(data);
    var chkSuc = function () {
      var seatDetail = [];
      var maxNum = 0;
      for (var a = 0; a < $scope.table.length; a++) {
        seatDetail[a] = {};
        seatDetail[a].tableId = $scope.table[a].getAttribute('data-seat');
        seatDetail[a].tableAreaId = $scope.table[a].getAttribute('data-tableAreaId');
        seatDetail[a].tableAreaName = $scope.table[a].getAttribute('data-tableAreaName');
        seatDetail[a].tableName = $scope.table[a].getAttribute('data-tableName');
        maxNum += $scope.table[a].getAttribute('data-maxPeopleNum') - $scope.table[a].getAttribute('data-zuoshu');
      }
      //console.log(seatDetail);
      for (var key in $scope.seatData) {
        $seatData[key] = $scope.seatData[key];
      }
      ;
      $seatData['meal'] = $scope.meal;
      $seatData['area'] = $scope.area;
      $seatData['time'] = $scope.time;
      console.log($seatData);
      console.log(maxNum);

      var a = (new Date().getHours() * 60) + (new Date().getMinutes() * 1);
      var b = $scope.resvEndTime.slice(0, 2) * 60 + $scope.resvEndTime.slice(3) * 1;
      if (($scope.showTime == $scope.compareTime()) && (a > b)) {
        $scope.showAlert('该餐次已经停止预订');
      } else {
        if ($stateParams.keyNo == null) {
          var params = {'type': 2}
          sessionStorage['ybookParams'] = JSON.stringify(params)
          $state.go('myOrder-yDetail', {
            'type': 1,
            'seat': data.meetingTablesName,
            'date': $scope.showTime,
            'ytype': $scope.meal,
            'ytypeid': $scope.seatData.mealTypeId,
            'seatDetail': seatDetail,
            'maxNum': maxNum
            //'seatDataFor': $scope.seatDataFor
          });
        } else {
          var params = {'type': 2}
          sessionStorage['ybookParams'] = JSON.stringify(params)
          $state.go('myOrder-yDetail', {
            'type': 1,
            'seat': data.meetingTablesName,
            'date': $scope.showTime,
            'ytype': $scope.meal,
            'ytypeid': $scope.seatData.mealTypeId,
            'seatDetail': seatDetail,
            'maxNum': maxNum,
            'keyNo': $stateParams.keyNo,
            'vipPhone': $stateParams.vipPhone,
            'man': $stateParams.man,
            'vipName': $stateParams.vipName,
            'ytype1': $stateParams.ytype,
            'resvMeetingOrderType': $stateParams.resvMeetingOrderType,
            'resvTableNum': $stateParams.resvTableNum,
            'backupTableNum': $stateParams.backupTableNum,
            'resvAmount': $stateParams.resvAmount,
            'vipStatus': $stateParams.vipStatus
            //'seatDataFor': $scope.seatDataFor
          });
        }
      }
    }
    if (data.status == 0 && (data.meetingStatus > -1) && (data.meetingStatus <= 2)) {
      if (data.tableList != "" && data.tableList.length > 0) {
        var txt = '';
        for (var i = 0; i < data.tableList.length; i++) {
          txt += `${data.tableList[i].meetingTableName} ${$T.T('关联的散台已有')} ${data.tableList[i].cou} ${$T.T('桌被预订')} </br>`;
        }
        $scope.myPopup = $ionicPopup.show({
          cssClass: "er-popup",
          template: '<p>' + txt + '</p>',
          title: $T.T('是否继续预订'),
          scope: $scope,
          buttons: [
            {text: $T.T('取消')},
            {
              text: `<b>${$T.T('继续预订')}</b>`,
              type: 'button-assertive',
              onTap: function () {
                chkSuc();
              }
            }
          ]
        });
      } else {
        chkSuc();
      }
      //$showAlert.alert('成啦');
    } else {
      $showAlert.alert('该桌无法预订');
    }
  };
  $scope.seatCheckSuccess1 = function (data) {
    console.log(data);
    var chkSuc = function () {
      var seatDetail = [];
      var maxNum = 0;
      for (var a = 0; a < $scope.tableNew.length; a++) {
        seatDetail[a] = {};
        seatDetail[a].tableId = $scope.tableNew[a].getAttribute('data-seat');
        seatDetail[a].tableAreaId = $scope.tableNew[a].getAttribute('data-tableAreaId');
        seatDetail[a].tableAreaName = $scope.tableNew[a].getAttribute('data-tableAreaName');
        seatDetail[a].tableName = $scope.tableNew[a].getAttribute('data-tableName');
        $scope.resvDate = $scope.tableNew[a].getAttribute('data-resvDate');
        maxNum += $scope.tableNew[a].getAttribute('data-maxPeopleNum') - $scope.tableNew[a].getAttribute('data-zuoshu');
      }
      //console.log(seatDetail);
      for (var key in $scope.seatData) {
        $seatData[key] = $scope.seatData[key];
      }
      ;
      $seatData['meal'] = $scope.meal;
      $seatData['area'] = $scope.area;
      $seatData['time'] = $scope.time;
      console.log($seatData);
      console.log(maxNum);

      var a = (new Date().getHours() * 60) + (new Date().getMinutes() * 1);
      var b = $scope.resvEndTime.slice(0, 2) * 60 + $scope.resvEndTime.slice(3) * 1;
      if (($scope.showTime == $scope.compareTime()) && (a > b)) {
        $scope.showAlert('该餐次已经停止预订');
      } else {
        if ($stateParams.keyNo == null) {
          var params = {'type': 2,'back':1}
          sessionStorage['ybookParams'] = JSON.stringify(params)
          $state.go('myOrder-yDetail', {
            'type': 1,
            'seat': data.meetingTablesName,
            'date': $scope.resvDate,
            'ytype': $scope.mealTypeName,
            'ytypeid': $scope.mealTypeId,
            'seatDetail': seatDetail,
            'maxNum': maxNum,
            'back':1
            //'seatDataFor': $scope.seatDataFor
          });
        } else {
          var params = {'type': 2}
          sessionStorage['ybookParams'] = JSON.stringify(params)
          $state.go('myOrder-yDetail', {
            'type': 1,
            'seat': data.meetingTablesName,
            'date': $scope.showTime,
            'ytype': $scope.meal,
            'ytypeid': $scope.seatData.mealTypeId,
            'seatDetail': seatDetail,
            'maxNum': maxNum,
            'keyNo': $stateParams.keyNo,
            'vipPhone': $stateParams.vipPhone,
            'man': $stateParams.man,
            'vipName': $stateParams.vipName,
            'ytype1': $stateParams.ytype,
            'resvMeetingOrderType': $stateParams.resvMeetingOrderType,
            'resvTableNum': $stateParams.resvTableNum,
            'backupTableNum': $stateParams.backupTableNum,
            'resvAmount': $stateParams.resvAmount,
            'vipStatus': $stateParams.vipStatus
            //'seatDataFor': $scope.seatDataFor
          });
        }
      }
    }
    if (data.status == 0 && (data.meetingStatus > -1) && (data.meetingStatus <= 2)) {
      if (data.tableList != "" && data.tableList.length > 0) {
        var txt = '';
        for (var i = 0; i < data.tableList.length; i++) {
          txt += `${data.tableList[i].meetingTableName} ${$T.T('关联的散台已有')} ${data.tableList[i].cou} ${$T.T('桌被预订')} </br>`;
        }
        $scope.myPopup = $ionicPopup.show({
          cssClass: "er-popup",
          template: '<p>' + txt + '</p>',
          title: $T.T('是否继续预订'),
          scope: $scope,
          buttons: [
            {text: $T.T('取消')},
            {
              text: `<b>${$T.T('继续预订')}</b>`,
              type: 'button-assertive',
              onTap: function () {
                chkSuc();
              }
            }
          ]
        });
      } else {
        chkSuc();
      }
      //$showAlert.alert('成啦');
    } else {
      $showAlert.alert('该桌无法预订');
    }
  };
  $scope.goTableEdit = function(){
    if($scope.info.appOperationSet.indexOf(14) != -1){
      var params = {'type': 2}
      sessionStorage['ybookParams'] = JSON.stringify(params)
      $state.go('tableYEdit', {'tableId': $scope.tableId,'isYan':true,'tableName':$scope.tableName,'tType':$scope.tType,'tTypeId':$scope.tTypeId,'maxPeopleNum':$scope.maxPeopleNum,'minAmount':$scope.minAmount,'roomArea':$scope.roomArea,'floorHeight':$scope.floorHeight,'device':$scope.device,'tableRemark':$scope.tableRemark,'tableUrl':$scope.tableUrl});
    }else{
      $showAlert.alert('无权限');
    }
  };
  $scope.changeDetail = function(){
    if($scope.showDetail == true){
      $scope.showDetail = false;
      $scope.changeName = '档期看板';
    }else{
      $scope.showDetail = true;
      $scope.changeName = '厅位界面';
    }
  };
  $scope.d=$('.date-row')[0];
  $scope.l=$('.area-row')[0];
  $scope.r=$('.table-body')[0];
  $scope.l.addEventListener('scroll',function(){
    $scope.r.scrollLeft = $('.area-row')[0].scrollLeft;
  })
  $scope.d.addEventListener('scroll',function(){
    $scope.r.scrollTop = $('.date-row')[0].scrollTop;
  })
  $scope.left1 = function () {
    $scope.l.scrollLeft = $scope.l.scrollLeft + 60;
    $scope.r.scrollLeft = $scope.r.scrollLeft + 60;
  };
  $scope.right1 = function () {
    $scope.l.scrollLeft = $scope.l.scrollLeft - 60;
    $scope.r.scrollLeft = $scope.r.scrollLeft - 60;
  };
  $scope.up1 = function () {
    $scope.d.scrollTop = $scope.d.scrollTop + 45;
    $scope.r.scrollTop = $scope.r.scrollTop + 45;
  };
  $scope.down1 = function () {
    $scope.d.scrollTop = $scope.d.scrollTop - 45;
    $scope.r.scrollTop = $scope.r.scrollTop - 45;
  };
  $scope.shareTable = function(){
    if($scope.tableUrl != ''){
      $scope.weixin($scope.tableUrl);
    }else {
      $showAlert.alert('请先上传图片');
    }
  };
  $scope.weixin = function (txt) {
    wx.miniProgram.getEnv(function(res) { 
      if(res.miniprogram){
        var postData = {
          username: $scope.info.username,
          txt: txt
        };
        wx.miniProgram.postMessage({ data: postData });
        wx.miniProgram.navigateTo({
          url: '../empty/index?txt=' + encodeURIComponent(txt) + '&username=' + $scope.info.username
        })
      }
    })
    Wechat.isInstalled(function (installed) {
      Wechat.share({
        text: txt,
        scene: 0   // share to Timeline
      }, function () {
        $showAlert.alert('分享成功');
      }, function (reason) {
        $showAlert.alert(`${$T.T('失败')}: ` + reason);
      });
    }, function (reason) {
      $showAlert.alert(`${$T.T('失败')}: ` + reason);
    });
  };
  //查看座位详情////////////////////////////
  $scope.seeDetail = function () {
    if(!$scope.isKan){
      if ($scope.table.length > 1) {
        $showAlert.alert('只能选择一张桌位');
      } else if ($scope.table.length == 1) {
        if ($scope.table[0].getAttribute('data-state') == 0) {
          $showAlert.alert('该桌无详情');
        } else if ($scope.table[0].getAttribute('data-state') == 5) {
          $showAlert.alert('这里是锁台详情');
        } else if ($scope.table[0].getAttribute('data-state') < 3) {
          for (var key in $scope.seatData) {
            $seatData[key] = $scope.seatData[key];
          }
          ;
          $seatData['meal'] = $scope.meal;
          $seatData['area'] = $scope.area;
          $seatData['time'] = $scope.time;
          var listData = {
            "tablename": $scope.table[0].getAttribute('data-tableName'),
            "resvDate": $scope.showTime,
            "mealTypeId": $scope.seatData.mealTypeId,
            "tableId": $scope.table[0].getAttribute('data-seat')
          };
          sessionStorage['meetingListData'] = JSON.stringify(listData);
          var params = {'type': 2}
          sessionStorage['ybookParams'] = JSON.stringify(params)
          $state.go('myOrder-yDetail-main', {
            "tablename": $scope.table[0].getAttribute('data-tableName'),
            "resvDate": $scope.showTime,
            "resvStartTime": $scope.resvStartTime,
            "mealTypeId": $scope.seatData.mealTypeId,
            "tableId": $scope.table[0].getAttribute('data-seat')
          });
        }
      }
    }else{
      if ($scope.tableNew.length > 1) {
        $showAlert.alert('只能选择一张桌位');
      } else if ($scope.tableNew.length == 1) {
        if ($scope.tableNew[0].children[0].innerHTML == '' && $scope.tableNew[0].children[1].innerHTML == '') {
          $showAlert.alert('该桌无详情');
        } else {
          for (var key in $scope.seatData) {
            $seatData[key] = $scope.seatData[key];
          }
          ;
          $seatData['meal'] = $scope.meal;
          $seatData['area'] = $scope.area;
          $seatData['time'] = $scope.time;
          var listData = {
            "tablename": $scope.tableNew[0].getAttribute('data-tableName'),
            "resvDate":$scope.tableNew[0].getAttribute('data-resvDate'),
            "mealTypeId": "",
            "tableId": $scope.tableNew[0].getAttribute('data-seat')
          };
          sessionStorage['meetingListData'] = JSON.stringify(listData);
          var params = {'type': 2}
          sessionStorage['ybookParams'] = JSON.stringify(params)
          $state.go('myOrder-yDetail-main', {
            "tablename": $scope.tableNew[0].getAttribute('data-tableName'),
            "resvDate": $scope.tableNew[0].getAttribute('data-resvDate'),
            "resvStartTime": $scope.resvStartTime,
            "mealTypeId": "",
            "tableId": $scope.tableNew[0].getAttribute('data-seat'),
            'back':1
          });
        }
      }
    }
  }

})
