'use strict';

/**
 * @ngdoc function
 * @name transApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the transApp
 */
angular.module('transApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
	function maxfn(a,b){
		var value = a > b ? a : b;
		return value;
	}

	function percentage(maxval, data, css, total){
		var nb;
		if (total === 0 && maxval === 0){
			nb = 0
		} else if (total){
			nb = data*100/total;
		} else {
			nb = data*100/maxval;
		}
		if (css){
			return maxfn(40,nb.toFixed()) + '%';
		} else {
			return (nb.toFixed() + '%');
		}
	}

	$scope.elements = {
		'Team COURCHEVEL': {
			text: '',
			data: 0,
			width: '100px',
			name: 'Team COURCHEVEL',
		},
		'Team METABIEF': {
			text: '',
			data: 0,
			width: '100px',
			name: 'Team METABIEF',
		},
		'Team LES 2 ALPES': {
			text: '',
			data: 0,
			width: '100px',
			name: 'Team LES 2 ALPES',
		},
	}

	$scope.reload = function(){

		$http({
			method: 'GET',
			url: 'http://nemopouet.s3-eu-west-1.amazonaws.com/data.json',
		}).then(function(response){
			var data = response.data.groups, max= 0, min = undefined;
			for (var i in data){
				if (max < data[i]){
					max = data[i];
				}
				if (min === undefined || min > data[i]) {
					min = data[i];
				}
			}

			var total = data['Team COURCHEVEL'] + data['Team LES 2 ALPES'] + data['Team METABIEF'];

			angular.element('#metabief').css('width', percentage(max, data['Team METABIEF'], true));
			$scope.elements['Team METABIEF'].value = percentage(max, data['Team METABIEF'], false, total);
			angular.element('#courchevel').css('width', percentage(max, data['Team COURCHEVEL'], true));
			$scope.elements['Team COURCHEVEL'].value = percentage(max, data['Team COURCHEVEL'], false, total);
			angular.element('#deuxalpes').css('width', percentage(max, data['Team LES 2 ALPES'], true));
			$scope.elements['Team LES 2 ALPES'].value = percentage(max, data['Team LES 2 ALPES'], false, total);

			textLoop: for (var i in data){
				if (data[i] === min) {
					$scope.elements[i].text = 'Bah alors, on a décidé de rentrer tôt ?';
				}
				if (data[i] === max) {
					$scope.elements[i].text = 'Excellent ! Allez, on ne s\'arrête pas en si bon chemin !';
				}
				if (data[i] === max || data[i] === min) {
					continue textLoop;
				}
				$scope.elements[i].text = 'Moyen, très très moyen !';
			}
		});
		$timeout($scope.reload, 1000*10);
	};

	$scope.show = false;
	$scope.showToggle = function(){
		console.log('animate');
		if ($scope.show) {
			angular.element('.team-info').animate({display: 'none'});
			$timeout($scope.showToggle, 1000*9);
			$scope.show = false;
		} else {
			angular.element('.team-info').animate({display: 'initial'});
			$timeout($scope.showToggle, 1000*25);
			$scope.show = true;
		}
	};

	$scope.showToggle();

	$scope.reload();
  });
