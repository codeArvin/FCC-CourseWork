var app = angular.module('Timer',[]);
app.controller('control', function($scope, $interval) {
	$scope.breakLength = 5;
	$scope.sessionLength = 25;
	$scope.title = 'SESSION';
	$scope.timeLeft = $scope.sessionLength;
	$scope.fillColor = 'chartreuse';
	var runTimer = false,
		secs = 60*$scope.sessionLength,
		currBeginTime = 60*$scope.sessionLength,
		secsToHms, toggleTimer, updateTime;
		
	secsToHms = function (secs) {
		var h = Math.floor(secs / 3600),
			m = Math.floor(secs % 3600 / 60),
			s = Math.floor(secs % 3600 % 60);
			
		return (
			(h>0 ? h + ':' + (m<10 ? '0' : '') : '') + m + ":" + (s<10 ? '0' : '') + s
		);
	};
	
	$scope.breakLengthChange = function (n) {
		if (!runTimer) {
			$scope.breakLength += n;
			if ($scope.breakLength < 1) {
				$scope.breakLength = 1;
			}
			if ($scope.title === 'BREAK') {
				$scope.timeLeft = $scope.breakLength;
				currBeginTime = 60*$scope.breakLength;
				secs = 60*$scope.breakLength;
			}
		}
	};
	
	$scope.sessionLengthChange = function (n) {
		if (!runTimer) {
			if ($scope.title === 'SESSION') {
				$scope.sessionLength += n;
				if ($scope.sessionLength < 1) {
					$scope.sessionLength = 1
				}
				$scope.timeLeft = $scope.sessionLength;
				currBeginTime = 60*$scope.sessionLength;
				secs = 60*$scope.sessionLength;
			}
		}
	};
	
	updateTime = function () {
		secs -= 1;
		if (secs < 0) {
			if ($scope.title === 'SESSION') {
				$scope.title = 'BREAK';
				$scope.timeLeft = $scope.breakLength;
				currBeginTime = 60*$scope.breakLength;
				secs = 60*$scope.breakLength;
				$scope.fillColor = 'orangered';
				$scope.fillHeight = '0';
			} else {
				$scope.title = 'SESSION';
				$scope.timeLeft = $scope.sessionLength;
				currBeginTime = 60*$scope.sessionLength;
				secs = 60*$scope.sessionLength;
				$scope.fillColor = 'chartreuse';
				$scope.fillHeight = '0';
			}
		} else {
			$scope.timeLeft = secsToHms(secs);
			var down = currBeginTime,
				up = secs;
				
			$scope.fillHeight = (down - up)/down*100 + '%';
			//alert($scope.fillHeight);
		}
	};
	
	$scope.toggleTimer = function () {
		if (runTimer) {
			$interval.cancel(runTimer);
			runTimer = false;
		} else {
			updateTime();
			runTimer = $interval(updateTime, 1000);
		}
	};
	
});
