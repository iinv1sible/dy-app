angular.module('starter.controllers.webShareCtrl', []).controller('webShareCtrl', function ($scope, $state, $httpWechat, $location, $calendar) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $scope.data = {}
      $scope.weekday = $calendar.nStr1

      $scope.params = {
        batchNo: $location.$$search.batchNo
      }
      $httpWechat.getOrderWithBatchNo($scope.params, function(data){
        $scope.data = data
        $scope.data.year = new Date($scope.data.resvDate).getFullYear()
        $scope.data.month = new Date($scope.data.resvDate).getMonth()+1
        $scope.data.date = new Date($scope.data.resvDate).getDate()
        $scope.data.day = $scope.weekday[$scope.data.week]
        $scope.data.isAM = $scope.data.destTime <= '12:00' ? 'am' : 'pm'
      })
  })

  $scope.openMap = function() {
    window.open($scope.data.addressUrl, '_blank')
  }
})