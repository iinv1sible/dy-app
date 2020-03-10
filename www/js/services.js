angular
  .module("starter.services", [])

  .directive("hideTabs", function($rootScope) {
    return {
      restrict: "A",
      link: function(scope, element, attributes) {
        scope.$on("$ionicView.beforeEnter", function() {
          scope.$watch(attributes.hideTabs, function(value) {
            $rootScope.hideTabs = value;
          });
        });

        scope.$on("$ionicView.beforeLeave", function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  .directive("ngTouchstart", function() {
    return {
      controller: [
        "$scope",
        "$element",
        function($scope, $element) {
          $element.bind("touchstart", onTouchStart);
          function onTouchStart(event) {
            var method = $element.attr("ng-touchstart");
            $scope.$event = event;
            $scope.$apply(method);
          }
        }
      ]
    };
  })
  .directive("ngTouchmove", function() {
    return {
      controller: [
        "$scope",
        "$element",
        function($scope, $element) {
          $element.bind("touchstart", onTouchStart);
          function onTouchStart(event) {
            event.preventDefault();
            $element.bind("touchmove", onTouchMove);
            $element.bind("touchend", onTouchEnd);
          }
          function onTouchMove(event) {
            var method = $element.attr("ng-touchmove");
            $scope.$event = event;
            $scope.$apply(method);
          }
          function onTouchEnd(event) {
            event.preventDefault();
            $element.unbind("touchmove", onTouchMove);
            $element.unbind("touchend", onTouchEnd);
          }
        }
      ]
    };
  })
  .directive("ngTouchend", function() {
    return {
      controller: [
        "$scope",
        "$element",
        function($scope, $element) {
          $element.bind("touchend", onTouchEnd);
          function onTouchEnd(event) {
            var method = $element.attr("ng-touchend");
            $scope.$event = event;
            $scope.$apply(method);
          }
        }
      ]
    };
  })
  .factory("myUrl", function() {
    var ser = {};
    // ser.url='http://admin.zhidianfan.com:9090';
    ser.url = "https://phone.zhidianfan.com:9091";
    // ser.url='http://server7.zhidianfan.com:9018';
    // ser.url='http://192.168.3.165:9018';
    // ser.url='http://192.168.3.181:9018';
    // ser.url='http://localhost:9018';

    ser.ydurl = "https://wx.zhidianfan.com";
    // ser.ydurl='http://192.168.3.204:9999';
    return ser;
  })
  .factory("$detail", function() {
    return [1, 2, 3];
  })
  .factory("$T", function($translate) {
    var T = {
      T: function(key) {
        if (key) {
          return $translate.instant(key);
        }
        return key;
      }
    };
    return T;
  })
  .factory("$seatData", function() {
    return {};
  })
  .factory("$orderTime", function() {
    return {};
  })
  .factory("$calendar", function() {
    var calendar = {
      me: this,
      lunarInfo: [
        0x04bd8,
        0x04ae0,
        0x0a570,
        0x054d5,
        0x0d260,
        0x0d950,
        0x16554,
        0x056a0,
        0x09ad0,
        0x055d2, //1900-1909
        0x04ae0,
        0x0a5b6,
        0x0a4d0,
        0x0d250,
        0x1d255,
        0x0b540,
        0x0d6a0,
        0x0ada2,
        0x095b0,
        0x14977, //1910-1919
        0x04970,
        0x0a4b0,
        0x0b4b5,
        0x06a50,
        0x06d40,
        0x1ab54,
        0x02b60,
        0x09570,
        0x052f2,
        0x04970, //1920-1929
        0x06566,
        0x0d4a0,
        0x0ea50,
        0x06e95,
        0x05ad0,
        0x02b60,
        0x186e3,
        0x092e0,
        0x1c8d7,
        0x0c950, //1930-1939
        0x0d4a0,
        0x1d8a6,
        0x0b550,
        0x056a0,
        0x1a5b4,
        0x025d0,
        0x092d0,
        0x0d2b2,
        0x0a950,
        0x0b557, //1940-1949
        0x06ca0,
        0x0b550,
        0x15355,
        0x04da0,
        0x0a5b0,
        0x14573,
        0x052b0,
        0x0a9a8,
        0x0e950,
        0x06aa0, //1950-1959
        0x0aea6,
        0x0ab50,
        0x04b60,
        0x0aae4,
        0x0a570,
        0x05260,
        0x0f263,
        0x0d950,
        0x05b57,
        0x056a0, //1960-1969
        0x096d0,
        0x04dd5,
        0x04ad0,
        0x0a4d0,
        0x0d4d4,
        0x0d250,
        0x0d558,
        0x0b540,
        0x0b6a0,
        0x195a6, //1970-1979
        0x095b0,
        0x049b0,
        0x0a974,
        0x0a4b0,
        0x0b27a,
        0x06a50,
        0x06d40,
        0x0af46,
        0x0ab60,
        0x09570, //1980-1989
        0x04af5,
        0x04970,
        0x064b0,
        0x074a3,
        0x0ea50,
        0x06b58,
        0x055c0,
        0x0ab60,
        0x096d5,
        0x092e0, //1990-1999
        0x0c960,
        0x0d954,
        0x0d4a0,
        0x0da50,
        0x07552,
        0x056a0,
        0x0abb7,
        0x025d0,
        0x092d0,
        0x0cab5, //2000-2009
        0x0a950,
        0x0b4a0,
        0x0baa4,
        0x0ad50,
        0x055d9,
        0x04ba0,
        0x0a5b0,
        0x15176,
        0x052b0,
        0x0a930, //2010-2019
        0x07954,
        0x06aa0,
        0x0ad50,
        0x05b52,
        0x04b60,
        0x0a6e6,
        0x0a4e0,
        0x0d260,
        0x0ea65,
        0x0d530, //2020-2029
        0x05aa0,
        0x076a3,
        0x096d0,
        0x04afb,
        0x04ad0,
        0x0a4d0,
        0x1d0b6,
        0x0d250,
        0x0d520,
        0x0dd45, //2030-2039
        0x0b5a0,
        0x056d0,
        0x055b2,
        0x049b0,
        0x0a577,
        0x0a4b0,
        0x0aa50,
        0x1b255,
        0x06d20,
        0x0ada0, //2040-2049
        0x14b63,
        0x09370,
        0x049f8,
        0x04970,
        0x064b0,
        0x168a6,
        0x0ea50,
        0x06b20,
        0x1a6c4,
        0x0aae0, //2050-2059
        0x0a2e0,
        0x0d2e3,
        0x0c960,
        0x0d557,
        0x0d4a0,
        0x0da50,
        0x05d55,
        0x056a0,
        0x0a6d0,
        0x055d4, //2060-2069
        0x052d0,
        0x0a9b8,
        0x0a950,
        0x0b4a0,
        0x0b6a6,
        0x0ad50,
        0x055a0,
        0x0aba4,
        0x0a5b0,
        0x052b0, //2070-2079
        0x0b273,
        0x06930,
        0x07337,
        0x06aa0,
        0x0ad50,
        0x14b55,
        0x04b60,
        0x0a570,
        0x054e4,
        0x0d160, //2080-2089
        0x0e968,
        0x0d520,
        0x0daa0,
        0x16aa6,
        0x056d0,
        0x04ae0,
        0x0a9d4,
        0x0a2d0,
        0x0d150,
        0x0f252, //2090-2099
        0x0d520
      ], //2100
      solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Animals: [
        "鼠",
        "牛",
        "虎",
        "兔",
        "龙",
        "蛇",
        "马",
        "羊",
        "猴",
        "鸡",
        "狗",
        "猪"
      ],
      solarTerm: [
        "小寒",
        "大寒",
        "立春",
        "雨水",
        "惊蛰",
        "春分",
        "清明",
        "谷雨",
        "立夏",
        "小满",
        "芒种",
        "夏至",
        "小暑",
        "大暑",
        "立秋",
        "处暑",
        "白露",
        "秋分",
        "寒露",
        "霜降",
        "立冬",
        "小雪",
        "大雪",
        "冬至"
      ],
      // sTermInfo: [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 505441],
      nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      nStr2: ["初", "十", "廿", "卅"],
      sFtv: [
        "0101 元旦",
        "0214 情人节",
        "0308 妇女节",
        "0401 愚人节",
        "0501 劳动节",
        "0504 青年节",
        "0601 儿童节",
        "0910 教师节",
        "1001 国庆节",
        "1031 万圣节",
        "1224 平安夜",
        "1225 圣诞节"
      ],
      lFtv: [
        "0101 春节",
        "0115 元宵节",
        "0505 端午节",
        "0707 七夕节",
        "0715 中元节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "1223 小年"
      ],
      // jFtv:{
      //   2018:{1:['1','10','11','13']}
      // },
      dateMap: {
        "2019": [
          5,
          20,
          4,
          19,
          6,
          21,
          5,
          20,
          6,
          21,
          6,
          21,
          7,
          23,
          8,
          23,
          8,
          23,
          8,
          24,
          8,
          22,
          7,
          22
        ],
        "2020": [
          6,
          20,
          4,
          19,
          5,
          20,
          4,
          19,
          5,
          20,
          5,
          21,
          6,
          22,
          7,
          22,
          7,
          22,
          8,
          23,
          7,
          22,
          7,
          21
        ],
        "2021": [
          5,
          20,
          3,
          18,
          5,
          20,
          4,
          20,
          5,
          21,
          5,
          21,
          7,
          22,
          7,
          23,
          7,
          23,
          8,
          23,
          7,
          22,
          7,
          21
        ],
        "2022": [
          5,
          20,
          4,
          19,
          5,
          20,
          5,
          20,
          5,
          21,
          6,
          21,
          7,
          23,
          7,
          23,
          7,
          23,
          8,
          23,
          7,
          22,
          7,
          22
        ],
        "2023": [
          5,
          20,
          4,
          19,
          6,
          21,
          5,
          20,
          6,
          21,
          6,
          21,
          7,
          23,
          8,
          23,
          8,
          23,
          8,
          24,
          8,
          22,
          7,
          22
        ]
      },

      sTermInfo: [
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa",
        "9778397bd19801ec9210c965cc920e",
        "97b6b97bd19801ec95f8c965cc920f",
        "97bd09801d98082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd197c36c9210c9274c91aa",
        "97b6b97bd19801ec95f8c965cc920e",
        "97bd09801d98082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa",
        "97b6b97bd19801ec95f8c965cc920e",
        "97bcf97c3598082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd07f595b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2",
        "9778397bd19801ec9210c9274c920e",
        "97b6b97bd19801ec95f8c965cc920f",
        "97bd07f5307f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c920e",
        "97b6b97bd19801ec95f8c965cc920f",
        "97bd07f5307f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bd07f1487f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c9274c920e",
        "97bcf7f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c91aa",
        "97b6b97bd197c36c9210c9274c920e",
        "97bcf7f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c920e",
        "97b6b7f0e47f531b0723b0b6fb0722",
        "7f0e37f5307f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36b0b70c9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0787b0721",
        "7f0e27f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c91aa",
        "97b6b7f0e47f149b0723b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2",
        "977837f0e37f149b0723b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e37f5307f595b0b0bc920fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2",
        "977837f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0723b06bd",
        "7f07e7f0e37f149b0723b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e37f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0723b06bd",
        "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0723b06bd",
        "7f07e7f0e37f14998083b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14898082b0723b02d5",
        "7f07e7f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e36665b66aa89801e9808297c35",
        "665f67f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e36665b66a449801e9808297c35",
        "665f67f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e36665b66a449801e9808297c35",
        "665f67f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e26665b66a449801e9808297c35",
        "665f67f0e37f1489801eb072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722"
      ],
      dayCyl: null,
      monCyl: null,
      year: null,
      yearCyl: null,
      isLeap: null,
      month: null,
      day: null,
      isToday: null,
      sYear: null,
      sMonth: null,
      sDay: null,
      week: null,
      lYear: null,
      lMonth: null,
      lDay: null,
      lunarFestival: null,
      solarFestival: null,
      solarTerms: null,
      fat: 9,
      mat: 9,
      eve: 0,
      length: null,
      firstWeek: null,
      tY: null,
      tM: null,
      tD: null,
      //保存系统时间
      getTime: function() {
        var Today = new Date();
        this.tY = Today.getFullYear();
        this.tM = Today.getMonth();
        this.tD = Today.getDate();
      },
      //返回农历y年m月的总天数
      monthDays: function(y, m) {
        return this.lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
      },
      //判断y年的农历中那个月是闰月,不是闰月返回0
      leapMonth: function(y) {
        return this.lunarInfo[y - 1900] & 0xf;
      },
      //返回农历y年闰月的天数
      leapDays: function(y) {
        if (this.leapMonth(y))
          return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        else return 0;
      },
      //返回农历y年的总天数
      lYearDays: function(y) {
        var i,
          sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1)
          sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
        return sum + this.leapDays(y);
      },
      //算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
      Dianaday: function(objDate) {
        var i,
          leap = 0,
          temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;
        this.dayCyl = offset + 40;
        this.monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
          temp = this.lYearDays(i);
          offset -= temp;
          this.monCyl += 12;
        }
        if (offset < 0) {
          offset += temp;
          i--;
          this.monCyl -= 12;
        }
        this.year = i;
        this.yearCyl = i - 1864;
        leap = this.leapMonth(i); //闰哪个月
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
          if (leap > 0 && i == leap + 1 && this.isLeap == false) {
            //闰月
            --i;
            this.isLeap = true;
            temp = this.leapDays(this.year);
          } else {
            temp = this.monthDays(this.year, i);
          }
          if (this.isLeap == true && i == leap + 1) this.isLeap = false; //解除闰月
          offset -= temp;
          if (this.isLeap == false) this.monCyl++;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
          if (this.isLeap) {
            this.isLeap = false;
          } else {
            this.isLeap = true;
            --i;
            --this.monCyl;
          }
        if (offset < 0) {
          offset += temp;
          --i;
          --this.monCyl;
        }
        this.month = i;
        this.day = offset + 1;
      },
      //返回公历y年m+1月的天数
      solarDays: function(y, m) {
        if (m == 1)
          return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
        else return this.solarMonth[m];
      },
      //记录公历和农历某天的日期
      calElement: function(
        sYear,
        sMonth,
        sDay,
        week,
        lYear,
        lMonth,
        lDay,
        isLeap
      ) {
        this.isToday = false;
        //公历
        this.sYear = sYear;
        this.sMonth = sMonth;
        this.sDay = sDay;
        this.week = week;
        //农历
        this.lYear = lYear;
        this.lMonth = lMonth;
        this.lDay = lDay;
        this.isLeap = isLeap;
        //节日记录
        this.lunarFestival = ""; //农历节日
        this.solarFestival = ""; //公历节日
        this.solarTerms = ""; //节气
      },
      //返回某年的第n个节气为几日(从0小寒起算)
      sTerm: function(y, n) {
        // if (this.dateMap[y][n]) {
        //   return this.dateMap[y][n]
        // }
        // var offDate = new Date((31556925974.7*(y-1900)+this.sTermInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
        // return(offDate.getUTCDate())
        if (y < 1900 || y > 2100) {
          return -1;
        }
        if (n < 1 || n > 24) {
          return -1;
        }
        var _table = this.sTermInfo[y - 1900];
        var _info = [
          parseInt("0x" + _table.substr(0, 5)).toString(),
          parseInt("0x" + _table.substr(5, 5)).toString(),
          parseInt("0x" + _table.substr(10, 5)).toString(),
          parseInt("0x" + _table.substr(15, 5)).toString(),
          parseInt("0x" + _table.substr(20, 5)).toString(),
          parseInt("0x" + _table.substr(25, 5)).toString()
        ];
        var _calday = [
          _info[0].substr(0, 1),
          _info[0].substr(1, 2),
          _info[0].substr(3, 1),
          _info[0].substr(4, 2),

          _info[1].substr(0, 1),
          _info[1].substr(1, 2),
          _info[1].substr(3, 1),
          _info[1].substr(4, 2),

          _info[2].substr(0, 1),
          _info[2].substr(1, 2),
          _info[2].substr(3, 1),
          _info[2].substr(4, 2),

          _info[3].substr(0, 1),
          _info[3].substr(1, 2),
          _info[3].substr(3, 1),
          _info[3].substr(4, 2),

          _info[4].substr(0, 1),
          _info[4].substr(1, 2),
          _info[4].substr(3, 1),
          _info[4].substr(4, 2),

          _info[5].substr(0, 1),
          _info[5].substr(1, 2),
          _info[5].substr(3, 1),
          _info[5].substr(4, 2)
        ];
        return parseInt(_calday[n - 1]);
      },
      //保存y年m+1月的相关信息
      calendar: function(y, m) {
        this.getTime();
        var sDObj,
          lDObj,
          lY,
          lM,
          lD = 1,
          lL,
          lX = 0,
          tmp1,
          tmp2;
        var lDPOS = new Array(3);
        var n = 0;
        var firstLM = 0;
        sDObj = new Date(y, m, 1); //当月第一天的日期
        this.length = this.solarDays(y, m); //公历当月天数
        this.firstWeek = sDObj.getDay(); //公历当月1日星期几
        if (m + 1 == 5) {
          this.fat = sDObj.getDay();
        }
        if (m + 1 == 6) {
          this.mat = sDObj.getDay();
        }
        for (var i = 0; i < this.length; i++) {
          if (lD > lX) {
            sDObj = new Date(y, m, i + 1); //当月第一天的日期
            this.Dianaday(sDObj); //农历
            lY = this.year; //农历年
            lM = this.month; //农历月
            lD = this.day; //农历日
            lL = this.isLeap; //农历是否闰月
            lX = lL ? this.leapDays(lY) : this.monthDays(lY, lM); //农历当月最後一天
            if (lM == 12) {
              this.eve = lX;
            }
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
          }
          this.calElement(
            y,
            m + 1,
            i + 1,
            this.nStr1[(i + this.firstWeek) % 7],
            lY,
            lM,
            lD++,
            lL
          );
          var me = this;
          this[i] = {
            isToday: false,
            //公历
            sYear: me.sYear,
            sMonth: me.sMonth,
            sDay: me.sDay,
            week: me.week,
            //农历
            lYear: me.lYear,
            lMonth: me.lMonth,
            lDay: me.lDay,
            isLeap: me.isLeap,
            //节日记录
            lunarFestival: "", //农历节日
            solarFestival: "", //公历节日
            solarTerms: "" //节气
          };
          if ((i + this.firstWeek) % 7 == 0) {
            this[i].color = "red"; //周日颜色
          }
        }
        //节气
        // tmp1=this.sTerm(y,m*2)-1;
        // tmp2=this.sTerm(y,m*2+1)-1;
        tmp1 = this.sTerm(y, m * 2 + 1) - 1;
        tmp2 = this.sTerm(y, m * 2 + 2) - 1;
        this[tmp1].solarTerms = this.solarTerm[m * 2];
        this[tmp2].solarTerms = this.solarTerm[m * 2 + 1];
        // if((this.firstWeek+12)%7==5)	//黑色星期五
        //   this[12].solarFestival += '黑五';
        if (y == this.tY && m == this.tM) {
          this[this.tD - 1].isToday = true;
          this.isToday = true;
        } else {
          this.isToday = false;
        }
        //今日
      },
      //用中文显示农历的日期
      cDay: function(d) {
        var s;
        switch (d) {
          case 10:
            s = "初十";
            break;
          case 20:
            s = "二十";
            break;
            break;
          case 30:
            s = "三十";
            break;
            break;
          default:
            s = this.nStr2[Math.floor(d / 10)];
            s += this.nStr1[d % 10];
        }
        return s;
      },
      //在表格中显示公历和农历的日期,以及相关节日
      drawCld: function(SY, SM) {
        var TF = true;
        var p1 = (p2 = "");
        var i, sD, s, size;
        this.calendar(SY, SM);
        //GZ.innerHTML = '【'+Animals[(SY-4)%12]+'】';	//生肖
        var dayList = [];
        for (i = 0; i < 42; i++) {
          //sObj=eval('SD'+ i);//
          //lObj=eval('LD'+ i);//农历日
          //sObj.className = '';
          var dayDetail = {};
          sD = i - this.firstWeek;
          if (sD > -1 && sD < this.length) {
            //日期内
            dayDetail.ylr = sD + 1;
            if (this[sD].isToday) {
              dayDetail.color = "#9900FF";
            } else {
              dayDetail.color = "#000";
            } //今日颜色
            if (this[sD].lDay == 1) {
              //显示农历月(不显示日)
              dayDetail.nlr =
                (this[sD].isLeap ? "闰" : "") +
                this[sD].lMonth +
                "月" +
                (this.monthDays(this[sD].lYear, this[sD].lMonth) == 29
                  ? "小"
                  : "大");
            } else {
              dayDetail.nlr = this.cDay(Math.round(this[sD].lDay));
            } //显示农历日
            var Slfw = (Ssfw = null);
            s = this[sD].solarFestival;
            for (var ipp = 0; ipp < this.lFtv.length; ipp++) {
              //农历节日
              if (parseInt(this.lFtv[ipp].substr(0, 2)) == this[sD].lMonth) {
                if (
                  parseInt(this.lFtv[ipp].substr(2, 4)) ==
                  Math.round(this[sD].lDay)
                ) {
                  dayDetail.nlr = this.lFtv[ipp].substr(5);
                  dayDetail.color = "#DA4C39";
                  Slfw = this.lFtv[ipp].substr(5);
                }
              }
              if (12 == this[sD].lMonth) {
                //判断是否为除夕
                if (this.eve == this[sD].lDay) {
                  dayDetail.nlr = "除夕";
                  Slfw = "除夕";
                  dayDetail.color = "#DA4C39";
                }
              }
            }
            for (var ipp = 0; ipp < this.sFtv.length; ipp++) {
              //公历节日
              if (parseInt(this.sFtv[ipp].substr(0, 2)) == SM + 1) {
                if (parseInt(this.sFtv[ipp].substr(2, 4)) == sD + 1) {
                  dayDetail.nlr = this.sFtv[ipp].substr(5);
                  dayDetail.color = "#6CC1AD";
                  Ssfw = this.sFtv[ipp].substr(5);
                }
              }
            }
            if (SM + 1 == 5) {
              //母亲节
              if (this.fat == 0) {
                if (sD + 1 == 7) {
                  Ssfw = "母亲节";
                  dayDetail.nlr = "母亲节";
                  dayDetail.color = "#6CC1AD";
                }
              } else if (this.fat < 9) {
                if (sD + 1 == 7 - this.fat + 8) {
                  Ssfw = "母亲节";
                  dayDetail.nlr = "母亲节";
                  dayDetail.color = "#6CC1AD";
                }
              }
            }
            if (SM + 1 == 6) {
              //父亲节
              if (this.mat == 0) {
                if (sD + 1 == 14) {
                  Ssfw = "父亲节";
                  dayDetail.nlr = "父亲节";
                  dayDetail.color = "#6CC1AD";
                }
              } else if (this.mat < 9) {
                if (sD + 1 == 7 - this.mat + 15) {
                  Ssfw = "父亲节";
                  dayDetail.nlr = "父亲节";
                  dayDetail.color = "#6CC1AD";
                }
              }
            }
            if (s.length <= 0) {
              //设置节气的颜色
              s = this[sD].solarTerms;
            }
            console.log(s);
            if (s.length > 0) {
              var nlrfirst = dayDetail.nlr[0];
              if (
                nlrfirst != "初" &&
                nlrfirst != "十" &&
                nlrfirst != "廿" &&
                nlrfirst != "二" &&
                nlrfirst != "三" &&
                nlrfirst != "卅"
              ) {
                dayDetail.nlr += "/" + s;
              } else {
                dayDetail.nlr = s;
              }
              dayDetail.color = "#EEAE44";
              Slfw = s;
            } //节气
            if (Slfw != null && Ssfw != null) {
              dayDetail.nlr = Slfw + "/" + Ssfw;
              dayDetail.color = "#EEAE44";
            }
          } else {
            //非日期
            dayDetail.ylr = "";
            dayDetail.nlr = "";
          }
          dayList.push(dayDetail);
        }
        if (this.isToday) {
          var num = null;
          for (var i = 0; i < dayList.length; i++) {
            if (dayList[i].ylr == this.tD) {
              num = i;
              break;
            }
          }
          for (var a = 0; a < num; a++) {
            dayList[a].color = "#cccc";
          }
        }
        var dateYear = new Date().getFullYear();
        var dateMonth = new Date().getMonth() + 1;
        if (
          (this.sYear <= dateYear && this.sMonth < dateMonth) ||
          this.sYear < dateYear
        ) {
          for (var i = 0; i < dayList.length; i++) {
            dayList[i].color = "#cccc";
          }
        }
        for (var b = 0; b < dayList.length; b++) {
          dayList[b].id = b;
          // if (this.jFtv[SY] && this.jFtv[SY][SM+1]) {
          //   for (var c = 0; c < this.jFtv[SY][SM+1].length; c++) {
          //     if (dayList[b].ylr == this.jFtv[SY][SM+1][c]) {
          //       dayList[b].color ='red';
          //       dayList[b].ylr = '吉';
          //     }
          //   }
          // }
        }
        return dayList;
      },
      drawCldNew: function(SY, SM) {
        var TF = true;
        var p1 = (p2 = "");
        var i, sD, s, size;
        this.calendar(SY, SM);
        //GZ.innerHTML = '【'+Animals[(SY-4)%12]+'】';	//生肖
        var dayList = [];
        for (i = 0; i < 42; i++) {
          //sObj=eval('SD'+ i);//
          //lObj=eval('LD'+ i);//农历日
          //sObj.className = '';
          var dayDetail = {};
          sD = i - this.firstWeek;
          if (sD > -1 && sD < this.length) {
            //日期内
            dayDetail.ylr = sD + 1;
            if (this[sD].isToday) {
              dayDetail.color = "#9900FF";
            } else {
              dayDetail.color = "#000";
            } //今日颜色
            if (this[sD].lDay == 1) {
              //显示农历月(不显示日)
              dayDetail.nlr =
                (this[sD].isLeap ? "闰" : "") +
                this[sD].lMonth +
                "月" +
                (this.monthDays(this[sD].lYear, this[sD].lMonth) == 29
                  ? "小"
                  : "大");
            } else {
              dayDetail.nlr = this.cDay(Math.round(this[sD].lDay));
            } //显示农历日
            var Slfw = (Ssfw = null);
            s = this[sD].solarFestival;
            for (var ipp = 0; ipp < this.lFtv.length; ipp++) {
              //农历节日
              if (parseInt(this.lFtv[ipp].substr(0, 2)) == this[sD].lMonth) {
                if (parseInt(this.lFtv[ipp].substr(2, 4)) == this[sD].lDay) {
                  dayDetail.nlr = this.lFtv[ipp].substr(5);
                  dayDetail.color = "#DA4C39";
                  Slfw = this.lFtv[ipp].substr(5);
                }
              }
              if (12 == this[sD].lMonth) {
                //判断是否为除夕
                if (this.eve == this[sD].lDay) {
                  dayDetail.nlr = "除夕";
                  Slfw = "除夕";
                  dayDetail.color = "#DA4C39";
                }
              }
            }
            for (var ipp = 0; ipp < this.sFtv.length; ipp++) {
              //公历节日
              if (parseInt(this.sFtv[ipp].substr(0, 2)) == SM + 1) {
                if (parseInt(this.sFtv[ipp].substr(2, 4)) == sD + 1) {
                  dayDetail.nlr = this.sFtv[ipp].substr(5);
                  dayDetail.color = "#6CC1AD";
                  Ssfw = this.sFtv[ipp].substr(5);
                }
              }
            }
            if (SM + 1 == 5) {
              //母亲节
              if (this.fat == 0) {
                if (sD + 1 == 7) {
                  Ssfw = "母亲节";
                  dayDetail.nlr = "母亲节";
                  dayDetail.color = "#6CC1AD";
                }
              } else if (this.fat < 9) {
                if (sD + 1 == 7 - this.fat + 8) {
                  Ssfw = "母亲节";
                  dayDetail.nlr = "母亲节";
                  dayDetail.color = "#6CC1AD";
                }
              }
            }
            if (SM + 1 == 6) {
              //父亲节
              if (this.mat == 0) {
                if (sD + 1 == 14) {
                  Ssfw = "父亲节";
                  dayDetail.nlr = "父亲节";
                  dayDetail.color = "#6CC1AD";
                }
              } else if (this.mat < 9) {
                if (sD + 1 == 7 - this.mat + 15) {
                  Ssfw = "父亲节";
                  dayDetail.nlr = "父亲节";
                  dayDetail.color = "#6CC1AD";
                }
              }
            }
            if (s.length <= 0) {
              //设置节气的颜色
              s = this[sD].solarTerms;
            }
            if (s.length > 0) {
              dayDetail.nlr = s;
              dayDetail.color = "#EEAE44";
              Slfw = s;
            } //节气
            if (Slfw != null && Ssfw != null) {
              dayDetail.nlr = Slfw + "/" + Ssfw;
              dayDetail.color = "#EEAE44";
            }
          } else {
            //非日期
            dayDetail.ylr = "";
            dayDetail.nlr = "";
          }
          dayList.push(dayDetail);
        }
        if (this.isToday) {
          var num = null;
          for (var i = 0; i < dayList.length; i++) {
            if (dayList[i].ylr == this.tD) {
              num = i;
              break;
            }
          }
          // for(var a=0;a<num;a++){
          //   dayList[a].color='#ccc';
          // }
        }
        for (var b = 0; b < dayList.length; b++) {
          dayList[b].id = b;
          // if (this.jFtv[SY] && this.jFtv[SY][SM+1]) {
          //   for (var c = 0; c < this.jFtv[SY][SM+1].length; c++) {
          //     if (dayList[b].ylr == this.jFtv[SY][SM+1][c]) {
          //       dayList[b].color ='red';
          //       dayList[b].ylr = '吉';
          //     }
          //   }
          // }
        }
        return dayList;
      }
    };
    return calendar;
  })
  .factory("$calendarY", function() {
    var calendar = {
      me: this,
      lunarInfo: [
        0x04bd8,
        0x04ae0,
        0x0a570,
        0x054d5,
        0x0d260,
        0x0d950,
        0x16554,
        0x056a0,
        0x09ad0,
        0x055d2,
        0x04ae0,
        0x0a5b6,
        0x0a4d0,
        0x0d250,
        0x1d255,
        0x0b540,
        0x0d6a0,
        0x0ada2,
        0x095b0,
        0x14977,
        0x04970,
        0x0a4b0,
        0x0b4b5,
        0x06a50,
        0x06d40,
        0x1ab54,
        0x02b60,
        0x09570,
        0x052f2,
        0x04970,
        0x06566,
        0x0d4a0,
        0x0ea50,
        0x06e95,
        0x05ad0,
        0x02b60,
        0x186e3,
        0x092e0,
        0x1c8d7,
        0x0c950,
        0x0d4a0,
        0x1d8a6,
        0x0b550,
        0x056a0,
        0x1a5b4,
        0x025d0,
        0x092d0,
        0x0d2b2,
        0x0a950,
        0x0b557,
        0x06ca0,
        0x0b550,
        0x15355,
        0x04da0,
        0x0a5d0,
        0x14573,
        0x052d0,
        0x0a9a8,
        0x0e950,
        0x06aa0,
        0x0aea6,
        0x0ab50,
        0x04b60,
        0x0aae4,
        0x0a570,
        0x05260,
        0x0f263,
        0x0d950,
        0x05b57,
        0x056a0,
        0x096d0,
        0x04dd5,
        0x04ad0,
        0x0a4d0,
        0x0d4d4,
        0x0d250,
        0x0d558,
        0x0b540,
        0x0b5a0,
        0x195a6,
        0x095b0,
        0x049b0,
        0x0a974,
        0x0a4b0,
        0x0b27a,
        0x06a50,
        0x06d40,
        0x0af46,
        0x0ab60,
        0x09570,
        0x04af5,
        0x04970,
        0x064b0,
        0x074a3,
        0x0ea50,
        0x06b58,
        0x055c0,
        0x0ab60,
        0x096d5,
        0x092e0,
        0x0c960,
        0x0d954,
        0x0d4a0,
        0x0da50,
        0x07552,
        0x056a0,
        0x0abb7,
        0x025d0,
        0x092d0,
        0x0cab5,
        0x0a950,
        0x0b4a0,
        0x0baa4,
        0x0ad50,
        0x055d9,
        0x04ba0,
        0x0a5b0,
        0x15176,
        0x052b0,
        0x0a930,
        0x07954,
        0x06aa0,
        0x0ad50,
        0x05b52,
        0x04b60,
        0x0a6e6,
        0x0a4e0,
        0x0d260,
        0x0ea65,
        0x0d530,
        0x05aa0,
        0x076a3,
        0x096d0,
        0x04bd7,
        0x04ad0,
        0x0a4d0,
        0x1d0b6,
        0x0d250,
        0x0d520,
        0x0dd45,
        0x0b5a0,
        0x056d0,
        0x055b2,
        0x049b0,
        0x0a577,
        0x0a4b0,
        0x0aa50,
        0x1b255,
        0x06d20,
        0x0ada0
      ],
      solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Animals: [
        "鼠",
        "牛",
        "虎",
        "兔",
        "龙",
        "蛇",
        "马",
        "羊",
        "猴",
        "鸡",
        "狗",
        "猪"
      ],
      solarTerm: [
        "小寒",
        "大寒",
        "立春",
        "雨水",
        "惊蛰",
        "春分",
        "清明",
        "谷雨",
        "立夏",
        "小满",
        "芒种",
        "夏至",
        "小暑",
        "大暑",
        "立秋",
        "处暑",
        "白露",
        "秋分",
        "寒露",
        "霜降",
        "立冬",
        "小雪",
        "大雪",
        "冬至"
      ],
      // sTermInfo: [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 505441],
      nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      nStr2: ["初", "十", "廿", "卅"],
      sFtv: [
        "0101 元旦",
        "0214 情人节",
        "0308 妇女节",
        "0401 愚人节",
        "0501 劳动节",
        "0504 青年节",
        "0601 儿童节",
        "0910 教师节",
        "1001 国庆节",
        "1031 万圣节",
        "1224 平安夜",
        "1225 圣诞节"
      ],
      lFtv: [
        "0101 春节",
        "0115 元宵节",
        "0505 端午节",
        "0707 七夕节",
        "0715 中元节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "1223 小年"
      ],
      jFtv: {
        2017: {
          7: [1, 4, 7, 9, 10, 14, 15, 16, 17, 26, 29],
          8: [1, 2, 3, 8, 10, 11, 13, 15, 17, 21, 22, 23, 24, 25, 27, 29],
          9: [1, 3, 4, 5, 6, 8, 14, 15, 20, 23, 27, 28, 30],
          10: [5, 10, 12, 13, 19, 22, 24, 26],
          11: [2, 3, 5, 6, 7, 9, 12, 13, 21, 25, 27],
          12: [1, 3, 8, 11, 19, 20, 28]
        },
        2018: {
          1: [1, 10, 11, 13, 18, 23, 24, 26],
          2: [4, 7, 8, 13, 19, 20, 22, 25, 28],
          3: [4, 5, 10, 15, 16, 19, 21, 24, 27, 28],
          4: [3, 7, 8, 16, 20, 28, 30],
          5: [6, 8, 11, 12, 14, 15, 18, 23, 26, 28, 29, 30],
          6: [1, 3, 5, 6, 8, 11, 14, 18, 20, 21, 22, 26, 29],
          7: [3, 4, 5, 9, 10, 11, 12, 21, 24, 27, 28, 29],
          8: [2, 3, 5, 8, 10, 12, 16, 17, 18, 19, 20, 22, 24, 27, 29, 30, 31],
          9: [1, 5, 9, 10, 15, 18, 22, 23, 25, 30],
          10: [3, 5, 7, 8, 14, 17, 19, 21, 28, 29, 31],
          11: [1, 7, 8, 16, 20, 22, 26, 28],
          12: [2, 14, 15, 23, 27]
        },
        2019: {
          1: [4, 5, 6, 8, 13, 18, 19, 21, 30],
          2: [1, 2, 8, 14, 15, 17, 20, 23, 27],
          3: [1, 10, 11, 14, 16, 19, 22, 23, 29],
          4: [4, 11, 15, 23, 25, 30],
          5: [5, 6, 7, 9, 10, 13, 18, 21, 23, 24, 25, 27, 29, 31],
          6: [2, 5, 6, 9, 13, 15, 16, 17, 21, 24, 28, 29, 30],
          7: [3, 6, 7, 16, 19, 22, 23, 24, 28, 29, 31],
          8: [2, 3, 4, 5, 11, 12, 13, 14, 15, 19, 22, 24, 25, 26, 27, 31],
          9: [3, 4, 6, 7, 10, 13, 17, 18, 20, 25, 28, 30],
          10: [2, 7, 9, 12, 14, 16, 23, 24, 26, 27],
          11: [2, 5, 11, 15, 17, 21, 23, 27],
          12: [5, 9, 10, 18, 22, 30]
        },
        2020: {
          1: [3, 8, 13, 14, 16, 25, 27, 28, 30],
          2: [1, 2, 9, 10, 12, 15, 18, 22, 24],
          3: [1, 2, 5, 8, 10, 13, 16, 17, 23, 29],
          4: [1, 3, 5, 9, 17, 19, 24, 29, 30],
          5: [3, 7, 12, 15, 17, 18, 19, 21, 23, 25, 27, 30],
          6: [2, 7, 9, 10, 11, 15, 18, 22, 23, 24, 27, 30],
          7: [1, 3, 10, 13, 16, 17, 18, 22, 23, 25, 27, 28, 29, 30],
          8: [3, 4, 7, 8, 9, 13, 16, 18, 19, 20, 21, 25, 28, 29, 31],
          9: [1, 7, 11, 12, 14, 19, 22, 24, 26],
          10: [1, 4, 6, 8, 10, 18, 20, 21, 27, 30],
          11: [3, 9, 11, 15, 17, 21, 29],
          12: [2, 5, 12, 16, 24, 28]
        },
        2021: {
          1: [7, 8, 10, 19, 21, 22, 24, 26, 27, 31],
          2: [2, 3, 4, 6, 9, 12, 16, 18, 24, 25, 28],
          3: [5, 8, 11, 12, 18, 24, 27, 29],
          4: [1, 4, 12, 14, 19, 24, 25, 28],
          5: [7, 10, 12, 13, 14, 16, 18, 20, 22, 25, 28, 31],
          6: [1, 5, 6, 10, 13, 17, 18, 19, 22, 25, 26, 28],
          7: [1, 8, 11, 12, 13, 17, 18, 20, 22, 23, 24, 25, 29, 30],
          8: [4, 5, 8, 11, 13, 14, 15, 16, 20, 23, 24, 26, 27],
          9: [5, 7, 9, 14, 17, 19, 21, 26, 29],
          10: [1, 3, 5, 12, 13, 15, 16, 22, 25, 29],
          11: [5, 6, 10, 12, 16, 24, 27, 30],
          12: [6, 7, 11, 19, 23, 31]
        },
        2022: {
          1: [5, 14, 16, 17, 19, 21, 22, 26, 28, 29, 31],
          2: [2, 4, 7, 11, 13, 19, 20, 23, 28],
          3: [4, 6, 7, 13, 19, 22, 24, 27, 29],
          4: [1, 3, 7, 9, 14, 19, 20, 23],
          5: [1, 5, 7, 8, 9, 11, 13, 15, 17, 20, 23, 26, 27],
          6: [1, 2, 4, 8, 12, 13, 14, 17, 20, 21, 23, 26],
          7: [5, 6, 7, 8, 12, 13, 15, 17, 18, 19, 20, 24, 25, 30, 31],
          8: [5, 6, 8, 9, 10, 11, 15, 18, 19, 21, 22, 31],
          9: [2, 9, 12, 14, 16, 21, 24, 26, 28, 30],
          10: [3, 6, 8, 10, 11, 17, 20, 24, 31],
          11: [1, 2, 3, 4, 7, 11, 19, 22, 25],
          12: [1, 3, 4, 14, 18, 26]
        }
      },
      dateMap: {
        "2019": [
          5,
          20,
          4,
          19,
          6,
          21,
          5,
          20,
          6,
          21,
          6,
          21,
          7,
          23,
          8,
          23,
          8,
          23,
          8,
          24,
          8,
          22,
          7,
          22
        ],
        "2020": [
          6,
          20,
          4,
          19,
          5,
          20,
          4,
          19,
          5,
          20,
          5,
          21,
          6,
          22,
          7,
          22,
          7,
          22,
          8,
          23,
          7,
          22,
          7,
          21
        ],
        "2021": [
          5,
          20,
          3,
          18,
          5,
          20,
          4,
          20,
          5,
          21,
          5,
          21,
          7,
          22,
          7,
          23,
          7,
          23,
          8,
          23,
          7,
          22,
          7,
          21
        ],
        "2022": [
          5,
          20,
          4,
          19,
          5,
          20,
          5,
          20,
          5,
          21,
          6,
          21,
          7,
          23,
          7,
          23,
          7,
          23,
          8,
          23,
          7,
          22,
          7,
          22
        ],
        "2023": [
          5,
          20,
          4,
          19,
          6,
          21,
          5,
          20,
          6,
          21,
          6,
          21,
          7,
          23,
          8,
          23,
          8,
          23,
          8,
          24,
          8,
          22,
          7,
          22
        ]
      },

      sTermInfo: [
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd0b06bdb0722c965ce1cfcc920f",
        "b027097bd097c36b0b6fc9274c91aa",
        "9778397bd19801ec9210c965cc920e",
        "97b6b97bd19801ec95f8c965cc920f",
        "97bd09801d98082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd197c36c9210c9274c91aa",
        "97b6b97bd19801ec95f8c965cc920e",
        "97bd09801d98082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa",
        "97b6b97bd19801ec95f8c965cc920e",
        "97bcf97c3598082c95f8e1cfcc920f",
        "97bd097bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c3598082c95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf97c359801ec95f8c965cc920f",
        "97bd097bd07f595b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2",
        "9778397bd19801ec9210c9274c920e",
        "97b6b97bd19801ec95f8c965cc920f",
        "97bd07f5307f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c920e",
        "97b6b97bd19801ec95f8c965cc920f",
        "97bd07f5307f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bd07f1487f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c965cc920e",
        "97bcf7f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b97bd19801ec9210c9274c920e",
        "97bcf7f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c91aa",
        "97b6b97bd197c36c9210c9274c920e",
        "97bcf7f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36c9210c9274c920e",
        "97b6b7f0e47f531b0723b0b6fb0722",
        "7f0e37f5307f595b0b0bc920fb0722",
        "7f0e397bd097c36b0b6fc9210c8dc2",
        "9778397bd097c36b0b70c9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9274c91aa",
        "97b6b7f0e47f531b0723b0787b0721",
        "7f0e27f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c91aa",
        "97b6b7f0e47f149b0723b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "9778397bd097c36b0b6fc9210c8dc2",
        "977837f0e37f149b0723b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e37f5307f595b0b0bc920fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2",
        "977837f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc9210c8dc2",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd097c35b0b6fc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0787b06bd",
        "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f0e47f531b0b0bb0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14998082b0723b06bd",
        "7f07e7f0e37f149b0723b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e397bd07f595b0b0bc920fb0722",
        "977837f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e37f1487f595b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e37f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e37f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f1487f531b0b0bb0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0723b06bd",
        "7f07e7f0e47f149b0723b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14998082b0723b06bd",
        "7f07e7f0e37f14998083b0787b0721",
        "7f0e27f0e47f531b0723b0b6fb0722",
        "7f0e37f0e366aa89801eb072297c35",
        "7ec967f0e37f14898082b0723b02d5",
        "7f07e7f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e36665b66aa89801e9808297c35",
        "665f67f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b0721",
        "7f07e7f0e47f531b0723b0b6fb0722",
        "7f0e36665b66a449801e9808297c35",
        "665f67f0e37f14898082b0723b02d5",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e36665b66a449801e9808297c35",
        "665f67f0e37f14898082b072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e26665b66a449801e9808297c35",
        "665f67f0e37f1489801eb072297c35",
        "7ec967f0e37f14998082b0787b06bd",
        "7f07e7f0e47f531b0723b0b6fb0721",
        "7f0e27f1487f531b0b0bb0b6fb0722"
      ],
      dayCyl: null,
      monCyl: null,
      year: null,
      yearCyl: null,
      isLeap: null,
      month: null,
      day: null,
      isToday: null,
      sYear: null,
      sMonth: null,
      sDay: null,
      week: null,
      lYear: null,
      lMonth: null,
      lDay: null,
      lunarFestival: null,
      solarFestival: null,
      solarTerms: null,
      fat: 9,
      mat: 9,
      eve: 0,
      length: null,
      firstWeek: null,
      tY: null,
      tM: null,
      tD: null,
      //保存系统时间
      getTime: function() {
        var Today = new Date();
        this.tY = Today.getFullYear();
        this.tM = Today.getMonth();
        this.tD = Today.getDate();
      },
      //返回农历y年m月的总天数
      monthDays: function(y, m) {
        return this.lunarInfo[y - 1900] & (0x10000 >> m) ? 30 : 29;
      },
      //判断y年的农历中那个月是闰月,不是闰月返回0
      leapMonth: function(y) {
        return this.lunarInfo[y - 1900] & 0xf;
      },
      //返回农历y年闰月的天数
      leapDays: function(y) {
        if (this.leapMonth(y))
          return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        else return 0;
      },
      //返回农历y年的总天数
      lYearDays: function(y) {
        var i,
          sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1)
          sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
        return sum + this.leapDays(y);
      },
      //算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
      Dianaday: function(objDate) {
        var i,
          leap = 0,
          temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;
        this.dayCyl = offset + 40;
        this.monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
          temp = this.lYearDays(i);
          offset -= temp;
          this.monCyl += 12;
        }
        if (offset < 0) {
          offset += temp;
          i--;
          this.monCyl -= 12;
        }
        this.year = i;
        this.yearCyl = i - 1864;
        leap = this.leapMonth(i); //闰哪个月
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
          if (leap > 0 && i == leap + 1 && this.isLeap == false) {
            //闰月
            --i;
            this.isLeap = true;
            temp = this.leapDays(this.year);
          } else {
            temp = this.monthDays(this.year, i);
          }
          if (this.isLeap == true && i == leap + 1) this.isLeap = false; //解除闰月
          offset -= temp;
          if (this.isLeap == false) this.monCyl++;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
          if (this.isLeap) {
            this.isLeap = false;
          } else {
            this.isLeap = true;
            --i;
            --this.monCyl;
          }
        if (offset < 0) {
          offset += temp;
          --i;
          --this.monCyl;
        }
        this.month = i;
        this.day = offset + 1;
      },
      //返回公历y年m+1月的天数
      solarDays: function(y, m) {
        if (m == 1)
          return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
        else return this.solarMonth[m];
      },
      //记录公历和农历某天的日期
      calElement: function(
        sYear,
        sMonth,
        sDay,
        week,
        lYear,
        lMonth,
        lDay,
        isLeap
      ) {
        this.isToday = false;
        //公历
        this.sYear = sYear;
        this.sMonth = sMonth;
        this.sDay = sDay;
        this.week = week;
        //农历
        this.lYear = lYear;
        this.lMonth = lMonth;
        this.lDay = lDay;
        this.isLeap = isLeap;
        //节日记录
        this.lunarFestival = ""; //农历节日
        this.solarFestival = ""; //公历节日
        this.solarTerms = ""; //节气
      },
      //返回某年的第n个节气为几日(从0小寒起算)
      sTerm: function(y, n) {
        // if (this.dateMap[y][n]) {
        //   return this.dateMap[y][n]
        // }
        // var offDate = new Date((31556925974.7*(y-1900)+this.sTermInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
        // return(offDate.getUTCDate())
        if (y < 1900 || y > 2100) {
          return -1;
        }
        if (n < 1 || n > 24) {
          return -1;
        }
        var _table = this.sTermInfo[y - 1900];
        var _info = [
          parseInt("0x" + _table.substr(0, 5)).toString(),
          parseInt("0x" + _table.substr(5, 5)).toString(),
          parseInt("0x" + _table.substr(10, 5)).toString(),
          parseInt("0x" + _table.substr(15, 5)).toString(),
          parseInt("0x" + _table.substr(20, 5)).toString(),
          parseInt("0x" + _table.substr(25, 5)).toString()
        ];
        var _calday = [
          _info[0].substr(0, 1),
          _info[0].substr(1, 2),
          _info[0].substr(3, 1),
          _info[0].substr(4, 2),

          _info[1].substr(0, 1),
          _info[1].substr(1, 2),
          _info[1].substr(3, 1),
          _info[1].substr(4, 2),

          _info[2].substr(0, 1),
          _info[2].substr(1, 2),
          _info[2].substr(3, 1),
          _info[2].substr(4, 2),

          _info[3].substr(0, 1),
          _info[3].substr(1, 2),
          _info[3].substr(3, 1),
          _info[3].substr(4, 2),

          _info[4].substr(0, 1),
          _info[4].substr(1, 2),
          _info[4].substr(3, 1),
          _info[4].substr(4, 2),

          _info[5].substr(0, 1),
          _info[5].substr(1, 2),
          _info[5].substr(3, 1),
          _info[5].substr(4, 2)
        ];
        return parseInt(_calday[n - 1]);
      },
      //保存y年m+1月的相关信息
      calendar: function(y, m) {
        this.getTime();
        var sDObj,
          lDObj,
          lY,
          lM,
          lD = 1,
          lL,
          lX = 0,
          tmp1,
          tmp2;
        var lDPOS = new Array(3);
        var n = 0;
        var firstLM = 0;
        sDObj = new Date(y, m, 1); //当月第一天的日期
        this.length = this.solarDays(y, m); //公历当月天数
        this.firstWeek = sDObj.getDay(); //公历当月1日星期几
        if (m + 1 == 5) {
          this.fat = sDObj.getDay();
        }
        if (m + 1 == 6) {
          this.mat = sDObj.getDay();
        }
        for (var i = 0; i < this.length; i++) {
          if (lD > lX) {
            sDObj = new Date(y, m, i + 1); //当月第一天的日期
            this.Dianaday(sDObj); //农历
            lY = this.year; //农历年
            lM = this.month; //农历月
            lD = this.day; //农历日
            lL = this.isLeap; //农历是否闰月
            lX = lL ? this.leapDays(lY) : this.monthDays(lY, lM); //农历当月最後一天
            if (lM == 12) {
              this.eve = lX;
            }
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
          }
          this.calElement(
            y,
            m + 1,
            i + 1,
            this.nStr1[(i + this.firstWeek) % 7],
            lY,
            lM,
            lD++,
            lL
          );
          var me = this;
          this[i] = {
            isToday: false,
            //公历
            sYear: me.sYear,
            sMonth: me.sMonth,
            sDay: me.sDay,
            week: me.week,
            //农历
            lYear: me.lYear,
            lMonth: me.lMonth,
            lDay: me.lDay,
            isLeap: me.isLeap,
            //节日记录
            lunarFestival: "", //农历节日
            solarFestival: "", //公历节日
            solarTerms: "" //节气
          };
          if ((i + this.firstWeek) % 7 == 0) {
            this[i].color = "red"; //周日颜色
          }
        }
        //节气
        // tmp1=this.sTerm(y,m*2)-1;
        // tmp2=this.sTerm(y,m*2+1)-1;
        tmp1 = this.sTerm(y, m * 2 + 1) - 1;
        tmp2 = this.sTerm(y, m * 2 + 2) - 1;
        this[tmp1].solarTerms = this.solarTerm[m * 2];
        this[tmp2].solarTerms = this.solarTerm[m * 2 + 1];

        if ((this.firstWeek + 12) % 7 == 5)
          //黑色星期五
          this[12].solarFestival += "黑五";
        if (y == this.tY && m == this.tM) {
          this[this.tD - 1].isToday = true;
          this.isToday = true;
        } else {
          this.isToday = null;
        }
        //今日
      },
      //用中文显示农历的日期
      cDay: function(d) {
        var s;
        switch (d) {
          case 10:
            s = "初十";
            break;
          case 20:
            s = "二十";
            break;
            break;
          case 30:
            s = "三十";
            break;
            break;
          default:
            s = this.nStr2[Math.floor(d / 10)];
            s += this.nStr1[d % 10];
        }
        return s;
      },
      //在表格中显示公历和农历的日期,以及相关节日
      drawCld: function(SY, SM, luckyDay, isLuckyDay) {
        console.log(luckyDay);
        var TF = true;
        var p1 = (p2 = "");
        var i, sD, s, size;
        this.calendar(SY, SM);
        //GZ.innerHTML = '【'+Animals[(SY-4)%12]+'】';	//生肖
        var dayList = [];
        for (i = 0; i < 42; i++) {
          //sObj=eval('SD'+ i);//
          //lObj=eval('LD'+ i);//农历日
          //sObj.className = '';
          var dayDetail = {};
          sD = i - this.firstWeek;
          if (sD > -1 && sD < this.length) {
            //日期内
            dayDetail.ylr = sD + 1;
            if (this[sD].isToday) {
              dayDetail.color = "#9900FF";
            } else {
              dayDetail.color = "#000";
            } //今日颜色
            if (this[sD].lDay == 1) {
              //显示农历月(不显示日)
              dayDetail.nlr =
                (this[sD].isLeap ? "闰" : "") +
                this[sD].lMonth +
                "月" +
                (this.monthDays(this[sD].lYear, this[sD].lMonth) == 29
                  ? "小"
                  : "大");
            } else {
              dayDetail.nlr = this.cDay(Math.round(this[sD].lDay));
            } //显示农历日
            var Slfw = (Ssfw = null);
            s = this[sD].solarFestival;
            for (var ipp = 0; ipp < this.lFtv.length; ipp++) {
              //农历节日
              if (parseInt(this.lFtv[ipp].substr(0, 2)) == this[sD].lMonth) {
                if (
                  parseInt(this.lFtv[ipp].substr(2, 4)) ==
                  Math.round(this[sD].lDay)
                ) {
                  dayDetail.nlr = this.lFtv[ipp].substr(5);
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#DA4C39";
                  }
                  Slfw = this.lFtv[ipp].substr(5);
                }
              }
              if (12 == this[sD].lMonth && isLuckyDay == 0) {
                //判断是否为除夕
                if (this.eve == this[sD].lDay) {
                  dayDetail.nlr = "除夕";
                  Slfw = "除夕";
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#DA4C39";
                  }
                }
              }
            }
            for (var ipp = 0; ipp < this.sFtv.length; ipp++) {
              //公历节日
              if (parseInt(this.sFtv[ipp].substr(0, 2)) == SM + 1) {
                if (parseInt(this.sFtv[ipp].substr(2, 4)) == sD + 1) {
                  dayDetail.nlr = this.sFtv[ipp].substr(5);
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#6CC1AD";
                  }
                  Ssfw = this.sFtv[ipp].substr(5);
                }
              }
            }
            if (SM + 1 == 5) {
              //母亲节
              if (this.fat == 0) {
                if (sD + 1 == 7) {
                  Ssfw = "母亲节";
                  dayDetail.nlr = "母亲节";
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#6CC1AD";
                  }
                }
              } else if (this.fat < 9) {
                if (sD + 1 == 7 - this.fat + 8) {
                  Ssfw = "母亲节";
                  dayDetail.nlr = "母亲节";
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#6CC1AD";
                  }
                }
              }
            }
            if (SM + 1 == 6) {
              //父亲节
              if (this.mat == 0) {
                if (sD + 1 == 14) {
                  Ssfw = "父亲节";
                  dayDetail.nlr = "父亲节";
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#6CC1AD";
                  }
                }
              } else if (this.mat < 9) {
                if (sD + 1 == 7 - this.mat + 15) {
                  Ssfw = "父亲节";
                  dayDetail.nlr = "父亲节";
                  if (isLuckyDay == 0) {
                    dayDetail.color = "#6CC1AD";
                  }
                }
              }
            }
            if (s.length <= 0) {
              //设置节气的颜色
              s = this[sD].solarTerms;
            }
            if (s.length > 0) {
              var nlrfirst = dayDetail.nlr[0];
              if (
                nlrfirst != "初" &&
                nlrfirst != "十" &&
                nlrfirst != "廿" &&
                nlrfirst != "二" &&
                nlrfirst != "三" &&
                nlrfirst != "卅"
              ) {
                dayDetail.nlr += "/" + s;
              } else {
                dayDetail.nlr = s;
              }
              if (isLuckyDay == 0) {
                dayDetail.color = "#EEAE44";
              }
              Slfw = s;
            } //节气
            if (Slfw != null && Ssfw != null) {
              dayDetail.nlr = Slfw + "/" + Ssfw;
              if (isLuckyDay == 0) {
                dayDetail.color = "#EEAE44";
              }
            }
          } else {
            //非日期
            dayDetail.ylr = "";
            dayDetail.nlr = "";
          }
          dayList.push(dayDetail);
        }
        if (this.isToday) {
          var num = null;
          for (var i = 0; i < dayList.length; i++) {
            if (dayList[i].ylr == this.tD) {
              num = i;
              break;
            }
          }
          for (var a = 0; a < num; a++) {
            dayList[a].color = "#ccc";
          }
        }
        if (isLuckyDay == 0) {
          for (var b = 0; b < dayList.length; b++) {
            dayList[b].id = b;
            if (
              this.jFtv[SY] &&
              this.jFtv[SY][SM + 1] &&
              !(SY == this.tY && SM == this.tM)
            ) {
              for (var c = 0; c < this.jFtv[SY][SM + 1].length; c++) {
                if (dayList[b].ylr == this.jFtv[SY][SM + 1][c]) {
                  dayList[b].color = "red";
                  dayList[b].yylr = dayList[b].ylr;
                  dayList[b].ylr = "吉";
                }
              }
            } else if (
              this.jFtv[SY] &&
              this.jFtv[SY][SM + 1] &&
              SY == this.tY &&
              SM == this.tM
            ) {
              var num = null;
              for (var d = 0; d < dayList.length; d++) {
                if (dayList[d].ylr == this.tD) {
                  num = d;
                  break;
                }
              }
              for (var c = 0; c < this.jFtv[SY][SM + 1].length; c++) {
                if (dayList[b].ylr == this.jFtv[SY][SM + 1][c] && b >= num) {
                  dayList[b].color = "red";
                  dayList[b].yylr = dayList[b].ylr;
                  dayList[b].ylr = "吉";
                }
              }
            }
          }
        } else if (isLuckyDay == 1) {
          for (var b = 0, c = 0; b < dayList.length; b++) {
            dayList[b].id = b;
            if (dayList[b].ylr == "") {
            } else {
              dayList[b].luckDay = c + 1;
              c++;
            }
            var num = null;
            for (var d = 0; d < dayList.length; d++) {
              if (dayList[d].ylr == this.tD) {
                num = d;
                break;
              }
            }
            if (!(SY == this.tY && SM == this.tM)) {
              for (var j = 0; j < luckyDay.length; j++) {
                if (dayList[b].luckDay == luckyDay[j].luckyDay.substr(8, 2)) {
                  if (luckyDay[j].type == 1) {
                    dayList[b].color = "#f7663c";
                  } else if (luckyDay[j].type == 2) {
                    dayList[b].color = "#ecba36";
                  } else if (luckyDay[j].type == 3) {
                    dayList[b].color = "#38ce4a";
                  }
                  dayList[b].yylr = dayList[b].ylr;
                  // dayList[b].ylr = luckyDay[j].luckyName;
                }
              }
            } else if (SY == this.tY && SM == this.tM) {
              for (var j = 0; j < luckyDay.length; j++) {
                if (
                  dayList[b].luckDay == luckyDay[j].luckyDay.substr(8, 2) &&
                  b >= num
                ) {
                  if (luckyDay[j].type == 1) {
                    dayList[b].color = "#f7663c";
                  } else if (luckyDay[j].type == 2) {
                    dayList[b].color = "#ecba36";
                  } else if (luckyDay[j].type == 3) {
                    dayList[b].color = "#38ce4a";
                  }
                  dayList[b].yylr = dayList[b].ylr;
                  // dayList[b].ylr = luckyDay[j].luckyName;
                }
              }
            }
          }
        }
        return dayList;
      }
    };
    return calendar;
  })
  .factory("$nongli", function() {
    var Lunar = {
      MIN_YEAR: 1891,
      MAX_YEAR: 2100,
      lunarInfo: [
        [0, 2, 9, 21936],
        [6, 1, 30, 9656],
        [0, 2, 17, 9584],
        [0, 2, 6, 21168],
        [5, 1, 26, 43344],
        [0, 2, 13, 59728],
        [0, 2, 2, 27296],
        [3, 1, 22, 44368],
        [0, 2, 10, 43856],
        [8, 1, 30, 19304],
        [0, 2, 19, 19168],
        [0, 2, 8, 42352],
        [5, 1, 29, 21096],
        [0, 2, 16, 53856],
        [0, 2, 4, 55632],
        [4, 1, 25, 27304],
        [0, 2, 13, 22176],
        [0, 2, 2, 39632],
        [2, 1, 22, 19176],
        [0, 2, 10, 19168],
        [6, 1, 30, 42200],
        [0, 2, 18, 42192],
        [0, 2, 6, 53840],
        [5, 1, 26, 54568],
        [0, 2, 14, 46400],
        [0, 2, 3, 54944],
        [2, 1, 23, 38608],
        [0, 2, 11, 38320],
        [7, 2, 1, 18872],
        [0, 2, 20, 18800],
        [0, 2, 8, 42160],
        [5, 1, 28, 45656],
        [0, 2, 16, 27216],
        [0, 2, 5, 27968],
        [4, 1, 24, 44456],
        [0, 2, 13, 11104],
        [0, 2, 2, 38256],
        [2, 1, 23, 18808],
        [0, 2, 10, 18800],
        [6, 1, 30, 25776],
        [0, 2, 17, 54432],
        [0, 2, 6, 59984],
        [5, 1, 26, 27976],
        [0, 2, 14, 23248],
        [0, 2, 4, 11104],
        [3, 1, 24, 37744],
        [0, 2, 11, 37600],
        [7, 1, 31, 51560],
        [0, 2, 19, 51536],
        [0, 2, 8, 54432],
        [6, 1, 27, 55888],
        [0, 2, 15, 46416],
        [0, 2, 5, 22176],
        [4, 1, 25, 43736],
        [0, 2, 13, 9680],
        [0, 2, 2, 37584],
        [2, 1, 22, 51544],
        [0, 2, 10, 43344],
        [7, 1, 29, 46248],
        [0, 2, 17, 27808],
        [0, 2, 6, 46416],
        [5, 1, 27, 21928],
        [0, 2, 14, 19872],
        [0, 2, 3, 42416],
        [3, 1, 24, 21176],
        [0, 2, 12, 21168],
        [8, 1, 31, 43344],
        [0, 2, 18, 59728],
        [0, 2, 8, 27296],
        [6, 1, 28, 44368],
        [0, 2, 15, 43856],
        [0, 2, 5, 19296],
        [4, 1, 25, 42352],
        [0, 2, 13, 42352],
        [0, 2, 2, 21088],
        [3, 1, 21, 59696],
        [0, 2, 9, 55632],
        [7, 1, 30, 23208],
        [0, 2, 17, 22176],
        [0, 2, 6, 38608],
        [5, 1, 27, 19176],
        [0, 2, 15, 19152],
        [0, 2, 3, 42192],
        [4, 1, 23, 53864],
        [0, 2, 11, 53840],
        [8, 1, 31, 54568],
        [0, 2, 18, 46400],
        [0, 2, 7, 46752],
        [6, 1, 28, 38608],
        [0, 2, 16, 38320],
        [0, 2, 5, 18864],
        [4, 1, 25, 42168],
        [0, 2, 13, 42160],
        [10, 2, 2, 45656],
        [0, 2, 20, 27216],
        [0, 2, 9, 27968],
        [6, 1, 29, 44448],
        [0, 2, 17, 43872],
        [0, 2, 6, 38256],
        [5, 1, 27, 18808],
        [0, 2, 15, 18800],
        [0, 2, 4, 25776],
        [3, 1, 23, 27216],
        [0, 2, 10, 59984],
        [8, 1, 31, 27432],
        [0, 2, 19, 23232],
        [0, 2, 7, 43872],
        [5, 1, 28, 37736],
        [0, 2, 16, 37600],
        [0, 2, 5, 51552],
        [4, 1, 24, 54440],
        [0, 2, 12, 54432],
        [0, 2, 1, 55888],
        [2, 1, 22, 23208],
        [0, 2, 9, 22176],
        [7, 1, 29, 43736],
        [0, 2, 18, 9680],
        [0, 2, 7, 37584],
        [5, 1, 26, 51544],
        [0, 2, 14, 43344],
        [0, 2, 3, 46240],
        [4, 1, 23, 46416],
        [0, 2, 10, 44368],
        [9, 1, 31, 21928],
        [0, 2, 19, 19360],
        [0, 2, 8, 42416],
        [6, 1, 28, 21176],
        [0, 2, 16, 21168],
        [0, 2, 5, 43312],
        [4, 1, 25, 29864],
        [0, 2, 12, 27296],
        [0, 2, 1, 44368],
        [2, 1, 22, 19880],
        [0, 2, 10, 19296],
        [6, 1, 29, 42352],
        [0, 2, 17, 42208],
        [0, 2, 6, 53856],
        [5, 1, 26, 59696],
        [0, 2, 13, 54576],
        [0, 2, 3, 23200],
        [3, 1, 23, 27472],
        [0, 2, 11, 38608],
        [11, 1, 31, 19176],
        [0, 2, 19, 19152],
        [0, 2, 8, 42192],
        [6, 1, 28, 53848],
        [0, 2, 15, 53840],
        [0, 2, 4, 54560],
        [5, 1, 24, 55968],
        [0, 2, 12, 46496],
        [0, 2, 1, 22224],
        [2, 1, 22, 19160],
        [0, 2, 10, 18864],
        [7, 1, 30, 42168],
        [0, 2, 17, 42160],
        [0, 2, 6, 43600],
        [5, 1, 26, 46376],
        [0, 2, 14, 27936],
        [0, 2, 2, 44448],
        [3, 1, 23, 21936],
        [0, 2, 11, 37744],
        [8, 2, 1, 18808],
        [0, 2, 19, 18800],
        [0, 2, 8, 25776],
        [6, 1, 28, 27216],
        [0, 2, 15, 59984],
        [0, 2, 4, 27424],
        [4, 1, 24, 43872],
        [0, 2, 12, 43744],
        [0, 2, 2, 37600],
        [3, 1, 21, 51568],
        [0, 2, 9, 51552],
        [7, 1, 29, 54440],
        [0, 2, 17, 54432],
        [0, 2, 5, 55888],
        [5, 1, 26, 23208],
        [0, 2, 14, 22176],
        [0, 2, 3, 42704],
        [4, 1, 23, 21224],
        [0, 2, 11, 21200],
        [8, 1, 31, 43352],
        [0, 2, 19, 43344],
        [0, 2, 7, 46240],
        [6, 1, 27, 46416],
        [0, 2, 15, 44368],
        [0, 2, 5, 21920],
        [4, 1, 24, 42448],
        [0, 2, 12, 42416],
        [0, 2, 2, 21168],
        [3, 1, 22, 43320],
        [0, 2, 9, 26928],
        [7, 1, 29, 29336],
        [0, 2, 17, 27296],
        [0, 2, 6, 44368],
        [5, 1, 26, 19880],
        [0, 2, 14, 19296],
        [0, 2, 3, 42352],
        [4, 1, 24, 21104],
        [0, 2, 10, 53856],
        [8, 1, 30, 59696],
        [0, 2, 18, 54560],
        [0, 2, 7, 55968],
        [6, 1, 27, 27472],
        [0, 2, 15, 22224],
        [0, 2, 5, 19168],
        [4, 1, 25, 42216],
        [0, 2, 12, 42192],
        [0, 2, 1, 53584],
        [2, 1, 21, 55592],
        [0, 2, 9, 54560]
      ],
      //是否闰年
      isLeapYear: function(year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
      },
      //天干地支年
      lunarYear: function(year) {
        var gan = ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"],
          zhi = [
            "申",
            "酉",
            "戌",
            "亥",
            "子",
            "丑",
            "寅",
            "卯",
            "辰",
            "巳",
            "午",
            "未"
          ],
          str = year.toString().split("");
        return gan[str[3]] + zhi[year % 12];
      },
      //生肖年
      zodiacYear: function(year) {
        var zodiac = [
          "猴",
          "鸡",
          "狗",
          "猪",
          "鼠",
          "牛",
          "虎",
          "兔",
          "龙",
          "蛇",
          "马",
          "羊"
        ];
        return zodiac[year % 12];
      },
      //公历月份天数
      //@param year 阳历-年
      //@param month 阳历-月
      solarMonthDays: function(year, month) {
        var FebDays = this.isLeapYear(year) ? 29 : 28;
        var monthHash = [
          "",
          31,
          FebDays,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31
        ];
        return monthHash[month];
      },
      //农历月份天数
      lunarMonthDays: function(year, month) {
        var monthData = this.lunarMonths(year);
        return monthData[month - 1];
      },
      //农历月份天数数组
      lunarMonths: function(year) {
        var yearData = this.lunarInfo[year - this.MIN_YEAR];
        var leapMonth = yearData[0];
        var bit = (+yearData[3]).toString(2);
        var months = [];
        for (var i = 0; i < bit.length; i++) {
          months[i] = bit.substr(i, 1);
        }

        for (var k = 0, len = 16 - months.length; k < len; k++) {
          months.unshift("0");
        }

        months = months.slice(0, leapMonth == 0 ? 12 : 13);
        for (var i = 0; i < months.length; i++) {
          months[i] = +months[i] + 29;
        }
        return months;
      },
      //农历每年的天数
      //@param year 农历年份
      lunarYearDays: function(year) {
        var monthArray = this.lunarYearMonths(year);
        var len = monthArray.length;
        return monthArray[len - 1] == 0
          ? monthArray[len - 2]
          : monthArray[len - 1];
      },
      //
      lunarYearMonths: function(year) {
        var monthData = this.lunarMonths(year);
        var res = [];
        var temp = 0;
        var yearData = this.lunarInfo[year - this.MIN_YEAR];
        var len = yearData[0] == 0 ? 12 : 13;
        for (var i = 0; i < len; i++) {
          temp = 0;
          for (j = 0; j <= i; j++) {
            temp += monthData[j];
          }
          res.push(temp);
        }
        return res;
      },
      //获取闰月
      //@param year 农历年份
      leapMonth: function(year) {
        var yearData = this.lunarInfo[year - this.MIN_YEAR];
        return yearData[0];
      },
      //计算农历日期与正月初一相隔的天数
      betweenLunarDays: function(year, month, day) {
        var yearMonth = this.lunarMonths(year);
        var res = 0;
        for (var i = 1; i < month; i++) {
          res += yearMonth[i - 1];
        }
        res += day - 1;
        return res;
      },
      //计算2个阳历日期之间的天数
      //@param year 阳历年
      //@param month
      //@param day
      //@param l_month 阴历正月对应的阳历月份
      //@param l_day  阴历初一对应的阳历天
      betweenSolarDays: function(year, month, day, l_month, l_day) {
        var time1 = new Date(year + "/" + month + "/" + day).getTime(),
          time2 = new Date(year + "/" + l_month + "/" + l_day).getTime();
        return Math.ceil((time1 - time2) / 24 / 3600 / 1000);
      },
      //根据距离正月初一的天数计算阴历日期
      //@param year 阳历年
      //@param between 天数
      lunarByBetween: function(year, between) {
        var lunarArray = [],
          yearMonth = [],
          t = 0,
          e = 0,
          leapMonth = 0,
          m = "";
        if (between == 0) {
          t = 1;
          e = 1;
          m = "正月";
        } else {
          year = between > 0 ? year : year - 1;
          yearMonth = this.lunarYearMonths(year);
          leapMonth = this.leapMonth(year);
          between = between > 0 ? between : this.lunarYearDays(year) + between;
          for (var i = 0; i < 13; i++) {
            if (between == yearMonth[i]) {
              t = i + 2;
              e = 1;
              break;
            } else if (between < yearMonth[i]) {
              t = i + 1;
              e = between - (yearMonth[i - 1] ? yearMonth[i - 1] : 0) + 1;
              break;
            }
          }

          m =
            leapMonth != 0 && t == leapMonth + 1
              ? "闰" + this.chineseMonth(t - 1)
              : this.chineseMonth(
                  leapMonth != 0 && leapMonth + 1 < t ? t - 1 : t
                );
        }
        //lunarArray.push(year, t, e); //年 月 日
        lunarArray.push(
          this.lunarYear(year),
          this.zodiacYear(year),
          m,
          this.chineseNumber(e)
        ); //天干地支年 生肖年 月份 日
        //lunarArray.push(leapMonth); //闰几月
        return lunarArray;
      },
      //中文月份
      chineseMonth: function(month) {
        var monthHash = [
          "",
          "正月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "冬月",
          "腊月"
        ];
        return monthHash[month];
      },
      //中文日期
      chineseNumber: function(num) {
        var dateHash = [
          "",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "七",
          "八",
          "九",
          "十"
        ];
        if (num <= 10) {
          res = "初" + dateHash[num];
        } else if (num > 10 && num < 20) {
          res = "十" + dateHash[num - 10];
        } else if (num == 20) {
          res = "二十";
        } else if (num > 20 && num < 30) {
          res = "廿" + dateHash[num - 20];
        } else if (num == 30) {
          res = "三十";
        }
        return res;
      },
      //转换农历
      toLunar: function(year, month, day) {
        var yearData = this.lunarInfo[year - this.MIN_YEAR];
        if (year == this.MIN_YEAR && month <= 2 && day <= 9) {
          return [1891, 1, 1, "辛卯", "兔", "正月", "初一"];
        }
        return this.lunarByBetween(
          year,
          this.betweenSolarDays(year, month, day, yearData[1], yearData[2])
        );
      },
      //转换公历
      //@param year 阴历-年
      //@param month 阴历-月，闰月处理：例如如果当年闰五月，那么第二个五月就传六月，相当于阴历有13个月
      //@param date 阴历-日
      toSolar: function(year, month, day) {
        var yearData = this.lunarInfo[year - this.MIN_YEAR];
        var between = this.betweenLunarDays(year, month, day);
        var ms = new Date(
          year + "-" + yearData[1] + "-" + yearData[2]
        ).getTime();
        var s = ms + between * 24 * 60 * 60 * 1000;
        var d = new Date();
        d.setTime(s);
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
        return [year, month, day];
      }
    };
    return Lunar;
  })
  .service("$showAlert", function($ionicPopup, $translate) {
    return {
      alert: function(txt) {
        var alertPopup = $ionicPopup.alert({
          cssClass: "er-popup",
          title: $translate.instant("易订"),
          template: $translate.instant(txt),
          okText: $translate.instant("确定"),
          okType: "button-assertive"
        });
      },
      confirm: function(text, fun) {
        var myPopup = $ionicPopup.confirm({
          cssClass: "er-popup",
          template: $translate.instant(text),
          title: $translate.instant("易订"),
          buttons: [
            { text: $translate.instant("取消") },
            {
              text: $translate.instant("确定"),
              type: "button-assertive",
              onTap: fun()
            }
          ]
        });
      },
      show: function(txt, fun) {
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input type="number" ng-model="data.price">',
          cssClass: "er-popup",
          title: $translate.instant(txt),
          buttons: [
            {
              text: $translate.instant("确定"),
              type: "button-assertive",
              onTap: fun
            }
          ]
        });
      }
    };
  })
  .service("$chat", function($http, myUrl) {
    var url = myUrl.url;
    return {
      getRanking: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/ranking?appUserId=${data.appUserId}&businessId=${data.businessId}&qryType=${data.qryType}&qryType2=0&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getBusinessRanking: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        if (data.orderType == undefined) {
          data.orderType = 0;
        }
        $http
          .get(
            `${url}/business/ranking?brandType=${data.brandType}&businessId=${data.businessId}&qryType=${data.qryType}&qryType2=${data.qryType2}&starttime=${data.starttime}&endtime=${data.endtime}&orderType=${data.orderType}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getChart: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/rank/chart?businessId=${data.businessId}&qryType=${data.qryType}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getYChart: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meeting/chart?businessId=${data.businessId}&qryType=${data.qryType}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getWChart: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/rank/chart/ext?businessId=${data.businessId}&qryType=${data.qryType}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getRankingList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/ranking/list?appUserId=${data.appUserId}&businessId=${data.businessId}&qryType=${data.qryType}&qryType2=${data.qryType2}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/viporder?appUserId=${data.appUserId}&businessId=${data.businessId}&qryType=${data.qryType}&qryType2=${data.qryType2}&page=${data.page}&rows=${data.rows}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCustom: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/addvip?appUserId=${data.appUserId}&businessId=${data.businessId}&qryType=${data.qryType}&qryType2=${data.qryType2}&page=${data.page}&rows=${data.rows}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getKt: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/kt/count?businessId=${data.businessId}&weekNum=${data.weekNum}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$operation", function($http, myUrl) {
    var url = myUrl.url;
    return {
      confirm: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/update/confirm`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      lock: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/lock`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      unlock: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/unlock`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      statusUnBook: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/td`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      handleOrderSubmit: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/order/submit/change`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      YUnBook: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .delete(
            `${url}/meeting/order?resvOrder=${data.resvOrder}&appUserId=${data.appUserId}&appUserPhone=${data.appUserPhone}&status=4&tableName=${data.tableName}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      updateY: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        data.vipSex = data.man == true ? "男" : "女";
        data.vipSex1 = data.man1 == true ? "男" : "女";
        data.vipSex2 = data.man2 == true ? "男" : "女";
        $http
          .put(`${url}/meeting/order`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      status: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/status`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      mvpTab: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/mvp`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      changeSeat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/table/change`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      addSeat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/table/add`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      getYchangeSeat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/meeting/prechange?resvDate=" +
              data.resvDate +
              "&mealTypeId=" +
              data.mealTypeId +
              "&businessId=" +
              data.businessId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      payInfo: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/crm/table/bill?businessId=" +
              data.businessId +
              "&tableId=" +
              data.tableId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      payOrStore: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/crm/payOrStore", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeYseat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meeting/change`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      settleYseat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/meeting/do/clearing`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      getHotel: function(appUserId, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(url + "/business/list?appUserId=" + appUserId, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeHotel: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/business/change`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      getPassword: function(token, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        $http
          .get(url + "/password/refresh?token=" + token, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$httpClue", function($http, myUrl) {
    var url = myUrl.url;
    return {
      getMyClue: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/myKey?appUserId=${data.appUserId}&page=${data.page}&isAll=${data.isAll}&businessId=${data.businessId}&rows=${data.rows}&type=${data.type}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getClueDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/meetingKey/keyDetail?keyNo=${data.keyNo}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getResvOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/meetingKey/resvOrder?batchNo=${data.batchNo}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getRecord: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/meetingKey/getRecord?keyNo=${data.keyNo}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getRemindDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getRemindDetail?keyNo=${data.keyNo}&remindId=${data.remindId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getRemind: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/meetingKey/getRemind?keyNo=${data.keyNo}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getAppUserList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/appUser/list?businessId=${data.businessId}&appUserId=${data.appUserId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getAppUserList1: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/appUser/list?businessId=${data.businessId}&appUserId=${data.appUserId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getAppUserNum: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/appUser/keyNum?businessId=${data.businessId}&isAll=${data.isAll}&isAll1=${data.isAll1}&appUserId=${data.appUserId}&resvDate=${data.resvDate}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getRemindList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getRemind/list?page=${data.page}&businessId=${data.businessId}&rows=${data.rows}&appUserId=${data.appUserId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getSearch: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/myKey?appUserId=${data.appUserId}&page=${data.page}&businessId=${data.businessId}&rows=${data.rows}&type=${data.type}&isSearch=${data.isSearch}&searchContent=${data.searchContent}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getSource: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getSource?businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getSourceDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getSourceDetail?resvSourceId=${data.resvSourceId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getMouhuSource: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getMouhuSource?businessId=${data.businessId}&phone=${data.phone}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getMouhuSource1: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getMouhuSource1?businessId=${data.businessId}&phone=${data.phone}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      createClue: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        data.vipSex = data.man == true ? "男" : "女";
        $http
          .post(url + "/meetingKey/new", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      recoverClue: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meetingKey/recover`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      deleteRemind: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meetingKey/deleteRemind`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      saveClue: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        data.vipSex = data.man == true ? "男" : "女";
        $http
          .put(`${url}/meetingKey/update`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      assign: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meetingKey/assign`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateVipAppUser: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/vip/updateAppuser`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      cancelClue: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meetingKey/cancel`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      saveRecord: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meetingKey/saveRecord`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      saveRemind: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        if (data.remindWay != undefined) {
          data.way = data.remindWay;
        }
        $http
          .put(`${url}/meetingKey/saveRemind`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateRemind: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/meetingKey/updateRemind`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$httpOrder", function($http, myUrl) {
    var url = myUrl.url;
    return {
      getSubmit: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var info = JSON.parse(localStorage["info"]);
        $http
          .get(
            `${url}/order/submit/list?flag=${data.flag}&appUserId=${info.id}&businessId=${info.businessId}&mealTypeId=${data.mealTypeId}&starttime=${data.starttime}&endtime=${data.endtime}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      detailSubmit: function(submitId, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/order/submit/detail?submitId=${submitId}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      reSendSubmit: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/resubmit?submitId=${data.submitId}`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/list?appUserId=${data.appUserId}&businessId=${data.businessId}&qryType=${data.qryType}&mealTypeId=${data.mealTypeId}&vipName=${data.vipName}&starttime=${data.starttime}&endtime=${data.endtime}&page=${data.page}&rows=${data.rows}&area=${data.area}&tableAreaId=${data.tableAreaId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getOrderQ: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/list?appUserId=&businessId=${data.businessId}&qryType=${data.qryType}&mealTypeId=${data.mealTypeId}&vipName=${data.vipName}&starttime=${data.starttime}&endtime=${data.endtime}&page=${data.page}&rows=${data.rows}&area=${data.area}&tableAreaId=${data.tableAreaId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getProperty: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/business/order/property?businessId=${data}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getKe: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/customers/v2?businessId=${data.businessId}&batchNo=${data.batchNo}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getGuest: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/guests/v2?businessId=${data.businessId}&batchNo=${data.batchNo}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      newKe: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/order/customer/v2`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      newGuest: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/order/guest/v2`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      delKe: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/order/customer/del`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      delGuest: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/order/guest/del`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getMeetingGuests: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingManager/vip/indirect/list?hotelId=${data.hotelId}&orderBatchNo=${data.orderBatchNo}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      addMeetingGuest: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/meetingManager/vip/indirect/add`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      editOrDeleteMeetingGuest: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/meetingManager/vip/indirect/update`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      // newShu:function(data,callBackS, callBackE){
      //   var config={
      //     headers:{
      //       'Authorization': localStorage['TOKEN_KEY']
      //     }
      //   };
      //   $http
      //     .put(`${url}/order/property`,data,config)
      //     .success(function(data){
      //       callBackS(data);
      //     })
      //     .error(function(data,status){
      //       callBackE(data,status);
      //     })
      // },
      // updateKe:function(data,callBackS, callBackE){
      //   var config={
      //     headers:{
      //       'Authorization': localStorage['TOKEN_KEY']
      //     }
      //   };
      //   $http
      //     .put(`${url}/order/customer`,data,config)
      //     .success(function(data){
      //       callBackS(data);
      //     })
      //     .error(function(data,status){
      //       callBackE(data,status);
      //     })
      // },
      mohuKe: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/find/customer?appUserId=${data.appUserId}&businessId=${data.businessId}&customerPhone
=${data.customerPhone}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getYOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var paramsUrl = `businessId=${data.businessId}&qryType=${data.qryType}&mealTypeId=${data.mealTypeId}&vipName=${data.vipName}&starttime=${data.starttime}&endtime=${data.endtime}&page=${data.page}&rows=${data.rows}&area=${data.area}&tableAreaId=${data.tableAreaId}`;
        if (data.appUserId || data.appUserId == "") {
          paramsUrl += `&appUserId=${data.appUserId}`;
        }
        $http
          .get(`${url}/meeting/list?${paramsUrl}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getUserStore: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/crm//user/store?appUserId=${data.appUserId}&businessId=${data.businessId}&date=${data.date}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getLog: function(resvOrder, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/meeting/logistics?resvOrder=${resvOrder}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getMeetingList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        if (data.mealTypeId == null) {
          data.mealTypeId = 0;
        }
        $http
          .get(
            `${url}/meeting/resv/list?resvDate=${data.resvDate}&mealTypeId=${data.mealTypeId}&tableId=${data.tableId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getMeetingOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/resv/order?businessId=${data.businessId}&isAll1=${data.isAll1}&isAll=${data.isAll}&resvDate=${data.resvDate}&resvStatus=${data.resvStatus}&appUserId=${data.appUserId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changePic: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(url + "/order/peicai", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeVipPic: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(url + "/vip/pic/update", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      addVisList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/meeting/tracker", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeUserPic: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(url + "/user/pic/update", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getBusinessInfo: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/meeting/info?businessId=${
              data.businessId
            }&appUserName=${data.surname || ""}&appUserPhone=${data.username ||
              ""}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getDish: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/info?businessId=${
              data.businessId
            }&appUserName=${data.appUserName ||
              ""}&appUserPhone=${data.appUserPhone || ""}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getTao: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/dish/templet?businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getDishDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/dish/detail?businessId=${data.businessId}&zdbh=${data.id}&vipId=${data.vipId}&appUserId=${data.appUserId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$httpCustom", function($http, myUrl) {
    var url = myUrl.url;
    return {
      customList: function(businessId, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(url + "/vip/class?businessId=" + businessId, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customValueList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        console.log(data);
        $http
          .get(
            url +
              "/vip/value?businessId=" +
              data.businessId +
              "&appUserId=" +
              data.appUserId +
              "&type=" +
              data.type +
              "&qryType=" +
              data.qryType,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customSubValueList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/vip/detail/value/list?businessId=" +
              data.businessId +
              "&appUserId=" +
              data.appUserId +
              "&type=" +
              data.type,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getNotices: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/notice/info?businessId=${data.businessId}&appUserId=${data.id}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateWxNotices: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/notice/update?businessId=${data.businessId}&noticeId=${data.noticeId}&type=${data.type}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateOrderNotice: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/notice/updateNew?businessId=${data.businessId}&noticeId=${data.noticeId}&type=${data.type}&appUserId=${data.appUserId}&status=${data.status}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customZiyuan: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/vip/notAllow?businessId=" +
              data.businessId +
              "&appUserId=" +
              data.appUserId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      leijiCustom: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/operatevip?appUserId=${data.appUserId}&businessId=${data.businessId}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      huanxingCustom: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/wakevip?appUserId=${data.appUserId}&businessId=${data.businessId}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/class/pu?id=${data.id}&appUserId=${data.appUserId}&businessId=${data.businessId}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customDetailYan: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/class/yan?id=${data.id}&appUserId=${data.appUserId}&businessId=${data.businessId}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customValueDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/value/pu?id=${data.id}&appUserId=${data.appUserId}&businessId=${data.businessId}&type=${data.type}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customSubValueDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/detail/value?detailValue=${data.id}&appUserId=${
              data.appUserId
            }&businessId=${data.businessId}&type=${
              data.type
            }&firstClassValue=${data.firstClassValue || ""}&page=${
              data.page
            }&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customValueYanDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/value/yan?id=${data.id}&appUserId=${data.appUserId}&businessId=${data.businessId}&type=${data.type}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customValueYanDetailNew: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/value/yan/new?&appUserId=${data.appUserId}&businessId=${data.businessId}&type=${data.type}&page=${data.page}&rows=${data.rows}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      selectCustom: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/search?appUserId=${data.appUserId}&businessId=${data.businessId}&searchText=${data.searchText}&type=${data.type}&all=${data.all}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCustomCount: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/count?appUserId=${data.appUserId}&businessId=${data.businessId}&vipId=${data.vipId}&type=${data.type}&qryType=${data.qryType}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeClass: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/vip/class/update`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      addCustom: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/vip/addVip`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateCustom: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/vip/update`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      lastOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/order/last?vipId=${data.vipId}&appUserId=${data.appUserId}&meetingStatus=${data.meetingStatus}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customInfo: function(vipId, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/vip/detail?vipId=${vipId}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customAddDay: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(`${url}/vip/anniversary`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customGetDay: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/anniversary?vipId=${data.vipId}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customDeleteDay: function(id, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .delete(`${url}/vip/anniversary/${id}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customDayNow: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/anniversary/now?appUserId=${data.appUserId}&businessId=${data.businessId}&date=${data.date}&sysIntervalDay=${data.sysIntervalDay}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      saveSleepVipNotice: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/sleep/notice/save?appUserId=${data.appUserId}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customDayList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/anniversary/list?appUserId=${data.appUserId}&businessId=${data.businessId}&date=${data.date}&sysIntervalDay=${data.sysIntervalDay}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customOrderListPu: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/list/vip/pu?page=${data.page}&rows=${data.rows}&vipId=${data.vipId}&appUserId=${data.appUserId}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      rankOrderListPu: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/list/seller/pu?page=${data.page}&businessId=${data.businessId}&rows=${data.rows}&appUserId=${data.appUserId}&qryType=${data.qryType}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      rankOrderListYan: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/list/seller/yan?page=${data.page}&businessId=${data.businessId}&rows=${data.rows}&appUserId=${data.appUserId}&qryType=${data.qryType}&starttime=${data.starttime}&endtime=${data.endtime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customOrderListAll: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/all?page=${data.page}&rows=${data.rows}&vipId=${data.vipId}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      customOrderListYan: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/list/vip/yan?page=${data.page}&rows=${data.rows}&vipId=${data.vipId}&appUserId=${data.appUserId}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$httpPsd", function($http, myUrl) {
    var url = myUrl.url;
    var ydurl = myUrl.ydurl;
    return {
      login: function(data, callBackS, callBackE) {
        $http
          .post(url + "/auth", data)
          .success(function(data, header, config, status) {
            localStorage["TOKEN_KEY"] = data.token;
            var config = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: data.token
              }
            };

            $http.get(url + "/user", config).success(function(data) {
              callBackS(data);
            });
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      loginCheck: function(data, callBackS) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };

        $http
          .get(
            url + "/business/login/list?appUserPhone=" + data.appUserPhone,
            config
          )
          .success(function(data) {
            callBackS(data);
          });
      },
      getUser: function(data, callBackS) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: data
          }
        };

        $http.get(url + "/user", config).success(function(data) {
          callBackS(data);
        });
      },
      getNum: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        var txt = data.app_user_phone;
        $http
          .get(url + "/password/code?app_user_phone=" + txt, config)
          .success(function() {
            callBackS();
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCrmUser: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/crm/user/info?businessId=" +
              data.businessId +
              "&phone=" +
              data.key,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCardList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/crm/card/list?businessId=" +
              data.businessId +
              "&memberKey=" +
              data.memberID,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      payOrStore: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/crm/payOrStore", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      next: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        var txt1 = data.app_user_phone;
        var txt2 = data.num;
        $http
          .get(
            url +
              "/password/code/chk?app_user_phone=" +
              txt1 +
              "&app_user_code=" +
              txt2,
            config
          )
          .success(function() {
            callBackS();
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      checkPwd: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        $http
          .put(url + "/password/reset", data, config)
          .success(function() {
            callBackS();
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changePwd: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(url + "/user/change/password", data, config)
          .success(function() {
            callBackS();
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getTags: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"],
            login_user: data.username,
            login_version: "2019.07.02-21.22.45",
            client_type: "MOBILE"
          }
        };
        var id = data.id;
        $http
          .get(url + "/order/tags?appUserId=" + id, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeTags: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(url + "/order/updatetag", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getArea: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var businessId = data.businessId;
        $http
          .get(url + "/business/menu?businessId=" + businessId, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCount: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/business/global/count?appUserId=" +
              data.appUserId +
              "&businessId=" +
              data.businessId +
              "&resvDate=" +
              data.resvDate,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCountA: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/business/global/count2?appUserId=" +
              data.appUserId +
              "&businessId=" +
              data.businessId +
              "&resvDate=" +
              data.resvDate,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getYArea: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var businessId = data.businessId;
        $http
          .get(url + "/business/meeting/menu?businessId=" + businessId, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getSeat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        if (data.isChangeTable == undefined) {
          data.isChangeTable = 0;
        }
        console.log("下面是data");
        console.log(data);
        $http
          .get(
            `${url}/business/tables?appUserId=${data.id}&businessId=${
              data.businessId
            }&resvDate=${data.resvDate}&isChangeTable=${
              data.isChangeTable
            }&mealTypeId=${data.mealTypeId}&tTypes=${
              data.tTypes
            }&minPeopleNum=${data.minPeopleNum}&maxPeopleNum=${
              data.maxPeopleNum
            }&minAmount=${data.minAmount}&maxAmount=${data.maxAmount}
          &mealTypeIdA=${data.mealTypeIdA}&mealTypeIdB=${
              data.mealTypeIdB
            }&peicai=${data.peicai}&tableAreaId=${data.tableAreaId}&status=${
              data.status
            }&confirm=${data.confirm}&kbc=${data.kbc}&fcb=${data.fcb}&page=${
              data.page
            }&rows=${data.rows}&sofa=${data.sofa}&television=${
              data.television
            }&washroom=${data.washroom}&relatedTable=${data.relatedTable ||
              ""}&tableName=${data.tableName || ""}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      getYSeat: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        console.log("下面是data");
        console.log(data);
        $http
          .get(
            `${url}/business/meeting/tables?appUserId=${data.appUserId}&businessId=${data.businessId}&resvDate=${data.resvDate}&mealTypeId=${data.mealTypeId}&peicai=${data.peicai}&tableAreaId=${data.tableAreaId}&status=${data.status}&confirm=${data.confirm}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      getYLook: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/meeting/look?businessId=${data.businessId}&appUserId=${data.appUserId}&startDate=${data.startDate}&endDate=${data.endDate}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      getLuckyDay: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meeting/luckyDay?businessId=${data.businessId}&luckyDay=${data.luckyDay}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      tableCheck: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/table/chk?appUserId=${data.appUserId}&businessId=${data.businessId}&resvDate=${data.resvDate}&mealTypeId=${data.mealTypeId}&checkedTableSet=${data.checkedTableSet}&mealTypeIdA=${data.mealTypeIdA}&mealTypeIdB=${data.mealTypeIdB}&kbc=${data.kbc}&fcb=${data.fcb}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      facilList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/facil/list?businessId=${data.businessId}&resvDate=${data.resvDate}&mealTypeId=${data.mealTypeId}&mealTypeIdA=${data.mealTypeIdA}&mealTypeIdB=${data.mealTypeIdB}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      deleteCheck: function(data, callBackS) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/delete/occ?occIds=${data.occIds}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS();
          })
          .error(function(data, status) {
            console.log("清除占座失败");
          });
      },
      getWxNoticeNum: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/notice/num?businessId=${data.businessId}&appUserId=${data.id}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getAccessToken: function(callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic QVBQOkFQUA=="
          }
        };
        $http
          .post(
            `${ydurl}/auth/oauth/token?grant_type=password&scope=server&username=13777575146&password=123456&auth_username=13777575146`,
            "",
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      devLogin: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.access_token
          }
        };
        $http
          .post(`${ydurl}/ydservice/log/dev/login`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      tableYCheck: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meeting/table/chk?resvDate=${data.resvDate}&mealTypeId=${data.mealTypeId}&checkedTableSet=${data.checkedTableSet}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      },
      book: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        data.peicai *= 1;
        data.isKbc *= 1;
        if (data.sendSms == "不发送") {
          data.sendSms = 0;
        } else if (data.sendSms == "微信") {
          data.sendSms = 2;
        } else {
          data.sendSms = 1;
        }
        if (data.isActualTable == "是") {
          data.isActualTable = 1;
        } else {
          data.isActualTable = 2;
        }
        if (data.payType == "现金") {
          data.payType = 1;
        } else if (data.payType == "刷卡") {
          data.payType = 2;
        } else if (data.payType == "第三方") {
          data.payType = 3;
        } else {
          data.payType = 1;
        }
        if (data.peicaiType == "元/人" || data.peicaiType == 0) {
          data.peicaiType = 0;
        } else {
          data.peicaiType = 1;
        }
        data.tag = "";
        $http
          .post(url + "/order/new", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      bookSubmit: function(data, callBackS, callbackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        data.peicai *= 1;
        data.isKbc *= 1;
        if (data.sendSms == "不发送") {
          data.sendSms = 0;
        } else if (data.sendSms == "微信") {
          data.sendSms = 2;
        } else {
          data.sendSms = 1;
        }
        if (data.payType == "现金") {
          data.payType = 1;
        } else if (data.payType == "刷卡") {
          data.payType = 2;
        } else if (data.payType == "第三方") {
          data.payType = 3;
        } else {
          data.payType = 1;
        }
        if (data.peicaiType == "桌") {
          data.peicaiType = 1;
        } else {
          data.peicaiType = 0;
        }
        if (!data.destTime) {
          data.destTime = null;
        }
        if (data.isActualTable == "是") {
          data.isActualTable = 1;
        } else {
          data.isActualTable = 2;
        }
        data.tag = "";
        $http
          .post(url + "/order/submit", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      Ybook: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        data.vipSex = data.man == true ? "男" : "女";
        data.vipSex1 = data.man1 == true ? "男" : "女";
        data.vipSex2 = data.man2 == true ? "男" : "女";
        $http
          .post(url + "/meeting/new", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      saveCallon: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/order/save/callon", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateCallon: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/order/update/callon", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateTable: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/business/table/update", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      mohuSelect: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var appId = data.appUserId;
        if (data.vipPhone.length == 11) {
          appId = 0;
        }
        $http
          .get(
            `${url}/vip/mohu?appUserId=${appId}&vipPhone=${data.vipPhone}&businessId=${data.businessId}&date=${data.date}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCallon: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/order/get/callon?resvOrder=${data.resvOrder}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      crmSelect: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var appId = data.appUserId;
        $http
          .get(
            `${url}/vip/crm/user?appUserId=${appId}&vipPhone=${data.vipPhone}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getVipCardList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        var appId = data.appUserId;
        $http
          .get(
            `${url}/crm/store/vip/ticket?appUserId=${appId}&beginTime=${data.beginTime}&endTime=${data.endTime}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      sendJkSms: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/crm/send/sms", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getVipWine: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/wine/list?vipPhone=${data.vipPhone}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getVipAppraise: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/appraise?vipPhone=${data.vipPhone}&businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getSleepVipList: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/sleep/vip?appUserId=${data.appUserId}&businessId=${data.businessId}&createTime=${data.createTime}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      reorderSelect: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/vip/reorder?appUserId=${data.appUserId}&vipPhone=${data.vipPhone}&businessId=${data.businessId}&resvDate=${data.resvDate}&mealTypeId=${data.mealTypeId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      vipLastBack: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meeting/vip/callon?businessId=${data.businessId}&vipPhone=${data.vipPhone}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      orderDetail: function(resvOrder, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/order/detail?resvOrder=${resvOrder}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      meetingDetail: function(resvOrder, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/meeting/detail?resvOrder=${resvOrder}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      logDetail: function(resvOrder, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/order/logistics?resvOrder=${resvOrder}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changeTableLog: function(tableData, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/business/changeTables?businessId=${tableData.businessId}&resvDate=${tableData.resvDate}&mealTypeId=${tableData.mealTypeId}&mealTypeIdA=${tableData.mealTypeIdA}&mealTypeIdB=${tableData.mealTypeIdB}&tableId=${tableData.tableId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      updateDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        if (data.peicai == true) {
          data.peicai = 1;
        } else {
          data.peicai = 0;
        }
        if (data.isActualTable == "是") {
          data.isActualTable = 1;
        } else {
          data.isActualTable = 2;
        }
        $http
          .put(url + "/order/update", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      takePic: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/qiniu/uploadToken?scope=${data.scope}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getWeddingCompany: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meeting/weddingCompany?businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getReason: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/order/unorder/reason?businessId=${data.businessId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getCodeUrl: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token
          }
        };
        $http
          .get(
            `${ydurl}/ydservice/wechat/code/ticket?sceneStr=${data.phone}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getTodayRemind: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            `${url}/meetingKey/getRemind/list/day?appUserId=${data.appUserId}&remindDate=${data.remindDate}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getUserNameAndPwd: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            // 'Authorization': localStorage['TOKEN_KEY']
          }
        };
        $http
          .get(`${url}/user/appuser?appUserId=${data.appUserId}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      getInternationalConfig: function(callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(`${url}/order/internationalConfig`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$hezuo", function($http, myUrl) {
    var url = myUrl.url;
    return {
      youjiang: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/contact/recommend", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      form: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/business/form", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      formdd: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/business/commit", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      formEnroll: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/contact/enlist", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      hezuo: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/contact/bus", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      fankui: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/contact/feedback", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      guanggao: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/contact/consultation", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .service("$shopping", function($http, myUrl) {
    var url = myUrl.url;
    return {
      shopDetail: function(callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(url + "/product/current", config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      shopAddress: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/customer/express/address?appUserId=" +
              data.id +
              "&businessId=" +
              data.businessId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      receiptAddress: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/customer/receipt/info?appUserId=" +
              data.id +
              "&businessId=" +
              data.businessId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      businessInfo: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url + "/business/express/info?businessId=" + data.businessId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      addBAddress: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/customer/express/address", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      addFAddress: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/customer/receipt/info", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      newOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .post(url + "/orders/new", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      myOrder: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/orders/my?appUserId=" +
              data.id +
              "&businessId=" +
              data.businessId,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      orderDetail: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .get(
            url +
              "/orders/detail?appUserId=" +
              data.appUserId +
              "&businessId=" +
              data.businessId +
              "&orderNo=" +
              data.orderNo,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      },
      changePic: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(url + "/orders/footer/pay", data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data, status);
          });
      }
    };
  })
  .factory("$shopData", function() {
    return {};
  })
  .factory("$city", function() {
    return [
      {
        name: "北京",
        city: [
          {
            name: "北京",
            area: [
              "东城区",
              "西城区",
              "崇文区",
              "宣武区",
              "朝阳区",
              "丰台区",
              "石景山区",
              "海淀区",
              "门头沟区",
              "房山区",
              "通州区",
              "顺义区",
              "昌平区",
              "大兴区",
              "平谷区",
              "怀柔区",
              "密云县",
              "延庆县"
            ]
          }
        ]
      },
      {
        name: "天津",
        city: [
          {
            name: "天津",
            area: [
              "和平区",
              "河东区",
              "河西区",
              "南开区",
              "河北区",
              "红桥区",
              "塘沽区",
              "汉沽区",
              "大港区",
              "东丽区",
              "西青区",
              "津南区",
              "北辰区",
              "武清区",
              "宝坻区",
              "宁河县",
              "静海县",
              "蓟  县"
            ]
          }
        ]
      },
      {
        name: "河北",
        city: [
          {
            name: "石家庄",
            area: [
              "长安区",
              "桥东区",
              "桥西区",
              "新华区",
              "郊  区",
              "井陉矿区",
              "井陉县",
              "正定县",
              "栾城县",
              "行唐县",
              "灵寿县",
              "高邑县",
              "深泽县",
              "赞皇县",
              "无极县",
              "平山县",
              "元氏县",
              "赵  县",
              "辛集市",
              "藁",
              "晋州市",
              "新乐市",
              "鹿泉市"
            ]
          },
          {
            name: "唐山",
            area: [
              "路南区",
              "路北区",
              "古冶区",
              "开平区",
              "新  区",
              "丰润县",
              "滦  县",
              "滦南县",
              "乐亭县",
              "迁西县",
              "玉田县",
              "唐海县",
              "遵化市",
              "丰南市",
              "迁安市"
            ]
          },
          {
            name: "秦皇岛",
            area: [
              "海港区",
              "山海关区",
              "北戴河区",
              "青龙满族自治县",
              "昌黎县",
              "抚宁县",
              "卢龙县"
            ]
          },
          {
            name: "邯郸",
            area: [
              "邯山区",
              "丛台区",
              "复兴区",
              "峰峰矿区",
              "邯郸县",
              "临漳县",
              "成安县",
              "大名县",
              "涉  县",
              "磁  县",
              "肥乡县",
              "永年县",
              "邱  县",
              "鸡泽县",
              "广平县",
              "馆陶县",
              "魏  县",
              "曲周县",
              "武安市"
            ]
          },
          {
            name: "邢台",
            area: [
              "桥东区",
              "桥西区",
              "邢台县",
              "临城县",
              "内丘县",
              "柏乡县",
              "隆尧县",
              "任  县",
              "南和县",
              "宁晋县",
              "巨鹿县",
              "新河县",
              "广宗县",
              "平乡县",
              "威  县",
              "清河县",
              "临西县",
              "南宫市",
              "沙河市"
            ]
          },
          {
            name: "保定",
            area: [
              "新市区",
              "北市区",
              "南市区",
              "满城县",
              "清苑县",
              "涞水县",
              "阜平县",
              "徐水县",
              "定兴县",
              "唐  县",
              "高阳县",
              "容城县",
              "涞源县",
              "望都县",
              "安新县",
              "易  县",
              "曲阳县",
              "蠡  县",
              "顺平县",
              "博野",
              "雄县",
              "涿州市",
              "定州市",
              "安国市",
              "高碑店市"
            ]
          },
          {
            name: "张家口",
            area: [
              "桥东区",
              "桥西区",
              "宣化区",
              "下花园区",
              "宣化县",
              "张北县",
              "康保县",
              "沽源县",
              "尚义县",
              "蔚  县",
              "阳原县",
              "怀安县",
              "万全县",
              "怀来县",
              "涿鹿县",
              "赤城县",
              "崇礼县"
            ]
          },
          {
            name: "承德",
            area: [
              "双桥区",
              "双滦区",
              "鹰手营子矿区",
              "承德县",
              "兴隆县",
              "平泉县",
              "滦平县",
              "隆化县",
              "丰宁满族自治县",
              "宽城满族自治县",
              "围场满族蒙古族自治县"
            ]
          },
          {
            name: "沧州",
            area: [
              "新华区",
              "运河区",
              "沧  县",
              "青  县",
              "东光县",
              "海兴县",
              "盐山县",
              "肃宁县",
              "南皮县",
              "吴桥县",
              "献  县",
              "孟村回族自治县",
              "泊头市",
              "任丘市",
              "黄骅市",
              "河间市"
            ]
          },
          {
            name: "廊坊",
            area: [
              "安次区",
              "固安县",
              "永清县",
              "香河县",
              "大城县",
              "文安县",
              "大厂回族自治县",
              "霸州市",
              "三河市"
            ]
          },
          {
            name: "衡水",
            area: [
              "桃城区",
              "枣强县",
              "武邑县",
              "武强县",
              "饶阳县",
              "安平县",
              "故城县",
              "景  县",
              "阜城县",
              "冀州市",
              "深州市"
            ]
          }
        ]
      },
      {
        name: "山西",
        city: [
          {
            name: "太原",
            area: [
              "小店区",
              "迎泽区",
              "杏花岭区",
              "尖草坪区",
              "万柏林区",
              "晋源区",
              "清徐县",
              "阳曲县",
              "娄烦县",
              "古交市"
            ]
          },
          {
            name: "大同",
            area: [
              "城  区",
              "矿  区",
              "南郊区",
              "新荣区",
              "阳高县",
              "天镇县",
              "广灵县",
              "灵丘县",
              "浑源县",
              "左云县",
              "大同县"
            ]
          },
          {
            name: "阳泉",
            area: ["城  区", "矿  区", "郊  区", "平定县", "盂  县"]
          },
          {
            name: "长治",
            area: [
              "城  区",
              "郊  区",
              "长治县",
              "襄垣县",
              "屯留县",
              "平顺县",
              "黎城县",
              "壶关县",
              "长子县",
              "武乡县",
              "沁  县",
              "沁源县",
              "潞城市"
            ]
          },
          {
            name: "晋城",
            area: ["城  区", "沁水县", "阳城县", "陵川县", "泽州县", "高平市"]
          },
          {
            name: "朔州",
            area: ["朔城区", "平鲁区", "山阴县", "应  县", "右玉县", "怀仁县"]
          },
          {
            name: "忻州",
            area: [
              "忻府区",
              "原平市",
              "定襄县",
              "五台县",
              "代  县",
              "繁峙县",
              "宁武县",
              "静乐县",
              "神池县",
              "五寨县",
              "岢岚县",
              "河曲县",
              "保德县",
              "偏关县"
            ]
          },
          {
            name: "吕梁",
            area: [
              "离石区",
              "孝义市",
              "汾阳市",
              "文水县",
              "交城县",
              "兴  县",
              "临  县",
              "柳林县",
              "石楼县",
              "岚  县",
              "方山县",
              "中阳县",
              "交口县"
            ]
          },
          {
            name: "晋中",
            area: [
              "榆次市",
              "介休市",
              "榆社县",
              "左权县",
              "和顺县",
              "昔阳县",
              "寿阳县",
              "太谷县",
              "祁  县",
              "平遥县",
              "灵石县"
            ]
          },
          {
            name: "临汾",
            area: [
              "临汾市",
              "侯马市",
              "霍州市",
              "曲沃县",
              "翼城县",
              "襄汾县",
              "洪洞县",
              "古  县",
              "安泽县",
              "浮山县",
              "吉  县",
              "乡宁县",
              "蒲  县",
              "大宁县",
              "永和县",
              "隰  县",
              "汾西县"
            ]
          },
          {
            name: "运城",
            area: [
              "运城市",
              "永济市",
              "河津市",
              "芮城县",
              "临猗县",
              "万荣县",
              "新绛县",
              "稷山县",
              "闻喜县",
              "夏  县",
              "绛  县",
              "平陆县",
              "垣曲县"
            ]
          }
        ]
      },
      {
        name: "内蒙古",
        city: [
          {
            name: "呼和浩特",
            area: [
              "新城区",
              "回民区",
              "玉泉区",
              "郊  区",
              "土默特左旗",
              "托克托县",
              "和林格尔县",
              "清水河县",
              "武川县"
            ]
          },
          {
            name: "包头",
            area: [
              "东河区",
              "昆都伦区",
              "青山区",
              "石拐矿区",
              "白云矿区",
              "郊  区",
              "土默特右旗",
              "固阳县",
              "达尔罕茂明安联合旗"
            ]
          },
          {
            name: "乌海",
            area: ["海勃湾区", "海南区", "乌达区"]
          },
          {
            name: "赤峰",
            area: [
              "红山区",
              "元宝山区",
              "松山区",
              "阿鲁科尔沁旗",
              "巴林左旗",
              "巴林右旗",
              "林西县",
              "克什克腾旗",
              "翁牛特旗",
              "喀喇沁旗",
              "宁城县",
              "敖汉旗"
            ]
          },
          {
            name: "呼伦贝尔",
            area: [
              "海拉尔市",
              "满洲里市",
              "扎兰屯市",
              "牙克石市",
              "根河市",
              "额尔古纳市",
              "阿荣旗",
              "莫力达瓦达斡尔族自治旗",
              "鄂伦春自治旗",
              "鄂温克族自治旗",
              "新巴尔虎右旗",
              "新巴尔虎左旗",
              "陈巴尔虎旗"
            ]
          },
          {
            name: "兴安盟",
            area: [
              "乌兰浩特市",
              "阿尔山市",
              "科尔沁右翼前旗",
              "科尔沁右翼中旗",
              "扎赉特旗",
              "突泉县"
            ]
          },
          {
            name: "通辽",
            area: [
              "科尔沁区",
              "霍林郭勒市",
              "科尔沁左翼中旗",
              "科尔沁左翼后旗",
              "开鲁县",
              "库伦旗",
              "奈曼旗",
              "扎鲁特旗"
            ]
          },
          {
            name: "锡林郭勒盟",
            area: [
              "二连浩特市",
              "锡林浩特市",
              "阿巴嘎旗",
              "苏尼特左旗",
              "苏尼特右旗",
              "东乌珠穆沁旗",
              "西乌珠穆沁旗",
              "太仆寺旗",
              "镶黄旗",
              "正镶白旗",
              "正蓝旗",
              "多伦县"
            ]
          },
          {
            name: "乌兰察布盟",
            area: [
              "集宁市",
              "丰镇市",
              "卓资县",
              "化德县",
              "商都县",
              "兴和县",
              "凉城县",
              "察哈尔右翼前旗",
              "察哈尔右翼中旗",
              "察哈尔右翼后旗",
              "四子王旗"
            ]
          },
          {
            name: "伊克昭盟",
            area: [
              "东胜市",
              "达拉特旗",
              "准格尔旗",
              "鄂托克前旗",
              "鄂托克旗",
              "杭锦旗",
              "乌审旗",
              "伊金霍洛旗"
            ]
          },
          {
            name: "巴彦淖尔盟",
            area: [
              "临河市",
              "五原县",
              "磴口县",
              "乌拉特前旗",
              "乌拉特中旗",
              "乌拉特后旗",
              "杭锦后旗"
            ]
          },
          {
            name: "阿拉善盟",
            area: ["阿拉善左旗", "阿拉善右旗", "额济纳旗"]
          }
        ]
      },
      {
        name: "辽宁",
        city: [
          {
            name: "沈阳",
            area: [
              "沈河区",
              "皇姑区",
              "和平区",
              "大东区",
              "铁西区",
              "苏家屯区",
              "东陵区",
              "于洪区",
              "新民市",
              "法库县",
              "辽中县",
              "康平县",
              "新城子区",
              "其他"
            ]
          },
          {
            name: "大连",
            area: [
              "西岗区",
              "中山区",
              "沙河口区",
              "甘井子区",
              "旅顺口区",
              "金州区",
              "瓦房店市",
              "普兰店市",
              "庄河市",
              "长海县",
              "其他"
            ]
          },
          {
            name: "鞍山",
            area: [
              "铁东区",
              "铁西区",
              "立山区",
              "千山区",
              "海城市",
              "台安县",
              "岫岩满族自治县",
              "其他"
            ]
          },
          {
            name: "抚顺",
            area: [
              "顺城区",
              "新抚区",
              "东洲区",
              "望花区",
              "抚顺县",
              "清原满族自治县",
              "新宾满族自治县",
              "其他"
            ]
          },
          {
            name: "本溪",
            area: [
              "平山区",
              "明山区",
              "溪湖区",
              "南芬区",
              "本溪满族自治县",
              "桓仁满族自治县",
              "其他"
            ]
          },
          {
            name: "丹东",
            area: [
              "振兴区",
              "元宝区",
              "振安区",
              "东港市",
              "凤城市",
              "宽甸满族自治县",
              "其他"
            ]
          },
          {
            name: "锦州",
            area: [
              "太和区",
              "古塔区",
              "凌河区",
              "凌海市",
              "黑山县",
              "义县",
              "北宁市",
              "其他"
            ]
          },
          {
            name: "营口",
            area: [
              "站前区",
              "西市区",
              "鲅鱼圈区",
              "老边区",
              "大石桥市",
              "盖州市",
              "其他"
            ]
          },
          {
            name: "阜新",
            area: [
              "海州区",
              "新邱区",
              "太平区",
              "清河门区",
              "细河区",
              "彰武县",
              "阜新蒙古族自治县",
              "其他"
            ]
          },
          {
            name: "辽阳",
            area: [
              "白塔区",
              "文圣区",
              "宏伟区",
              "太子河区",
              "弓长岭区",
              "灯塔市",
              "辽阳县",
              "其他"
            ]
          },
          {
            name: "盘锦",
            area: ["双台子区", "兴隆台区", "盘山县", "大洼县", "其他"]
          },
          {
            name: "铁岭",
            area: [
              "银州区",
              "清河区",
              "调兵山市",
              "开原市",
              "铁岭县",
              "昌图县",
              "西丰县",
              "其他"
            ]
          },
          {
            name: "朝阳",
            area: [
              "双塔区",
              "龙城区",
              "凌源市",
              "北票市",
              "朝阳县",
              "建平县",
              "喀喇沁左翼蒙古族自治县",
              "其他"
            ]
          },
          {
            name: "葫芦岛",
            area: [
              "龙港区",
              "南票区",
              "连山区",
              "兴城市",
              "绥中县",
              "建昌县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "吉林",
        city: [
          {
            name: "长春",
            area: [
              "朝阳区",
              "宽城区",
              "二道区",
              "南关区",
              "绿园区",
              "双阳区",
              "九台市",
              "榆树市",
              "德惠市",
              "农安县",
              "其他"
            ]
          },
          {
            name: "吉林",
            area: [
              "船营区",
              "昌邑区",
              "龙潭区",
              "丰满区",
              "舒兰市",
              "桦甸市",
              "蛟河市",
              "磐石市",
              "永吉县",
              "其他"
            ]
          },
          {
            name: "四平",
            area: [
              "铁西区",
              "铁东区",
              "公主岭市",
              "双辽市",
              "梨树县",
              "伊通满族自治县",
              "其他"
            ]
          },
          {
            name: "辽源",
            area: ["龙山区", "西安区", "东辽县", "东丰县", "其他"]
          },
          {
            name: "通化",
            area: [
              "东昌区",
              "二道江区",
              "梅河口市",
              "集安市",
              "通化县",
              "辉南县",
              "柳河县",
              "其他"
            ]
          },
          {
            name: "白山",
            area: [
              "八道江区",
              "江源区",
              "临江市",
              "靖宇县",
              "抚松县",
              "长白朝鲜族自治县",
              "其他"
            ]
          },
          {
            name: "松原",
            area: [
              "宁江区",
              "乾安县",
              "长岭县",
              "扶余县",
              "前郭尔罗斯蒙古族自治县",
              "其他"
            ]
          },
          {
            name: "白城",
            area: ["洮北区", "大安市", "洮南市", "镇赉县", "通榆县", "其他"]
          },
          {
            name: "延边朝鲜族自治州",
            area: [
              "延吉市",
              "图们市",
              "敦化市",
              "龙井市",
              "珲春市",
              "和龙市",
              "安图县",
              "汪清县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "黑龙江",
        city: [
          {
            name: "哈尔滨",
            area: [
              "松北区",
              "道里区",
              "南岗区",
              "平房区",
              "香坊区",
              "道外区",
              "呼兰区",
              "阿城区",
              "双城市",
              "尚志市",
              "五常市",
              "宾县",
              "方正县",
              "通河县",
              "巴彦县",
              "延寿县",
              "木兰县",
              "依兰县",
              "其他"
            ]
          },
          {
            name: "齐齐哈尔",
            area: [
              "龙沙区",
              "昂昂溪区",
              "铁锋区",
              "建华区",
              "富拉尔基区",
              "碾子山区",
              "梅里斯达斡尔族区",
              "讷河市",
              "富裕县",
              "拜泉县",
              "甘南县",
              "依安县",
              "克山县",
              "泰来县",
              "克东县",
              "龙江县",
              "其他"
            ]
          },
          {
            name: "鹤岗",
            area: [
              "兴山区",
              "工农区",
              "南山区",
              "兴安区",
              "向阳区",
              "东山区",
              "萝北县",
              "绥滨县",
              "其他"
            ]
          },
          {
            name: "双鸭山",
            area: [
              "尖山区",
              "岭东区",
              "四方台区",
              "宝山区",
              "集贤县",
              "宝清县",
              "友谊县",
              "饶河县",
              "其他"
            ]
          },
          {
            name: "鸡西",
            area: [
              "鸡冠区",
              "恒山区",
              "城子河区",
              "滴道区",
              "梨树区",
              "麻山区",
              "密山市",
              "虎林市",
              "鸡东县",
              "其他"
            ]
          },
          {
            name: "大庆",
            area: [
              "萨尔图区",
              "红岗区",
              "龙凤区",
              "让胡路区",
              "大同区",
              "林甸县",
              "肇州县",
              "肇源县",
              "杜尔伯特蒙古族自治县",
              "其他"
            ]
          },
          {
            name: "伊春",
            area: [
              "伊春区",
              "带岭区",
              "南岔区",
              "金山屯区",
              "西林区",
              "美溪区",
              "乌马河区",
              "翠峦区",
              "友好区",
              "上甘岭区",
              "五营区",
              "红星区",
              "新青区",
              "汤旺河区",
              "乌伊岭区",
              "铁力市",
              "嘉荫县",
              "其他"
            ]
          },
          {
            name: "牡丹江",
            area: [
              "爱民区",
              "东安区",
              "阳明区",
              "西安区",
              "绥芬河市",
              "宁安市",
              "海林市",
              "穆棱市",
              "林口县",
              "东宁县",
              "其他"
            ]
          },
          {
            name: "佳木斯",
            area: [
              "向阳区",
              "前进区",
              "东风区",
              "郊区",
              "同江市",
              "富锦市",
              "桦川县",
              "抚远县",
              "桦南县",
              "汤原县",
              "其他"
            ]
          },
          {
            name: "七台河",
            area: ["桃山区", "新兴区", "茄子河区", "勃利县", "其他"]
          },
          {
            name: "黑河",
            area: [
              "爱辉区",
              "北安市",
              "五大连池市",
              "逊克县",
              "嫩江县",
              "孙吴县",
              "其他"
            ]
          },
          {
            name: "绥化",
            area: [
              "北林区",
              "安达市",
              "肇东市",
              "海伦市",
              "绥棱县",
              "兰西县",
              "明水县",
              "青冈县",
              "庆安县",
              "望奎县",
              "其他"
            ]
          },
          {
            name: "大兴安岭地区",
            area: ["呼玛县", "塔河县", "漠河县", "大兴安岭辖区", "其他"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "上海",
        city: [
          {
            name: "上海",
            area: [
              "黄浦区",
              "卢湾区",
              "徐汇区",
              "长宁区",
              "静安区",
              "普陀区",
              "闸北区",
              "虹口区",
              "杨浦区",
              "宝山区",
              "闵行区",
              "嘉定区",
              "松江区",
              "金山区",
              "青浦区",
              "南汇区",
              "奉贤区",
              "浦东新区",
              "崇明县",
              "其他"
            ]
          }
        ]
      },
      {
        name: "江苏",
        city: [
          {
            name: "南京",
            area: [
              "玄武区",
              "白下区",
              "秦淮区",
              "建邺区",
              "鼓楼区",
              "下关区",
              "栖霞区",
              "雨花台区",
              "浦口区",
              "江宁区",
              "六合区",
              "溧水县",
              "高淳县",
              "其他"
            ]
          },
          {
            name: "苏州",
            area: [
              "金阊区",
              "平江区",
              "沧浪区",
              "虎丘区",
              "吴中区",
              "相城区",
              "常熟市",
              "张家港市",
              "昆山市",
              "吴江市",
              "太仓市",
              "其他"
            ]
          },
          {
            name: "无锡",
            area: [
              "崇安区",
              "南长区",
              "北塘区",
              "滨湖区",
              "锡山区",
              "惠山区",
              "江阴市",
              "宜兴市",
              "其他"
            ]
          },
          {
            name: "常州",
            area: [
              "钟楼区",
              "天宁区",
              "戚墅堰区",
              "新北区",
              "武进区",
              "金坛市",
              "溧阳市",
              "其他"
            ]
          },
          {
            name: "镇江",
            area: [
              "京口区",
              "润州区",
              "丹徒区",
              "丹阳市",
              "扬中市",
              "句容市",
              "其他"
            ]
          },
          {
            name: "南通",
            area: [
              "崇川区",
              "港闸区",
              "通州市",
              "如皋市",
              "海门市",
              "启东市",
              "海安县",
              "如东县",
              "其他"
            ]
          },
          {
            name: "泰州",
            area: [
              "海陵区",
              "高港区",
              "姜堰市",
              "泰兴市",
              "靖江市",
              "兴化市",
              "其他"
            ]
          },
          {
            name: "扬州",
            area: [
              "广陵区",
              "维扬区",
              "邗江区",
              "江都市",
              "仪征市",
              "高邮市",
              "宝应县",
              "其他"
            ]
          },
          {
            name: "盐城",
            area: [
              "亭湖区",
              "盐都区",
              "大丰市",
              "东台市",
              "建湖县",
              "射阳县",
              "阜宁县",
              "滨海县",
              "响水县",
              "其他"
            ]
          },
          {
            name: "连云港",
            area: [
              "新浦区",
              "海州区",
              "连云区",
              "东海县",
              "灌云县",
              "赣榆县",
              "灌南县",
              "其他"
            ]
          },
          {
            name: "徐州",
            area: [
              "云龙区",
              "鼓楼区",
              "九里区",
              "泉山区",
              "贾汪区",
              "邳州市",
              "新沂市",
              "铜山县",
              "睢宁县",
              "沛县",
              "丰县",
              "其他"
            ]
          },
          {
            name: "淮安",
            area: [
              "清河区",
              "清浦区",
              "楚州区",
              "淮阴区",
              "涟水县",
              "洪泽县",
              "金湖县",
              "盱眙县",
              "其他"
            ]
          },
          {
            name: "宿迁",
            area: ["宿城区", "宿豫区", "沭阳县", "泗阳县", "泗洪县", "其他"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "浙江",
        city: [
          {
            name: "杭州",
            area: [
              "拱墅区",
              "西湖区",
              "上城区",
              "下城区",
              "江干区",
              "滨江区",
              "余杭区",
              "萧山区",
              "建德市",
              "富阳市",
              "临安市",
              "桐庐县",
              "淳安县",
              "其他"
            ]
          },
          {
            name: "宁波",
            area: [
              "海曙区",
              "江东区",
              "江北区",
              "镇海区",
              "北仑区",
              "鄞州区",
              "余姚市",
              "慈溪市",
              "奉化市",
              "宁海县",
              "象山县",
              "其他"
            ]
          },
          {
            name: "温州",
            area: [
              "鹿城区",
              "龙湾区",
              "瓯海区",
              "瑞安市",
              "乐清市",
              "永嘉县",
              "洞头县",
              "平阳县",
              "苍南县",
              "文成县",
              "泰顺县",
              "其他"
            ]
          },
          {
            name: "嘉兴",
            area: [
              "秀城区",
              "秀洲区",
              "海宁市",
              "平湖市",
              "桐乡市",
              "嘉善县",
              "海盐县",
              "其他"
            ]
          },
          {
            name: "湖州",
            area: ["吴兴区", "南浔区", "长兴县", "德清县", "安吉县", "其他"]
          },
          {
            name: "绍兴",
            area: [
              "越城区",
              "诸暨市",
              "上虞市",
              "嵊州市",
              "绍兴县",
              "新昌县",
              "其他"
            ]
          },
          {
            name: "金华",
            area: [
              "婺城区",
              "金东区",
              "兰溪市",
              "义乌市",
              "东阳市",
              "永康市",
              "武义县",
              "浦江县",
              "磐安县",
              "其他"
            ]
          },
          {
            name: "衢州",
            area: [
              "柯城区",
              "衢江区",
              "江山市",
              "龙游县",
              "常山县",
              "开化县",
              "其他"
            ]
          },
          {
            name: "舟山",
            area: ["定海区", "普陀区", "岱山县", "嵊泗县", "其他"]
          },
          {
            name: "台州",
            area: [
              "椒江区",
              "黄岩区",
              "路桥区",
              "临海市",
              "温岭市",
              "玉环县",
              "天台县",
              "仙居县",
              "三门县",
              "其他"
            ]
          },
          {
            name: "丽水",
            area: [
              "莲都区",
              "龙泉市",
              "缙云县",
              "青田县",
              "云和县",
              "遂昌县",
              "松阳县",
              "庆元县",
              "景宁畲族自治县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "安徽",
        city: [
          {
            name: "合肥",
            area: [
              "庐阳区",
              "瑶海区",
              "蜀山区",
              "包河区",
              "长丰县",
              "肥东县",
              "肥西县",
              "其他"
            ]
          },
          {
            name: "芜湖",
            area: [
              "镜湖区",
              "弋江区",
              "鸠江区",
              "三山区",
              "芜湖县",
              "南陵县",
              "繁昌县",
              "其他"
            ]
          },
          {
            name: "蚌埠",
            area: [
              "蚌山区",
              "龙子湖区",
              "禹会区",
              "淮上区",
              "怀远县",
              "固镇县",
              "五河县",
              "其他"
            ]
          },
          {
            name: "淮南",
            area: [
              "田家庵区",
              "大通区",
              "谢家集区",
              "八公山区",
              "潘集区",
              "凤台县",
              "其他"
            ]
          },
          {
            name: "马鞍山",
            area: ["雨山区", "花山区", "金家庄区", "当涂县", "其他"]
          },
          {
            name: "淮北",
            area: ["相山区", "杜集区", "烈山区", "濉溪县", "其他"]
          },
          {
            name: "铜陵",
            area: ["铜官山区", "狮子山区", "郊区", "铜陵县", "其他"]
          },
          {
            name: "安庆",
            area: [
              "迎江区",
              "大观区",
              "宜秀区",
              "桐城市",
              "宿松县",
              "枞阳县",
              "太湖县",
              "怀宁县",
              "岳西县",
              "望江县",
              "潜山县",
              "其他"
            ]
          },
          {
            name: "黄山",
            area: [
              "屯溪区",
              "黄山区",
              "徽州区",
              "休宁县",
              "歙县",
              "祁门县",
              "黟县",
              "其他"
            ]
          },
          {
            name: "滁州",
            area: [
              "琅琊区",
              "南谯区",
              "天长市",
              "明光市",
              "全椒县",
              "来安县",
              "定远县",
              "凤阳县",
              "其他"
            ]
          },
          {
            name: "阜阳",
            area: [
              "颍州区",
              "颍东区",
              "颍泉区",
              "界首市",
              "临泉县",
              "颍上县",
              "阜南县",
              "太和县",
              "其他"
            ]
          },
          {
            name: "宿州",
            area: ["埇桥区", "萧县", "泗县", "砀山县", "灵璧县", "其他"]
          },
          {
            name: "巢湖",
            area: ["居巢区", "含山县", "无为县", "庐江县", "和县", "其他"]
          },
          {
            name: "六安",
            area: [
              "金安区",
              "裕安区",
              "寿县",
              "霍山县",
              "霍邱县",
              "舒城县",
              "金寨县",
              "其他"
            ]
          },
          {
            name: "亳州",
            area: ["谯城区", "利辛县", "涡阳县", "蒙城县", "其他"]
          },
          {
            name: "池州",
            area: ["贵池区", "东至县", "石台县", "青阳县", "其他"]
          },
          {
            name: "宣城",
            area: [
              "宣州区",
              "宁国市",
              "广德县",
              "郎溪县",
              "泾县",
              "旌德县",
              "绩溪县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "福建",
        city: [
          {
            name: "福州",
            area: [
              "鼓楼区",
              "台江区",
              "仓山区",
              "马尾区",
              "晋安区",
              "福清市",
              "长乐市",
              "闽侯县",
              "闽清县",
              "永泰县",
              "连江县",
              "罗源县",
              "平潭县",
              "其他"
            ]
          },
          {
            name: "厦门",
            area: [
              "思明区",
              "海沧区",
              "湖里区",
              "集美区",
              "同安区",
              "翔安区",
              "其他"
            ]
          },
          {
            name: "莆田",
            area: ["城厢区", "涵江区", "荔城区", "秀屿区", "仙游县", "其他"]
          },
          {
            name: "三明",
            area: [
              "梅列区",
              "三元区",
              "永安市",
              "明溪县",
              "将乐县",
              "大田县",
              "宁化县",
              "建宁县",
              "沙县",
              "尤溪县",
              "清流县",
              "泰宁县",
              "其他"
            ]
          },
          {
            name: "泉州",
            area: [
              "鲤城区",
              "丰泽区",
              "洛江区",
              "泉港区",
              "石狮市",
              "晋江市",
              "南安市",
              "惠安县",
              "永春县",
              "安溪县",
              "德化县",
              "金门县",
              "其他"
            ]
          },
          {
            name: "漳州",
            area: [
              "芗城区",
              "龙文区",
              "龙海市",
              "平和县",
              "南靖县",
              "诏安县",
              "漳浦县",
              "华安县",
              "东山县",
              "长泰县",
              "云霄县",
              "其他"
            ]
          },
          {
            name: "南平",
            area: [
              "延平区",
              "建瓯市",
              "邵武市",
              "武夷山市",
              "建阳市",
              "松溪县",
              "光泽县",
              "顺昌县",
              "浦城县",
              "政和县",
              "其他"
            ]
          },
          {
            name: "龙岩",
            area: [
              "新罗区",
              "漳平市",
              "长汀县",
              "武平县",
              "上杭县",
              "永定县",
              "连城县",
              "其他"
            ]
          },
          {
            name: "宁德",
            area: [
              "蕉城区",
              "福安市",
              "福鼎市",
              "寿宁县",
              "霞浦县",
              "柘荣县",
              "屏南县",
              "古田县",
              "周宁县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "江西",
        city: [
          {
            name: "南昌",
            area: [
              "东湖区",
              "西湖区",
              "青云谱区",
              "湾里区",
              "青山湖区",
              "新建县",
              "南昌县",
              "进贤县",
              "安义县",
              "其他"
            ]
          },
          {
            name: "景德镇",
            area: ["珠山区", "昌江区", "乐平市", "浮梁县", "其他"]
          },
          {
            name: "萍乡",
            area: ["安源区", "湘东区", "莲花县", "上栗县", "芦溪县", "其他"]
          },
          {
            name: "九江",
            area: [
              "浔阳区",
              "庐山区",
              "瑞昌市",
              "九江县",
              "星子县",
              "武宁县",
              "彭泽县",
              "永修县",
              "修水县",
              "湖口县",
              "德安县",
              "都昌县",
              "其他"
            ]
          },
          {
            name: "新余",
            area: ["渝水区", "分宜县", "其他"]
          },
          {
            name: "鹰潭",
            area: ["月湖区", "贵溪市", "余江县", "其他"]
          },
          {
            name: "赣州",
            area: [
              "章贡区",
              "瑞金市",
              "南康市",
              "石城县",
              "安远县",
              "赣县",
              "宁都县",
              "寻乌县",
              "兴国县",
              "定南县",
              "上犹县",
              "于都县",
              "龙南县",
              "崇义县",
              "信丰县",
              "全南县",
              "大余县",
              "会昌县",
              "其他"
            ]
          },
          {
            name: "吉安",
            area: [
              "吉州区",
              "青原区",
              "井冈山市",
              "吉安县",
              "永丰县",
              "永新县",
              "新干县",
              "泰和县",
              "峡江县",
              "遂川县",
              "安福县",
              "吉水县",
              "万安县",
              "其他"
            ]
          },
          {
            name: "宜春",
            area: [
              "袁州区",
              "丰城市",
              "樟树市",
              "高安市",
              "铜鼓县",
              "靖安县",
              "宜丰县",
              "奉新县",
              "万载县",
              "上高县",
              "其他"
            ]
          },
          {
            name: "抚州",
            area: [
              "临川区",
              "南丰县",
              "乐安县",
              "金溪县",
              "南城县",
              "东乡县",
              "资溪县",
              "宜黄县",
              "广昌县",
              "黎川县",
              "崇仁县",
              "其他"
            ]
          },
          {
            name: "上饶",
            area: [
              "信州区",
              "德兴市",
              "上饶县",
              "广丰县",
              "鄱阳县",
              "婺源县",
              "铅山县",
              "余干县",
              "横峰县",
              "弋阳县",
              "玉山县",
              "万年县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "山东",
        city: [
          {
            name: "济南",
            area: [
              "市中区",
              "历下区",
              "天桥区",
              "槐荫区",
              "历城区",
              "长清区",
              "章丘市",
              "平阴县",
              "济阳县",
              "商河县",
              "其他"
            ]
          },
          {
            name: "青岛",
            area: [
              "市南区",
              "市北区",
              "城阳区",
              "四方区",
              "李沧区",
              "黄岛区",
              "崂山区",
              "胶南市",
              "胶州市",
              "平度市",
              "莱西市",
              "即墨市",
              "其他"
            ]
          },
          {
            name: "淄博",
            area: [
              "张店区",
              "临淄区",
              "淄川区",
              "博山区",
              "周村区",
              "桓台县",
              "高青县",
              "沂源县",
              "其他"
            ]
          },
          {
            name: "枣庄",
            area: [
              "市中区",
              "山亭区",
              "峄城区",
              "台儿庄区",
              "薛城区",
              "滕州市",
              "其他"
            ]
          },
          {
            name: "东营",
            area: ["东营区", "河口区", "垦利县", "广饶县", "利津县", "其他"]
          },
          {
            name: "烟台",
            area: [
              "芝罘区",
              "福山区",
              "牟平区",
              "莱山区",
              "龙口市",
              "莱阳市",
              "莱州市",
              "招远市",
              "蓬莱市",
              "栖霞市",
              "海阳市",
              "长岛县",
              "其他"
            ]
          },
          {
            name: "潍坊",
            area: [
              "潍城区",
              "寒亭区",
              "坊子区",
              "奎文区",
              "青州市",
              "诸城市",
              "寿光市",
              "安丘市",
              "高密市",
              "昌邑市",
              "昌乐县",
              "临朐县",
              "其他"
            ]
          },
          {
            name: "济宁",
            area: [
              "市中区",
              "任城区",
              "曲阜市",
              "兖州市",
              "邹城市",
              "鱼台县",
              "金乡县",
              "嘉祥县",
              "微山县",
              "汶上县",
              "泗水县",
              "梁山县",
              "其他"
            ]
          },
          {
            name: "泰安",
            area: [
              "泰山区",
              "岱岳区",
              "新泰市",
              "肥城市",
              "宁阳县",
              "东平县",
              "其他"
            ]
          },
          {
            name: "威海",
            area: ["环翠区", "乳山市", "文登市", "荣成市", "其他"]
          },
          {
            name: "日照",
            area: ["东港区", "岚山区", "五莲县", "莒县", "其他"]
          },
          {
            name: "莱芜",
            area: ["莱城区", "钢城区", "其他"]
          },
          {
            name: "临沂",
            area: [
              "兰山区",
              "罗庄区",
              "河东区",
              "沂南县",
              "郯城县",
              "沂水县",
              "苍山县",
              "费县",
              "平邑县",
              "莒南县",
              "蒙阴县",
              "临沭县",
              "其他"
            ]
          },
          {
            name: "德州",
            area: [
              "德城区",
              "乐陵市",
              "禹城市",
              "陵县",
              "宁津县",
              "齐河县",
              "武城县",
              "庆云县",
              "平原县",
              "夏津县",
              "临邑县",
              "其他"
            ]
          },
          {
            name: "聊城",
            area: [
              "东昌府区",
              "临清市",
              "高唐县",
              "阳谷县",
              "茌平县",
              "莘县",
              "东阿县",
              "冠县",
              "其他"
            ]
          },
          {
            name: "滨州",
            area: [
              "滨城区",
              "邹平县",
              "沾化县",
              "惠民县",
              "博兴县",
              "阳信县",
              "无棣县",
              "其他"
            ]
          },
          {
            name: "菏泽",
            area: [
              "牡丹区",
              "鄄城县",
              "单县",
              "郓城县",
              "曹县",
              "定陶县",
              "巨野县",
              "东明县",
              "成武县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "河南",
        city: [
          {
            name: "郑州",
            area: [
              "中原区",
              "金水区",
              "二七区",
              "管城回族区",
              "上街区",
              "惠济区",
              "巩义市",
              "新郑市",
              "新密市",
              "登封市",
              "荥阳市",
              "中牟县",
              "其他"
            ]
          },
          {
            name: "开封",
            area: [
              "鼓楼区",
              "龙亭区",
              "顺河回族区",
              "禹王台区",
              "金明区",
              "开封县",
              "尉氏县",
              "兰考县",
              "杞县",
              "通许县",
              "其他"
            ]
          },
          {
            name: "洛阳",
            area: [
              "西工区",
              "老城区",
              "涧西区",
              "瀍河回族区",
              "洛龙区",
              "吉利区",
              "偃师市",
              "孟津县",
              "汝阳县",
              "伊川县",
              "洛宁县",
              "嵩县",
              "宜阳县",
              "新安县",
              "栾川县",
              "其他"
            ]
          },
          {
            name: "平顶山",
            area: [
              "新华区",
              "卫东区",
              "湛河区",
              "石龙区",
              "汝州市",
              "舞钢市",
              "宝丰县",
              "叶县",
              "郏县",
              "鲁山县",
              "其他"
            ]
          },
          {
            name: "安阳",
            area: [
              "北关区",
              "文峰区",
              "殷都区",
              "龙安区",
              "林州市",
              "安阳县",
              "滑县",
              "内黄县",
              "汤阴县",
              "其他"
            ]
          },
          {
            name: "鹤壁",
            area: ["淇滨区", "山城区", "鹤山区", "浚县", "淇县", "其他"]
          },
          {
            name: "新乡",
            area: [
              "卫滨区",
              "红旗区",
              "凤泉区",
              "牧野区",
              "卫辉市",
              "辉县市",
              "新乡县",
              "获嘉县",
              "原阳县",
              "长垣县",
              "封丘县",
              "延津县",
              "其他"
            ]
          },
          {
            name: "焦作",
            area: [
              "解放区",
              "中站区",
              "马村区",
              "山阳区",
              "沁阳市",
              "孟州市",
              "修武县",
              "温县",
              "武陟县",
              "博爱县",
              "其他"
            ]
          },
          {
            name: "濮阳",
            area: [
              "华龙区",
              "濮阳县",
              "南乐县",
              "台前县",
              "清丰县",
              "范县",
              "其他"
            ]
          },
          {
            name: "许昌",
            area: [
              "魏都区",
              "禹州市",
              "长葛市",
              "许昌县",
              "鄢陵县",
              "襄城县",
              "其他"
            ]
          },
          {
            name: "漯河",
            area: ["源汇区", "郾城区", "召陵区", "临颍县", "舞阳县", "其他"]
          },
          {
            name: "三门峡",
            area: [
              "湖滨区",
              "义马市",
              "灵宝市",
              "渑池县",
              "卢氏县",
              "陕县",
              "其他"
            ]
          },
          {
            name: "南阳",
            area: [
              "卧龙区",
              "宛城区",
              "邓州市",
              "桐柏县",
              "方城县",
              "淅川县",
              "镇平县",
              "唐河县",
              "南召县",
              "内乡县",
              "新野县",
              "社旗县",
              "西峡县",
              "其他"
            ]
          },
          {
            name: "商丘",
            area: [
              "梁园区",
              "睢阳区",
              "永城市",
              "宁陵县",
              "虞城县",
              "民权县",
              "夏邑县",
              "柘城县",
              "睢县",
              "其他"
            ]
          },
          {
            name: "信阳",
            area: [
              "浉河区",
              "平桥区",
              "潢川县",
              "淮滨县",
              "息县",
              "新县",
              "商城县",
              "固始县",
              "罗山县",
              "光山县",
              "其他"
            ]
          },
          {
            name: "周口",
            area: [
              "川汇区",
              "项城市",
              "商水县",
              "淮阳县",
              "太康县",
              "鹿邑县",
              "西华县",
              "扶沟县",
              "沈丘县",
              "郸城县",
              "其他"
            ]
          },
          {
            name: "驻马店",
            area: [
              "驿城区",
              "确山县",
              "新蔡县",
              "上蔡县",
              "西平县",
              "泌阳县",
              "平舆县",
              "汝南县",
              "遂平县",
              "正阳县",
              "其他"
            ]
          },
          {
            name: "焦作",
            area: ["济源市", "其他"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "湖北",
        city: [
          {
            name: "武汉",
            area: [
              "江岸区",
              "武昌区",
              "江汉区",
              "硚口区",
              "汉阳区",
              "青山区",
              "洪山区",
              "东西湖区",
              "汉南区",
              "蔡甸区",
              "江夏区",
              "黄陂区",
              "新洲区",
              "其他"
            ]
          },
          {
            name: "黄石",
            area: [
              "黄石港区",
              "西塞山区",
              "下陆区",
              "铁山区",
              "大冶市",
              "阳新县",
              "其他"
            ]
          },
          {
            name: "十堰",
            area: [
              "张湾区",
              "茅箭区",
              "丹江口市",
              "郧县",
              "竹山县",
              "房县",
              "郧西县",
              "竹溪县",
              "其他"
            ]
          },
          {
            name: "荆州",
            area: [
              "沙市区",
              "荆州区",
              "洪湖市",
              "石首市",
              "松滋市",
              "监利县",
              "公安县",
              "江陵县",
              "其他"
            ]
          },
          {
            name: "宜昌",
            area: [
              "西陵区",
              "伍家岗区",
              "点军区",
              "猇亭区",
              "夷陵区",
              "宜都市",
              "当阳市",
              "枝江市",
              "秭归县",
              "远安县",
              "兴山县",
              "五峰土家族自治县",
              "长阳土家族自治县",
              "其他"
            ]
          },
          {
            name: "襄樊",
            area: [
              "襄城区",
              "樊城区",
              "襄阳区",
              "老河口市",
              "枣阳市",
              "宜城市",
              "南漳县",
              "谷城县",
              "保康县",
              "其他"
            ]
          },
          {
            name: "鄂州",
            area: ["鄂城区", "华容区", "梁子湖区", "其他"]
          },
          {
            name: "荆门",
            area: ["东宝区", "掇刀区", "钟祥市", "京山县", "沙洋县", "其他"]
          },
          {
            name: "孝感",
            area: [
              "孝南区",
              "应城市",
              "安陆市",
              "汉川市",
              "云梦县",
              "大悟县",
              "孝昌县",
              "其他"
            ]
          },
          {
            name: "黄冈",
            area: [
              "黄州区",
              "麻城市",
              "武穴市",
              "红安县",
              "罗田县",
              "浠水县",
              "蕲春县",
              "黄梅县",
              "英山县",
              "团风县",
              "其他"
            ]
          },
          {
            name: "咸宁",
            area: [
              "咸安区",
              "赤壁市",
              "嘉鱼县",
              "通山县",
              "崇阳县",
              "通城县",
              "其他"
            ]
          },
          {
            name: "随州",
            area: ["曾都区", "广水市", "其他"]
          },
          {
            name: "恩施土家族苗族自治州",
            area: [
              "恩施市",
              "利川市",
              "建始县",
              "来凤县",
              "巴东县",
              "鹤峰县",
              "宣恩县",
              "咸丰县",
              "其他"
            ]
          },
          {
            name: "仙桃",
            area: ["仙桃"]
          },
          {
            name: "天门",
            area: ["天门"]
          },
          {
            name: "潜江",
            area: ["潜江"]
          },
          {
            name: "神农架林区",
            area: ["神农架林区"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "湖南",
        city: [
          {
            name: "长沙",
            area: [
              "岳麓区",
              "芙蓉区",
              "天心区",
              "开福区",
              "雨花区",
              "浏阳市",
              "长沙县",
              "望城县",
              "宁乡县",
              "其他"
            ]
          },
          {
            name: "株洲",
            area: [
              "天元区",
              "荷塘区",
              "芦淞区",
              "石峰区",
              "醴陵市",
              "株洲县",
              "炎陵县",
              "茶陵县",
              "攸县",
              "其他"
            ]
          },
          {
            name: "湘潭",
            area: ["岳塘区", "雨湖区", "湘乡市", "韶山市", "湘潭县", "其他"]
          },
          {
            name: "衡阳",
            area: [
              "雁峰区",
              "珠晖区",
              "石鼓区",
              "蒸湘区",
              "南岳区",
              "耒阳市",
              "常宁市",
              "衡阳县",
              "衡东县",
              "衡山县",
              "衡南县",
              "祁东县",
              "其他"
            ]
          },
          {
            name: "邵阳",
            area: [
              "双清区",
              "大祥区",
              "北塔区",
              "武冈市",
              "邵东县",
              "洞口县",
              "新邵县",
              "绥宁县",
              "新宁县",
              "邵阳县",
              "隆回县",
              "城步苗族自治县",
              "其他"
            ]
          },
          {
            name: "岳阳",
            area: [
              "岳阳楼区",
              "云溪区",
              "君山区",
              "临湘市",
              "汨罗市",
              "岳阳县",
              "湘阴县",
              "平江县",
              "华容县",
              "其他"
            ]
          },
          {
            name: "常德",
            area: [
              "武陵区",
              "鼎城区",
              "津市市",
              "澧县",
              "临澧县",
              "桃源县",
              "汉寿县",
              "安乡县",
              "石门县",
              "其他"
            ]
          },
          {
            name: "张家界",
            area: ["永定区", "武陵源区", "慈利县", "桑植县", "其他"]
          },
          {
            name: "益阳",
            area: [
              "赫山区",
              "资阳区",
              "沅江市",
              "桃江县",
              "南县",
              "安化县",
              "其他"
            ]
          },
          {
            name: "郴州",
            area: [
              "北湖区",
              "苏仙区",
              "资兴市",
              "宜章县",
              "汝城县",
              "安仁县",
              "嘉禾县",
              "临武县",
              "桂东县",
              "永兴县",
              "桂阳县",
              "其他"
            ]
          },
          {
            name: "永州",
            area: [
              "冷水滩区",
              "零陵区",
              "祁阳县",
              "蓝山县",
              "宁远县",
              "新田县",
              "东安县",
              "江永县",
              "道县",
              "双牌县",
              "江华瑶族自治县",
              "其他"
            ]
          },
          {
            name: "怀化",
            area: [
              "鹤城区",
              "洪江市",
              "会同县",
              "沅陵县",
              "辰溪县",
              "溆浦县",
              "中方县",
              "新晃侗族自治县",
              "芷江侗族自治县",
              "通道侗族自治县",
              "靖州苗族侗族自治县",
              "麻阳苗族自治县",
              "其他"
            ]
          },
          {
            name: "娄底",
            area: ["娄星区", "冷水江市", "涟源市", "新化县", "双峰县", "其他"]
          },
          {
            name: "湘西土家族苗族自治州",
            area: [
              "吉首市",
              "古丈县",
              "龙山县",
              "永顺县",
              "凤凰县",
              "泸溪县",
              "保靖县",
              "花垣县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "广东",
        city: [
          {
            name: "广州",
            area: [
              "越秀区",
              "荔湾区",
              "海珠区",
              "天河区",
              "白云区",
              "黄埔区",
              "番禺区",
              "花都区",
              "南沙区",
              "萝岗区",
              "增城市",
              "从化市",
              "其他"
            ]
          },
          {
            name: "深圳",
            area: [
              "福田区",
              "罗湖区",
              "南山区",
              "宝安区",
              "龙岗区",
              "盐田区",
              "其他"
            ]
          },
          {
            name: "东莞",
            area: ["莞城", "常平", "塘厦", "塘厦", "塘厦", "其他"]
          },
          {
            name: "中山",
            area: ["中山"]
          },
          {
            name: "潮州",
            area: ["湘桥区", "潮安县", "饶平县", "其他"]
          },
          {
            name: "揭阳",
            area: ["榕城区", "揭东县", "揭西县", "惠来县", "普宁市", "其他"]
          },
          {
            name: "云浮",
            area: ["云城区", "新兴县", "郁南县", "云安县", "罗定市", "其他"]
          },
          {
            name: "珠海",
            area: ["香洲区", "斗门区", "金湾区", "其他"]
          },
          {
            name: "汕头",
            area: [
              "金平区",
              "濠江区",
              "龙湖区",
              "潮阳区",
              "潮南区",
              "澄海区",
              "南澳县",
              "其他"
            ]
          },
          {
            name: "韶关",
            area: [
              "浈江区",
              "武江区",
              "曲江区",
              "乐昌市",
              "南雄市",
              "始兴县",
              "仁化县",
              "翁源县",
              "新丰县",
              "乳源瑶族自治县",
              "其他"
            ]
          },
          {
            name: "佛山",
            area: ["禅城区", "南海区", "顺德区", "三水区", "高明区", "其他"]
          },
          {
            name: "江门",
            area: [
              "蓬江区",
              "江海区",
              "新会区",
              "恩平市",
              "台山市",
              "开平市",
              "鹤山市",
              "其他"
            ]
          },
          {
            name: "湛江",
            area: [
              "赤坎区",
              "霞山区",
              "坡头区",
              "麻章区",
              "吴川市",
              "廉江市",
              "雷州市",
              "遂溪县",
              "徐闻县",
              "其他"
            ]
          },
          {
            name: "茂名",
            area: [
              "茂南区",
              "茂港区",
              "化州市",
              "信宜市",
              "高州市",
              "电白县",
              "其他"
            ]
          },
          {
            name: "肇庆",
            area: [
              "端州区",
              "鼎湖区",
              "高要市",
              "四会市",
              "广宁县",
              "怀集县",
              "封开县",
              "德庆县",
              "其他"
            ]
          },
          {
            name: "惠州",
            area: ["惠城区", "惠阳区", "博罗县", "惠东县", "龙门县", "其他"]
          },
          {
            name: "梅州",
            area: [
              "梅江区",
              "兴宁市",
              "梅县",
              "大埔县",
              "丰顺县",
              "五华县",
              "平远县",
              "蕉岭县",
              "其他"
            ]
          },
          {
            name: "汕尾",
            area: ["城区", "陆丰市", "海丰县", "陆河县", "其他"]
          },
          {
            name: "河源",
            area: [
              "源城区",
              "紫金县",
              "龙川县",
              "连平县",
              "和平县",
              "东源县",
              "其他"
            ]
          },
          {
            name: "阳江",
            area: ["江城区", "阳春市", "阳西县", "阳东县", "其他"]
          },
          {
            name: "清远",
            area: [
              "清城区",
              "英德市",
              "连州市",
              "佛冈县",
              "阳山县",
              "清新县",
              "连山壮族瑶族自治县",
              "连南瑶族自治县",
              "其他"
            ]
          }
        ]
      },
      {
        name: "广西",
        city: [
          {
            name: "南宁",
            area: [
              "青秀区",
              "兴宁区",
              "西乡塘区",
              "良庆区",
              "江南区",
              "邕宁区",
              "武鸣县",
              "隆安县",
              "马山县",
              "上林县",
              "宾阳县",
              "横县",
              "其他"
            ]
          },
          {
            name: "柳州",
            area: [
              "城中区",
              "鱼峰区",
              "柳北区",
              "柳南区",
              "柳江县",
              "柳城县",
              "鹿寨县",
              "融安县",
              "融水苗族自治县",
              "三江侗族自治县",
              "其他"
            ]
          },
          {
            name: "桂林",
            area: [
              "象山区",
              "秀峰区",
              "叠彩区",
              "七星区",
              "雁山区",
              "阳朔县",
              "临桂县",
              "灵川县",
              "全州县",
              "平乐县",
              "兴安县",
              "灌阳县",
              "荔浦县",
              "资源县",
              "永福县",
              "龙胜各族自治县",
              "恭城瑶族自治县",
              "其他"
            ]
          },
          {
            name: "梧州",
            area: [
              "万秀区",
              "蝶山区",
              "长洲区",
              "岑溪市",
              "苍梧县",
              "藤县",
              "蒙山县",
              "其他"
            ]
          },
          {
            name: "北海",
            area: ["海城区", "银海区", "铁山港区", "合浦县", "其他"]
          },
          {
            name: "防城港",
            area: ["港口区", "防城区", "东兴市", "上思县", "其他"]
          },
          {
            name: "钦州",
            area: ["钦南区", "钦北区", "灵山县", "浦北县", "其他"]
          },
          {
            name: "贵港",
            area: ["港北区", "港南区", "覃塘区", "桂平市", "平南县", "其他"]
          },
          {
            name: "玉林",
            area: [
              "玉州区",
              "北流市",
              "容县",
              "陆川县",
              "博白县",
              "兴业县",
              "其他"
            ]
          },
          {
            name: "百色",
            area: [
              "右江区",
              "凌云县",
              "平果县",
              "西林县",
              "乐业县",
              "德保县",
              "田林县",
              "田阳县",
              "靖西县",
              "田东县",
              "那坡县",
              "隆林各族自治县",
              "其他"
            ]
          },
          {
            name: "贺州",
            area: ["八步区", "钟山县", "昭平县", "富川瑶族自治县", "其他"]
          },
          {
            name: "河池",
            area: [
              "金城江区",
              "宜州市",
              "天峨县",
              "凤山县",
              "南丹县",
              "东兰县",
              "都安瑶族自治县",
              "罗城仫佬族自治县",
              "巴马瑶族自治县",
              "环江毛南族自治县",
              "大化瑶族自治县",
              "其他"
            ]
          },
          {
            name: "来宾",
            area: [
              "兴宾区",
              "合山市",
              "象州县",
              "武宣县",
              "忻城县",
              "金秀瑶族自治县",
              "其他"
            ]
          },
          {
            name: "崇左",
            area: [
              "江州区",
              "凭祥市",
              "宁明县",
              "扶绥县",
              "龙州县",
              "大新县",
              "天等县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "海南",
        city: [
          {
            name: "海口",
            area: ["龙华区", "秀英区", "琼山区", "美兰区", "其他"]
          },
          {
            name: "三亚",
            area: ["三亚市", "其他"]
          },
          {
            name: "五指山",
            area: ["五指山"]
          },
          {
            name: "琼海",
            area: ["琼海"]
          },
          {
            name: "儋州",
            area: ["儋州"]
          },
          {
            name: "文昌",
            area: ["文昌"]
          },
          {
            name: "万宁",
            area: ["万宁"]
          },
          {
            name: "东方",
            area: ["东方"]
          },
          {
            name: "澄迈县",
            area: ["澄迈县"]
          },
          {
            name: "定安县",
            area: ["定安县"]
          },
          {
            name: "屯昌县",
            area: ["屯昌县"]
          },
          {
            name: "临高县",
            area: ["临高县"]
          },
          {
            name: "白沙黎族自治县",
            area: ["白沙黎族自治县"]
          },
          {
            name: "昌江黎族自治县",
            area: ["昌江黎族自治县"]
          },
          {
            name: "乐东黎族自治县",
            area: ["乐东黎族自治县"]
          },
          {
            name: "陵水黎族自治县",
            area: ["陵水黎族自治县"]
          },
          {
            name: "保亭黎族苗族自治县",
            area: ["保亭黎族苗族自治县"]
          },
          {
            name: "琼中黎族苗族自治县",
            area: ["琼中黎族苗族自治县"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "重庆",
        city: [
          {
            name: "重庆",
            area: [
              "渝中区",
              "大渡口区",
              "江北区",
              "南岸区",
              "北碚区",
              "渝北区",
              "巴南区",
              "长寿区",
              "双桥区",
              "沙坪坝区",
              "万盛区",
              "万州区",
              "涪陵区",
              "黔江区",
              "永川区",
              "合川区",
              "江津区",
              "九龙坡区",
              "南川区",
              "綦江县",
              "潼南县",
              "荣昌县",
              "璧山县",
              "大足县",
              "铜梁县",
              "梁平县",
              "开县",
              "忠县",
              "城口县",
              "垫江县",
              "武隆县",
              "丰都县",
              "奉节县",
              "云阳县",
              "巫溪县",
              "巫山县",
              "石柱土家族自治县",
              "秀山土家族苗族自治县",
              "酉阳土家族苗族自治县",
              "彭水苗族土家族自治县",
              "其他"
            ]
          }
        ]
      },
      {
        name: "四川",
        city: [
          {
            name: "成都",
            area: [
              "青羊区",
              "锦江区",
              "金牛区",
              "武侯区",
              "成华区",
              "龙泉驿区",
              "青白江区",
              "新都区",
              "温江区",
              "都江堰市",
              "彭州市",
              "邛崃市",
              "崇州市",
              "金堂县",
              "郫县",
              "新津县",
              "双流县",
              "蒲江县",
              "大邑县",
              "其他"
            ]
          },
          {
            name: "自贡",
            area: [
              "大安区",
              "自流井区",
              "贡井区",
              "沿滩区",
              "荣县",
              "富顺县",
              "其他"
            ]
          },
          {
            name: "攀枝花",
            area: ["仁和区", "米易县", "盐边县", "东区", "西区", "其他"]
          },
          {
            name: "泸州",
            area: [
              "江阳区",
              "纳溪区",
              "龙马潭区",
              "泸县",
              "合江县",
              "叙永县",
              "古蔺县",
              "其他"
            ]
          },
          {
            name: "德阳",
            area: [
              "旌阳区",
              "广汉市",
              "什邡市",
              "绵竹市",
              "罗江县",
              "中江县",
              "其他"
            ]
          },
          {
            name: "绵阳",
            area: [
              "涪城区",
              "游仙区",
              "江油市",
              "盐亭县",
              "三台县",
              "平武县",
              "安县",
              "梓潼县",
              "北川羌族自治县",
              "其他"
            ]
          },
          {
            name: "广元",
            area: [
              "元坝区",
              "朝天区",
              "青川县",
              "旺苍县",
              "剑阁县",
              "苍溪县",
              "市中区",
              "其他"
            ]
          },
          {
            name: "遂宁",
            area: ["船山区", "安居区", "射洪县", "蓬溪县", "大英县", "其他"]
          },
          {
            name: "内江",
            area: ["市中区", "东兴区", "资中县", "隆昌县", "威远县", "其他"]
          },
          {
            name: "乐山",
            area: [
              "市中区",
              "五通桥区",
              "沙湾区",
              "金口河区",
              "峨眉山市",
              "夹江县",
              "井研县",
              "犍为县",
              "沐川县",
              "马边彝族自治县",
              "峨边彝族自治县",
              "其他"
            ]
          },
          {
            name: "南充",
            area: [
              "顺庆区",
              "高坪区",
              "嘉陵区",
              "阆中市",
              "营山县",
              "蓬安县",
              "仪陇县",
              "南部县",
              "西充县",
              "其他"
            ]
          },
          {
            name: "眉山",
            area: [
              "东坡区",
              "仁寿县",
              "彭山县",
              "洪雅县",
              "丹棱县",
              "青神县",
              "其他"
            ]
          },
          {
            name: "宜宾",
            area: [
              "翠屏区",
              "宜宾县",
              "兴文县",
              "南溪县",
              "珙县",
              "长宁县",
              "高县",
              "江安县",
              "筠连县",
              "屏山县",
              "其他"
            ]
          },
          {
            name: "广安",
            area: ["广安区", "华蓥市", "岳池县", "邻水县", "武胜县", "其他"]
          },
          {
            name: "达州",
            area: [
              "通川区",
              "万源市",
              "达县",
              "渠县",
              "宣汉县",
              "开江县",
              "大竹县",
              "其他"
            ]
          },
          {
            name: "雅安",
            area: [
              "雨城区",
              "芦山县",
              "石棉县",
              "名山县",
              "天全县",
              "荥经县",
              "宝兴县",
              "汉源县",
              "其他"
            ]
          },
          {
            name: "巴中",
            area: ["巴州区", "南江县", "平昌县", "通江县", "其他"]
          },
          {
            name: "资阳",
            area: ["雁江区", "简阳市", "安岳县", "乐至县", "其他"]
          },
          {
            name: "阿坝藏族羌族自治州",
            area: [
              "马尔康县",
              "九寨沟县",
              "红原县",
              "汶川县",
              "阿坝县",
              "理县",
              "若尔盖县",
              "小金县",
              "黑水县",
              "金川县",
              "松潘县",
              "壤塘县",
              "茂县",
              "其他"
            ]
          },
          {
            name: "甘孜藏族自治州",
            area: [
              "康定县",
              "丹巴县",
              "炉霍县",
              "九龙县",
              "甘孜县",
              "雅江县",
              "新龙县",
              "道孚县",
              "白玉县",
              "理塘县",
              "德格县",
              "乡城县",
              "石渠县",
              "稻城县",
              "色达县",
              "巴塘县",
              "泸定县",
              "得荣县",
              "其他"
            ]
          },
          {
            name: "凉山彝族自治州",
            area: [
              "西昌市",
              "美姑县",
              "昭觉县",
              "金阳县",
              "甘洛县",
              "布拖县",
              "雷波县",
              "普格县",
              "宁南县",
              "喜德县",
              "会东县",
              "越西县",
              "会理县",
              "盐源县",
              "德昌县",
              "冕宁县",
              "木里藏族自治县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "贵州",
        city: [
          {
            name: "贵阳",
            area: [
              "南明区",
              "云岩区",
              "花溪区",
              "乌当区",
              "白云区",
              "小河区",
              "清镇市",
              "开阳县",
              "修文县",
              "息烽县",
              "其他"
            ]
          },
          {
            name: "六盘水",
            area: ["钟山区", "水城县", "盘县", "六枝特区", "其他"]
          },
          {
            name: "遵义",
            area: [
              "红花岗区",
              "汇川区",
              "赤水市",
              "仁怀市",
              "遵义县",
              "绥阳县",
              "桐梓县",
              "习水县",
              "凤冈县",
              "正安县",
              "余庆县",
              "湄潭县",
              "道真仡佬族苗族自治县",
              "务川仡佬族苗族自治县",
              "其他"
            ]
          },
          {
            name: "安顺",
            area: [
              "西秀区",
              "普定县",
              "平坝县",
              "镇宁布依族苗族自治县",
              "紫云苗族布依族自治县",
              "关岭布依族苗族自治县",
              "其他"
            ]
          },
          {
            name: "铜仁地区",
            area: [
              "铜仁市",
              "德江县",
              "江口县",
              "思南县",
              "石阡县",
              "玉屏侗族自治县",
              "松桃苗族自治县",
              "印江土家族苗族自治县",
              "沿河土家族自治县",
              "万山特区",
              "其他"
            ]
          },
          {
            name: "毕节地区",
            area: [
              "毕节市",
              "黔西县",
              "大方县",
              "织金县",
              "金沙县",
              "赫章县",
              "纳雍县",
              "威宁彝族回族苗族自治县",
              "其他"
            ]
          },
          {
            name: "黔西南布依族苗族自治州",
            area: [
              "兴义市",
              "望谟县",
              "兴仁县",
              "普安县",
              "册亨县",
              "晴隆县",
              "贞丰县",
              "安龙县",
              "其他"
            ]
          },
          {
            name: "黔东南苗族侗族自治州",
            area: [
              "凯里市",
              "施秉县",
              "从江县",
              "锦屏县",
              "镇远县",
              "麻江县",
              "台江县",
              "天柱县",
              "黄平县",
              "榕江县",
              "剑河县",
              "三穗县",
              "雷山县",
              "黎平县",
              "岑巩县",
              "丹寨县",
              "其他"
            ]
          },
          {
            name: "黔南布依族苗族自治州",
            area: [
              "都匀市",
              "福泉市",
              "贵定县",
              "惠水县",
              "罗甸县",
              "瓮安县",
              "荔波县",
              "龙里县",
              "平塘县",
              "长顺县",
              "独山县",
              "三都水族自治县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "云南",
        city: [
          {
            name: "昆明",
            area: [
              "盘龙区",
              "五华区",
              "官渡区",
              "西山区",
              "东川区",
              "安宁市",
              "呈贡县",
              "晋宁县",
              "富民县",
              "宜良县",
              "嵩明县",
              "石林彝族自治县",
              "禄劝彝族苗族自治县",
              "寻甸回族彝族自治县",
              "其他"
            ]
          },
          {
            name: "曲靖",
            area: [
              "麒麟区",
              "宣威市",
              "马龙县",
              "沾益县",
              "富源县",
              "罗平县",
              "师宗县",
              "陆良县",
              "会泽县",
              "其他"
            ]
          },
          {
            name: "玉溪",
            area: [
              "红塔区",
              "江川县",
              "澄江县",
              "通海县",
              "华宁县",
              "易门县",
              "峨山彝族自治县",
              "新平彝族傣族自治县",
              "元江哈尼族彝族傣族自治县",
              "其他"
            ]
          },
          {
            name: "保山",
            area: ["隆阳区", "施甸县", "腾冲县", "龙陵县", "昌宁县", "其他"]
          },
          {
            name: "昭通",
            area: [
              "昭阳区",
              "鲁甸县",
              "巧家县",
              "盐津县",
              "大关县",
              "永善县",
              "绥江县",
              "镇雄县",
              "彝良县",
              "威信县",
              "水富县",
              "其他"
            ]
          },
          {
            name: "丽江",
            area: [
              "古城区",
              "永胜县",
              "华坪县",
              "玉龙纳西族自治县",
              "宁蒗彝族自治县",
              "其他"
            ]
          },
          {
            name: "普洱",
            area: [
              "思茅区",
              "普洱哈尼族彝族自治县",
              "墨江哈尼族自治县",
              "景东彝族自治县",
              "景谷傣族彝族自治县",
              "镇沅彝族哈尼族拉祜族自治县",
              "江城哈尼族彝族自治县",
              "孟连傣族拉祜族佤族自治县",
              "澜沧拉祜族自治县",
              "西盟佤族自治县",
              "其他"
            ]
          },
          {
            name: "临沧",
            area: [
              "临翔区",
              "凤庆县",
              "云县",
              "永德县",
              "镇康县",
              "双江拉祜族佤族布朗族傣族自治县",
              "耿马傣族佤族自治县",
              "沧源佤族自治县",
              "其他"
            ]
          },
          {
            name: "德宏傣族景颇族自治州",
            area: ["潞西市", "瑞丽市", "梁河县", "盈江县", "陇川县", "其他"]
          },
          {
            name: "怒江傈僳族自治州",
            area: [
              "泸水县",
              "福贡县",
              "贡山独龙族怒族自治县",
              "兰坪白族普米族自治县",
              "其他"
            ]
          },
          {
            name: "迪庆藏族自治州",
            area: ["香格里拉县", "德钦县", "维西傈僳族自治县", "其他"]
          },
          {
            name: "大理白族自治州",
            area: [
              "大理市",
              "祥云县",
              "宾川县",
              "弥渡县",
              "永平县",
              "云龙县",
              "洱源县",
              "剑川县",
              "鹤庆县",
              "漾濞彝族自治县",
              "南涧彝族自治县",
              "巍山彝族回族自治县",
              "其他"
            ]
          },
          {
            name: "楚雄彝族自治州",
            area: [
              "楚雄市",
              "双柏县",
              "牟定县",
              "南华县",
              "姚安县",
              "大姚县",
              "永仁县",
              "元谋县",
              "武定县",
              "禄丰县",
              "其他"
            ]
          },
          {
            name: "红河哈尼族彝族自治州",
            area: [
              "蒙自县",
              "个旧市",
              "开远市",
              "绿春县",
              "建水县",
              "石屏县",
              "弥勒县",
              "泸西县",
              "元阳县",
              "红河县",
              "金平苗族瑶族傣族自治县",
              "河口瑶族自治县",
              "屏边苗族自治县",
              "其他"
            ]
          },
          {
            name: "文山壮族苗族自治州",
            area: [
              "文山县",
              "砚山县",
              "西畴县",
              "麻栗坡县",
              "马关县",
              "丘北县",
              "广南县",
              "富宁县",
              "其他"
            ]
          },
          {
            name: "西双版纳傣族自治州",
            area: ["景洪市", "勐海县", "勐腊县", "其他"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "西藏",
        city: [
          {
            name: "拉萨",
            area: [
              "城关区",
              "林周县",
              "当雄县",
              "尼木县",
              "曲水县",
              "堆龙德庆县",
              "达孜县",
              "墨竹工卡县",
              "其他"
            ]
          },
          {
            name: "那曲地区",
            area: [
              "那曲县",
              "嘉黎县",
              "比如县",
              "聂荣县",
              "安多县",
              "申扎县",
              "索县",
              "班戈县",
              "巴青县",
              "尼玛县",
              "其他"
            ]
          },
          {
            name: "昌都地区",
            area: [
              "昌都县",
              "江达县",
              "贡觉县",
              "类乌齐县",
              "丁青县",
              "察雅县",
              "八宿县",
              "左贡县",
              "芒康县",
              "洛隆县",
              "边坝县",
              "其他"
            ]
          },
          {
            name: "林芝地区",
            area: [
              "林芝县",
              "工布江达县",
              "米林县",
              "墨脱县",
              "波密县",
              "察隅县",
              "朗县",
              "其他"
            ]
          },
          {
            name: "山南地区",
            area: [
              "乃东县",
              "扎囊县",
              "贡嘎县",
              "桑日县",
              "琼结县",
              "曲松县",
              "措美县",
              "洛扎县",
              "加查县",
              "隆子县",
              "错那县",
              "浪卡子县",
              "其他"
            ]
          },
          {
            name: "日喀则地区",
            area: [
              "日喀则市",
              "南木林县",
              "江孜县",
              "定日县",
              "萨迦县",
              "拉孜县",
              "昂仁县",
              "谢通门县",
              "白朗县",
              "仁布县",
              "康马县",
              "定结县",
              "仲巴县",
              "亚东县",
              "吉隆县",
              "聂拉木县",
              "萨嘎县",
              "岗巴县",
              "其他"
            ]
          },
          {
            name: "阿里地区",
            area: [
              "噶尔县",
              "普兰县",
              "札达县",
              "日土县",
              "革吉县",
              "改则县",
              "措勤县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "陕西",
        city: [
          {
            name: "西安",
            area: [
              "莲湖区",
              "新城区",
              "碑林区",
              "雁塔区",
              "灞桥区",
              "未央区",
              "阎良区",
              "临潼区",
              "长安区",
              "高陵县",
              "蓝田县",
              "户县",
              "周至县",
              "其他"
            ]
          },
          {
            name: "铜川",
            area: ["耀州区", "王益区", "印台区", "宜君县", "其他"]
          },
          {
            name: "宝鸡",
            area: [
              "渭滨区",
              "金台区",
              "陈仓区",
              "岐山县",
              "凤翔县",
              "陇县",
              "太白县",
              "麟游县",
              "扶风县",
              "千阳县",
              "眉县",
              "凤县",
              "其他"
            ]
          },
          {
            name: "咸阳",
            area: [
              "秦都区",
              "渭城区",
              "杨陵区",
              "兴平市",
              "礼泉县",
              "泾阳县",
              "永寿县",
              "三原县",
              "彬县",
              "旬邑县",
              "长武县",
              "乾县",
              "武功县",
              "淳化县",
              "其他"
            ]
          },
          {
            name: "渭南",
            area: [
              "临渭区",
              "韩城市",
              "华阴市",
              "蒲城县",
              "潼关县",
              "白水县",
              "澄城县",
              "华县",
              "合阳县",
              "富平县",
              "大荔县",
              "其他"
            ]
          },
          {
            name: "延安",
            area: [
              "宝塔区",
              "安塞县",
              "洛川县",
              "子长县",
              "黄陵县",
              "延川县",
              "富县",
              "延长县",
              "甘泉县",
              "宜川县",
              "志丹县",
              "黄龙县",
              "吴起县",
              "其他"
            ]
          },
          {
            name: "汉中",
            area: [
              "汉台区",
              "留坝县",
              "镇巴县",
              "城固县",
              "南郑县",
              "洋县",
              "宁强县",
              "佛坪县",
              "勉县",
              "西乡县",
              "略阳县",
              "其他"
            ]
          },
          {
            name: "榆林",
            area: [
              "榆阳区",
              "清涧县",
              "绥德县",
              "神木县",
              "佳县",
              "府谷县",
              "子洲县",
              "靖边县",
              "横山县",
              "米脂县",
              "吴堡县",
              "定边县",
              "其他"
            ]
          },
          {
            name: "安康",
            area: [
              "汉滨区",
              "紫阳县",
              "岚皋县",
              "旬阳县",
              "镇坪县",
              "平利县",
              "石泉县",
              "宁陕县",
              "白河县",
              "汉阴县",
              "其他"
            ]
          },
          {
            name: "商洛",
            area: [
              "商州区",
              "镇安县",
              "山阳县",
              "洛南县",
              "商南县",
              "丹凤县",
              "柞水县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "甘肃",
        city: [
          {
            name: "兰州",
            area: [
              "城关区",
              "七里河区",
              "西固区",
              "安宁区",
              "红古区",
              "永登县",
              "皋兰县",
              "榆中县",
              "其他"
            ]
          },
          {
            name: "嘉峪关",
            area: ["嘉峪关市", "其他"]
          },
          {
            name: "金昌",
            area: ["金川区", "永昌县", "其他"]
          },
          {
            name: "白银",
            area: ["白银区", "平川区", "靖远县", "会宁县", "景泰县", "其他"]
          },
          {
            name: "天水",
            area: [
              "清水县",
              "秦安县",
              "甘谷县",
              "武山县",
              "张家川回族自治县",
              "北道区",
              "秦城区",
              "其他"
            ]
          },
          {
            name: "武威",
            area: ["凉州区", "民勤县", "古浪县", "天祝藏族自治县", "其他"]
          },
          {
            name: "酒泉",
            area: [
              "肃州区",
              "玉门市",
              "敦煌市",
              "金塔县",
              "肃北蒙古族自治县",
              "阿克塞哈萨克族自治县",
              "安西县",
              "其他"
            ]
          },
          {
            name: "张掖",
            area: [
              "甘州区",
              "民乐县",
              "临泽县",
              "高台县",
              "山丹县",
              "肃南裕固族自治县",
              "其他"
            ]
          },
          {
            name: "庆阳",
            area: [
              "西峰区",
              "庆城县",
              "环县",
              "华池县",
              "合水县",
              "正宁县",
              "宁县",
              "镇原县",
              "其他"
            ]
          },
          {
            name: "平凉",
            area: [
              "崆峒区",
              "泾川县",
              "灵台县",
              "崇信县",
              "华亭县",
              "庄浪县",
              "静宁县",
              "其他"
            ]
          },
          {
            name: "定西",
            area: [
              "安定区",
              "通渭县",
              "临洮县",
              "漳县",
              "岷县",
              "渭源县",
              "陇西县",
              "其他"
            ]
          },
          {
            name: "陇南",
            area: [
              "武都区",
              "成县",
              "宕昌县",
              "康县",
              "文县",
              "西和县",
              "礼县",
              "两当县",
              "徽县",
              "其他"
            ]
          },
          {
            name: "临夏回族自治州",
            area: [
              "临夏市",
              "临夏县",
              "康乐县",
              "永靖县",
              "广河县",
              "和政县",
              "东乡族自治县",
              "积石山保安族东乡族撒拉族自治县",
              "其他"
            ]
          },
          {
            name: "甘南藏族自治州",
            area: [
              "合作市",
              "临潭县",
              "卓尼县",
              "舟曲县",
              "迭部县",
              "玛曲县",
              "碌曲县",
              "夏河县",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "青海",
        city: [
          {
            name: "西宁",
            area: [
              "城中区",
              "城东区",
              "城西区",
              "城北区",
              "湟源县",
              "湟中县",
              "大通回族土族自治县",
              "其他"
            ]
          },
          {
            name: "海东地区",
            area: [
              "平安县",
              "乐都县",
              "民和回族土族自治县",
              "互助土族自治县",
              "化隆回族自治县",
              "循化撒拉族自治县",
              "其他"
            ]
          },
          {
            name: "海北藏族自治州",
            area: ["海晏县", "祁连县", "刚察县", "门源回族自治县", "其他"]
          },
          {
            name: "海南藏族自治州",
            area: ["共和县", "同德县", "贵德县", "兴海县", "贵南县", "其他"]
          },
          {
            name: "黄南藏族自治州",
            area: ["同仁县", "尖扎县", "泽库县", "河南蒙古族自治县", "其他"]
          },
          {
            name: "果洛藏族自治州",
            area: [
              "玛沁县",
              "班玛县",
              "甘德县",
              "达日县",
              "久治县",
              "玛多县",
              "其他"
            ]
          },
          {
            name: "玉树藏族自治州",
            area: [
              "玉树县",
              "杂多县",
              "称多县",
              "治多县",
              "囊谦县",
              "曲麻莱县",
              "其他"
            ]
          },
          {
            name: "海西蒙古族藏族自治州",
            area: ["德令哈市", "格尔木市", "乌兰县", "都兰县", "天峻县", "其他"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "宁夏",
        city: [
          {
            name: "银川",
            area: [
              "兴庆区",
              "西夏区",
              "金凤区",
              "灵武市",
              "永宁县",
              "贺兰县",
              "其他"
            ]
          },
          {
            name: "石嘴山",
            area: ["大武口区", "惠农区", "平罗县", "其他"]
          },
          {
            name: "吴忠",
            area: ["利通区", "青铜峡市", "盐池县", "同心县", "其他"]
          },
          {
            name: "固原",
            area: ["原州区", "西吉县", "隆德县", "泾源县", "彭阳县", "其他"]
          },
          {
            name: "中卫",
            area: ["沙坡头区", "中宁县", "海原县", "其他"]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "新疆",
        city: [
          {
            name: "乌鲁木齐",
            area: [
              "天山区",
              "沙依巴克区",
              "新市区",
              "水磨沟区",
              "头屯河区",
              "达坂城区",
              "东山区",
              "乌鲁木齐县",
              "其他"
            ]
          },
          {
            name: "克拉玛依",
            area: ["克拉玛依区", "独山子区", "白碱滩区", "乌尔禾区", "其他"]
          },
          {
            name: "吐鲁番地区",
            area: ["吐鲁番市", "托克逊县", "鄯善县", "其他"]
          },
          {
            name: "哈密地区",
            area: ["哈密市", "伊吾县", "巴里坤哈萨克自治县", "其他"]
          },
          {
            name: "和田地区",
            area: [
              "和田市",
              "和田县",
              "洛浦县",
              "民丰县",
              "皮山县",
              "策勒县",
              "于田县",
              "墨玉县",
              "其他"
            ]
          },
          {
            name: "阿克苏地区",
            area: [
              "阿克苏市",
              "温宿县",
              "沙雅县",
              "拜城县",
              "阿瓦提县",
              "库车县",
              "柯坪县",
              "新和县",
              "乌什县",
              "其他"
            ]
          },
          {
            name: "喀什地区",
            area: [
              "喀什市",
              "巴楚县",
              "泽普县",
              "伽师县",
              "叶城县",
              "岳普湖县",
              "疏勒县",
              "麦盖提县",
              "英吉沙县",
              "莎车县",
              "疏附县",
              "塔什库尔干塔吉克自治县",
              "其他"
            ]
          },
          {
            name: "克孜勒苏柯尔克孜自治州",
            area: ["阿图什市", "阿合奇县", "乌恰县", "阿克陶县", "其他"]
          },
          {
            name: "巴音郭楞蒙古自治州",
            area: [
              "库尔勒市",
              "和静县",
              "尉犁县",
              "和硕县",
              "且末县",
              "博湖县",
              "轮台县",
              "若羌县",
              "焉耆回族自治县",
              "其他"
            ]
          },
          {
            name: "昌吉回族自治州",
            area: [
              "昌吉市",
              "阜康市",
              "奇台县",
              "玛纳斯县",
              "吉木萨尔县",
              "呼图壁县",
              "木垒哈萨克自治县",
              "米泉市",
              "其他"
            ]
          },
          {
            name: "博尔塔拉蒙古自治州",
            area: ["博乐市", "精河县", "温泉县", "其他"]
          },
          {
            name: "石河子",
            area: ["石河子"]
          },
          {
            name: "阿拉尔",
            area: ["阿拉尔"]
          },
          {
            name: "图木舒克",
            area: ["图木舒克"]
          },
          {
            name: "五家渠",
            area: ["五家渠"]
          },
          {
            name: "伊犁哈萨克自治州",
            area: [
              "伊宁市",
              "奎屯市",
              "伊宁县",
              "特克斯县",
              "尼勒克县",
              "昭苏县",
              "新源县",
              "霍城县",
              "巩留县",
              "察布查尔锡伯自治县",
              "塔城地区",
              "阿勒泰地区",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "台湾",
        city: [
          {
            name: "台湾",
            area: [
              "台北市",
              "高雄市",
              "台北县",
              "桃园县",
              "新竹县",
              "苗栗县",
              "台中县",
              "彰化县",
              "南投县",
              "云林县",
              "嘉义县",
              "台南县",
              "高雄县",
              "屏东县",
              "宜兰县",
              "花莲县",
              "台东县",
              "澎湖县",
              "基隆市",
              "新竹市",
              "台中市",
              "嘉义市",
              "台南市",
              "其他"
            ]
          },
          {
            name: "其他",
            area: ["其他"]
          }
        ]
      },
      {
        name: "澳门",
        city: [
          {
            name: "澳门",
            area: [
              "花地玛堂区",
              "圣安多尼堂区",
              "大堂区",
              "望德堂区",
              "风顺堂区",
              "嘉模堂区",
              "圣方济各堂区",
              "路凼",
              "其他"
            ]
          }
        ]
      },
      {
        name: "香港",
        city: [
          {
            name: "香港",
            area: [
              "中西区",
              "湾仔区",
              "东区",
              "南区",
              "深水埗区",
              "油尖旺区",
              "九龙城区",
              "黄大仙区",
              "观塘区",
              "北区",
              "大埔区",
              "沙田区",
              "西贡区",
              "元朗区",
              "屯门区",
              "荃湾区",
              "葵青区",
              "离岛区",
              "其他"
            ]
          }
        ]
      },
      {
        name: "钓鱼岛",
        city: [
          {
            name: "钓鱼岛",
            area: ["钓鱼岛"]
          }
        ]
      }
    ];
  })
  .factory("ContactManager", function($cordovaContacts) {
    var contacts; //variable that holds contacts, returned from getContacts

    return {
      getContacts: function() {
        var options = {};
        options.filter = "";
        options.multiple = true;

        //get the phone contacts
        return $cordovaContacts.find(options);
      }
    };
  })
  .service("$httpConfig", function($http, myUrl) {
    var url = myUrl.url;
    var config = {
      headers: {
        Authorization: localStorage["TOKEN_KEY"]
      }
    };
    return {
      getDishSetList: function(businessId, callBackS, callBackE) {
        $http
          .get(`${url}/dish/template/query?businessId=${businessId}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      addDishSet: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/dish/template/add`, params, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      editDishSet: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/dish/template/edit`, params, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      deleteDishSet: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/dish/template/delete`, params, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      }
    };
  })
  .service("$httpWechat", function($http, myUrl) {
    var url = myUrl.url;
    var ydurl = myUrl.ydurl;
    var config = {
      headers: {
        // 'Authorization': localStorage['TOKEN_KEY']
      }
    };
    return {
      getOrderWithBatchNo: function(params, callBackS, callBackE) {
        $http
          .get(`${url}/meetingKey/invitation?batchNo=${params.batchNo}`, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getMOrderData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/meeting/get/order/data?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getMNewKeyData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/meeting/get/new/key?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getMNewOrderData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/meeting/get/new/order?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}&status=${params.status}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getMNewRecordData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/meeting/get/new/record?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getMRecordRankData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/meeting/get/record/rank?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getWechatOrderInfo: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/meeting/get/order/data/appUser?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}&appUserId=${params.appUserId}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getOrderData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/order/data?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getOrderStatisticsData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/order/statistics?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getOrderRankData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/table/rank?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getOrderListData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/callon/list?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getSellerRankData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/seller/rank?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}&sort=${params.sort}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipValueData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/vip/value?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipValueDetailData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/vip/value/detail?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipRankAllData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/vip/rank/all?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipRecordData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/vip/change/record?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipAddRankData: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/vip/add?businessId=${params.businessId}&startResvdata=${params.startResvdata}&endResvdata=${params.endResvdata}`,
            config
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      sendWechatCode: function(params, callBackS, callBackE) {
        $http
          .post(`${ydurl}/ydservice/yd/bind/unionid`, $.param(params), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      unbingWechat: function(params, callBackS, callBackE) {
        $http
          .post(`${ydurl}/ydservice/yd/unbind/unionid`, $.param(params), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getWineListV2: function(params, callBackS, callBackE) {
        $http
          .get(`${url}/store/wine/list/v2?vipId=${params.vipId}`, {
            headers: {
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      }
    };
  })
  .service("$httpCunjiu", function($http, myUrl) {
    var url = myUrl.url;
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: localStorage["TOKEN_KEY"]
      }
    };
    return {
      getWineVip: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/store/wine/vip?businessId=${params.businessId}&type=${params.type}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipWines: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/store/wine/list?businessId=${params.businessId}&phone=${params.phone}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getWineLogs: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/store/wine/logs?businessId=${params.businessId}&phone=${params.phone}&vipId=${params.vipId}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getVipHasWine: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/store/wine/has?businessId=${params.businessId}&phone=${params.phone}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      addWineVip: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/store/wine/vip/add`, $.param(params), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      editWineInfo: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/store/wine/edit`, params, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      }
    };
  })
  .service("$httpLock", function($http, myUrl) {
    var url = myUrl.url;
    return {
      getYLockOrder: function(params, callBackS, callBackE) {
        $http
          .get(`${url}/meeting/lock/order?resvOrder=${params.resvOrder}`, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      unLockYorder: function(params, callBackS, callBackE) {
        $http
          .put(
            `${url}/meeting/unlock/order?resvOrder=${params.resvOrder}&appUserId=${params.appUserId}`,
            params,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      unLockYorderAll: function(params, callBackS, callBackE) {
        $http
          .put(
            `${url}/meeting/unlock/batch/order?resvOrder=${params.resvOrder}&appUserId=${params.appUserId}&isRelated=${params.isRelated}`,
            params,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      lockv2: function(data, callBackS, callBackE) {
        var config = {
          headers: {
            Authorization: localStorage["TOKEN_KEY"]
          }
        };
        $http
          .put(`${url}/order/lock/v2`, data, config)
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data, status) {
            callBackE(data);
          });
      }
    };
  })
  .service("$httpGroup", function($http, myUrl) {
    var url = myUrl.url;
    return {
      getGroupOrder: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/group/meal/order?businessId=${params.businessId}&resvStartDate=${params.resvStartDate}&resvEndDate=${params.resvEndDate}&mealTypeId=${params.mealTypeId}&groupMealId=${params.groupMealId}&appUserId=${params.appUserId}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getGroupMealAll: function(params, callBackS, callBackE) {
        $http
          .get(`${url}/order/get/group/meal?businessId=${params.businessId}`, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getGroupMeal: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/group/meal/num?businessId=${params.businessId}&resvStartDate=${params.resvStartDate}&resvEndDate=${params.resvEndDate}&mealTypeId=${params.mealTypeId}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      getGroupOrderDetail: function(params, callBackS, callBackE) {
        $http
          .get(
            `${url}/order/get/group/meal/detail?businessId=${params.businessId}&resvOrder=${params.resvOrder}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: localStorage["TOKEN_KEY"]
              }
            }
          )
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      checkGroupNum: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/order/check/group/meal/num`, params, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      saveGroupOrder: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/order/create/group/meal/order`, params, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      },
      updateGroupOrder: function(params, callBackS, callBackE) {
        $http
          .post(`${url}/order/update/group/meal/order`, params, {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage["TOKEN_KEY"]
            }
          })
          .success(function(data) {
            callBackS(data);
          })
          .error(function(data) {
            callBackE(data);
          });
      }
    };
  });
