app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./home/home.html",
        controller: "AnxinHomeController"
      })
      .when("/qualification", {
        templateUrl: "./qualification/qualification.html",
        controller: "AnxinQualificationController"
      })
      .when("/healthCard", {
        templateUrl: "./healthCard/healthCard.html",
        controller: "HealthCardController"
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);
