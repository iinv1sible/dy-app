angular.module('starter.controllers.accountMyRankInfoRecordCtrl', []).controller('AccountMyRankInfoRecordCtrl', function ($scope, $state, $stateParams, $http, $httpOrder, $httpCustom, $ionicPopover, $showAlert, $ionicLoading, $T, $ionicScrollDelegate) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    console.log($stateParams);
    $scope.info = JSON.parse(localStorage['info']);
    $scope.qryType = $stateParams.qryType;
    $scope.type = $stateParams.type;
    $scope.appUserId = $stateParams.appUserId;
    $scope.starttime = $stateParams.starttime;
    $scope.endtime = $stateParams.endtime;
    $scope.showDish = false;
    $scope.dishList = [];
    $scope.orderList = [];
    $scope.pageNum = 1;
    $scope.pageSize = 10;
    $scope.getListData = {
      "qryType": $scope.qryType,
      "appUserId": $scope.appUserId,
      "businessId": $scope.info.businessId,
      "starttime": $scope.starttime,
      "endtime": $scope.endtime,
      "page": $scope.pageNum,
      "rows": $scope.pageSize
    };
    if(sessionStorage['rankOrderList']){
      $scope.orderList = JSON.parse(sessionStorage['rankOrderList'])
      $scope.getListData.page = sessionStorage['rankPage']
      $scope.pageNum = sessionStorage['rankPage']
      sessionStorage.removeItem('rankOrderList')
      sessionStorage.removeItem('rankPage')
      return
    }
    $scope.canLoad = false
    $ionicScrollDelegate.scrollTop();
    if ($scope.type == 0) {
      $httpCustom.rankOrderListPu($scope.getListData, $scope.getOrderSuccess, $scope.error)
    } else if ($scope.type == 1) {
      $httpCustom.rankOrderListYan($scope.getListData, $scope.getOrderSuccess, $scope.error)
    }
  });
  $scope.orderList = [];
  $scope.getOrderSuccess = function (data) {
    console.log(data);
    $scope.orderList = $scope.orderList.concat(data.list);
    if (($scope.info.id != $scope.appUserId) && ($scope.info.hiddenPhoneNum == true)) {
      console.log('不一样');
      for (var i = 0; i < $scope.orderList.length; i++) {
        $scope.orderList[i].vipPhone = $scope.orderList[i].vipPhone.slice(0, 3) + '****' + $scope.orderList[i].vipPhone.slice(7);
      }
    }
    $scope.canLoad = data.hasNextPage;
    $scope.getListData.page += 1;
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
  $scope.goOrderDetail = function ($event) {
    var resvOrder = $event.target.getAttribute('data-resvOrder');
    console.log(resvOrder);
    sessionStorage['rankOrderList'] = JSON.stringify($scope.orderList)
    sessionStorage['rankPage'] = $scope.getListData.page
    if ($scope.type == 0) {
      sessionStorage.removeItem('orderData')
      $state.go('myOrder-cDetail', {'type': 4, 'resvOrder': resvOrder});
    } else {
      $state.go('myOrder-yDetail', {'type': 4, 'resvOrder': resvOrder});
    }
    ;
  };
  $scope.doInfinite = function () {
    if ($scope.type == 0) {
      $httpCustom.rankOrderListPu($scope.getListData, $scope.getOrderSuccess, $scope.error)
    } else if ($scope.type == 1) {
      $httpCustom.rankOrderListYan($scope.getListData, $scope.getOrderSuccess, $scope.error)
    }
    ;
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
    $ionicLoading.hide();
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage);
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
    $ionicLoading.hide();
  };
  //////////////////////////////////////////////
  $scope.seesee = function (id1, id2) {
    console.log(1);
    var dishData = {
      'businessId': $scope.info.businessId,
      'appUserId': $scope.info.id,
      'id': id1,
      'vipId': id2
    };
    $httpOrder.getDishDetail(dishData, $scope.dishDetailSuccess, $scope.error);
    $scope.showDish = true;
    $scope.dishList = [];
  };
  $scope.dishDetailSuccess = function (data) {
    console.log(data);
    $scope.dishList = data;
  };
  $scope.hideDish = function () {
    $scope.showDish = false;
  }
})