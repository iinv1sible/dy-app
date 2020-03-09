angular.module('starter.controllers.accountMyOrderTuanCtrl', []).controller('AccountMyOrderTuanCtrl', function ($scope, $state, $ionicPopover, ionicDatePicker, $httpGroup, $T, $ionicLoading, $showAlert) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
        $scope.info = JSON.parse(localStorage['info']);
        $scope.mealTypes = JSON.parse(sessionStorage['mealTypes']);
        $scope.stateParams = sessionStorage['tuanParams']?JSON.parse(sessionStorage['tuanParams']):{};
        $scope.state = '个人订单'
        $scope.meal = '全部餐别'
        $scope.type = '全部套餐'
        $scope.orderList = []
        $scope.data = {}
        $scope.data.businessId = $scope.info.businessId
        $scope.data.resvStartDate = $scope.stateParams.resvStartDate || $scope.freshTime(new Date())
        $scope.data.resvEndDate = $scope.stateParams.resvStartDate || $scope.freshTime(new Date())
        $scope.data.mealTypeId = $scope.stateParams.mealTypeId || ''
        $scope.data.appUserId = $scope.stateParams.appUserId || $scope.info.id
        $scope.data.groupMealId = $scope.stateParams.groupMealId || ''
        var mealTypesLength = $scope.mealTypes.length * 53 + 53;
        var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;;padding-top:0;">
                     <ion-content style="background-color: transparent;" overflow-scroll="true">
                       <div class="list">
                         <a class="item text-center" ng-click="choose($event,2)" data-id="">
                            {{'全部餐别'|T}}
                         </a>
                         <a class="item text-center" ng-click="choose($event,2)" ng-repeat="meal in mealTypes" data-id={{meal.id}}>
                            {{meal.mealTypeName}}
                         </a>
                       </div>
                     </ion-content>
                   </ion-popover-view>`;
        $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
          scope: $scope
        });
        var stateLength = $scope.info.operationType==1 ? 106 : 53
        var state = `<ion-popover-view style="height:${stateLength}px;width:120px;;padding-top:0;">
                     <ion-content style="background-color: transparent;" overflow-scroll="true">
                       <div class="list">
                         <a ng-if="info.operationType==1" class="item text-center" ng-click="choose($event,1)" data-id="">
                            {{'全店订单'|T}}
                         </a>
                         <a class="item text-center" ng-click="choose($event,1)" data-id="{{info.id}}">
                            {{'个人订单'|T}}
                         </a>
                       </div>
                     </ion-content>
                   </ion-popover-view>`;
        $scope.popoverState = $ionicPopover.fromTemplate(state, {
          scope: $scope
        });
        $scope.groupList = []
        $httpGroup.getGroupMealAll({
          businessId: $scope.info.businessId
        }, function(data){
          if (data && data.length > 0) {
            $scope.groupList = data
          }
        })
        var type = `<ion-popover-view style="width:120px;;padding-top:0;">
                     <ion-content style="background-color: transparent;" overflow-scroll="true">
                       <div class="list">
                        <a class="item text-center" ng-click="choose($event,3)" data-mealId="" data-id="">
                            {{'全部套餐'|T}}
                        </a>
                         <a class="item text-center" ng-repeat="item in groupList" ng-click="choose($event,3)" data-id="{{item.groupMealId}}">
                            {{item.groupMealName}}
                         </a>
                       </div>
                     </ion-content>
                   </ion-popover-view>`;
        $scope.popoverType = $ionicPopover.fromTemplate(type, {
          scope: $scope
        });
        $scope.showLoading();
        $scope.getGroupOrder()
    })
    $scope.getGroupOrder = function(){
      $httpGroup.getGroupOrder($scope.data, function(data) {
        if (data && data.length > 0) {
          $scope.orderList = data
        }
        $ionicLoading.hide()
      }, $scope.error)
    }
    $scope.error = function (data) {
      $ionicLoading.hide();
      $scope.isSubmit = false
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('加载失败');
      }
    };
    $scope.bookT = function(){
      sessionStorage['tuanParams'] = JSON.stringify($scope.data)
      $state.go("myOrderTuanDetail")
    }
    $scope.goOrderDetail = function(resvOrder, status) {
      sessionStorage['tuanParams'] = JSON.stringify($scope.data)
      $state.go("myOrderTuanDetail", {
        resvOrder: resvOrder, 
        status: status
      })
    }
    $scope.openPopover = function ($event, num) {
      if (num == 1) {
        $scope.popoverState.show($event);
      } else if (num == 2) {
        $scope.popoverMeal.show($event);
      } else if (num == 3) {
        $scope.popoverType.show($event);
      }
    }
    $scope.closePopover = function (num) {
      if (num == 1) {
        $scope.popoverState.hide();
      } else if (num == 2) {
        $scope.popoverMeal.hide();
      } else if (num == 3) {
        $scope.popoverType.hide();
      }
    }
    $scope.choose = function($event, num) {
      var a = $event.target;
      var txt = a.getAttribute("data-id");
      var text = $(a).text()
      $scope.closePopover(num);
      if (num == 1) {
        $scope.data.appUserId = txt
        $scope.state = text
      } else if (num == 2) {
        $scope.data.mealTypeId = txt
        $scope.meal = text
      } else if (num == 3) {
        $scope.data.groupMealId = txt
        $scope.type = text
      }
      $scope.showLoading();
      $scope.orderList = []
      $scope.getGroupOrder()
    }
    $scope.openDatePicker = function (num) {
      var timePicker = $scope.newIpObj(num);
      ionicDatePicker.openDatePicker(timePicker);
    }
    $scope.newIpObj = function (num) {
      var ipObj = {
        callback: function (date) {
          // if (num == 2) {
          //   if($scope.freshTime(new Date($scope.data.resvStartDate)) > $scope.freshTime(new Date(date))){
          //     $showAlert.alert('查询开始时间不可大于结束时间');
          //     return
          //   }
          // } else {
          //   if($scope.freshTime(new Date(date)) > $scope.freshTime(new Date($scope.data.resvEndDate))){
          //     $showAlert.alert('查询开始时间不可大于结束时间');
          //     return
          //   }
          // }
          // if (num == 2) {
          //   $scope.data.resvEndDate = $scope.freshTime(date)
          // } else {
            $scope.data.resvStartDate = $scope.freshTime(date)
            $scope.data.resvEndDate = $scope.freshTime(date)
          // }
          $scope.orderList = [];
          $scope.showLoading();
          $scope.getGroupOrder()
        },
        from: new Date(2000, 1, 1),
        to: new Date(new Date().getFullYear()+10, 11, 31),
        inputDate: new Date($scope.data.resvStartDate.replace(/-/g, "/")),
        mondayFirst: false,
        closeOnSelect: true,
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd'
      };
      return ipObj;
    };
    $scope.freshTime = function (date) {
      var date = new Date(date);
      var m = date.getMonth() + 1;
      if (m < 10) {
        m = "0" + m
      }
      var d = date.getDate();
      if (d < 10) {
        d = "0" + d
      }
      var dateString = date.getFullYear() + "-" + m + "-" + d;
      return dateString;
    }
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: $T.T('加载中...')
      })
    }
})