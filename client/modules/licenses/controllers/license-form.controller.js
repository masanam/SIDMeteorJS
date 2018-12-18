'use strict';

angular.module('licenses').controller('LicenseFormController',['$scope', '$filter','$rootScope', '$reactive', 'LicensesTypes', 'LicensesGov', 'SIMPERTypes','DateSimper',
  function($scope, $filter, $rootScope, $reactive, LicensesTypes, LicensesGov, SIMPERTypes, DateSimper) {
    $reactive(this).attach($scope);

    $scope.select = {};
    $scope.detail = {};

    $scope.dateUntil = [];

    $scope.init = () => {
      $scope.select.licenseTypes = LicensesTypes;
      $scope.select.licenseGov = LicensesGov;
      $scope.select.simperTypes = SIMPERTypes;
    };

    $scope.datePlus = (d,index) => {
      var dateNow = new Date($filter('date')(d.govdetails[index].issue, 'dd-MM-yyyy'));
      dateNow = new Date(dateNow.setHours(0,0,0,0));
      var year = dateNow.getFullYear();
      var month = dateNow.getMonth();
      var day = dateNow.getDate();
      var dateUntil = new Date(year + 4, month, day);
      $scope.dateUntil[index] = dateUntil;
      DateSimper.dateUntil($scope.dateUntil);
    };


    ////////////////
    // ARRAY USER //
    ////////////////
    $scope.addNewLicense = () => {
      if(!$scope.license.details) $scope.license.details = [];
      $scope.license.details.push({

      });
    };

    $scope.deleteLicense = (index) => {
      $scope.license.details.splice(index,1);
    };

     //////////////
    // DUE DATE //
   //////////////

   $scope.dateAddYears = () => {
     var numberYearsToAdd = 4;
     $scope.license.details.simperissue = $scope.issueDate;
     $scope.license.details.simperdue = $scope.issueDate.setDate($scope.issueDate.getFullYear() + numberYearsToAdd);
     console.log($scope.issueDate);
   };
  }]);
