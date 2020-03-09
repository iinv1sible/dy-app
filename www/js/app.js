// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('eomApp', ['ionic','ionic-datepicker','ion-sticky','ngCordova','highcharts-ng','starter.services', 'starter.controllers','angularQFileUpload', 'LocalStorageModule', 'pascalprecht.translate','oc.lazyLoad'])

  .run(function($ionicPlatform,$ionicPopup,$rootScope,$location,$ionicHistory,$ionicViewSwitcher,$interval, $cordovaKeyboard) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova) {
        $cordovaKeyboard.hideAccessoryBar(false);
        $cordovaKeyboard.disableScroll(false);
        if ($ionicPlatform.isIOS()) {
          $cordovaKeyboard.disableScroll(true)
        }
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
    /*注册返回事件*/
    $ionicPlatform.registerBackButtonAction(function(e){
      /*用一个变量来控制界面上是否已经存在popup,多次点击的时候如果存在就不再提示*/
      // $(".popup-showing").remove();
      // $(".click-block").remove();
      // $("body").removeClass('popup-open popover-open')
      // $('.backdrop').removeClass('visible active')
      $rootScope.popup = {
        isPopup: false,
        index: 0
      };
      function showConfirm(){
        var confirmPopup= $ionicPopup.confirm({
          title:'易订',
          cssClass:"er-popup",
          template:"你确定要退出易订吗？",
          okText:"确定",
          cancelText:"取消"
        });
        $rootScope.popup.isPopup=true;
        confirmPopup.then(function(res){
          if(res){
            ionic.Platform.exitApp();
          }
        })
      }

      /*根据首页的路由判断是否提示退出*/
      if($location.path() =="/tab/dash" || $location.path() =="/login"){
        if(!$rootScope.popup.isPopup){
          showConfirm();
        }
      }else if($ionicHistory.backView()){
        $ionicHistory.goBack();//back到之前的路由
        $ionicViewSwitcher.nextDirection("back");//增加切换的样式
      }else{
        showConfirm();
      }
      return false;
    },101);//501表示优先级  100~999之间

    var firstVisit = localStorage.getItem('firstVisit');
    var token=localStorage['TOKEN_KEY'];

    if($location.path() != "/#/myOrder/cDetail" && $location.path() != "/myOrder/cDetail" && $location.path() != "/#/myOrder/yDetail" && $location.path() != "/myOrder/yDetail" && $location.path() != "/#/vipList" && $location.path() != "/vipList" && $location.path() != "/#/clueDetail" && $location.path() != "/clueDetail" && $location.path() != "/#/wechatData" && $location.path() != "/wechatData" && $location.path() != "/#/wechatMeetingData" && $location.path() != "/wechatMeetingData" && $location.path() != "/#/wechatVip" && $location.path() != "/wechatVip" && $location.path() != "/#/wechatDetail" && $location.path() != "/wechatDetail" && $location.path() != "/#/webShare" && $location.path() != "/webShare"){ // 微信模板页面不跳转到首页
      if (firstVisit==1) {
        $location.url('/login');
      }else{
        $location.url('/tour');
      }
    }else{
      if(JSON.stringify($location.$$search) == '{}'){
        $location.url('/login');
      }
    }
    /*var timer=$interval(function () {
      console.log('去读取');
    },2000);*/
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,ionicDatePickerProvider,$translateProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $ionicConfigProvider.backButton.text('');

    $ionicConfigProvider.backButton.previousTitleText(false);

    var lang = localStorage['lang']||'cn';
    $translateProvider.preferredLanguage(lang);
    $translateProvider.useStaticFilesLoader({
      prefix: 'json/',
      suffix: '.json'
    });

    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: '选择日期',
      setLabel: 'Set',
      todayLabel: '今日',
      closeLabel: '关闭',
      mondayFirst: true,
      // weeksList: ["一", "二", "三", "四", "五", "六", "日"],
      weeksList: ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      templateType: 'popup',
      from: new Date(),
      to: new Date(2020, 8, 1),
      dateFormat: 'yyyy-mm-dd',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('login',{
        url:'/login',
        params:{'type':null},
        templateUrl: 'templates/login.html',
        controller:'loginCtrl'
      })
      .state('psd1',{
        url:'/psd1',
        templateUrl: 'templates/findpsd1.html',
        controller:'psd1Ctrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/psd1Ctrl.js'])
          }]
        }
      })
      .state('psd2',{
        url:'/psd2',
        params:{'appUserPhone':null,'appUserCode':null,'isEasy':null},
        templateUrl: 'templates/findpsd2.html',
        controller:'psd2Ctrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/psd2Ctrl.js'])
          }]
        }
      })
      .state('psd3',{
        url:'/psd3',
        params:{'appUserId':null},
        templateUrl: 'templates/findpsd3.html',
        controller:'psd3Ctrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/psd3Ctrl.js'])
          }]
        }
      })
      .state('tab.account-set-psd4',{
        url:'/account/psd4',
        views:{
          'tab-account':{
            templateUrl:'templates/findpsd4.html',
            controller:'psd4Ctrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/psd4Ctrl.js'])
              }]
            }
          }
        }
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller:'tabsCtrl'
      })
      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/dashCtrl.js'])
              }]
            }
          }
        }
      })
      .state('book', {
        url: '/book',
        params:{'type':null,'mealTypeId':null,'mealTypeIdA':null,'mealTypeIdB':null,'resvStartTime':null,'resvEndTime':null,'mealTypeName':null,'seatDataFor':null,'dateString':null, 'showDate':null, 'isKuaTian':null},

        templateUrl: 'templates/tab-dash-book.html',
        controller: 'DashBookCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/dashBookCtrl.js'])
          }]
        }
      })
      .state('myClue', {
        url: '/myClue',
        templateUrl: 'templates/clueMy.html',
        controller: 'MyClueCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myClueCtrl.js'])
          }]
        }
      })
      .state('clueTrash', {
        url: '/clueTrash',
        templateUrl: 'templates/clueTrash.html',
        controller: 'clueTrashCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueTrashCtrl.js'])
          }]
        }
      })
      .state('clueSearch', {
        url: '/clueSearch',
        templateUrl: 'templates/clueSearch.html',
        controller: 'clueSearchCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueSearchCtrl.js'])
          }]
        }
      })
      .state('tableEdit', {
        url: '/tableEdit',
        params:{'tableId':null,'tableName':null,'isYan':null,'tType':null,'tTypeId':null,'maxTableNum':null,'maxPeopleNum':null,'minAmount':null,'device':null,'tableRemark':null,'tableUrl':null},
        templateUrl: 'templates/table-edit.html',
        controller: 'tableEditCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/tableEditCtrl.js'])
          }]
        }
      })
      .state('tableYEdit', {
        url: '/tableYEdit',
        params:{'tableId':null,'tableName':null,'isYan':null,'tType':null,'tTypeId':null,'maxTableNum':null,'maxPeopleNum':null,'minAmount':null,'roomArea':null,'floorHeight':null,'device':null,'tableRemark':null,'tableUrl':null},
        templateUrl: 'templates/table-Y-edit.html',
        controller: 'tableYEditCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/tableYEditCtrl.js'])
          }]
        }
      })
      .state('backOrder', {
        url: '/backOrder',
        params:{'resvOrder':null,'back':null,'resvTableNum':null,'getOrderData':null,'orderList':null,'resvMeetingOrderType':null,'dishStandard':null,'payamount':null,'actualTableNum':null,'isYanhui':null,'appUserId':null,'isBack':null,'vipName':null,'batchNo':null,'vipPhone':null,'actualPayAmount':null,'resvDate':null,'perPrice':null,'tableNo':null,'tableAreaName':null},
        templateUrl: 'templates/back-order.html',
        controller: 'backOrderCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/backOrderCtrl.js'])
          }]
        }
      })
      .state('clueDetail', {
        url: '/clueDetail',
        params:{'keyNo':null,type:null},
        templateUrl: 'templates/clueDetail.html',
        controller: 'clueDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueDetailCtrl.js'])
          }]
        }
      })
      .state('clueRemind', {
        url: '/clueRemind',
        params:{'keyNo':null,'type':null,'remindId':null,'resvOrder':null},
        templateUrl: 'templates/clueRemind.html',
        controller: 'clueRemindCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueRemindCtrl.js'])
          }]
        }
      })
      .state('clueMarketerList', {
        url: '/clueMarketerList',
        params:{'keyNo':null,'status':null,'statusName':null},
        templateUrl: 'templates/clueMarketerList.html',
        controller: 'clueMarketerListCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueMarketerListCtrl.js'])
          }]
        }
      })
      .state('marketerList', {
        url: '/marketerList',
        params:{'vipId':null,'appUserId':null},
        templateUrl: 'templates/marketerList.html',
        controller: 'marketerListCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/marketerListCtrl.js'])
          }]
        }
      })
      .state('todayRemind', {
        url: '/todayRemind',
        templateUrl: 'templates/todayRemind.html',
        controller: 'todayRemindCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/todayRemindCtrl.js'])
          }]
        }
      })
      .state('wechatVip', {
        url: '/wechatVip',
        templateUrl: 'templates/wechat-vip.html',
        controller: 'wechatVipCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/wechat-vipCtrl.js'])
          }]
        }
      })
      .state('wechatData', {
        url: '/wechatData',
        templateUrl: 'templates/wechat-data.html',
        controller: 'wechatDataCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/wechat-dataCtrl.js'])
          }]
        }
      })
      .state('wechatMeetingData', {
        url: '/wechatMeetingData',
        templateUrl: 'templates/wechat-meetingData.html',
        controller: 'wechatMeetingDataCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/wechat-meetingDataCtrl.js'])
          }]
        }
      })
      .state('wechatDetail', {
        url: '/wechatDetail',
        templateUrl: 'templates/wechat-detail.html',
        controller: 'wechatDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/wechat-detailCtrl.js'])
          }]
        }
      })
      .state('webShare', {
        url: '/webShare',
        cache: false,
        templateUrl: 'templates/web-share.html',
        controller: 'webShareCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/web-shareCtrl.js'])
          }]
        }
      })
      .state('vipList', {
        url: '/vipList',
        params:{'createTime':null},
        templateUrl: 'templates/vipList.html',
        controller: 'vipListCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/vipListCtrl.js'])
          }]
        }
      })
      .state('clueRecord', {
        url: '/clueRecord',
        params:{'keyNo':null},
        templateUrl: 'templates/clueRecord.html',
        controller: 'clueRecordCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueRecordCtrl.js'])
          }]
        }
      })
      .state('clueNew', {
        url: '/clueNew',
        templateUrl: 'templates/clueNew.html',
        controller: 'clueNewCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/clueNewCtrl.js'])
          }]
        }
      })
      .state('Ybook', {
        url: '/Ybook',
        params:{'type':null,'mealTypeId':null,'back':null,'resvStartTime':null,'resvEndTime':null,'mealTypeName':null,'seatDataFor':null,'keyNo':null,'resvDate':null,'vipPhone':null,'man':null,'ytype':null,'vipName':null,'resvMeetingOrderType':null,'resvTableNum':null,'backupTableNum':null,'resvAmount':null,'vipStatus':null},

        templateUrl: 'templates/tab-dash-Ybook.html',
        controller: 'DashYBookCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/dashYBookCtrl.js'])
          }]
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/chatsCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.ranking', {
        url: '/ranking',
        views: {
          'tab-ranking': {
            templateUrl: 'templates/tab-ranking.html',
            controller: 'rankingCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/rankingCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.chats-detail',{
        url:'/ranking/detail',
        params:{'businessId':null, 'qryType':null, 'qryType2':null,starttime:null, endtime:null},
        views: {
          'tab-ranking': {
            templateUrl: 'templates/tab-chats-detail.html',
            controller: 'ChatsDetailCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/chatsDetailCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.chats-cdetail',{
        url:'/chats/cdetail',
        params:{'type':null,'time':null,starttime:null, endtime:null},
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats-cdetail.html',
            controller: 'ChatscDetailCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/chatscDetailCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.chats-odetail',{
        url:'/chats/odetail',
        params:{'type':null,'time':null,starttime:null, endtime:null},
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats-odetail.html',
            controller: 'ChatsoDetailCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/chatsoDetailCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-message',{
        url:'/account/message',
        views:{
          'tab-account':{
            templateUrl:'templates/account-message.html',
            controller:'AccountMessageCtrl'
          }
        }
      })
      .state('tab.account-message-detail',{
        url:'/account/message/messageDetail',
        views:{
          'tab-account':{
            templateUrl:'templates/account-message-detail.html',
            controller:'AccountMessageDetailCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountMessageDetailCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.dash-message-detail',{
        url:'/dash/message/messageDetail',
        views:{
          'tab-dash':{
            templateUrl:'templates/account-message-detail.html',
            controller:'AccountMessageDetailCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountMessageDetailCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-set',{
        url:'/account/set',
        views:{
          'tab-account':{
            templateUrl:'templates/account-set.html',
            controller:'AccountSetCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountSetCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-set-aboutUs',{
        url:'/account/set/aboutUs',
        views:{
          'tab-account':{
            templateUrl:'templates/account-set-aboutUs.html',
            controller:'aboutUsCtrl'
          }
        }
      })
      .state('tab.account-vip-recharge',{
        url:'/account/vip/recharge',
        views:{
          'tab-account':{
            templateUrl:'templates/account-vip-recharge.html',
            controller:'RechargeCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load(['js/controllers/rechargeCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.privacyStatement',{
        url:'/account/set/privacyStatement',
        views:{
          'tab-account':{
            templateUrl:'templates/account-set-privacyStatement.html',
            controller:'privacyStatementCtrl'
          }
        }
      })
      .state('tab.userAgreements',{
        url:'/account/set/userAgreements',
        views:{
          'tab-account':{
            templateUrl:'templates/account-set-userAgreements.html',
            controller:'userAgreementsCtrl'
          }
        }
      })
      .state('tab.account-set-sidedish',{
        url:'/account/set/sidedish',
        views:{
          'tab-account':{
            templateUrl:'templates/account-set-sidedish.html',
            controller:'SidedishCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/sidedishCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-person',{
        url:'/account/person',
        views:{
          'tab-account':{
            templateUrl:'templates/account-person.html',
            controller:'AccountPersonCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountPersonCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-person-userHotel',{
        url:'/account/person/userHotel',
        views:{
          'tab-account':{
            templateUrl:'templates/account-person-userHotel.html',
            controller:'AccountPersonHotelCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountPersonHotelCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-person-userTag',{
        url:'/account/person/userTag',
        views:{
          'tab-account':{
            templateUrl:'templates/account-person-userTag.html',
            controller:'AccountPersonTagCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountPersonTagCtrl.js'])
              }]
            }
          }
        }
      })
      .state('myCustom',{
        params:{'id':null},
        url:'/myCustom',
        templateUrl:'templates/myCustom.html',
        controller:'MyCustomCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myCustomCtrl.js'])
          }]
        }
      })
      .state('myCustomValue',{
        params:{'id':null,'type':null,'name':null,'qryType':null},
        url:'/myCustom/value',
        templateUrl:'templates/myCustomValue.html',
        controller:'myCustomValueCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myCustomValueCtrl.js'])
          }]
        }
      })
      .state('myCustomCunjiu',{
        params:{},
        url:'/myCustom/cunjiu',
        templateUrl:'templates/myCustomCunjiu.html',
        controller:'myCustomCunjiuCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myCustomCunjiuCtrl.js'])
          }]
        }
      })
      .state('myCustomInfoCunjiu',{
        params:{'phone': null, 'type3':null},
        url:'/myCustom/infoCunjiu',
        templateUrl:'templates/myCustom-info-cunjiu.html',
        controller:'myCustomInfoCunjiuCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myCustomInfoCunjiuCtrl.js'])
          }]
        }
      })
      .state('myCustomInfoCard',{
        params:{'memberID': null},
        url:'/myCustom/infoCard',
        templateUrl:'templates/myCustom-info-card.html',
        controller:'myCustomInfoCardCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
            return $ocLazyLoad.load(['js/controllers/myCustomInfoCardCtrl.js'])
          }]
        }
      })
      .state('myCustomInfoCunjiuLog',{
        params:{'phone': null},
        url:'/myCustom/infoCunjiuLog',
        templateUrl:'templates/myCustom-info-cunjiu-log.html',
        controller:'myCustomInfoCunjiuLogCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myCustomInfoCunjiuLogCtrl.js'])
          }]
        }
      })
      .state('myCustomSour',{
        params:{'type':null,'arr':null},
        url:'/myCustom/sour',
        templateUrl:'templates/myCustomSour.html',
        controller:'myCustomSourCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/myCustomSourCtrl.js'])
          }]
        }
      })
      .state('myCustom-detail',{
        url:'/myCustom/detail/:detailId',
        params:{'type':null,'all':null},
        templateUrl:'templates/myCustom-detail.html',
        controller:'AccountMyCustomDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomDetailCtrl.js'])
          }]
        }
      })
      .state('myCustom-info',{
        url:'/myCustom/info',
        params:{'vipId':null,'isYan':null},
        templateUrl:'templates/myCustom-info.html',
        controller:'AccountMyCustomInfoCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoCtrl.js'])
          }]
        }
      })
      .state('myCustom-info-record',{
        url:'/myCustom/info/record',
        params:{'vipId':null,'type':null,'appUserId':null},
        templateUrl:'templates/myCustom-info-record.html',
        controller:'AccountMyCustomInfoRecordCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoRecordCtrl.js'])
          }]
        }
      })
      .state('myRank-info-record',{
        url:'/myCustom/info/rankRecord',
        params:{'qryType':null,'type':null,'appUserId':null,'starttime':null,'endtime':null},
        templateUrl:'templates/myRank-info-record.html',
        controller:'AccountMyRankInfoRecordCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyRankInfoRecordCtrl.js'])
          }]
        }
      })
      .state('myCustom-info-detail',{
        url:'/myCustom/info/detail',
        params:{'vipId':null},
        templateUrl:'templates/myCustom-info-detail.html',
        controller:'AccountMyCustomInfoDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoDetailCtrl.js'])
          }]
        }
      })
      .state('myCustom-tag',{
        url:'/myCustom/info/tag',
        params:{'tag':null,'vipId':null},
        templateUrl:'templates/myCustom-info-tag.html',
        controller:'AccountMyCustomInfoTagCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoTagCtrl.js'])
          }]
        }
      })
      .state('myCustom-hobby',{
        url:'/myCustom/info/hobby',
        params:{'hobby':null,'vipId':null},
        templateUrl:'templates/myCustom-info-hobby.html',
        controller:'AccountMyCustomInfoHobbyCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoHobbyCtrl.js'])
          }]
        }
      })
      .state('myCustom-day',{
        url:'/myCustom/info/day',
        params:{'vipId':null, 'showEdit': false},
        templateUrl:'templates/myCustom-info-day.html',
        controller:'AccountMyCustomInfoDayCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoDayCtrl.js'])
          }]
        }
      })
      .state('myCustom-detest',{
        url:'/myCustom/info/detest',
        params:{'detest':null,'vipId':null},
        templateUrl:'templates/myCustom-info-detest.html',
        controller:'AccountMyCustomInfoDetestCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyCustomInfoDetestCtrl.js'])
          }]
        }
      })
      .state('myOrderTuan',{
        url:'/account/myOrder-tuan',
        params:{},
        templateUrl:'templates/myOrder-tuan.html',
        controller:'AccountMyOrderTuanCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderTuanCtrl.js'])
          }]
        }
      })
      .state('myOrderTuanDetail',{
        url:'/account/myOrder-tuan-detail',
        params:{'resvOrder':null, 'status':null},
        templateUrl:'templates/myOrder-tuan-detail.html',
        controller:'AccountMyOrderTuanDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderTuanDetailCtrl.js'])
          }]
        }
      })
      .state('myOrder',{
        url:'/account/myOrder',
        params:{'type':null,'getOrderData':null,'orderList':null},
        templateUrl:'templates/myOrder.html',
        controller:'AccountMyOrderCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderCtrl.js'])
          }]
        }
      })
      .state('myOrder-cDetail',{
        params:{'type':null,'seat':null,'date':null,'ctype':null,'ctypeid':null,'isChangeTable':null,'mealTypeIdA':null,'mealTypeIdB':null,'seatDetail':null,'resvStartTime':null,'resvEndTime':null,'resvOrder':null,'seatDataFor':null,'getOrderData':null,'orderList':null,'arr':null,'tableAreaName':null,'tableNo':null,'resvStartTime':null,'resvEndTime':null,'desttime':null, 'resvOrders': null, 'isKuaTian': null, 'isSubmitOrder': null,'submitId':null},
        cache:false,
        url:'/myOrder/cDetail',
        templateUrl:'templates/myOrder-cDetail.html',
        controller:'AccountMyOrderCDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderCDetailCtrl.js'])
          }]
        }
      })
      .state('myOrder-cDetail-pic',{
        url:'/myOrder/cDetail/pic',
        params:{'url':null,'resvOrder':null,'type3':null, 'orderId':null},
        templateUrl:'templates/myOrder-cDetail-pic.html',
        controller:'AccountMyOrderCDetailPicCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderCDetailPicCtrl.js'])
          }]
        }
      })
      .state('myOrder-yDetail',{
        params:{'type':null,'seat':null,'back':null,'date':null,'ytype':null,'ytype1':null,'ytypeid':null,'seatDetail':null,'resvStartTime':null,'resvEndTime':null,'resvOrder':null,'batchNo':null,'seatDataFor':null,'getOrderData':null,'orderList':null,'arr':null,'tableAreaName':null,'tableNo':null,'maxNum':null,'keyNo':null,'resvDate':null,'vipPhone':null,'man':null,'ytype':null,'vipName':null,'resvMeetingOrderType':null,'resvTableNum':null,'backupTableNum':null,'resvAmount':null,'vipStatus':null,'goBack':null},
        url:'/myOrder/yDetail',
        templateUrl:'templates/myOrder-yDetail.html',
        controller:'AccountMyOrderYDetailCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderYDetailCtrl.js'])
          }]
        }
      })
      .state('myOrder-yDetail-main',{
        params:{'tablename':null,'resvDate':null,'mealTypeId':null,'tableId':null,'back':null,'resvStartTime':null},
        url:'/myOrder/yDetail/main',
        templateUrl:'templates/myOrder-yDetail-main.html',
        controller:'AccountMyOrderYDetailMainCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderYDetailMainCtrl.js'])
          }]
        }
      })
      .state('myOrder-yDetail-lock',{
        params:{'resvOrder': null,'resvDate':null,'mealTypeId':null,'mealTypeName':null,'tableId':null,'tableName':null,'resvMeetingOrderTypeName':null},
        url:'/myOrder/yDetail/lock',
        templateUrl:'templates/myOrder-yDetail-lock.html',
        controller:'AccountMyOrderYDetailLockCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderYDetailLockCtrl.js'])
          }]
        }
      })
      .state('myOrder-yDetail-lockList',{
        params:{'resvOrder': null,'resvDate':null,'mealTypeId':null,'mealTypeName':null,'tableId':null,'tableName':null,'resvMeetingOrderTypeName':null},
        url:'/myOrder/yDetail/lockList',
        templateUrl:'templates/myOrder-yDetail-lockList.html',
        controller:'AccountMyOrderYDetailLockListCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderYDetailLockListCtrl.js'])
          }]
        }
      })
      .state('myOrder-yDetail-settle', {
        url: '/myOrder/yDetail/settle',
        params:{'order':null},
        templateUrl: 'templates/myOrder-yDetail-settle.html',
        controller: 'accountMyOrderYDetailSettleCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyOrderYDetailSettleCtrl.js'])
          }]
        }
      })
      .state('myOrder-yDetail-order',{
        params:{'resvStatus':null},
        url:'/yOrder',
        templateUrl:'templates/myOrder-yDetail-order.html',
        controller:'AccountMyYOrderCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/accountMyYOrderCtrl.js'])
          }]
        }
      })
      .state('myOrder-state-change',{
        url:'/myOrder/stateChange',
        templateUrl:'templates/myOrder-state-change.html',
        controller:'AccountMyOrderStateChangeCtrl'
      })
      .state('tab.dash-contact', {
        url: '/dash/contact',
        views: {
          'tab-dash': {
            templateUrl: 'templates/contact.html',
            controller: 'contactUsCtrl'
          }
        }
      })
      .state('tab.account-contact-he', {
        params: {'type': null},
        url: '/account/contact-he',
        views: {
          'tab-account': {
            templateUrl: 'templates/contact-he.html',
            controller: 'contactUsHeCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/contactUsHeCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.dash-contact-he', {
        params: {'type': null},
        url: '/dash/contact-he',
        views: {
          'tab-dash': {
            templateUrl: 'templates/contact-he.html',
            controller: 'contactUsHeCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/contactUsHeCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-contact-you', {
        url: '/account/contact-you',
        views: {
          'tab-account': {
            templateUrl: 'templates/contact-you.html',
            controller: 'contactUsYouCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/contactUsYouCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-list', {
        url: '/account/account-list',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-list.html',
            controller: 'AccountListCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/accountListCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-vip', {
        url: '/account/account-vip',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-vip.html',
            controller: 'AccountVipCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load(['js/controllers/accountVipCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-vip-card', {
        url: '/account/account-vip-card',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-vip-card.html',
            controller: 'AccountVipCardCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load(['js/controllers/accountVipCardCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-vip-preview', {
        url: '/account/account-vip-preview',
        params:{'num':null},
        views: {
          'tab-account': {
            templateUrl: 'templates/account-vip-preview.html',
            controller: 'AccountVipPreviewCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load(['js/controllers/accountVipPreviewCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-vip-card-sms', {
        url: '/account/account-vip-card-sms',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-vip-card-sms.html',
            controller: 'AccountVipCardSmsCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load(['js/controllers/accountVipCardSmsCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.dash-youjiang', {
        url: '/dash/youjiang',
        views: {
          'tab-dash': {
            templateUrl: 'templates/youjiang.html',
            controller: 'youjiangCtrl'
          }
        }
      })
      .state('tab.dash-form', {
        url: '/dash/form',
        views: {
          'tab-dash': {
            templateUrl: 'templates/form.html',
            controller: 'formCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/formCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.dash-formdd', {
        url: '/dash/formdd',
        views: {
          'tab-dash': {
            templateUrl: 'templates/formdd.html',
            controller: 'formddCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/formddCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.dash-formEnroll', {
        url: '/dash/formEnroll',
        views: {
          'tab-dash': {
            templateUrl: 'templates/formEnroll.html',
            controller: 'formEnrollCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/formEnrollCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.dash-formJixian', {
        url: '/dash/formJixian',
        views: {
          'tab-dash': {
            templateUrl: 'templates/formJixian.html',
            controller: 'formJixianCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/formJixianCtrl.js'])
              }]
            }
          }
        }
      })
      .state('tab.account-youjiang', {
        url: '/account/youjiang',
        views: {
          'tab-account': {
            templateUrl: 'templates/youjiang.html',
            controller: 'youjiangCtrlNew'
          }
        }
      })
      .state('tab.account-form', {
        url: '/account/form',
        views: {
          'tab-account': {
            templateUrl: 'templates/form.html',
            controller: 'formCtrlNew'
          }
        }
      })
      .state('tab.dash-guanggao', {
        url: '/dash/guanggao',
        views: {
          'tab-dash': {
            templateUrl: 'templates/guanggao.html',
            controller: 'guanggaoCtrl'
          }
        }
      })
      .state('tab.account-contact-yi', {
        url: '/account/contact-yi',
        views: {
          'tab-account': {
            templateUrl: 'templates/contact-yi.html',
            controller: 'contactUsYiCtrl',
            resolve: {
              loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                  return $ocLazyLoad.load(['js/controllers/contactUsYiCtrl.js'])
              }]
            }
          }
        }
      })
      .state('wechatCode', {
        url: '/wechatCode',
        templateUrl:'templates/wechat-code.html',
        controller:'wechatCodeCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad){
              return $ocLazyLoad.load(['js/controllers/wechatCodeCtrl.js'])
          }]
        }
      })
      .state('shopping',{
        url:'shopping',
        params:{'num':null},
        templateUrl:'templates/shopping.html',
        controller: 'shopCtrl'
      })
      .state('shoppingBuy',{
        url:'shopping/buy',
        params:{'price':null, 'num':null,'bAddress':null, 'fAddress':null},
        templateUrl:'templates/shopping-buy.html',
        controller: 'shopBuyCtrl'
      })
      .state('shoppingAdd',{
        url:'shopping/Add',
        templateUrl:'templates/shoppingAdd.html',
        controller: 'selectAddCtrl'
      })
      .state('AddAdd',{
        url:'shopping/Add/Add',
        templateUrl:'templates/shoppingAddAdd.html',
        controller: 'AddAddCtrl'
      })
      .state('AddAddF',{
        url:'shopping/Add/AddF',
        templateUrl:'templates/shoppingAddAddF.html',
        controller: 'AddAddFCtrl'
      })
      .state('shoppingAddT',{
        url:'shopping/AddT',
        templateUrl:'templates/shoppingAddT.html',
        controller: 'selectAddTCtrl'
      })
      .state('shopOrder',{
        url:'shopping/order',
        templateUrl:'templates/shoppingOrder.html',
        controller: 'shopOrderCtrl'
      })
      .state('otherOrder',{
        url:'shopping/otherRrder',
        templateUrl:'templates/otherOrder.html',
        controller: 'otherOrderCtrl'
      })
      .state('shopSubmit',{
        url:'shopping/submit',
        params:{'orderNo':null,'daifu':null},
        templateUrl:'templates/shopSubmit.html',
        controller: 'shopSubmitCtrl'
      })
      .state('shoppingAddF',{
        url:'shopping/AddF',
        templateUrl:'templates/shoppingAddF.html',
        controller: 'selectAddFCtrl'
      })
      .state('shopOrderDetail',{
        url:'shopping/order/detail',
        params:{'orderNo':null},
        templateUrl:'templates/shopOrderDetail.html',
        controller: 'shopOrderDetailCtrl'
      })
      // 首次启动应用引导页
      .state('tour', {
        url: '/tour',
        templateUrl: 'templates/tour/tour.html',
        controller: 'TourCtrl'
      })
    ;

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/tab/dash');

  });
