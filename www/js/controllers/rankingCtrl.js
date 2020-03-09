angular.module('starter.controllers.rankingCtrl', []).controller('rankingCtrl', function ($scope, $http, $chat, $ionicPopover, $showAlert, $ionicLoading, $state, ionicDatePicker, $ionicPopover, $showAlert, $ionicScrollDelegate, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log($scope.todayWeek());
    $scope.filter = sessionStorage['rankingFilter']?JSON.parse(sessionStorage['rankingFilter']):''
    $scope.time = '本周';
    $scope.type = '普通';
    $scope.timeShow = false;
    $scope.starttime = '';
    $scope.endtime = '';
    $scope.hTime = '本周';
    $scope.hType = '普通';
    $scope.htimeShow = false;
    $scope.starthtime = '';
    $scope.endhtime = '';
    $scope.rankingName = '销售量排行';
    $scope.cTime = '本周';
    $scope.cType = '普通';
    $scope.ctimeShow = false;
    $scope.startctime = '';
    $scope.endctime = '';
    $scope.bTime = '本周';
    $scope.bType = '普通';
    $scope.btimeShow = false;
    $scope.startbtime = '';
    $scope.endbtime = '';
    $scope.showH = true;
    $scope.customList = [];
    $scope.saleList = [];
    $scope.businessList = [];
    $scope.waibuShow = false;
    $scope.orderShow = false;
    $scope.vipShow = false;
    $scope.businessShow = false;
    $scope.maxNum = localStorage['lang'] == 'en' ? '--orders' : '--单';
    $scope.weekNum = $scope.todayWeek();
    $scope.info = JSON.parse(localStorage['info']);
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
    var rlqryType = 0, brqryType = 0
    var rlqryType2 = 0, brqryType2 = 0
    var orderType = 0
    if($scope.filter){
      console.log($scope.filter)
      $scope.orderShow = $scope.filter.orderShow
      $scope.businessShow = $scope.filter.businessShow
      $scope.vipShow = $scope.filter.vipShow
      $scope.cTime = $scope.filter.cTime
      $scope.hTime = $scope.filter.hTime
      $scope.time = $scope.filter.time
      $scope.cType = $scope.filter.cType
      $scope.hType = $scope.filter.hType
      $scope.type = $scope.filter.type
      if($scope.orderShow){
        rlqryType = $scope.cTime=='本周'?0:($scope.cTime=='本月'?1:2)
        rlqryType2 = $scope.cType=='普通'?0:1
      }
      if($scope.businessShow){
        brqryType = $scope.hTime=='本周'?0:($scope.hTime=='本月'?1:2)
        brqryType2 = $scope.hType=='普通'?0:1
      }
      if($scope.vipShow){
        brqryType = $scope.time=='本周'?0:($scope.time=='本月'?1:2)
        brqryType2 = $scope.type=='普通'?0:1
      }
      orderType = $scope.filter.orderType
    }else{
      $scope.waibuShow = false;
      $scope.orderShow = true;
      $scope.vipShow = false;
      $scope.businessShow = false;
    }
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
      "qryType": brqryType,
      "qryType2": brqryType2,
      "starttime": '',
      'endtime': ''
    };
    $scope.getBusinessRankingData = {
      "brandType": $scope.brandType,
      "businessId": $scope.info.businessId,
      "qryType": brqryType,
      "qryType2": brqryType2,
      "starttime": '',
      'endtime': '',
      'orderType': orderType
    };
    $scope.getChartData = {
      "businessId": $scope.info.businessId,
      "qryType": 0,
    };
    $scope.getWChartdata = {
      "businessId": $scope.info.businessId,
      "qryType": 0
    };
    $scope.getKtDate = {
      "businessId": $scope.info.businessId,
      "weekNum": $scope.weekNum
    };
    $scope.showLoading();
    // $chat.getRanking($scope.getRankingData,$scope.getRankSuccess,$scope.error);
    $chat.getRankingList($scope.getRankingListData, $scope.getRankListSuccess, $scope.error);
    $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
    // $chat.getChart($scope.getChartData,$scope.getChartSuccess,$scope.error);
    // $chat.getWChart($scope.getWChartdata,$scope.getWChartSuccess,$scope.error);
    // $chat.getKt($scope.getKtDate,$scope.getKtSuccess,$scope.error);
  });
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
  $scope.colorArr = ['#6CC1AD', '#DA7769', '#B993DB', '#EEAE44', '#A39393', '#6992CD'];
  $scope.chartK = true;
  $scope.changeChart = function () {
    $scope.chartK = !$scope.chartK;
  }
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  var chooseTime = `<ion-popover-view style="height:180px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,1)">{{'本周'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,1)">{{'本月'|T}}</a>
                      <a class="item popover-padding text-center" data-id="2" ng-click="choose($event,1)">{{'全部'|T}}</a>
                      <a class="item popover-padding text-center" data-id="3" ng-click="choose($event,1)">{{'自选时间'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var chooseType = `<ion-popover-view style="height:90px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,2)">{{'普通'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,2)">{{'宴会'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var choosehTime = `<ion-popover-view style="height:180px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,3)">{{'本周'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,3)">{{'本月'|T}}</a>
                      <a class="item popover-padding text-center" data-id="2" ng-click="choose($event,3)">{{'全部'|T}}</a>
                      <a class="item popover-padding text-center" data-id="3" ng-click="choose($event,3)">{{'自选时间'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var choosehType = `<ion-popover-view style="height:90px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,4)">{{'普通'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,4)">{{'宴会'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var choosecTime = `<ion-popover-view style="height:180px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,5)">{{'本周'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,5)">{{'本月'|T}}</a>
                      <a class="item popover-padding text-center" data-id="2" ng-click="choose($event,5)">{{'全部'|T}}</a>
                      <a class="item popover-padding text-center" data-id="3" ng-click="choose($event,5)">{{'自选时间'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var choosecType = `<ion-popover-view style="height:90px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,6)">{{'普通'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,6)">{{'宴会'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var choosebTime = `<ion-popover-view style="height:180px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,7)">{{'本周'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,7)">{{'本月'|T}}</a>
                      <a class="item popover-padding text-center" data-id="2" ng-click="choose($event,7)">{{'全部'|T}}</a>
                      <a class="item popover-padding text-center" data-id="3" ng-click="choose($event,7)">{{'自选时间'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  var choosebType = `<ion-popover-view style="height:90px;width:100px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item popover-padding text-center" data-id="0" ng-click="choose($event,8)">{{'普通'|T}}</a>
                      <a class="item popover-padding text-center" data-id="1" ng-click="choose($event,8)">{{'宴会'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  $scope.popover1 = $ionicPopover.fromTemplate(chooseTime, {
    scope: $scope
  });
  $scope.popover2 = $ionicPopover.fromTemplate(chooseType, {
    scope: $scope
  });
  $scope.popover3 = $ionicPopover.fromTemplate(choosehTime, {
    scope: $scope
  });
  $scope.popover4 = $ionicPopover.fromTemplate(choosehType, {
    scope: $scope
  });
  $scope.popover5 = $ionicPopover.fromTemplate(choosecTime, {
    scope: $scope
  });
  $scope.popover6 = $ionicPopover.fromTemplate(choosecType, {
    scope: $scope
  });
  $scope.popover7 = $ionicPopover.fromTemplate(choosebTime, {
    scope: $scope
  });
  $scope.popover8 = $ionicPopover.fromTemplate(choosebType, {
    scope: $scope
  });
  $scope.openPopover = function ($event, num) {
    if (num == 1) {
      $scope.popover1.show($event);
    } else if (num == 2) {
      $scope.popover2.show($event);
    } else if (num == 3) {
      $scope.popover3.show($event);
    } else if (num == 4) {
      $scope.popover4.show($event);
    } else if (num == 5) {
      $scope.popover5.show($event);
    } else if (num == 6) {
      $scope.popover6.show($event);
    } else if (num == 7) {
      $scope.popover7.show($event);
    } else if (num == 8) {
      $scope.popover8.show($event);
    }
  };
  $scope.showRanking = function ($event, num) {
    if (num == 1) {
      $scope.rankingName = '销售量排行';
      $scope.getBusinessRankingData.orderType = 0;
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
      $scope.orderShow = true;
      $scope.vipShow = false;
      $scope.businessShow = false;
      $ionicScrollDelegate.scrollTop();
    } else if (num == 2) {
      $scope.rankingName = '销售金额排行';
      $scope.getBusinessRankingData.orderType = 1;
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
      $scope.orderShow = true;
      $scope.vipShow = false;
      $scope.businessShow = false;
      $ionicScrollDelegate.scrollTop();
    } else if (num == 3) {
      $scope.rankingName = '客户排行';
      $scope.orderShow = false;
      $scope.vipShow = true;
      $scope.businessShow = false;
      $chat.getRankingList($scope.getRankingListData, $scope.getRankListSuccess, $scope.error);
      $ionicScrollDelegate.scrollTop();
    } else if (num == 4) {
      $scope.rankingName = '门店排行';
      $scope.orderShow = false;
      $scope.vipShow = false;
      $scope.getBusinessRankingData.orderType = 0;
      $scope.businessShow = true;
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
      $ionicScrollDelegate.scrollTop();
    }
  };
  $scope.closePopover = function (num) {
    if (num == 1) {
      $scope.popover1.hide();
    } else if (num == 2) {
      $scope.popover2.hide();
    } else if (num == 3) {
      $scope.popover3.hide();
    } else if (num == 4) {
      $scope.popover4.hide();
    } else if (num == 5) {
      $scope.popover5.hide();
    } else if (num == 6) {
      $scope.popover6.hide();
    } else if (num == 7) {
      $scope.popover7.hide();
    } else if (num == 8) {
      $scope.popover8.hide();
    }
  };
  $scope.minusWeek = function () {
    if ($scope.weekNum > 1) {
      $scope.weekNum -= 1;
      var getKtDate = {
        "businessId": $scope.info.businessId,
        "weekNum": $scope.weekNum
      };
      $chat.getKt(getKtDate, $scope.getKtSuccess, $scope.error);
    } else {
      $showAlert.alert('当前已是第1周');
    }
  };
  $scope.addWeek = function () {
    if ($scope.todayWeek() > $scope.weekNum) {
      $scope.weekNum += 1;
      var getKtDate = {
        "businessId": $scope.info.businessId,
        "weekNum": $scope.weekNum
      };
      $chat.getKt(getKtDate, $scope.getKtSuccess, $scope.error);
    } else {
      $showAlert.alert('当前已是本周');
    }
  };
  //////////////////选择时间////////////////////
  $scope.newIpObj = function (a, b) {
    var ipObj1 = {
      callback: function (date) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + date, new Date(date));
        if (a == 1) {
          if (b == 1) {
            if ($scope.freshTime(date) > $scope.getRankingData.endtime) {
              $showAlert.alert('截止时间不能晚于开始时间');
            } else {
              $scope.getRankingData.starttime = $scope.freshTime(date);
              $scope.getRankingListData.starttime = $scope.freshTime(date);
              $chat.getRanking($scope.getRankingData, $scope.getRankSuccess, $scope.error);
              $chat.getRankingList($scope.getRankingListData, $scope.getRankListSuccess, $scope.error);
            }
          } else {
            if ($scope.freshTime(date) < $scope.getRankingData.starttime) {
              $showAlert.alert('截止时间不能早于开始时间');
            } else {
              $scope.getRankingData.endtime = $scope.freshTime(date);
              $scope.getRankingListData.endtime = $scope.freshTime(date);
              $chat.getRanking($scope.getRankingData, $scope.getRankSuccess, $scope.error);
              $chat.getRankingList($scope.getRankingListData, $scope.getRankListSuccess, $scope.error);
            }
          }
        } else if (a == 2) {
          if (b == 1) {
            if ($scope.freshTime(date) > $scope.getBusinessRankingData.endtime) {
              $showAlert.alert('截止时间不能晚于开始时间');
            } else {
              $scope.getBusinessRankingData.starttime = $scope.freshTime(date);
              $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
            }
          } else {
            if ($scope.freshTime(date) < $scope.getBusinessRankingData.starttime) {
              $showAlert.alert('截止时间不能早于开始时间');
            } else {
              $scope.getBusinessRankingData.endtime = $scope.freshTime(date);
              $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
            }
          }
        }
      },
      from: new Date(new Date().getTime() - 86400000 * 10000), //Optional
      to: new Date(), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup',       //Optional
      dateFormat: 'yyyy-MM-dd'
    };
    return ipObj1;
  };
  $scope.openDatePicker = function (a, b) {
    var timePicker = $scope.newIpObj(a, b);
    ionicDatePicker.openDatePicker(timePicker);
  };
  /////////////////////////////////////
  $scope.choose = function ($event, num) {
    var a = $event.target;
    var txt = a.innerHTML;
    $scope.closePopover(num);
    if (num == 1) {
      $scope.time = txt;
      $scope.getRankingData.qryType = a.getAttribute('data-id');
      if ($scope.getRankingData.qryType == 3) {
        $scope.timeShow = true;
        $scope.getRankingData.endtime = $scope.freshTime(new Date().getTime());
        $scope.getRankingData.starttime = $scope.freshTime(new Date().getTime() - 86400000 * 30);
      } else {
        $scope.timeShow = false;
        $scope.getRankingData.starttime = '';
        $scope.getRankingData.endtime = '';
      }
      $scope.getRankingListData.qryType = a.getAttribute('data-id');
      if ($scope.getRankingListData.qryType == 3) {
        $scope.timeShow = true;
        $scope.getRankingListData.endtime = $scope.freshTime(new Date().getTime());
        $scope.getRankingListData.starttime = $scope.freshTime(new Date().getTime() - 86400000 * 30);
      } else {
        $scope.timeShow = false;
        $scope.getRankingListData.starttime = '';
        $scope.getRankingListData.endtime = '';
      }
      $chat.getRanking($scope.getRankingData, $scope.getRankSuccess, $scope.error);
      $chat.getRankingList($scope.getRankingListData, $scope.getRankListSuccess, $scope.error);
    } else if (num == 2) {
      $scope.type = txt;
      $scope.getRankingListData.qryType2 = a.getAttribute('data-id');
      $chat.getRankingList($scope.getRankingListData, $scope.getRankListSuccess, $scope.error);
    } else if (num == 3) {
      $scope.hTime = txt;
      $scope.getBusinessRankingData.qryType = a.getAttribute('data-id');
      if ($scope.getBusinessRankingData.qryType == 3) {
        $scope.htimeShow = true;
        $scope.getBusinessRankingData.endtime = $scope.freshTime(new Date().getTime());
        $scope.getBusinessRankingData.starttime = $scope.freshTime(new Date().getTime() - 86400000 * 30);
      } else {
        $scope.htimeShow = false;
        $scope.getBusinessRankingData.starttime = '';
        $scope.getBusinessRankingData.endtime = '';
      }
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
    } else if (num == 4) {
      $scope.hType = txt;
      $scope.getBusinessRankingData.qryType2 = a.getAttribute('data-id');
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
    } else if (num == 5) {
      $scope.cTime = txt;
      $scope.getBusinessRankingData.qryType = a.getAttribute('data-id');
      if ($scope.getBusinessRankingData.qryType == 3) {
        $scope.ctimeShow = true;
        $scope.getBusinessRankingData.endtime = $scope.freshTime(new Date().getTime());
        $scope.getBusinessRankingData.starttime = $scope.freshTime(new Date().getTime() - 86400000 * 30);
      } else {
        $scope.ctimeShow = false;
        $scope.getBusinessRankingData.starttime = '';
        $scope.getBusinessRankingData.endtime = '';
      }
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
    } else if (num == 6) {
      $scope.cType = txt;
      $scope.getBusinessRankingData.qryType2 = a.getAttribute('data-id');
      $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
    }
  };
  $scope.getRankSuccess = function (data) {
    console.log(data);
    $scope.count1 = data.addPuUser;
    $scope.count2 = data.addYanUser;
    $scope.count3 = data.addPuOrder;
    $scope.count4 = data.addYanOrder;
    $ionicLoading.hide();
  };
  $scope.getRankListSuccess = function (data) {
    console.log(data);
    var sum = 0;
    for (var i = 0; i < data.vipRanking.length; i++) {
      data.vipRanking[i].color = $scope.color();
      sum += data.vipRanking[i].resvtimes * 1;
    }
    for (var i = 0; i < data.vipRanking.length; i++) {
      data.vipRanking[i].width = data.vipRanking[i].resvtimes * 1 / sum * 100;
      if (data.vipRanking[i].resvtimes == 0) {
        data.vipRanking.splice(i, 1);
        i--;
      }
    }
    $scope.customList = data.vipRanking;
    console.log($scope.customList)
    $scope.maxNum = $scope.customList[0] ? $scope.customList[0].resvtimes + localStorage['lang'] == 'en' ? 'orders' : '单' : localStorage['lang'] == 'en' ? '--orders' : '--单';
  };
  $scope.getKtSuccess = function (data) {
    var arr0 = [];
    var arr1 = [];
    var arr2 = [];
    for (var key in data[0]) {
      arr0.push(data[0][key]);
    }
    for (var key in data[1]) {
      arr1.push(data[1][key]);
    }
    for (var key in data[2]) {
      arr2.push(data[2][key]);
    }
    $scope.chartPieConfigA = $scope.chartPieConfig3(arr0, arr1, arr2);
  };
  $scope.error = function (data) {
    $ionicLoading.hide();
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.getBusinessRankSuccess = function (data) {
    $ionicLoading.hide();
    console.log(data);
    if (data.type == 2) {
      $scope.showH = false;
      var sum = 0;
      for (var i = 0; i < data.rankList.length; i++) {
        data.rankList[i].color = $scope.color();
        sum += data.rankList[i].orderNum * 1;
      }
      for (var i = 0; i < data.rankList.length; i++) {
        data.rankList[i].width = data.rankList[i].orderNum * 1 / sum * 100;
      }
      $scope.saleList = data.rankList;
      if ($scope.getBusinessRankingData.orderType == 0) {
        $scope.maxNum = $scope.saleList[0] ? $scope.saleList[0].orderNum + (localStorage['lang'] == 'en' ? 'orders' : '单') : (localStorage['lang'] == 'en' ? '--orders' : '--单');
      } else {
        $scope.maxNum = $scope.saleList[0] ? $scope.saleList[0].orderAmt.toFixed(0) + (localStorage['lang'] == 'en' ? 'RMB' : '元') : (localStorage['lang'] == 'en' ? '--RMB' : '--元');
      }
    } else if (data.type == 1) {
      $scope.showH = true;
      $scope.orderShow = false;
      if(!$scope.filter){
        $scope.businessShow = true;
      }
      $scope.rankingName = '门店排行';
      var sum = 0;
      for (var i = 0; i < data.rankList.length; i++) {
        data.rankList[i].color = $scope.color();
        sum += data.rankList[i].totalOrder * 1;
      }
      for (var i = 0; i < data.rankList.length; i++) {
        data.rankList[i].width = data.rankList[i].totalOrder * 1 / sum * 100;
      }
      $scope.businessList = data.rankList;
      $scope.maxNum = $scope.businessList[0] ? $scope.businessList[0].totalOrder + (localStorage['lang'] == 'en' ? 'orders' : '单') : (localStorage['lang'] == 'en' ? '--orders' : '--单');
      console.log(data.rankList);
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
  $scope.goCdetail = function (num) {
    $state.go('tab.chats-cdetail', {
      'type': num,
      'time': $scope.getRankingData.qryType,
      'starttime': $scope.getRankingData.starttime,
      'endtime': $scope.getRankingData.endtime
    });
  };
  $scope.goOdetail = function (num) {
    $state.go('tab.chats-odetail', {
      'type': num,
      'time': $scope.getRankingData.qryType,
      'starttime': $scope.getRankingData.starttime,
      'endtime': $scope.getRankingData.endtime
    });
  };
  $scope.goChatDetail = function ($event) {
    $scope.saveFilter()
    var businessId = $event.target.getAttribute('data-businessId');
    $state.go('tab.chats-detail', {
      'businessId': businessId,
      'qryType': $scope.getBusinessRankingData.qryType,
      'qryType2': $scope.getBusinessRankingData.qryType2,
      'starttime': $scope.getBusinessRankingData.starttime,
      'endtime': $scope.getBusinessRankingData.endtime
    });
  };
  $scope.goRecord = function ($event) {
    $scope.saveFilter()
    var vipId = $event.target.getAttribute('data-vipId');
    $state.go('myCustom-info-record', {'vipId': vipId, 'type': $scope.getRankingListData.qryType2});
  };
  $scope.goRankRecord = function ($event) {
    $scope.saveFilter()
    var appUserId = $event.target.getAttribute('data-appUserId');
    sessionStorage.removeItem('rankOrderList')
    sessionStorage.removeItem('rankPage')
    $state.go('myRank-info-record', {
      'appUserId': appUserId,
      'type': $scope.getBusinessRankingData.qryType2,
      'qryType': $scope.getBusinessRankingData.qryType,
      'starttime': $scope.getBusinessRankingData.starttime,
      'endtime': $scope.getBusinessRankingData.endtime
    });
  };
  $scope.saveFilter = function(){
    var params = {
      orderShow: $scope.orderShow,
      orderType: $scope.getBusinessRankingData.orderType,
      businessShow: $scope.businessShow,
      vipShow: $scope.vipShow,
      cTime: $scope.cTime,
      hTime: $scope.hTime,
      time: $scope.time,
      cType: $scope.cType,
      hType: $scope.hType,
      type: $scope.type,
      ctimeShow: $scope.ctimeShow,
      htimeShow: $scope.htimeShow,
      timeShow: $scope.timeShow,
      starttimeBusinessRanking: $scope.getBusinessRankingData.starttime,
      starttimeRanking: $scope.getRankingData.starttime,
      endtimeBusinessRanking: $scope.getBusinessRankingData.endtime,
      endtimeRanking: $scope.getRankingData.endtime,
    }
    sessionStorage['rankingFilter'] = JSON.stringify(params)
  }
})