angular
  .module("starter.controllers.dashBookCtrl", [])
  .controller("DashBookCtrl", function(
    $scope,
    $ionicTabsDelegate,
    $calendar,
    $http,
    $httpPsd,
    $timeout,
    $qupload,
    $operation,
    $ionicPopover,
    $showAlert,
    $cordovaDatePicker,
    $stateParams,
    $ionicPopup,
    $state,
    $ionicLoading,
    $ionicScrollDelegate,
    $T,
    ionicDatePicker
  ) {
    $scope.$on("$ionicView.beforeEnter", function(event, viewData) {
      $scope.showFalse = false;
      $scope.info = JSON.parse(localStorage["info"]);
      $scope.isJk = $scope.info.isJk;
      $scope.showBill = false;
      $scope.canFT = $scope.info.isTableTurnover == 1 ? true : false;
      $scope.canSubmit =
        $scope.info.appUserOprationId.indexOf("2") > -1 ? true : false; // 是否允许提交预订申请
      // $scope.info.appUserOprationDetailId = '2-1,2-2,2-3,2-4'
      if ($scope.canSubmit && $scope.info.appUserOprationDetailId) {
        $scope.yudingSubmit =
          $scope.info.appUserOprationDetailId.indexOf("2-1") > -1
            ? true
            : false;
        $scope.jiazhuoSubmit =
          $scope.info.appUserOprationDetailId.indexOf("2-2") > -1
            ? true
            : false;
        $scope.huanzhuoSubmit =
          $scope.info.appUserOprationDetailId.indexOf("2-3") > -1
            ? true
            : false;
        $scope.tuidingSubmit =
          $scope.info.appUserOprationDetailId.indexOf("2-4") > -1
            ? true
            : false;
      }
      //下拉加载桌位///////////
      $scope.canLoad = true;
      $scope.weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      // $ionicTabsDelegate.showBar(false);
      $scope.isYp = $scope.info.isYp == 1 ? true : false;
      $scope.reason = JSON.parse(sessionStorage["unOrderReason"]);
      viewData.enableBack = false;
      $scope.todayTime = $scope.getMealDate();
      $scope.isKuaTian = sessionStorage["isKuaTian"];
      $scope.showModal = false;
      $scope.cData = {};
      $scope.cData.minPeopleNum = "";
      $scope.cData.maxPeopleNum = "";
      $scope.cData.minAmount = "";
      $scope.cData.maxAmount = "";
      $scope.filterShow = false;
      // 过滤数据
      $scope.filterData = {
        status: "",
        tTypes0: false,
        tTypes1: false,
        tTypes2: false,
        washroom: false,
        television: false,
        sofa: false
      };
      $scope.tablePic = "";
      $scope.picId = 0;
      $scope.calender = false;
      $scope.dateList = [];
      $scope.weekList = ["日", "一", "二", "三", "四", "五", "六"];
      $scope.dateYear = $scope.todayTime.getFullYear();
      $scope.dateMonth = $scope.todayTime.getMonth();
      $scope.onClick = false;
      $scope.loading = 0;
      $scope.showArea = false;
      $scope.tableAreaShow = $scope.info.tableAreaShow;
      var isValue = false;
      for (var i in $stateParams) {
        if ($stateParams[i]) {
          isValue = true;
        }
      }
      if (isValue) {
        sessionStorage["bookParams"] = JSON.stringify($stateParams);
      } else {
        $stateParams = JSON.parse(sessionStorage["bookParams"]);
      }
      console.log("-----------------------" + isValue);
      if ($stateParams.mealTypeId) {
        console.log("在运行1");
        console.log($stateParams);
        $scope.showDate = $stateParams.showDate;
        $scope.dateString = $stateParams.dateString;
        $scope.mealTypeId = $stateParams.mealTypeId;
        $scope.isKuaTian = $stateParams.isKuaTian;
        $scope.meal = $stateParams.mealTypeName;
        if ($stateParams.mealTypeIdA) {
          $scope.mealTypeIdA = $stateParams.mealTypeIdA;
        } else {
          $scope.mealTypeIdA = "";
        }
        if ($stateParams.mealTypeIdB) {
          $scope.mealTypeIdB = $stateParams.mealTypeIdB;
        } else {
          $scope.mealTypeIdB = "";
        }
        $scope.resvStartTime = $stateParams.resvStartTime;
        $scope.resvEndTime = $stateParams.resvEndTime;
        $scope.state = "全部状态";
        $scope.area = "全部区域";
        $scope.tableAreaId = "";
        $scope.peicai = "";
        $scope.status = "";
        $scope.confirm = "";
        localStorage["scrollTop"] = 0;
      } else if ($stateParams.type > 3) {
        console.log("在运行停顿000");
        console.log($stateParams.type);
        console.log($stateParams.seatDataFor);
        $scope.mealTypeId = $stateParams.seatDataFor.mealTypeId;
        $scope.isKuaTian = $stateParams.seatDataFor.isKuaTian;
        if ($stateParams.seatDataFor.mealTypeIdA) {
          $scope.mealTypeIdA = $stateParams.seatDataFor.mealTypeIdA;
        } else {
          $scope.mealTypeIdA = "";
        }
        if ($stateParams.seatDataFor.mealTypeIdB) {
          $scope.mealTypeIdB = $stateParams.seatDataFor.mealTypeIdB;
        } else {
          $scope.mealTypeIdB = "";
        }
        $scope.meal = $stateParams.seatDataFor.mealTypeName;
        if ($stateParams.seatDataFor.resvDate) {
          $scope.dateString = $stateParams.seatDataFor.resvDate;
        } else {
          $scope.dateString = (function() {
            var date = $scope.getMealDate();
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
          })();
        }
        $scope.resvStartTime = $stateParams.seatDataFor.resvStartTime;
        $scope.resvEndTime = $stateParams.seatDataFor.resvEndTime;
        if ($stateParams.seatDataFor.state) {
          $scope.state = $stateParams.seatDataFor.state;
        } else {
          $scope.state = "全部状态";
        }
        if ($stateParams.seatDataFor.confirm == 0) {
          $scope.confirm = $stateParams.seatDataFor.confirm;
        } else {
          $scope.confirm = "";
        }
        if ($stateParams.seatDataFor.area) {
          $scope.area = $stateParams.seatDataFor.area;
        } else {
          $scope.area = "全部区域";
        }
        if ($stateParams.seatDataFor.peicai) {
          $scope.peicai = $stateParams.seatDataFor.peicai;
        } else {
          $scope.peicai = "";
        }
        if ($stateParams.seatDataFor.tableAreaId) {
          $scope.tableAreaId = $stateParams.seatDataFor.tableAreaId;
        } else {
          $scope.tableAreaId = "";
        }
        if ($stateParams.seatDataFor.status) {
          $scope.status = $stateParams.seatDataFor.status;
        } else {
          $scope.status = "";
        }
        if ($stateParams.seatDataFor.showDate) {
          $scope.showDate = $stateParams.seatDataFor.showDate;
        } else {
          $scope.showDate = $scope.getMealDate().getTime();
        }
      } else if ($stateParams.type == 1) {
        console.log("在运行3");
        $scope.showDate = $scope.getMealDate().getTime();
        $scope.dateString = freshTime();
        $scope.state = "全部状态";
        $scope.area = "全部区域";
        $scope.tableAreaId = "";
        $scope.peicai = "";
        $scope.status = "";
        $scope.confirm = "";
        $scope.mealTypeId = sessionStorage["mealTypeId"];
        if (sessionStorage["mealTypeIdA"]) {
          $scope.mealTypeIdA = sessionStorage["mealTypeIdA"];
        } else {
          $scope.mealTypeIdA = "";
        }
        if (sessionStorage["mealTypeIdB"]) {
          $scope.mealTypeIdB = sessionStorage["mealTypeIdB"];
        } else {
          $scope.mealTypeIdB = "";
        }
        $scope.meal = sessionStorage["mealTypeName"];
        $scope.resvStartTime = sessionStorage["resvStartTime"];
        $scope.resvEndTime = sessionStorage["resvEndTime"];
      }
      $scope.seatDataFor = {
        mealTypeId: $scope.mealTypeId,
        mealTypeName: $scope.meal,
        resvDate: $scope.dateString,
        resvStartTime: $scope.resvStartTime,
        resvEndTime: $scope.resvEndTime,
        isKuaTian: $scope.isKuaTian,
        showDate: $scope.showDate,
        status: $scope.status,
        tableAreaId: $scope.tableAreaId,
        peicai: $scope.peicai,
        area: $scope.area,
        state: $scope.state,
        confirm: $scope.confirm,
        mealTypeIdA: $scope.mealTypeIdA,
        mealTypeIdB: $scope.mealTypeIdB,
        rows: 60
      };
      $scope.seatData = {
        id: $scope.info.id,
        businessId: $scope.info.businessId,
        resvDate: $scope.dateString,
        mealTypeId: $scope.mealTypeId,
        peicai: $scope.peicai,
        tableAreaId: $scope.tableAreaId,
        status: $scope.status,
        confirm: $scope.confirm,
        mealTypeIdA: $scope.mealTypeIdA,
        mealTypeIdB: $scope.mealTypeIdB,
        rows: 60,
        page: 1
      };
      $scope.seatData.tTypes = "";
      $scope.seatData.minPeopleNum = "";
      $scope.seatData.maxPeopleNum = "";
      $scope.seatData.minAmount = "";
      $scope.seatData.maxAmount = "";
      $scope.seatData.sofa = "";
      $scope.seatData.television = "";
      $scope.seatData.washroom = "";
    });
    // 获取当前餐别日期 跨天餐别
    $scope.getMealDate = function() {
      var time = new Date();
      var hour = time.getHours();
      var min = time.getMinutes();
      var now = 60 * hour + min;
      if (sessionStorage["isKuaTian"] == 1) {
        if (sessionStorage["resvStartTime"] < sessionStorage["resvEndTime"]) {
          var year = time.getFullYear();
          var month = time.getMonth() + 1;
          var date = time.getDate() - 1;
          time = new Date(year + "/" + month + "/" + date);
        } else {
          if (now < sessionStorage["lastMealEndTime"] * 1) {
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate() - 1;
            time = new Date(year + "/" + month + "/" + date);
          }
        }
      }
      return time;
    };
    $scope.goIndex = function() {
      $state.go("tab.dash");
    };
    $scope.$on("$ionicView.enter", function() {
      $scope.changeSeat = false;
      $scope.addSeat = false;
      console.log(sessionStorage.mealTypeId);
      console.log(sessionStorage.dateString);
      $scope.sessionStorageMealTypeId = sessionStorage.mealTypeId;
      $scope.sessionStorageDateString = sessionStorage.dateString;
      if ($stateParams.type == 1) {
        $scope.seatData.tableAreaId = "";
        $scope.seatData.resvDate = $scope.dateString;
        $scope.seatData.peicai = "";
        $scope.seatData.status = "";
        $scope.seatData.confirm = "";
        $scope.seatData.isChangeTable = $scope.info.isChangeTable;
        $scope.seatData.mealTypeIdA = $scope.mealTypeIdA;
        $scope.seatData.mealTypeIdB = $scope.mealTypeIdB;
        $scope.seatData.mealTypeId = sessionStorage["mealTypeId"];
        $scope.meal = sessionStorage["mealTypeName"];
        $scope.fencb($scope.dateString);
        $scope.showLoading();
        $scope.seatData.kbc = $scope.info.kbc * 1;
        $scope.seatData.fcb = $scope.info.fcb * 1;
        $httpPsd.getArea($scope.info, $scope.areaSuccess, $scope.error);
      } else if ($stateParams.type == 2) {
        console.log(
          "宴会啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
        );
      } else {
        console.log($scope.seatData);
        $scope.fencb($scope.dateString);
        $scope.showLoading();
        $scope.seatData.kbc = $scope.info.kbc * 1;
        $scope.seatData.fcb = $scope.info.fcb * 1;
        $httpPsd.getArea($scope.info, $scope.areaSuccess, $scope.error);
        $scope.seatData.isChangeTable = $scope.info.isChangeTable;
      }
      $scope.takePicData = { scope: "yiding" };
      $httpPsd.takePic($scope.takePicData, $scope.takePicSuccess, $scope.error);
      $scope.infoList = $scope.info.appOperationSet.split(",");
      $scope.lockAuthority = false;
      $scope.tuiding = false;
      $scope.ruzuo = false;
      $scope.huanzuo = false;
      $scope.yuding = false;
      $scope.chakan = false;
      for (var i = 0; i < $scope.infoList.length; i++) {
        if ($scope.infoList[i] == 8) {
          $scope.lockAuthority = true;
        }
        if ($scope.infoList[i] == 4) {
          $scope.tuiding = true;
        }
        if ($scope.infoList[i] == 2) {
          $scope.ruzuo = true;
        }
        if ($scope.infoList[i] == 3) {
          $scope.huanzuo = true;
        }
        if ($scope.infoList[i] == 1) {
          $scope.yuding = true;
        }
        if ($scope.infoList[i] == 5) {
          $scope.chakan = true;
        }
      }
      // if ($scope.info.appOperationSet.indexOf(8) != -1) {
      //   $scope.lockAuthority = true;
      // } else {
      //   $scope.lockAuthority = false;
      // }
      // if ($scope.info.appOperationSet.indexOf(4) != -1) {
      //   $scope.tuiding = true;
      // } else {
      //   $scope.tuiding = false;
      // }
      // if ($scope.info.appOperationSet.indexOf(2) != -1) {
      //   $scope.ruzuo = true;
      // } else {
      //   $scope.ruzuo = false;
      // }
      // if ($scope.info.appOperationSet.indexOf(3) != -1) {
      //   $scope.huanzuo = true;
      // } else {
      //   $scope.huanzuo = false;
      // }
      // if ($scope.info.appOperationSet.indexOf(1) != -1) {
      //   $scope.yuding = true;
      // } else {
      //   $scope.yuding = false;
      // }
      // if ($scope.info.appOperationSet.indexOf(5) != -1) {
      //   $scope.chakan = true;
      // } else {
      //   $scope.chakan = false;
      // }
      if (localStorage["changeHotel"] == 0) {
        $scope.changeHotel = false;
      } else {
        $scope.changeHotel = true;
      }
    });
    // $scope.$on('$ionicView.beforeLeave', function() {
    //   //打开tab选项卡
    //   $ionicTabsDelegate.showBar(true);
    // });
    $scope.showLoading = function() {
      $ionicLoading.show({
        template: $T.T("加载中...")
      });
      $scope.loading = 1;
      var a = $timeout(function() {
        if ($scope.loading == 1) {
          // $state.go('tab.dash')
          // $showAlert.alert('网络不稳定，请稍后再试');
          $ionicLoading.hide();
          $timeout.cancel(a);
        } else {
          $timeout.cancel(a);
        }
      }, 60000);
    };
    $scope.todayTime = $scope.getMealDate();
    var freshTime = function(n) {
      var date = n ? new Date(n) : new Date($scope.showDate);
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
    $scope.compareTime = function() {
      var date = $scope.getMealDate();
      var m = date.getMonth() + 1;
      if (m < 10) {
        m = "0" + m;
      }
      var d = date.getDate();
      if (d < 10) {
        d = "0" + d;
      }
      var dateString = date.getFullYear() + "-" + m + "-" + d;
      console.log("compareTime", dateString);
      return dateString;
    };
    $scope.info = JSON.parse(localStorage["info"]);
    $scope.businessId = $scope.info.businessId;
    $scope.id = $scope.info.id;
    $scope.seat = [];
    $scope.table = [];
    $scope.data = {};
    $scope.tableOrders = {};
    $scope.showAlert = function(txt) {
      var alertPopup = $showAlert.alert(txt);
    };
    ///////////////////////////////////////分餐别函数///////////////////////////////////////////////
    $scope.fencb = function(dateString) {
      if (
        $scope.info.fcb == true &&
        sessionStorage["usdingDate"] &&
        sessionStorage["usdingDate"].indexOf(dateString) != -1
      ) {
        var mtb = [];
        var mtc = JSON.parse(sessionStorage["mealTypes"]);
        for (var a = 0; a < mtc.length; a++) {
          if (
            mtc[a].bandEndTime &&
            mtc[a].usingDate.indexOf(dateString) != -1
          ) {
            var mealStart =
              mtc[a].resvStartTime.slice(0, 2) * 60 +
              mtc[a].resvStartTime.slice(3) * 1;
            var mealBand =
              mtc[a].bandEndTime.slice(0, 2) * 60 +
              mtc[a].bandEndTime.slice(3) * 1;
            var mealTypeSecondDaySign = 0;
            if (mealStart > mealBand) {
              mealTypeSecondDaySign = 1;
            }
            var c = {};
            c.mealTypeName = mtc[a].mealTypeNameA;
            c.mealTypeId = mtc[a].id;
            c.mealTypeIdA = mtc[a].mealTypeIdA;
            c.mealTypeIdB = "";
            c.resvStartTime = mtc[a].resvStartTime;
            c.resvEndTime = mtc[a].bandEndTime;
            c.mealTypeSecondDaySign = mealTypeSecondDaySign;
            mtb.push(c);
            var d = {};
            d.mealTypeName = mtc[a].mealTypeNameB;
            d.mealTypeId = mtc[a].id;
            d.mealTypeIdA = "";
            d.mealTypeIdB = mtc[a].mealTypeIdB;
            d.resvStartTime = mtc[a].bandEndTime;
            d.resvEndTime = mtc[a].resvEndTime;
            d.mealTypeSecondDaySign = mtc[a].mealTypeSecondDaySign == 1 ? 1 : 0;
            mtb.push(d);
          } else {
            mtc[a].mealTypeIdB = "";
            mtc[a].mealTypeIdA = "";
            mtc[a].mealTypeId = mtc[a].id;
            mtb.push(mtc[a]);
          }
        }
        $scope.mealTypes = mtb;
        var mealTypesLength = $scope.mealTypes.length * 53;
        var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,2)"
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
        $scope.mealTypes = JSON.parse(sessionStorage["mealTypes"]);
        var mealTypesLength = $scope.mealTypes.length * 53;
        var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,2)"
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
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.error = function(data, status) {
      // if ($scope.showFalse) {
      //   console.log('不弹');
      // } else {
      if (data && data.msgMessage) {
        $scope.showFalse = true;
        $scope.alert = $showAlert.alert(data.msgMessage);
      } else if (status == 401) {
        localStorage.removeItem("TOKEN_KEY");
        $state.go("login");
      } else {
        $scope.showFalse = true;
        $scope.alert = $showAlert.alert("连接失败，请检查网络");
      }
      // }
      $scope.loading = 0;
      $ionicLoading.hide();
    };
    $scope.areaSuccess = function(data) {
      sessionStorage.setItem(
        "resvOrderTypes",
        JSON.stringify(data.resvOrderTypes)
      );
      $scope.tableAreas = data.tableAreas;
      var tableAreasLength =
        $scope.tableAreas.length > 5
          ? 290
          : ($scope.tableAreas.length + 1) * 53;
      var area = `<ion-popover-view style="height:${tableAreasLength}px;width:150px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center"  ng-click="choose($event,3)" data-text="全部区域" data-tableId="">{{'全部区域'|T}}</a>
                     <a class="item text-center"  ng-click="choose($event,3)" data-text={{table.tableAreaName}}  ng-repeat="table in tableAreas"
                     data-tableId={{table.id}}>
                        {{table.tableAreaName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      $scope.popoverArea = $ionicPopover.fromTemplate(area, {
        scope: $scope
      });
      $httpPsd.getSeat($scope.seatData, $scope.seatSuccess, $scope.error);
      // $ionicLoading.hide();
    };
    $scope.takePicSuccess = function(data) {
      $scope.uploadToken = data.uploadToken;
      console.log($scope.uploadToken);
    };
    $scope.seatSuccess = function(data) {
      $scope.tableOrders = {};
      console.log(data);
      $scope.top1 = data.tsds.kxCou;
      $scope.top2 = data.tsds.ydCou;
      $scope.top3 = data.tsds.rzCou;
      $scope.top4 = data.tsds.tdCou;
      for (var i = 0; i < data.tables.length; i++) {
        data.tables[i].picId = i;
        if ($scope.info.showTableVipname == false) {
          if (data.tables[i].vipName != "无" && data.tables[i].vipName != "") {
            if (data.tables[i].vipSex[0] != "女") {
              data.tables[i].vipName = data.tables[i].vipName[0] + "先生";
            } else {
              data.tables[i].vipName = data.tables[i].vipName[0] + "女士";
            }
          }
        }
      }
      if ($scope.seatData.page == 1) {
        $scope.seat = data.tables;
        for (var i = 0; i < data.tables.length; i++) {
          if (data.tables[i].orders && data.tables[i].orders.length > 0) {
            $scope.tableOrders[data.tables[i].tableId] = data.tables[i].orders;
          }
        }
        $ionicScrollDelegate.scrollTop();
      } else {
        $scope.seat = $scope.seat.concat(data.tables);
        for (var i = 0; i < data.tables.length; i++) {
          if (data.tables[i].orders && data.tables[i].orders.length > 0) {
            $scope.tableOrders[data.tables[i].tableId] = data.tables[i].orders;
          }
        }
      }
      console.log($scope.tableOrders);
      if ($scope.tableAreaShow) {
        for (var i = 0; i < $scope.tableAreas.length; i++) {
          $scope.tableAreas[i].tableNum = $scope.seat.filter(function(item) {
            return item.tableAreaId == $scope.tableAreas[i].id;
          }).length;
        }
      }
      $scope.loading = 0;
      $scope.showArea = true;
      $ionicLoading.hide();
      $scope.seatDetail = [];
      if (!$scope.changeSeat && $scope.seatData.page == 1) {
        $scope.table = [];
      }
      if ($scope.seatData.page == 1) {
        $scope.addSeat = false;
      }
      $scope.canLoad = data.isHasNextPage;
      $scope.seatData.page += 1;
      $ionicLoading.hide();
      $scope.$broadcast("scroll.infiniteScrollComplete");
      if (localStorage["scrollTop"] != 0) {
        $ionicScrollDelegate
          .$getByHandle("tableScroll")
          .scrollTo(0, localStorage["scrollTop"], false);
      }
    };
    $scope.getSeat = function() {
      $scope.seatData.kbc = $scope.info.kbc * 1;
      $scope.seatData.fcb = $scope.info.fcb * 1;
      $scope.seatData.isChangeTable = $scope.info.isChangeTable;
      $httpPsd.getSeat($scope.seatData, $scope.seatSuccess, $scope.error);
    };
    $scope.refresh = function() {
      //simulate async response
      //Stop the ion-refresher from spinning
      $scope.showLoading();
      $scope.seatData.page = 1;
      $scope.getSeat();
      console.log("刷新成功");
      $scope.$broadcast("scroll.refreshComplete");
    };
    $scope.doInfinite = function() {
      //simulate async response
      //Stop the ion-refresher from spinning
      $scope.getSeat();
      console.log("开始加载");
    };
    $scope.colorArr = [
      "#DA4C39",
      "#037b5f",
      "#E5AD51",
      "#646d6b",
      "#0060d2",
      "#B287D8",
      "#9A8787",
      "#9A32CD",
      "#FF69B4",
      "#EEEE00"
    ];
    ////////////////////////////////////////弹出框

    var checkUp = function(arr, state) {
      // 校验所选桌位上默认订单状态是否为state
      if (arr[0]) {
        for (var i = 0; i < arr.length; i++) {
          var num = arr[i].getAttribute("data-state");
          if (num != state) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    };
    var checkTableOrders = function(arr, state) {
      // 校验所选桌位上是否有状态为state的订单
      if (arr[0]) {
        for (var i = 0; i < arr.length; i++) {
          var tableorders = arr[i].getAttribute("data-orders")
            ? JSON.parse(arr[i].getAttribute("data-orders"))
            : [];
          for (var a = 0; a < tableorders.length; a++) {
            var num = tableorders[a].status;
            if (num == state) {
              return true;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    };
    var checkOrdersAppuser = function(arr, id) {
      // 校验所选桌位上是否有appuserid为id的订单
      if (arr[0]) {
        for (var i = 0; i < arr.length; i++) {
          var tableorders = arr[i].getAttribute("data-orders")
            ? JSON.parse(arr[i].getAttribute("data-orders"))
            : [];
          for (var a = 0; a < tableorders.length; a++) {
            var num = tableorders[a].appUserId;
            if (num == id) {
              return true;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    };
    var handle = function(image, state) {
      for (var i = 0; i < $scope.table.length; i++) {
        var img = $scope.table[i];
        img.src = image;
        img.style.border = "";
        // img.style.borderRadius = 0;
        img.setAttribute("data-select", "0");
        img.setAttribute("data-state", state);
      }
      $scope.table = [];
    };
    $scope.bgColor = [{ background: "#4c89d6" }, { background: "#68b66c" }];
    $scope.chooseOrder = function($event, type) {
      // 翻台订单弹窗上选择 type==1 加桌 type==2 餐前确认
      var obj = $event.target;
      if (obj.getAttribute("data-status") != 1 && type != 1) {
        $ionicLoading.show({
          template: $T.T("无法操作该订单"),
          duration: 500
        });
        return false;
      }
      if (type == 2 && obj.getAttribute("data-appUserId") != $scope.info.id) {
        // 餐前确认
        $ionicLoading.show({
          template: $T.T("您无权确认该订单"),
          duration: 500
        });
        return false;
      }
      if (
        $scope.info.operationType != 1 &&
        obj.getAttribute("data-appUserId") != $scope.info.id
      ) {
        $ionicLoading.show({
          template: $T.T("您无权操作该订单"),
          duration: 500
        });
        return false;
      }
      if ($scope.chooseOrders.length > 0) {
        var flag = $scope.chooseOrders[0].getAttribute("data-flag");
        if (flag != obj.getAttribute("data-flag") || flag == "undefined") {
          var brothers = document.getElementsByClassName("btn-order");
          for (var i = 0; i < brothers.length; i++) {
            var image = brothers[i];
            image.style.border = "";
          }
          $scope.chooseOrders = [];
          $scope.chooseOrders.push(obj);
          obj.style.border = "2px solid rgb(219, 79, 59)";
          return false;
        }
      }
      var index = $scope.chooseOrders.indexOf(obj);
      if (index > -1) {
        $scope.chooseOrders.splice(index, 1);
        obj.style.border = "";
      } else {
        $scope.chooseOrders.push(obj);
        obj.style.border = "2px solid rgb(219, 79, 59)";
      }
    };
    $scope.isTableOrdersMuti = function() {
      // 校验单个桌位上是否有翻台订单
      var ismuti = false;
      $scope.alltableorders = [];
      $scope.table.map(function(item) {
        var tableorders = JSON.parse(item.getAttribute("data-orders"));
        tableorders.map(function(order) {
          order.tableName = item.getAttribute("data-tableName");
          order.tableAreaId = item.getAttribute("data-tableAreaId");
          order.tableAreaName = item.getAttribute("data-tableAreaName");
          order.maxPeopleNum = item.getAttribute("data-maxPeopleNum");
        });
        if (tableorders.length > 1) {
          ismuti = true;
        }
        $scope.alltableorders = $scope.alltableorders.concat(tableorders);
      });
      return ismuti;
    };
    $scope.orderHtml = function(item, type) {
      // 翻台订单弹窗dom
      if ($scope.info.showTableVipname == false) {
        if (item.vipName != "无" && item.vipName != "") {
          if (item.vipSex[0] != "女") {
            item.vipName = item.vipName[0] + "先生";
          } else {
            item.vipName = item.vipName[0] + "女士";
          }
        }
      }
      return `<button class="button-block btn-order" ng-click="chooseOrder($event,${type})" data-status="${
        item.status
      }" data-resvOrder="${item.resvOrder}" data-batchno="${
        item.batchNo
      }" data-resvNum="${item.resvNum}" data-tableName="${
        item.tableName
      }" data-tableAreaId="${item.tableAreaId}" data-tableAreaName="${
        item.tableAreaName
      }" data-seat="${item.tableId}" data-maxPeopleNum="${
        item.maxPeopleNum
      }" data-destTime="${item.destTime}" data-flag="${
        item.flag
      }" data-appUserId="${item.appUserId}" ng-style="bgColor[${item.status -
        1}]">
      <span class="disable-pointer-events">${item.tableName}</span>
      <span class="disable-pointer-events" style="float: right;">${
        item.vipName
      }</span><br>
      <span class="disable-pointer-events" style="margin-right:5px;">${
        item.resvNum
      }人</span>
      <span class="disable-pointer-events">${item.destTime}</span>
      <span class="disable-pointer-events" style="float: right;">
        <span ng-show="${item.isMvp == 1}" class="icon-vip"></span>
        <i ng-show="${item.flag}" style="font-size:15px;color: ${
        $scope.colorArr[item.flag % 10]
      };" class="vertical-middle icon ion-ios-infinite"></i>
        <i ng-show="${item.status == 0 &&
          item.nextStatus != 0 &&
          $scope.info.kbc}" class="icon ion-alert" style="color:#DA4C39;"></i>
        <i ng-show="${item.remark.length > 0 ||
          item.orderTag.length > 0 ||
          item.facilities.length >
            0}" style="font-size:15px;color: #DA4C39;" class="vertical-middle icon ion-chatbubble-working"></i>
        <span ng-show="${item.peicai *
          1}" ng-class={'purple':(item.picUrl||item.isDc),'red':(!(item.picUrl||item.isDc))}>{{'配'|T}}</span>
        <i ng-show="${item.confirm *
          1}" style="font-size:12px;" ng-class={'purple':{{item.confirm!=1}},'red':{{item.confirm==1}}} class=" icon ion-ios-star"></i>
      </span><br>
      <span class="disable-pointer-events">${
        item.appUserName == "无" ? "预订台" : item.appUserName
      }</span>
    </button>`;
    };
    var change = function($event, num) {
      var a = $event.target;
      var txt = a.getAttribute("data-text");
      $scope.closePopover(num);
      $scope.chooseOrders = [];
      if (num == 1) {
        $scope.seatData.page = 1;
        if (a.getAttribute("data-status") == "pei") {
          $scope.peicai = 1;
          $scope.seatData.peicai = $scope.peicai;
          $scope.seatData.status = "";
          $scope.seatDataFor.peicai = $scope.peicai;
          $scope.seatDataFor.status = "";
          $scope.confirm = "";
          $scope.seatData.confirm = $scope.confirm;
          $scope.seatDataFor.confirm = $scope.confirm;
          $scope.showLoading();
          $scope.getSeat();
        } else if (a.getAttribute("data-status") == "que") {
          $scope.confirm = 0;
          $scope.seatData.confirm = $scope.confirm;
          $scope.seatData.status = 1;
          $scope.seatDataFor.confirm = $scope.confirm;
          $scope.seatDataFor.status = 1;
          $scope.peicai = "";
          $scope.seatData.peicai = $scope.peicai;
          $scope.seatDataFor.peicai = "";
          $scope.showLoading();
          $scope.getSeat();
        } else {
          $scope.peicai = "";
          $scope.confirm = "";
          $scope.status = a.getAttribute("data-status");
          $scope.seatData.status = $scope.status;
          $scope.seatData.peicai = $scope.peicai;
          $scope.seatData.confirm = $scope.confirm;
          $scope.seatDataFor.status = $scope.status;
          $scope.seatDataFor.peicai = $scope.peicai;
          $scope.seatDataFor.confirm = $scope.confirm;
          $scope.showLoading();
          $scope.getSeat();
        }
        $scope.state = txt;
        $scope.seatDataFor.state = $scope.state;
      } else if (num == 2) {
        $scope.seatData.page = 1;
        $scope.mealTypeId = a.getAttribute("data-mealid");
        $scope.seatData.mealTypeId = $scope.mealTypeId;
        $scope.seatDataFor.mealTypeId = $scope.mealTypeId;
        $scope.mealTypeIdA = a.getAttribute("data-mealTypeIdA");
        $scope.seatData.mealTypeIdA = $scope.mealTypeIdA;
        $scope.seatDataFor.mealTypeIdA = $scope.mealTypeIdA;
        $scope.mealTypeIdB = a.getAttribute("data-mealTypeIdB");
        $scope.seatData.mealTypeIdB = $scope.mealTypeIdB;
        $scope.seatDataFor.mealTypeIdB = $scope.mealTypeIdB;
        $scope.resvStartTime = a.getAttribute("data-resvStartTime");
        $scope.seatDataFor.resvStartTime = $scope.resvStartTime;
        $scope.resvEndTime = a.getAttribute("data-resvEndTime");
        $scope.seatDataFor.resvEndTime = $scope.resvEndTime;
        //$scope.seatDataFor
        $scope.meal = txt.trim();
        $scope.seatDataFor.mealTypeName = $scope.meal;
        $scope.isKuaTian = a.getAttribute("data-mealTypeSecondDaySign");
        $scope.seatDataFor.isKuaTian = $scope.isKuaTian;
        console.log("切换到餐别是否跨天", $scope.isKuaTian);
        $scope.showLoading();
        $scope.getSeat();
      } else if (num == 3) {
        $scope.seatData.page = 1;
        $scope.tableAreaId = a.getAttribute("data-tableId");
        $scope.seatData.tableAreaId = $scope.tableAreaId;
        $scope.seatDataFor.tableAreaId = $scope.tableAreaId;
        $scope.area = txt;
        $scope.seatDataFor.area = $scope.area;
        $scope.showLoading();
        $scope.getSeat();
      } else if (num == 4) {
        // 更多操作
        if (
          txt == "退订" &&
          checkTableOrders($scope.table, 1) &&
          ($scope.tuiding || ($scope.canSubmit && $scope.tuidingSubmit))
        ) {
          var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
          var b =
            $scope.resvEndTime.slice(0, 2) * 60 +
            $scope.resvEndTime.slice(3) * 1;
          $scope.unBookFun = function() {
            if ($scope.chooseOrders.length == 0 && $scope.isTableOrdersMuti()) {
              $scope.showAlert("请选择一笔订单");
              $scope.myPopup();
              return false;
            }
            if (
              !checkOrdersAppuser($scope.table, $scope.info.id) &&
              $scope.canSubmit
            ) {
              $showAlert.alert("不可退订该订单");
              return;
            }
            if ($scope.myPopup) {
              $scope.myPopup.close();
            }
            $scope.data.unOrderReason = "";
            $scope.myPopup = $ionicPopup.show({
              cssClass: "er-popup",
              template: `<div ng-if="canSubmit" style="margin-bottom:10px;">是否提交退订申请</div><button ng-repeat="r in reason" ng-click="reasonTui($event)" style="margin-left:10px;margin-bottom:8px;" class="button button-positive button-small">{{r.name}}</button><input type="text" ng-model="data.unOrderReason" placeholder="{{'其他原因'|T}}" style="background:#f6f6f6;padding:0 10px;">`,
              title: $T.T("请输入退订原因"),
              scope: $scope,
              buttons: [
                { text: $T.T("取消") },
                {
                  text: `<b>${$T.T("确认")}</b>`,
                  type: "button-assertive",
                  onTap: function() {
                    console.log("退订");
                    var checkedTables = [];
                    if ($scope.chooseOrders.length > 0) {
                      for (var i = 0; i < $scope.chooseOrders.length; i++) {
                        checkedTables[i] = {};
                        checkedTables[i].tableAreaId = $scope.chooseOrders[
                          i
                        ].getAttribute("data-tableAreaId");
                        checkedTables[i].tableAreaName = $scope.chooseOrders[
                          i
                        ].getAttribute("data-tableAreaName");
                        checkedTables[i].tableId = $scope.chooseOrders[
                          i
                        ].getAttribute("data-seat");
                        checkedTables[i].tableName = $scope.chooseOrders[
                          i
                        ].getAttribute("data-tableName");
                        checkedTables[i].resvOrder = $scope.chooseOrders[
                          i
                        ].getAttribute("data-resvOrder");
                        checkedTables[i].maxPeopleNum = $scope.chooseOrders[
                          i
                        ].getAttribute("data-maxPeopleNum");
                      }
                    } else {
                      for (var i = 0; i < $scope.table.length; i++) {
                        checkedTables[i] = {};
                        checkedTables[i].tableAreaId = $scope.table[
                          i
                        ].getAttribute("data-tableAreaId");
                        checkedTables[i].tableAreaName = $scope.table[
                          i
                        ].getAttribute("data-tableAreaName");
                        checkedTables[i].tableId = $scope.table[i].getAttribute(
                          "data-seat"
                        );
                        checkedTables[i].tableName = $scope.table[
                          i
                        ].getAttribute("data-tableName");
                        checkedTables[i].resvOrder = $scope.table[
                          i
                        ].getAttribute("data-resvOrder");
                        checkedTables[i].maxPeopleNum = $scope.table[
                          i
                        ].getAttribute("data-maxPeopleNum");
                      }
                    }
                    if (!$scope.canSubmit) {
                      $scope.unBookData = {
                        businessId: $scope.info.businessId,
                        appUserId: $scope.info.id,
                        businessName: $scope.info.businessName,
                        appUserName: $scope.info.surname,
                        appUserPhone: $scope.info.username,
                        unorderReason: $scope.data.unOrderReason,
                        resvOrderType: $scope.table[0].getAttribute(
                          "data-resvOrderType"
                        ),
                        mealTypeId: $scope.mealTypeId,
                        mealTypeIdA: $scope.mealTypeIdA,
                        mealTypeIdB: $scope.mealTypeIdB,
                        isKbc: $scope.table[0].getAttribute("data-isKbc"),
                        kbc: $scope.info.kbc * 1,
                        checkedTables: checkedTables,
                        status: 4
                      };
                      $scope.showLoading();
                      $operation.statusUnBook(
                        $scope.unBookData,
                        $scope.operationSuccess.unBook,
                        $scope.error
                      );
                    } else {
                      var orderInfo =
                        $scope.chooseOrders.length > 0
                          ? $scope.chooseOrders[0]
                          : $scope.table[0];
                      console.log("退订申请");
                      var checkedResvOrder = orderInfo.getAttribute(
                        "data-resvOrder"
                      );
                      var unbookData = {
                        resvOrder: checkedResvOrder,
                        submitStatus: 4,
                        checkedTables: checkedTables,
                        unorderReason: $scope.data.unOrderReason
                      };
                      $operation.handleOrderSubmit(
                        unbookData,
                        function(data) {
                          if (data.msgCode == 0) {
                            $showAlert.alert("退订申请已提交");
                          } else {
                            $showAlert.alert(data.msgMessage || "提交申请失败");
                          }
                        },
                        $scope.error
                      );
                    }
                  }
                }
              ]
            });
          };
          if (!$scope.timeInMealTime()) {
            $scope.showAlert("该餐次已经无法退订");
            return;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a < sessionStorage["lastMealEndTime"] * 1 &&
            sessionStorage["lastMealEndTime"] < 6 * 60
          ) {
            a += a + 24 * 60;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a > b &&
            $scope.isKuaTian != 1
          ) {
            $scope.showAlert("该餐次已经无法退订");
          } else if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 0);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要退订的订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      console.log("连台退订");
                      $scope.unBookFun();
                    }
                  }
                ]
              });
            } else {
              $scope.unBookFun();
            }
          } else {
            $scope.showAlert("您无权退订此桌");
          }
        } else if (txt == "重要客户" && checkTableOrders($scope.table, 1)) {
          var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
          var b =
            $scope.resvEndTime.slice(0, 2) * 60 +
            $scope.resvEndTime.slice(3) * 1;
          $scope.mvpFun = function() {
            if ($scope.chooseOrders.length == 0 && $scope.isTableOrdersMuti()) {
              $scope.showAlert("请选择一笔订单");
              $scope.myPopup();
              return false;
            }
            $scope.myPopup = $ionicPopup.show({
              cssClass: "er-popup",
              template: `<input type="text" ng-model="data.mvpReason" placeholder="{{'请输入标记原因'|T}}" style="background:#f6f6f6;padding:0 10px;">`,
              title: $T.T("请输入标记原因"),
              scope: $scope,
              buttons: [
                { text: $T.T("取消") },
                {
                  text: `<b>${$T.T("确认")}</b>`,
                  type: "button-assertive",
                  onTap: function() {
                    if ($scope.data.mvpReason == undefined) {
                      $scope.showAlert("标记原因不允许为空");
                      $scope.myPopup();
                    } else {
                      console.log("重要客户");
                      var batchno = $scope.table[0].getAttribute(
                        "data-batchno"
                      );
                      if ($scope.chooseOrders.length > 0) {
                        batchno = $scope.chooseOrders[0].getAttribute(
                          "data-batchno"
                        );
                      }
                      $scope.mvpData = {
                        businessId: $scope.info.businessId,
                        mvpReason: $scope.data.mvpReason,
                        isMvp: 1,
                        batchNo: batchno
                      };
                      $scope.showLoading();
                      $operation.mvpTab(
                        $scope.mvpData,
                        $scope.operationSuccess.mvp
                      );
                    }
                  }
                }
              ]
            });
          };
          if (!$scope.timeInMealTime()) {
            $scope.showAlert("该餐次已经无法标记");
            return;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a < sessionStorage["lastMealEndTime"] * 1 &&
            sessionStorage["lastMealEndTime"] < 6 * 60
          ) {
            a += a + 24 * 60;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a > b &&
            $scope.isKuaTian != 1
          ) {
            $scope.showAlert("该餐次已经无法标记");
          } else if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 0);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要标记的客户订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.mvpFun();
                    }
                  }
                ]
              });
            } else {
              $scope.mvpFun();
            }
          } else {
            $scope.showAlert("您无权标记此桌");
          }
        } else if (txt == "取消标记" && checkTableOrders($scope.table, 1)) {
          var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
          var b =
            $scope.resvEndTime.slice(0, 2) * 60 +
            $scope.resvEndTime.slice(3) * 1;
          if ($scope.isTableOrdersMuti()) {
            var isMvp = 0;
            for (var i = 0; i < $scope.table.length; i++) {
              var tableorders = $scope.table[i].getAttribute("data-orders")
                ? JSON.parse($scope.table[i].getAttribute("data-orders"))
                : [];
              for (var a = 0; a < tableorders.length; a++) {
                if (tableorders[a].isMvp == 1) {
                  isMvp = tableorders[a].isMvp;
                }
              }
            }
            if (isMvp != 1) {
              $scope.showAlert("该桌位上的订单无法取消标记");
              return;
            }
          } else {
            var isMvp = $scope.table[0].getAttribute("data-isMvp");
            if (isMvp != 1) {
              $scope.showAlert("该订单无法取消标记");
              return;
            }
          }
          $scope.cancelMvpFun = function() {
            if ($scope.chooseOrders.length == 0 && $scope.isTableOrdersMuti()) {
              $scope.showAlert("请选择一笔订单");
              $scope.myPopup();
              return false;
            }
            $scope.myPopup = $ionicPopup.show({
              cssClass: "er-popup",
              title: $T.T("易订"),
              template: $T.T("确认要取消重要客户标记吗"),
              buttons: [
                { text: $T.T("取消") },
                {
                  text: $T.T("确认"),
                  type: "button-assertive",
                  onTap: function() {
                    var batchno = $scope.table[0].getAttribute("data-batchno");
                    if ($scope.chooseOrders.length > 0) {
                      batchno = $scope.chooseOrders[0].getAttribute(
                        "data-batchno"
                      );
                    }
                    $scope.mvpData = {
                      businessId: $scope.info.businessId,
                      isMvp: 0,
                      mvpReason: "",
                      batchNo: batchno
                    };
                    $scope.showLoading();
                    $operation.mvpTab(
                      $scope.mvpData,
                      $scope.operationSuccess.mvp
                    );
                  }
                }
              ]
            });
          };
          if (!$scope.timeInMealTime()) {
            $scope.showAlert("该餐次已经无法取消标记");
            return;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a < sessionStorage["lastMealEndTime"] * 1 &&
            sessionStorage["lastMealEndTime"] < 6 * 60
          ) {
            a += a + 24 * 60;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a > b &&
            $scope.isKuaTian != 1
          ) {
            $scope.showAlert("该餐次已经无法取消标记");
          } else if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 0);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要取消标记的客户订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.cancelMvpFun();
                    }
                  }
                ]
              });
            } else {
              $scope.cancelMvpFun();
            }
          } else {
            $scope.showAlert("您无权取消标记此桌");
          }
        } else if (txt == "入座" && checkTableOrders($scope.table, 1)) {
          $scope.goSeatFun = function() {
            if ($scope.chooseOrders.length == 0 && $scope.isTableOrdersMuti()) {
              $scope.showAlert("请选择一笔订单");
              $scope.myPopup();
              return false;
            }
            if ($scope.myPopup) {
              $scope.myPopup.close();
            }
            if ($scope.chooseOrders.length > 0) {
              $scope.data.actualNum = $scope.chooseOrders[0].getAttribute(
                "data-resvNum"
              );
            } else {
              $scope.data.actualNum = $scope.table[0].getAttribute(
                "data-resvNum"
              );
            }
            $scope.myPopup = $ionicPopup.confirm({
              cssClass: "er-popup",
              template:
                '<input type="text" ng-model="data.actualNum" style="background:#f6f6f6;padding:0 10px;">',
              title: $T.T("请输入入座人数"),
              scope: $scope,
              buttons: [
                { text: $T.T("取消") },
                {
                  text: `<b>${$T.T("确认")}</b>`,
                  type: "button-assertive",
                  onTap: function() {
                    console.log("入座");
                    var reg = /^\d+$/;
                    if ($scope.data.actualNum == "") {
                      $scope.showAlert("入座人数不允许为空");
                      myPopup();
                    } else if (
                      reg.test($scope.data.actualNum) == false ||
                      parseInt($scope.data.actualNum) == 0
                    ) {
                      $showAlert.alert("入座人数应为大于0的数字");
                      myPopup();
                    }
                    var checkedTables = [];
                    if ($scope.chooseOrders.length > 0) {
                      for (var i = 0; i < $scope.chooseOrders.length; i++) {
                        checkedTables[i] = {};
                        checkedTables[i].tableAreaId = $scope.chooseOrders[
                          i
                        ].getAttribute("data-tableAreaId");
                        checkedTables[i].tableAreaName = $scope.chooseOrders[
                          i
                        ].getAttribute("data-tableAreaName");
                        checkedTables[i].tableId = $scope.chooseOrders[
                          i
                        ].getAttribute("data-seat");
                        checkedTables[i].tableName = $scope.chooseOrders[
                          i
                        ].getAttribute("data-tableName");
                        checkedTables[i].resvOrder = $scope.chooseOrders[
                          i
                        ].getAttribute("data-resvOrder");
                        checkedTables[i].maxPeopleNum = $scope.chooseOrders[
                          i
                        ].getAttribute("data-maxPeopleNum");
                      }
                    } else {
                      for (var i = 0; i < $scope.table.length; i++) {
                        checkedTables[i] = {};
                        checkedTables[i].tableAreaId = $scope.table[
                          i
                        ].getAttribute("data-tableAreaId");
                        checkedTables[i].tableAreaName = $scope.table[
                          i
                        ].getAttribute("data-tableAreaName");
                        checkedTables[i].tableId = $scope.table[i].getAttribute(
                          "data-seat"
                        );
                        checkedTables[i].tableName = $scope.table[
                          i
                        ].getAttribute("data-tableName");
                        checkedTables[i].resvOrder = $scope.table[
                          i
                        ].getAttribute("data-resvOrder");
                        checkedTables[i].maxPeopleNum = $scope.table[
                          i
                        ].getAttribute("data-maxPeopleNum");
                      }
                    }
                    $scope.goSeatData = {
                      businessId: $scope.info.businessId,
                      appUserId: $scope.info.id,
                      businessName: $scope.info.businessName,
                      appUserName: $scope.info.surname,
                      appUserPhone: $scope.info.username,
                      resvOrderType: $scope.table[0].getAttribute(
                        "data-resvOrderType"
                      ),
                      checkedTables: checkedTables,
                      actualNum: $scope.data.actualNum,
                      status: 2
                    };
                    $scope.showLoading();
                    $operation.status(
                      $scope.goSeatData,
                      $scope.operationSuccess.seat,
                      $scope.error
                    );
                  }
                }
              ]
            });
          };
          if (
            (($scope.info.operationType == 1 || $scope.ruzuo) &&
              !$scope.canSubmit) ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            console.log("为什么不能热更新");
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 0);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要入座的订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.goSeatFun();
                    }
                  }
                ]
              });
            } else {
              $scope.goSeatFun();
            }
          } else {
            $scope.showAlert("您无权入座此桌");
          }
        } else if (
          txt == "锁台" &&
          checkUp($scope.table, 0) &&
          $scope.lockAuthority &&
          !$scope.canSubmit
        ) {
          var myPopup = $ionicPopup.show({
            cssClass: "er-popup",
            template:
              '<input type="text" ng-model="data.lock" style="background:#f6f6f6;padding:0 10px;">',
            title: $T.T("请输入锁台原因"),
            scope: $scope,
            buttons: [
              { text: $T.T("取消") },
              {
                text: `<b>${$T.T("确认")}</b>`,
                type: "button-assertive",
                onTap: function() {
                  console.log("锁台");
                  var checkedTables = [];
                  for (var i = 0; i < $scope.table.length; i++) {
                    checkedTables[i] = {};
                    checkedTables[i].tableAreaId = $scope.table[i].getAttribute(
                      "data-tableAreaId"
                    );
                    checkedTables[i].tableAreaName = $scope.table[
                      i
                    ].getAttribute("data-tableAreaName");
                    checkedTables[i].tableId = $scope.table[i].getAttribute(
                      "data-seat"
                    );
                    checkedTables[i].tableName = $scope.table[i].getAttribute(
                      "data-tableName"
                    );
                    checkedTables[i].maxPeopleNum = $scope.table[
                      i
                    ].getAttribute("data-maxPeopleNum");
                  }
                  $scope.lockData = {
                    businessId: $scope.info.businessId,
                    appUserId: $scope.info.id,
                    businessName: $scope.info.businessName,
                    appUserName: $scope.info.surname,
                    appUserPhone: $scope.info.username,
                    resvDate: $scope.dateString,
                    mealTypeId: $scope.mealTypeId,
                    mealTypeIdA: $scope.mealTypeIdA,
                    mealTypeIdB: $scope.mealTypeIdB,
                    mealTypeName: $scope.meal,
                    remark: $scope.data.lock,
                    checkedTables: checkedTables
                  };
                  $scope.showLoading();
                  $operation.lock(
                    $scope.lockData,
                    $scope.operationSuccess.lock,
                    $scope.error
                  );
                }
              }
            ]
          });
        } else if (
          txt == "解锁" &&
          checkUp($scope.table, 5) &&
          $scope.lockAuthority &&
          !$scope.canSubmit
        ) {
          var myPopup = $ionicPopup.confirm({
            cssClass: "er-popup",
            template: $T.T("确认要解锁吗"),
            title: $T.T("易订"),
            scope: $scope,
            buttons: [
              { text: $T.T("取消") },
              {
                text: `<b>${$T.T("确认")}</b>`,
                type: "button-assertive",
                onTap: function() {
                  console.log("解锁");
                  var checkedTables = [];
                  for (var i = 0; i < $scope.table.length; i++) {
                    checkedTables[i] = {};
                    checkedTables[i].tableAreaId = $scope.table[i].getAttribute(
                      "data-tableAreaId"
                    );
                    checkedTables[i].tableAreaName = $scope.table[
                      i
                    ].getAttribute("data-tableAreaName");
                    checkedTables[i].tableId = $scope.table[i].getAttribute(
                      "data-seat"
                    );
                    checkedTables[i].tableName = $scope.table[i].getAttribute(
                      "data-tableName"
                    );
                    checkedTables[i].maxPeopleNum = $scope.table[
                      i
                    ].getAttribute("data-maxPeopleNum");
                    checkedTables[i].resvOrder = $scope.table[i].getAttribute(
                      "data-resvOrder"
                    );
                  }
                  $scope.unlockData = {
                    businessId: $scope.info.businessId,
                    appUserId: $scope.info.id,
                    businessName: $scope.info.businessName,
                    appUserName: $scope.info.surname,
                    appUserPhone: $scope.info.username,
                    resvDate: $scope.dateString,
                    mealTypeId: $scope.mealTypeId,
                    mealTypeIdA: $scope.mealTypeIdA,
                    mealTypeIdB: $scope.mealTypeIdB,
                    mealTypeName: $scope.meal,
                    remark: $scope.table[0].getAttribute("data-remark"),
                    checkedTables: checkedTables
                  };
                  $scope.showLoading();
                  $operation.unlock(
                    $scope.unlockData,
                    $scope.operationSuccess.unlock,
                    $scope.error
                  );
                }
              }
            ]
          });
        } else if (
          txt == "换桌" &&
          checkTableOrders($scope.table, 1) &&
          $scope.table.length == 1 &&
          ($scope.huanzuo || ($scope.canSubmit && $scope.huanzhuoSubmit))
        ) {
          if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            $scope.changeSFun = function() {
              if (
                $scope.chooseOrders.length == 0 &&
                $scope.isTableOrdersMuti()
              ) {
                $scope.showAlert("请选择一笔订单");
                $scope.myPopup();
                return false;
              }
              if (
                !checkOrdersAppuser($scope.table, $scope.info.id) &&
                $scope.canSubmit
              ) {
                $showAlert.alert("不可换桌该订单");
                return;
              }
              if (!$scope.canSubmit) {
                var confirmPopup = $ionicPopup.confirm({
                  cssClass: "er-popup",
                  title: $T.T("易订"),
                  template: $T.T("确认要换桌吗"),
                  buttons: [
                    { text: $T.T("取消") },
                    {
                      text: $T.T("确认"),
                      type: "button-assertive",
                      onTap: function() {
                        $scope.changeSeat = true;
                        $scope.showAlert("请选择你要换桌的时间、班次、桌位");
                      }
                    }
                  ]
                });
              } else {
                var orderInfo =
                  $scope.chooseOrders.length > 0
                    ? $scope.chooseOrders[0]
                    : $scope.table[0];
                if (
                  orderInfo.getAttribute("data-appuserid") != $scope.info.id
                ) {
                  $showAlert.alert("您无权交换此桌");
                  return;
                }
                $scope.newDate = $scope.dateString;
                $scope.newMeal = {};
                $scope.mealTypes.map(item => {
                  if (item.mealTypeName == $scope.meal) {
                    $scope.newMeal = item;
                  }
                });
                var changePopup = $ionicPopup.show({
                  cssClass: "er-popup",
                  template: `<div style="margin-bottom:10px">{{'是否提交换桌申请'|T}}</div><div class="row" style="padding:0"><label style="margin-bottom:10px;">{{'请选择要换桌的时间、班次'|T}}</label><div class="icon icon-select" ng-click="openDatePicker()">{{newDate}}</div><div class="icon icon-select" style="margin-left:10px;"><select style="border:none;background:#fff;direction: rtl;
                padding: 0;" ng-model="newMeal" ng-options="item.mealTypeName for item in mealTypes" ng-change="changeNewMeal(newMeal)"></select></div>`,
                  title: $T.T("易订"),
                  scope: $scope,
                  buttons: [
                    { text: $T.T("取消") },
                    {
                      text: `<b>${$T.T("确认")}</b>`,
                      type: "button-assertive",
                      onTap: function() {
                        console.log("换桌申请");
                        var a =
                          new Date().getHours() * 60 +
                          new Date().getMinutes() * 1;
                        var b =
                          $scope.newMeal.resvEndTime.slice(0, 2) * 60 +
                          $scope.newMeal.resvEndTime.slice(3) * 1;
                        if (
                          $scope.newDate == $scope.compareTime() &&
                          a < sessionStorage["lastMealEndTime"] * 1 &&
                          sessionStorage["lastMealEndTime"] < 6 * 60
                        ) {
                          a += a + 24 * 60;
                        }
                        if (
                          $scope.newDate == $scope.compareTime() &&
                          a > b &&
                          $scope.isKuaTian != 1
                        ) {
                          $showAlert.alert("该餐次已经停止预订");
                          changePopup.show();
                        } else if ($scope.newDate < $scope.compareTime()) {
                          $showAlert.alert("历史订单无法进行该操作");
                          changePopup.show();
                        } else {
                          var checkedResvOrder = orderInfo.getAttribute(
                            "data-resvOrder"
                          );
                          console.log($scope.newMeal);
                          $operation.handleOrderSubmit(
                            {
                              resvOrder: checkedResvOrder,
                              submitStatus: 3,
                              resvDate: $scope.newDate,
                              mealTypeId:
                                $scope.newMeal.id || $scope.newMeal.mealTypeId,
                              mealTypeIdA: $scope.newMeal.mealTypeIdA || "",
                              mealTypeIdB: $scope.newMeal.mealTypeIdB || "",
                              mealTypeName: $scope.newMeal.mealTypeName
                            },
                            function(data) {
                              if (data.msgCode == 0) {
                                $showAlert.alert("换桌申请已提交");
                              } else {
                                $showAlert.alert(
                                  data.msgMessage || "提交申请失败"
                                );
                              }
                            },
                            $scope.error
                          );
                        }
                      }
                    }
                  ]
                });
              }
            };
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 0);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要换座的订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.changeSFun();
                    }
                  }
                ]
              });
            } else {
              $scope.changeSFun();
            }
          } else {
            $scope.showAlert("您无权交换此桌");
          }
        } else if (
          txt == "加桌" &&
          (checkTableOrders($scope.table, 1) ||
            checkTableOrders($scope.table, 2)) &&
          $scope.table.length == 1
        ) {
          if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            $scope.addSFun = function() {
              if (
                $scope.chooseOrders.length == 0 &&
                $scope.isTableOrdersMuti()
              ) {
                $scope.showAlert("请选择一笔订单");
                $scope.myPopup();
                return false;
              }
              if (
                !checkOrdersAppuser($scope.table, $scope.info.id) &&
                $scope.canSubmit
              ) {
                $showAlert.alert("不可加桌该订单");
                return;
              }
              if (!$scope.canSubmit) {
                var confirmPopup = $ionicPopup.confirm({
                  cssClass: "er-popup",
                  title: $T.T("易订"),
                  template: $T.T("确认要加桌吗"),
                  buttons: [
                    { text: $T.T("取消") },
                    {
                      text: $T.T("确认"),
                      type: "button-assertive",
                      onTap: function() {
                        $scope.addSeat = true;
                        $scope.showAlert("请选择你要加桌的桌位");
                      }
                    }
                  ]
                });
              } else {
                var orderInfo =
                  $scope.chooseOrders.length > 0
                    ? $scope.chooseOrders[0]
                    : $scope.table[0];
                var addPopup = $ionicPopup.show({
                  cssClass: "er-popup",
                  template: `<div style="margin-bottom:10px">{{'是否提交加桌申请'|T}}</div><div class="row" style="padding:0"><label>{{'加桌桌数'|T}}</label><input class="col" type="text" ng-model="data.addTableNum" style="background: #f6f6f6; padding: 0px 10px;margin-left:10px;" /></div>`,
                  title: $T.T("易订"),
                  scope: $scope,
                  buttons: [
                    { text: $T.T("取消") },
                    {
                      text: `<b>${$T.T("确认")}</b>`,
                      type: "button-assertive",
                      onTap: function() {
                        console.log("加桌申请");
                        var checkedResvOrder = orderInfo.getAttribute(
                          "data-resvOrder"
                        );
                        if (!(parseInt($scope.data.addTableNum) > 0)) {
                          $scope.data.addTableNum = "";
                          $showAlert.alert("桌数必须为数字且大于0");
                          addPopup.show();
                          return;
                        }
                        var addData = {
                          resvOrder: checkedResvOrder,
                          submitStatus: 2,
                          addTableNum: $scope.data.addTableNum
                        };
                        $operation.handleOrderSubmit(
                          addData,
                          function(data) {
                            if (data.msgCode == 0) {
                              $showAlert.alert("加桌申请已提交");
                            } else {
                              $showAlert.alert(
                                data.msgMessage || "提交申请失败"
                              );
                            }
                          },
                          $scope.error
                        );
                      }
                    }
                  ]
                });
              }
            };
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 1);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要加座的订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.addSFun();
                    }
                  }
                ]
              });
            } else {
              $scope.addSFun();
            }
          } else {
            $scope.showAlert("您无权对此桌加桌");
          }
        } else if (txt == "确认" && checkTableOrders($scope.table, 1)) {
          $scope.confirmFun = function() {
            if ($scope.chooseOrders.length == 0 && $scope.isTableOrdersMuti()) {
              $scope.showAlert("请选择一笔订单");
              $scope.myPopup();
              return false;
            }
            if ($scope.myPopup) {
              $scope.myPopup.close();
            }
            $scope.confirmData = {};
            var checkedTables = [];
            if ($scope.chooseOrders.length > 0) {
              for (var i = 0; i < $scope.chooseOrders.length; i++) {
                checkedTables[i] = {};
                checkedTables[i].tableAreaId = $scope.chooseOrders[
                  i
                ].getAttribute("data-tableAreaId");
                checkedTables[i].tableAreaName = $scope.chooseOrders[
                  i
                ].getAttribute("data-tableAreaName");
                checkedTables[i].tableId = $scope.chooseOrders[i].getAttribute(
                  "data-seat"
                );
                checkedTables[i].tableName = $scope.chooseOrders[
                  i
                ].getAttribute("data-tableName");
                checkedTables[i].resvOrder = $scope.chooseOrders[
                  i
                ].getAttribute("data-resvOrder");
                checkedTables[i].maxPeopleNum = $scope.chooseOrders[
                  i
                ].getAttribute("data-maxPeopleNum");
              }
            } else {
              for (var i = 0; i < $scope.table.length; i++) {
                checkedTables[i] = {};
                checkedTables[i].tableAreaId = $scope.table[i].getAttribute(
                  "data-tableAreaId"
                );
                checkedTables[i].tableAreaName = $scope.table[i].getAttribute(
                  "data-tableAreaName"
                );
                checkedTables[i].tableId = $scope.table[i].getAttribute(
                  "data-seat"
                );
                checkedTables[i].tableName = $scope.table[i].getAttribute(
                  "data-tableName"
                );
                checkedTables[i].maxPeopleNum = $scope.table[i].getAttribute(
                  "data-maxPeopleNum"
                );
                checkedTables[i].resvOrder = $scope.table[i].getAttribute(
                  "data-resvOrder"
                );
              }
            }
            $scope.confirmData.resvOrderType = $scope.table[0].getAttribute(
              "data-resvOrderType"
            );
            var confirm = $scope.table[0].getAttribute("data-confirm");
            if (confirm == 0) {
              confirm = 1;
            } else if (confirm == 1) {
              confirm = 2;
            } else {
              confirm = 3;
            }
            $scope.confirmData.confirm = confirm;
            $scope.confirmData.status = $scope.table[0].getAttribute(
              "data-state"
            );
            $scope.confirmData.isSendConfirmSms = $scope.table[0].getAttribute(
              "data-isSendConfirmSms"
            );
            $scope.confirmData.appUserId = $scope.info.id;
            $scope.confirmData.businessId = $scope.info.businessId;
            $scope.confirmData.businessName = $scope.info.businessName;
            $scope.confirmData.appUsername = $scope.info.surname;
            $scope.confirmData.appUserphone = $scope.info.username;
            $scope.confirmData.checkedTables = checkedTables;
            $scope.showLoading();
            $operation.confirm(
              $scope.confirmData,
              $scope.operationSuccess.confirm,
              $scope.error
            );
          };
          if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 2);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要确认的订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.confirmFun();
                    }
                  }
                ]
              });
            } else {
              $scope.confirmFun();
            }
          } else {
            $scope.showAlert("您无权确认此桌");
          }
        } else if (txt == "切换酒店") {
          $operation.getHotel(
            $scope.info.id,
            $scope.operationSuccess.getHotelList,
            $scope.error
          );
        } else if (txt == "结账" && checkTableOrders($scope.table, 2)) {
          $scope.payInfo = function() {
            if ($scope.chooseOrders.length == 0 && $scope.isTableOrdersMuti()) {
              $scope.showAlert("请选择一笔订单");
              $scope.myPopup();
              return false;
            }
            if ($scope.myPopup) {
              $scope.myPopup.close();
            }
            $scope.payInfoData = {};
            if ($scope.chooseOrders.length > 1 || $scope.table.length > 1) {
              $scope.showAlert("只能选择一笔订单进行结账");
              return;
            } else {
              if ($scope.chooseOrders.length > 0) {
                $scope.payInfoData.tableId = $scope.chooseOrders[0].getAttribute(
                  "data-seat"
                );
              } else {
                $scope.payInfoData.tableId = $scope.table[0].getAttribute(
                  "data-seat"
                );
              }
            }
            $scope.payInfoData.businessId = $scope.info.businessId;
            $scope.showLoading();
            $operation.payInfo(
              $scope.payInfoData,
              $scope.payInfoSuccess,
              $scope.error
            );
          };
          if (
            $scope.info.operationType == 1 ||
            checkOrdersAppuser($scope.table, $scope.info.id)
          ) {
            if ($scope.isTableOrdersMuti()) {
              var htmlDom = "";
              $scope.alltableorders.map(function(item) {
                htmlDom += $scope.orderHtml(item, 2);
              });
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: htmlDom,
                title: $T.T("请选择要结账的订单"),
                scope: $scope,
                buttons: [
                  { text: $T.T("取消") },
                  {
                    text: `<b>${$T.T("确认")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      $scope.payInfo();
                    }
                  }
                ]
              });
            } else {
              $scope.payInfo();
            }
          } else {
            $scope.showAlert("您无权对此桌结账");
          }
        } else {
          $scope.showAlert("无法执行此操作");
        }
      }
    };
    $scope.payInfoSuccess = function(data) {
      if (data && data.code == 200) {
        $scope.billInfo = {};
        $scope.billInfo.title = $scope.info.businessName + "结账单";
        $scope.billInfo.resvDate = $scope.dateString;
        $scope.billInfo.resvWeekDay =
          $scope.weekday[
            new Date($scope.dateString.replace(/-/g, "/")).getDay()
          ];
        $scope.billInfo.mealTypeName = $scope.meal;
        $scope.billInfo.billTotal = data.data.billTotal;
        $scope.billInfo.peopleNumber = data.data.peopleNumber;
        $scope.billInfo.resvNum = $scope.table[0].getAttribute("data-resvNum");
        $scope.billInfo.tableName = $scope.table[0].getAttribute(
          "data-tableName"
        );
        $scope.billInfo.billList = data.data.detailList;
        $scope.billInfo.remark =
          "您的专属管家：" + $scope.info.surname + " " + $scope.info.username;
        $scope.billInfo.businessName = $scope.info.businessName;
        $scope.billList = [];
        $scope.billInfo.goodsSumNum = 0;
        $scope.billInfo.waiterOrderCode = data.data.waiterOrderCode;
        $scope.billList = data.data.detailList;
        if (data.data.detailList) {
          for (var i = 0; i < $scope.billList.length; i++) {
            $scope.billInfo.goodsSumNum += Number(
              $scope.billList[i].goodsNumber
            );
          }
        }
        $scope.showBill = true;
      } else {
        if (data && data.msg) {
          $scope.showAlert(data.msg);
        } else {
          $scope.showAlert("获取账单错误");
        }
      }
      $ionicLoading.hide();
    };
    $scope.cancelPay = function() {
      $scope.showBill = false;
    };
    $scope.payForTable = function() {
      $scope.payData = {};
      $scope.payData.businessId = $scope.info.businessId;
      $scope.payData.type = "1";
      $scope.payData.keyWord = $scope.billInfo.waiterOrderCode.trim();
      $scope.payData.resvOrder = $scope.table[0].getAttribute("data-resvOrder");
      $scope.payData.tableId = $scope.table[0].getAttribute("data-seat");
      $scope.payData.appUserId = $scope.info.id;
      $scope.showLoading();
      $operation.payOrStore(
        $scope.payData,
        $scope.payOrStoreSuccess,
        $scope.error
      );
    };
    $scope.payOrStoreSuccess = function(data) {
      $ionicLoading.hide();
      if (data && data.code == 200) {
        window.location.href = data.data.url;
      } else {
        if (data && data.msg) {
          $scope.showAlert(data.msg);
        } else {
          $scope.showAlert("买单失败，请重试");
        }
      }
    };
    $scope.weixinImg = function() {
      var dom = document.getElementById("shareImgCon");
      var width = dom.clientWidth || dom.offsetWidth;
      html2canvas(dom, {
        windowHeight: dom.scrollHeight,
        height: dom.scrollHeight,
        width: width,
        scale: 2
      }).then(function(canvas) {
        // 缩略图
        html2canvas(dom, {
          windowHeight: dom.scrollHeight,
          height: dom.scrollHeight,
          width: width,
          scale: 1
        }).then(function(thumbCanvas) {
          canvas.style.width = width;
          canvas.style.height = dom.scrollHeight;
          var img = canvas.toDataURL("image/jpeg", 0.5);
          var thumb = thumbCanvas.toDataURL("image/jpeg", 0.2);
          wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
              var winWidth =
                document.body.clientWidth || document.body.offsetWidth;
              $qupload
                .upload({
                  key: "",
                  file: $scope.dataURLtoFile(
                    img,
                    "yidingdd" + $scope.resvOrder
                  ),
                  token: $scope.uploadToken
                })
                .then(function(res2) {
                  console.log(res2);
                  var postData = {
                    username: $scope.info.username,
                    width: winWidth,
                    height:
                      (Number(dom.scrollHeight) * winWidth) / Number(width),
                    imgUrl: "http://qiniuyun8.zhidianfan.com/" + res2.hash
                  };
                  wx.miniProgram.postMessage({ data: postData });
                  wx.miniProgram.navigateTo({
                    url:
                      "../empty/index?imgUrl=" +
                      encodeURIComponent(postData.imgUrl) +
                      "&username=" +
                      postData.username +
                      "&width=" +
                      postData.width +
                      "&height=" +
                      postData.height
                  });
                });
            }
          });
          Wechat.isInstalled(
            function(installed) {
              Wechat.share(
                {
                  message: {
                    title: "易订",
                    description: "菜单分享",
                    thumb: thumb,
                    media: {
                      type: Wechat.Type.IMAGE,
                      image: img
                    }
                  },
                  scene: 0 // share to Timeline
                },
                function() {
                  $showAlert.alert("分享成功");
                },
                function(reason) {
                  $showAlert.alert(`${$T.T("失败")}: ` + reason);
                }
              );
            },
            function(reason) {
              $showAlert.alert(`${$T.T("失败")}: ` + reason);
            }
          );
        });
      });
    };
    $scope.dataURLtoFile = function(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };
    $scope.operationSuccess = {
      confirm: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
      },
      lock: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
        $scope.data.lock = "";
      },
      unlock: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
      },
      seat: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
      },
      unBook: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
      },
      mvp: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
      },
      changeSeat: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
        $scope.changeSeat = false;
      },
      addSeat: function(data) {
        $scope.showAlert(data.msgMessage);
        $scope.seatData.page = 1;
        $scope.getSeat();
        $scope.addSeat = false;
        $ionicLoading.hide();
      },
      getHotelList: function(data) {
        $scope.hotelList = data;
        var myPopup = $ionicPopup.show({
          cssClass: "er-popup",
          template: `<button class="button button-assertive button-block" ng-repeat="hotel in hotelList" ng-click="changeHotel($event)" data-typeId={{hotel.typeId}} data-businessName={{hotel.businessName}} data-businessId={{hotel.businessId}}>{{hotel.businessName}}</button>`,
          title: $T.T("切换酒店"),
          scope: $scope,
          buttons: [
            {
              text: $T.T("取消"),
              type: "button-positive"
            }
          ]
        });
        $scope.changeHotel = function($event) {
          var button = $event.target;
          $scope.changeHotelData = {
            appUserId: $scope.info.id,
            businessId: button.getAttribute("data-businessId"),
            businessName: button.getAttribute("data-businessName"),
            typeId: button.getAttribute("data-typeId")
          };
          myPopup.close();
          $operation.changeHotel(
            $scope.changeHotelData,
            $scope.operationSuccess.changeHotel,
            $scope.error
          );
          console.log(button.getAttribute("data-businessName"));
        };
      },
      changeHotel: function(data) {
        $scope.showLoading();
        $scope.loginData = JSON.parse(localStorage["loginData"]);
        $operation.getPassword(
          localStorage["TOKEN_KEY"],
          $scope.operationSuccess.getPassword,
          $scope.error
        );
        $scope.showAlert(data.msgMessage);
      },
      getPassword: function(data) {
        localStorage["TOKEN_KEY"] = data.token;
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: data.token
          }
        };
        $http
          .get("https://phone.zhidianfan.com:9091" + "/user", config)
          .success(function(data) {
            localStorage.setItem("info", JSON.stringify(data));
            sessionStorage["mealTypeId"] = null;
            $scope.loading = 0;
            $ionicLoading.hide();
            $state.go("tab.dash");
          });
      }
    };
    $scope.changeNewMeal = function(obj) {
      $scope.newMeal = obj;
    };
    $scope.openDatePicker = function(num) {
      var timePicker = $scope.newIpObj(num);
      ionicDatePicker.openDatePicker(timePicker);
    };
    $scope.newIpObj = function(num) {
      localStorage["scrollTop1"] = 0;
      var ipObj1 = {
        callback: function(date) {
          //Mandatory
          $scope.newDate = freshTime(date);
          console.log($scope.newDate);
        },
        from: new Date(1900, 1, 1), //Optional
        to: new Date(2100, 12, 31), //Optional
        weeksList: ["日", "一", "二", "三", "四", "五", "六"],
        inputDate: new Date(), //Optional
        mondayFirst: false, //Optional
        closeOnSelect: true, //Optional
        templateType: "popup", //Optional
        dateFormat: "yyyy-MM-dd"
      };
      return ipObj1;
    };
    var state = `<ion-popover-view style="max-height:265px;width:120px;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,1)" data-status="">{{'全部状态'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-status="0">{{'空闲'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-status="1">{{'已预订'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-status="2">{{'已入座'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-status="pei">{{'配菜'|T}}</a>
                     <a class="item text-center" ng-click="choose($event,1)" data-status="que">{{'未确认'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
    var action = `<ion-popover-view style="max-height:242px;width:120px;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a ng-if="tuiding || canSubmit" ng-hide="canSubmit && !tuidingSubmit" class="item text-center" ng-click="choose($event,4)" data-text="退订">{{'退订'|T}}</a>
                     <a ng-if="huanzuo || canSubmit" ng-hide="canSubmit && !huanzhuoSubmit" class="item text-center" ng-click="choose($event,4)" data-text="换桌">{{'换桌'|T}}</a>
                     <a ng-hide="canSubmit && !jiazhuoSubmit" class="item text-center" ng-click="choose($event,4)" data-text="加桌">{{'加桌'|T}}</a>
                     <a ng-if="(seatData.mealTypeId==sessionStorageMealTypeId)&&(seatData.resvDate==sessionStorageDateString)" class="item text-center" ng-click="choose($event,4)" data-text="入座">{{'入座'|T}}</a>
                     <a ng-if="(seatData.mealTypeId==sessionStorageMealTypeId)&&(seatData.resvDate==sessionStorageDateString)&&(isJk == 1)" class="item text-center" ng-click="choose($event,4)" data-text="结账">{{'结账'|T}}</a>
                     <a ng-if="!canSubmit" class="item text-center" ng-click="choose($event,4)" data-text="确认">{{'确认'|T}}</a>
                     <a ng-if="lockAuthority && !canSubmit" class="item text-center" ng-click="choose($event,4)" data-text="锁台">{{'锁台'|T}}</a>
                     <a ng-if="lockAuthority && !canSubmit" class="item text-center" ng-click="choose($event,4)" data-text="解锁">{{'解锁'|T}}</a>
                     <a ng-if="!canSubmit" class="item text-center" ng-click="choose($event,4)" data-text="重要客户">{{'重要客户'|T}}</a>
                     <a ng-if="!canSubmit" class="item text-center" ng-click="choose($event,4)" data-text="取消标记">{{'取消标记'|T}}</a>
                     <a ng-if="changeHotel" class="item text-center" ng-click="choose($event,4)" data-text="切换酒店">{{'切换酒店'|T}}</a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
    $scope.popoverState = $ionicPopover.fromTemplate(state, {
      scope: $scope
    });

    $scope.popoverAction = $ionicPopover.fromTemplate(action, {
      scope: $scope
    });
    $scope.choice = function() {
      $scope.filterShow = !$scope.filterShow;
    };
    $scope.openPopover = function($event, num) {
      if (num == 1) {
        $scope.popoverState.show($event);
      } else if (num == 2) {
        $scope.popoverMeal.show($event);
      } else if (num == 3) {
        $scope.popoverArea.show($event);
      } else if (num == 4) {
        if (
          $scope.table.length != 0 &&
          $scope.table[0].getAttribute("data-isOPer") == 0
        ) {
          $scope.showAlert("您无权操作此桌位");
        } else {
          $scope.popoverAction.show($event);
        }
      }
    };
    $scope.closePopover = function(num) {
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
    $scope.choose = function($event, num) {
      var a = $event.target;
      var txt = a.getAttribute("data-text");
      if (
        $scope.dateString < $scope.compareTime() &&
        (txt == "退订" ||
          txt == "换桌" ||
          txt == "入座" ||
          txt == "确认" ||
          txt == "加桌" ||
          txt == "锁台" ||
          txt == "解锁" ||
          txt == "结账")
      ) {
        $showAlert.alert("历史订单无法进行该操作");
        return;
      }
      var nowTransform = $("#table-scroll .scroll")[0].style.transform;
      var myScrollTop = 0;
      if (nowTransform) {
        var startIndex = nowTransform.indexOf("(") + 1;
        var endIndex = nowTransform.indexOf(")");
        var nowTranslate = nowTransform.substring(startIndex, endIndex);
        var translateArr = nowTransform.split(",");
        myScrollTop = translateArr[1].replace(/-|px/g, "");
      } else {
        myScrollTop = document
          .getElementById("table-scroll")
          .getElementsByClassName("scroll")[0].scrollTop;
      }
      console.log("---------------------------------" + myScrollTop);
      localStorage["scrollTop"] = myScrollTop;
      change($event, num);
    };
    ////////////////////////////////////////////////////////////////日期弹出////
    //这是不可选的日期列表
    $scope.showCalender = function() {
      $scope.calender = true;
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
    };
    $scope.hideCalender = function($event) {
      var id = $event.target.getAttribute("data-id");
      $scope.dateList[id].color = "red";
      if ($event.target.getAttribute("data-date") != "") {
        $scope.calender = false;
        //var txt=$scope.dateYear+','+($scope.dateMonth+1)+','+$event.target.getAttribute('data-date');
        var date =
          new Date(
            $scope.dateYear * 1,
            $scope.dateMonth * 1,
            $event.target.getAttribute("data-date") * 1
          ).getTime() *
            1 +
          1;
        var oldTime = $scope.dateString;
        $scope.showDate = date;
        $scope.seatDataFor.showDate = $scope.showDate;
        $scope.dateString = freshTime();
        $scope.fencanbie(oldTime, $scope.dateString);
        $scope.showLoading();
        $scope.seatData.resvDate = $scope.dateString;
        $scope.seatDataFor.resvDate = $scope.dateString;
        $scope.seatData.page = 1;
        $scope.getSeat();
      }
    };
    $scope.addYear = function() {
      $scope.dateYear += 1;
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
    };
    $scope.minusYear = function() {
      if (
        $scope.dateYear == $scope.getMealDate().getFullYear() ||
        ($scope.dateYear == $scope.getMealDate().getFullYear() + 1 &&
          $scope.dateMonth < $scope.getMealDate().getMonth())
      ) {
        $scope.dateYear -= 1;
        $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
        // console.log('不能减小了');
      } else {
        $scope.dateYear -= 1;
        $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
      }
    };
    $scope.addMonth = function() {
      if ($scope.dateMonth == 11) {
        $scope.dateMonth = 0;
        $scope.dateYear += 1;
      } else {
        $scope.dateMonth += 1;
      }
      $scope.dateList = $calendar.drawCld($scope.dateYear, $scope.dateMonth);
    };
    $scope.minusMonth = function() {
      if (
        $scope.dateYear == $scope.todayTime.getFullYear() &&
        $scope.dateMonth == $scope.todayTime.getMonth()
      ) {
        console.log("不能减小了");
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
    $scope.dateCancel = function() {
      $scope.calender = false;
    };
    $scope.dateToday = function() {
      $scope.seatData.page = 1;
      $scope.calender = false;
      $scope.dateYear = $scope.getMealDate().getFullYear();
      $scope.dateMonth = $scope.getMealDate().getMonth();
      //$scope.dateList=$calendar.drawCld($scope.dateYear,$scope.dateMonth);
      var oldTime = $scope.dateString;
      $scope.showDate = $scope.getMealDate().getTime();
      $scope.seatDataFor.showDate = $scope.showDate;
      $scope.dateString = freshTime();
      $scope.fencanbie(oldTime, $scope.dateString);
      $scope.showLoading();
      $scope.seatData.resvDate = $scope.dateString;
      $scope.seatDataFor.resvDate = $scope.dateString;
      $scope.getSeat();
    };
    $scope.left = function() {
      localStorage["scrollTop"] = 0;
      console.log("left");
      $scope.seatData.page = 1;
      var oldTime = $scope.dateString;
      $scope.showDate += 86400000;
      $scope.dateString = freshTime();
      $scope.fencanbie(oldTime, $scope.dateString);
      $scope.showLoading();
      $scope.seatData.resvDate = $scope.dateString;
      $scope.seatDataFor.resvDate = $scope.dateString;
      $scope.seatDataFor.showDate = $scope.showDate;
      $scope.getSeat();
    };
    $scope.fencanbie = function(dateString1, dateString2) {
      var str = sessionStorage["usdingDate"];
      if ($scope.info.fcb == true) {
        var mtb = [];
        var mtc = JSON.parse(sessionStorage["mealTypes"]);
        for (var a = 0; a < mtc.length; a++) {
          if (
            mtc[a].bandEndTime &&
            mtc[a].usingDate.indexOf(dateString2) != -1
          ) {
            var mealStart =
              mtc[a].resvStartTime.slice(0, 2) * 60 +
              mtc[a].resvStartTime.slice(3) * 1;
            var mealBand =
              mtc[a].bandEndTime.slice(0, 2) * 60 +
              mtc[a].bandEndTime.slice(3) * 1;
            var mealTypeSecondDaySign = 0;
            if (mealStart > mealBand) {
              mealTypeSecondDaySign = 1;
            }
            var c = {};
            c.mealTypeName = mtc[a].mealTypeNameA;
            c.mealTypeId = mtc[a].id;
            c.mealTypeIdA = mtc[a].mealTypeIdA;
            c.mealTypeIdB = "";
            c.resvStartTime = mtc[a].resvStartTime;
            c.resvEndTime = mtc[a].bandEndTime;
            c.mealTypeSecondDaySign = mealTypeSecondDaySign;
            mtb.push(c);
            var d = {};
            d.mealTypeName = mtc[a].mealTypeNameB;
            d.mealTypeId = mtc[a].id;
            d.mealTypeIdA = "";
            d.mealTypeIdB = mtc[a].mealTypeIdB;
            d.resvStartTime = mtc[a].bandEndTime;
            d.resvEndTime = mtc[a].resvEndTime;
            d.mealTypeSecondDaySign = mtc[a].mealTypeSecondDaySign == 1 ? 1 : 0;
            mtb.push(d);
          } else {
            mtc[a].mealTypeIdB = "";
            mtc[a].mealTypeIdA = "";
            mtc[a].mealTypeId = mtc[a].id;
            mtb.push(mtc[a]);
          }
        }
        if (str.indexOf(dateString1) == -1) {
          if (str.indexOf(dateString2) == -1) {
            console.log("两天都不跨餐别");
          } else if (str.indexOf(dateString2) != -1) {
            console.log("今天没跨明天跨了");
            $scope.mealTypes = mtb;
            var mealTypesLength = $scope.mealTypes.length * 53;
            var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,2)"
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
            for (var i = 0; i < mtb.length; i++) {
              console.log(mtb);
              if (mtb[i].mealTypeId == $scope.mealTypeId) {
                $scope.meal = mtb[i].mealTypeName;
                $scope.seatDataFor.mealTypeName = $scope.meal;
                $scope.mealTypeIdA = mtb[i].mealTypeIdA;
                $scope.mealTypeIdB = mtb[i].mealTypeIdB;
                $scope.seatData.mealTypeIdA = $scope.mealTypeIdA;
                $scope.seatDataFor.mealTypeIdA = $scope.mealTypeIdA;
                $scope.seatData.mealTypeIdB = $scope.mealTypeIdB;
                $scope.seatDataFor.mealTypeIdB = $scope.mealTypeIdB;
                $scope.resvStartTime = mtb[i].resvStartTime;
                $scope.seatDataFor.resvStartTime = $scope.resvStartTime;
                $scope.resvEndTime = mtb[i].resvEndTime;
                $scope.seatDataFor.resvEndTime = $scope.resvEndTime;
                break;
              }
            }
          }
        } else if (str.indexOf(dateString1) != -1) {
          if (str.indexOf(dateString2) == -1) {
            console.log("今天跨，明天不跨");
            $scope.mealTypes = JSON.parse(sessionStorage["mealTypes"]);
            var mealTypesLength = $scope.mealTypes.length * 53;
            var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,2)"
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
            for (var i = 0; i < mtc.length; i++) {
              if (mtc[i].id == $scope.mealTypeId) {
                $scope.meal = mtc[i].mealTypeName;
                $scope.seatDataFor.mealTypeName = $scope.meal;
                $scope.mealTypeIdA = "";
                $scope.mealTypeIdB = "";
                $scope.seatData.mealTypeIdA = "";
                $scope.seatDataFor.mealTypeIdA = "";
                $scope.seatData.mealTypeIdB = "";
                $scope.seatDataFor.mealTypeIdB = "";
                $scope.resvStartTime = mtc[i].resvStartTime;
                $scope.seatDataFor.resvStartTime = $scope.resvStartTime;
                $scope.resvEndTime = mtc[i].resvEndTime;
                $scope.seatDataFor.resvEndTime = $scope.resvEndTime;
                break;
              }
            }
          } else if (str.indexOf(dateString2) != -1) {
            console.log("今天跨明天也跨");
            $scope.mealTypes = mtb;
            var mealTypesLength = $scope.mealTypes.length * 53;
            var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-click="choose($event,2)"
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
            for (var i = 0; i < mtb.length; i++) {
              if (mtb[i].mealTypeId == $scope.mealTypeId) {
                $scope.meal = mtb[i].mealTypeName;
                $scope.seatDataFor.mealTypeName = $scope.meal;
                $scope.mealTypeIdA = mtb[i].mealTypeIdA;
                $scope.mealTypeIdB = mtb[i].mealTypeIdB;
                $scope.seatData.mealTypeIdA = $scope.mealTypeIdA;
                $scope.seatDataFor.mealTypeIdA = $scope.mealTypeIdA;
                $scope.seatData.mealTypeIdB = $scope.mealTypeIdB;
                $scope.seatDataFor.mealTypeIdB = $scope.mealTypeIdB;
                $scope.resvStartTime = mtb[i].resvStartTime;
                $scope.seatDataFor.resvStartTime = $scope.resvStartTime;
                $scope.resvEndTime = mtb[i].resvEndTime;
                $scope.seatDataFor.resvEndTime = $scope.resvEndTime;
                break;
              }
            }
          }
        }
      }
    };
    $scope.right = function() {
      localStorage["scrollTop"] = 0;
      $scope.seatData.page = 1;
      console.log("right");
      // if (($scope.showDate - 80000000) > $scope.todayTime) {
      var oldTime = $scope.dateString;
      $scope.showDate -= 86400000;
      $scope.dateString = freshTime();
      $scope.fencanbie(oldTime, $scope.dateString);
      $scope.showLoading();
      $scope.seatData.resvDate = $scope.dateString;
      $scope.seatDataFor.resvDate = $scope.dateString;
      $scope.seatDataFor.showDate = $scope.showDate;
      $scope.getSeat();
      // }
    };

    $scope.showPic = function(title, txt) {};
    $scope.nextPic = function() {
      $scope.picId += 1;
      var nextUrl = $scope.seat[$scope.picId].tableUrl;
      $scope.picTitle =
        $scope.seat[$scope.picId].tableAreaName +
        " " +
        $scope.seat[$scope.picId].tableName;
      if (nextUrl == undefined) {
        // $scope.tablePic = 'images/img_nopic@3x.png';
      } else if (nextUrl != "") {
        $scope.tablePic = nextUrl;
      }
    };
    $scope.prePic = function() {
      if ($scope.picId >= 1) {
        $scope.picId -= 1;
        var preUrl = $scope.seat[$scope.picId].tableUrl;
        $scope.picTitle =
          $scope.seat[$scope.picId].tableAreaName +
          " " +
          $scope.seat[$scope.picId].tableName;
        if (preUrl == undefined) {
          // $scope.tablePic = 'images/img_nopic@3x.png';
        } else if (preUrl != "") {
          $scope.tablePic = preUrl;
        }
      }
    };
    $scope.showSeat = function($event) {
      var title =
        $event.target.getAttribute("data-tableAreaName") +
        " " +
        $event.target.getAttribute("data-tableName");
      var url = $event.target.getAttribute("data-picUrl");
      var id = $event.target.getAttribute("data-picId");
      if (url == "") {
        // url = 'images/img_nopic@3x.png';
      }
      $scope.tableUrl = url;
      // if (url != '') {
      $scope.showModal = true;
      $scope.tablePic = url;
      $scope.device = "";
      $scope.sofa = $event.target.getAttribute("data-sofa");
      $scope.washroom = $event.target.getAttribute("data-washroom");
      $scope.television = $event.target.getAttribute("data-television");
      $scope.isLockerRoom = $event.target.getAttribute("data-islockerroom");
      if ($scope.sofa == 1) {
        $scope.device += "沙发、";
      }
      if ($scope.washroom == 1) {
        $scope.device += "独卫、";
      }
      if ($scope.television == 1) {
        $scope.device += "电视、";
      }
      if ($scope.isLockerRoom == 1) {
        $scope.device += "可做试衣间、";
      }
      if ($scope.device == "") {
        $scope.device = "无";
      } else {
        $scope.device = $scope.device.substr(0, $scope.device.length - 1);
      }
      $scope.roomArea = $event.target.getAttribute("data-roomArea") + "m²";
      $scope.floorHeight =
        $event.target.getAttribute("data-floorHeight") == 0
          ? false
          : $event.target.getAttribute("data-floorHeight");
      $scope.picTitle = title;
      $scope.picId = id * 1;
      $scope.tableId = $event.target.getAttribute("data-seat");
      $scope.tableName = $event.target.getAttribute("data-tablename");
      $scope.maxPeopleNum = $event.target.getAttribute("data-maxpeoplenum");
      $scope.maxTableNum = $event.target.getAttribute("data-maxTableNum");
      $scope.minAmount =
        $event.target.getAttribute("data-minamount") == ""
          ? "无"
          : $event.target.getAttribute("data-minamount");
      $scope.tableRemark =
        $event.target.getAttribute("data-tableremark") == ""
          ? "无"
          : $event.target.getAttribute("data-tableremark");
      $scope.tType = $event.target.getAttribute("data-ttype");
      $scope.tTypeId = $event.target.getAttribute("data-ttype");
      if ($scope.tType == 0) {
        $scope.tType = "包厢";
      } else if ($scope.tType == 1) {
        $scope.tType = "散台";
      } else {
        $scope.tType = "卡座";
      }
      // }
    };
    $scope.hideModal = function() {
      $scope.showModal = false;
    };
    //////////////////////////////////////////////////////////所选桌位的翻台订单是否有连台
    $scope.batchNoCheck = function(batchNos, orders) {
      if (orders[0]) {
        for (var i = 0; i < orders.length; i++) {
          var batchno = orders[i].batchNo;
          if ($.inArray(batchno, batchNos) != -1) {
            return true;
          }
        }
        return false;
      } else {
        if (batchNos.length == 0) {
          return true;
        }
        return false;
      }
    };
    /////////////////////////////////////////////////////////////////选中状态变换
    $scope.seatDetail = [];
    $scope.selected = function($event) {
      var img = $event.target;

      var thistableArr = [];
      thistableArr.push(img);
      // if($scope.canSubmit){
      //   $showAlert.alert('不可选择桌位，请直接提交订单');
      //   return
      // }
      // if ($scope.dateString < $scope.compareTime()) {

      //   // $state.go('tab.dash');
      //   // $showAlert.alert('桌位信息已失效，请重新获取');
      // }
      if (!$scope.changeSeat && !$scope.addSeat) {
        if (img.getAttribute("data-select") == "1") {
          img.style.border = "";
          // img.style.borderRadius = 0;
          img.setAttribute("data-select", "0");
          var i = $scope.table.indexOf(img, 0);
          $scope.table.splice(i, 1);
        } else if ($scope.table[0] != null) {
          var num = $scope.table[0].getAttribute("data-state");
          var batch = $scope.table[0].getAttribute("data-batchNo");
          var state = img.getAttribute("data-state");
          var batchNo = img.getAttribute("data-batchNo");
          var oper = img.getAttribute("data-isOper");
          img.setAttribute("data-select", "1");
          img.style.border = "2px solid #DB4F3B";
          // img.style.borderRadius = "4px";
          var canchoose = false;
          if ($scope.canFT) {
            var orders = img.getAttribute("data-orders")
              ? JSON.parse(img.getAttribute("data-orders"))
              : [];
            var batchNoArr = [],
              repeatBatchNoArr = [],
              new_arr = [];
            $scope.table.map(function(table) {
              var tableorders = table.getAttribute("data-orders")
                ? JSON.parse(table.getAttribute("data-orders"))
                : [];
              tableorders.map(function(order) {
                batchNoArr.push(order.batchNo);
              });
            });
            for (var i = 0; i < batchNoArr.length; i++) {
              var items = batchNoArr[i];
              if ($.inArray(items, new_arr) == -1) {
                new_arr.push(items);
              } else {
                repeatBatchNoArr.push(items);
              }
            }
            if ($scope.table.length == 1) {
              repeatBatchNoArr = batchNoArr;
            }
            console.log(repeatBatchNoArr);
            canchoose = $scope.batchNoCheck(repeatBatchNoArr, orders);
          } else {
            if (num == state && batch == batchNo) {
              canchoose = true;
            }
          }
          if (
            canchoose &&
            oper >= 1 &&
            $scope.table[0].getAttribute("data-isOper") >= 1
          ) {
            $scope.table.push(img);
          } else {
            for (var i = 0; i < $scope.table.length; i++) {
              var image = $scope.table[i];
              image.style.border = "";
              image.setAttribute("data-select", "0");
            }
            $scope.table = [];
            $scope.table.push(img);
          }
        } else {
          img.setAttribute("data-select", "1");
          img.style.border = "2px solid #DB4F3B";
          // img.style.borderRadius = "4px";
          $scope.table.push(img);
        }
      } else if ($scope.addSeat) {
        if (
          (img.getAttribute("data-state") != 0 && !$scope.canFT) ||
          img.getAttribute("data-state") == 5 ||
          img.getAttribute("data-isOper") == 0
        ) {
          var confirmPopup = $ionicPopup.confirm({
            cssClass: "er-popup",
            title: $T.T("易订"),
            template: $T.T("此桌无法加桌"),
            buttons: [
              { text: $T.T("确认") },
              {
                text: $T.T("取消加桌"),
                type: "button-assertive",
                onTap: function() {
                  $scope.showLoading();
                  $scope.seatData.page = 1;
                  $scope.getSeat();
                  $scope.addSeat = false;
                }
              }
            ]
          });
        } else {
          var tableId = img.getAttribute("data-seat");
          var resvOrder = $scope.table[0].getAttribute("data-resvOrder");
          var batchNo = $scope.table[0].getAttribute("data-batchNo");
          var tableAreaName = $scope.table[0].getAttribute(
            "data-tableAreaName"
          );
          var tableAreaId = $scope.table[0].getAttribute("data-tableAreaId");
          var tableName = img.getAttribute("data-tableName");
          var state = img.getAttribute("data-state");
          var data = {
            tableId: tableId,
            tableName: tableName,
            tableAreaId: tableAreaId,
            tableAreaName: tableAreaName,
            batchNo: batchNo,
            resvOrder: resvOrder,
            businessId: $scope.info.businessId,
            appUserName: $scope.info.surname,
            appUserId: $scope.info.id,
            appUserPhone: $scope.info.username,
            isTableTurnover: JSON.parse(localStorage.getItem("info"))
              .isTableTurnover,
            destTime: JSON.parse($scope.table[0].getAttribute("data-orders"))[0]
              .destTime
          };
          if ($scope.chooseOrders.length > 0) {
            data.batchNo = $scope.chooseOrders[0].getAttribute("data-batchNo");
            data.resvOrder = $scope.chooseOrders[0].getAttribute(
              "data-resvOrder"
            );
            data.destTime = $scope.chooseOrders[0].getAttribute(
              "data-destTime"
            );
          }
          var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
          var b =
            $scope.resvEndTime.slice(0, 2) * 60 +
            $scope.resvEndTime.slice(3) * 1;
          if (!$scope.timeInMealTime()) {
            $scope.showAlert("该餐次已经停止预订");
            return;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a < sessionStorage["lastMealEndTime"] * 1 &&
            sessionStorage["lastMealEndTime"] < 6 * 60
          ) {
            a += a + 24 * 60;
          }
          if (
            $scope.dateString == $scope.compareTime() &&
            a > b &&
            $scope.isKuaTian != 1
          ) {
            $scope.showAlert("该餐次已经停止预订");
          } else {
            if (state != 0 && $scope.canFT) {
              var txt = "";
              var orders = img.getAttribute("data-orders")
                ? JSON.parse(img.getAttribute("data-orders"))
                : [];
              var desttime = "";
              if (orders.length > 0) {
                orders.map(function(item) {
                  desttime += item.destTime + ",";
                });
              }
              if (orders.length > 0) {
                txt +=
                  "桌位 " +
                  tableName +
                  " 的 " +
                  desttime.substr(0, desttime.length - 1);
              }
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: `<p>${txt} 已经有预订</p>`,
                title: $T.T("是否继续加桌"),
                scope: $scope,
                buttons: [
                  {
                    text: $T.T("取消加桌"),
                    onTap: function() {
                      $scope.showLoading();
                      $scope.seatData.page = 1;
                      $scope.getSeat();
                      $scope.addSeat = false;
                    }
                  },
                  {
                    text: `<b>${$T.T("继续加桌")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      data.resvDate = $scope.seatData.resvDate;
                      $scope.showLoading();
                      $operation.addSeat(
                        data,
                        $scope.operationSuccess.addSeat,
                        $scope.error
                      );
                    }
                  }
                ]
              });
            } else {
              data.resvDate = $scope.seatData.resvDate;
              $scope.showLoading();
              $operation.addSeat(
                data,
                $scope.operationSuccess.addSeat,
                $scope.error
              );
            }
          }
        }
      } else {
        if (
          (img.getAttribute("data-state") != 0 && !$scope.canFT) ||
          img.getAttribute("data-state") == 5 ||
          img.getAttribute("data-isOper") == 0
        ) {
          var confirmPopup = $ionicPopup.confirm({
            cssClass: "er-popup",
            title: $T.T("易订"),
            template: $T.T("此桌无法换桌"),
            buttons: [
              { text: $T.T("确认") },
              {
                text: $T.T("取消换桌"),
                type: "button-assertive",
                onTap: function() {
                  $scope.showLoading();
                  $scope.seatData.page = 1;
                  $scope.getSeat();
                  $scope.changeSeat = false;
                }
              }
            ]
          });
        } else {
          var changeFun = function() {
            var resvOrder = $scope.table[0].getAttribute("data-resvOrder");
            var tableId = img.getAttribute("data-seat");
            var state = img.getAttribute("data-state");
            var tableName = img.getAttribute("data-tableName");
            var isKbc = $scope.table[0].getAttribute("data-isKbc");
            $scope.changeSeatData = {
              resvOrder: $scope.table[0].getAttribute("data-resvOrder"),
              businessId: $scope.info.businessId,
              appUserId: $scope.info.id,
              isChangeTable: $scope.info.isChangeTable,
              businessName: $scope.info.businessName,
              appUserName: $scope.info.surname,
              appUserPhone: $scope.info.username,
              resvDate: $scope.dateString,
              mealTypeId: $scope.mealTypeId,
              mealTypeIdA: $scope.mealTypeIdA,
              mealTypeIdB: $scope.mealTypeIdB,
              kbc: $scope.info.kbc * 1,
              isKbc: isKbc,
              mealTypeName: $scope.meal,
              tableId: tableId,
              status: $scope.table[0].getAttribute("data-state"),
              resvOrderType: $scope.table[0].getAttribute("data-resvOrderType"),
              maxPeopleNum: $scope.table[0].getAttribute("data-maxPeopleNum"),
              oldTableId: $scope.table[0].getAttribute("data-seat"),
              oldTableName: $scope.table[0].getAttribute("data-tableName"),
              oldTableAreaName: $scope.table[0].getAttribute(
                "data-tableAreaName"
              ),
              oldTableAreaId: $scope.table[0].getAttribute("data-tableAreaId"),
              isTableTurnover: JSON.parse(localStorage.getItem("info"))
                .isTableTurnover,
              destTime: JSON.parse(
                $scope.table[0].getAttribute("data-orders")
              )[0].destTime
            };
            if ($scope.chooseOrders.length > 0) {
              $scope.changeSeatData.resvOrder = $scope.chooseOrders[0].getAttribute(
                "data-resvOrder"
              );
              $scope.changeSeatData.destTime = $scope.chooseOrders[0].getAttribute(
                "data-destTime"
              );
            }
            var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
            var b =
              $scope.resvEndTime.slice(0, 2) * 60 +
              $scope.resvEndTime.slice(3) * 1;
            if (!$scope.timeInMealTime()) {
              $scope.showAlert("该餐次已经停止预订");
              return;
            }
            if (
              $scope.dateString == $scope.compareTime() &&
              a < sessionStorage["lastMealEndTime"] * 1 &&
              sessionStorage["lastMealEndTime"] < 6 * 60
            ) {
              a += a + 24 * 60;
            }
            if (
              $scope.dateString == $scope.compareTime() &&
              a > b &&
              $scope.isKuaTian != 1
            ) {
              $scope.showAlert("该餐次已经停止预订");
            } else if ($scope.dateString < $scope.compareTime()) {
              $showAlert.alert("历史订单无法进行该操作");
            } else if (
              Number(img.getAttribute("data-maxTableNum")) <
              Number($scope.table[0].getAttribute("data-tableNum"))
            ) {
              $showAlert.alert("订单桌数大于包厢最大桌数,无法换桌");
            } else {
              $scope.showLoading();
              $operation.changeSeat(
                $scope.changeSeatData,
                $scope.operationSuccess.changeSeat,
                $scope.error
              );
            }
          };
          if ($scope.canFT) {
            var txt = "";
            var orders = img.getAttribute("data-orders")
              ? JSON.parse(img.getAttribute("data-orders"))
              : [];
            var desttime = "";
            if (orders.length > 0) {
              orders.map(function(item) {
                desttime += item.destTime + ",";
              });
            }
            if (orders.length > 0) {
              txt +=
                "桌位 " +
                img.getAttribute("data-tableName") +
                " 的 " +
                desttime.substr(0, desttime.length - 1);
              $scope.myPopup = $ionicPopup.show({
                cssClass: "er-popup",
                template: `<p>${txt} 已经有预订</p>`,
                title: $T.T("是否继续换桌"),
                scope: $scope,
                buttons: [
                  {
                    text: $T.T("取消换桌"),
                    onTap: function() {
                      $scope.showLoading();
                      $scope.seatData.page = 1;
                      $scope.getSeat();
                      $scope.changeSeat = false;
                    }
                  },
                  {
                    text: `<b>${$T.T("继续换桌")}</b>`,
                    type: "button-assertive",
                    onTap: function() {
                      changeFun();
                    }
                  }
                ]
              });
            } else {
              changeFun();
            }
          } else {
            changeFun();
          }
        }
      }
    };
    $scope.active = function(type, $event) {
      // 桌位状态
      if (type === "status") {
        if (
          $scope.filterData.status === $event.target.getAttribute("data-text")
        ) {
          $scope.filterData.status = "";
        } else {
          $scope.filterData.status = $event.target.getAttribute("data-text");
        }
      }
      // 其他：桌位类型、提供设备
      else {
        $scope.filterData[type] = !$scope.filterData[type];
      }
    };
    $scope.activeNull = function() {
      $scope.filterData = {
        status: "",
        tTypes0: false,
        tTypes1: false,
        tTypes2: false,
        washroom: false,
        television: false,
        sofa: false
      };
      $scope.cData.minPeopleNum = "";
      $scope.cData.maxPeopleNum = "";
      $scope.cData.minAmount = "";
      $scope.cData.maxAmount = "";
    };
    $scope.choiceSubmit = function() {
      var reg = /^\d+$/;
      if (
        ($scope.cData.minPeopleNum != undefined &&
          $scope.cData.minPeopleNum != "" &&
          reg.test($scope.cData.minPeopleNum) == false) ||
        ($scope.cData.maxPeopleNum != undefined &&
          $scope.cData.maxPeopleNum != "" &&
          reg.test($scope.cData.maxPeopleNum) == false)
      ) {
        $showAlert.alert("容纳人数应为数字");
        return;
      }
      if (
        ($scope.cData.minAmount != undefined &&
          $scope.cData.minAmount != "" &&
          reg.test($scope.cData.minAmount) == false) ||
        ($scope.cData.maxAmount != undefined &&
          $scope.cData.maxAmount != "" &&
          reg.test($scope.cData.maxAmount) == false)
      ) {
        $showAlert.alert("最低消费应为数字");
        return;
      }
      $scope.seatData.minPeopleNum = $scope.cData.minPeopleNum;
      $scope.seatData.maxPeopleNum = $scope.cData.maxPeopleNum;
      $scope.seatData.minAmount = $scope.cData.minAmount;
      $scope.seatData.maxAmount = $scope.cData.maxAmount;
      $scope.seatData.washroom = $scope.filterData.washroom ? 1 : "";
      $scope.seatData.sofa = $scope.filterData.sofa ? 1 : 0;
      $scope.seatData.television = $scope.filterData.television ? 1 : 0;
      // 桌位状态-默认全部
      $scope.seatData.status = "";
      $scope.seatData.confirm = "";
      $scope.seatData.peicai = "";
      switch ($scope.filterData.status) {
        case "配菜":
          $scope.seatData.status = "";
          $scope.seatData.peicai = 1;
          break;
        case "未确认订单":
          $scope.seatData.status = 1;
          $scope.seatData.confirm = 0;
          break;
        case "空闲":
          $scope.seatData.status = 0;
          $scope.seatData.confirm = "";
          break;
        case "已预订":
          $scope.seatData.status = 1;
          $scope.seatData.confirm = "";
          break;
        case "已入座":
          $scope.seatData.status = 2;
          $scope.seatData.confirm = "";
          break;
        default:
      }
      var tTypes = [];
      if ($scope.filterData.tTypes0) {
        tTypes.push(0);
      }
      if ($scope.filterData.tTypes1) {
        tTypes.push(1);
      }
      if ($scope.filterData.tTypes2) {
        tTypes.push(2);
      }

      $scope.seatData.tTypes = tTypes.join(",");
      $scope.showLoading();
      $scope.seatData.page = 1;
      $scope.getSeat();
      $scope.filterShow = false;
    };
    $scope.seeDetail = function() {
      var nowTransform = $("#table-scroll .scroll")[0].style.transform;
      var myScrollTop = 0;
      if (nowTransform) {
        var startIndex = nowTransform.indexOf("(") + 1;
        var endIndex = nowTransform.indexOf(")");
        var nowTranslate = nowTransform.substring(startIndex, endIndex);
        var translateArr = nowTransform.split(",");
        myScrollTop = translateArr[1].replace(/-|px/g, "");
      } else {
        myScrollTop = document
          .getElementById("table-scroll")
          .getElementsByClassName("scroll")[0].scrollTop;
      }
      console.log(myScrollTop);
      localStorage["scrollTop"] = myScrollTop;
      if ($scope.chakan) {
        if (
          $scope.table[0] &&
          $scope.table.length == 1 &&
          $scope.table[0].getAttribute("data-state") != 5
        ) {
          console.log($scope.table[0].getAttribute("data-resvOrder"));
          // if ($scope.info.operationType==1){
          //   var resvOrder = $scope.table[0].getAttribute('data-resvOrder');
          //   if (resvOrder) {
          //     $state.go('myOrder-cDetail', {'type': 2, 'resvOrder': resvOrder, 'seatDataFor': $scope.seatDataFor});
          //   } else {
          //     $scope.showAlert('该桌无订餐详情');
          //   }
          // }else if ($scope.table[0].getAttribute('data-appUserId')==$scope.info.id) {
          var resvOrder = $scope.table[0].getAttribute("data-resvOrder");
          var isChangeTable = $scope.table[0].getAttribute(
            "data-isChangeTable"
          );
          $scope.seatDataFor.tableId = $scope.table[0].getAttribute(
            "data-seat"
          );
          $scope.seatDataFor.maxTableNum = $scope.table[0].getAttribute(
            "data-maxTableNum"
          );
          var orders = $scope.table[0].getAttribute("data-orders")
            ? JSON.parse($scope.table[0].getAttribute("data-orders"))
            : [];
          var resvOrders = [],
            desttime = [];
          if (orders.length > 0) {
            orders.map(function(item) {
              resvOrders.push(item.resvOrder);
              desttime.push(item.destTime);
            });
          }
          var stateParams = {
            seatDataFor: $scope.seatDataFor,
            type: 4
          };
          stateParams.dateString = $scope.dateString;
          sessionStorage["bookParams"] = JSON.stringify(stateParams);
          $scope.seatDetail[0] = {};
          $scope.seatDetail[0].tableId = $scope.table[0].getAttribute(
            "data-seat"
          );
          $scope.seatDetail[0].tableAreaId = $scope.table[0].getAttribute(
            "data-tableAreaId"
          );
          $scope.seatDetail[0].tableAreaName = $scope.table[0].getAttribute(
            "data-tableAreaName"
          );
          $scope.seatDetail[0].tableName = $scope.table[0].getAttribute(
            "data-tableName"
          );
          $scope.seatDetail[0].maxPeopleNum = $scope.table[0].getAttribute(
            "data-maxPeopleNum"
          );
          $scope.seatDetail[0].maxTableNum = $scope.table[0].getAttribute(
            "data-maxTableNum"
          );
          sessionStorage.removeItem("orderData");
          var type = 4;
          if (
            $scope.info.operationType == 1 ||
            $scope.info.id == $scope.table[0].getAttribute("data-appUserId")
          ) {
            type = 2;
          }
          if (resvOrder) {
            $state.go("myOrder-cDetail", {
              type: type,
              resvOrder: resvOrder,
              isChangeTable: isChangeTable,
              seatDataFor: $scope.seatDataFor,
              seatDetail: $scope.seatDetail,
              resvStartTime: $scope.resvStartTime,
              resvEndTime: $scope.resvEndTime,
              isKuaTian: $scope.isKuaTian,
              desttime: desttime,
              resvOrders: resvOrders
            });
          } else {
            if (isChangeTable == "1") {
              $state.go("myOrder-cDetail", {
                type: type,
                resvOrder: "111",
                isChangeTable: isChangeTable,
                seatDataFor: $scope.seatDataFor,
                resvStartTime: $scope.resvStartTime,
                isKuaTian: $scope.isKuaTian,
                resvEndTime: $scope.resvEndTime
              });
            } else {
              $scope.showAlert("该桌无订餐详情");
            }
          }
          // }else{
          //   $scope.showAlert('您无权查看此桌详情');
          // }
        } else if (
          $scope.table[0] &&
          $scope.table.length == 1 &&
          $scope.table[0].getAttribute("data-state") == 5
        ) {
          $scope.showAlert(
            `${$T.T("锁台原因")}：` +
              $scope.table[0].getAttribute("data-remark")
          );
        } else {
          $scope.showAlert("请选择一个桌位");
        }
      } else {
        $scope.showAlert("您无权执行此操作");
      }
    };
    $scope.seatCheckSuccess = function(data) {
      console.log(data);
      var chkSuc = function() {
        var tablesname = [];
        var desttime = [];
        for (var a = 0; a < $scope.table.length; a++) {
          var orders = $scope.table[a].getAttribute("data-orders")
            ? JSON.parse($scope.table[a].getAttribute("data-orders"))
            : [];
          var desttime = [];
          if (orders.length > 0) {
            orders.map(function(item) {
              desttime.push(item.destTime);
            });
          }
          tablesname.push($scope.table[a].getAttribute("data-tableName"));
          $scope.seatDetail[a] = {};
          $scope.seatDetail[a].tableId = $scope.table[a].getAttribute(
            "data-seat"
          );
          $scope.seatDetail[a].tableAreaId = $scope.table[a].getAttribute(
            "data-tableAreaId"
          );
          $scope.seatDetail[a].tableAreaName = $scope.table[a].getAttribute(
            "data-tableAreaName"
          );
          $scope.seatDetail[a].tableName = $scope.table[a].getAttribute(
            "data-tableName"
          );
          $scope.seatDetail[a].maxPeopleNum = $scope.table[a].getAttribute(
            "data-maxPeopleNum"
          );
          $scope.seatDetail[a].maxTableNum = $scope.table[a].getAttribute(
            "data-maxTableNum"
          );
        }
        var stateParams = {
          seatDataFor: $scope.seatDataFor,
          type: 4
        };
        stateParams.dateString = $scope.dateString;
        sessionStorage["bookParams"] = JSON.stringify(stateParams);
        sessionStorage.removeItem("orderData");
        $state.go("myOrder-cDetail", {
          type: 1,
          seat: tablesname.join(","),
          date: $scope.dateString,
          ctype: $scope.meal,
          ctypeid: $scope.mealTypeId,
          seatDetail: $scope.seatDetail,
          resvStartTime: $scope.resvStartTime,
          resvEndTime: $scope.resvEndTime,
          isKuaTian: $scope.isKuaTian,
          seatDataFor: $scope.seatDataFor,
          mealTypeIdA: $scope.mealTypeIdA,
          mealTypeIdB: $scope.mealTypeIdB,
          desttime: desttime
        });
      };
      if (data.status == 0 && data.meetingStatus == 0) {
        if (data.meetingTableList != "" && data.meetingTableList.length > 0) {
          var txt = "";
          for (var i = 0; i < data.meetingTableList.length; i++) {
            txt += `${data.meetingTableList[i].tableName} ${$T.T("所在厅")} (${
              data.meetingTableList[i].meetingTableName
            }) ${$T.T("已有")} ${data.meetingTableList[i].cou} ${$T.T(
              "笔待预定宴会订单。详情请询问:"
            )} ${data.meetingTableList[i].content}</br>`;
          }
          $scope.myPopup = $ionicPopup.show({
            cssClass: "er-popup",
            template: "<p>" + txt + "</p>",
            title: $T.T("是否继续预订"),
            scope: $scope,
            buttons: [
              { text: $T.T("取消") },
              {
                text: `<b>${$T.T("继续预订")}</b>`,
                type: "button-assertive",
                onTap: function() {
                  chkSuc();
                }
              }
            ]
          });
        } else {
          if (data.occStatus == 0) {
            var occId = "";
            for (var i = 0; i < data.occTablesInfo.length; i++) {
              if (i == data.occTablesInfo.length - 1) {
                occId += data.occTablesInfo[i].occId;
              } else {
                occId += data.occTablesInfo[i].occId + ",";
              }
            }
            sessionStorage["occId"] = occId;
            console.log("occId=" + sessionStorage["occId"]);
            chkSuc();
          } else {
            var txt = "";
            var occId = "";
            for (var i = 0; i < data.occTablesInfo.length; i++) {
              if (i == data.occTablesInfo.length - 1) {
                occId += data.occTablesInfo[i].occId;
                if (data.occTablesInfo[i].deviceUserName == "") {
                  txt += `${data.occTablesInfo[i].appUserName} ${$T.T(
                    "正在预订"
                  )} ${data.occTablesInfo[i].occTableName} `;
                } else {
                  txt += `${data.occTablesInfo[i].deviceUserName} ${$T.T(
                    "正在预订"
                  )} ${data.occTablesInfo[i].occTableName} `;
                }
              } else {
                occId += data.occTablesInfo[i].occId + ",";
                if (data.occTablesInfo[i].deviceUserName == "") {
                  txt += `${data.occTablesInfo[i].appUserName} ${$T.T(
                    "正在预订"
                  )} ${data.occTablesInfo[i].occTableName}</br> `;
                } else {
                  txt += `${data.occTablesInfo[i].deviceUserName} ${$T.T(
                    "正在预订"
                  )} ${data.occTablesInfo[i].occTableName}</br> `;
                }
              }
            }
            $scope.myPopup = $ionicPopup.show({
              cssClass: "er-popup",
              template: "<p>" + txt + "</p>",
              title: $T.T("是否继续预订"),
              scope: $scope,
              buttons: [
                { text: $T.T("取消") },
                {
                  text: `<b>${$T.T("继续预订")}</b>`,
                  type: "button-assertive",
                  onTap: function() {
                    sessionStorage["occId"] = occId;
                    console.log("occId=" + sessionStorage["occId"]);
                    chkSuc();
                  }
                }
              ]
            });
          }
        }
      } else if (data.status != 0 && $scope.canFT) {
        var txt = "";
        for (var i = 0; i < $scope.table.length; i++) {
          var orders = $scope.table[i].getAttribute("data-orders")
            ? JSON.parse($scope.table[i].getAttribute("data-orders"))
            : [];
          var desttime = "";
          if (orders.length > 0) {
            orders.map(function(item) {
              desttime += item.destTime + ",";
            });
          }
          if (orders.length > 0) {
            txt +=
              "桌位 " +
              $scope.table[i].getAttribute("data-tableName") +
              " 的 " +
              desttime.substr(0, desttime.length - 1);
          }
        }
        $scope.myPopup = $ionicPopup.show({
          cssClass: "er-popup",
          template: `<p>${txt} 已经有预订</p>`,
          title: $T.T("是否继续预订"),
          scope: $scope,
          buttons: [
            { text: $T.T("取消") },
            {
              text: `<b>${$T.T("继续预订")}</b>`,
              type: "button-assertive",
              onTap: function() {
                chkSuc();
              }
            }
          ]
        });
      } else {
        $scope.showAlert("该桌无法预订");
      }
    };
    $scope.goTableEdit = function() {
      if ($scope.info.appOperationSet.indexOf(14) != -1) {
        var stateParams = {
          seatDataFor: $scope.seatDataFor,
          type: 4
        };
        stateParams.dateString = $scope.dateString;
        sessionStorage["bookParams"] = JSON.stringify(stateParams);
        $state.go("tableEdit", {
          tableId: $scope.tableId,
          isYan: false,
          tableName: $scope.tableName,
          tType: $scope.tType,
          tTypeId: $scope.tTypeId,
          maxPeopleNum: $scope.maxPeopleNum,
          maxTableNum: $scope.maxTableNum,
          minAmount: $scope.minAmount,
          device: $scope.device,
          tableRemark: $scope.tableRemark,
          tableUrl: $scope.tableUrl
        });
      } else {
        $showAlert.alert("无权限");
      }
    };
    $scope.shareTable = function() {
      if ($scope.tableUrl != "") {
        $scope.weixin($scope.tableUrl);
      } else {
        $showAlert.alert("请先上传图片");
      }
    };
    $scope.weixin = function(txt) {
      wx.miniProgram.getEnv(function(res) {
        if (res.miniprogram) {
          var postData = {
            username: $scope.info.username,
            txt: txt
          };
          wx.miniProgram.postMessage({ data: postData });
          wx.miniProgram.navigateTo({
            url:
              "../empty/index?txt=" +
              encodeURIComponent(txt) +
              "&username=" +
              $scope.info.username
          });
        }
      });
      Wechat.isInstalled(
        function(installed) {
          Wechat.share(
            {
              text: txt,
              scene: 0 // share to Timeline
            },
            function() {
              $showAlert.alert("分享成功");
            },
            function(reason) {
              $showAlert.alert(`${$T.T("失败")}: ` + reason);
            }
          );
        },
        function(reason) {
          $showAlert.alert(`${$T.T("失败")}: ` + reason);
        }
      );
    };
    $scope.timeInMealTime = function() {
      // 判断跨天餐别是否可预订
      var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
      var b =
        $scope.resvEndTime.slice(0, 2) * 60 + $scope.resvEndTime.slice(3) * 1;
      var c =
        $scope.resvStartTime.slice(0, 2) * 60 +
        $scope.resvStartTime.slice(3) * 1;

      console.log("book是否跨天餐别", $scope.isKuaTian);

      if ($scope.isKuaTian == 1) {
        if (c < b) {
          // 1:00-6:00
          b += 24 * 60;
          c += 24 * 60;
          if (a < sessionStorage["lastMealEndTime"] * 1) {
            a += 24 * 60;
          }
          if ($scope.dateString > $scope.compareTime()) {
            console.log("1");
            return true;
          } else {
            if (a < b) {
              console.log("2");
              return true;
            } else {
              return false;
            }
          }
        } else {
          // 23:00-1:00
          b += 24 * 60;
          if (a < sessionStorage["lastMealEndTime"] * 1) {
            a += 24 * 60;
          }
          if ($scope.dateString > $scope.compareTime()) {
            console.log("3");
            return true;
          } else {
            if (a < b) {
              console.log("4");
              return true;
            } else {
              return false;
            }
          }
        }
      } else {
        return true;
      }
    };
    $scope.book = function() {
      var nowTransform = $("#table-scroll .scroll")[0].style.transform;
      var myScrollTop = 0;
      if (nowTransform) {
        var startIndex = nowTransform.indexOf("(") + 1;
        var endIndex = nowTransform.indexOf(")");
        var nowTranslate = nowTransform.substring(startIndex, endIndex);
        var translateArr = nowTransform.split(",");
        myScrollTop = translateArr[1].replace(/-|px/g, "");
      } else {
        myScrollTop = document
          .getElementById("table-scroll")
          .getElementsByClassName("scroll")[0].scrollTop;
      }
      console.log(myScrollTop);
      localStorage["scrollTop"] = myScrollTop;
      console.log($scope.dateString, $scope.compareTime());
      if ($scope.dateString < $scope.compareTime()) {
        $showAlert.alert("历史订单无法进行该操作");
        return;
      }
      $scope.onClick = true;
      $timeout(function() {
        $scope.onClick = false;
      }, 500);
      var a = new Date().getHours() * 60 + new Date().getMinutes() * 1;
      var b =
        $scope.resvEndTime.slice(0, 2) * 60 + $scope.resvEndTime.slice(3) * 1;
      if (!$scope.timeInMealTime()) {
        $scope.showAlert("该餐次已经停止预订");
        return;
      }
      if (
        $scope.dateString == $scope.compareTime() &&
        a < sessionStorage["lastMealEndTime"] * 1 &&
        sessionStorage["lastMealEndTime"] < 6 * 60
      ) {
        a += a + 24 * 60;
      }
      console.log(
        $scope.dateString,
        $scope.compareTime(),
        a,
        b,
        $scope.isKuaTian
      );
      if (
        $scope.dateString == $scope.compareTime() &&
        a > b &&
        $scope.isKuaTian != 1
      ) {
        $scope.showAlert("该餐次已经停止预订");
      } else {
        if ($scope.canSubmit && $scope.yudingSubmit) {
          if ($scope.table.length > 0) {
            $scope.showAlert("不可选择桌位，请直接提交订单");
            return;
          }
          var stateParams = {
            seatDataFor: $scope.seatDataFor,
            type: 4
          };
          stateParams.dateString = $scope.dateString;
          sessionStorage["bookParams"] = JSON.stringify(stateParams);
          sessionStorage.removeItem("orderData");
          $state.go("myOrder-cDetail", {
            type: 1,
            date: $scope.dateString,
            ctype: $scope.meal,
            ctypeid: $scope.mealTypeId,
            resvStartTime: $scope.resvStartTime,
            resvEndTime: $scope.resvEndTime,
            isKuaTian: $scope.isKuaTian,
            seatDataFor: $scope.seatDataFor,
            mealTypeIdA: $scope.mealTypeIdA,
            mealTypeIdB: $scope.mealTypeIdB,
            isSubmitOrder: $scope.canSubmit
          });
          return;
        } else if ($scope.canSubmit && !$scope.yudingSubmit) {
          $scope.showAlert("您无权操作此桌位");
          return;
        }
        if ($scope.table.length == 0) {
          $showAlert.alert("请选择一个桌位");
        } else if ($scope.table[0].getAttribute("data-isOPer") >= 1) {
          if ($scope.yuding && !$scope.canSubmit) {
            if (
              checkUp($scope.table, 0) ||
              (!checkUp($scope.table, 5) && $scope.canFT)
            ) {
              var txt = "";
              for (var i = 0; i < $scope.table.length; i++) {
                txt += $scope.table[i].getAttribute("data-seat");
                if (i != $scope.table.length - 1) {
                  txt += ",";
                }
              }
              var seatCheck = {
                appUserId: $scope.info.id,
                resvDate: $scope.dateString,
                mealTypeId: $scope.mealTypeId,
                checkedTableSet: txt,
                mealTypeIdA: $scope.mealTypeIdA,
                mealTypeIdB: $scope.mealTypeIdB,
                kbc: $scope.info.kbc * 1,
                fcb: $scope.info.fcb * 1,
                businessId: $scope.info.businessId
              };
              console.log(txt);
              $httpPsd.tableCheck(
                seatCheck,
                $scope.seatCheckSuccess,
                $scope.error
              );
              //$state.go('myOrder-cDetail', {'type': 1,'seat':txt,'date':$scope.dateString});
            } else {
              $scope.showAlert("无法执行此操作");
            }
          } else {
            $scope.showAlert("您无权执行此操作");
          }
        } else {
          $scope.showAlert("您无权操作此桌位");
        }
      }
    };
    $scope.reasonTui = function($event) {
      console.log("退订");
      $scope.myPopup.close();
      var checkedTables = [];
      if ($scope.chooseOrders.length > 0) {
        for (var i = 0; i < $scope.chooseOrders.length; i++) {
          checkedTables[i] = {};
          checkedTables[i].tableAreaId = $scope.chooseOrders[i].getAttribute(
            "data-tableAreaId"
          );
          checkedTables[i].tableAreaName = $scope.chooseOrders[i].getAttribute(
            "data-tableAreaName"
          );
          checkedTables[i].tableId = $scope.chooseOrders[i].getAttribute(
            "data-seat"
          );
          checkedTables[i].tableName = $scope.chooseOrders[i].getAttribute(
            "data-tableName"
          );
          checkedTables[i].resvOrder = $scope.chooseOrders[i].getAttribute(
            "data-resvOrder"
          );
          checkedTables[i].maxPeopleNum = $scope.chooseOrders[i].getAttribute(
            "data-maxPeopleNum"
          );
        }
      } else {
        for (var i = 0; i < $scope.table.length; i++) {
          checkedTables[i] = {};
          checkedTables[i].tableAreaId = $scope.table[i].getAttribute(
            "data-tableAreaId"
          );
          checkedTables[i].tableAreaName = $scope.table[i].getAttribute(
            "data-tableAreaName"
          );
          checkedTables[i].tableId = $scope.table[i].getAttribute("data-seat");
          checkedTables[i].tableName = $scope.table[i].getAttribute(
            "data-tableName"
          );
          checkedTables[i].resvOrder = $scope.table[i].getAttribute(
            "data-resvOrder"
          );
          checkedTables[i].maxPeopleNum = $scope.table[i].getAttribute(
            "data-maxPeopleNum"
          );
        }
      }
      if (!$scope.canSubmit) {
        $scope.unBookData = {
          businessId: $scope.info.businessId,
          appUserId: $scope.info.id,
          unorderReason: $event.target.innerHTML,
          businessName: $scope.info.businessName,
          appUserName: $scope.info.surname,
          appUserPhone: $scope.info.username,
          resvOrderType: $scope.table[0].getAttribute("data-resvOrderType"),
          checkedTables: checkedTables,
          mealTypeId: $scope.mealTypeId,
          mealTypeIdA: $scope.mealTypeIdA,
          mealTypeIdB: $scope.mealTypeIdB,
          isKbc: $scope.table[0].getAttribute("data-isKbc"),
          kbc: $scope.info.kbc * 1,
          status: 4
        };
        $scope.showLoading();
        $operation.statusUnBook(
          $scope.unBookData,
          $scope.operationSuccess.unBook,
          $scope.error
        );
      } else {
        var orderInfo =
          $scope.chooseOrders.length > 0
            ? $scope.chooseOrders[0]
            : $scope.table[0];
        console.log("退订申请");
        var checkedResvOrder = orderInfo.getAttribute("data-resvOrder");
        $operation.handleOrderSubmit(
          {
            resvOrder: checkedResvOrder,
            submitStatus: 4,
            checkedTables: checkedTables,
            unorderReason: $event.target.innerHTML
          },
          function(data) {
            if (data.msgCode == 0) {
              $showAlert.alert("退订申请已提交");
            } else {
              $showAlert.alert(data.msgMessage || "提交申请失败");
            }
          },
          $scope.error
        );
      }
    };
  });
