angular.module('starter.controllers.clueDetailCtrl', []).controller('clueDetailCtrl', function ($scope, $ionicHistory, $httpClue, $ionicPopup, $ionicLoading, $ionicPopover, $ionicPopup, $showAlert, $state, $stateParams, $http, $httpPsd, $operation, $httpOrder, $log, $qupload, $ionicScrollDelegate, $ionicLoading, $cordovaContacts, ContactManager, $window, $location, $rootScope, $anchorScroll, $calendar, $calendarY, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.login = {}
    $scope.login.username = ''
    $scope.login.password = ''
    $scope.data = {};
    if($location.$$search.keyNo){
      $scope.data.keyNo = $stateParams.keyNo = $location.$$search.keyNo
      $scope.isFromWechat = true
      $httpPsd.getUserNameAndPwd({
        appUserId: $location.$$search.appUserId
      }, function(data){
        if(data){
          $scope.login.username = data.appUserPhone;
          $scope.login.password = data.appUserPassword;
          // 登录系统
          $httpPsd.login($scope.login, function(data){
            console.log(data);
            localStorage.setItem('info', JSON.stringify(data));
            $scope.info = JSON.parse(localStorage['info']);
            $scope.data.businessId = $scope.info.businessId;
            $httpPsd.getYArea($scope.info, function(data){
              sessionStorage['userList'] = JSON.stringify(data.appUserList);
              sessionStorage['YresvOrderTypes'] = JSON.stringify(data.resvOrderTypes);
              $scope.resvOrderTypes = JSON.parse(sessionStorage['YresvOrderTypes']);
              $scope.userList = JSON.parse(sessionStorage['userList']);
              $httpClue.getClueDetail($scope.data, $scope.getClueDateilSuccess);
              $httpClue.getRecord($scope.data, $scope.getRecordSuccess);
              $httpClue.getRemind($scope.data, $scope.getRemindSuccess);
              $httpClue.getSource($scope.data, $scope.getSourceSuccess);
            });
          }, function(err){
            $showAlert.alert('获取用户信息失败');
          });
        }else{
          $showAlert.alert('网络错误');
        }
      }, function(){
        $showAlert.alert('网络错误');
      })
      return
    }
    $scope.info = JSON.parse(localStorage['info']);
    $scope.userList = JSON.parse(sessionStorage['userList']);
    $scope.data.businessId = $scope.info.businessId;
    $scope.data.keyNo = $stateParams.keyNo;
    if ($stateParams.type == null) {
      $scope.type = false;
    } else {
      $scope.type = true;
    }
    $httpClue.getClueDetail($scope.data, $scope.getClueDateilSuccess);
    $httpClue.getRecord($scope.data, $scope.getRecordSuccess);
    $httpClue.getRemind($scope.data, $scope.getRemindSuccess);
    $httpClue.getSource($scope.data, $scope.getSourceSuccess);
    $scope.resvOrderTypes = JSON.parse(sessionStorage['YresvOrderTypes']);
    $scope.businessId = $scope.info.businessId;
    $scope.mealTypes = sessionStorage['mealYTypes'] ? JSON.parse(sessionStorage['mealYTypes']) : [];
    // $scope.data.man = true;
    // $scope.data.ytype = '婚宴预订';
    // $scope.data.resvMeetingOrderType = 1;
    // $scope.data.mealTypeName = JSON.parse(sessionStorage['mealYTypes'])[0].mealTypeName;
    // $scope.data.mealTypeId = JSON.parse(sessionStorage['mealYTypes'])[0].id;
    // $scope.data.contractUrl = 'img/hetongPic.png';
    // // $scope.data.resvDate = $stateParams.date;
    // // $scope.data.mealTypeId = $stateParams.ytypeid;
    // // $scope.data.mealTypeName = $stateParams.ytype.trim();
    // $scope.data.status = 1;
    // $scope.data.resvTableNum = '';
    // $scope.data.resvAmount = '';
    // $scope.data.vipStatus = '';
    // $scope.data.resvSource = '';
    // $scope.data.source = 1;
    // $scope.data.statusName = '线索阶段';
    // $scope.data.backupTableNum = '';
    // $scope.data.businessId = $scope.info.businessId;
    // $scope.data.businessName = $scope.info.businessName;
    // $scope.data.appUserId = $scope.info.id;
    // $scope.data.appUserPhone = $scope.info.username;
    // $scope.data.appUserName = $scope.info.surname;
    $scope.showDate = new Date().getTime();
    $scope.dateString = freshTime();
    // $scope.data.resvDate = $scope.dateString;
    $scope.calender = false;
    $scope.todayTime = new Date();
    $scope.dateYear = $scope.todayTime.getFullYear();
    $scope.dateMonth = $scope.todayTime.getMonth();
    $scope.content = '编辑';
    $scope.sourceShow = true;
    $scope.sourceShow1 = true;
    //宴会详情/////////////////////////////////////////////////////////
    $scope.data.remark = '';
    /////////////////////////////////////////////////////////////////////
    var type = `<ion-popover-view class="right-popover" style="width:150px;height:212px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-repeat="types in resvOrderTypes" ng-click="changeType($event)" data-id={{types.id}}>{{types.name}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
    var meal = `<ion-popover-view class="right-popover" style="width:150px;height:108px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-repeat="meals in mealTypes" ng-click="changeMeal($event)" data-id={{meals.id}}>{{meals.mealTypeName}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
    var others = `<ion-popover-view style="width:150px;height:212px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-click="goRemind()">{{'跟进提醒'|T}}</a>
                      <a class="item text-center" ng-click="goRecord()">{{'写跟进'|T}}</a>
                      <a class="item text-center" ng-click="putTrash($event)" ng-if="data.isBack==1">{{'转为无效'|T}}</a>
                      <a class="item text-center" ng-click="recover()" ng-if="data.isBack==0">{{'转为有效'|T}}</a>
                      <a class="item text-center" ng-click="assign()">{{'指派他人'|T}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
    $scope.popoverType = $ionicPopover.fromTemplate(type, {
      scope: $scope
    });
    $scope.openPopoverType = function ($event) {
      if ($scope.showState == false) {
        $scope.popoverType.show($event);
      }
    };
    $scope.closePopoverType = function () {
      $scope.popoverType.hide();
    };
    $scope.othersPop = $ionicPopover.fromTemplate(others, {
      scope: $scope
    });
    $scope.openOthers = function ($event) {
      $scope.othersPop.show($event);
    }
    $scope.closeOthers = function () {
      $scope.othersPop.hide();
    };
    $scope.changeType = function ($event) {
      var a = $event.target;
      var txt = a.innerHTML;
      $scope.closePopoverType();
      $scope.data.ytype = txt;
      $scope.data.resvMeetingOrderType = a.getAttribute('data-id');
    };
    $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
      scope: $scope
    });
    $scope.openPopoverMeal = function ($event) {
      if ($scope.showState == false) {
        $scope.popoverMeal.show($event);
      }
    };
    $scope.closePopoverMeal = function () {
      $scope.popoverMeal.hide();
    };
    $scope.changeMeal = function ($event) {
      var a = $event.target;
      var txt = a.innerHTML;
      $scope.closePopoverMeal();
      $scope.data.mealTypeName = txt;
      $scope.data.mealTypeId = a.getAttribute('data-id');
    };
  })
  var people = `<ion-popover-view class="right-popover" style="width:200px;max-height:240px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-repeat="people in userList" ng-click="changePeople($event)" data-phone={{people.appUserPhone}} data-name={{people.appUserName}} data-id={{people.id}}>
                      {{people.appUserName}} {{people.appUserPhone}}
                      </a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
  $scope.popoverPeople = $ionicPopover.fromTemplate(people, {
    scope: $scope
  });
  $scope.openPopoverPeople = function ($event) {
    $scope.popoverPeople.show($event);
  };
  $scope.closePopoverPeople = function () {
    $scope.popoverPeople.hide();
  };
  $scope.changePeople = function ($event) {
    var a = $event.target;
    var txt = a.innerHTML;
    $scope.closePopoverPeople();
    // $scope.data.ytype = txt;
    $scope.data.workerName = a.getAttribute('data-name');
    $scope.data.workerPhone = a.getAttribute('data-phone');
    // $scope.data.resvMeetingOrderType = a.getAttribute('data-id');
  };
  $scope.$watch(['data'], function () {
    console.log(111);
  }, true);

  var sexTemp = `<ion-popover-view class="right-popover" style="width:150px;height:106px">
      <ion-content style="background-color: transparent;">
        <div class="list">
          <a class="item text-center" ng-click="changeGender($event)" data-id="男士">{{'男士'|T}}</a>
          <a class="item text-center" ng-click="changeGender($event)" data-id="女士">{{'女士'|T}}</a>
        </div>
      </ion-content>
    </ion-popover-view>`;
  $scope.sexPop = $ionicPopover.fromTemplate(sexTemp, {
    scope: $scope
  });
  $scope.openPopoverSex = function ($event) {
    $scope.sexPop.show($event);
  };
  $scope.closePopoverSex = function () {
    $scope.sexPop.hide();
  };
  $scope.changeGender = function ($event) {
    if ($scope.showState == false) {
      var a = $event.target;
      var txt = a.getAttribute("data-id");
      if (txt == '男士') {
        $scope.data.man = true;
      } else if (txt == '女士') {
        $scope.data.man = false;
      }
    }
  };
  $scope.edit1 = function (remindId) {
    $state.go('clueRemind', {'keyNo': $scope.data.keyNo, 'type': 2, 'remindId': remindId});
  };
  $scope.delete = function (remindId) {
    $scope.data.remindId = remindId;
    $httpClue.deleteRemind($scope.data, $scope.deleteRemindSuccess);
  };
  $scope.recover = function () {
    $scope.data.businessId = $scope.info.businessId;
    $httpClue.recoverClue($scope.data, $scope.recoverClueSuccess);
  };
  $scope.assign = function () {
    $scope.closeOthers();
    $state.go('clueMarketerList', {
      'keyNo': $scope.data.keyNo,
      'status': $scope.data.status,
      'statusName': $scope.data.statusName
    });
  };
  $scope.deleteRemindSuccess = function (data) {
    if (data.msgCode == 0) {
      $httpClue.getRemind($scope.data, $scope.getRemindSuccess);
    } else {
      if (data.msgMessage) {
        $scope.showAlert(data.msgMessage);
      } else {
        $scope.showAlert('删除失败');
      }
    }
  }
  $scope.recoverClueSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.closeOthers();
      $scope.makeSure1('恢复成功');
    } else {
      if (data.msgMessage) {
        $scope.showAlert(data.msgMessage);
      } else {
        $scope.showAlert('恢复失败');
      }
    }
  };
  $scope.getSourceSuccess = function (data) {
    if (data != null && data != "") {
      $scope.resvSource = data;
      var sourceLength = $scope.resvSource.length > 5 ? 265 : $scope.resvSource.length * 53;
      var source = `<ion-popover-view class="right-popover" style="width:150px;height:${sourceLength}px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-repeat="source in resvSource" ng-click="changeSource($event)" data-searchType="{{source.searchType}}" data-type={{source.type}}  data-id={{source.resvSourceId}}>{{source.resvSourceName}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
      $scope.popoverSource = $ionicPopover.fromTemplate(source, {
        scope: $scope
      });
      $scope.openPopoverSource = function ($event) {
        if ($scope.showState == true) return;
        $scope.popoverSource.show($event);
      };
      $scope.closePopoverSource = function () {
        $scope.popoverSource.hide();
      };
      $scope.changeSource = function ($event) {
        var a = $event.target;
        var txt = a.innerHTML;
        $scope.closePopoverSource();
        $scope.data.resvSourceName = txt;
        $scope.data.resvSourceId = a.getAttribute('data-id');
        $scope.type = a.getAttribute('data-type');
        $scope.searchType = a.getAttribute('data-searchType');
        if ($scope.type == "1") {
          $scope.sourceShow = false;
          $scope.data.resvSourceDetailName = null;
          $scope.mouhu = function () {
            $scope.data.resvSourceDetailName = $scope.data.resvSourceDetailName.trim();
            if ($scope.data.resvSourceDetailName) {
              var mohuData = {
                'businessId': $scope.info.businessId,
                'phone': $scope.data.resvSourceDetailName
              };
              $httpClue.getMouhuSource(mohuData, $scope.mouhuSourceSuccess);
            }
          }
        } else if ($scope.type == "2") {
          $scope.sourceShow = false;
          $scope.data.resvSourceDetailName = null;
          $scope.mouhu = function () {
            $scope.data.resvSourceDetailName = $scope.data.resvSourceDetailName.trim();
            if ($scope.data.resvSourceDetailName && $scope.data.resvSourceDetailName.toString().length >= 4) {
              var mohuData = {
                'businessId': $scope.info.businessId,
                'phone': $scope.data.resvSourceDetailName
              };
              $httpClue.getMouhuSource1(mohuData, $scope.mouhuSourceSuccess);
            }
          }
        } else {
          $httpClue.getSourceDetail($scope.data, $scope.getSourceDetailSuccess);
        }
        ;
        if($scope.searchType == 0){
          $scope.sourceShow1 = false;
        }else {
          $scope.sourceShow1 = true;
        }
      };
    }
  };
  $scope.mouhuSourceSuccess = function (data) {
    if ($scope.closePopover1) {
      $scope.popover1.hide();
    }
    ;
    if ((data.length > 0) && (data instanceof Array)) {
      var mohuSourceLength = data.length > 5 ? 265 : data.length * 53;
      $scope.mohuSource = data;
      var template1 = `<ion-popover-view style="height:${mohuSourceLength}px;width:290px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item" ng-repeat="source in mohuSource" ng-click="mohuSourceCheck($event)" data-phone={{source.phone}} data-sourceId={{source.sourceId}} data-name={{source.name}}>
                        {{source.type}}
                        {{source.phone}}
                        {{source.name}}
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
      var input = document.getElementById('resvSourceDetailName');
      $scope.openPopover1(input);
    }
  };
  $scope.mohuSourceCheck = function ($event) {
    var a = $event.target;
    $scope.data.resvSourceDetailName = a.getAttribute('data-name') + " " + a.getAttribute('data-phone');
    $scope.data.resvSourceDetaiId = a.getAttribute('data-sourceId');
    $scope.popover1.hide();
  };
  $scope.getSourceDetailSuccess = function (data) {
    if (data != null && data != "") {
      if ($scope.showState == false) {
        $scope.data.resvSourceDetailName = data[0].resvSourceDetailName;
        $scope.data.resvSourceDetailId = data[0].resvSourceDetailId;
      }
      $scope.resvSourceDetail = data;
      var sourceDetailLength = $scope.resvSourceDetail.length > 5 ? 265 : $scope.resvSourceDetail.length * 53;
      var sourceDetail = `<ion-popover-view class="right-popover" style="width:150px;height:${sourceDetailLength}px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" ng-repeat="source in resvSourceDetail" ng-click="changeSourceDetail($event)" data-id={{source.resvSourceDetailId}}>{{source.resvSourceDetailName}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
      $scope.popoverSourceDetail = $ionicPopover.fromTemplate(sourceDetail, {
        scope: $scope
      });
      $scope.openPopoverSourceDetail = function ($event) {
        if ($scope.showState == true) return;
        $scope.popoverSourceDetail.show($event);
      };
      $scope.closePopoverSourceDetail = function () {
        $scope.popoverSourceDetail.hide();
      };
      $scope.changeSourceDetail = function ($event) {
        var a = $event.target;
        var txt = a.innerHTML;
        $scope.closePopoverSourceDetail();
        $scope.data.resvSourceDetailName = txt;
        $scope.data.resvSourceDetailId = a.getAttribute('data-id');
      };
    } else {
      $scope.data.resvSourceDetailName = null;
      $scope.data.resvSourceDetailId = null;
    }
  };
  $scope.quit = function () {
    $scope.data.vipSex = $scope.data.man == true ? "男" : "女";
    $scope.clueDetail = JSON.parse(sessionStorage['clueDetail']);
    $scope.data.logs = '';
    $scope.isChage = false;
    if ($scope.clueDetail.vipPhone != $scope.data.vipPhone) {
      $scope.data.logs += '手机号:' + $scope.clueDetail.vipPhone + '更新为:' + $scope.data.vipPhone + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.vipName != $scope.data.vipName) {
      $scope.data.logs += '客户姓名:' + $scope.clueDetail.vipName + '更新为:' + $scope.data.vipName + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.vipSex != $scope.data.vipSex) {
      $scope.data.logs += '客户性别:' + $scope.clueDetail.vipSex + '更新为:' + $scope.data.vipSex + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.resvDate != $scope.data.resvDate) {
      $scope.data.logs += '宴会时间:' + $scope.clueDetail.resvDate + '更新为:' + $scope.data.resvDate + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.mealTypeName != $scope.data.mealTypeName) {
      $scope.data.logs += '宴会餐别:' + $scope.clueDetail.mealTypeName + '更新为:' + $scope.data.mealTypeName + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.resvMeetingOrderType != $scope.data.resvMeetingOrderType) {
      $scope.data.logs += '宴会类型:' + $scope.clueDetail.ytype + '更新为:' + $scope.data.ytype + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.resvTableNum != $scope.data.resvTableNum) {
      $scope.data.logs += '预计桌数:' + $scope.clueDetail.resvTableNum + '更新为:' + $scope.data.resvTableNum + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.backupTableNum != $scope.data.backupTableNum) {
      $scope.data.logs += '备用桌数:' + $scope.clueDetail.backupTableNum + '更新为:' + $scope.data.backupTableNum + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.resvAmount != $scope.data.resvAmount) {
      $scope.data.logs += '预计餐标:' + $scope.clueDetail.resvAmount + '更新为:' + $scope.data.resvAmount + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.vipStatus != $scope.data.vipStatus) {
      $scope.data.logs += '客户身份:' + $scope.clueDetail.vipStatus + '更新为:' + $scope.data.vipStatus + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.resvSourceName != $scope.data.resvSourceName) {
      $scope.data.logs += '获取途径:' + $scope.clueDetail.resvSourceName + '更新为:' + $scope.data.resvSourceName + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.resvSourceDetailName != $scope.data.resvSourceDetailName) {
      $scope.data.logs += '获取途径明细:' + $scope.clueDetail.resvSourceDetailName + '更新为:' + $scope.data.resvSourceDetailName + ';';
      $scope.isChage = true;
    }
    if ($scope.clueDetail.remark != $scope.data.remark) {
      $scope.data.logs += '备注:' + $scope.clueDetail.remark + '更新为:' + $scope.data.remark + ';';
      $scope.isChage = true;
    }
    if ($scope.isChage == true) {
      var confirmPopup = $ionicPopup.confirm({
        cssClass: "er-popup",
        title: $T.T('易订'),
        template: $T.T('是否要放弃编辑？若放弃，已输入的内容不会保存'),
        buttons: [
          {text: $T.T('取消')},
          {
            text: `<b>${$T.T('确认')}</b>`,
            type: 'button-assertive',
            onTap: function () {
              $state.go('myClue');
            }
          }
        ]
      });
    } else {
      $state.go('myClue');
    }
  }
  $scope.edit = function () {
    if ($scope.content == '编辑') {
      $scope.content = '保存';
      $scope.showState = false;
    } else {
      var reg = /^\d+$/;
      if ((($scope.data.vipPhone) && ($scope.data.vipPhone.toString().length != 6) && ($scope.data.vipPhone.toString().length != 11)) || (!$scope.data.vipPhone)) {
        $showAlert.alert('请输入正确的手机号');
      } else if (($scope.data.vipPhone != '') && (reg.test($scope.data.vipPhone) == false)) {
        $showAlert.alert('请输入正确的手机号');
      } else if (!$scope.data.vipName) {
        $showAlert.alert('请输入正确的客户姓名');
      } else {
        $scope.data.vipSex = $scope.data.man == true ? "男" : "女";
        $scope.clueDetail = JSON.parse(sessionStorage['clueDetail']);
        $scope.data.logs = '';
        $scope.isChage = false;
        if ($scope.clueDetail.vipPhone != $scope.data.vipPhone) {
          $scope.data.logs += '手机号:' + $scope.clueDetail.vipPhone + '更新为:' + $scope.data.vipPhone + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.vipName != $scope.data.vipName) {
          $scope.data.logs += '客户姓名:' + $scope.clueDetail.vipName + '更新为:' + $scope.data.vipName + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.vipSex != $scope.data.vipSex) {
          $scope.data.logs += '客户性别:' + $scope.clueDetail.vipSex + '更新为:' + $scope.data.vipSex + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.resvDate != $scope.data.resvDate) {
          $scope.data.logs += '宴会时间:' + $scope.clueDetail.resvDate + '更新为:' + $scope.data.resvDate + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.mealTypeName != $scope.data.mealTypeName) {
          $scope.data.logs += '宴会餐别:' + $scope.clueDetail.mealTypeName + '更新为:' + $scope.data.mealTypeName + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.resvMeetingOrderType != $scope.data.resvMeetingOrderType) {
          $scope.data.logs += '宴会类型:' + $scope.clueDetail.ytype + '更新为:' + $scope.data.ytype + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.resvTableNum != $scope.data.resvTableNum) {
          $scope.data.logs += '预计桌数:' + $scope.clueDetail.resvTableNum + '更新为:' + $scope.data.resvTableNum + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.backupTableNum != $scope.data.backupTableNum) {
          $scope.data.logs += '备用桌数:' + $scope.clueDetail.backupTableNum + '更新为:' + $scope.data.backupTableNum + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.resvAmount != $scope.data.resvAmount) {
          $scope.data.logs += '预计餐标:' + $scope.clueDetail.resvAmount + '更新为:' + $scope.data.resvAmount + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.vipStatus != $scope.data.vipStatus) {
          $scope.data.logs += '客户身份:' + $scope.clueDetail.vipStatus + '更新为:' + $scope.data.vipStatus + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.resvSourceName != $scope.data.resvSourceName) {
          $scope.data.logs += '获取途径:' + $scope.clueDetail.resvSourceName + '更新为:' + $scope.data.resvSourceName + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.resvSourceDetailName != $scope.data.resvSourceDetailName) {
          $scope.data.logs += '获取途径明细:' + $scope.clueDetail.resvSourceDetailName + '更新为:' + $scope.data.resvSourceDetailName + ';';
          $scope.isChage = true;
        }
        if ($scope.clueDetail.remark != $scope.data.remark) {
          $scope.data.logs += '备注:' + $scope.clueDetail.remark + '更新为:' + $scope.data.remark + ';';
          $scope.isChage = true;
        }
        if ($scope.isChage == true) {
          $httpClue.saveClue($scope.data, $scope.saveClueSuccess, $scope.error);
        } else {
          $scope.showAlert('更新线索成功');
          $state.go('myClue');
        }
      }
    }
  };
  $scope.saveClueSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.content = '编辑';
      $scope.showState = true;
      $showAlert.alert(data.msgMessage);
      $httpClue.getClueDetail($scope.data, $scope.getClueDateilSuccess);
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('更新线索失败');
      }
    }
  };
  $scope.showAlert = function (txt) {
    var alertPopup = $showAlert.alert(txt)
  };
  $scope.changeNum = function () {
    $scope.data.vipPhone = $scope.data.vipPhone.trim();
    if ($scope.data.vipPhone.length > 11) {
      var reg = /[^0-9]/g;
      $scope.data.vipPhone = $scope.data.vipPhone.replace(reg, '');
      if ($scope.data.vipPhone[0] == 8) {
        console.log(1);
        $scope.data.vipPhone = $scope.data.vipPhone.slice(2);
      }
    }
  };
  $scope.addPreZero = function (num) {
    return ('0' + num).slice(-2);
  };
  $scope.goRemind = function () {
    $scope.closeOthers();
    $state.go('clueRemind', {'keyNo': $scope.data.keyNo, 'type': 1});
  };
  $scope.goRecord = function () {
    $scope.closeOthers();
    $state.go('clueRecord', {'keyNo': $scope.data.keyNo});
  };
  $scope.putTrash = function () {
    $scope.trashDate = {
      'businessId': $scope.info.businessId,
      'keyNo': $scope.data.keyNo,
      'appUserId': $scope.info.id,
      'status': $scope.data.status,
      'statusName': $scope.data.statusName
    };
    $httpClue.cancelClue($scope.trashDate, $scope.cancelClueSuccess, $scope.error);
  };
  $scope.cancelClueSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.closeOthers();
      $scope.makeSure('此线索已转为无效线索，可在回收箱找回');
    } else {
      if (data.msgMessage) {
        $showAlert.alert(data.msgMessage);
      } else {
        $showAlert.alert('置为无效线索失败');
      }
    }
  };
  $scope.cancel = function () {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      title: $T.T('易订'),
      template: $T.T('确认要取消预订吗'),
      buttons: [
        {text: $T.T('取消')},
        {
          text: `<b>${$T.T('确认')}</b>`,
          type: 'button-assertive',
          onTap: function () {
            $state.go('tab.dash');
          }
        }
      ]
    });
  };
  $scope.showCalender = function () {
    if ($scope.showState) {
      return;
    }
    $scope.calender = true;
    $scope.luckDay();
  };
  $scope.luckDay = function () {
    $scope.luckyDate = {
      'businessId': $scope.info.businessId,
      'luckyDay': String($scope.dateYear) + $scope.addPreZero($scope.dateMonth + 1)
    };
    $httpPsd.getLuckyDay($scope.luckyDate, $scope.getLuckyDateSuccess);
  };
  $scope.getLuckyDateSuccess = function (data) {
    $scope.dateList = $calendarY.drawCld($scope.dateYear, $scope.dateMonth, data, $scope.info.isLuckyDay);
  };
  $scope.hideCalender = function ($event) {
    var id = $event.target.getAttribute('data-id');
    $scope.dateList[id].color = 'red';
    if ($event.target.getAttribute('data-date') != '') {
      $scope.calender = false;
      var day = $event.target.getAttribute('data-date');
      if (day == '吉' || day == '上上吉' || day == '上吉') {
        day = $event.target.getAttribute('data-datej');
      }
      var txt = $scope.dateYear + ',' + ($scope.dateMonth + 1) + ',' + day;
      var date = new Date($scope.dateYear * 1, ($scope.dateMonth) * 1, (day * 1)).getTime() * 1 + 1;
      var oldTime = $scope.dateString;
      $scope.showDate = date;
      $scope.data.showDate = $scope.showDate;
      $scope.dateString = freshTime();
      $scope.data.resvDate = $scope.dateString;
      $scope.data.page = 1;
      ;
    }
  };
  $scope.addYear = function () {
    $scope.dateYear += 1;
    $scope.luckDay();
  };
  $scope.minusYear = function () {
    if (($scope.dateYear == new Date().getFullYear()) || (($scope.dateYear == new Date().getFullYear() + 1) && $scope.dateMonth < new Date().getMonth())) {
      console.log('不能减小了');
    } else {
      $scope.dateYear -= 1;
      $scope.luckDay();
    }
  };
  $scope.addMonth = function () {
    if ($scope.dateMonth == 11) {
      $scope.dateMonth = 0;
      $scope.dateYear += 1;
    } else {
      $scope.dateMonth += 1;
    }
    $scope.luckDay();
  };
  $scope.minusMonth = function () {
    if (($scope.dateYear == $scope.todayTime.getFullYear()) && ($scope.dateMonth == $scope.todayTime.getMonth())) {
      console.log('不能减小了');
    } else {
      if ($scope.dateMonth == 0) {
        $scope.dateMonth = 11;
        $scope.dateYear -= 1;
      } else {
        $scope.dateMonth -= 1;
      }
      $scope.luckDay();
    }
  };
  $scope.dateCancel = function () {
    $scope.calender = false;
  };
  $scope.getClueDateilSuccess = function (data) {
    if (data != null) {
      $scope.data = data;
      sessionStorage['clueDetail'] = JSON.stringify(data);
      $scope.dateString = $scope.data.resvDate;
      $scope.data.workerName = $scope.data.appUserName;
      $scope.data.workerPhone = $scope.data.appUserPhone
      $scope.data.man = $scope.data.vipSex == "男" ? true : false;
      $scope.data.businessId = $scope.info.businessId;
      $scope.data.businessName = $scope.info.businessName;
      $scope.showState = true;
      if ($scope.data.resvSourceName == "内部推荐" || $scope.data.resvSourceName == "老客户推荐") {
        $scope.sourceShow = false;
      }
      if ($scope.data.resvSourceId != undefined) {
        $httpClue.getSourceDetail($scope.data, $scope.getSourceDetailSuccess);
      }
    }
  };
  $scope.getRecordSuccess = function (data) {
    if (data != null) {
      $scope.record = data;
    }
  }
  $scope.getRemindSuccess = function (data) {
    if (data != null) {
      $scope.remind = data;
    }
  }
  $scope.dateToday = function () {
    $scope.calender = false;
    $scope.dateYear = new Date().getFullYear();
    $scope.dateMonth = new Date().getMonth();
    //$scope.dateList=$calendar.drawCld($scope.dateYear,$scope.dateMonth);
    var oldTime = $scope.dateString;
    $scope.showDate = new Date().getTime();
    $scope.data.showDate = $scope.showDate;
    $scope.dateString = freshTime();
    $scope.data.resvDate = $scope.dateString;
  };
  $scope.left = function () {
    console.log('left');
    $scope.data.page = 1;
    ;
    var oldTime = $scope.dateString;
    $scope.showDate += 86400000;
    $scope.dateString = freshTime();
    $scope.data.resvDate = $scope.dateString;
    $scope.data.showDate = $scope.showDate;
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  var freshTime = function () {
    var date = $scope.showDate?new Date($scope.showDate):new Date();
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
    var dateString = date.getFullYear() + "-" + m + "-" + d;
    return dateString;
  };
  $scope.goYorder = function () {
    $httpClue.getResvOrder($scope.data, $scope.getResvOrderSuccess);
  };
  $scope.getResvOrderSuccess = function (data) {
    var resvOrder = data.resvOrder;
    var batchNo = data.batchNo;
    var type = 4
    if ($scope.info.operationType == 1 || $scope.info.id == data.appUserId) {
      type = 2
    }
    $state.go('myOrder-yDetail', {'resvOrder': resvOrder, 'batchNo': batchNo, 'type': type, 'keyNo': $scope.data.keyNo});
  }
  //确认预订//////////////////////////////
  $scope.createYorder = function () {
    var reg = /^\d+$/;
    if ((($scope.data.vipPhone) && ($scope.data.vipPhone.toString().length != 6) && ($scope.data.vipPhone.toString().length != 11)) || (!$scope.data.vipPhone)) {
      $showAlert.alert('请输入正确的手机号');
    } else if (($scope.data.vipPhone != '') && (reg.test($scope.data.vipPhone) == false)) {
      $showAlert.alert('请输入正确的手机号');
    } else if (!$scope.data.vipName) {
      $showAlert.alert('请输入正确的客户姓名');
    } else {
      if ($scope.data.resvDate == undefined) {
        $scope.data.resvDate = freshTime();
      }
      if ($scope.data.mealTypeId == undefined) {
        $scope.data.mealTypeId = sessionStorage['mealYTypeId'];
        $scope.data.mealTypeName = sessionStorage['mealYTypeName'];
      }
      var confirmPopup = $ionicPopup.confirm({
        cssClass: "er-popup",
        title: $T.T('易订'),
        template: $T.T('确认要转为订单吗'),
        buttons: [
          {text: $T.T('取消')},
          {
            text: $T.T('确认'),
            type: 'button-assertive',
            onTap: function () {
              $state.go('Ybook', {
                'type': 1,
                'mealTypeId': $scope.data.mealTypeId,
                'resvStartTime': sessionStorage['resvStartTime'],
                'resvEndTime': sessionStorage['resvEndTime'],
                'mealTypeName': $scope.data.mealTypeName,
                'keyNo': $scope.data.keyNo,
                'resvDate': $scope.data.resvDate,
                'vipPhone': $scope.data.vipPhone,
                'man': $scope.data.man,
                'ytype': $scope.data.ytype,
                'vipName': $scope.data.vipName,
                'resvMeetingOrderType': $scope.data.resvMeetingOrderType,
                'resvTableNum': $scope.data.resvTableNum,
                'backupTableNum': $scope.data.backupTableNum,
                'resvAmount': $scope.data.resvAmount,
                'vipStatus': $scope.data.vipStatus
              });
            }
          }
        ]
      });
    }
  };
  //预订成功////////////////////////////
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
            $state.go('myClue');
          }
        }
      ]
    });
  };
  $scope.makeSure1 = function (txt) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      title: $T.T('易订'),
      template: $T.T(txt),
      buttons: [
        {
          text: $T.T('确认'),
          type: 'button-assertive',
          onTap: function () {
            $state.go('clueTrash');
          }
        }
      ]
    });
  };
  $scope.clueSuccess = function (data) {
    if (data.msgCode == 0) {
      $scope.makeSure(data.msgMessage);
      console.log($scope.data);
    } else {
      if (data.msgMessage) {
        $scope.showAlert(data.msgMessage);
      } else {
        $scope.showAlert('创建线索失败');
      }
    }
  };
  //error////////////////////////
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('创建线索失败');
    }
    $ionicLoading.hide();
  };
})