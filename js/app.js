(function(){


var AppModel = angular
	.module('ringstar', []);

AppModel
	.controller('ringstarCtrl', ['$scope', '$http', function($scope, $http) { 
 
	$scope.search = function(){
		$scope.text = $scope.searchQuery;
		$scope.getMusementEventByName($scope.searchQuery, onSearchEventSuccess, onSearchEventError);
	}	

	$scope.selectEvent = function(item){
		$scope.getMusementEventInformation(item.id, onGetEventInformationSuccess, onGetEventInformationError);
	};

	$scope.searchArtistConcert = function(){
		$scope.getMockArtistEvent($scope.searchArtistQuery, onSearchArtistConcertSuccess, onSearchArtistConcertError);
	}; 

	var onSearchArtistConcertSuccess = function(response){
		$scope.artistConcertCollection = parseArtistConcert(response.data.resultsPage.results.event);
	};

	var parseArtistConcert = function(data){

		var results = [];

		angular.forEach(data, function(item){
			results.push({
				startDate: item.start.date,
				cityName : item.location.city,
				cityLatitud : item.location.lat,
				cityLongitud: item.location.lng,
				eventName : item.venue.displayName,
				eventLatitud: item.venue.lat,
				eventLongitud : item.venue.lng
			});
		});

		return results;

	}

	var onSearchArtistConcertError = function(response){
		$scope.artistConcertCollection = null;
	};

	//Musement - API
	var onGetMusementEventDates = function(response){
		//todo:
	};

	var onGetMusementEventDatesError = function(response){
		//todo:
	};

	var onGetEventInformationSuccess = function(response){ 
		$scope.eventInformation = response.data;
	};

	var onGetEventInformationError = function(response){ 
		$scope.eventInformation = null;
	}
	var onSearchEventError = function(response){
		$scope.eventCollection = null;
	};

	var onSearchEventSuccess = function(response){
		$scope.eventCollection = response.data.data;
	};

	$scope.getMusementEventByName = function(eventName, successCallback, errorCallback){			 
			var apiURL = "http://thack.musement.com/api/v3/events/search-extended?q=" + eventName;// + "&category=68";	
			$http.get(apiURL).then(successCallback, errorCallback);
		}; 

	$scope.getMusementEventInformation = function(eventID, successCallback, errorCallback){
			var apiURL = "http://thack.musement.com/api/v3/events/" + eventID; 
			$http.get(apiURL).then(onGetEventInformationSuccess, onGetEventInformationError);
	};

	$scope.getMusementEventDates = function(eventID, successCallback, errorCallback){	
		var minDate = "2016-01-01";
		var maxDate = "2017-01-01";

		var apiURL = "http://thack.musement.com/api/v3/events/" + eventID + "/dates?date_from=" + minDate + "&date_to=" + maxDate;  
		$http.get(apiURL, rq).then(successCallback, errorCallback);
	};		
 
	// Mock concerts
	$scope.getMockArtistEvent = function(artistName, successCallback, errorCallback){
		$http.get("mock/searchArtist.json").then(successCallback, errorCallback);
	}

		
	}]);

})();