(function() {
  "use strict";

  angular
    .module("app")
    .controller('ServicesController', ServicesController);

    ServicesController.$inject = ['$http'];

    function ServicesController ($http) {
      var vm = this;
      //easier for angular to loop through an empty array
      vm.all = [];

    // http does same thing as $ajax
    // this string is the endpoint we want
    $http.get("http://localhost:3000/services")
        .then(function(response) {
          //response.data is an object
          vm.all = response.data.services;
          // console.log(response)
          console.log(response.data.services)
          //this is a catch function that says
          //if there is an error log an error
        }, function(err) {
          console.log(err);
        })

    vm.addService = addService;
    vm.removeService = removeService;
    vm.newService = {};
    vm.removeService = removeService;
    vm.updateStatus = updateStatus;

    function addService(){
      $http
      .post("http://localhost:3000/services",
        vm.newService)
      //if ending at .then, this would be enough to send data to server
      //but not the browser which is why we need push
      .then(function(response){
        vm.all.push(response.data.service);
        //clears it
        vm.newService = {};
     });

    }
    function removeService(service) {
      //this first step is good enough for a back end call
      //refresh the page and a criminal is gone
      //we need splice to update the UI
      $http.delete("http://localhost:3000/services/" + service._id)
      .then(function(){
       vm.all.splice(vm.all.indexOf(service), 1)
    })
   }
     function updateStatus(service) {
      if (service.status == "cleaning") {
        service.status = "web dev";
      } else if (service.status == "web dev") {
        service.status = "photography"
      } else {
        service.status = "cleaning"
      }


           $http.patch("http://localhost:3000/services/"+service._id,
        service)
        .then(function(response) {

        }, function(error) {
          console.log(error)
        })
    }
  }
})();
