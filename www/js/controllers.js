angular.module('starter.controllers', [])
  .controller('loginCtrl', function ($scope, $ionicPopup, $http, $httpPsd, $state, $stateParams, $showAlert, $ionicScrollDelegate, $operation) {
    $scope.data = {};
    $scope.selectHotel = ''
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.hotelList = []
      if ($stateParams.type != 1) {
        var token = localStorage['TOKEN_KEY'];
        console.log(!token);
        if (token) {
          $state.go('tab.dash');
        }
      }
      if(localStorage['loginData']){
        $scope.data.username = JSON.parse(localStorage['loginData']).username
        $scope.data.password = JSON.parse(localStorage['loginData']).password
        if($scope.data.username && $scope.data.password){
          $scope.login()
        }
      }
    });
    $scope.$watch('data.username', function (newValue,oldValue) {
      if(newValue && newValue.length==11){
        $httpPsd.loginCheck({
          appUserPhone: newValue
        }, function(data){
          $scope.hotelList = []
          if(data && data.length > 0){
            $scope.hotelList = data
            $scope.selectHotel = data[0]
          }
        }, function(data){
          $scope.hotelList = []
        })
      }
    }, true);
    $scope.changeHotel = function(selectHotel){
      $scope.selectHotel = selectHotel
    }
    $scope.clickUserName = function () {
      $ionicScrollDelegate.scrollTop()
    }
    $scope.showAlert = function (txt) {
      var alertPopup = $showAlert.alert(txt);
    };
    $scope.success = function (data) {
      console.log(data);
      localStorage.setItem('info', JSON.stringify(data));
      console.log(JSON.parse(localStorage.getItem('info')).username);
      localStorage.setItem('loginData', JSON.stringify($scope.data));
      $scope.data.username = '';
      $scope.data.password = '';
      $state.go('tab.dash');
    };
    $scope.error = function (data, status) {
      if (data && data.msgMessage) {
        if(data.msgCode == 400){
          var phone = $scope.data.username
          $scope.data.username = '';
          $scope.data.password = '';
          $state.go('psd2', {'appUserPhone': phone, 'isEasy': 1});
        }else{
          $scope.showAlert(data.msgMessage)
          $scope.data.password = "";
        }
      } else if (status == 401) {
        $scope.showAlert('账号或密码错误，请重新输入');
        $scope.data.password = "";
      } else {
        $scope.showAlert('网络无法访问，请检查网络连接');
      }
    }
    $scope.login = function () {
      if ($scope.data.username == '') {
        $scope.showAlert('请输入账号');
      } else if ($scope.data.password == '') {
        $scope.showAlert('请输入密码');
      } else {
        if($scope.hotelList.length>0){
          console.log($scope.selectHotel)
          $operation.changeHotel({
            "appUserId": $scope.selectHotel.appUserId,
            "businessId": $scope.selectHotel.businessId,
            "businessName": $scope.selectHotel.businessName,
            "typeId": $scope.selectHotel.typeId,
          }, function(){
            $httpPsd.login($scope.data, $scope.success, $scope.error);
          }, $scope.error);
        }else{
          $httpPsd.login($scope.data, $scope.success, $scope.error);
        }
      }
      //console.log($scope.data);
    }
    $scope.showPwd = function($event){
      $event.stopPropagation();
      var type = $('#password').attr('type')
      console.log(type)
      if(type == 'password'){
        $('#password').attr('type', 'text')
        $('.icon-closedeyes').addClass('icon-openeyes').removeClass('icon-closedeyes')
      }else{
        $('#password').attr('type', 'password')
        $('.icon-openeyes').addClass('icon-closedeyes').removeClass('icon-openeyes')
      }
    }
  })
  .controller('tabsCtrl', function ($scope, $state) {
    $scope.goPage = function(url){
      sessionStorage.removeItem('rankingFilter')
      $state.go(url);
    }
  })
  .controller('AccountMyOrderStateChangeCtrl', function ($scope) {

  })
  .controller('AccountMessageCtrl', function ($scope) {

  })
  .controller('privacyStatementCtrl', function ($scope) {

  })
  .controller('userAgreementsCtrl', function ($scope) {

  })
  .controller('shopCtrl', function ($scope, $state, $stateParams, $interval, $http, $shopping, $ionicPopup, $showAlert, $shopData) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $scope.shopModal = false;
      $scope.data = {};
      $scope.num = 0;
      $scope.imgLength = 0;
      $scope.count = null;
      $scope.picUrl = '';
      $scope.otherNum = 0;
      $scope.timer = $interval(function () {
        if ($scope.otherNum == $scope.otherOrder.length - 1) {
          $scope.otherNum = 0;
        } else {
          $scope.otherNum += 1;
        }
      }, 8000);
      $scope.getDetail();
    });
    $scope.$on('$ionicView.beforeLeave', function () {
      $interval.cancel($scope.timer);
      console.log('定时器取消了');
    });
    $scope.showModal = function () {
      $scope.shopModal = true;
    };
    $scope.hideModal = function () {
      $scope.shopModal = false;
    }
    $scope.picList = [];
    $scope.imgList = [];
    $scope.nextPic = function () {
      if ($scope.num == $scope.imgLength - 1) {
        $scope.imgList[$scope.num].hover = false;
        $scope.num = 0;
        $scope.imgList[$scope.num].hover = true;
      } else {
        $scope.imgList[$scope.num].hover = false;
        $scope.num += 1;
        $scope.imgList[$scope.num].hover = true;
      }
      $scope.picUrl = $scope.picList[$scope.num];
    }
    $scope.prePic = function () {
      if ($scope.num == 0) {
        $scope.imgList[$scope.num].hover = false;
        $scope.num = $scope.imgLength - 1;
        $scope.imgList[$scope.num].hover = true;
      } else {
        $scope.imgList[$scope.num].hover = false;
        $scope.num -= 1;
        $scope.imgList[$scope.num].hover = true;
      }
      $scope.picUrl = $scope.picList[$scope.num];
    }
    $scope.jia = function () {
      $scope.count += 1;
    };
    $scope.jian = function () {
      if ($scope.count > $scope.data.startNum) {
        $scope.count -= 1;
      }
    }
    /////////////成交记录//////////////////////////////////////////////////////////
    $scope.otherOrder = [
      '江南大酒店 购买了 2 箱',
      '宁波小酒店 购买了 3 箱',
      '是个粉红色 购买了 4 箱',
      '的鬼地方个 购买了 5 箱',
      '三个人认购 购买了 6 箱',
      '认为疼痛过 购买了 7 箱',
      '是狗粉后台 购买了 8 箱',
      '打个电话有 购买了 9 箱'
    ];
    //////////立即购买//////////////////////////////////////////////////////////////////////////
    $scope.buy = function () {
      for (var k in $scope.data) {
        $shopData[k] = $scope.data[k];
      }
      $shopData.count = $scope.count;
      $shopData.receipt = false;
      if (($scope.data.productNum - $scope.data.saleNum) < $scope.count) {
        $showAlert.alert('对不起，库存已不足');
      } else {
        $state.go('shoppingBuy', {'num': $scope.count});
      }
    };
    //////////读取商品详情/////////////////////////////////////////////////
    $scope.getDetail = function () {
      $shopping.shopDetail($scope.shopDetailSuccess, $scope.error);
    };
    $scope.shopDetailSuccess = function (data) {
      console.log(data);
      $scope.data = data;
      $scope.picList = data.productImages;
      for (var a = 0; a < data.productImages.length; a++) {
        var img = {};
        img.id = a;
        img.hover = false;
        $scope.imgList.push(img);
      }
      ;
      $scope.imgLength = $scope.imgList.length;
      if ($scope.imgList.length > 0) {
        $scope.imgList[0].hover = true;
      }
      $scope.picUrl = $scope.picList[0];
      $scope.count = data.startNum;
      console.log($scope.count);
    };
    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('shopBuyCtrl', function ($scope, $http, $state, $stateParams, $shopping, $ionicPopup, $showAlert, $shopData) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $scope.info = JSON.parse(localStorage['info']);
      $scope.checkbox = {};
      $scope.data = {};
      console.log($shopData);
      $scope.payData = {};
      $scope.product = $shopData;
      if ($stateParams.bAddress) {
        $scope.addressData = $stateParams.bAddress;
      } else {
        $scope.addressData = {};
        $shopping.shopAddress($scope.info, $scope.getAddressSuccess, $scope.error);
      }
      if ($stateParams.fAddress) {
        $scope.addressFData = $stateParams.fAddress;
      } else {
        $scope.addressFData = {};
        $shopping.receiptAddress($scope.info, $scope.getFAddressSuccess, $scope.error);
      }
    });
    $scope.goBack = function ($event) {
      $event.stopPropagation();
      $state.go('shopping', {'num': $scope.num});
    };
    $scope.getAddressSuccess = function (data) {
      console.log(data);
      if (data.length == 0) {
        console.log('去读酒店信息');
        $shopping.businessInfo($scope.info, $scope.getInfoSuccess, $scope.error);
      } else {
        $scope.addressData = data[0];
        $shopData.bId = $scope.addressData.id;
      }
      $shopData.bNum = 0;
    };
    $scope.getFAddressSuccess = function (data) {
      console.log(data);
      if (data.length != 0) {
        $scope.addressFData = data[0];
        $shopData.fNum = 0;
        $shopData.fId = $scope.addressFData.id;
      } else {
        console.log('没有发票信息');
      }
    };
    $scope.getInfoSuccess = function (data) {
      console.log(data);
      var addData = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'destPerson': $scope.info.surname,
        'destPhone': $scope.info.username,
        'area': data.provinceName + " " + data.cityName,
        'address': data.businessAddress
      };
      $scope.addressData = addData;
      $shopping.addBAddress(addData, $scope.addSuccess, $scope.error);
    };
    $scope.addSuccess = function (data) {
      console.log(data);
      $shopData.bId = data.msgCode;
      console.log($shopData.bId);
    };
    $scope.pay = function (txt) {
      for (var k in $scope.checkbox) {
        $scope.checkbox[k] = false;
      }
      $scope.checkbox[txt] = true;
      if (txt == 'two') {
        $scope.payData.payType = 1;
      } else if (txt == 'one') {
        $scope.payData.payType = 2;
      }
      console.log($scope.payData.payType);
    };
    ////////////////创建订单///////////////////
    $scope.newOrder = function () {
      if ($scope.payData.payType) {
        $scope.payData.productId = $shopData.id;
        $scope.payData.productNum = $shopData.count;
        $scope.payData.productPrice = $shopData.price;
        $scope.payData.total = $shopData.count * $shopData.price;
        $scope.payData.expressTotal = $shopData.expressAmt + ($shopData.overflowExpressAmt * ($shopData.count - $shopData.startNum));
        $scope.payData.expressAddressId = $shopData.bId;
        $scope.payData.receiptInfoId = $shopData.fId;
        $scope.payData.isReceipt = $shopData.receipt * 1;
        $scope.payData.appUserId = $scope.info.id;
        $scope.payData.businessId = $scope.info.businessId;
        $scope.payData.payAmt = ($shopData.count * ($shopData.price) + $scope.payData.expressTotal) / 10;
        console.log($scope.payData);
        $shopping.newOrder($scope.payData, $scope.orderSuccess, $scope.error);
      } else {
        $showAlert.alert('请选择支付类型');
      }
    };
    $scope.orderSuccess = function (data) {
      $showAlert.alert(data.msgMessage);
      $state.go('shopping');
    };
    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('selectAddCtrl', function ($scope, $http, $state, $shopping, $ionicPopup, $showAlert, $shopData) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      $scope.info = JSON.parse(localStorage['info']);
      viewData.enableBack = false;
      $shopping.shopAddress($scope.info, $scope.getAddressSuccess, $scope.error);
      $scope.addData = [];
    });
    $scope.getAddressSuccess = function (data) {
      $scope.addData = data;
      for (var a = 0; a < data.length; a++) {
        $scope.addData[a].num = a;
        $scope.addData[a].select = false;
      }
      $scope.addData[$shopData.bNum].select = true;
      console.log($scope.addData);
    };
    /////////////选择地址/////////////////
    $scope.selectAdd = function ($event) {
      $shopData.bNum = $event.target.getAttribute('data-id');
      $shopData.bId = $scope.addData[$shopData.bNum].id;
      console.log($shopData.bId);
      $state.go('shoppingBuy', {'bAddress': $scope.addData[$shopData.bNum]});
    };
    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('selectAddTCtrl', function ($scope, $http, $state, $shopping, $ionicPopup, $showAlert, $shopData) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      $scope.info = JSON.parse(localStorage['info']);
      viewData.enableBack = true;
      $shopping.receiptAddress($scope.info, $scope.getAddressSuccess, $scope.error);
      $scope.addData = [];
    });
    $scope.getAddressSuccess = function (data) {
      $scope.addData = data;
      for (var a = 0; a < data.length; a++) {
        $scope.addData[a].num = a;
        $scope.addData[a].select = false;
      }
      if ($shopData.fNum) {
        $scope.addData[$shopData.fNum].select = true;
      }
      console.log($scope.addData);
    };
    /////////////选择地址/////////////////
    $scope.selectAdd = function ($event) {
      $shopData.fNum = $event.target.getAttribute('data-id');
      $shopData.fId = $scope.addData[$shopData.fNum].id;
      console.log($shopData.fId);
      $state.go('shoppingBuy', {'fAddress': $scope.addData[$shopData.fNum]});
    };
    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };

  })
  .controller('selectAddFCtrl', function ($scope) {

  })
  .controller('otherOrderCtrl', function ($scope, $interval) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    });

  })
  .controller('AddAddCtrl', function ($scope, $http, $shopping, $ionicPopup, $showAlert, $state) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      $scope.showProvince = false;
      $scope.info = JSON.parse(localStorage['info']);
      $scope.province = '';
      $scope.city = '';
      $scope.district = '';
      $scope.provinceId = 0;
      $scope.pros = [
        {
          'name': '江苏',
          'pid': 0,
          select: false
        },
        {
          'name': '浙江',
          'pid': 1,
          select: false
        },
        {
          'name': '上海',
          'pid': 2,
          select: false
        }
      ];
      $scope.cities = [];
      $scope.districts = [];
      $scope.data = {};
    });
    $scope.showPro = function () {
      $scope.showProvince = true;
    };
    $scope.certain = function () {
      $scope.showProvince = false;
    };
    $scope.cancel = function () {
      $scope.showProvince = false;
    };
    $scope.area = [
      {
        "name": "江苏",
        "city": [
          {
            "name": "南京",
            "area": [
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
            "name": "苏州",
            "area": [
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
            "name": "无锡",
            "area": [
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
            "name": "常州",
            "area": [
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
            "name": "镇江",
            "area": [
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
            "name": "南通",
            "area": [
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
            "name": "泰州",
            "area": [
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
            "name": "扬州",
            "area": [
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
            "name": "盐城",
            "area": [
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
            "name": "连云港",
            "area": [
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
            "name": "徐州",
            "area": [
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
            "name": "淮安",
            "area": [
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
            "name": "宿迁",
            "area": [
              "宿城区",
              "宿豫区",
              "沭阳县",
              "泗阳县",
              "泗洪县",
              "其他"
            ]
          },
          {
            "name": "其他",
            "area": [
              "其他"
            ]
          }
        ]
      },
      {
        "name": "浙江",
        "city": [
          {
            "name": "杭州",
            "area": [
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
            "name": "宁波",
            "area": [
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
            "name": "温州",
            "area": [
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
            "name": "嘉兴",
            "area": [
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
            "name": "湖州",
            "area": [
              "吴兴区",
              "南浔区",
              "长兴县",
              "德清县",
              "安吉县",
              "其他"
            ]
          },
          {
            "name": "绍兴",
            "area": [
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
            "name": "金华",
            "area": [
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
            "name": "衢州",
            "area": [
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
            "name": "舟山",
            "area": [
              "定海区",
              "普陀区",
              "岱山县",
              "嵊泗县",
              "其他"
            ]
          },
          {
            "name": "台州",
            "area": [
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
            "name": "丽水",
            "area": [
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
            "name": "其他",
            "area": [
              "其他"
            ]
          }
        ]
      },
      {
        "name": "上海",
        "city": [
          {
            "name": "上海",
            "area": [
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
      }
    ];
    $scope.selectPro = function ($event) {
      var id = $event.target.getAttribute('data-id');
      $scope.provinceId = id;
      for (var i = 0; i < $scope.pros.length; i++) {
        $scope.pros[i].select = false;
      }
      $scope.pros[id].select = true;
      $scope.province = $scope.pros[id].name;
      $scope.cities = [];
      for (var i = 0; i < $scope.area[id].city.length; i++) {
        var city = {};
        city.cid = i;
        city.name = $scope.area[id].city[i].name;
        city.select = false;
        $scope.cities.push(city);
      }
    };
    $scope.selectCity = function ($event) {
      var id = $event.target.getAttribute('data-id');
      for (var i = 0; i < $scope.cities.length; i++) {
        $scope.cities[i].select = false;
      }
      $scope.cities[id].select = true;
      $scope.city = $scope.cities[id].name;
      $scope.districts = [];
      for (var i = 0; i < $scope.area[$scope.provinceId].city[id].area.length; i++) {
        var district = {};
        district.did = i;
        district.name = $scope.area[$scope.provinceId].city[id].area[i];
        district.select = false;
        $scope.districts.push(district);
      }
    };
    $scope.selectDistrict = function ($event) {
      var id = $event.target.getAttribute('data-id');
      for (var i = 0; i < $scope.districts.length; i++) {
        $scope.districts[i].select = false;
      }
      $scope.districts[id].select = true;
      $scope.district = $scope.districts[id].name;
      $scope.showProvince = false;
    };
    //////添加地址///////
    $scope.newAdd = function () {
      var addData = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'destPerson': $scope.data.destPerson,
        'destPhone': $scope.data.destPhone,
        'area': $scope.province + ' ' + $scope.city + ' ' + $scope.district,
        'address': $scope.data.area
      };
      if ((addData.destPerson != '') && (addData.destPhone) && (addData.destPhone.length == 11) && (addData.area != '') && (addData.address != '')) {
        $shopping.addBAddress(addData, $scope.addSuccess, $scope.error);
      } else {
        $showAlert.alert('请正确填写您的信息');
      }
      ;
    };
    $scope.addSuccess = function (data) {
      console.log(data);
      $showAlert.alert(data.msgMessage);
      $state.go('shoppingAdd');
    };

    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('AddAddFCtrl', function ($scope, $http, $shopping, $ionicPopup, $showAlert, $state) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      $scope.showProvince = false;
      $scope.info = JSON.parse(localStorage['info']);
      $scope.province = '';
      $scope.city = '';
      $scope.district = '';
      $scope.provinceId = 0;
      $scope.pros = [
        {
          'name': '江苏',
          'pid': 0,
          select: false
        },
        {
          'name': '浙江',
          'pid': 1,
          select: false
        },
        {
          'name': '上海',
          'pid': 2,
          select: false
        }
      ];
      $scope.cities = [];
      $scope.districts = [];
      $scope.data = {};
    });
    $scope.showPro = function () {
      $scope.showProvince = true;
    };
    $scope.certain = function () {
      $scope.showProvince = false;
    }
    $scope.cancel = function () {
      $scope.showProvince = false;
    }
    $scope.area = [
      {
        "name": "江苏",
        "city": [
          {
            "name": "南京",
            "area": [
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
            "name": "苏州",
            "area": [
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
            "name": "无锡",
            "area": [
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
            "name": "常州",
            "area": [
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
            "name": "镇江",
            "area": [
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
            "name": "南通",
            "area": [
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
            "name": "泰州",
            "area": [
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
            "name": "扬州",
            "area": [
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
            "name": "盐城",
            "area": [
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
            "name": "连云港",
            "area": [
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
            "name": "徐州",
            "area": [
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
            "name": "淮安",
            "area": [
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
            "name": "宿迁",
            "area": [
              "宿城区",
              "宿豫区",
              "沭阳县",
              "泗阳县",
              "泗洪县",
              "其他"
            ]
          },
          {
            "name": "其他",
            "area": [
              "其他"
            ]
          }
        ]
      },
      {
        "name": "浙江",
        "city": [
          {
            "name": "杭州",
            "area": [
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
            "name": "宁波",
            "area": [
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
            "name": "温州",
            "area": [
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
            "name": "嘉兴",
            "area": [
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
            "name": "湖州",
            "area": [
              "吴兴区",
              "南浔区",
              "长兴县",
              "德清县",
              "安吉县",
              "其他"
            ]
          },
          {
            "name": "绍兴",
            "area": [
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
            "name": "金华",
            "area": [
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
            "name": "衢州",
            "area": [
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
            "name": "舟山",
            "area": [
              "定海区",
              "普陀区",
              "岱山县",
              "嵊泗县",
              "其他"
            ]
          },
          {
            "name": "台州",
            "area": [
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
            "name": "丽水",
            "area": [
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
            "name": "其他",
            "area": [
              "其他"
            ]
          }
        ]
      },
      {
        "name": "上海",
        "city": [
          {
            "name": "上海",
            "area": [
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
      }
    ];
    $scope.selectPro = function ($event) {
      var id = $event.target.getAttribute('data-id');
      $scope.provinceId = id;
      for (var i = 0; i < $scope.pros.length; i++) {
        $scope.pros[i].select = false;
      }
      $scope.pros[id].select = true;
      $scope.province = $scope.pros[id].name;
      $scope.cities = [];
      for (var i = 0; i < $scope.area[id].city.length; i++) {
        var city = {};
        city.cid = i;
        city.name = $scope.area[id].city[i].name;
        city.select = false;
        $scope.cities.push(city);
      }
    };
    $scope.selectCity = function ($event) {
      var id = $event.target.getAttribute('data-id');
      for (var i = 0; i < $scope.cities.length; i++) {
        $scope.cities[i].select = false;
      }
      $scope.cities[id].select = true;
      $scope.city = $scope.cities[id].name;
      $scope.districts = [];
      for (var i = 0; i < $scope.area[$scope.provinceId].city[id].area.length; i++) {
        var district = {};
        district.did = i;
        district.name = $scope.area[$scope.provinceId].city[id].area[i];
        district.select = false;
        $scope.districts.push(district);
      }
    };
    $scope.selectDistrict = function ($event) {
      var id = $event.target.getAttribute('data-id');
      for (var i = 0; i < $scope.districts.length; i++) {
        $scope.districts[i].select = false;
      }
      $scope.districts[id].select = true;
      $scope.district = $scope.districts[id].name;
      $scope.showProvince = false;
    };
    //////添加地址///////
    $scope.newAdd = function () {
      var addData = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'receiptPerson': $scope.data.receiptPerson,
        'receiptPhone': $scope.data.receiptPhone,
        'receiptArea': $scope.province + ' ' + $scope.city + ' ' + $scope.district,
        'receiptAddress': $scope.data.receiptArea,
        'receiptTitle': $scope.data.receiptTitle,
        'receiptNo': $scope.data.receiptNo
      };
      if ((addData.receiptPerson != '') && (addData.receiptPhone) && (addData.receiptPhone.length == 11) && (addData.receiptArea != '') && (addData.receiptAddress != '') && (addData.receiptTitle != '') && (addData.receiptNo != '')) {
        $shopping.addFAddress(addData, $scope.addSuccess, $scope.error);
      } else {
        $showAlert.alert('请正确填写您的信息');
      }
    };
    $scope.addSuccess = function (data) {
      console.log(data);
      $showAlert.alert(data.msgMessage);
      $state.go('shoppingAddT');
    };

    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('shopOrderCtrl', function ($scope, $state, $http, $shopping, $ionicPopup, $showAlert, $state) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $scope.info = JSON.parse(localStorage['info']);
      $scope.showY = false;
      ;
      $scope.orderData = {};
      $shopping.myOrder($scope.info, $scope.orderSuccess, $scope.error);
    });
    $scope.goBack = function ($event) {
      $event.stopPropagation();
      $state.go('shopping');
    };
    $scope.goDetail = function (txt) {
      console.log(txt);
      $state.go('shopOrderDetail', {'orderNo': txt});
    };
    $scope.show = function () {
      $scope.showY = true;
    };
    $scope.hide = function () {
      $scope.showY = false;
    }
    $scope.orderSuccess = function (data) {
      console.log(data);
      $scope.orderData = data;
      for (var a = 0; a < $scope.orderData.length; a++) {
        switch ($scope.orderData[a].orderStatus * 1) {
          case 1:
            $scope.orderData[a].txt = "审核中";
            break;
          case 2:
            $scope.orderData[a].txt = "已支付订金";
            break;
          case 3:
            $scope.orderData[a].txt = "凭证审核中";
            break;
          case 4:
            $scope.orderData[a].txt = "已支付全款";
            break;
          case 5:
            $scope.orderData[a].txt = "已发货";
            break;
          case 6:
            $scope.orderData[a].txt = "交易完成";
            break;
        }
      }
    };
    $scope.goSubmit = function (txt, num) {
      console.log(txt);
      $state.go('shopSubmit', {'orderNo': txt, 'daifu': num});
    };
    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('shopSubmitCtrl', function ($scope, $log, $http, $qupload, $stateParams, $ionicLoading, $httpPsd, $shopping, $ionicPopup, $showAlert) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.info = JSON.parse(localStorage['info']);
      $scope.takePicData = {'scope': 'yiding'};
      $httpPsd.takePic($scope.takePicData, $scope.takePicSuccess, $scope.error);
      $scope.imgSrc = '';
      $scope.daifu = $stateParams.daifu;
      $scope.orderNo = $stateParams.orderNo;
    });
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: '加载中...'
      });
    };
    $scope.takePicSuccess = function (data) {
      $scope.uploadToken = data.uploadToken;
      console.log($scope.uploadToken);
    };
    $scope.selectFiles = [];
    var start = function (index) {
      $scope.selectFiles[index].progress = {
        p: 0
      };
      $scope.selectFiles[index].upload = $qupload.upload({
        key: '',
        file: $scope.selectFiles[index].file,
        token: $scope.uploadToken
      });
      $scope.selectFiles[index].upload.then(function (response) {
        $log.info(response);
        $scope.imgSrc = 'http://ocau87qqg.bkt.clouddn.com/' + response.hash + '?imageMogr2/auto-orient/thumbnail/600x/blur/1x0/quality/75|watermark/1/image/aHR0cDovL3d3dy56aGlkaWFuZmFuLmNvbS9pbWFnZXMvTE9HTy5wbmc=/dissolve/100/gravity/NorthWest/dx/10/dy/10|imageslim';
        $scope.changePicData = {
          "credentialImage": $scope.imgSrc,
          "orderNo": $scope.orderNo,
          'payAmt': $scope.daifu
        };
        $shopping.changePic($scope.changePicData, $scope.changePicSuccess, $scope.error);
      }, function (response) {
        $log.info(response);
      }, function (evt) {
        $scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
      });
    };

    $scope.abort = function (index) {
      $scope.selectFiles[index].upload.abort();
      $scope.selectFiles.splice(index, 1);
    };

    $scope.onFileSelect = function ($files) {
      var offsetx = $scope.selectFiles.length;
      for (var i = 0; i < $files.length; i++) {
        $scope.selectFiles[i + offsetx] = {
          file: $files[i]
        };
        $scope.showLoading();
        start(i + offsetx);
      }
    };
    $scope.changePicSuccess = function (data) {
      $ionicLoading.hide();
      $showAlert.alert(data.msgMessage);
    };
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('shopOrderDetailCtrl', function ($scope, $state, $http, $stateParams, $shopping, $ionicPopup, $showAlert, $shopData) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = false;
      $scope.info = JSON.parse(localStorage['info']);
      $scope.orderData = {};
      $scope.getOrderData = {
        'appUserId': $scope.info.id,
        'businessId': $scope.info.businessId,
        'orderNo': $stateParams.orderNo
      };
      $shopping.orderDetail($scope.getOrderData, $scope.orderSuccess, $scope.error);
    });
    $scope.orderSuccess = function (data) {
      console.log(data);
      $scope.orderData = data;
    };
    $scope.goBack = function ($event) {
      $event.stopPropagation();
      $state.go('shopOrder');
    };
    $scope.goSubmit = function (txt) {
      console.log(txt);
      $state.go('shopSubmit', {'orderNo': txt});
    };
    ///////////////错误//////////////////////
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('contactUsCtrl', function ($scope) {

  })
  .controller('youjiangCtrl', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {
    $scope.goForm = function () {
      $state.go('tab.dash-form');
    }
  })
  .controller('youjiangCtrlNew', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {
    $scope.goForm = function () {
      $state.go('tab.account-form');
    }
  })
  .controller('formCtrlNew', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {
    $scope.data = {};
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data.name = $scope.info.surname;
    $scope.data.tel = $scope.info.username;
    $scope.data.businessName = $scope.info.businessName;
    $scope.submit = function () {
      if (!$scope.data.name) {
        $showAlert.alert('请输入您的姓名');
      } else if ((($scope.data.tel) && ($scope.data.tel.toString().length != 6) && ($scope.data.tel.toString().length != 11)) || (!$scope.data.tel)) {
        $showAlert.alert('请输入正确的手机号');
      } else if (!$scope.data.businessName) {
        $showAlert.alert('请输入您的酒店名称');
      } else if (!$scope.data.linkMan) {
        $showAlert.alert('请输入被推荐人姓名');
      } else if (!$scope.data.job) {
        $showAlert.alert('请输入被推荐人职务');
      } else if ((($scope.data.linkTel) && ($scope.data.linkTel.toString().length != 6) && ($scope.data.linkTel.toString().length != 11)) || (!$scope.data.linkTel)) {
        $showAlert.alert('请输入正确的被推荐人联系方式');
      } else if (!$scope.data.company) {
        $showAlert.alert('请输入被推荐单位');
      } else if (!$scope.data.city) {
        $showAlert.alert('请输入被推荐单位城市');
      } else {
        $hezuo.form($scope.data, $scope.submitSuccess, $scope.error);
      }
    }
    $scope.submitSuccess = function () {
      if ($scope.data.name && $scope.data.tel && $scope.data.businessName && $scope.data.job && $scope.data.company && $scope.data.linkMan && $scope.data.linkTel && $scope.data.city) {
        for (var key in $scope.data) {
          $scope.data[key] = '';
        }
        $state.go('tab.account');
        $showAlert.alert('提交成功');
      } else {
        $showAlert.alert('请将内容填写完整');
      }
      ;

    };
    $scope.error = function (data) {
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('发送失败，请检查网络');
      }
    };
  })
  .controller('guanggaoCtrl', function ($scope, $http, $hezuo, $ionicPopup, $showAlert, $state) {

  })
  .controller('aboutUsCtrl', function ($scope) {
      $scope.$on('$ionicView.beforeEnter', function () {
        $scope.info = JSON.parse(localStorage['info']);
        $scope.isYp = $scope.info.isYp == 1 ? true : false
        console.log($scope.info);
      })
    })
