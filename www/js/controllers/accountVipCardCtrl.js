angular.module('starter.controllers.accountVipCardCtrl', []).controller('AccountVipCardCtrl', function ($scope, $httpPsd, $state, $showAlert, $ionicLoading, $T) {
  $scope.page = 'list'
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.showDetailItems = [];
    $scope.page = 'list'
    $scope.cardData = {};
    $scope.cardData.businessId = $scope.info.businessId;
    $scope.cardData.appUserId = $scope.info.id;
    $scope.cardData.beginTime = '2018-10-01';
    $scope.cardData.endTime = '2025-12-31';
    $scope.listData = [];
    $httpPsd.getVipCardList($scope.cardData,$scope.getVipCardListSuccess);

    // 短信预览
    $scope.peopleNum = 0;

    // 编辑短信
    $scope.default = '【易订】尊敬的客户，您好，您有一张'+ $scope.info.businessName +'的{优惠券名称}即将到期，有效日期至xxxx。';
    $scope.data = {};
    $scope.data.businessId = $scope.info.businessId;
    $scope.data.smscontent = '【易订】尊敬的客户，您好，您有一张'+ $scope.info.businessName +'的{优惠券名称}即将到期，有效日期至xxxx。';
  });
  $scope.showDetail = function (id) {
    if($scope.listData[id]){
      console.log($scope.listData[id].show);
      if($scope.listData[id].show != undefined && $scope.listData[id].show){
        $scope.listData[id].show = false;
      }else {
        $scope.listData[id].show = true;
      }
    }
    // for(var i = 0;i<$scope.listData.length;i++){
    //   if(i != id){
    //     $scope.listData[i].show = false;
    //   }
    // }
  };
  $scope.getVipCardListSuccess = function (data) {
    if (data.code == 200 && data.data){
      console.log(data.data.cardList);
      $scope.listData = data.data.cardList;
    }
  };
  $scope.selectAll = function ($event) {
    var checked = $event.currentTarget.children[0].checked;
    var a = $event.currentTarget.parentElement.parentElement.children;
    // $('#cardContent').find('input').prop('checked', false);
    if (checked) {
      for(var i = 0; i < a.length; i++){
        $(a[i]).find('input').prop('checked', true);
      }
    } else {
      for(var i = 0; i < a.length; i++){
        $(a[i]).find('input').prop('checked', false);
      }
    }
    var items = $('#cardContent input.checkItem[type=checkbox]:checked')
    $scope.peopleNum = items.length;
  }
  $scope.select = function (code,$event) {
    var checked = $event.currentTarget.children[0].checked;
    var a = $event.currentTarget.parentElement.parentElement.children[0];
    // $('#cardContent').find('input').prop('checked', false);
    // console.log(checked);
    if (!checked) {
      $(a).find('input').prop('checked', false);
    }
    // else {
    //   $('#'+code).prop('checked', true);
    // }
    var items = $('#cardContent input.checkItem[type=checkbox]:checked')
    $scope.peopleNum = items.length;
  }
  $scope.preview = function () {
    var items = $('#cardContent input.checkItem[type=checkbox]:checked')
    $scope.peopleNum = items.length;
    $scope.goPreview();
  }
  $scope.send = function () {
    var items = $('#cardContent input.checkItem[type=checkbox]:checked');
    $scope.data.cardList = [];
    if (items.length == 0) {
      $showAlert.alert('请选择至少一位客户')
      return;
    }else {
      for(var i = 0; i < items.length; i++){
        var cardTitle = items[i].getAttribute("data-cardTitle");
        var phone = items[i].getAttribute("data-phone");
        // var phone = "13777575146";
        var date = items[i].getAttribute("data-date");
        var cardData = {};
        cardData.smscontent = $scope.data.smscontent.replace("{优惠券名称}",cardTitle).replace("xxxx",date);
        cardData.vipPhone = phone;
        $scope.data.cardList.push(cardData);
      }
      console.log($scope.data);
      $scope.showLoading();
      $httpPsd.sendJkSms($scope.data,$scope.sendJkSmsSuccess);
    }
  };
  $scope.sendJkSmsSuccess = function(data){
    $ionicLoading.hide();
    $showAlert.alert(data.msgMessage);
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.edit = function () {
    $scope.page = 'edit';
  }
  $scope.$watch('data.smscontent', function (newValue, oldValue) {
    if (newValue.indexOf($scope.default) < 0) {
      $scope.data.smscontent = oldValue;
    }
  })
  $scope.save = function () {
    // $scope.default = $scope.data.smscontent;
    $scope.goPreview();
  }
  $scope.goList = function () {
    $scope.page = 'list';
  }
  $scope.goPreview = function () {
    $scope.page = 'preview';
  }
})
