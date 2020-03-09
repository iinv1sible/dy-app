angular.module('starter.controllers.myCustomCtrl', []).controller('MyCustomCtrl', function ($scope, $http, $httpCustom, $ionicPopover, $showAlert, $ionicLoading, $state, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.resvOrderTypes = JSON.parse(sessionStorage['YresvOrderTypes']);
    $scope.meetingShow = localStorage['meetingOrder'] * 1;
    $scope.token = localStorage['TOKEN_KEY'];
    $scope.info = JSON.parse(localStorage['info']);
    console.log($scope.info);
    $scope.businessId = $scope.info.businessId;
    $scope.appUserId = $scope.info.id;
    $scope.isCanyin = true;
    $scope.isYanhui = false;
    $scope.type = 'pu';
    $scope.ziyuan = 0;
    $scope.page = 1
    $scope.rows = 20
    $scope.canLoad = false;
    $scope.customList = [];
    $scope.customIdList = [];
    $scope.valueList = [{
      vipValueName: '意向用户',
      vipValueId: 1,
      peopleNum: 0
    }, {
      vipValueName: '活跃用户',
      vipValueId: 2,
      peopleNum: 0
    }, {
      vipValueName: '沉睡用户',
      vipValueId: 3,
      peopleNum: 0
    }, {
      vipValueName: '流失用户',
      vipValueId: 4,
      peopleNum: 0
    }];
    $scope.subValueList = []
    $scope.colorList = ['#fc5b63','#7daef5','#f99a5a','#ffd561']
    $scope.cclass = null;
    $scope.allNum = 0;
    $scope.allSubNum = 0;
    $scope.typeTxt = '我的';
    $scope.subTypeTxt = '我的'
    $scope.qryType = 0;
    $scope.cType = 0;
    $scope.subcType = 1;
    var valueData = {
      'businessId': $scope.businessId * 1,
      'appUserId': $scope.appUserId * 1,
      'type': 0,
      'qryType': $scope.qryType
    };
    $httpCustom.customValueList(valueData, $scope.getCustomValueListSuccess, $scope.error);
    $httpCustom.customZiyuan(valueData, $scope.getZSuccess, $scope.error);
    if(localStorage['isYan'] == "true"){
      $scope.changeY();
    }else {
      $scope.changeC();
    }
  });
  $scope.token = '';
  $scope.goDetail = function () {
    $state.go('myCustom-detail', {'type': $scope.type});
  };
  $scope.goDetailAll = function () {
    $state.go('myCustom-detail', {'type': $scope.type, 'all': 1});
  };
  $scope.goInfo = function ($event) {
    var a = $event.target;
    var vipId = a.getAttribute('data-vipId');
    $state.go('myCustom-info', {'vipId': vipId,'isYan':true});
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.goSearch = function(){
    if($scope.typeTxt=='我的'){
      $scope.goDetail()
    }else{
      $scope.goDetailAll()
    }
  }
  $scope.getCustomValueList = function (data) {
    $scope.customIdList = [];
    for (var i = 0; i < data.length; i++) {
      data[i].isNowSelect = false;
      data[i].list = [];
      $scope.customIdList.push(data[i].vipValueId);
    }
    $scope.customList = data;
    console.log($scope.customIdList);
  };
  $scope.bgColor = [
    {"background-color": "#D76959"},
    {"background-color": "#76A6DF"},
    {"background-color": "#E7B45F"},
    {"background-color": "#5CBBA4"}
  ];
  $scope.getCustomValueListSuccess = function (data) {
    $ionicLoading.hide();
    var sum = 0;
    var valueList = [{
      vipValueName: '意向用户',
      vipValueId: 1,
      peopleNum: 0
    }, {
      vipValueName: '活跃用户',
      vipValueId: 2,
      peopleNum: 0
    }, {
      vipValueName: '沉睡用户',
      vipValueId: 3,
      peopleNum: 0
    }, {
      vipValueName: '流失用户',
      vipValueId: 4,
      peopleNum: 0
    }]

    if($scope.isCanyin){
      data.map(function (item,index) {
        if (item.vipValueId) {
          valueList[item.vipValueId - 1].peopleNum = item.peopleNum
        }
        sum += item.peopleNum * 1;
      })
      $scope.allNum = sum
      $scope.valueList = valueList
    }
  };
  $scope.getZSuccess = function (data) {
    console.log(data);
    $scope.ziyuan = data.notAllowVip;
    $scope.leiji = data.OperateVipCou;
    $scope.kaifa = data.wakeVipCou;
    $scope.leijiArr = data.operateVipInfo;
    $scope.kaifaArr = data.wakeVipInfo;
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  /*$scope.selectClass=function($event){
  var id=$event.target.getAttribute('data-vipValueId')*1;
  console.log(id);
  console.log($scope.customIdList.indexOf(id));
  $scope.cclass=$scope.customList[$scope.customIdList.indexOf(id)];
  if($scope.cclass.isNowSelect){
    $scope.cclass.isNowSelect=false;
    $scope.cclass.list=[];
  }else {
    $scope.cclass.isNowSelect = true;
    var data = {
      "id": id,
      "appUserId": $scope.appUserId,
      "businessId": $scope.businessId
    };
    $scope.showLoading();
    if ($scope.isCanyin){
      $httpCustom.customValueDetail(data, $scope.getCustomValueDetailSuccess, $scope.error);
    }else {
      $httpCustom.customValueYanDetail(data, $scope.getCustomValueDetailSuccess, $scope.error);
    }
  }
};*/
  /*$scope.getCustomValueDetailSuccess=function(data){
  $scope.cclass.list=data;
  $ionicLoading.hide();
};*/
  $scope.getCustomValueDetailSuccess = function (data) {
    $ionicLoading.hide();
    console.log(data);
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].colorId = i % 4;
    }
    if(!$scope.isCanyin){
      $scope.allNum = data.total
    }
    if($scope.page==1){
      $scope.customList = []
    }
    $scope.customList = $scope.customList.concat(data.list);
    $scope.canLoad = data.hasNextPage
    if($scope.canLoad){
      $scope.page++
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $ionicLoading.hide();
  };
  $scope.changeC = function () {
    $scope.isCanyin = true;
    $scope.isYanhui = false;
    localStorage['isYan'] = false;
    $scope.type = 'pu';
    $scope.qryType = 0;
    $scope.typeTxt = '我的';
    $scope.cType = 0;
    var valueData = {
      'businessId': $scope.businessId,
      'appUserId': $scope.appUserId,
      'type': 0,
      'qryType': $scope.qryType
    };
    $httpCustom.customValueList(valueData, $scope.getCustomValueListSuccess, $scope.error);
    $httpCustom.customSubValueList({
      'businessId': $scope.businessId,
      'appUserId': $scope.appUserId,
      'type': 1,
    }, $scope.getSubValueListSuccess, $scope.error);
  };
  $scope.changeY = function () {
    $scope.isCanyin = false;
    $scope.isYanhui = true;
    localStorage['isYan'] = true;
    $scope.type = 'yan';
    $scope.qryType = 1;
    $scope.typeTxt = '我的';
    $scope.cType = 0;
    var valueData = {
      'businessId': $scope.businessId,
      'appUserId': $scope.appUserId,
      'type': 0,
      'qryType': $scope.qryType
    };
    var data = {
      "appUserId": $scope.info.id,
      "businessId": $scope.info.businessId,
      'type': $scope.cType,
      'page': $scope.page,
      'rows': $scope.rows
    };
    $scope.customList = []
    $scope.page = 1
    $httpCustom.customValueList(valueData, $scope.getCustomValueListSuccess, $scope.error);
    $httpCustom.customValueYanDetailNew(data, $scope.getCustomValueDetailSuccess, $scope.error);
  };
  $scope.color = (function () {
    var a = Math.ceil(5 * Math.random());
    return a;
    switch (a) {
      case 1:
        return {"background-color": "#D76959"};
        break;
      case 2:
        return {"background-color": "#82C97C"};
        break;
      case 3:
        return {"background-color": "#76A6DF"};
        break;
      case 4:
        return {"background-color": "#E7B45F"};
        break;
      case 5:
        return {"background-color": "#5CBBA4"};
        break;
    }
  })();
  $scope.changeSubType = function () {
    $scope.showLoading()
    if ($scope.subTypeTxt == '我的') {
      $scope.subTypeTxt = '全店';
      $scope.subcType = 0;
      var data = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        'type': 0
      };
      $httpCustom.customSubValueList(data, $scope.getSubValueListSuccess, $scope.error);
    } else {
      $scope.subTypeTxt = '我的';
      $scope.subcType = 1;
      var data = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        'type': 1
      };
      $httpCustom.customSubValueList(data, $scope.getSubValueListSuccess, $scope.error);
    }
  }
  $scope.getSubValueListSuccess = function (data) {
    $ionicLoading.hide();
    $scope.subValueList = data
    var sum = 0
    data.map(function (item) {
      sum +=item.num
    })
    $scope.allSubNum = sum
  }
  $scope.changeType = function () {
    $scope.showLoading()
    $scope.customList = []
    $scope.page = 1
    if ($scope.typeTxt == '我的') {
      $scope.typeTxt = '全店';
      $scope.cType = 1;
      var valueData = {
        'businessId': $scope.businessId,
        'appUserId': $scope.appUserId,
        'type': 1,
        'qryType': $scope.qryType
      };
      var data = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        'type': $scope.cType,
        'page': $scope.page,
        'rows': $scope.rows
      };

      $scope.customList = []
      $scope.page = 1
      $httpCustom.customValueList(valueData, $scope.getCustomValueListSuccess, $scope.error);
      $httpCustom.customValueYanDetailNew(data, $scope.getCustomValueDetailSuccess, $scope.error);
    } else {
      $scope.typeTxt = '我的';
      $scope.cType = 0;
      var valueData = {
        'businessId': $scope.businessId,
        'appUserId': $scope.appUserId,
        'type': 0,
        'qryType': $scope.qryType
      };
      var data = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        'type': $scope.cType,
        'page': $scope.page,
        'rows': $scope.rows
      };

      $scope.customList = []
      $scope.page = 1
      $httpCustom.customValueList(valueData, $scope.getCustomValueListSuccess, $scope.error);
      $httpCustom.customValueYanDetailNew(data, $scope.getCustomValueDetailSuccess, $scope.error);
    }
  };
  $scope.goCustom = function (id, name,type) {
    if (type==='sub') {
      $state.go('myCustomValue', {'id': id, 'type': 2, 'name': name, 'qryType': $scope.subcType});
    } else {
      $state.go('myCustomValue', {'id': id, 'type': $scope.qryType, 'name': name, 'qryType': $scope.cType});
    }
  };
  $scope.goSource = function (num) {
    if (num == 1) {
      $state.go('myCustomSour', {type: 1});
    } else {
      $state.go('myCustomSour', {type: 2});
    }
  }

  $scope.doInfinite = function () {
    if ($scope.isYanhui) {
      $scope.showLoading();
      var data = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        'type': $scope.cType,
        'page': $scope.page,
        'rows': $scope.rows
      };
      $httpCustom.customValueYanDetailNew(data, $scope.getCustomValueDetailSuccess, $scope.error);
    }
  }
  $scope.goCunjiu = function(){
      sessionStorage['wineType'] = ''
      sessionStorage['wineTypeTxt'] = ''
      $state.go('myCustomCunjiu', {});
  }
})
