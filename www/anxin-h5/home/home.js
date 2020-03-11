app.anxinHomeController = function($scope, $location) {
  $scope.persons = [
    {
      id: 1,
      name: "张三",
      icon: "/images/icon_logo@3x.png",
      jobDesc: "菜品负责人",
      tempDesc: "<37℃",
      healthCardImg: "/images/icon_logo@3x.png"
    },
    {
      id: 2,
      name: "李四",
      icon: "/images/icon_logo@3x.png",
      jobDesc: "传菜负责人",
      tempDesc: "<37℃",
      healthCardImg: "/images/icon_logo@3x.png"
    },
    {
      id: 3,
      name: "王五",
      icon: "/images/icon_logo@3x.png",
      jobDesc: "服务员",
      tempDesc: "<37℃",
      healthCardImg: "/images/icon_logo@3x.png"
    }
  ];

  $scope.showHealthCard = person => {
    $location.path("/healthCard").search({
      personId: person.id
    });
  };

  $scope.showQualificationImgs = () => {
    $location.path("/qualification").search({
      shopId: 1
    });
  };
};
