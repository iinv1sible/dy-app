angular.module('starter.controllers.myCustomCunjiuCtrl', []).controller('myCustomCunjiuCtrl', function ($scope, $showAlert, $ionicLoading, $state, $ionicHistory, $httpCunjiu, $httpPsd, $ionicPopup, $ionicPopover, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.type = sessionStorage['wineType'] || 2
    $scope.typeTxt = sessionStorage['wineTypeTxt'] || '我的客户'
    $scope.getList()
  })
  $scope.$on('$ionicView.enter', function () {
    var template = `<ion-popover-view style="width:150px;height:160px">
                      <ion-content style="background-color: transparent;">
                        <div class="list">
                          <a class="item text-center" style="border-top:0" ng-click="changeType($event)" data-id="1">全部客户</a>
                          <a class="item text-center" style="border-top:0" ng-click="changeType($event)" data-id="2">我的客户</a>
                          <a class="item text-center" style="border-top:0" ng-click="changeType($event)" data-id="3">公共客户</a>
                        </div>
                      </ion-content>
                    </ion-popover-view>`;
    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });
    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    $scope.changeType = function ($event) {
      $scope.closePopover();
      $scope.type = $event.target.getAttribute("data-id");
      $scope.typeTxt = $event.target.innerHTML
      sessionStorage['wineType'] = $scope.type
      sessionStorage['wineTypeTxt'] = $scope.typeTxt
      $scope.getList()
    };
  })
  $scope.getList = function () {
    $scope.customerList = []
    $ionicLoading.show({
      template: '加载中...'
    });
    $httpCunjiu.getWineVip({
      businessId: $scope.info.businessId,
      type: $scope.type
    }, function(data){
      $ionicLoading.hide()
      $scope.customerList = data
    }, $scope.error)
  }
  $scope.error = function (data) {
    $scope.isSave = false
    $ionicLoading.hide()
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
  $scope.showTask = function ($event, date) {
    $event.stopPropagation()
    var html = `<div style="text-align:center">${$T.T('客户将在')}</div>
                <div style="text-align:center">${$T.T(`${$scope.freshTime(date)} 上午10:00`)}</div>
                <div style="text-align:center">${$T.T('收到取酒提醒短信')}</div>`
    $ionicPopup.show({
      cssClass: "er-popup",
      template: html,
      title: $T.T('提示'),
      scope: $scope,
      buttons: [
        {text: $T.T('关闭'), type: 'button-assertive'}
      ]
    })
  }
  $scope.freshTime = function (date) {
    var a = new Date(date);
    console.log(a)
    var m = a.getMonth() + 1
    var d = a.getDate()
    var dateString = a.getFullYear() + "年" + m + "月" + d + "日";
    return dateString;
  };
  $scope.goInfo = function (vipId) {
    $state.go('myCustom-info', {'vipId': vipId});
  };
  $scope.goCunjiuLog = function(){
    $state.go('myCustomInfoCunjiuLog');
  }
  $scope.goback = function(){
    $ionicHistory.goBack();
  }
  $scope.changeGender = function ($event) {
    var a = $event.target;
    var txt = a.nextElementSibling.getAttribute("data-id");
    if (txt == '男士') {
      $scope.wineVip.vipSex = '男';
    } else if (txt == '女士') {
      $scope.wineVip.vipSex = '女';
    }
  };
  $scope.select = function () {
    $scope.wineVip.vipPhone = $scope.wineVip.vipPhone.trim();
    if ($scope.wineVip.vipPhone.length > 11) {
      var reg = /[^0-9]/g;
      console.log('我来了');
      $scope.wineVip.vipPhone = $scope.wineVip.vipPhone.replace(reg, '');
      if ($scope.wineVip.vipPhone[0] == 8) {
        console.log(1);
        $scope.wineVip.vipPhone = $scope.wineVip.vipPhone.slice(2);
      }
    }
    if ($scope.wineVip.vipPhone && $scope.wineVip.vipPhone.toString().length >= 4) {
      var mohuData = {
        "appUserId": $scope.info.id,
        "vipPhone": $scope.wineVip.vipPhone,
        'businessId': $scope.info.businessId,
        'date': new Date().getTime()
      };
      console.log(mohuData);
      $httpPsd.mohuSelect(mohuData, $scope.selectSuccess, $scope.selectError);
    } else {
      if ($scope.closePopover1) {
        $scope.popover1.hide();
      }
    }
  }
  $scope.selectSuccess = function (data) {
    if ($scope.closePopover1) {
      $scope.popover1.hide();
    }
    if ((data.length > 0) && (data instanceof Array)) {
      var mohuLength = data.length > 5 ? 265 : data.length * 53;
      $scope.mohu = data
      var template1 = `<ion-popover-view class="mohuPopover" style="height:${mohuLength}px;width:290px;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item" ng-repeat="person in mohu track by $index" ng-click="mohuCheck($event)" data-vipPhone={{person.vipPhone}} data-vipName={{person.vipName}} data-vipSex={{person.vipSex}}>
                       {{person.vipPhone}}
                       {{person.vipName}}
                     </a>
                   </div>
                 </ion-content>
               </ion-popover-view>`;
      $scope.popover1 = $ionicPopover.fromTemplate(template1, {
        scope: $scope
      });
      $scope.openPopover1 = function ($event) {
        $scope.popover1.show($event);
      };
      $scope.closePopover1 = function () {
        $scope.popover1.hide();
      };
      var input = document.getElementById('vipPhone');
      $scope.openPopover1(input);
      $('.mohuPopover').parent().parent().css({'z-index': '13'})
    }
  };
  $scope.mohuCheck = function($event){
    var a = $event.target;
    $scope.wineVip.vipPhone = a.getAttribute('data-vipPhone');
    $scope.wineVip.vipName = a.getAttribute('data-vipName');
    $scope.wineVip.vipSex = a.getAttribute('data-vipSex');
    $scope.popover1.hide();
    $('body').removeClass('popover-open')
  }
  $scope.addWineVip = function ($event) {
    $event.stopPropagation();
    $scope.wineVip = {};
    $scope.wineVip.vipSex='男'
    var html = `<div>
                  <div class="row" style="padding:10px 0">
                    <label style="line-height:34px;margin-right:5px;">{{'电话'|T}}</label>
                    <input class="col" type="tel" style="padding: 0;text-align:right" ng-model="wineVip.vipPhone" id="vipPhone" ng-change="select()" />
                  </div>
                  <div class="row" style="padding:10px 0">
                    <label style="line-height:34px;margin-right:5px;">{{'姓名'|T}}</label>
                    <input class="col" type="text" style="padding: 0;text-align:right" ng-model="wineVip.vipName" />
                  </div>
                  <div class="row" style="padding:10px 0">
                    <label>{{'性别'|T}}</label>
                    <div class="col" style="padding: 0;text-align: right;">
                      <a class="icon icon-check" ng-click="changeGender($event)" ng-class={'icon-check-r':wineVip.vipSex=='男'}></a><span class="span-black"  style="font-size: 14px;" data-id="男士">{{'男士'|T}}</span>
                      <a class="icon icon-check" ng-click="changeGender($event)" ng-class={'icon-check-r':wineVip.vipSex=='女'}></a><span class="span-black" style="font-size: 14px;" data-id="女士">{{'女士'|T}}</span>
                    </div>
                  </div>
                </div>`;
    var popup = $ionicPopup.show({
      cssClass: "er-popup white-popup underPopover",
      template: html,
      title: $T.T('存酒客户信息'),
      scope: $scope,
      buttons: [
        { text: $T.T('取消') },
        { text: $T.T('保存'), 
          type: 'button-assertive',
          onTap: function () {
            if(!$scope.wineVip.vipPhone || !$scope.wineVip.vipName){
              $showAlert.alert('手机号姓名不可为空');
              popup.show()
              return false
            }
            if($scope.wineVip.vipPhone.length!=11){
              $showAlert.alert('手机号格式不正确');
              popup.show()
              return false
            }
            if($scope.isSave){
              return false
            }
            $ionicLoading.show({
              template: '保存中'
            });
            $scope.isSave = true
            $httpCunjiu.addWineVip({
              businessId: $scope.info.businessId,
              vipName: $scope.wineVip.vipName,
              vipPhone: $scope.wineVip.vipPhone,
              vipSex: $scope.wineVip.vipSex,
            }, function(data){
              $scope.isSave = false
              $ionicLoading.hide()
              $('body').removeClass('popover-open')
              if(data.code == 200 || data.code == 500){
                $state.go('myCustomInfoCunjiu', {phone: $scope.wineVip.vipPhone});
              }else{
                $showAlert.alert(data.msg || '新增失败');
                popup.show()
              }
            }, $scope.error)
          }
        }
      ]
    });
  };
})
