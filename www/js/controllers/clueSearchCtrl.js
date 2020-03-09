angular.module('starter.controllers.clueSearchCtrl', []).controller('clueSearchCtrl', function ($scope, $http, $httpClue, $ionicPopup, $showAlert, $state, $ionicScrollDelegate) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.searchClueList = [];
    $scope.isShow = true;
    $scope.canLoad = true;
  })
  $scope.search = function () {
    if ($("#searchButton").text().trim() == "搜索") {
      $scope.searchClueList = [];
      var content = $(".bar-input").val();
      if (content != undefined && content.length > 0) {
        $scope.myClueData = {
          "appUserId": $scope.info.id,
          "businessId": $scope.info.businessId,
          "type": 0,
          "isSearch": 1,
          "searchContent": content,
          "page": 1,
          "rows": 20
        };
        $httpClue.getSearch($scope.myClueData, $scope.getSearchClueDateSuccess);
      }
    } else {
      $ionicScrollDelegate.scrollTop();
      $scope.isShow = false;
      $scope.canLoad = false;
      $scope.searchClueList = [];
      $("#searchButton").text("搜索");
    }
  };
  $scope.getSearchClueDateSuccess = function (data) {
    if (data != "") {
      $scope.searchClueList = $scope.searchClueList.concat(data.list);
      $scope.canLoad = data.hasNextPage;
      $scope.myClueData.page += 1;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    } else {
      $scope.searchClueList = null;
      $scope.canLoad = false;
      $scope.isShow = false;
    }
  };
  $scope.doInfinite = function () {
    $scope.canLoad = true;
    $scope.isShow = true;
    var content = $(".bar-input").val();
    if (content != undefined && content.length > 0) {
      $httpClue.getSearch($scope.myClueData, $scope.getSearchClueDateSuccess);
    }
  };
  $scope.goDetail = function ($event) {
    var keyNo = $event.currentTarget.getAttribute('data-keyNo');
    $scope.myClueData = {};
    $state.go('clueDetail', {'keyNo': keyNo});
  };
  $scope.empty = function () {
    $(".bar-input").val("");
  };
  $scope.goSearch = function () {
    $state.go('clueSearch');
  };
})