(function() {
  "use strict";

  angular
    .module("app")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"];

  function appRoutes($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state("welcome", {
        url:         "/",
        templateUrl: "/js/welcome.html"
      })
      .state("signin", {
        url:          "/signin",
        templateUrl:  "/js/signin.html",
        controller:   "SignInController",
        controllerAs: "vm"
      })
      .state("profile", {
        url:         "/profile",
        templateUrl: "/js/profile.html",
        controller:   "ProfilesController",
        controllerAs: "profiles"
      })
      .state("services", {
        url:          "/services",
        templateUrl:  "/js/services/service.html",
        controller:   "ServicesController",
        controllerAs: "services"
      })
      .state("usertype", {
        url:          "/user-type",
        templateUrl:  "/js/services/user.type.html"
      })
       .state("hire", {
        url:          "/hire",
        templateUrl:  "/js/services/hire.html",
        controller:   "ServicesController",
        controllerAs: "services"

      });


    $urlRouterProvider.otherwise("/");
  }

})();
