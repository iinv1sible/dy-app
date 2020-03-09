angular.module('starter.controllers.accountPersonHotelCtrl', []).controller('AccountPersonHotelCtrl', function ($scope, $http, $httpOrder, $operation, $ionicPopup, $showAlert) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.info = JSON.parse(localStorage['info']);
    $operation.getHotel($scope.info.id, $scope.getHotelList, $scope.error);
  });
  $scope.getHotelList = function (data) {
    $scope.hotelList = data;
    console.log(data);
  }
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
})