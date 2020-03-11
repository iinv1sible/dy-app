app.anxinQualificationController = function($scope, $location, $routeParams) {
  $scope.shopId = $routeParams.shopId
  $scope.imgs = [
    "/images/slider4.jpg",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
    "/images/icon_logo@3x.png",
  ];
  $scope.back = ()=>{
    history.back();  
  }
};
