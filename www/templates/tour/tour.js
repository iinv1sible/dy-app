angular.module('eomApp')
  .controller('TourCtrl', function ($scope,$state ,$location, $timeout) {
    // $scope.$on('$ionicView.beforeEnter',function(){
    //   localStorage['TOKEN_KEY']='';
    // });
    $scope.auto=0;
    $scope.goHome = function () {
      $scope.auto=1;
      localStorage.setItem('firstVisit', '1');
      $state.go('login');
      console.log(1);
    };
    $timeout(function () {
      localStorage.setItem('firstVisit', '1');
      if ($scope.auto==0){
        $location.url('login');
      }
    }, 5000);

    $scope.slideHasChanged = function ($index) {
      if ($scope.auto==1){
        console.log('gg');
      }else if ($index === 1) {
        $timeout(function () {
          localStorage.setItem('firstVisit', '1');
          if ($scope.auto==0){
            $location.url('login');
          }
        }, 5000);
      }
    };
  });
