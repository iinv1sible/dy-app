angular.module('starter.controllers.accountSetCtrl', []).controller('AccountSetCtrl', function ($httpPsd, $cordovaFileTransfer,$cordovaFileOpener2,$rootScope,$showAlert,$ionicLoading,$ionicPopup,$timeout,$scope, $state) {
    $scope.info = $scope.info = JSON.parse(localStorage['info']);
    $scope.isYp = $scope.info.isYp == 1 ? true : false
    $scope.showSetDish = ($scope.info.appOperationSet || '').split(',').indexOf('6') >= 0;
    $scope.quit = function () {
      localStorage.removeItem('TOKEN_KEY');
      localStorage.removeItem('loginData');
      $httpPsd.getAccessToken($scope.getAccessTokenSuccess);
      $state.go('login');
    }
    $scope.update = function () {
      $httpPsd.getTags($scope.info, $scope.getTagsSuccess);
    }
    $scope.getAccessTokenSuccess = function (data) {
      $.getJSON("../chcp.json", function (data1) {
        $scope.loginData = {};
        $scope.loginData.type = 'APP';
        $scope.loginData.access_token = data.access_token;
        $scope.loginData.loginType = 'in';
        $scope.loginData.version = data1.release;
        $scope.loginData.username = $scope.info.username;
        $scope.loginData.business = $scope.info.businessName;
        $scope.loginData.businessId = $scope.info.businessId;
        // $httpPsd.devLogin($scope.loginData, $scope.devLoginSuccess);
      });
    };
    $scope.devLoginSuccess = function (data) {
      console.log(data);
    };
    $scope.getTagsSuccess = function (data) {
      if(data.code == 500){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isAndroid==true){
          $scope.myPopup = $ionicPopup.show({
            cssClass: "er-popup",
            template: "",
            title: '发现新版本,是否立即下载',
            scope: $scope,
            buttons: [
              {text: '以后再说'},
              {
                text: '<b>立即下载</b>',
                type: 'button-assertive',
                onTap: function () {
                  var permissions = cordova.plugins.permissions;
                  var list = [
                    permissions.READ_EXTERNAL_STORAGE,
                    permissions.WRITE_EXTERNAL_STORAGE
                  ];
                  permissions.hasPermission(list, checkPermissionCallback, null);

                  function error() {
                    alert('获取权限失败,请打开存储权限');
                  }

                  function checkPermissionCallback( status ) {
                    if( !status.hasPermission ) {

                      permissions.requestPermissions(
                        list,
                        function(status) {
                          if( !status.hasPermission ) {
                            error();
                          }else {
                            download();
                          }
                        },
                        error);
                    }else {
                      download();
                    }
                  }

                  function download() {
                    $rootScope.process = 0;
                    $ionicLoading.show({
                      template: '<ion-spinner icon="bubbles" class="spinner-assertive spinner spinner-bubbles"></ion-spinner><br>已经下载：{{process}}%'
                    });
                    var url = 'http://d.zhidianfan.com/yidingmobile.apk';
                    var filename = url.split("/").pop();
                    var targetPath = cordova.file.externalRootDirectory + filename; //APP下载存放的路径，可以使用cordova file插件进行相关配置
                    var trustHosts = true;
                    var options = {};
                    $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                      // 打开下载下来的APP
                      //console.log(JSON.stringify(result));

                      $cordovaFileOpener2.open(targetPath.substr(7,targetPath.length-7), 'application/vnd.android.package-archive'
                      ).then(function () {

                      }, function (err) {

                      });
                      $ionicLoading.hide();
                    }, function (err) {
                      alert('下载失败,请打开存储权限');
                    }, function (progress) {
                      //进度，这里使用文字显示下载百分比
                      $timeout(function () {
                        var downloadProgress = (progress.loaded / progress.total) * 100;
                        $rootScope.process = Math.floor(downloadProgress);
                        if (downloadProgress > 99) {
                          $ionicLoading.hide();
                        }
                      })
                    });
                  }
                }
              }
            ]
          });
        }
        if(isiOS == true){
          $showAlert.alert('请到appstore中查看');
        }
      }else {
        $showAlert.alert('暂无更新');
      }
    };

    $scope.goPage = function(page){
      $state.go(`tab.${page}`)
    }
})