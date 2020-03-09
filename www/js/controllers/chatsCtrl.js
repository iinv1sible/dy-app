angular.module('starter.controllers.chatsCtrl', []).controller('ChatsCtrl', function ($scope, $http, $chat, $ionicPopover, $showAlert, $ionicLoading, $state, ionicDatePicker, $ionicPopover, $showAlert, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log($scope.todayWeek());
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
      "brandType": $scope.brandType,
      "businessId": $scope.info.businessId,
      "qryType": 0,
      "qryType2": 0,
      "starttime": '',
      'endtime': '',
      'orderType': 0
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
    $chat.getRanking($scope.getRankingData, $scope.getRankSuccess, $scope.error);
    // $chat.getRankingList($scope.getRankingListData,$scope.getRankListSuccess,$scope.error);
    $chat.getBusinessRanking($scope.getBusinessRankingData, $scope.getBusinessRankSuccess, $scope.error);
    $chat.getChart($scope.getChartData, $scope.getChartSuccess, $scope.error);
    $chat.getWChart($scope.getWChartdata, $scope.getWChartSuccess, $scope.error);
    $chat.getKt($scope.getKtDate, $scope.getKtSuccess, $scope.error);
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
  $scope.chartPieConfig1 = function (data) {
    return {
      options: {
        chart: {

          plotBackgroundColor: null,

          plotBorderWidth: null,

          plotShadow: false

        },
        plotOptions: {

          pie: {
            innerSize: "70%",

            allowPointSelect: true,

            cursor: 'pointer',

            dataLabels: {

              enabled: true,

              format: '{point.name}: <br>{point.percentage:.1f} %',

              style: {
                fontFamily: 'SimHei',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#777'
              },

            }

          }
        }
      },

      title: {

        text: '客户外部来源表',
        style: {color: 'transparent', fontSize: 0}

      },
      credits: {
        enabled: false
      },

      tooltip: {


        pointFormat: '{series.name}'

      },


      series: [{

        type: 'pie',

        name: '预订单数',

        data: data

      }]
    };
  };
  $scope.chartPieConfig = function (data) {
    return {
      options: {
        chart: {

          plotBackgroundColor: null,

          plotBorderWidth: null,

          plotShadow: false

        },
        plotOptions: {

          pie: {
            innerSize: "70%",

            allowPointSelect: true,

            cursor: 'pointer',

            dataLabels: {

              enabled: true,

              format: '{point.name}: <br>{point.percentage:.1f} %',

              style: {
                fontFamily: 'SimHei',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#777'
              },

            },

          }
        }
      },

      title: {

        text: '客户来源比例',
        style: {color: 'transparent', fontSize: 0}

      },
      credits: {
        enabled: false
      },

      tooltip: {

        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'

      },


      series: [{

        type: 'pie',

        name: '预定单数',

        data: data,
        events: {
          click: function ($event) {
            if ($event.target.getAttribute('fill') == '#6CC1AD') {
              $scope.chartPieConfigY = $scope.chartPieConfigK;
              $scope.$apply();
            }
            //this does not work!!
          }
        }

      }]
    }
  };
  $scope.chartPieConfig2 = function (data) {
    return {
      options: {
        chart: {

          plotBackgroundColor: null,

          plotBorderWidth: null,

          plotShadow: false

        },
        plotOptions: {

          pie: {
            innerSize: "70%",

            allowPointSelect: true,

            cursor: 'pointer',

            dataLabels: {

              enabled: true,

              format: '{point.name}: <br>{point.percentage:.1f} %',

              style: {
                fontFamily: 'SimHei',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#777'
              },

            }

          }
        }
      },

      title: {

        text: '宴会预订类型',
        style: {color: 'transparent', fontSize: 0}

      },
      credits: {
        enabled: false
      },

      tooltip: {

        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'

      },


      series: [{

        type: 'pie',

        name: '预订单数',

        data: data

      }]
    };
  };
  $scope.chartPieConfig3 = function (arr0, arr1, arr2) {
    return {
      options: {
        chart: {
          type: 'column',
        },
        yAxis: { // Primary yAxis
          title: {
            text: null,
          }
        },
        xAxis: {
          categories: [
            localStorage['lang'] == 'en' ? 'Sun.' : '日',
            localStorage['lang'] == 'en' ? 'Mon.' : '一',
            localStorage['lang'] == 'en' ? 'Tue.' : '二',
            localStorage['lang'] == 'en' ? 'Wed.' : '三',
            localStorage['lang'] == 'en' ? 'Thur.' : '四',
            localStorage['lang'] == 'en' ? 'Fri.' : '五',
            localStorage['lang'] == 'en' ? 'Sat.' : '六',
          ],
          crosshair: true
        },
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: arr0,
          name: localStorage['lang'] == 'en' ? 'box' : '包厢',
          color: '#fd4e4f'
        },
        {
          data: arr1,
          name: localStorage['lang'] == 'en' ? 'loose platform' : '散台',
          color: '#95809e'
        },
        {
          data: arr2,
          name: localStorage['lang'] == 'en' ? 'card holder' : '卡座',
          color: '#ffd651'
        },
      ],
      title: {
        text: null
      }
    }
  };
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
        } else if (a == 3) {
          if (b == 1) {
            if ($scope.freshTime(date) > $scope.getChartData.endtime) {
              $showAlert.alert('截止时间不能晚于开始时间');
            } else {
              $scope.getChartData.starttime = $scope.freshTime(date);
              $scope.getWChartdata.starttime = $scope.freshTime(date);
              $chat.getChart($scope.getChartData, $scope.getChartSuccess, $scope.error);
              $chat.getWChart($scope.getWChartdata, $scope.getWChartSuccess, $scope.error);
            }
          } else {
            if ($scope.freshTime(date) < $scope.getChartData.starttime) {
              $showAlert.alert('截止时间不能早于开始时间');
            } else {
              $scope.getChartData.endtime = $scope.freshTime(date);
              $scope.getWChartdata.endtime = $scope.freshTime(date);
              $chat.getChart($scope.getChartData, $scope.getChartSuccess, $scope.error);
              $chat.getWChart($scope.getWChartdata, $scope.getWChartSuccess, $scope.error);
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
    } else if (num == 7) {
      $scope.bTime = txt;
      $scope.getChartData.qryType = a.getAttribute('data-id');
      $scope.getWChartdata.qryType = a.getAttribute('data-id');
      if ($scope.getChartData.qryType == 3) {
        $scope.btimeShow = true;
        $scope.getChartData.endtime = $scope.freshTime(new Date().getTime());
        $scope.getChartData.starttime = $scope.freshTime(new Date().getTime() - 86400000 * 30);
      } else {
        $scope.btimeShow = false;
        $scope.getChartData.starttime = '';
        $scope.getChartData.endtime = '';
      }
      if ($scope.getWChartdata.qryType == 3) {
        $scope.btimeShow = true;
        $scope.getWChartdata.endtime = $scope.freshTime(new Date().getTime());
        $scope.getWChartdata.starttime = $scope.freshTime(new Date().getTime() - 86400000 * 30);
      } else {
        $scope.btimeShow = false;
        $scope.getWChartdata.starttime = '';
        $scope.getWChartdata.endtime = '';
      }
      if ($scope.bType == '普通') {
        $chat.getChart($scope.getChartData, $scope.getChartSuccess, $scope.error);
        $chat.getWChart($scope.getWChartdata, $scope.getWChartSuccess, $scope.error);
      } else if ($scope.bType == '宴会') {
        $chat.getYChart($scope.getChartData, $scope.getYChartSuccess, $scope.error);
      }
    } else if (num == 8) {
      $scope.bType = txt;
      if ($scope.bType == '普通') {
        $chat.getChart($scope.getChartData, $scope.getChartSuccess, $scope.error);
        $chat.getWChart($scope.getWChartdata, $scope.getWChartSuccess, $scope.error);
      } else if ($scope.bType == '宴会') {
        $chat.getYChart($scope.getChartData, $scope.getYChartSuccess, $scope.error);
      }
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
  };
  $scope.getChartSuccess = function (data) {
    console.log(data);
    var sum = data.totalWbly * 1 + data.totalBd * 1 + data.totalApp * 1 + data.totalBd * 1;
    var waibu = data.totalWbly;
    var buru = data.totalBd;
    var app = data.totalApp;
    var sanke = data.totalSk;
    var dataA = [

      {

        name: localStorage['lang'] == 'en' ? 'external source' : '外部来源',

        y: waibu,
        color: '#ffd561',

      },

      {

        name: localStorage['lang'] == 'en' ? 'in-store marketing' : '店内营销',

        y: app,
        color: '#fd4e4f'

      },

      {

        name: localStorage['lang'] == 'en' ? 'step into the FIT' : '步入散客',

        y: buru,
        color: '#95809e'

      },

      {

        name: localStorage['lang'] == 'en' ? 'individual reservation' : '散客预订',

        y: sanke,
        color: '#eeeeee'

      },


    ]
    $scope.chartPieConfigY = $scope.chartPieConfig(dataA);
  };
  $scope.getYChartSuccess = function (data) {
    console.log(data);
    var sum = 0;
    var waibuData = [];
    for (var a = 0; a < data.length; a++) {
      sum += data[a].orderNum * 1;
    }
    for (var i = 0; i < data.length; i++) {
      waibuData[i] = {};
      waibuData[i].name = data[i].typeName;
      waibuData[i].y = data[i].orderNum;
      if (i >= 5) {
        waibuData[i].color = $scope.colorArr[i - 5];
      } else {
        waibuData[i].color = $scope.colorArr[i];
      }
    }
    for (var a = 0; a < waibuData.length; a++) {
      if (waibuData[a].y == 0) {
        waibuData.splice(a, 1);
        a--;
      }
    }
    console.log(waibuData);
    $scope.chartPieConfigY = $scope.chartPieConfig2(waibuData);
  }
  $scope.getWChartSuccess = function (data) {
    console.log(data);
    var sum = 0;
    var waibuData = [];
    for (var a = 0; a < data.length; a++) {
      sum += data[a].orderNum * 1;
    }
    for (var i = 0; i < data.length; i++) {
      waibuData[i] = {};
      waibuData[i].name = data[i].externalSourceName;
      waibuData[i].y = data[i].orderNum;
      if (i >= 5) {
        waibuData[i].color = $scope.colorArr[i - 5];
      } else {
        waibuData[i].color = $scope.colorArr[i];
      }
    }
    for (var a = 0; a < waibuData.length; a++) {
      if (waibuData[a].y == 0) {
        waibuData.splice(a, 1);
        a--;
      }
    }
    console.log(waibuData);
    $scope.chartPieConfigK = $scope.chartPieConfig1(waibuData);
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
    } else if (data.type == 1) {
      $scope.showH = true;
      var sum = 0;
      for (var i = 0; i < data.rankList.length; i++) {
        data.rankList[i].color = $scope.color();
        sum += data.rankList[i].totalOrder * 1;
      }
      for (var i = 0; i < data.rankList.length; i++) {
        data.rankList[i].width = data.rankList[i].totalOrder * 1 / sum * 100;
      }
      $scope.businessList = data.rankList;
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
    var vipId = $event.target.getAttribute('data-vipId');
    $state.go('myCustom-info-record', {'vipId': vipId, 'type': $scope.getRankingListData.qryType2});
  };
  $scope.goRankRecord = function ($event) {
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
})