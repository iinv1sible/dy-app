angular.module('starter.controllers.myCustomValueCtrl', []).controller('myCustomValueCtrl', function ($scope, $http, $httpCustom, $ionicPopover, $showAlert, $ionicLoading, $state, $stateParams, $T) {
  var isValue = false
  for(var i in $stateParams){
    if($stateParams[i]){
      isValue = true
    }
  }
  if(isValue){
    sessionStorage['customvalueParams'] = JSON.stringify($stateParams)
  }else{
    $stateParams = JSON.parse(sessionStorage['customvalueParams'])
  }
  console.log('-----------------------'+isValue)
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  })
  $scope.$on('$ionicView.enter', function (event, viewData) {
    //viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.valueId = $stateParams.id;
    $scope.type = $stateParams.type;
    $scope.name = $stateParams.name;
    $scope.cType = $stateParams.qryType;
    console.log($stateParams);
    $scope.customList = [];
    $scope.showValueFilter = false
    var valueFilter = localStorage.valueFilter?JSON.parse(localStorage.valueFilter):{}
    $scope.valueText = valueFilter.text || '全部'
    $scope.firstClassValue = valueFilter.type
    $scope.data = {
      "id": $scope.valueId,
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      'type': $scope.cType,
      firstClassValue: $scope.firstClassValue,
      page: 1,
      rows: 20
    }
    $scope.valueFilter = {}
    localStorage.valueFilter = JSON.stringify($scope.valueFilter)
    $scope.canLoad = true;
    $scope.showLoading();
    if ($scope.type == 0) {
      $scope.isYan = false;
      $httpCustom.customValueDetail($scope.data, $scope.getCustomValueDetailSuccess, $scope.error);
    } else if ($scope.type == 2) {
      $scope.showValueFilter = true
      $httpCustom.customSubValueDetail($scope.data, $scope.getCustomValueDetailSuccess, $scope.error);
    }
    //  else {
    //   $scope.isYan = true;
    //   $httpCustom.customValueYanDetail(data, $scope.getCustomValueDetailSuccess, $scope.error);
    // }
    $scope.initValueList()
  });
  $scope.initValueList = function () {
    var firstClassValue = `<ion-popover-view style="height:212px;width:120px;padding-top:0;">
               <ion-content style="background-color: transparent;">
                 <div class="list">
                   <a class="item text-center" ng-click="filterValue($event)">全部</a>
                   <a class="item text-center" ng-click="filterValue($event,2)">活跃</a>
                   <a class="item text-center" ng-click="filterValue($event,3)">沉睡</a>
                   <a class="item text-center" ng-click="filterValue($event,4)">流失</a>
                 </div>
               </ion-content>
             </ion-popover-view>`;
    $scope.popoverValue = $ionicPopover.fromTemplate(firstClassValue, {
      scope: $scope
    });
  }
  $scope.filterValue = function ($event,type) {
    $scope.data.firstClassValue = type
    $scope.data.page = 1
    var lastValue = $scope.valueText
    $scope.valueText = $event.target.innerText
    $scope.popoverValue.hide()
    $scope.firstClassValue = type
    $scope.showLoading();
    $httpCustom.customSubValueDetail($scope.data, $scope.getCustomValueDetailSuccess, function(data) {
      $scope.valueText = lastValue
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('连接失败，请检查网络');
      }
      $ionicLoading.hide()
    });
  }
  $scope.name = $stateParams.name;
  $scope.freshTime = function (date) {
    var a = new Date(date);
    var m = a.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    var d = a.getDate();
    if (d < 10) {
      d = "0" + d
    }
    var dateString = a.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  $scope.getCustomValueDetailSuccess = function (data) {
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].colorId = i % 4;
    }
    var list = []
    if ($scope.type===2) {
      list = data.list.map(function (item) {
        return {
          id: item.vip_id,
          colorId: item.colorId,
          imageUrl: item.imageUrl,
          vipName: item.vip_name,
          vipPhone: item.vip_phone,
          percentRank: item.customerInfoIntegrity,
          payfrequency: (item.consumeFrequency||0).toFixed(2),
          payamount: item.customer_amount_total?(item.customer_amount_total/100).toFixed(0):0,
          lastResvDate: item.last_eat_time?$scope.freshTime(item.last_eat_time):''
        }
      })
    } else {
      list = data.list.map(function (item) {
        if (item.payfrequency) {
          item.payfrequency = parseFloat(item.payfrequency).toFixed(2)
        }
        return item
      });
    }
    $scope.customList = $scope.data.page === 1 ? list : $scope.customList.concat(list)
    $scope.canLoad = data.hasNextPage
    $scope.data.page ++
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $ionicLoading.hide();
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.choice = function($event){
    $scope.popoverValue.show($event)
  }
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
    $ionicLoading.hide()
  };
  $scope.doInfinite = function () {
    $scope.showLoading();
    if ($scope.type == 0) {
      $httpCustom.customValueDetail($scope.data, $scope.getCustomValueDetailSuccess, $scope.error);
    } else if ($scope.type == 2) {
      $httpCustom.customSubValueDetail($scope.data, $scope.getCustomValueDetailSuccess, $scope.error);
    }
    //  else {
    //   $httpCustom.customValueYanDetail(data, $scope.getCustomValueDetailSuccess, $scope.error);
    // }
  }
  $scope.bgColor = [
    {"background-color": "#D76959"},
    {"background-color": "#76A6DF"},
    {"background-color": "#E7B45F"},
    {"background-color": "#5CBBA4"}
  ];
  $scope.goCustom = function () {
    $state.go('myCustom');
  }
  $scope.goInfo = function ($event) {
    var a = $event.target;
    var vipId = a.getAttribute('data-vipId');
    localStorage.valueFilter = JSON.stringify({
      type: $scope.firstClassValue,
      text: $scope.valueText
    })
    $state.go('myCustom-info', {'vipId': vipId});
  };
})
