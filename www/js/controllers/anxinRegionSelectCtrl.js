angular
  .module("starter.controllers.anxinRegionSelectCtrl", [])
  .controller("anxinRegionSelectCtrl", function(
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
    $scope.searchKey = {
      key: ""
    };
    $scope.regions = [
      {
        id: 1,
        name: "大厅",
        rooms: [
          {
            id: 1,
            name: "柳浪闻莺",
            selected: false
          },
          {
            id: 2,
            name: "断桥残雪",
            selected: false
          }
        ],
        showRoom: false
      },
      {
        id: 2,
        name: "二楼",
        rooms: [
          {
            id: 3,
            name: "花港观鱼",
            selected: false
          },
          {
            id: 4,
            name: "雷峰夕照",
            selected: false
          }
        ],
        showRoom: false
      }
    ];
    $scope.axrsRegionItemContentStyleObj = () => {
      return { height: "300px" };
    };
    $scope.showRoom = regionId => {
      let regions = $scope.regions;
      let index = regions.findIndex(region => region.id === regionId);
      let region = regions[index];
      region.showRoom = !region.showRoom;
    };
    $scope.selectRoom = room => {
      room.selected = !room.selected;
    };
    $scope.isAllRoomSelected = regionId => {
      let regions = $scope.regions;
      let index = regions.findIndex(region => region.id === regionId);
      let region = regions[index];
      let unselectedRooms = region.rooms.filter(room => !room.selected);
      if (unselectedRooms.length <= 0) return true;
      return false;
    };
    $scope.isAllRoomNotSelected = regionId => {
      let regions = $scope.regions;
      let index = regions.findIndex(region => region.id === regionId);
      let region = regions[index];
      let selectedRooms = region.rooms.filter(room => room.selected);
      if (selectedRooms.length <= 0) return true;
      return false;
    };
    $scope.selectRegion = (regionId, e) => {
      e.stopPropagation();
      let regions = $scope.regions;
      let index = regions.findIndex(region => region.id === regionId);
      let region = regions[index];
      let isAllRoomSelected = $scope.isAllRoomSelected(regionId);
      region.rooms.forEach(room => (room.selected = !isAllRoomSelected));
    };
    $scope.clearSearch = () => {
      console.log("clearSearch");
      $scope.searchKey.key = "";
    };
  });
