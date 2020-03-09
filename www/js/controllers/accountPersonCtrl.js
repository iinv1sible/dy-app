angular.module('starter.controllers.accountPersonCtrl', []).controller('AccountPersonCtrl', function ($scope, $ionicActionSheet, $ionicPopup, $showAlert, $ionicLoading, $log, $qupload, $http, $httpPsd, $httpOrder, $operation, $T) {
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.lock = true;
    $scope.data = {};
    $scope.info = JSON.parse(localStorage['info']);
    $scope.data.userName = $scope.info.surname;
    $scope.data.userPhone = +$scope.info.username;
    $scope.data.userJob = $scope.info.appTypeName;
    if ($scope.info.imageUrl == '') {
      $scope.src = 'images/icon_avatar@3x.png';
    } else {
      $scope.src = $scope.info.imageUrl;
    }
    $scope.takePicData = {'scope': 'peicai'};
    $httpPsd.takePic($scope.takePicData, $scope.takePicSuccess, $scope.error);
  });

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
      $scope.src = 'http://qiniu.zhidianfan.com/' + response.hash + '?imageView2/1/w/100/h/100/format/jpg/q/75|imageslim';
      $scope.changePicData = {
        "imageUrl": $scope.src,
        "appUserId": $scope.info.id
      };

      $httpOrder.changeUserPic($scope.changePicData, $scope.changePicSuccess, $scope.error);
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
    var offsetx = $scope.selectFiles.length;
    for (var i = 0; i < $files.length; i++) {
      $scope.selectFiles[i + offsetx] = {
        file: $files[i]
      };
      $scope.showLoading();
      start(i + offsetx);
    }
  };
  $scope.changePicSuccess = function (data) {
    $operation.getPassword(localStorage['TOKEN_KEY'], $scope.getPassword, $scope.error);
    $showAlert.alert(data.msgMessage);
  };
  $scope.getPassword = function (data) {
    localStorage['TOKEN_KEY'] = data.token;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': data.token
      }
    };
    $http.get('https://phone.zhidianfan.com:9091' + '/user', config)
      .success(function (data) {
        localStorage.setItem('info', JSON.stringify(data));
        $ionicLoading.hide();
      })
  };
  $scope.showLoading = function () {
    $ionicLoading.show({
      template: $T.T('加载中...')
    });
  };
  $scope.error = function (data) {
    $ionicLoading.hide();
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
})