angular
  .module("starter.controllers.anxinPersonSelectCtrl", [])
  .controller("anxinPersonSelectCtrl", function(
    $scope,
    $stateParams,
    $ionicScrollDelegate,
    $rootScope,
    $timeout,
    $anchorScroll,
    $state,
    $http
  ) {
    var personHandle = $ionicScrollDelegate.$getByHandle("person-handle");
    let selectedPersonScroll = $ionicScrollDelegate.$getByHandle(
      "selected-person-scroll"
    );
    // $http.get("./city.json").success(function(data) {
    //   $scope.cityList = data;
    //   cityHandle.resize();
    // });
    //类型 单选还是多选
    $scope.data = {
      personData: {
        A: [
          {
            id: 1,
            icon: "new-images/icon-bar4-2.png",
            name: "阿斯兰",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          },
          {
            id: 2,
            icon: "new-images/icon-bar4-2.png",
            name: "阿兰斯",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          }
        ],
        B: [
          {
            id: 3,
            icon: "new-images/icon-bar4-2.png",
            name: "本拉登",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          },
          {
            id: 4,
            icon: "new-images/icon-bar4-2.png",
            name: "巴里",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          }
        ],
        C: [
          {
            id: 5,
            icon: "new-images/icon-bar4-2.png",
            name: "阿斯兰",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          },
          {
            id: 6,
            icon: "new-images/icon-bar4-2.png",
            name: "阿兰斯",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          }
        ],
        D: [
          {
            id: 7,
            icon: "new-images/icon-bar4-2.png",
            name: "本拉登",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          },
          {
            id: 8,
            icon: "new-images/icon-bar4-2.png",
            name: "巴里",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          }
        ],
        E: [
          {
            id: 9,
            icon: "new-images/icon-bar4-2.png",
            name: "阿斯兰",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          },
          {
            id: 10,
            icon: "new-images/icon-bar4-2.png",
            name: "阿兰斯",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          }
        ],
        F: [
          {
            id: 11,
            icon: "new-images/icon-bar4-2.png",
            name: "本拉登",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          },
          {
            id: 12,
            icon: "new-images/icon-bar4-2.png",
            name: "巴里",
            tempDesc: "<37℃",
            regionDesc: "包厢2，包厢3>"
          }
        ]
      },
      selectType: 2, //1 单选 2 多选,
      selectedPersons: [],
      jobType: "",
      jobTypeDescMap: {
        1: "菜品",
        2: "传菜",
        3: "服务"
      },
      origin: ""
    };
    let persons = $stateParams.persons;
    let type = $stateParams.type;
    let jobType = $stateParams.jobType;
    $scope.data.selectType = type;
    $scope.data.selectedPersons = [...persons];
    $scope.data.jobType = jobType;

    $scope.isInSelectedPersons = person => {
      let res =
        $scope.data.selectedPersons.findIndex(
          selectedPerson => selectedPerson.id == person.id
        ) != -1;
      // console.log(
      //   "isInSelectedPersons",
      //   person,
      //   $scope.data.selectedPersons,
      //   res
      // );
      return res;
    };

    $scope.confirmMultiSelect = () => {
      console.log("confirmMultiSelect");
      if ($scope.data.selectedPersons.length <= 0) return;
      $scope.$ionicGoBack();
      $rootScope.$broadcast("anxin-person-selected", {
        selectedPersons: $scope.data.selectedPersons,
        jobType: $scope.data.jobType
      });
    };

    // 选择
    $scope.selectPerson = function(person) {
      console.log(
        "selectType",
        $scope.data.selectType,
        "anin select person",
        person
      );
      if ($scope.data.selectType == 1) {
        //若是单选 则直接返回并且广播事件
        $scope.$ionicGoBack();
        $rootScope.$broadcast("anxin-person-selected", {
          selectedPersons: [person],
          jobType: $scope.data.jobType
        });
      } else if ($scope.data.selectType == 2) {
        //若是多选 如果已经选择了则去选 若是还没有选择则加选
        let index = $scope.data.selectedPersons.findIndex(
          selectedPerson => selectedPerson.id == person.id
        );
        if (index == -1) {
          //表示未选择
          $scope.data.selectedPersons.push(person);
        } else {
          //表示已经选择
          $scope.data.selectedPersons.splice(index, 1);
        }
        selectedPersonScroll.resize();
      }
    };

    $scope.isShowTypeCircle = false;
    $scope.typeCircle = "A";
    $scope.selected = "";
    var time = "";
    $scope.selectType = function(id) {
      $scope.selected = id;
      $scope.typeCircle = id;
      $timeout.cancel(time);
      $scope.isShowTypeCircle = true;
      $anchorScroll(id);
      time = $timeout(function() {
        $scope.isShowTypeCircle = false;
        $scope.selected = "";
      }, 1000);
    };

    // 滑动框
    var navBar = $(".select-city-type-line");
    var width = 40;
    var height = 20;
    $scope.isTrueNavBar = false;
    $scope.touchmove = function($event) {
      var e = $event.targetTouches[0];
      $scope.isTrueNavBar = true;
      var y = e.pageY;
      var x = e.pageX;
      navBar.find(".letter").each(function(i, item) {
        var offset = $(item).offset();
        var left = offset.left,
          top = offset.top;
        if (x > left && x < left + width && y > top && y < top + height) {
          var id = $(item).text();
          $scope.selected = id;
          $scope.typeCircle = id;
          $scope.isShowTypeCircle = true;
          $anchorScroll(id.trim());
        }
      });
    };

    $scope.touchend = function() {
      $scope.isTrueNavBar = false;
      $timeout(function() {
        $scope.isShowTypeCircle = false;
        $scope.selected = "";
      }, 500);
    };

    //键盘回车键
    $scope.todoSomething = function($event) {
      if ($event.keyCode == 13) {
        cordova.plugins.Keyboard.close();
      }
    };

    $scope.close = function() {
      clearData();
    };

    function clearData() {
      $scope.user.text = "";
      $scope.isShowKeyboard = false;
      $scope.$apply();
      cordova.plugins.Keyboard.close();
    }

    // 监听键盘
    $scope.isShowKeyboard = false;
    window.addEventListener("native.showkeyboard", keyboardShowHandler);
    function keyboardShowHandler(e) {
      cityHandle.scrollTop(true);
      $scope.isShowKeyboard = true;
      $scope.$apply();
    }

    window.addEventListener("native.keyboardhide", keyboardHideHandler);
    function keyboardHideHandler(e) {
      if ($scope.user.text == "") {
        $scope.isShowKeyboard = false;
      }
      $scope.$apply();
    }

    // 对象字母排序
    function objKeySort(obj) {
      var newkey = Object.keys(obj).sort();
      var newObj = {};
      for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
      }
      return newObj;
    }
  });
