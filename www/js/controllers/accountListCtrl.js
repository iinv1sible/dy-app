angular.module('starter.controllers.accountListCtrl', []).controller('AccountListCtrl', function ($scope, $httpWechat, $httpPsd, $showAlert, $ionicPopup) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.info = JSON.parse(localStorage['info']);
    $httpPsd.getUser(localStorage['TOKEN_KEY'], function(data){
      localStorage.setItem('info', JSON.stringify(data));
      $scope.info = JSON.parse(localStorage['info']);
      $scope.isBindWechat = false
      if($scope.info.openId || $scope.info.unionId){
        $scope.isBindWechat = true
      }
    })
  })
  $scope.goWechat = function(){
    if($scope.isBindWechat){
      $ionicPopup.confirm({
        cssClass: "er-popup",
        title: '易订',
        template: '是否要解绑微信',
        buttons: [
          {
            text: '取消'
          },
          {
            text: '确认',
            type: 'button-assertive',
            onTap: function () {
              $httpWechat.unbingWechat({
                appUserId: $scope.info.id
              }, function(data) {
                if(data.code==200){
                  $showAlert.alert('解绑成功');
                  $httpPsd.getUser(localStorage['TOKEN_KEY'], function(data){
                    localStorage.setItem('info', JSON.stringify(data));
                    $scope.info = JSON.parse(localStorage['info']);
                    $scope.isBindWechat = false
                    if($scope.info.openId || $scope.info.unionId){
                      $scope.isBindWechat = true
                    }
                  })
                }
              })
            }
          }
        ]
      });
      return false
    }
    // 小程序跳转
    wx.miniProgram.getEnv(function(res) {
      if(res.miniprogram){
        wx.miniProgram.navigateTo({
          url: '../bind/index?appUserId='+$scope.info.id+'&brandId=34'
        })
      }
    })

    // APP跳转微信登录
    Wechat.isInstalled(function (installed) {
      // 授权读取用户信息
      var scope = "snsapi_userinfo",
      state = "_" + ( + new Date());
      // 请求CODE
      Wechat.auth(scope, state, function (response) {
        // alert('code: ' + response.code)
        $httpWechat.sendWechatCode({
          brandId: 34,
          type: 3,
          code: response.code,
          appUserId: $scope.info.id
        }, function(data) {
          if(data.code==200){
            $showAlert.alert('绑定成功');
            $scope.isBindWechat = true
          }else{
            $showAlert.alert(data.msg || '绑定失败');
          }
        })
      }, function (reason) {
        $showAlert.alert(`${$T.T('失败')}: ` + reason);
      });
    }, function (reason) {
      $showAlert.alert(`${$T.T('失败')}: ` + reason);
    });
  }
})