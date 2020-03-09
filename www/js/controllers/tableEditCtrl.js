angular.module('starter.controllers.tableEditCtrl', []).controller('tableEditCtrl', function ($scope, $http, $httpPsd, $httpClue, $ionicPopup, $ionicPopover, $showAlert, $state, $stateParams, $ionicLoading, $qupload, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.tableData = {
      'businessId': $scope.info.businessId,
      'tableId': $stateParams.tableId
    };
    $scope.data = {};
    $scope.data = $stateParams;
    if($scope.data.minAmount == '无'){
      $scope.data.minAmount = '';
    }
    if($scope.data.maxPeopleNum == '无'){
      $scope.data.maxPeopleNum = '';
    }
    if($scope.data.tableRemark == '无'){
      $scope.data.tableRemark = '';
    }
    $scope.takePicData = {'scope': 'yiding'};
    $httpPsd.takePic($scope.takePicData, $scope.takePicSuccess, $scope.error);
  })
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
      // $scope.data.tableUrl = 'http://qiniu1.zhidianfan.com/' + response.hash + '?imageMogr2/auto-orient/thumbnail/600x/blur/1x0/quality/75|watermark/1/image/aHR0cDovL3d3dy56aGlkaWFuZmFuLmNvbS9pbWFnZXMvTE9HTy5wbmc=/dissolve/100/gravity/NorthWest/dx/10/dy/10|imageslim';
      $scope.data.tableUrl = 'http://qiniuyun8.zhidianfan.com/' + response.hash + '?small';
      $ionicLoading.hide();
      // $httpOrder.changeVipPic($scope.changePicData, $scope.changePicSuccess, $scope.error);
    }, function (response) {
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
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.chooseDevice = function(){
    $scope.device = [];
    $scope.device[0] = {'name':'独卫','active':false};
    $scope.device[1] = {'name':'电视','active':false};
    $scope.device[2] = {'name':'沙发','active':false};
    $scope.device[3] = {'name':'可做试衣间','active':false};
    if($scope.data.isYan){
      $scope.device[4] = {'name':'led','active':false};
      $scope.device[5] = {'name':'灯光','active':false};
      $scope.device[6] = {'name':'T台','active':false};
    }
    $scope.data.deviceList = $scope.data.device.split('、');
    for (var a = 0; a < $scope.device.length; a++) {
      for (var b = 0; b < $scope.data.deviceList.length; b++) {
        if ($scope.device[a].name == $scope.data.deviceList[b]) {
          $scope.device[a].active = true;
        }
      }
    }
    var html = '<a class="button button-balanced button-small button-outline custom-info-tag-a" ng-class="{\'active\':value.active}" ng-repeat="value in device track by $index" style="margin-bottom: 3px;" ng-click="active($event)">{{value.name}}</a>';
    $scope.myPopup = $ionicPopup.show({
      cssClass: "er-popup",
      template: html,
      title: '请选择台位属性',
      scope: $scope,
      buttons: [
        {text: '取消'},
        {
          text: '<b>确认</b>',
          type: 'button-assertive',
          onTap: function () {
            var tags = document.getElementsByClassName('custom-info-tag-a active');
            $scope.data.device = '';
            for (var i = 0; i < tags.length; i++) {
              $scope.data.device += tags[i].innerHTML + '、';
            }
            $scope.data.device = $scope.data.device.substr(0,$scope.data.device.length-1);
          }
        }
      ]
    });
  };
  $scope.active = function ($event) {
    var btn = $event.target;
    if (btn.classList.contains("active")) {
      btn.className = "button button-balanced button-small button-outline custom-info-tag-a";
    } else {
      btn.className += " active";
    }
  };
  $scope.tTypeList = [];
  $scope.tTypeList[0] = {'id':0,'name':'包厢'};
  $scope.tTypeList[1] = {'id':1,'name':'散台'};
  $scope.tTypeList[2] = {'id':2,'name':'卡座'};
  var template = `<ion-popover-view class="right-popover" style="width:150px;height:160px;">
                 <ion-content style="background-color: transparent;">
                   <div class="list">
                     <a class="item text-center" ng-repeat="types in tTypeList" ng-click="changeType($event)" data-id={{types.id}}>{{types.name}}</a>
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
    var a = $event.target;
    var txt = a.innerHTML;
    $scope.closePopover();
    $scope.data.tType = txt;
    $scope.data.tTypeId = a.getAttribute('data-id');
    console.log($scope.data);
  };
  $scope.saveAll = function(){
    var reg = /^\d+$/;
    if ($scope.data.tableName == '') {
      $showAlert.alert('台位名称不能为空');
      return;
    }
    if (($scope.data.minAmount != '') && ($scope.data.minAmount != '无') && (reg.test($scope.data.minAmount) == false)) {
      $showAlert.alert('最低消费应为数字');
      return;
    }
    if (($scope.data.maxPeopleNum != '') && ($scope.data.maxPeopleNum != '无') && (reg.test($scope.data.maxPeopleNum) == false)) {
      $showAlert.alert('容纳人数应为数字');
      return;
    }
    if (($scope.data.maxTableNum != '') && ($scope.data.maxTableNum != '无') && (reg.test($scope.data.maxTableNum) == false)) {
      $showAlert.alert('最大桌数应为正整数');
      return;
    }
    if($scope.data.device.indexOf('独卫') != -1){
      $scope.data.washroom = 1;
    }else{
      $scope.data.washroom = 0;
    }
    if($scope.data.device.indexOf('沙发') != -1){
      $scope.data.sofa = 1;
    }else{
      $scope.data.sofa = 0;
    }
    if($scope.data.device.indexOf('电视') != -1){
      $scope.data.television = 1;
    }else{
      $scope.data.television = 0;
    }
    if($scope.data.device.indexOf('led') != -1){
      $scope.data.led = 1;
    }else{
      $scope.data.led = 0;
    }
    if($scope.data.device.indexOf('灯光') != -1){
      $scope.data.light = 1;
    }else{
      $scope.data.light = 0;
    }
    if($scope.data.device.indexOf('T台') != -1){
      $scope.data.catwalk = 1;
    }else{
      $scope.data.catwalk = 0;
    }
    if($scope.data.device.indexOf('可做试衣间') != -1){
      $scope.data.isLockerRoom = 1;
    }else{
      $scope.data.isLockerRoom = 0;
    }
    if($scope.data.minAmount == '无'){
      $scope.data.minAmount = '';
    }
    if($scope.data.maxPeopleNum == '无'){
      $scope.data.maxPeopleNum = '';
    }
    if($scope.data.tableRemark == '无'){
      $scope.data.tableRemark = '';
    }
    if($scope.data.maxTableNum == '无'||$scope.data.maxTableNum == ''){
      $scope.data.maxTableNum = 1;
    }
    if($scope.data.tableUrl == 'images/img_nopic@3x.png'){
      $scope.data.tableUrl = '';
   }
    console.log($scope.data);
    $httpPsd.updateTable($scope.data,$scope.updateTableSuccess,$scope.error);
  };
  $scope.updateTableSuccess = function(data){
    if (data.msgCode == 0) {
      $showAlert.alert(data.msgMessage);
    } else {
      if (data.msgCode == 1) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('保存桌位信息失败');
      }
    }
  };
  $scope.error = function (data) {
    $ionicLoading.hide();
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('连接失败，请检查网络');
    }
  };
})