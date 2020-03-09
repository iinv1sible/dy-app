angular.module('starter.controllers.myCustomInfoCunjiuCtrl', []).controller('myCustomInfoCunjiuCtrl', function ($scope, $showAlert, $ionicLoading, $state, $stateParams, $T, $ionicHistory, $ionicPopup, ionicDatePicker, $httpCunjiu, $httpCustom) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.phone = $stateParams.phone || ''
    $scope.type3 = $stateParams.type3
    $scope.vipId = ''
    $scope.edit = false
    $scope.vipWines = []
    $scope.vipWinesCopy = []
    $scope.deleteWines = []
    $scope.data = {}
    $scope.data.remark = ''
    $scope.sendDate = ''
    $scope.isSend = false
    $scope.getWine()
  })
  $scope.getWine = function(){
    $httpCunjiu.getVipWines({
      businessId: $scope.info.businessId,
      phone: $scope.phone
    }, function(data){
      if(data.length>0){
        $scope.vipWines = data
        $scope.vipWinesCopy = data.concat()
        $scope.vipId = data[0].vipId
        $scope.getVipInfo()
      }else{
        $scope.vipWines = []
        $scope.vipWinesCopy = []
        $scope.isSend = false
      }
    }, $scope.error)
  }
  $scope.getVipInfo = function(){
    $httpCustom.customInfo($scope.vipId, function(data){
      $scope.data.remark = data.storeWineRemark
      if(data.storeWineSendTime){
        $scope.sendDate = data.storeWineSendTime
        $scope.isSend = true
      }
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
  $scope.goCunjiuLog = function(){
    $state.go('myCustomInfoCunjiuLog',{phone: $scope.phone});
  }
  $scope.showEdit = function(){
    $scope.deleteWines = []
    $scope.edit = true
  }
  $scope.cancel = function(){
    $scope.edit = false
    $scope.getWine()
  }
  $scope.submit = function(){
    var isNullName = false
    $scope.vipWines.map(function(item){
      if(!item.name){
        isNullName = true
      }
    })
    if(isNullName){
      $showAlert.alert('酒品名称不可为空');
      return false
    }
    if($scope.isSend && !$scope.sendDate){
      $showAlert.alert('发送日期不可为空');
      return false
    }
    if($scope.vipWines.length==0 && $scope.deleteWines==0){
      $showAlert.alert('请添加酒品');
      return false
    }
    if($scope.isSave){
      return false
    }
    $ionicLoading.show({
      template: '保存中'
    });
    if($scope.vipWines.length==0){
      $scope.isSend = false
      $scope.sendDate = ''
    }
    $scope.isSave = true
    $httpCunjiu.editWineInfo({
      phone: $scope.phone,
      businessId: $scope.info.businessId,
      data: $scope.vipWines,
      delete: $scope.deleteWines,
      operatorName: $scope.info.surname,
      userId: $scope.info.id,
      remark: $scope.data.remark,
      isSendSms: $scope.isSend?1:0,
      sendTime: $scope.sendDate
    }, function(data){
      $scope.isSave = false
      $ionicLoading.hide()
      if(data.code == 200){
        $showAlert.alert('保存成功');
        $scope.getWine()
        $scope.edit = false
      }else{
        $showAlert.alert(data.msg || '保存失败');
      }
    }, $scope.error)
  }
  
  $scope.cjjia = function (index) {
    $scope.vipWines[index].num += 1;
  };
  $scope.cjjian = function (index) {
    if ($scope.vipWines[index].num > 1) {
      $scope.vipWines[index].num -= 1;
    }else{
      if($scope.vipWines[index].id){
        $scope.deleteWines.push($scope.vipWines[index])
      }
      $scope.vipWines.splice(index, 1)
    }
  };
  $scope.addWine = function(){
    $scope.vipWines.push({
      name: '',
      num: 1,
      cmbh: ''
    })
  }
  $scope.changeSend = function(){
    $scope.isSend = !$scope.isSend
  }
  $scope.newIpObj = function () {
    var ipObj1 = {
      callback: function (date) {
        console.log(date);
        var a = new Date(date);
        var y = a.getFullYear();
        var m = a.getMonth() + 1;
        var d = a.getDate();
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        $scope.sendDate = y + '-' + m + '-' + d;
        $scope.isSend = true
      },
      from: new Date(new Date().setDate(new Date().getDate()+1)),
      inputDate: new Date(new Date().setDate(new Date().getDate()+1)),
      mondayFirst: false,
      closeOnSelect: true,
      templateType: 'popup',
      dateFormat: 'yyyy-MM-dd'
    };
    return ipObj1;
  };
  $scope.openDatePicker = function ($event) {
    $event.stopPropagation()
    var timePicker = $scope.newIpObj();
    ionicDatePicker.openDatePicker(timePicker);
  };
  $scope.showTips = function(){
    var html = `<div>1. ${$T.T('系统将会在设定日期的早上十点，向客户发送短信。')}</div>
                <div>2. ${$T.T('短信内容如下：【酒店名称】尊敬的顾客，您好，您在本酒店还有存酒，期待您前来就餐。')}</div>
                <div>3. ${$T.T('以下情况将不自动发送短信：')}</div>
                <div>${$T.T('3.1. 如果酒店短信余量不足，则不发送，并清除提醒任务。')}</div>
                <div>${$T.T('3.2. 如果发送时，该客户没有存酒信息，则不发送，并清除提醒任务。')}</div>`
    $ionicPopup.show({
      cssClass: "er-popup",
      template: html,
      title: $T.T('提示'),
      scope: $scope,
      buttons: [
        {text: $T.T('关闭'), type: 'button-assertive'}
      ]
    });
  }
  $scope.goback = function(){
    $ionicHistory.goBack();
  }
})
