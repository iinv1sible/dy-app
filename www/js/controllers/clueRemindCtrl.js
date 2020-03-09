angular.module('starter.controllers.clueRemindCtrl', []).controller('clueRemindCtrl', function ($scope, $http, $httpClue, $ionicPopup, $showAlert, $state, $stateParams,$T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data = {};
    $scope.data.keyNo = $stateParams.keyNo;
    $scope.type = $stateParams.type;
    $scope.data.remindId = $stateParams.remindId;
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
    if ($scope.type == 1) {
      $scope.showState = false;
      $scope.content = '保存';
      $scope.data.way = '电话';
    } else if ($scope.type == 2) {
      $scope.showState = true;
      $scope.content = '编辑';
      $httpClue.getRemindDetail($scope.data, $scope.getRemindDetailSuccess);
    }
    $scope.data.remind = null;
    $scope.data.remindTime = null;
    $scope.data.appUserId = $scope.info.id;
    $scope.data.appUserName = $scope.info.surname;
    $scope.data.businessId = $scope.info.businessId;
  });
  $scope.saveRemind = function () {
    var wayString = '电话微信面谈';
    if ($scope.type == 2 && $scope.showState == true) {
      $scope.content = '保存';
      $scope.showState = false;
    } else if ($scope.type == 2 && $scope.showState == false) {
      $scope.data.remind = '';
      for (var i = 0; i < $scope.remindData.length; i++) {
        if ($scope.remindData[i].isCheck == true) {
          $scope.data.remind += $scope.remindData[i].remind + ',';
        }
      }
      $scope.data.remind = $scope.data.remind.substr(0, $scope.data.remind.length - 1);
      if ($scope.data.remindDate == null) {
        $showAlert.alert('请输入时间');
      } else {
        var Ttime = $scope.data.remindDate.getTime();
        $scope.data.remindTime = $scope.freshTime(Ttime) + ":00";
        console.log($scope.data);
        $httpClue.updateRemind($scope.data, $scope.updateRemindSuccess);
      }
    } else if ($scope.type == 1) {
      $scope.data.remind = '';
      for (var i = 0; i < $scope.remindData.length; i++) {
        if ($scope.remindData[i].isCheck == true) {
          $scope.data.remind += $scope.remindData[i].remind + ',';
        }
      }
      $scope.data.remind = $scope.data.remind.substr(0, $scope.data.remind.length - 1);
      if ($scope.data.remindDate == null) {
        $showAlert.alert('请输入时间');
      } else {
        var Ttime = $scope.data.remindDate.getTime();
        $scope.data.remindTime = $scope.freshTime(Ttime) + ":00";
        $httpClue.saveRemind($scope.data, $scope.saveRemindSuccess, $scope.error);
      }
    }
  };
  $scope.changeMessage = function ($event) {
    var a = $event.target;
    $scope.data.way = a.getAttribute('data-id');
  };
  $scope.changeMessageNew = function (id, $event) {
    // var a = $event.target
    if ($scope.remindData[id].isCheck == true) {
      $scope.remindData[id].isCheck = false;
    } else {
      $scope.remindData[id].isCheck = true;
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
  $scope.updateRemindSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.makeSure('修改成功');
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('修改失败');
      }
    }
  };
  $scope.getRemindDetailSuccess = function (data) {
    if (data != null) {
      $scope.data = data;
      $scope.data.remindDate = new Date(data.remindTime.replace(/\-/g, "/"));
      var i = 0;
      if ($scope.data.way == '电话') {
        i = 0;
      } else if ($scope.data.way == '微信') {
        i = 1;
      } else if ($scope.data.way == '面谈') {
        i = 2;
      }
      var remindList = $scope.data.remind.split(',');
      for (var k = 0; k < remindList.length; k++) {
        for (var l = 0; l < $scope.remindData.length; l++) {
          if (remindList[k] == $scope.remindData[l].remind) {
            $scope.remindData[l].isCheck = true;
          }
        }
      }
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
            if ($scope.data.keyNo.indexOf('pc') < 0) {
              $state.go('clueDetail', {'keyNo': $scope.data.keyNo});
            } else {
              $state.go('myOrder-yDetail', {
                'resvOrder': $stateParams.resvOrder,
                'batchNo': $scope.data.keyNo,
                'type': 2,
                goBack: true
              });
            }
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