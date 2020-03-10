angular
  .module("starter.controllers.anxinPersonSelectCtrl", [])
  .controller("anxinPersonSelectCtrl", function(
    $scope,
    $stateParams,
    $ionicScrollDelegate,
    $rootScope,
    $timeout,
    $anchorScroll,
    $http
  ) {
    var cityHandle = $ionicScrollDelegate.$getByHandle("city-handle");
    // $http.get("./city.json").success(function(data) {
    //   $scope.cityList = data;
    //   cityHandle.resize();
    // });

    $scope.persons = {
      A: [
        {
          icon: "images/icon_logo@3x.png",
          name: "阿斯兰"
        },
        {
          icon: "images/icon_logo@3x.png",
          name: "阿兰斯"
        }
      ],
      B: [
        {
          icon: "images/icon_logo@3x.png",
          name: "本拉登"
        },
        {
          icon: "images/icon_logo@3x.png",
          name: "巴里"
        }
      ],
      C: [
        {
          icon: "images/icon_logo@3x.png",
          name: "阿斯兰"
        },
        {
          icon: "images/icon_logo@3x.png",
          name: "阿兰斯"
        }
      ],
      D: [
        {
          icon: "images/icon_logo@3x.png",
          name: "本拉登"
        },
        {
          icon: "images/icon_logo@3x.png",
          name: "巴里"
        }
      ],
      E: [
        {
          icon: "images/icon_logo@3x.png",
          name: "阿斯兰"
        },
        {
          icon: "images/icon_logo@3x.png",
          name: "阿兰斯"
        }
      ],
      F: [
        {
          icon: "images/icon_logo@3x.png",
          name: "本拉登"
        },
        {
          icon: "images/icon_logo@3x.png",
          name: "巴里"
        }
      ]
    };

    // 选择城市
    $scope.selectItem = function(item) {
      $rootScope.$broadcast("select-city", item);
      $scope.$ionicGoBack();
    };

    $scope.user = {
      text: ""
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
