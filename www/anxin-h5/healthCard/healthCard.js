app.healthCardController = function($scope, $routeParams) {
  $scope.imgs = ["/images/slider4.jpg"];
  $scope.back = () => {
    history.back();
  };
};
