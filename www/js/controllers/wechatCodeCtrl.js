angular.module('starter.controllers.wechatCodeCtrl', []).controller('wechatCodeCtrl', function ($scope, $httpPsd, $showAlert, $state) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    $scope.isMiniProgram = false
    $scope.codeImg = ''
    $scope.codeUrl = ''
    $scope.canDownload = true

    try{
      if(!cordova){
        $scope.canDownload = false
      }else{
        if(!cordova.plugins.photoLibrary){
          $scope.canDownload = false
        }
      }
    }catch(err){
      $scope.canDownload = false
    }
      
    $httpPsd.getAccessToken(function(tokenData){
      var params = {
        token: tokenData.access_token,
        phone: $scope.info.username
      }
      $httpPsd.getCodeUrl(params, function(data){
        if(data.code==200){
          $scope.codeImg = data.dataUrl
          $scope.codeUrl = data.url
        }else{
          $showAlert.alert(data.msg || '二维码请求失败');
        }
      },function(err){
        $showAlert.alert('二维码请求失败');
      })
    });

    wx.miniProgram.getEnv(function(res) {
      if(res.miniprogram){
        $scope.isMiniProgram = true
      }
    })
  })

  $scope.saveImage = function() {
    cordova.plugins.photoLibrary.requestAuthorization(function () {
      // cordova.plugins.photoLibrary.getLibrary(function (library) {
      //   alert(JSON.stringify(library))
        //var url = 'file:///...'; // file or remote URL. url can also be dataURL, but giving it a file path is much faster
        cordova.plugins.photoLibrary.saveImage($scope.codeImg, '易订', function (libraryItem) {
          $showAlert.alert('保存成功');
        }, function (err) {
          $showAlert.alert('保存失败');
        });
      // },function (err) {
      //   if (err.startsWith('Permission')) {
          
      //   }
      //   alert('权限'+err);
      // });
    },
    function (err) {
        // User denied the access 
          $showAlert.alert('用户拒绝访问');
    }, // if options not provided, defaults to {read: true}. 
    {
        read: true,
        write: true
    });
  }
})