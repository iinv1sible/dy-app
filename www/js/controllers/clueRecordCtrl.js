angular.module('starter.controllers.clueRecordCtrl', []).controller('clueRecordCtrl', function ($scope, $http, $httpClue, $ionicPopup, $showAlert, $state, $stateParams,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.data.keyNo = $stateParams.keyNo;
    $scope.data.way = '电话';
    $scope.data.remindWay = '电话';
    $scope.data.record = null;
    $scope.data.recordTime = null;
    $scope.data.remindTime = null;
    $scope.data.appUserId = $scope.info.id;
    $scope.data.appUserName = $scope.info.surname;
    $scope.data.businessId = $scope.info.businessId;
    $scope.data.showTag = false;
    $scope.remindData = [
      {
        'remind': '邀约',
        'isCheck': false
      }, {
        'remind': '场地',
        'isCheck': false
      }, {
        'remind': '餐标',
        'isCheck': false
      }, {
        'remind': '菜品',
        'isCheck': false
      }, {
        'remind': '定金',
        'isCheck': false
      }, {
        'remind': '合同',
        'isCheck': false
      }, {
        'remind': '筹备',
        'isCheck': false
      }, {
        'remind': '回访',
        'isCheck': false
      }, {
        'remind': '周年提醒',
        'isCheck': false
      }
    ];
  });
  $scope.$watch('data.record', function (newValue,oldValue) {
    if(newValue.length>150){
      $scope.data.record = oldValue
    }
  }, true);
  $scope.saveRecord = function () {
    if ($scope.data.recordDate == null) {
      $showAlert.alert('请输入时间');
    } else if ($scope.data.showTag) {
      if ($scope.data.remindDate == null) {
        $showAlert.alert('请输入跟进时间');
      } else {
        $scope.data.remind = '';
        for (var i = 0; i < $scope.remindData.length; i++) {
          if ($scope.remindData[i].isCheck == true) {
            $scope.data.remind += $scope.remindData[i].remind + ',';
          }
        }
        $scope.data.remind = $scope.data.remind.substr(0, $scope.data.remind.length - 1);
        var Ttime = $scope.data.recordDate.getTime();
        $scope.data.recordTime = $scope.freshTime(Ttime) + ":00";
        $httpClue.saveRecord($scope.data, $scope.saveRecordSuccess);
        var Ttime1 = $scope.data.remindDate.getTime();
        $scope.data.remindTime = $scope.freshTime(Ttime1) + ":00";
        $httpClue.saveRemind($scope.data, $scope.saveRemindSuccess, $scope.error);
      }
    } else {
      var Ttime = $scope.data.recordDate.getTime();
      $scope.data.recordTime = $scope.freshTime(Ttime) + ":00";
      $httpClue.saveRecord($scope.data, $scope.saveRecordSuccess);
    }
  };
  $scope.saveRecordSuccess = function (data) {
    $scope.data.recordDate = null;
    if (data.msgCode == 0) {
      $scope.makeSure('新增成功');
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('新增失败');
      }
    }
  };
  $scope.error = function(data){
    if (data.msgCode == 0) {
      $scope.makeSure('新增成功');
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('新增失败');
      }
    }
  }
  $scope.saveRemindSuccess = function (data) {
    console.log(data);
  }
  $scope.changeMessage = function ($event) {
    var a = $event.target;
    $scope.data.way = a.getAttribute("data-id");
  };
  $scope.changeMessage1 = function ($event) {
    var a = $event.target;
    $scope.data.remindWay = a.getAttribute("data-id");
  };
  $scope.changeMessage2 = function (id, $event) {
    if ($scope.remindData[id].isCheck == true) {
      $scope.remindData[id].isCheck = false;
    } else {
      $scope.remindData[id].isCheck = true;
    }
  };
  $scope.makeSure = function (txt) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      title: $T.T('易订'),
      template: $T.T(txt),
      buttons: [
        {
          text: $T.T('确认'),
          type: 'button-assertive',
          onTap: function () {
            $state.go('clueDetail', {'keyNo': $scope.data.keyNo});
          }
        }
      ]
    });
  };
  //时间处理///////////////
  $scope.freshTime = function (time) {
    var date = new Date(time);
    var m = date.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    ;
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d
    }
    ;
    var h = date.getHours();
    if (h < 10) {
      h = "0" + h
    }
    ;
    var min = date.getMinutes();
    if (min < 10) {
      min = "0" + min
    }
    ;
    var dateString = date.getFullYear() + "-" + m + "-" + d + " " + h + ":" + min;
    return dateString;
  };
})