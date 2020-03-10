
angular.module('starter.controllers.dashCtrl', []).controller('DashCtrl', function ($scope, $httpClue,$ionicLoading,$cordovaFileTransfer,$cordovaFileOpener2, $ionicPopup, $calendar, $timeout, $state, $detail, $http, $httpPsd, $operation, $httpCustom, $ionicPopover, $showAlert, $rootScope, $location,$T,$hezuo) {
  $scope.$on('$ionicView.beforeEnter', function () {
    console.log($detail);
    $scope.showSlider1 = false;
    $scope.showSlider2 = false;
    $scope.mealTypeId = null;
    $scope.showFalse = false;
    $scope.swipeDayLeft = false;
    $scope.swipeDayRight = false;
    $scope.timeout = null;
    $scope.isShow = true;
    $scope.canLoad = true;
    $scope.index = 0;
    $scope.meetingStatus = false;
    $scope.isKuaTian = 0
    $scope.remind = [];
    if (localStorage['messageNum']) {
      if (localStorage['messageNum'] > 0) {
        $rootScope.message = true;
      } else {
        $rootScope.message = false;
      }
    }
    $scope.info = $scope.info = JSON.parse(localStorage['info']);
    $scope.isYp = $scope.info.isYp == 1 ? true : false
    $scope.meetingStatus = $scope.info.meetingStatus;
    if ($scope.info.appModuleSet) {
      var module = $scope.info.appModuleSet;
      if (module.indexOf(4) != -1) {
        $scope.tongzhi = true;
      } else {
        $scope.tongzhi = false;
      }
      ;
    } else {
      $scope.tongzhi = false;
    }
    $scope.goTong = function () {
      if ($scope.tongzhi) {
        $state.go('tab.dash-message-detail');
      } else {
        $showAlert.alert('您暂未开通此服务');
      }
    }
    $scope.info = JSON.parse(localStorage['info']);
    // console.log($scope.reason);
    if (!localStorage['TOKEN_KEY']) {
      localStorage.removeItem('TOKEN_KEY');
      $state.go('login', {'type': 1});
    }
    console.log($scope.info);
    console.log(1);
    if ($scope.info.appModuleSet) {
      var module = $scope.info.appModuleSet;
      if (module.indexOf(10) != -1) {
        localStorage['meetingOrder'] = 1;
      } else {
        localStorage['meetingOrder'] = 0;
      }
      ;
      if (module.indexOf(11) != -1) {
        localStorage['meetingBook'] = 1;
      } else {
        localStorage['meetingBook'] = 0;
      }
      ;
      if (module.indexOf(10) != -1) {
        $scope.yanhui = true;
      } else {
        $scope.yanhui = false;
      }
      ;
      if (module.indexOf(1) != -1) {
        $scope.dingdan = true;
      } else {
        $scope.dingdan = false;
      }
      ;
      if (module.indexOf(2) != -1) {
        $scope.kehu = true;
      } else {
        $scope.kehu = false;
      }
      ;
      if (module.indexOf(5) != -1) {
        $scope.yuding = true;
      } else {
        $scope.yuding = false;
      }
    } else {
      localStorage['meetingOrder'] = 0;
      $scope.yanhui = false;
      $scope.dingdan = false;
      $scope.kehu = false;
      $scope.yuding = false;
    }
    // $.getJSON("../chcp.json", function (data1) {
    //   $scope.info.version = data1.release;
    // });
    $httpPsd.getArea($scope.info, $scope.areaSuccess, $scope.error);
    $httpPsd.getYArea($scope.info, $scope.YareaSuccess);
    $httpPsd.getReason($scope.info, $scope.getReasonSuccess);
    $operation.getHotel($scope.info.id, $scope.getHotelSuccess);
    $httpPsd.getTags($scope.info, $scope.getTagsSuccess);
    $httpPsd.getWxNoticeNum($scope.info, $scope.getWxNoticeNumSuccess);
    $httpPsd.getAccessToken($scope.getAccessTokenSuccess);
    $scope.remindDate = {
      'appUserId': $scope.info.id,
      'businessId': $scope.info.businessId,
      'resvDate': $scope.freshTime(),
      'page': 1,
      'rows': 10,
      'isAll': $scope.info.operationType,
      'isAll1': $scope.info.appOperationSet.indexOf(13) != -1?1:0
    }
    $httpClue.getRemindList($scope.remindDate, $scope.getRemindListSuccess, $scope.error);
    $httpClue.getAppUserNum($scope.remindDate, $scope.getAppUserNumSuccess, $scope.error);
    $httpPsd.getInternationalConfig(function(data){
      sessionStorage['countryList'] = JSON.stringify(data);
    })
  });
  $scope.getMsgCount = function(){
    if (localStorage['thisDate']) {
      localStorage['preDate'] = localStorage['thisDate'];
      localStorage['thisDate'] = $scope.freshTime();
      $scope.getMessage();
      $scope.saveSleepVipNotice();
    } else {
      localStorage['thisDate'] = $scope.freshTime();
      localStorage['preDate'] = $scope.freshTime();
      console.log('这里要去读一次消息');
      var dataDay = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'date': localStorage['preDate'],
        'sysIntervalDay': $scope.info.notifyBeforeDay
      };
      $httpCustom.customDayNow(dataDay, $scope.getDaySuccess, $scope.errorDay);
      var noticeDay = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId
      };
      $httpCustom.saveSleepVipNotice(noticeDay, $scope.saveSleepVipNoticeSuccess, function(){
        
      });
    }
  }
  $scope.getCount = function(){ // 首页全店数据
    var countData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "resvDate": $scope.freshTime()
    };
    $httpPsd.getCount(countData, $scope.countSuccess, $scope.error);
    if ($scope.info.operationType == 1) {
      console.log('全店数据',localStorage['count'])
      if (localStorage['count'] && (JSON.parse(localStorage['count']).date == $scope.freshTime())) {
        console.log(JSON.parse(localStorage['count']));
        var data = JSON.parse(localStorage['count']);
        $scope.renjun = data.rjCount.rjAmount.toFixed(2);
        $scope.yingye = (data.rjCount.payamount / 10000).toFixed(2) + 'w';
        var txt1 = '';
        for (var i = 0; i < data.preCount.length; i++) {
          txt1 += data.preCount[i].ktCou + '/';
        }
        ;
        txt1 = txt1.slice(0, -1);
        $scope.kaitai = txt1;
        var txt2 = '';
        for (var i = 0; i < data.preCount.length; i++) {
          txt2 += data.preCount[i].tdCou + '/';
        }
        ;
        txt2 = txt2.slice(0, -1);
        $scope.tuiding = txt2;
      } else {
        $httpPsd.getCountA(countData, $scope.countASuccess, $scope.error);
      }
    }
  }
  // 获取当前餐别日期 跨天餐别
  $scope.getMealDate = function(){
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var now = 60 * hour + min;
    console.log('当前餐别是否跨天',$scope.isKuaTian)
    if($scope.isKuaTian == 1){
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
  $scope.getMessage = function () {
    if (localStorage['thisDate'] == localStorage['preDate']) {
      console.log(localStorage['thisDate']);
      console.log('时间相同，不重复读取消息');
    } else {
      console.log(localStorage['thisDate']);
      console.log(localStorage['preDate']);
      console.log('我要去读消息了');
      var dataDay = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'date': localStorage['preDate'],
        'sysIntervalDay': $scope.info.notifyBeforeDay
      };
      $httpCustom.customDayNow(dataDay, $scope.getDaySuccess, $scope.errorDay);
    }
    ;
  };
  $scope.saveSleepVipNotice = function () {
    if (localStorage['thisDate'] == localStorage['preDate']) {
      console.log(localStorage['thisDate']);
      console.log('时间相同，不重复插入消息');
    } else {
      var noticeDay = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId
      };
      $httpCustom.saveSleepVipNotice(noticeDay, $scope.saveSleepVipNoticeSuccess, function(){

      });
    }
    ;
  };
  $scope.errorDay = function () {
    console.log('读日子失败');
    localStorage['messageNum'] = 0;
  }
  $scope.info = JSON.parse(localStorage['info']);
  $scope.getDaySuccess = function (data) {
    console.log(data);
    if (localStorage['messageNum']) {
      localStorage['messageNum'] = localStorage['messageNum'] * 1 + data * 1;
    } else {
      localStorage['messageNum'] = data;
    }
    if (localStorage['messageNum'] > 0) {
      $rootScope.message = true;
    } else {
      $rootScope.message = false;
    }
  };
  $scope.saveSleepVipNoticeSuccess = function (data){
    console.log(data);
  }
  $scope.getWxNoticeNumSuccess = function (data) {
    if (localStorage['messageNum'] == undefined) {
      localStorage['messageNum'] = 0;
    }
    $scope.messageNum = Number(data.orderNum) + Number(data.num) + Number(localStorage['messageNum']);
  };
  $scope.getRemindListSuccess = function (data) {
    if (data != "") {
      if (data.total < 10) {
        $scope.remind = data.list;
      } else {
        $scope.remind = $scope.remind.concat(data.list);
      }
      console.log(data);
      $scope.canLoad = data.hasNextPage;
      $scope.remindDate.page += 1;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    } else {
      $scope.remind = null;
      $scope.canLoad = false;
      $scope.isShow = false;
    }
  };
  $scope.getAppUserNumSuccess = function (data) {
    console.log('跟进提醒数据')
    $scope.keyNum = data.keyNum;
    $scope.dqrNum = data.dqrNum;
    $scope.dcbNum = data.dcbNum;
    $scope.dhfNum = Number(data.dhfNum) == 100?'99+':data.dhfNum;
  };
  $scope.doInfinite = function () {
    $httpClue.getRemindList($scope.remindDate, $scope.getRemindListSuccess, $scope.error);
  };
  $scope.goClueRemain = function (keyNo, type, resvOrder, appUserId) {
    if (keyNo.indexOf('pc') != -1) {
      // var type3 = 4
      // if ($scope.info.operationType == 1 || $scope.info.id == appUserId) {
      //   type3 = 2
      // }
      $state.go('myOrder-yDetail', {'resvOrder': resvOrder, 'batchNo': keyNo, 'type': 2, goBack: true});
    } else {
      $state.go('clueDetail', {'keyNo': keyNo, 'type': type});
    }
  }
  $scope.getTagsSuccess = function (data) {
    if(data.code == 500){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(isAndroid==true && localStorage['isUpdate'] != 1){
        localStorage['isUpdate'] = 1;
        $scope.myPopup = $ionicPopup.show({
          cssClass: "er-popup",
          template: "",
          title: '发现新版本,是否立即下载',
          scope: $scope,
          buttons: [
            {text: '以后再说'},
            {
              text: '<b>立即下载</b>',
              type: 'button-assertive',
              onTap: function () {
                var permissions = cordova.plugins.permissions;
                var list = [
                  permissions.READ_EXTERNAL_STORAGE,
                  permissions.WRITE_EXTERNAL_STORAGE
                ];
                permissions.hasPermission(list, checkPermissionCallback, null);

                function error() {
                  alert('获取权限失败,请打开存储权限');
                }

                function checkPermissionCallback( status ) {
                  if( !status.hasPermission ) {

                    permissions.requestPermissions(
                      list,
                      function(status) {
                        if( !status.hasPermission ) {
                          error();
                        }else {
                          download();
                        }
                      },
                      error);
                  }else {
                    download();
                  }
                }

                function download() {
                  $rootScope.process = 0;
                  $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles" class="spinner-assertive spinner spinner-bubbles"></ion-spinner><br>已经下载：{{process}}%'
                  });
                  var url = 'http://d.zhidianfan.com/yidingmobile.apk';
                  var filename = url.split("/").pop();
                  var targetPath = cordova.file.externalRootDirectory + filename; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                  var trustHosts = true;
                  var options = {};
                  $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                    // 打开下载下来的APP
                    //console.log(JSON.stringify(result));

                    $cordovaFileOpener2.open(targetPath.substr(7,targetPath.length-7), 'application/vnd.android.package-archive'
                    ).then(function () {

                    }, function (err) {

                    });
                    $ionicLoading.hide();
                  }, function (err) {
                    alert('下载失败,请打开存储权限');
                  }, function (progress) {
                    //进度，这里使用文字显示下载百分比
                    $timeout(function () {
                      var downloadProgress = (progress.loaded / progress.total) * 100;
                      $rootScope.process = Math.floor(downloadProgress);
                      if (downloadProgress > 99) {
                        $ionicLoading.hide();
                      }
                    })
                  });
                }
              }
            }
          ]
        });
      }
      // if(isiOS == true){
      //   $showAlert.alert('版本更新中，请更新完后重新登录');
      //   localStorage.removeItem('TOKEN_KEY');
      //   $state.go('login');
      // }
    }else {
      console.log(data.userTag);
      localStorage['userTag'] = data.userTag;
      localStorage['businessTag'] = data.businessTag;
    }
  };
  $scope.countSuccess = function (data) {
    console.log(data);
    var txt3 = '';
    for (var i = 0; i < data.puCount.length; i++) {
      txt3 += data.puCount[i].kxCou + '/';
    }
    ;
    txt3 = txt3.slice(0, -1);
    $scope.kongxian = txt3;
    var txt4 = '';
    for (var i = 0; i < data.puCount.length; i++) {
      txt4 += data.puCount[i].ydCou + '/';
    }
    ;
    txt4 = txt4.slice(0, -1);
    $scope.yiding = txt4;
    var txt5 = '';
    for (var i = 0; i < data.myCount.length; i++) {
      txt5 += data.myCount[i].ydCou + '/';
    }
    ;
    txt5 = txt5.slice(0, -1);
    $scope.woding = txt5;
    var txt6 = '';
    for (var i = 0; i < data.myCount.length; i++) {
      txt6 += data.myCount[i].tdCou + '/';
    }
    ;
    txt6 = txt6.slice(0, -1);
    $scope.wotui = txt6;
  };
  $scope.countASuccess = function (data) {
    console.log('全店数据2',data);
    data.date = $scope.freshTime();
    localStorage['count'] = JSON.stringify(data);
    $scope.renjun = data.rjCount.rjAmount.toFixed(2);
    $scope.yingye = (data.rjCount.payamount / 10000).toFixed(2) + 'w';
    var txt1 = '';
    for (var i = 0; i < data.preCount.length; i++) {
      txt1 += data.preCount[i].ktCou + '/';
    }
    ;
    txt1 = txt1.slice(0, -1);
    $scope.kaitai = txt1;
    var txt2 = '';
    for (var i = 0; i < data.preCount.length; i++) {
      txt2 += data.preCount[i].tdCou + '/';
    }
    ;
    txt2 = txt2.slice(0, -1);
    $scope.tuiding = txt2;
  };
  $scope.error = function (data, status) {
    // if ($scope.showFalse) {
    //   console.log('不弹');
    // } else {
      if (data && data.msgMessage) {
        $scope.showFalse = true;
        $scope.alert = $showAlert.alert(data.msgMessage);
      } else if (status == 401) {
        localStorage.removeItem('TOKEN_KEY');
        $state.go('login');
      } else {
        $scope.showFalse = true;
        $scope.alert = $showAlert.alert('连接失败，请检查网络');
      }
    // }
  };
  $scope.getHotelSuccess = function (data) {
    if (data.length == 1) {
      localStorage['changeHotel'] = 0;
    } else {
      localStorage['changeHotel'] = 1;
    }
    ;
    console.log(localStorage['changeHotel']);
  };
  $scope.getAccessTokenSuccess = function (data) {
    $.getJSON("../chcp.json", function (data1) {
      $scope.loginData = {};
      $scope.loginData.type = 'APP';
      $scope.loginData.access_token = data.access_token;
      $scope.loginData.loginType = 'in';
      $scope.loginData.version = data1.release;
      $scope.loginData.username = $scope.info.username;
      $scope.loginData.business = $scope.info.businessName;
      $scope.loginData.businessId = $scope.info.businessId;
      // $httpPsd.devLogin($scope.loginData, $scope.devLoginSuccess);
    });
  };
  $scope.devLoginSuccess = function (data) {
    console.log(data);
  };
  $scope.freshTime = function () {
    var date = $scope.dateString?new Date($scope.dateString):new Date();
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
  $scope.getTime = function (date) {
    var newDate = new Date(date);
    var m = newDate.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    ;
    var d = newDate.getDate();
    if (d < 10) {
      d = "0" + d
    }
    ;
    var dateString = newDate.getFullYear() + "-" + m + "-" + d;
    $scope.date.month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
    $scope.date.date = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    $scope.date.day = newDate.getDay();
    $scope.date.months = newDate.getMonth() + 1 + "月";
    $scope.dateString = dateString;
    $scope.showDate = date;
    switch ($scope.date.day) {
      case 1:
        $scope.date.day = '周一';
        break;
      case 2:
        $scope.date.day = '周二';
        break;
      case 3:
        $scope.date.day = '周三';
        break;
      case 4:
        $scope.date.day = '周四';
        break;
      case 5:
        $scope.date.day = '周五';
        break;
      case 6:
        $scope.date.day = '周六';
        break;
      case 0:
        $scope.date.day = '周日';
        break;
    }
    ;
    var countData = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      "resvDate": dateString
    };
    if($scope.index == 0){
      $httpPsd.getCount(countData, $scope.countSuccess, $scope.error);
    }else {
      $httpPsd.getCountA(countData, $scope.countASuccess, $scope.error);
    }
  };
  $scope.nextDay = function () {
    if ($scope.dateTime + 152800000 < $scope.getMealDate().getTime() || $scope.index == 0) {
      $scope.swipeDayLeft = true;
      $scope.timeout = $timeout(function () {
        $scope.swipeDayLeft = false;
        $scope.dateTime += 86400000;
        $scope.getTime($scope.dateTime);
      }, 500);
    }
  };
  $scope.preDay = function () {
    if ($scope.dateTime - 76400000 > $scope.getMealDate().getTime() || $scope.index == 1) {
      $scope.swipeDayRight = true;
      $scope.timeout = $timeout(function () {
        $scope.swipeDayRight = false;
        $scope.dateTime -= 86400000;
        $scope.getTime($scope.dateTime);
      }, 500)
    }
  };
  $scope.onSlideChanged = function(index){
    $scope.index = index;
    $scope.dateTime = $scope.getMealDate().getTime();
    if($scope.index == 1){
      $scope.dateTime -= 86400000;
    }
    $scope.getTime($scope.dateTime);
  }
  $scope.fcb = function (dateString) {
    var mtb = [];
    var mtc = JSON.parse(sessionStorage['mealTypes']);
    if ($scope.info.fcb == true) {
      var usingDate = '';
      for (var a = 0; a < mtc.length; a++) {
        usingDate += (',' + mtc[a].usingDate);
        if (mtc[a].bandEndTime && (mtc[a].usingDate.indexOf(dateString) != -1)) {
          var mealStart = mtc[a].resvStartTime.slice(0, 2) * 60 + mtc[a].resvStartTime.slice(3) * 1
          var mealBand = mtc[a].bandEndTime.slice(0, 2) * 60 + mtc[a].bandEndTime.slice(3) * 1
          var mealTypeSecondDaySign = 0
          if(mealStart > mealBand){
            mealTypeSecondDaySign = 1
          }
          var c = {};
          c.mealTypeName = mtc[a].mealTypeNameA;
          c.mealTypeId = mtc[a].id;
          c.mealTypeIdA = mtc[a].mealTypeIdA;
          c.mealTypeIdB = '';
          c.resvStartTime = mtc[a].resvStartTime;
          c.resvEndTime = mtc[a].bandEndTime;
          c.mealTypeSecondDaySign = mealTypeSecondDaySign;
          mtb.push(c);
          var d = {};
          d.mealTypeName = mtc[a].mealTypeNameB;
          d.mealTypeId = mtc[a].id;
          d.mealTypeIdA = '';
          d.mealTypeIdB = mtc[a].mealTypeIdB;
          d.resvStartTime = mtc[a].bandEndTime;
          d.resvEndTime = mtc[a].resvEndTime;
          d.mealTypeSecondDaySign = mtc[a].mealTypeSecondDaySign==1?1:0;
          mtb.push(d);
        } else {
          mtc[a].mealTypeIdB = '';
          mtc[a].mealTypeIdA = '';
          mtc[a].mealTypeId = mtc[a].id;
          mtb.push(mtc[a]);
        }
      }
      sessionStorage['usdingDate'] = usingDate;
      console.log(mtb);
      if (sessionStorage['usdingDate'].indexOf(dateString) != -1) {
        var time1 = new Date();
        var hour1 = time1.getHours();
        var min1 = time1.getMinutes();
        var now1 = 60 * hour1 + min1;
        for (var i = 0; i < mtb.length; i++) {
          var mealStart = mtb[i].resvStartTime.slice(0, 2) * 60 + mtb[i].resvStartTime.slice(3) * 1
          var mealEnd = mtb[i].resvEndTime.slice(0, 2) * 60 + mtb[i].resvEndTime.slice(3) * 1

          if (i == mtb.length - 1) {
            sessionStorage['mealTypeName'] = mtb[i].mealTypeName;
            $scope.meal = mtb[i].mealTypeName;
            sessionStorage['resvStartTime'] = mtb[i].resvStartTime;
            sessionStorage['resvEndTime'] = mtb[i].resvEndTime;
            sessionStorage['mealTypeIdA'] = mtb[i].mealTypeIdA;
            $scope.mealTypeIdA = mtb[i].mealTypeIdA;
            sessionStorage['mealTypeIdB'] = mtb[i].mealTypeIdB;
            $scope.mealTypeIdB = mtb[i].mealTypeIdB;
            sessionStorage['mealTypeId'] = mtb[i].mealTypeId;
            $scope.mealTypeId = mtb[i].mealTypeId;
            $scope.isKuaTian = mtb[i].mealTypeSecondDaySign
            console.log('我运行到了这一步');
            console.log('fcb1',$scope.meal)
          } else if ((now1 < mealEnd) && (now1 > mealStart)) {
            sessionStorage['mealTypeName'] = mtb[i].mealTypeName;
            $scope.meal = mtb[i].mealTypeName;
            sessionStorage['resvStartTime'] = mtb[i].resvStartTime;
            sessionStorage['resvEndTime'] = mtb[i].resvEndTime;
            sessionStorage['mealTypeIdA'] = mtb[i].mealTypeIdA;
            $scope.mealTypeIdA = mtb[i].mealTypeIdA;
            sessionStorage['mealTypeIdB'] = mtb[i].mealTypeIdB;
            $scope.mealTypeIdB = mtb[i].mealTypeIdB;
            sessionStorage['mealTypeId'] = mtb[i].mealTypeId;
            $scope.mealTypeId = mtb[i].mealTypeId;
            $scope.isKuaTian = mtb[i].mealTypeSecondDaySign
            console.log('fcb2',$scope.meal)
            break;
          } else if(mtb[i].mealTypeSecondDaySign == 1 && mtb[i].resvStartTime>mtb[i].resvEndTime){
            var end = mealEnd + 24*60
            var now2 = now1
            if(now2 < sessionStorage['lastMealEndTime']*1){
              now2 = now2 + 24*60
            }
            if(now2 - end < 0){
              sessionStorage['mealTypeName'] = mtb[i].mealTypeName;
              $scope.meal = mtb[i].mealTypeName;
              sessionStorage['resvStartTime'] = mtb[i].resvStartTime;
              sessionStorage['resvEndTime'] = mtb[i].resvEndTime;
              sessionStorage['mealTypeIdA'] = mtb[i].mealTypeIdA;
              $scope.mealTypeIdA = mtb[i].mealTypeIdA;
              sessionStorage['mealTypeIdB'] = mtb[i].mealTypeIdB;
              $scope.mealTypeIdB = mtb[i].mealTypeIdB;
              sessionStorage['mealTypeId'] = mtb[i].mealTypeId;
              $scope.mealTypeId = mtb[i].mealTypeId;
              $scope.isKuaTian = mtb[i].mealTypeSecondDaySign
              console.log('fcb3',$scope.meal)
              break;
            }
          } else if(mtb[i].mealTypeSecondDaySign == 1 && mtb[i].resvStartTime<mtb[i].resvEndTime){
            if((now1 - mealEnd) < 0){
              sessionStorage['mealTypeName'] = mtb[i].mealTypeName;
              $scope.meal = mtb[i].mealTypeName;
              sessionStorage['resvStartTime'] = mtb[i].resvStartTime;
              sessionStorage['resvEndTime'] = mtb[i].resvEndTime;
              sessionStorage['mealTypeIdA'] = mtb[i].mealTypeIdA;
              $scope.mealTypeIdA = mtb[i].mealTypeIdA;
              sessionStorage['mealTypeIdB'] = mtb[i].mealTypeIdB;
              $scope.mealTypeIdB = mtb[i].mealTypeIdB;
              sessionStorage['mealTypeId'] = mtb[i].mealTypeId;
              $scope.mealTypeId = mtb[i].mealTypeId;
              $scope.isKuaTian = mtb[i].mealTypeSecondDaySign
              console.log('fcb4',$scope.meal)
              break;
            }
          }
        }
      }
    }
  };
  $scope.areaSuccess = function (data) {
    console.log(data.mealTypes);
    var mta = data.mealTypes;
    var hasMealStartInSecondDay = false, hasMealTypeSecondDaySign = false
    // 跨天餐别 后端已排序
    // mta.sort(function (a, b) {
    //   return (a.resvEndTime.slice(0, 2) * 60 + a.resvEndTime.slice(3) * 1) - (b.resvEndTime.slice(0, 2) * 60 + b.resvEndTime.slice(3) * 1)
    // });
    mta.map(function(item){
      if(item.resvStartTimeSecondDaySign==1){ // 遍历查询是否有餐别开始时间跨天
        hasMealStartInSecondDay = true
      }
      if(item.mealTypeSecondDaySign==1){ // 遍历查询是否有餐别开始时间跨天
        hasMealTypeSecondDaySign = true
      }
    })
    var firstMealStartTime = mta[0].resvStartTime
    var lastMealEndTime = mta[mta.length-1].resvEndTime
    sessionStorage['firstMealStartTime'] = firstMealStartTime.slice(0, 2) * 60 + firstMealStartTime.slice(3) * 1
    sessionStorage['lastMealEndTime'] = lastMealEndTime.slice(0, 2) * 60 + lastMealEndTime.slice(3) * 1
    sessionStorage['mealTypes'] = JSON.stringify(mta);
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var now = 60 * hour + min;
    sessionStorage['resvOrderTypes'] = JSON.stringify(data.resvOrderTypes);
    for (var i = 0; i < mta.length; i++) {
      var mealStart = mta[i].resvStartTime.slice(0, 2) * 60 + mta[i].resvStartTime.slice(3) * 1
      var mealEnd = mta[i].resvEndTime.slice(0, 2) * 60 + mta[i].resvEndTime.slice(3) * 1
      if (i == mta.length - 1) {
        if((hasMealTypeSecondDaySign && now > sessionStorage['lastMealEndTime']*1) || (!hasMealTypeSecondDaySign && now <= sessionStorage['firstMealStartTime']*1)){
          $scope.meal = mta[0].mealTypeName;
          sessionStorage['mealTypeName'] = $scope.meal;
          $scope.resvStartTime = mta[0].resvStartTime;
          sessionStorage['resvStartTime'] = $scope.resvStartTime;
          $scope.resvEndTime = mta[0].resvEndTime;
          sessionStorage['resvEndTime'] = $scope.resvEndTime;
          $scope.mealTypeId = mta[0].id;
          sessionStorage['mealTypeId'] = $scope.mealTypeId;
          $scope.isKuaTian = mta[0].mealTypeSecondDaySign
          console.log('0',$scope.meal)
        }else{
          $scope.meal = mta[i].mealTypeName;
          sessionStorage['mealTypeName'] = $scope.meal;
          $scope.resvStartTime = mta[i].resvStartTime;
          sessionStorage['resvStartTime'] = $scope.resvStartTime;
          $scope.resvEndTime = mta[i].resvEndTime;
          sessionStorage['resvEndTime'] = $scope.resvEndTime;
          $scope.mealTypeId = mta[i].id;
          sessionStorage['mealTypeId'] = $scope.mealTypeId;
          $scope.isKuaTian = mta[i].mealTypeSecondDaySign
          console.log('1',$scope.meal)
        }
      } else if ((now < mealEnd) && (now >= mealStart)) {
        $scope.meal = mta[i].mealTypeName;
        sessionStorage['mealTypeName'] = $scope.meal;
        $scope.resvStartTime = mta[i].resvStartTime;
        sessionStorage['resvStartTime'] = $scope.resvStartTime;
        $scope.resvEndTime = mta[i].resvEndTime;
        sessionStorage['resvEndTime'] = $scope.resvEndTime;
        $scope.mealTypeId = mta[i].id;
        sessionStorage['mealTypeId'] = $scope.mealTypeId;
        $scope.isKuaTian = mta[i].mealTypeSecondDaySign
        console.log('2',$scope.meal)
        break;
      } else if(mta[i].mealTypeSecondDaySign == 1 && mta[i].resvStartTime>mta[i].resvEndTime && now < sessionStorage['lastMealEndTime']*1){
        var end = mta[i].resvEndTime.slice(0, 2) * 60 + mta[i].resvEndTime.slice(3) * 1 + 24*60
        if(now < sessionStorage['lastMealEndTime']*1){
          now = now + 24*60
        }
        if(now - end < 0){
          $scope.meal = mta[i].mealTypeName;
          sessionStorage['mealTypeName'] = $scope.meal;
          $scope.resvStartTime = mta[i].resvStartTime;
          sessionStorage['resvStartTime'] = $scope.resvStartTime;
          $scope.resvEndTime = mta[i].resvEndTime;
          sessionStorage['resvEndTime'] = $scope.resvEndTime;
          $scope.mealTypeId = mta[i].id;
          sessionStorage['mealTypeId'] = $scope.mealTypeId;
          $scope.isKuaTian = mta[i].mealTypeSecondDaySign
          console.log('3',$scope.meal)
          break;
        }
      } else if(mta[i].mealTypeSecondDaySign == 1 && mta[i].resvStartTime<mta[i].resvEndTime){
        if((now - (mta[i].resvEndTime.slice(0, 2) * 60 + mta[i].resvEndTime.slice(3) * 1)) < 0){
          $scope.meal = mta[i].mealTypeName;
          sessionStorage['mealTypeName'] = $scope.meal;
          $scope.resvStartTime = mta[i].resvStartTime;
          sessionStorage['resvStartTime'] = $scope.resvStartTime;
          $scope.resvEndTime = mta[i].resvEndTime;
          sessionStorage['resvEndTime'] = $scope.resvEndTime;
          $scope.mealTypeId = mta[i].id;
          sessionStorage['mealTypeId'] = $scope.mealTypeId;
          $scope.isKuaTian = mta[i].mealTypeSecondDaySign
          console.log('4',$scope.meal)
          break;
        }
      }
    }
    console.log(sessionStorage['mealTypeName']);
    sessionStorage['mealYTypeName'] = sessionStorage['mealTypeName'];
    $scope.dateTime = $scope.getMealDate().getTime();
    var time = $scope.getMealDate()
    $scope.date = {};
    $scope.date.year = time.getFullYear();
    $scope.date.month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    $scope.date.date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    $scope.date.day = time.getDay();
    $scope.dateString = $scope.date.year + '-' + $scope.date.month + '-' + $scope.date.date;
    $scope.date.months = time.getMonth() + 1 + "月";
    sessionStorage['dateString'] = $scope.dateString;
    console.log('当前餐别日期',$scope.dateString)
    $scope.showDate = time.getTime();
    switch ($scope.date.day) {
      case 1:
        $scope.date.day = '周一';
        break;
      case 2:
        $scope.date.day = '周二';
        break;
      case 3:
        $scope.date.day = '周三';
        break;
      case 4:
        $scope.date.day = '周四';
        break;
      case 5:
        $scope.date.day = '周五';
        break;
      case 6:
        $scope.date.day = '周六';
        break;
      case 0:
        $scope.date.day = '周日';
        break;
    }
    
    $scope.fcb($scope.freshTime());
    sessionStorage['isKuaTian'] = $scope.isKuaTian

    $scope.getCount()
    $scope.getMsgCount()
  };
  $scope.YareaSuccess = function (data) {
    sessionStorage['userList'] = JSON.stringify(data.appUserList);
    sessionStorage['YresvOrderTypes'] = JSON.stringify(data.resvOrderTypes);

    console.log(data.mealTypes);
    var mty = data.mealTypes;
    mty.sort(function (a, b) {
      return (a.resvEndTime.slice(0, 2) * 60 + a.resvEndTime.slice(3) * 1) - (b.resvEndTime.slice(0, 2) * 60 + b.resvEndTime.slice(3) * 1)
    });
    console.log(mty);
    sessionStorage['mealYTypes'] = JSON.stringify(mty);
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var now = 60 * hour + min;
    for (var i = 0; i < mty.length; i++) {
      if (i == mty.length - 1) {
        sessionStorage['mealYTypeId'] = mty[i].id;
        sessionStorage['mealYTypeName'] = mty[i].mealTypeName
      } else if ((now - (mty[i].resvEndTime.slice(0, 2) * 60 + mty[i].resvEndTime.slice(3) * 1)) < 0) {
        sessionStorage['mealYTypeId'] = mty[i].id;
        sessionStorage['mealYTypeName'] = mty[i].mealTypeName
        break;
      }
    }
  };
  $scope.goBook = function () {
    $httpPsd.getUser(localStorage['TOKEN_KEY'], function(data){
      localStorage.setItem('info', JSON.stringify(data));
      $scope.info = $scope.info = JSON.parse(localStorage['info']);
      if ($scope.info.appModuleSet) {
        if ($scope.info.appModuleSet.indexOf(5) != -1) {
          $scope.yuding = true;
        } else {
          $scope.yuding = false;
        }
      }else{
        $scope.yuding = false;
      }
      if ($scope.yuding) {
        $scope.index = 0;
        sessionStorage.removeItem('bookParams')
        console.log($scope.mealTypeId,$scope.resvStartTime,$scope.resvEndTime,$scope.meal,$scope.mealTypeIdA,$scope.mealTypeIdB,$scope.dateString,$scope.showDate)
        $state.go('book', {
          'type': 1,
          'mealTypeId': $scope.mealTypeId,
          'resvStartTime': $scope.resvStartTime,
          'resvEndTime': $scope.resvEndTime,
          'mealTypeName': $scope.meal,
          'mealTypeIdA': $scope.mealTypeIdA,
          'mealTypeIdB': $scope.mealTypeIdB,
          'isKuaTian': $scope.isKuaTian,
          'dateString': $scope.dateString,
          'showDate': $scope.showDate
        })
      } else {
        $showAlert.alert('您暂未开通此服务');
      }
    })
  };
  $scope.goMyClue = function () {
    if ($scope.yanhui&&$scope.meetingStatus) {
      $state.go("myClue");
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  };
  $scope.goMeetingOrder = function (resvStatus) {
    if ($scope.yanhui&&$scope.meetingStatus) {
      $state.go("myOrder-yDetail-order", {'resvStatus': resvStatus, 'resvDate': $scope.showDate});
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  };
  $scope.goClueNew = function () {
    if ($scope.yanhui&&$scope.meetingStatus) {
      $state.go("clueNew");
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  };
  $scope.goCustom = function () {
    if ($scope.kehu) {
      $state.go("myCustom");
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  };
  $scope.goOrder = function () {
    if ($scope.dingdan) {
      $state.go("myOrder", {'type': 1});
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  };
  $scope.goYanhui = function () {
    if ($scope.yanhui&&$scope.meetingStatus) {
      sessionStorage.removeItem('ybookParams')
      $state.go('Ybook', {
        'type': 1,
        'mealTypeId': $scope.mealTypeId,
        'resvStartTime': $scope.resvStartTime,
        'resvEndTime': $scope.resvEndTime,
        'mealTypeName': sessionStorage['mealYTypeName']
      })
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  };
  //退订原因
  $scope.getReasonSuccess = function (data) {
    console.log('退订原因');
    console.log(data);
    sessionStorage['unOrderReason'] = JSON.stringify(data);
  };

  $scope.showSlider = function(e){
    var num = e.target.getAttribute('data-id');
    if($scope.info.businessType == 0 || $scope.info.businessType == 2){
      $('.tab-nav.tabs').hide()
      if(num==1){
        $scope.showSlider1 = true;
        $scope.showSlider2 = false;
        $scope.showSlider3 = false;
      }else if(num==2){
        $scope.showSlider1 = false;
        $scope.showSlider2 = true;
        $scope.showSlider3 = false;
      }else{
        $scope.showSlider1 = false;
        $scope.showSlider2 = false;
        $scope.showSlider3 = true;
      }
    }
  }
  $scope.hideSlider = function(){
    $scope.showSlider1 = false;
    $scope.showSlider2 = false;
    $scope.showSlider3 = false;
    $('.tab-nav.tabs').removeAttr('style')
  }
  $scope.goForm = function(e){
    if($scope.showSlider1){
      // $state.go('tab.dash-formdd');
      $state.go('tab.dash-formEnroll');
    }else if($scope.showSlider2){
      $state.go('tab.dash-contact-he', { type: 2 });
    }else if($scope.showSlider3){
      $state.go('tab.dash-formJixian');
    }
  }
  $scope.goTuan = function() {
    if ($scope.info.isGroupMeal==1) {
      sessionStorage.removeItem('tuanParams')
      $state.go("myOrderTuan");
    } else {
      $showAlert.alert('您暂未开通此服务');
    }
  }
  $scope.goAnxinList = ()=>{
    console.log("goAnxinList")
    $state.go("anxinList")
  }
  // $scope.sendEmail = function($event){
  //   $event.stopPropagation();
  //   $hezuo.guanggao({
  //     customerName: $scope.info.surname,
  //     phone: $scope.info.username,
  //     departmentName: $scope.info.businessName,
  //     post: $scope.info.appTypeName
  //   }, function(data){
  //     if(data.msgCode==0){
  //       $showAlert.alert('感谢您的咨询，极鲜网顾问会第一时间跟您联系');
  //       $scope.hideSlider()
  //     }else{
  //       $showAlert.alert(data.msg);
  //     }
  //   }, function(err){
  //     $showAlert.alert('提交失败');
  //   })
  // }
})
