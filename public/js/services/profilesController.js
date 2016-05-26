(function() {
  "use strict";

  angular
    .module("app")
    .controller('ProfilesController', ProfilesController);

    ProfilesController.$inject = ['$http', 'tokenService'];

    function ProfilesController ($http, tokenService) {
      var vm = this;
      //easier for angular to loop through an empty array
      vm.myServices = [];
      vm.name = "";
      vm.token = tokenService.decode();

    // http does same thing as $ajax
    // this string is the endpoint we want

    $http.get("http://localhost:3000/services")
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
      $http.delete("http://localhost:3000/services/" + service._id)
      .then(function(){
       vm.myServices.splice(vm.myServices.indexOf(service), 1)
    })
   }

  }
})();
