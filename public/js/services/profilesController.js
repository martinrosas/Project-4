(function() {
  "use strict";

  angular
    .module("app")
    .controller('ProfilesController', ProfilesController);

    ProfilesController.$inject = ['$http', 'tokenService', 'authService'];

    function ProfilesController ($http, tokenService, authService) {
      var vm = this;
      //easier for angular to loop through an empty array
      vm.myServices = [];
      vm.name = "";
      vm.token = tokenService.decode();
      vm.authService = authService;

    // http does same thing as $ajax
    // this string is the endpoint we want

    $http.get("/services")
        .then(function(response) {
          //response.data is an object

          vm.name = response.data.names[vm.token._id]
          vm.myServices = response.data.services.filter(function(service) {
            return service.userId == vm.token._id;
          });
        }, function(err) {
          console.log(err);
        })
    vm.removeService = removeService;


    function removeService(service) {
      //this first step is good enough for a back end call
      //refresh the page and a criminal is gone
      //we need splice to update the UI
      $http.delete("/services/" + service._id)
      .then(function(){
       vm.myServices.splice(vm.myServices.indexOf(service), 1)
    })
   }

  }
})();
