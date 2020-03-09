angular.module('starter.controllers.accountMyOrderTuanDetailCtrl', []).controller('AccountMyOrderTuanDetailCtrl', function ($scope, $httpGroup, ionicDatePicker, $stateParams, $showAlert, $ionicPopover, $ionicHistory, $ionicPopup, $T, $ionicLoading, $httpPsd, $state) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
        $scope.info = JSON.parse(localStorage['info']);
        $scope.mealTypes = JSON.parse(sessionStorage['mealTypes']);
        $scope.userList = JSON.parse(sessionStorage['userList']);
        $scope.edit = false
        $scope.detail = false
        $scope.isDetailShow = false
        $scope.fromDate = new Date()
        // $scope.resvStartTime = sessionStorage['resvStartTime']
        // $scope.resvEndTime = sessionStorage['resvEndTime']
        $scope.data = {}
        $scope.data.vipSex = '先生'
        $scope.data.resvDate = $scope.freshTime(new Date())
        $scope.data.resvStartDate = $scope.freshTime(new Date())
        $scope.data.resvEndDate = $scope.freshTime(new Date())
        $scope.data.mealTypeId = sessionStorage['mealTypeId']
        $scope.data.mealTypeName = sessionStorage['mealTypeName']
        $scope.data.businessId = $scope.info.businessId
        $scope.data.businessName = $scope.info.businessName
        $scope.data.appUserId = $scope.info.id
        $scope.data.appUserName = $scope.info.surname
        $scope.data.appUserPhone = $scope.info.username
        $scope.data.groupMealDetails = []
        $scope.mealList = []
        var sex = `<ion-popover-view style="height:106px;width:120px;;padding-top:0;">
                     <ion-content style="background-color: transparent;" overflow-scroll="true">
                       <div class="list">
                         <a class="item text-center" ng-click="choose($event,1)" data-id="先生">
                            {{'先生'|T}}
                         </a>
                         <a class="item text-center" ng-click="choose($event,1)" data-id="女士">
                            {{'女士'|T}}
                         </a>
                       </div>
                     </ion-content>
                   </ion-popover-view>`;
        $scope.popoverSex = $ionicPopover.fromTemplate(sex, {
          scope: $scope
        });
        var mealTypesLength = $scope.mealTypes.length * 53;
        var meal = `<ion-popover-view style="height:${mealTypesLength}px;width:120px;padding-top:0;">
                     <ion-content style="background-color: transparent;" overflow-scroll="true">
                       <div class="list">
                         <a class="item text-center" ng-click="choose($event,2)" ng-repeat="meal in mealTypes" data-id={{meal.id}} data-resvStartTime={{meal.resvStartTime}} data-resvEndTime={{meal.resvEndTime}} data-mealTypeName={{meal.mealTypeName}}>{{meal.mealTypeName}}</a>
                       </div>
                     </ion-content>
                   </ion-popover-view>`;
        $scope.popoverMeal = $ionicPopover.fromTemplate(meal, {
          scope: $scope
        });

        var people = `<ion-popover-view class="right-popover" style="width:200px;max-height:240px;">
          <ion-content style="background-color: transparent;">
            <div class="list">
              <a class="item text-center" ng-repeat="people in userList" ng-click="choose($event, 3)" data-phone={{people.appUserPhone}} data-name={{people.appUserName}} data-id={{people.id}}>
              {{people.appUserName}} {{people.appUserPhone}}
              </a>
            </div>
          </ion-content>
        </ion-popover-view>`;
        $scope.popoverPeople = $ionicPopover.fromTemplate(people, {
          scope: $scope
        });
        $scope.randerTime()

        if($stateParams.resvOrder){
          $scope.stateParams = $stateParams
          $scope.edit = true
          $scope.data.resvOrder = $stateParams.resvOrder
          if($stateParams.status != 1){
            $scope.detail = true
          }
          $httpGroup.getGroupOrderDetail({
            businessId: $scope.info.businessId,
            resvOrder: $stateParams.resvOrder
          }, function(data){
            if (data.resvDate < $scope.freshTime(new Date())) {
              $scope.detail = true
            }
            $scope.data = data
            $scope.randerTime()
            $scope.oldData = JSON.parse(JSON.stringify(data))
            // $scope.fromDate = new Date(data.resvDate.replace(/-/g, "/"))
            $scope.getGroupMeal()
          })
        }
    })
    $scope.destTimeArr = function () {
      var start = 0
      var end = 24*60
      if(start>end){
        end += 24*60
      }
      var arr = [];
      arr.push(start);
      while (start < end) {
        start += 15;
        arr.push(start);
      }
      for (var i = 0; i < arr.length; i++) {
        if(arr[i]>24*60){
          arr[i] = arr[i] - 24*60
        }
        arr[i] = parseInt(arr[i] / 60) + ":" + ((arr[i] - parseInt(arr[i] / 60) * 60) + "0").slice(0, 2);
      }
      // console.log(arr);
      
      var now = new Date()
      var resvDate = $scope.data.resvStartDate || $scope.data.resvDate
      var startDate = new Date(resvDate.replace(/-/g, "/"))
      var arrTime = []
      for (var i = 0; i < arr.length; i++) {
        var datetime = new Date($scope.freshTime(new Date()).replace(/-/g, "/") + ' ' + arr[i])
        if (datetime >= now || $scope.freshTime(startDate) > $scope.freshTime(now)) {
          arrTime.push(arr[i])
        }
      }
      return arrTime;
    };
    $scope.randerTime = function () {
      $scope.destArr = $scope.destTimeArr();
      var destArrLength = $scope.destArr.length > 5 ? 265 : $scope.destArr.length * 53;
      var template2 = `<ion-popover-view class="right-popover" style="width:150px;height:${destArrLength}px;">
                  <ion-content style="background-color: transparent;">
                    <div class="list">
                      <a class="item text-center" style="border-top:0" ng-repeat="dest in destArr track by $index" ng-click="changeDest($event)">{{dest}}</a>
                    </div>
                  </ion-content>
                </ion-popover-view>`;
      $scope.popover2 = $ionicPopover.fromTemplate(template2, {
        scope: $scope
      });
    }
    $scope.openPopover = function ($event, num, index) {
      if (num == 1) {
        $scope.popoverSex.show($event);
      } else if (num == 2) {
        $scope.editMealIndex = index
        $scope.popoverMeal.show($event);
      } else if (num == 3) {
        $scope.popoverPeople.show($event);
      }
    }
    $scope.closePopover = function (num) {
      if (num == 1) {
        $scope.popoverSex.hide();
      } else if (num == 2) {
        $scope.popoverMeal.hide();
      } else if (num == 3) {
        $scope.popoverPeople.hide();
      }
    }
    $scope.choose = function($event, num) {
      var a = $event.target;
      var txt = a.getAttribute("data-id")
      $scope.closePopover(num);
      if (num == 1) {
        $scope.data.vipSex = txt
      } else if (num == 2) {
        if ($scope.editMealIndex || $scope.editMealIndex == 0) {
          // 修改关联订单餐别
          $scope.data.resvDetails[$scope.editMealIndex].mealTypeId = txt
          $scope.data.resvDetails[$scope.editMealIndex].mealTypeName = a.getAttribute("data-mealTypeName")
        } else {
          $scope.data.mealTypeId = txt
          $scope.data.mealTypeName = a.getAttribute("data-mealTypeName")
          // $scope.resvStartTime = a.getAttribute("data-resvStartTime")
          // $scope.resvEndTime = a.getAttribute("data-resvEndTime")
          if ($scope.mealList.length > 0) {
            $scope.getGroupMeal()
          }
          $scope.randerTime()
        }
      } else if (num == 3) {
        $scope.data.appUserId = a.getAttribute("data-id")
        $scope.data.appUserName = a.getAttribute("data-name")
        $scope.data.appUserPhone = a.getAttribute("data-phone")
      }
    }
    $scope.openPopover2 = function ($event) {
      $scope.popover2.show($event);
    };
    $scope.closePopover2 = function () {
      $scope.popover2.hide();
    };
    $scope.changeDest = function ($event) {
      var a = $event.target;
      var txt = a.innerHTML;
      $scope.closePopover2();
      $scope.data.sendTime = txt;
    }
    $scope.submit = function() {
      var reg = /^\d+$/;
      var details = []
      var isnumber = true
      $scope.mealList.map(function(item){
        if (item.num) {
          if (!Number(item.num)){
            isnumber = false
          }
          details.push({
              groupMealId: item.groupMealId,
              groupMealNum: item.num
          })
        }
      })
      if ((($scope.data.vipPhone) && ($scope.data.vipPhone.toString().length != 6) && ($scope.data.vipPhone.toString().length != 11)) || (!$scope.data.vipPhone)) {
        $showAlert.alert('请输入正确的手机号');
      } else if (($scope.data.vipPhone != '') && (reg.test($scope.data.vipPhone) == false)) {
        $showAlert.alert('请输入正确的手机号');
      } else if (!$scope.data.vipName) {
        $showAlert.alert('请输入正确的客户姓名');
      } else if ((!$scope.edit && (!$scope.data.resvStartDate || !$scope.data.resvEndDate)) || ($scope.edit && (!$scope.data.resvDate))) {
        $showAlert.alert('请输入预订日期');
      } else if (!$scope.edit && (new Date($scope.data.resvStartDate.replace(/-/g, "/")).getTime() > new Date($scope.data.resvEndDate.replace(/-/g, "/")).getTime())) {
        $showAlert.alert('预订开始时间不可大于结束时间');
      } else if (details.length == 0) {
        $showAlert.alert('请输入选择预订套餐');
      } else if (!isnumber) {
        $showAlert.alert('套餐数量必须为整数');
      } else if (($scope.data.sendPhone) && ($scope.data.sendPhone.toString().length != 6) && ($scope.data.sendPhone.toString().length != 11)) {
        $showAlert.alert('请输入正确的派送电话');
      } else if (!$scope.data.sendAddress) {
        $showAlert.alert('请输入派送地址');
      } else if (!$scope.data.sendTime) {
        $showAlert.alert('请输入送达时间');
      } else {
        if ($scope.data.resvDetails && $scope.data.resvDetails.length > 1) {
          // 关联订单选择
          $scope.resvDetails = []
          $scope.data.resvDetails.map(function(item){
            if ($scope.freshTime(item.resvDate.replace(/-/g, "/")) > $scope.freshTime(new Date()) && item.resvOrder != $scope.data.resvOrder) {
              $scope.resvDetails.push(item)
            }
          })
          var str = ''
          for(var i in $scope.oldData) {
            if($scope.oldData[i] != $scope.data[i] && i != 'groupMealDetails' && i != 'resvDetails'){
              if (i == 'mealTypeName') {
                str += `<div>{{'餐别'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'price') {
                str += `<div>{{'订单总价'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'sendAddress') {
                str += `<div>{{'派送地址'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'sendTime') {
                str += `<div>{{'送达时间'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'sendMan') {
                str += `<div>{{'派送员'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'sendPhone') {
                str += `<div>{{'派送电话'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'appUserName') {
                str += `<div>{{'下单来源'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              if (i == 'remark') {
                str += `<div>{{'备注'|T}} {{'将'|T}} ${$scope.oldData[i] || ''} {{'改为'|T}} <span style="color:red">${$scope.data[i]}</span></div>`
              }
              console.log(i)
            }
            var mealStrArr = []
            if (i == 'groupMealDetails') {
              $scope.oldData[i].map(function(o){
                var item = $scope.mealList.find(function(meal){ return meal.groupMealId == o.groupMealId})
                if (item && item.num != o.groupMealNum) {
                  console.log(o)
                  mealStrArr.push(`{{'将'|T}}${o.groupMealName}{{'的份数从'|T}}${o.groupMealNum  || 0}{{'份'|T}} {{'改为'|T}} <span style="color:red">${item.num || 0}{{'份'|T}}</span>`)
                }
              })
            }
            if (mealStrArr.length>0) {
              var str1 = mealStrArr.join('；')
              str += `<div>套餐详情 ${str1}</div>`
            }
          }
          if (str) {
            $ionicPopup.confirm({
              cssClass: "er-popup",
              template: `<div id="relatedOrders">
                          <div>{{'您刚刚将'|T}}{{data.vipName}}({{data.vipPhone}}) {{data.resvDate}} {{oldData.mealTypeName}}，{{data.sendTime}} {{'送至'|T}} {{data.sendAddress}} {{'的订单进行了修改'|T}}</div>
                          <div>{{'修改内容：'|T}}${str}</div>
                          <div>{{'该订单还关联以下'|T}}{{resvDetails.length}}{{'笔未来订单，是否做同样变更'|T}}</div>
                          <div style="max-height:110px;overflow:auto">
                            <div ng-repeat="item in resvDetails">
                              <label><input type="checkbox" style="width: auto" checked data-resvDate={{item.resvDate}} data-mealTypeName={{item.mealTypeName}} data-mealTypeId={{item.mealTypeId}} data-resvOrder={{item.resvOrder}} /> {{item.resvDate}} {{item.mealTypeName}}</label>
                            </div>
                          </div>
                        </div>`,
              title: $T.T('关联订单提醒'),
              scope: $scope,
              buttons: [
                {text: $T.T('取消')},
                {text: $T.T('确定'), type: 'button-assertive',
                  onTap: function () {
                    var relatedOrders = $('#relatedOrders input[type=checkbox]:checked')
                    $scope.relatedOrders = [{
                      mealTypeId: $scope.data.mealTypeId,
                      mealTypeName: $scope.data.mealTypeName,
                      resvDate: $scope.data.resvDate,
                      resvOrder: $scope.data.resvOrder,
                    }]
                    for(var i=0;i<relatedOrders.length;i++){
                      $scope.relatedOrders.push({
                        mealTypeId: $scope.data.mealTypeId,
                        mealTypeName: $scope.data.mealTypeName,
                        resvDate: $(relatedOrders[i]).attr('data-resvDate'),
                        resvOrder: $(relatedOrders[i]).attr('data-resvOrder')
                      })
                    }
                    $scope.checkMeal()
                  }
                }
              ]
            });
          } else {
            $scope.relatedOrders = $scope.resvDetails.concat([{
              mealTypeId: $scope.data.mealTypeId,
              mealTypeName: $scope.data.mealTypeName,
              resvDate: $scope.data.resvDate,
              resvOrder: $scope.data.resvOrder,
            }])
            $scope.checkMeal()
          }
        } else {
          $scope.relatedOrders = [{
            mealTypeId: $scope.data.mealTypeId,
            mealTypeName: $scope.data.mealTypeName,
            resvDate: $scope.data.resvDate,
            resvOrder: $scope.data.resvOrder,
          }]
          $scope.checkMeal()
        }
      }

    }
    $scope.checkMeal = function(){
      var details = []
      $scope.mealList.map(function(item){
        if (item.num) {
          details.push({
              groupMealId: item.groupMealId,
              groupMealNum: item.num
          })
        }
      })
      var params = {
          businessId: $scope.info.businessId,
          resvStartDate: $scope.data.resvStartDate || $scope.data.resvDate,
          resvEndDate: $scope.data.resvEndDate || $scope.data.resvDate,
          mealTypeId: $scope.data.mealTypeId
      }
      params.details = details
      $httpGroup.checkGroupNum(params, function(data){
          if (data && data.length > 0) {
            var html = `{{'您好，'|T}}`
            for(var i=0;i<data.length;i++){
              html  += `${data[i].resvDate} {{'的'|T}} ${data[i].groupMealName} {{'份数不足，剩余数量为'|T}} ${data[i].groupMealNum}，`
            }
            html += `{{'是否继续预订'|T}}`
            $ionicPopup.confirm({
              cssClass: "er-popup",
              template: html,
              title: $T.T('数量不足'),
              scope: $scope,
              buttons: [
                {text: $T.T('取消')},
                {text: $T.T('确定'), type: 'button-assertive',
                  onTap: function () {
                    $scope.saveOrder()
                  }
                }
              ]
            });
          } else {
              $scope.saveOrder()
          }
      })
    }
    $scope.saveOrder = function(){
        $scope.data.groupMealDetails = []
        $scope.mealList.map(function(item){
            if (item.num) {
                $scope.data.groupMealDetails.push({
                    groupMealId: item.groupMealId,
                    groupMealName: item.groupMealName,
                    groupMealNum: item.num,
                    groupMealPrice: item.groupMealPrice
                })
            }
        })
        if($scope.isSubmit){
          return
        }
        $scope.isSubmit = true
        $scope.showLoading();
        if ($scope.edit) {
          var params = JSON.parse(JSON.stringify($scope.data))
          params.resvDetails = $scope.relatedOrders
          $httpGroup.updateGroupOrder(params, function(data){
            $ionicLoading.hide();
            $scope.isSubmit = false
            if (data.msgCode == 0) {
                $scope.makeSure(data.msgMessage);
            } else {
                if (data.msgMessage) {
                    $showAlert.alert(data.msgMessage);
                } else {
                    $showAlert.alert('修改订单失败');
                }
            }
          }, $scope.error)
        } else {
          $httpGroup.saveGroupOrder($scope.data, function(data){
              $ionicLoading.hide();
              $scope.isSubmit = false
              if (data.msgCode == 0) {
                  $scope.makeSure(data.msgMessage);
              } else {
                  if (data.msgMessage) {
                      $showAlert.alert(data.msgMessage);
                  } else {
                      $showAlert.alert('创建订单失败');
                  }
              }
          }, $scope.error)
        }
    }
    $scope.makeSure = function (txt) {
        $ionicPopup.confirm({
            cssClass: "er-popup",
            title: $T.T('易订'),
            template: $T.T(txt),
            buttons: [{
                text: $T.T('确认'),
                type: 'button-assertive',
                onTap: function () {
                  $ionicHistory.goBack();
                }
            }]
      });
    };
    $scope.error = function (data) {
      $ionicLoading.hide();
      $scope.isSubmit = false
      if (data && data.msgMessage) {
        $showAlert.alert(data.msgMessage)
      } else {
        $showAlert.alert('创建订单失败');
      }
    };
    $scope.cancel = function () {
      $ionicHistory.goBack();
    };
    $scope.getGroupMeal = function(){
        $httpGroup.getGroupMeal({
            businessId: $scope.info.businessId,
            resvStartDate: $scope.data.resvStartDate || $scope.data.resvDate,
            resvEndDate: $scope.data.resvEndDate || $scope.data.resvDate,
            mealTypeId: $scope.data.mealTypeId,
        }, function(data) {
            if (data && data.length > 0) {
                $scope.mealList = data
                if ($scope.edit){
                  $scope.mealList = data.map(function(item){
                    var num = $scope.data.groupMealDetails.filter(function(o){
                      return o.groupMealId == item.groupMealId
                    })
                    return {
                      groupMealId: item.groupMealId,
                      groupMealName: item.groupMealName,
                      groupMealNum: item.groupMealNum || 0,
                      groupMealPrice: item.groupMealPrice,
                      num: num.length>0?num[0].groupMealNum:'',
                      groupMealDishes: item.groupMealDishes
                    }
                  })
                }
            }
        })
    }
    $scope.openDatePicker = function (num) {
      var timePicker = $scope.newIpObj(num);
      ionicDatePicker.openDatePicker(timePicker);
    }
    $scope.newIpObj = function (num) {
      var inputDate = new Date()
      if (num == 1) {
        inputDate = new Date($scope.data.resvStartDate.replace(/-/g, "/"))
      } else if (num == 2) {
        inputDate = new Date($scope.data.resvEndDate.replace(/-/g, "/"))
      } else {
        inputDate = new Date($scope.data.resvDate.replace(/-/g, "/"))
      }
      var ipObj = {
        callback: function (date) {
          if (num == 1) {
            $scope.data.resvStartDate = $scope.freshTime(date)
          } else if (num == 2) {
            $scope.data.resvEndDate = $scope.freshTime(date)
          } else {
            // var isSame = false
            // if ($scope.data.resvDetails.length > 1){
            //   $scope.data.resvDetails.map(function(item){
            //     if ($scope.freshTime(date) == item.resvDate) {
            //       isSame = true
            //     }
            //   })
            // }
            // if (!isSame) {
            //   $scope.data.resvDetails.map(function(item){
            //     if ($scope.data.resvOrder == item.resvOrder) {
            //       item.resvDate = $scope.freshTime(date)
            //     }
            //   })
              $scope.data.resvDate = $scope.freshTime(date)
            // } else {
            //   return
            // }
          }
          if ($scope.mealList.length > 0) {
            $scope.getGroupMeal()
          }
          $scope.randerTime()
        },
        from: $scope.fromDate,
        inputDate: inputDate,
        mondayFirst: false,
        closeOnSelect: true,
        templateType: 'popup',
        dateFormat: 'yyyy-MM-dd'
      };
      return ipObj;
    };
    $scope.freshTime = function (date) {
      var date = new Date(date);
      var m = date.getMonth() + 1;
      if (m < 10) {
        m = "0" + m
      }
      var d = date.getDate();
      if (d < 10) {
        d = "0" + d
      }
      var dateString = date.getFullYear() + "-" + m + "-" + d;
      return dateString;
    }
    $scope.showLoading = function () {
      $ionicLoading.show({
        template: $T.T('加载中...')
      })
    }
    $scope.select = function () {
      $scope.data.vipPhone = $scope.data.vipPhone.trim();
      if ($scope.data.vipPhone.length > 11) {
        var reg = /[^0-9]/g;
        $scope.data.vipPhone = $scope.data.vipPhone.replace(reg, '');
        if ($scope.data.vipPhone[0] == 8) {
          $scope.data.vipPhone = $scope.data.vipPhone.slice(2);
        }
      }
      if ($scope.data.vipPhone && $scope.data.vipPhone.toString().length >= 4) {
        var mohuData = {
          "appUserId": $scope.info.id,
          "vipPhone": $scope.data.vipPhone,
          'businessId': $scope.data.businessId,
          'date': new Date().getTime()
        }
        $httpPsd.mohuSelect(mohuData, $scope.selectSuccess, $scope.selectError)
        if($scope.data.vipPhone.length == 11){
          $scope.data.vipPhone = $scope.data.vipPhone;
          $scope.data.vipName = $scope.data.vipName;
          $scope.data.vipCompany = $scope.data.vipCompany;
          $scope.data.vipSex = $scope.data.vipSex
        }
      } else {
        if ($scope.closePopover1) {
          $scope.popover1.hide();
        }
      }
    }
    $scope.selectSuccess = function (data) {
      $scope.showCrm = false;
      $scope.showBack = false;
      if ($scope.closePopover1) {
        $scope.popover1.hide();
      }
      if ((data.length > 0) && (data instanceof Array)) {
        var mohuLength = data.length > 5 ? 265 : data.length * 53;
        $scope.mohu = data.map(function (item) {
          var firstClassValue = ''
          switch (item.firstClassValue) {
            case 1:
              firstClassValue = '意向'
              break;
            case 2:
              firstClassValue = '活跃'
              break;
            case 3:
              firstClassValue = '沉睡'
              break;
            case 4:
              firstClassValue = '流失'
              break;
            default:
          }
          return {
            vipPhone: item.vipPhone,
            vipName: item.vipName,
            firstClassValue: firstClassValue,
            detailValueName: item.detailValueName,
            tag: item.tag,
            hobby: item.hobby,
            detest: item.detest,
            vipSex: item.vipSex,
            vipCompany: item.vipCompany
          }
        });
        var template1 = `<ion-popover-view style="height:${mohuLength}px;width:290px;">
                   <ion-content style="background-color: transparent;">
                     <div class="list">
                       <a class="item" ng-repeat="person in mohu track by $index" ng-click="mohuCheck($event)" data-phone={{person.vipPhone}} data-name={{person.vipName}} data-tag={{person.tag}} data-hobby={{person.hobby}} data-company="{{person.vipCompany}}" data-detest={{person.detest}} data-gender={{person.vipSex}}>
                         {{person.vipPhone}}
                         {{person.vipName}}
                         {{person.firstClassValue}}
                         {{person.detailValueName?'/'+person.detailValueName:''}}
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
      }
    };
    $scope.selectError = function () {
      if ($scope.closePopover1) {
        $scope.popover1.hide();
      }
    }
    $scope.mohuCheck = function ($event) {
      var a = $event.target;
      $scope.data.vipPhone = a.getAttribute('data-phone');
      $scope.data.vipName = a.getAttribute('data-name');
      $scope.data.vipCompany = a.getAttribute('data-company');
      $scope.data.vipSex = a.getAttribute('data-gender') == '男' ? '先生' : '女士';
      $scope.popover1.hide();
    };
    $scope.showDetail = function() {
      $scope.isDetailShow = !$scope.isDetailShow
    }
    $scope.showMealDetail = function($event,index) {
      $scope.mealDetail = $scope.mealList[index].groupMealDishes
      var height = $scope.mealDetail.length * 40 + 80
      var template1 = `<ion-popover-view style="width:290px;max-height: 200px;height:${height}px;text-align:center">
                  <ion-content style="background-color: transparent;">
                    <div style="line-height:40px;text-align: left;padding: 0 20px;">${$scope.mealList[index].groupMealName}{{'内容：'|T}}</div>
                    <div style="display:flex;line-height:40px"><div style="flex:1">{{'菜名'|T}}</div><div style="flex:1">{{'份数'|T}}</div></div>
                    <div ng-repeat="dish in mealDetail" style="display:flex;line-height:40px"><div style="flex:1">{{dish.dishName}}</div><div style="flex:1">{{dish.dishNum}}</div></div>
                  </ion-content>
                </ion-popover-view>`;
      $scope.popoverMealDetail = $ionicPopover.fromTemplate(template1, {
        scope: $scope
      });
      $scope.popoverMealDetail.show($event);
    }
})