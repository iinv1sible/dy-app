angular.module('starter.controllers.accountMyCustomInfoDayCtrl', []).controller('AccountMyCustomInfoDayCtrl', function ($scope, $state, $nongli, $calendar, $stateParams, $http, $httpCustom, $ionicPopover, ionicDatePicker, $showAlert,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.isAdd = false;
    $scope.typeId = null;
    $scope.name = '请选择';
    $scope.type = '请选择';
    $scope.date = '选择日期';
    $scope.nong = 0;
    $scope.date1 = $scope.date;
    $scope.igYear = 0;
    $scope.vipId = $stateParams.vipId;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.dayList = [];
    $scope.showEdit = $stateParams.showEdit
    $scope.getDay();
    $scope.getYealList();
    $scope.getMonthList()
  });
  $scope.addNew = function () {
    $scope.isAdd = true;
    $scope.date = '选择日期';
    $scope.nong = 0;
    $scope.date1 = $scope.date;
    $scope.igYear = 0;
  };
  $scope.closeAdd = function(){
    $scope.date = '选择日期';
    $scope.name = '请选择';
    $scope.type = '请选择';
    $scope.nong = 0;
    $scope.date1 = $scope.date;
    $scope.igYear = 0;
    $scope.isAdd = false;
  };
  $scope.todayTime = new Date();
  $scope.calender = false;
  $scope.dateList = [];
  $scope.weekList = ['日', '一', '二', '三', '四', '五', '六'];
  $scope.dateYear = $scope.todayTime.getFullYear();
  $scope.dateMonth = $scope.todayTime.getMonth()+1;
  $scope.showCalender = function () {
    $scope.calender = true;
    $scope.dateList = $calendar.drawCldNew($scope.dateYear, $scope.dateMonth-1);
  };
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
      var oldTime = $scope.date;
      $scope.showDate = date;
      $scope.date = freshTime();
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
    var oldTime = $scope.date;
    $scope.showDate = new Date().getTime();
    $scope.date = freshTime();
    $scope.igYearNong();
  };
  $scope.left = function () {
    console.log('left');
    $scope.seatData.page = 1;
    ;
    var oldTime = $scope.date;
    $scope.showDate += 86400000;
    $scope.date = freshTime();
  };
  $scope.dayObj = [
    {'name': '本人'},
    {'name': '丈夫'},
    {'name': '妻子'},
    {'name': '儿子'},
    {'name': '女儿'},
    {'name': '父亲'},
    {'name': '母亲'},
    {'name': '公公'},
    {'name': '婆婆'},
    {'name': '岳父'},
    {'name': '岳母'},
    {'name': '爷爷'},
    {'name': '奶奶'},
    {'name': '外公'},
    {'name': '外婆'},
    {'name': '孙子'},
    {'name': '孙女'},
    {'name': '外孙子'},
    {'name': '外孙女'},
    {'name': '亲戚'},
    {'name': '朋友'},
    {'name': '同事'},
    {'name': '老师'},
    {'name': '同学'},
    {'name': '领导'}
  ];
  $scope.dayType = [
    {'name': '生日', 'id': 1},
    {'name': '过寿', 'id': 4},
    {'name': '求婚日', 'id': 5},
    {'name': '订婚日', 'id': 6},
    {'name': '结婚日', 'id': 7},
    {'name': '周年庆', 'id': 8}
  ];
  var obj = `<ion-popover-view style="max-height:265px;width:120px;">
                   <ion-content style="background-color: transparent;">
                     <div class="list">
                       <a class="item text-center" ng-repeat="obj in dayObj" ng-click="chooseObj(obj.name)">{{obj.name|T}}</a>
                     </div>
                   </ion-content>
                 </ion-popover-view>`;
  var type = `<ion-popover-view style="max-height:265px;width:120px;">
                     <ion-content style="background-color: transparent;">
                       <div class="list">
                         <a class="item text-center" ng-repeat="type in dayType" ng-click="chooseType(type.id,type.name)">{{type.name|T}}</a>
                       </div>
                     </ion-content>
                   </ion-popover-view>`;
  $scope.popoverObj = $ionicPopover.fromTemplate(obj, {
    scope: $scope
  });
  $scope.popoverType = $ionicPopover.fromTemplate(type, {
    scope: $scope
  });
  $scope.openPopover = function ($event, num) {
    if (num == 1) {
      $scope.popoverObj.show($event);
    } else if (num == 2) {
      $scope.popoverType.show($event);
    }
  };
  $scope.closePopover = function (num) {
    if (num == 1) {
      $scope.popoverObj.hide();
    } else if (num == 2) {
      $scope.popoverType.hide();
    }
  };
  $scope.chooseObj = function (name) {
    $scope.name = name;
    if(name == '本人'){
      $scope.dayType = [
        {'name': '过寿', 'id': 4},
        {'name': '求婚日', 'id': 5},
        {'name': '订婚日', 'id': 6},
        {'name': '结婚日', 'id': 7},
        {'name': '周年庆', 'id': 8}
      ];
    }else{
      $scope.dayType = [
        {'name': '生日', 'id': 1},
        {'name': '过寿', 'id': 4},
        {'name': '求婚日', 'id': 5},
        {'name': '订婚日', 'id': 6},
        {'name': '结婚日', 'id': 7},
        {'name': '周年庆', 'id': 8}
      ];
    }
    $scope.closePopover(1);
  };
  $scope.chooseType = function (id, name) {
    $scope.type = name;
    if(name == '本人'){
      $scope.dayType = [
        {'name': '过寿', 'id': 4},
        {'name': '求婚日', 'id': 5},
        {'name': '订婚日', 'id': 6},
        {'name': '结婚日', 'id': 7},
        {'name': '周年庆', 'id': 8}
      ];
    }else{
      $scope.dayType = [
        {'name': '生日', 'id': 1},
        {'name': '过寿', 'id': 4},
        {'name': '求婚日', 'id': 5},
        {'name': '订婚日', 'id': 6},
        {'name': '结婚日', 'id': 7},
        {'name': '周年庆', 'id': 8}
      ];
    }
    $scope.typeId = id;
    $scope.closePopover(2);
  };
  $scope.newIpObj = function () {
    var ipObj1 = {
      callback: function (date) {  //Mandatory
        console.log(date);
        var a = new Date(date);
        var y = a.getFullYear();
        var m = a.getMonth() + 1;
        var d = a.getDate();
        if (m < 10) {
          m = '0' + m
        }
        ;
        if (d < 10) {
          d = '0' + d
        }
        ;
        $scope.date = y + '-' + m + '-' + d;
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
  $scope.changeNong = function (num) {
    if (num == 1) {
      $scope.nong = 0;
      $scope.igYearNong();
    } else {
      $scope.nong = 1;
      $scope.igYearNong();
    }
  };
  $scope.changeYear = function () {
    if ($scope.igYear == 0) {
      $scope.igYear = 1;
      $scope.igYearNong();
    } else {
      $scope.igYear = 0;
      $scope.igYearNong();
    }
  };
  $scope.igYearNong = function(){
    if($scope.date != '选择日期'){
      console.log($scope.date)
      var a = new Date($scope.showDate);
      var y = a.getFullYear();
      var m = a.getMonth() + 1;
      var d = a.getDate();
      $scope.nlDate = $nongli.toLunar(y, m, d).toString();
      if($scope.igYear == 1 && $scope.nong == 0){
        $scope.date1 = $scope.date.substr(5,$scope.date.length-5);
      }else if($scope.igYear == 1 && $scope.nong == 1){
        $scope.date1 = $scope.nlDate.substr(5,$scope.nlDate.length-1);
      }else if($scope.igYear == 0 && $scope.nong == 1){
        $scope.date1 = $scope.nlDate;
      }else if($scope.igYear == 0 && $scope.nong == 0){
        $scope.date1 = $scope.date;
      }
    }
  }
  $scope.addNewDay = function () {
    if (($scope.name != '请选择') && ($scope.type != '请选择') && ($scope.date != '选择日期')) {
      if($scope.date1.indexOf('闰') > 0){
        $scope.isLeap = 1;
      }else {
        $scope.isLeap = 0;
      }
      var data = {
        'vipId': $scope.vipId,
        'anniversaryObj': $scope.name,
        'calendarType': $scope.nong,
        'businessId': $scope.info.businessId,
        'anniversaryType': $scope.typeId,
        'anniversaryDate': $scope.date,
        'anniversaryYearFlag':$scope.igYear,
        'isLeap':$scope.isLeap
      };
      $httpCustom.customAddDay(data, $scope.addDaySuccess, $scope.error);
    } else {
      $showAlert.alert('请将纪念日信息填写完整');
    }
  };
  $scope.addDaySuccess = function (data) {
    console.log(data);
    $scope.name = '请选择';
    $scope.type = '请选择';
    $scope.date = '选择日期';
    $scope.isAdd = false;
    $scope.typeId = null;
    $showAlert.alert(data.msgMessage);
    $scope.getDay();
  };
  $scope.getDay = function () {
    var data = {
      'vipId': $scope.vipId,
      'businessId': $scope.info.businessId
    };
    $httpCustom.customGetDay(data, $scope.getDaySuccess, $scope.error);
  };
  $scope.getDaySuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
      switch (data[i].anniversaryType * 1) {
        case 1:
          data[i].anniversaryName = '生日';
          break;
        case 4:
          data[i].anniversaryName = '过寿';
          break;
        case 5:
          data[i].anniversaryName = '求婚日';
          break;
        case 6:
          data[i].anniversaryName = '订婚日';
          break;
        case 7:
          data[i].anniversaryName = '结婚日';
          break;
        case 8:
          data[i].anniversaryName = '周年庆';
          break;
        default:
          data[i].anniversaryName = '其他';
      }
      var a = new Date(data[i].anniversaryDate);
      var y = a.getFullYear();
      var m = a.getMonth() + 1;
      var d = a.getDate();
      if (m < 10) {
        m = '0' + m
      }
      ;
      if (d < 10) {
        d = '0' + d
      }
      ;
      data[i].anniversaryTime = y + '-' + m + '-' + d;
      $scope.nlDate = $nongli.toLunar(y, m, d).toString();
      if(data[i].anniversaryYearFlag == 1 && data[i].calendarType == 0){
        data[i].anniversaryTime = data[i].anniversaryTime.substr(5,data[i].anniversaryTime.length-5);
      }else if(data[i].anniversaryYearFlag == 1 && data[i].calendarType == 1){
        data[i].anniversaryTime = $scope.nlDate.substr(5,$scope.nlDate.length-1);
      }else if(data[i].anniversaryYearFlag == 0 && data[i].calendarType == 1){
        data[i].anniversaryTime = $scope.nlDate;
      }else if(data[i].anniversaryYearFlag == 0 && data[i].calendarType == 0){
        data[i].anniversaryTime = data[i].anniversaryTime;
      }
    }
    console.log(data);
    $scope.dayList = data;
  };
  $scope.deleteDay = function (id) {
    $httpCustom.customDeleteDay(id, $scope.deleteSuccess, $scope.error)
  };
  $scope.deleteSuccess = function (data) {
    $showAlert.alert(data.msgMessage);
    $scope.getDay();
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
})
