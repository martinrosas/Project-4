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
      vm.emails = {};
      vm.names = {};
      vm.sortBy = "created";
      vm.descending =true;

    // http does same thing as $ajax
    // this string is the endpoint we want

    $http.get("http://localhost:3000/services")
        .then(function(response) {
          //response.data is an object
          vm.all = response.data.services;
          vm.emails = response.data.emails;
          vm.names = response.data.names;
          console.log(vm.emails);

          // function getEmail (services) {
          //   services.forEach(function (service) {
          //     service.email = emails[service.userId]
          //     vm.emails.push(service.email)
          //   })
          // }

          // console.log(response)
             // DO THIS ON THE FRONTEND INSTEAD
      // // match the email to the userId in the service
      // services.forEach(function (service) {
      //   service.email = emails[service.userId]
      // })
          console.log(response.data.services)
          console.log(response.data.emails)
          //loop the service and get the userid and then match the user id to the email
          // set the service email property to that email

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
      if (service.status == "Cleaning") {
        service.status = "IT & Software";
      } else if (service.status == "IT & Software") {
        service.status = "Photography"
      } else if (service.status == "Photography") {
        service.status = "Writing"
      } else if (service.status == "Writing") {
        service.status = "Design"
      } else if (service.status == "Design") {
        service.status = "Data Entry"
      } else if (service.status == "Data Entry") {
        service.status = "Sales & Marketing"
      } else if (service.status == "Sales & Marketing") {
        service.status = "Business & Accounting"
      } else if (service.status == "Business & Accounting") {
        service.status = "Other"
      } else {
        service.status = "Cleaning"
      }


           $http.patch("http://localhost:3000/services/"+service._id,
        service)
        .then(function(response) {

        }, function(error) {
          console.log(error)
        })
    }

    // vm.sort = sort;
    // // vm.trimSize = trimSize;

    // function sort(service) {
    //   vm.sortBy = service;
    //   vm.descending = !vm.descending
    // }



  }
})();
