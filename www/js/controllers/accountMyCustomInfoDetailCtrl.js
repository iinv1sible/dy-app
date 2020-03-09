angular.module('starter.controllers.accountMyCustomInfoDetailCtrl', []).controller('AccountMyCustomInfoDetailCtrl', function ($scope, $calendar, $state, $stateParams, $ionicLoading, $http, $httpPsd, $httpCustom, $httpOrder, $ionicPopup, $showAlert, $log, $qupload, $ionicPopover, ionicDatePicker, $nongli, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.save = false;
    $scope.lock = true;
    $scope.data = {};
    $scope.vipId = $stateParams.vipId;
    $scope.data.id = $scope.vipId;
    console.log($scope.vipId);
    $scope.imgSrc = "images/icon_avatar@3x.png";
    $scope.info = JSON.parse(localStorage['info']);
    $scope.takePicData = {'scope': 'peicai'};
    $scope.showEdit = false
    $scope.getYealList();
    $scope.getMonthList()
    $httpPsd.takePic($scope.takePicData, $scope.takePicSuccess, $scope.error);
    $httpCustom.customInfo($scope.vipId, $scope.customInfoSuccess, $scope.error);

    $scope.countryCodeList = sessionStorage['countryList'] ? JSON.parse(sessionStorage['countryList']) : []
    $scope.data.countryCode = '86'
    $scope.countryName = '中国'
    if ($scope.countryCodeList && $scope.countryCodeList.length > 0){
      $scope.countryCodeList.map(function(item){
        if (item.countryCode == '86') {
          $scope.countryName = item.countryName
        }
      })
    }
    var popCountry = `<ion-popover-view style="width:150px;max-height:215px">
      <ion-content style="background-color: transparent;">
        <div class="list">
          <a class="item text-center" style="border-top:0" ng-repeat="item in countryCodeList" ng-click="changeCountry($event)" data-id={{item.countryCode}}>{{item.countryName|T}}</a>
        </div>
      </ion-content>
    </ion-popover-view>`;
    $scope.countryPop = $ionicPopover.fromTemplate(popCountry, {
      scope: $scope
    });
    $scope.openPopoverCountry = function ($event) {
      $scope.countryPop.show($event);
    };
    $scope.closePopoverCountry = function () {
      $scope.countryPop.hide();
    };
    $scope.changeCountry = function($event){
      var a = $event.target;
      $scope.data.countryCode = a.getAttribute("data-id");
      $scope.countryName = $(a).text()
      $scope.closePopoverCountry()
    }

    var sexTemp = `<ion-popover-view class="right-popover" style="width:150px;height:106px">
        <ion-content style="background-color: transparent;">
          <div class="list">
            <a class="item text-center" ng-click="changeGender($event)" data-id="男士">{{'男士'|T}}</a>
            <a class="item text-center" ng-click="changeGender($event)" data-id="女士">{{'女士'|T}}</a>
          </div>
        </ion-content>
      </ion-popover-view>`;
    $scope.sexPop = $ionicPopover.fromTemplate(sexTemp, {
      scope: $scope
    });
    $scope.openPopoverSex = function ($event) {
      $scope.sexPop.show($event);
    };
    $scope.closePopoverSex = function () {
      $scope.sexPop.hide();
    };

    var calTemp = `<ion-popover-view class="right-popover" style="width:150px;height:106px">
        <ion-content style="background-color: transparent;">
          <div class="list">
            <a class="item text-center" ng-click="changeNong(1)">{{'公历'|T}}</a>
            <a class="item text-center" ng-click="changeNong(2)">{{'农历'|T}}</a>
          </div>
        </ion-content>
      </ion-popover-view>`;
    $scope.calPop = $ionicPopover.fromTemplate(calTemp, {
      scope: $scope
    });
    $scope.openPopoverCal = function ($event) {
      $scope.calPop.show($event);
    };
    $scope.closePopoverCal = function () {
      $scope.calPop.hide();
    };
  });
  $scope.todayTime = new Date();
  $scope.calender = false;
  $scope.dateList = [];
  $scope.weekList = ['日', '一', '二', '三', '四', '五', '六'];
  $scope.dateYear = $scope.todayTime.getFullYear();
  $scope.getYealList = function () {
    $scope.yearsList = [];
    for (i = 0; i <= 100; i++) {
      $scope.yearsList.push($scope.dateYear - i);
    }
  }
  $scope.getMonthList = function () {
    $scope.monthsList = [];
    for (i = 1; i <= 12; i++) {
      $scope.monthsList.push(i);
    }
  }
  $scope.dateMonth = $scope.todayTime.getMonth()+1;
  $scope.showCalender = function () {
    $scope.calender = true;
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
  };
  var freshTime = function () {
    var date = new Date($scope.showDate);
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
  $scope.hideCalender = function ($event) {
    var id = $event.target.getAttribute('data-id');
    $scope.dateList[id].color = 'red';
    if ($event.target.getAttribute('data-date') != '') {
      $scope.calender = false;
      //var txt=$scope.dateYear+','+($scope.dateMonth)+','+$event.target.getAttribute('data-date');
      var date = new Date($scope.dateYear * 1, ($scope.dateMonth-1) * 1, ($event.target.getAttribute('data-date') * 1)).getTime() * 1 + 1;
      var oldTime = $scope.data.vipBirthday;
      $scope.showDate = date;
      $scope.data.vipBirthday = freshTime();
      $scope.igYearNong();
    }
  };
  $scope.addYear = function () {
    $scope.dateYear += 1;
    $scope.yearsList.unshift($scope.dateYear);
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
  };
  $scope.yearChanged = function () {
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
  }
  $scope.minusYear = function () {
    // if(($scope.dateYear==new Date().getFullYear()) || (($scope.dateYear==new Date().getFullYear()+1) && $scope.dateMonth-1<new Date().getMonth())){
    //   console.log('不能减小了');
    // }else{
    $scope.dateYear -= 1;
    // $scope.getYealList();
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
    // }
  };
  $scope.monthChanged = function () {
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
  }
  $scope.addMonth = function () {
    if ($scope.dateMonth == 12) {
      $scope.dateMonth = 1;
      $scope.dateYear += 1;
    } else {
      $scope.dateMonth += 1;
    }
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
  };
  $scope.minusMonth = function () {
    // if(($scope.dateYear==$scope.todayTime.getFullYear()) && ($scope.dateMonth-1==$scope.todayTime.getMonth())){
    //   console.log('不能减小了');
    // }else{
    if ($scope.dateMonth == 1) {
      $scope.dateMonth = 12;
      $scope.dateYear -= 1;
    } else {
      $scope.dateMonth -= 1;
    }
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
    // }
  };
  $scope.dateCancel = function () {
    $scope.calender = false;
  };
  $scope.dateToday = function () {
    $scope.calender = false;
    $scope.dateYear = new Date().getFullYear();
    $scope.dateMonth = new Date().getMonth()+1;
    //$scope.dateList=$calendar.drawCld($scope.dateYear,$scope.dateMonth-1);
    var oldTime = $scope.data.vipBirthday;
    $scope.showDate = new Date().getTime();
    $scope.data.vipBirthday = freshTime();
    // var a = new Date($scope.showDate);
    // var y = a.getFullYear();
    // var m = a.getMonth() + 1;
    // var d = a.getDate();
    // $scope.data.vipBirthdayNl = $nongli.toLunar(y, m, d).toString();
    $scope.igYearNong();
  };
  $scope.igYearNong = function(){
    if($scope.data.vipBirthday != ''){
      if($scope.showDate == undefined){
        $scope.showDate = new Date($scope.data.vipBirthday);
      }
      var a = new Date($scope.showDate);
      var y = a.getFullYear();
      var m = a.getMonth() + 1;
      var d = a.getDate();
      $scope.data.vipBirthdayNl = $nongli.toLunar(y, m, d).toString();
      if($scope.data.hideBirthdayYear == 1 && $scope.data.birthFlag == 0){
        $scope.data.vipBirthday1 = $scope.data.vipBirthday.substr(5,$scope.data.vipBirthday.length-5);
      }else if($scope.data.hideBirthdayYear == 1 && $scope.data.birthFlag == 1){
        $scope.data.vipBirthday1 = $scope.data.vipBirthdayNl.substr(5,$scope.data.vipBirthdayNl.length-1);
      }else if($scope.data.hideBirthdayYear == 0 && $scope.data.birthFlag == 1){
        $scope.data.vipBirthday1 = $scope.data.vipBirthdayNl;
      }else if($scope.data.hideBirthdayYear == 0 && $scope.data.birthFlag == 0){
        $scope.data.vipBirthday1 = $scope.data.vipBirthday;
      }
    }
  };
  $scope.changeNong = function (num) {
    if (num == 1) {
      $scope.data.birthFlag = 0;
      $scope.igYearNong();
    } else {
      $scope.data.birthFlag = 1;
      $scope.igYearNong();
    }
    $scope.closePopoverCal()
  };
  $scope.changeYear = function () {
    if ($scope.data.hideBirthdayYear == 0) {
      $scope.data.hideBirthdayYear = 1;
      $scope.igYearNong();
    } else {
      $scope.data.hideBirthdayYear = 0;
      $scope.igYearNong();
    }
  };
  $scope.left = function () {
    $scope.seatData.page = 1;
    var oldTime = $scope.data.vipBirthday;
    $scope.showDate += 86400000;
    $scope.data.vipBirthday = freshTime();
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.takePicSuccess = function (data) {
    $scope.uploadToken = data.uploadToken;
  };
  $scope.customInfoSuccess = function (data) {
    if ($scope.info.id === data.appUserId || $scope.info.operationType === '1') {
      $scope.showEdit = true
    }
    if (data.hobby == null) {
      data.hobby = '';
    }
    if (data.detest == null) {
      data.detest = '';
    }
    if (data.tag == null) {
      data.tag = '';
    }
    $scope.customInfo = {};
    for (var key in data) {
      $scope.customInfo[key] = data[key];
    }
    $scope.customInfo.hobby = data.hobby.split(',');
    $scope.hobby = data.hobby;
    console.log($scope.hobby);
    $scope.customInfo.detest = data.detest.split(',');
    $scope.detest = data.detest;
    $scope.customInfo.tag = data.tag.split(',');
    $scope.tag = data.tag;
    if (data.imageUrl != '') {
      $scope.imgSrc = data.imageUrl;
    }
    // data.vipPhone = data.vipPhone * 1;
    if (!data.countryCode) {
      data.countryCode = '86'
    }
    console.log(data.countryCode)
    $scope.data = data;
    if ($scope.countryCodeList && $scope.countryCodeList.length > 0){
      $scope.countryCodeList.map(function(item){
        if (item.countryCode == data.countryCode) {
          $scope.countryName = item.countryName
        }
      })
    }
    $scope.data.vipBirthday1 = $scope.data.vipBirthday;
    if($scope.data.vipBirthday == ''){
      $scope.data.vipBirthday1 = $T.T('请选择日期');
    }
    if($scope.data.hideBirthdayYear == 1 && $scope.data.birthFlag == 0){
      $scope.data.vipBirthday1 = $scope.data.vipBirthday1.substr(5,$scope.data.vipBirthday1.length-5);
    }else if($scope.data.hideBirthdayYear == 1 && $scope.data.birthFlag == 1){
      $scope.data.vipBirthday1 = $scope.data.vipBirthdayNl.substr(5,$scope.data.vipBirthdayNl.length-1);
    }else if($scope.data.hideBirthdayYear == 0 && $scope.data.birthFlag == 1){
      $scope.data.vipBirthday1 = $scope.data.vipBirthdayNl;
    }else if($scope.data.hideBirthdayYear == 0 && $scope.data.birthFlag == 0){
      $scope.data.vipBirthday1 = $scope.data.vipBirthday1;
    }else{
      $scope.data.hideBirthdayYear = $scope.data.hideBirthdayYear?$scope.data.hideBirthdayYear:0
      $scope.data.birthFlag = $scope.data.birthFlag?$scope.data.birthFlag:0
      $scope.data.vipBirthday1 = $scope.data.vipBirthday1;
    }
    $scope.data.id = $scope.vipId;
    $scope.igYearNong();
  };
  $scope.selectFiles = [];
  var start = function (index) {
    $scope.selectFiles[index].progress = {
      p: 0
    };
    $scope.selectFiles[index].upload = $qupload.upload({
      key: '',
      file: $scope.selectFiles[index].file,
      token: $scope.uploadToken
    });
    $scope.selectFiles[index].upload.then(function (response) {
      $log.info(response);
      $scope.imgSrc = 'http://qiniu.zhidianfan.com/' + response.hash + '?imageView2/1/w/100/h/100/format/jpg/q/75|imageslim';
      $scope.changePicData = {
        "imageUrl": $scope.imgSrc,
        "vipId": $scope.vipId
      };
      $httpOrder.changeVipPic($scope.changePicData, $scope.changePicSuccess, $scope.error);
    }, function (response) {
      $log.info(response);
    }, function (evt) {
      $scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.abort = function (index) {
    $scope.selectFiles[index].upload.abort();
    $scope.selectFiles.splice(index, 1);
  };

  $scope.onFileSelect = function ($files) {
    var offsetx = $scope.selectFiles.length;
    for (var i = 0; i < $files.length; i++) {
      $scope.selectFiles[i + offsetx] = {
        file: $files[i]
      };
      $scope.showLoading();
      start(i + offsetx);
    }
  };
  $scope.changePicSuccess = function (data) {
    $ionicLoading.hide();
    $showAlert.alert(data.msgMessage);
  };
  $scope.error = function (data) {
    $ionicLoading.hide();
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
  $scope.newIpObj = function () {
    var ipObj1 = {
      callback: function (date) {  //Mandatory
        console.log(date);
        var a = new Date(date);
        var y = a.getFullYear();
        var m = a.getMonth() + 1;
        var d = a.getDate();
        $scope.data.vipBirthdayNl = $nongli.toLunar(y, m, d).toString();
        if (m < 10) {
          m = '0' + m
        }
        ;
        if (d < 10) {
          d = '0' + d
        }
        ;
        $scope.data.vipBirthday = y + '-' + m + '-' + d;
      },
      from: new Date(1900, 1, 1), //Optional,
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: true,       //Optional
      templateType: 'popup',       //Optional
      dateFormat: 'yyyy-MM-dd'
    };
    return ipObj1;
  };
  $scope.openDatePicker = function () {
    var timePicker = $scope.newIpObj();
    ionicDatePicker.openDatePicker(timePicker);
  };
  $scope.revise = function () {
    $scope.save = true;
    $scope.lock = false;
  };
  $scope.saveAll = function (notShowTip) {
    $scope.save = false;
    $scope.lock = true;
    $scope.data.hobby = $scope.data.hobby.toString();
    $scope.data.detest = $scope.data.detest.toString();
    if ($scope.data.vipName == '' || $scope.data.vipName == null) {
      $showAlert.alert('客户姓名不能为空');
      return;
    }
    if($scope.data.vipBirthdayNl.indexOf('闰') > 0 && $scope.data.birthFlag == 1){
      $scope.data.isLeap = 1;
    }else {
      $scope.data.isLeap = 0;
    }
    if (notShowTip) {
      $httpCustom.updateCustom($scope.data, function () {}, function () {});
    } else {
      $httpCustom.updateCustom($scope.data, $scope.updateCustomSuccess, $scope.error);
    }
  };
  $scope.updateCustomSuccess = function (data) {
    $showAlert.alert(data.msgMessage)
  };
  $scope.changeGender = function ($event) {
    $scope.data.vipSex = $event.target.getAttribute("data-id")[0];
    $scope.closePopoverSex()
  };
  $scope.goHobby = function () {
    $scope.saveAll(true)
    $state.go('myCustom-hobby', {'hobby': $scope.hobby, 'vipId': $scope.vipId});
  };
  $scope.goTag = function () {
    $scope.saveAll(true)
    $state.go('myCustom-tag', {'tag': $scope.tag, 'vipId': $scope.vipId});
  };
  $scope.goDay = function () {
    $scope.saveAll(true)
    $state.go('myCustom-day', {'vipId': $scope.vipId, 'showEdit': $scope.showEdit});
  };
  $scope.goDetest = function () {
    $scope.saveAll(true)
    $state.go('myCustom-detest', {'detest': $scope.detest, 'vipId': $scope.vipId});
  };
})
