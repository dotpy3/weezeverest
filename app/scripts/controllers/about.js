'use strict';

/**
 * @ngdoc function
 * @name transApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the transApp
 */
angular.module('transApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
