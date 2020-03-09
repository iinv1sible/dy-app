angular.module('starter.controllers.accountMyCustomDetailCtrl', []).controller('AccountMyCustomDetailCtrl', function ($scope, $http, $httpCustom, $ionicPopover, $showAlert, $ionicLoading, $state, $stateParams, $ionicScrollDelegate, $T, $ionicPopup) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.type = $stateParams.type;
    $scope.all = $stateParams.all;
    $scope.data.search = '';
    $scope.isSelect = false;
    $scope.page = 1;
    $scope.canLoad = false;
    $scope.id = null;
    if ($scope.token == localStorage['TOKEN_KEY']) {
      console.log('不用刷新');
    } else {
      $scope.token = localStorage['TOKEN_KEY'];
      $scope.info = JSON.parse(localStorage['info']);
      $scope.businessId = $scope.info.businessId;
      $scope.appUserId = $scope.info.id;
      $scope.isCanyin = true;
      $scope.isYanhui = false;
      $scope.customList = [];
      $scope.customIdList = [];
      $scope.cclass = null;
      $scope.showLoading();
      $httpCustom.customList($scope.businessId, $scope.getCustomListSuccess, $scope.error);
    }
  });
  $scope.isSelect = false;
  $scope.data = {};
  $scope.select = [];
  $scope.token = '';
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.goInfo = function ($event) {
    var a = $event.target;
    var vipId = a.getAttribute('data-vipId');
    $state.go('myCustom-info', {'vipId': vipId});
  };
  $scope.getCustomListSuccess = function (data) {
    data.push({"vipClassId": 0, "vipClassName": "未分类"});
    for (var i = 0; i < data.length; i++) {
      data[i].isNowSelect = false;
      data[i].list = [];
      $scope.customIdList.push(data[i].vipClassId);
    }
    $scope.customList = data;
    $ionicLoading.hide();
    //console.log($scope.customIdList);
  };
  $scope.getCustomDetailSuccess = function (data) {
    console.log($scope.cclass.list);
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].colorId = i % 4;
      data.list[i].payfrequency = data.list[i].payfrequency?parseFloat(data.list[i].payfrequency).toFixed(2):'0'
    }
    $scope.cclass.list = $scope.cclass.list.concat(data.list);
    $scope.page++;
    $scope.canLoad = data.hasNextPage;
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $ionicLoading.hide();
  };
  $scope.selectCustomSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].payfrequency = data[i].payfrequency?parseFloat(data[i].payfrequency).toFixed(2):'0'
    }
    $scope.select = data;
    console.log(data);
  };
  $scope.selectError = function (data) {
    console.log(data.msgMessage);
    $scope.select = [];
    $ionicLoading.hide();
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
    $ionicLoading.hide();
  };
  $scope.bgColor = [
    {"background-color": "#D76959"},
    {"background-color": "#76A6DF"},
    {"background-color": "#E7B45F"},
    {"background-color": "#5CBBA4"}
  ];
  $scope.classMore = function () {
    $scope.cclass.isNowSelect = true;
    var data = {
      "id": $scope.id,
      "appUserId": $scope.appUserId,
      "businessId": $scope.businessId,
      "page": $scope.page,
      "rows": 20
    };
    $scope.showLoading();
    if ($scope.type == 'yan') {
      if ($scope.all == 1) {
        var dataAll = {
          "id": $scope.id,
          "appUserId": '',
          "businessId": $scope.businessId,
          "page": $scope.page,
          "rows": 20
        };
        $httpCustom.customDetailYan(dataAll, $scope.getCustomDetailSuccess, $scope.error);
      } else {
        $httpCustom.customDetailYan(data, $scope.getCustomDetailSuccess, $scope.error);
      }
    } else {
      if ($scope.all == 1) {
        var dataAll = {
          "id": $scope.id,
          "appUserId": '',
          "businessId": $scope.businessId,
          "page": $scope.page,
          "rows": 20
        };
        $httpCustom.customDetail(dataAll, $scope.getCustomDetailSuccess, $scope.error);
      } else {
        $httpCustom.customDetail(data, $scope.getCustomDetailSuccess, $scope.error);
      }
    }
  }
  $scope.selectClass = function ($event) {
    $scope.id = $event.target.getAttribute('data-vipClassId') * 1;
    $scope.cclass = $scope.customList[$scope.customIdList.indexOf($scope.id)];
    $scope.page = 1;
    if ($scope.cclass.isNowSelect) {
      $scope.cclass.isNowSelect = false;
      $scope.canLoad = false;
      $scope.cclass.list = [];
    } else {
      $scope.classMore();
    }
  };
  $scope.selectCustom = function () {
    console.log($scope.select);
    if ($scope.data.search != '') {
      $scope.isSelect = true;
    } else if ($scope.data.search == '') {
      $scope.isSelect = false;
    }
    ;
    if ($scope.data.search.length >= 1) {
      var type = 0;
      if ($scope.type == 'yan') {
        type = 1;
      } else {
        type = 0;
      }
      var all = 0;
      if ($scope.all == 1) {
        all = 1;
      } else {
        all = 0;
      }
      var selectData = {
        "appUserId": $scope.info.id,
        "businessId": $scope.info.businessId,
        "searchText": $scope.data.search,
        "type": type,
        "all": all
      };
      var reg = /^\d{1,3}$/;
      console.log($scope.data.search.length);
      if (($scope.data.search.length >= 4) && (!isNaN($scope.data.search * 1))) {
        $httpCustom.selectCustom(selectData, $scope.selectCustomSuccess, $scope.selectError);
      } else if ($scope.data.search.length > 0 && (isNaN($scope.data.search * 1))) {
        $httpCustom.selectCustom(selectData, $scope.selectCustomSuccess, $scope.selectError);
      } else {
        $scope.select = [];
      }
      ;
    } else {
      $scope.select = [];
    }
  };
  $scope.doInfinite = function () {
    $scope.classMore();
  };
  $scope.changeGender = function ($event) {
    var a = $event.target;
    var txt = a.nextElementSibling.getAttribute("data-id");
    console.log(txt);
    $scope.keData.sex = txt;
  };
  $scope.newVip = function () {
    $scope.keData = {};
    $scope.keData.sex = 1
    $scope.keData.appuseId = $scope.info.id
    $scope.keData.appuserName = $scope.info.surname
    $scope.keData.businessId = $scope.info.businessId
    var html = `<div>
                  <div class="row" style="padding:10px 0">
                    <label style="line-height:34px;margin-right:5px;">{{'手机号'|T}}</label>
                    <input class="col" type="tel" style="padding: 0;text-align:right" ng-model="keData.vipPhone" id="vipPhone" ng-change="select()" />
                  </div>
                  <div class="row" style="padding:10px 0">
                    <label style="line-height:34px;margin-right:5px;">{{'姓名'|T}}</label>
                    <input class="col" type="text" style="padding: 0;text-align:right" ng-model="keData.vipName" />
                  </div>
                  <div class="row" style="padding:10px 0">
                    <label>{{'性别'|T}}</label>
                    <div class="col" style="padding: 0;text-align: right;">
                      <a class="icon icon-check" ng-click="changeGender($event)" ng-class={'icon-check-r':keData.sex==1}></a><span class="span-black"  style="font-size: 14px;" data-id="1">{{'男士'|T}}</span>
                      <a class="icon icon-check" ng-click="changeGender($event)" ng-class={'icon-check-r':keData.sex==0}></a><span class="span-black" style="font-size: 14px;" data-id="0">{{'女士'|T}}</span>
                    </div>
                  </div>
                </div>`;
    var pop =  $ionicPopup.show({
      cssClass: "er-popup white-popup underPopover",
      template: html,
      title: $T.T('添加我的客户'),
      scope: $scope,
      buttons: [
        { text: $T.T('取消') },
        { text: $T.T('添加'),
          type: 'button-assertive',
          onTap: function () {
            var reg = /^\d+$/;
            if ((($scope.keData.vipPhone) && ($scope.keData.vipPhone.toString().length != 6) && ($scope.keData.vipPhone.toString().length != 11)) || (!$scope.keData.vipPhone)) {
              $showAlert.alert('请输入正确的手机号');
              pop.show()
            } else if (($scope.keData.vipPhone != '') && (reg.test($scope.keData.vipPhone) == false)) {
              $showAlert.alert('请输入正确的手机号');
              pop.show()
            } else if (!$scope.keData.vipName) {
              $showAlert.alert('请输入正确的客户姓名');
              pop.show()
            } else {
              $httpCustom.addCustom($scope.keData, function(data){
                if (data.msgCode == 0) {
                  $showAlert.alert('添加成功')
                  $httpCustom.customList($scope.businessId, $scope.getCustomListSuccess, $scope.error);
                } else {
                  $showAlert.alert('添加失败')
                }
              }, function(data) {
                if (data && data.msgMessage) {
                  $showAlert.alert(data.msgMessage)
                } else {
                  $showAlert.alert('连接失败，请检查网络');
                }
              })
            }
          }
        }
      ]
    });
  }
})