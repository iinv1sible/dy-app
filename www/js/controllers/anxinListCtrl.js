angular
  .module("starter.controllers.anxinListCtrl", [])
  .controller("anxinListCtrl", function(
    $scope,
    $interval,
    $stateParams,
    $ionicPopup,
    $rootScope,
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
      // {
      //   id: 1,
      //   icon: "new-images/icon-bar4-2.png",
      //   name: "张三",
      //   tempDesc: "<37℃"
      // }
    ];
    $scope.deliverPersons = [
      // {
      //   id: 2,
      //   icon: "new-images/icon-bar4-2.png",
      //   name: "李四",
      //   tempDesc: "<36℃"
      // }
    ];
    $scope.serverPersons = [];
    $scope.goAnxinRegionSelect = () => {
      console.log("goAnxinRegionSelect");
      $state.go("anxinRegionSelect");
    };
    $scope.showAnxinPersonSelect = (type, persons, jobType) => {
      console.log("showAnxinPersonSelect", type, persons, jobType);

      // 岗位类型，1 菜品 2 传菜 3 服务生
      // 需要告诉对方是选择菜品 送菜还是服务 以及当前选择人员数据
      $state.go("anxinPersonSelect", {
        type,
        persons,
        jobType,
        origin: "anxinList"
      });
    };
    $rootScope.$on("anxin-person-selected", function(event, args) {
      console.log("anxin-person-selected", args);
      let jobType = args.jobType;
      if (jobType == 1) {
        //1 菜品 2 传菜 3 服务生
        $scope.foodPersons = args.selectedPersons;
      } else if (jobType == 2) {
        $scope.deliverPersons = args.selectedPersons;
      } else if (jobType == 3) {
        $scope.serverPersons = args.selectedPersons;
      }
    });
  });
