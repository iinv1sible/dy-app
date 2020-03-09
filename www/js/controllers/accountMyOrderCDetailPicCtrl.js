angular.module('starter.controllers.accountMyOrderCDetailPicCtrl', []).controller('AccountMyOrderCDetailPicCtrl', function ($scope, $ionicLoading, $http, $httpPsd, $httpOrder, $ionicPopup, $showAlert, $log, $qupload, $stateParams, $T) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    // viewData.enableBack = false;
    $scope.info = JSON.parse(localStorage['info']);
    if (($scope.info.operationType == 1) || ($stateParams.orderId == $scope.info.id) || $scope.info.appOperationSet.indexOf(6) > -1) {
      $scope.peicai = true;
    } else {
      $scope.peicai = false;
    }
    $scope.takePicData = {'scope': 'peicai'};
    $httpPsd.takePic($scope.takePicData, $scope.takePicSuccess, $scope.error);
    if ($stateParams.url) {
      $scope.imgSrc = $stateParams.url;
      $scope.shareimgSrc = $scope.imgSrc.slice(0, $scope.imgSrc.indexOf("?"));
      console.log($scope.shareimgSrc);
    } else {
      $scope.imgSrc = '';
      $scope.shareimgSrc = '';
    }
    $scope.resvOrder = $stateParams.resvOrder;
    $scope.type3 = $stateParams.type3;
  });
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.takePicSuccess = function (data) {
    $scope.uploadToken = data.uploadToken;
    console.log($scope.uploadToken);
  };
  $scope.selectFiles = [];
  var start = function (index) {
    $scope.selectFiles[index].progress = {
      p: 0
    };
    $scope.selectFiles[index].upload = $qupload.upload({
      key: '',
      file: $scope.selectFiles[index].file,
      token: $scope.uploadToken
    });
    $scope.selectFiles[index].upload.then(function (response) {
      $log.info(response);
      console.log($scope.selectFiles);
      $scope.imgSrc = 'http://qiniu.zhidianfan.com/' + response.hash + '?imageMogr2/auto-orient/thumbnail/600x/blur/1x0/quality/75|watermark/1/image/aHR0cDovL3d3dy56aGlkaWFuZmFuLmNvbS9pbWFnZXMvTE9HTy5wbmc=/dissolve/100/gravity/NorthWest/dx/10/dy/10|imageslim';
      $scope.shareimgSrc = 'http://qiniu.zhidianfan.com/' + response.hash;
      $scope.changePicData = {
        "picUrl": $scope.imgSrc,
        "resvOrder": $scope.resvOrder
      };
      $httpOrder.changePic($scope.changePicData, $scope.changePicSuccess, $scope.error);
    }, function (response) {
      $log.info(response);
    }, function (evt) {
      $scope.selectFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.abort = function (index) {
    $scope.selectFiles[index].upload.abort();
    $scope.selectFiles.splice(index, 1);
  };

  $scope.onFileSelect = function ($files) {
    /*var offsetx = $scope.selectFiles.length;
    for (var i = 0; i < $files.length; i++) {
      $scope.selectFiles[i + offsetx] = {
        file: $files[i]
      };
      $scope.showLoading();
      start(i + offsetx);
    }*/
    $scope.selectFiles[1] = {
      file: $files[0]
    };
    //start(1);
    console.log($scope.selectFiles[1].file);
    $scope.minusImg($scope.selectFiles[1].file);
  };
  $scope.changePicSuccess = function (data) {
    $ionicLoading.hide();
    $showAlert.alert(data.msgMessage);
  };
  $scope.minusImg = function (file) {
    // 压缩图片需要的一些元素和对象
    var reader = new FileReader(), img = new Image();
    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    // 缩放图片需要的canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    // base64地址图片加载完毕后
    img.onload = function () {
      // 图片原始尺寸
      var originWidth = this.width;
      var originHeight = this.height;
      // 最大尺寸限制
      var maxWidth = 400, maxHeight = 600;
      // 目标尺寸
      var targetWidth = originWidth, targetHeight = originHeight;
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }

      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      // canvas转为blob并上传
      canvas.toBlob(function (blob) {
        console.log(blob);
        $scope.selectFiles[1].file = blob;
        start(1);
      }, file.type || 'image/png');
    };
  }
  $scope.error = function (data) {
    $ionicLoading.hide();
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
  /////////////////////////////////////////////////////////////
  /////////////////////微信////////////////////////////////////////////////////
  $scope.weixin = function () {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: "er-popup",
      title: $T.T('易订'),
      template: $T.T('是否要分享到微信'),
      buttons: [
        {
          text: $T.T('确认'),
          type: 'button-assertive',
          onTap: function () {
            wx.miniProgram.getEnv(function(res) {
              if(res.miniprogram){
                var postData = {
                  username: $scope.info.username,
                  txt: $scope.shareimgSrc
                };
                wx.miniProgram.postMessage({ data: postData });
                wx.miniProgram.navigateTo({
                  url: '../empty/index?txt=' + encodeURIComponent($scope.shareimgSrc) + '&username=' + $scope.info.username
                })
              }
            })
            Wechat.isInstalled(function (installed) {
              Wechat.share({
                text: $scope.shareimgSrc,
                scene: 0   // share to Timeline
              }, function () {
                $showAlert.alert('分享成功');
              }, function (reason) {
                $showAlert.alert(`${$T.T('失败')}: ` + reason);
              });
            }, function (reason) {
              $showAlert.alert(`${$T.T('失败')}: ` + reason);
            });
          }
        },
        {
          text: $T.T('取消'),
          type: 'button-positive',
          onTap: function () {
            console.log('拒绝分享');
          }
        }
      ]
    });
  };
  ////////////////////////////////////////////////////////////////////////////
})
