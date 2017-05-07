angular
	.module('panda.controllers')
	.controller('HomeCtrl', function($scope,$cordovaGeolocation,$ionicPlatform,$cordovaDeviceOrientation){
		$scope.prueba = function(item) {
    console.log("click");

  }

	var options = {frequency: 1000}; // Update every 1 seconds

$scope.getHeading = function () {
	$cordovaDeviceOrientation
		.getCurrentHeading()
		.then(function (position) {
			$scope.heading = position;
		}, function (err) {
			$scope.msg = err.message;
		});

};


var obtComp = function () {
	$cordovaDeviceOrientation
		.getCurrentHeading()
		.then(function (position) {
			$scope.heading = position;
		}, function (err) {
			$scope.msg = err.message;
		});
		setTimeout(obtComp, 1000);
};


$scope.watchHeading = function () {
	$scope.this_watch = $cordovaDeviceOrientation.watchHeading(options);
	$scope.this_watch.then(
		function () {
			/* unused */
		},
		function (err) {
			$scope.msg = err.message;
		},
		function (position) {
			$timeout(function () {
				$scope.heading = position;
			});
		}
	);

};

$scope.clearWatch = function () {
	$cordovaDeviceOrientation.clearWatch($scope.this_watch.watchID);
};









	var watch;
  var watchOptions = {
    timeout : 5000,
    maximumAge: 3000,
    enableHighAccuracy: true // may cause errors if true
  };

  var pollCurrentLocation = function() {
    $cordovaGeolocation.getCurrentPosition(watchOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude

        console.log('polling lat long', lat, long);
				$scope.latitud=lat;
				$scope.longitud=long;
				//$scope.posMag=123;


        $scope.lastPollingLocation.lat = $scope.currentPollingLocation.lat;
        $scope.lastPollingLocation.long = $scope.currentPollingLocation.long;

        $scope.currentPollingLocation.lat = lat;
        $scope.currentPollingLocation.long = long;
      }, function(err) {
        // error
        console.log("polling error", err);
      });

    setTimeout(pollCurrentLocation, 1000);
  };

  var watchCurrentLocation = function() {
    watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        // error
        console.log("watch error", err);
      },
      function(position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude

        console.log('lat long', lat, long);
				$scope.latitud=lat;
				$scope.longitud=long;

        $scope.lastLocation.lat = $scope.currentLocation.lat;
        $scope.lastLocation.long = $scope.currentLocation.long;

        $scope.currentLocation.lat = lat;
        $scope.currentLocation.long = long;
    });
  };

  $scope.lastLocation = {
    lat: null,
    long: null
  };

  $scope.currentLocation = {
    lat: null,
    long: null
  };

  $scope.lastPollingLocation = {
    lat: null,
    long: null
  };

  $scope.currentPollingLocation = {
    lat: null,
    long: null
  };

  $ionicPlatform.ready(function() {
		obtComp();
    watchCurrentLocation();
    pollCurrentLocation();

  });
  $scope.$on("$destroy", function() {
    if (watch) {
      watch.clearWatch();
    }
	  if($scope.this_watch){
			$scope.clearWatch();
		}
  });
	});
