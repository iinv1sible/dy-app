angular.module('starter.controllers.accountMyOrderYDetailLockCtrl', []).controller('AccountMyOrderYDetailLockCtrl', function ($scope, $state, $stateParams, $httpLock, $showAlert, $ionicLoading, $ionicHistory, $T, $ionicPopup) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.resvDate = $stateParams.resvDate
    $scope.mealTypeId = $stateParams.mealTypeId
    $scope.mealTypeName = $stateParams.mealTypeName
    $scope.resvOrder = $stateParams.resvOrder
    $scope.table = []
    $scope.relatedTable = []
    $scope.getOrder()
  })
  $scope.getOrder = function(){
    $httpLock.getYLockOrder({
      resvOrder: $scope.resvOrder
    }, function(data) {
      $scope.table = data.table
      $scope.relatedTable = data.relatedTable
    }, $scope.error)
  }
  $scope.goLock = function() {
    $state.go('myOrder-yDetail-lockList', {
      'resvOrder': $scope.resvOrder,
      'resvDate':$scope.resvDate,
      'mealTypeId':$scope.mealTypeId,
      'mealTypeName':$scope.mealTypeName,
      'tableId': $stateParams.tableId,
      'tableName': $stateParams.tableName,
      'resvMeetingOrderTypeName': $stateParams.resvMeetingOrderTypeName
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
  $scope.unlock = function(item) {
    $ionicPopup.confirm({
      cssClass: "er-popup",
      title: '易订',
      template: '是否确认解锁',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          type: 'button-assertive',
          onTap: function () {
            $ionicLoading.show({
              template: '加载中...'
            })
            $httpLock.unLockYorder({
              resvOrder: item.resvOrder,
              appUserId: $scope.info.id
            }, function(data) {
              $showAlert.alert(data.msgMessage)
              $scope.getOrder()
              $ionicLoading.hide()
            }, $scope.error)
          }
        }
      ]
    })
  }
  $scope.unlockAll = function(num) {
    $ionicPopup.confirm({
      cssClass: "er-popup",
      title: '易订',
      template: '是否确认全部解锁',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          type: 'button-assertive',
          onTap: function () {
            $ionicLoading.show({
              template: '加载中...'
            })
            $httpLock.unLockYorderAll({
              resvOrder: $scope.resvOrder,
              appUserId: $scope.info.id,
              isRelated: num
            }, function(data) {
              $showAlert.alert(data.msgMessage)
              $scope.getOrder()
              $ionicLoading.hide()
            }, $scope.error)
          }
        }
      ]
    })
  }
})