angular.module('starter.controllers.accountMyOrderYDetailLockListCtrl', []).controller('AccountMyOrderYDetailLockListCtrl', function ($scope, $httpLock, $httpPsd, $stateParams, $showAlert, $ionicLoading, $ionicHistory, $calendar, $ionicPopup, $T, $ionicPopover, $ionicScrollDelegate) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.resvOrder = $stateParams.resvOrder
    $scope.mealTypeName = $stateParams.mealTypeName
    $scope.tableAreas = []
    $scope.tableList = []
    $scope.checkedTables = []
    $scope.searchInput = ''
    $scope.isSearch = false
    $scope.hideArea = []
    $scope.isShowDetail = false
    $scope.mealTypes = []
    $scope.mealYTypes = JSON.parse(sessionStorage['mealYTypes'])
    $scope.mealYTypeId = $stateParams.mealTypeId
    $scope.data = {
      id: $scope.info.id,
      businessId: $scope.info.businessId,
      resvDate: $stateParams.resvDate,
      mealTypeId: '',
      isChangeTable: $scope.info.isChangeTable,
      tTypes: '',
      minPeopleNum: '',
      maxPeopleNum: '',
      minAmount: '',
      maxAmount: '',
      mealTypeIdA: '',
      mealTypeIdB: '',
      peicai: '',
      tableAreaId: '',
      status: '',
      confirm: '',
      kbc: $scope.info.kbc * 1,
      fcb: $scope.info.fcb * 1,
      page: 1,
      rows: 60,
      sofa: '',
      television: '',
      washroom:''
    }
    $scope.todayTime = $scope.getMealDate();
    $scope.fencb($stateParams.resvDate)
    $scope.calender = false;
    $scope.dateList = [];
    $scope.weekList = ['日', '一', '二', '三', '四', '五', '六'];
    $scope.dateYear = $scope.todayTime.getFullYear();
    $scope.dateMonth = $scope.todayTime.getMonth();
    $scope.canLoad = true;
    $httpPsd.getArea($scope.info, function(data) {
      $scope.tableAreas = data.tableAreas
      $scope.getAllTable($scope.data)
    })
    $scope.relatedTableList = []
    var params = JSON.parse(JSON.stringify($scope.data))
    params.relatedTable = $stateParams.tableId
    $httpPsd.getSeat(params, function (data) {
      $scope.relatedTableList = data.tables
    })
  })
  $scope.getAllTable = function(data){
    $httpPsd.getSeat(data, function (res) {
      $scope.canLoad = res.isHasNextPage;
      $scope.$broadcast('scroll.infiniteScrollComplete');
      var tableArr = []
      for(var i = 0 ; i < $scope.tableAreas.length; i++) {
        var areaTables = res.tables.filter(function(item) { return item.tableAreaId == $scope.tableAreas[i].id })
        tableArr.push({
          tableAreaName: $scope.tableAreas[i].tableAreaName,
          tableAreaId: $scope.tableAreas[i].id,
          tables: areaTables
        })
      }
      $scope.tableList = $scope.tableList.concat(tableArr)
    }, function(err){
      if (err && err.msgMessage) {
        $scope.tableList = []
      } else if (status == 401) {
        localStorage.removeItem('TOKEN_KEY')
        $state.go('login')
      } else {
        $showAlert.alert('连接失败，请检查网络')
      }
      $ionicLoading.hide()
    })
  }
  $scope.doInfinite = function () {
    $scope.data.page++
    $scope.getAllTable($scope.data);
  };
  $scope.cancelSearch = function(){
    $scope.isShowDetail = false
    $scope.isSearch = false
    $scope.data.page = 1
    $scope.tableList = []
    $scope.searchInput = $scope.data.tableName = ''
    $scope.getAllTable($scope.data)
  }
  $scope.search = function() {
    $scope.isShowDetail = false
    $scope.data.page = 1
    $scope.tableList = []
    $scope.data.tableName = $scope.searchInput
    $scope.getAllTable($scope.data)
  }
  $scope.lockAll = function() {
    var bookNum = $scope.relatedTableList.filter(function(item){ return item.status == 1 || item.status == 2 }).length
    var lockNum = $scope.relatedTableList.filter(function(item){ return item.status == 5 }).length
    $ionicPopup.show({
      cssClass: "er-popup",
      template: `<div>提示：</div>
                  <div style="font-weight:bold">{{data.resvDate}}，{{mealTypeName}}</div>
                  <div>该厅有 ${$scope.relatedTableList.length} 桌关联散台</div>
                  <div>其中 ${bookNum} 桌已预订，${lockNum} 桌已锁台</div>
                  <div>是否选择剩余 ${$scope.relatedTableList.length - bookNum - lockNum} 桌</div>`,
      title: $T.T('关联散台'),
      scope: $scope,
      buttons: [
        { text: $T.T('取消') },
        { text: $T.T('确定'), 
          type: 'button-assertive',
          onTap: function () {
            var tableEmpty = $scope.relatedTableList.filter(function(item){ return item.status == 0 })
            for(var i = 0; i < tableEmpty.length; i++) {
              $scope.choose(tableEmpty[i], true)
            }
          }
        }
      ]
    })
  }
  $scope.error = function (data, status) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else if (status == 401) {
      localStorage.removeItem('TOKEN_KEY')
      $state.go('login')
    } else {
      $showAlert.alert('连接失败，请检查网络')
    }
    $ionicLoading.hide()
  }
  $scope.exchangeShow = function (area) {
    var index = $scope.hideArea.findIndex(function(item){
      return item.tableAreaId == area.tableAreaId
    })
    if (index < 0) {
      $scope.hideArea.push(area)
    } else {
      $scope.hideArea.splice(index, 1)
    }
    $ionicScrollDelegate.$getByHandle('tableScroll').scrollBy(0, -1, false);
  }
  $scope.isShow = function (area) {
    var index = $scope.hideArea.findIndex(function(item){
      return item.tableAreaId == area.tableAreaId
    })
    if (index < 0) {
      return true
    } else {
      return false
    }
  }
  $scope.choose = function (table, type) {
    $scope.isShowDetail = false
    if (table.status > 0) return
    var index = $scope.checkedTables.findIndex(function(item){
      return item.tableId == table.tableId && item.resvDate == $scope.data.resvDate && item.mealTypeName == $scope.mealTypeName
    })
    if (index < 0) {
      $scope.checkedTables.push({
        maxPeopleNum: table.maxPeopleNum,
        tableAreaId: table.tableAreaId,
        tableAreaName: table.tableAreaName,
        tableId: table.tableId,
        tableName: table.tableName,
        mealTypeId: $scope.data.mealTypeId,
        mealTypeIdA: $scope.data.mealTypeIdA,
        mealTypeIdB: $scope.data.mealTypeIdB,
        mealTypeName: $scope.mealTypeName,
        resvDate: $scope.data.resvDate,
      })
    } else {
      if (!type) {
        $scope.checkedTables.splice(index, 1)
      }
    }
    console.log($scope.checkedTables)
  }
  $scope.isCheck = function(table) {
    var index = $scope.checkedTables.findIndex(function(item){
      return item.tableId == table.tableId && item.resvDate == $scope.data.resvDate && item.mealTypeName == $scope.mealTypeName
    })
    if (index < 0) {
      return false
    } else {
      return true
    }
  }
  $scope.lock = function() {
    if ($scope.checkedTables.length==0) {
      return
    }
    if (!$scope.isShowDetail) {
      $scope.isShowDetail = true
      return
    }
    $ionicLoading.show({
      template: '加载中...'
    })
    $httpLock.lockv2({
      checkedTables: $scope.checkedTables,
      appUserId: $scope.info.id,
      appUserName: $scope.info.surname,
      appUserPhone: $scope.info.username,
      businessId: $scope.info.businessId,
      businessName: $scope.info.businessName,
      // mealTypeId: $scope.data.mealTypeId,
      // mealTypeName: $scope.mealTypeName,
      // resvDate: $scope.data.resvDate,
      resvMeetingOrderNo: $scope.resvOrder,
      remark:  `厅：${$stateParams.tableName} ${$stateParams.resvMeetingOrderTypeName}锁台`
    }, function(data){
      $ionicLoading.hide()
      $showAlert.alert(data.msgMessage)
      $ionicHistory.goBack();
    }, $scope.error)
  }
  $scope.openPopover = function($event){
    $scope.popoverMeal.show($event)
  }
  $scope.closePopover = function () {
    $scope.popoverMeal.hide();
  }
  $scope.fencb = function (dateString) {
    if (($scope.info.fcb == true) && sessionStorage['usdingDate'] && (sessionStorage['usdingDate'].indexOf(dateString) != -1)) {
      var mtb = [];
      var mtc = JSON.parse(sessionStorage['mealTypes']);
      for (var a = 0; a < mtc.length; a++) {
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
      $scope.mealTypes = mtb;
      var mealTypesLength = $scope.mealTypes.length * 53;
      var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="chooseMeal($event)"
                     ng-repeat="meal in mealTypes" data-mealId={{meal.mealTypeId}} data-mealTypeIdA={{meal.mealTypeIdA}} data-mealTypeIdB={{meal.mealTypeIdB}}
                     data-resvStartTime={{meal.resvStartTime}} data-resvEndTime={{meal.resvEndTime}} data-text={{meal.mealTypeName}} data-mealTypeSecondDaySign={{meal.mealTypeSecondDaySign}}>
                        {{meal.mealTypeName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
        scope: $scope
      });
    } else {
      $scope.mealTypes = JSON.parse(sessionStorage['mealTypes']);
      var mealTypesLength = $scope.mealTypes.length * 53;
      var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="chooseMeal($event)"
                     ng-repeat="meal in mealTypes" data-mealId={{meal.id}} data-mealTypeIdA="" data-mealTypeIdB=""
                     data-resvStartTime={{meal.resvStartTime}} data-resvEndTime={{meal.resvEndTime}} data-text={{meal.mealTypeName}} data-mealTypeSecondDaySign={{meal.mealTypeSecondDaySign}}>
                        {{meal.mealTypeName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
        scope: $scope
      });
    }
    
    var yType = $scope.mealYTypes.filter(function(item){
      return item.id == $scope.mealYTypeId
    })[0]
    var type = $scope.mealTypes.filter(function(item){
      return yType.configId == item.configId
    })[0]
    console.log(yType)
    console.log($scope.mealTypes)
    console.log($scope.mealYTypes)
    // for (var i = 0; i< $scope.mealTypes.length; i++) {
    //   if (yType.resvStartTime >= $scope.mealTypes[i].resvStartTime) {
    //     if (yType.resvEndTime <= $scope.mealTypes[i].resvEndTime) {
    //       $scope.data.mealTypeId = $scope.mealTypes[i].id
    //       $scope.mealTypeName = $scope.mealTypes[i].mealTypeName
    //     } else {
    //       if ($scope.mealTypes[i+1]){
    //         if (parseInt($scope.mealTypes[i].resvEndTime) - parseInt(yType.resvStartTime) >= parseInt(yType.resvEndTime) - parseInt($scope.mealTypes[i+1].resvStartTime)){
    //           $scope.data.mealTypeId = $scope.mealTypes[i].id
    //           $scope.mealTypeName = $scope.mealTypes[i].mealTypeName
    //         } else {
    //           $scope.data.mealTypeId = $scope.mealTypes[i+1].id
    //           $scope.mealTypeName = $scope.mealTypes[i+1].mealTypeName
    //         }
    //       }
    //     }
    //   }
    // }
    if (type){
      $scope.data.mealTypeId = type.id
      $scope.mealTypeName = type.mealTypeName
    } else {
      $scope.data.mealTypeId = $scope.mealTypes[0].id
      $scope.mealTypeName = $scope.mealTypes[0].mealTypeName
    }
  }
  $scope.chooseMeal = function($event) {
    var a = $event.target;
    var txt = a.getAttribute("data-text");
    $scope.mealTypeName = txt.trim();
    $scope.closePopover();
    $scope.data.mealTypeId = a.getAttribute("data-mealid");
    $scope.data.mealTypeIdA = a.getAttribute("data-mealTypeIdA")
    $scope.data.mealTypeIdB = a.getAttribute("data-mealTypeIdB")
    $scope.data.mealTypeIdB = a.getAttribute("data-mealTypeIdB")
    $scope.data.mealTypeIdB = a.getAttribute("data-mealTypeIdB")
    $scope.data.page = 1
    $scope.tableList = []
    $scope.getAllTable($scope.data)
  }
  ////////////////////////////////////////////////////////////////日期弹出////
  // 获取当前餐别日期 跨天餐别
  $scope.getMealDate = function(){
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var now = 60 * hour + min;
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
  //这是不可选的日期列表
  $scope.showCalender = function () {
    $scope.calender = true;
    $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
  };
  $scope.hideCalender = function ($event) {
    if ($event.target.getAttribute('data-date') != '') {
      var date = new Date($scope.dateYear * 1, ($scope.dateMonth) * 1, ($event.target.getAttribute('data-date') * 1)).getTime() * 1 + 1;
      if (freshTime(date) < freshTime($scope.getMealDate())) {
        return;
      }
      $scope.calender = false;
      $scope.data.resvDate = freshTime(date)
      $scope.data.page = 1
      $scope.tableList = []
      $scope.getAllTable($scope.data)
    }
  };
  $scope.addYear = function () {
    $scope.dateYear += 1;
    $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
  };
  $scope.minusYear = function () {
    if (($scope.dateYear == $scope.getMealDate().getFullYear()) || (($scope.dateYear == $scope.getMealDate().getFullYear() + 1) && $scope.dateMonth < $scope.getMealDate().getMonth())) {
      $scope.dateYear -= 1;
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
      // console.log('不能减小了');
    } else {
      $scope.dateYear -= 1;
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
    }
  };
  $scope.addMonth = function () {
    if ($scope.dateMonth == 11) {
      $scope.dateMonth = 0;
      $scope.dateYear += 1;
    } else {
      $scope.dateMonth += 1;
    }
    $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
  };
  $scope.minusMonth = function () {
    if (($scope.dateYear == $scope.todayTime.getFullYear()) && ($scope.dateMonth == $scope.todayTime.getMonth())) {
      console.log('不能减小了');
      if ($scope.dateMonth == 0) {
        $scope.dateMonth = 11;
        $scope.dateYear -= 1;
      } else {
        $scope.dateMonth -= 1;
      }
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
    } else {
      if ($scope.dateMonth == 0) {
        $scope.dateMonth = 11;
        $scope.dateYear -= 1;
      } else {
        $scope.dateMonth -= 1;
      }
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
    }
  };
  $scope.dateCancel = function () {
    $scope.calender = false;
  };
  $scope.dateToday = function () {
    $scope.calender = false;
    $scope.dateYear = $scope.getMealDate().getFullYear();
    $scope.dateMonth = $scope.getMealDate().getMonth();
    $scope.data.resvDate = freshTime()
    $scope.data.page = 1
    $scope.tableList = []
    $scope.getAllTable($scope.data)
  };
  var freshTime = function (n) {
    var date = n?new Date(n):new Date();
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
})