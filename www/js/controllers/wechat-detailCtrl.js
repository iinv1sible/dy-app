angular.module('starter.controllers.wechatDetailCtrl', []).controller('wechatDetailCtrl', function ($scope, $state, $httpWechat, $location, $calendar, $ionicScrollDelegate) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
        $scope.data = {}
        $scope.params = {
          businessId: $location.$$search.businessId,
          startResvdata: $location.$$search.startResvdata,
          endResvdata: $location.$$search.endResvdata,
          appUserId: $location.$$search.appUserId
        }
        $httpWechat.getWechatOrderInfo($scope.params, function(data){
          $scope.data = data
        })
    })
})