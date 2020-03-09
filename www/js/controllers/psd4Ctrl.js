angular.module('starter.controllers.psd4Ctrl', []).controller('psd4Ctrl', function ($scope, $T, $translate) {
  $scope.chiness = function () {
    $translate.use('cn');
    localStorage['lang'] = 'cn';
    window.location.reload();
  };
  $scope.english = function () {
    $translate.use('en');
    localStorage['lang'] = 'en';
    window.location.reload();
  };
  if ($translate.use() == 'cn') {
    $scope.cur_lang = true;
  } else {
    $scope.cur_lang = false;
  }
})