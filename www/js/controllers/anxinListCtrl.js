angular
  .module("starter.controllers.anxinListCtrl", [])
  .controller("anxinListCtrl", function(
    $scope,
    $interval,
    $ionicPopup,
    $http,
    $httpPsd,
    $state,
    $showAlert,
    $T
  ) {
    $scope.$on("$ionicView.beforeEnter", function(event, viewData) {
      viewData.enableBack = true;
    });
    $scope.foodPersons = [
      {
        icon: "images/icon_logo@3x.png",
        name: "张三",
        tempDesc: "<37℃"
      }
    ];
    $scope.deliverPersons = [
      {
        icon: "images/icon_logo@3x.png",
        name: "李四",
        tempDesc: "<36℃"
      }
    ];
    $scope.serverPersons = [
      {
        icon: "images/icon_logo@3x.png",
        name: "王五",
        tempDesc: "<35℃",
        regionDesc: "包厢2，包厢3>"
      },
      {
        icon: "images/icon_logo@3x.png",
        name: "赵柳",
        tempDesc: "<37℃",
        regionDesc: "包厢哈哈，包厢3>"
      }
    ];
    $scope.goAnxinRegionSelect = () => {
      console.log("goAnxinRegionSelect");
      $state.go("anxinRegionSelect");
    };
    $scope.showAnxinPersonSelect = () => {
      console.log("showAnxinPersonSelect");
      $state.go("anxinPersonSelect");
    };
  });
