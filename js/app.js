(function(){
 
var AppModel = angular
	.module('ringstar', []);
 
AppModel
	.controller('confirmCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
			

		$scope.booking = {"productType":"hotel","id":"93612","img":"http:\/\/aff.bstatic.com\/images\/hotel\/max500\/346\/34690282.jpg","name":"The St. Regis Mardavall Mallorca Resort","description":"This exquisite resort nestles between the Tramuntana Mountains and the glistening Mediterranean Sea \u2013 the perfect place to enjoy a luxury stay on this beautiful Balearic island.\n\nThe exclusive offering of the St. Regis Mardavall Mallorca Resort includes personal butler service and canopy beds beside the outdoor swimming pool. You can also enjoy a round on the seafront golf course.\n\nThe elegant, dazzling white interior features facilities ranging from an indoor pool to a gourmet restaurant. Throughout the building you can admire the best of modern Majorcan art.\n\nEach of the hotel\u2019s luxurious rooms opens onto a spacious balcony offering views of the lush gardens.","price":"530.00","currency":"EUR","checkindate":"2016-10-10","checkoutdate":"2016-10-11","latitude":"39.52839076214566","longitude":"2.550952434539795"};
		$scope.selectedEvent;
		$scope.init = function(){
			 
			var eventId = getQueryString().eventid;
			//todo: remove this from here ok? :)
			$http.get("mock/searchArtist.json").then(
			function(response){
				var event = response.data.resultsPage.results.event.filter(function(item){
					return item.id == eventId;
				});

				if(event.length > 0){
					$scope.selectedEvent =parseMock(event[0]);

					$scope.getBookingAvailability(
						$scope.selectedEvent.eventLatitud,
						$scope.selectedEvent.eventLongitud,
						$scope.selectedEvent.startDate,
						addDate($scope.selectedEvent.startDate));
				}
				
			}, 
			function(response){

			});
		}; 

		var addDate = function(da){
			var someDate = new Date(da);
			var numberOfDaysToAdd = 2;
			someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

			
			var dd = someDate.getDate();
			var mm = someDate.getMonth() + 1;
			var y = someDate.getFullYear();

			if((""+mm).length == 1)
				mm = "0" + mm;

			if(("" + dd).length == 1)
				dd = "0" + dd;

			var someFormattedDate = y + "-" + mm + "-" + dd;
			return someFormattedDate;
		}
		 

		var parseMock = function(item){
			return {img: "https://images.sk-static.com/images/media/profile_images/venues/" + item.venue.id + "/col2", 
				startDate: item.start.date,
				cityName : item.location.city,
				cityLatitud : item.location.lat,
				cityLongitud: item.location.lng,
				id: item.id,
				eventName : item.displayName,
				eventLatitud: item.venue.lat,
				eventLongitud : item.venue.lng}
		}
		$scope.init();

		// Get Booking Availability
		$scope.getBookingAvailability = function(latitud, longitud, checkInDate, checkOutDate){
			
			var url = "api/api.php";
			var data = {
				action: "getAvailability",
				partner: "booking",
				data: {
					checkInDate: checkInDate,
					checkOutDate: checkOutDate,
					lon: longitud,
					lat: latitud,
					radius: 5
				}
			};

			$http
				.post(url, data)
				.then(onGetBookingAvailabilitySuccess, onGetBookingAvailabilityError);
		};

		var onGetBookingAvailabilitySuccess = function(response){
			$scope.booking = response;
		};

		var onGetBookingAvailabilityError = function(response){
			console.log(response);
		}

		// Get Booking Hotel Information
		$scope.getBookingHotel = function(hotelId){
			
			var url = "../api/api.php";
			var data = {
				action: "getHotel",
				partner: "booking",
				data: {
					hotelIds: [hotelId]
				}
			}

			$http
				.post(url, rq)
				.then(onGetBookingHotelSuccess, onGetBookingHotelError);
		};

		var onGetBookingHotelSuccess = function(response){
			//Todo: 
		};

		var onGetBookingHotelError = function(response){
			//Todo:
		}

	}])
AppModel
	.controller('ringstarCtrl', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) { 
 	

 	$scope.isLoading = false;

	$scope.selectEvent = function(item){
		$scope.getMusementEventInformation(item.id, onGetEventInformationSuccess, onGetEventInformationError);
	};

	$scope.searchArtistConcert = function(){
		$scope.isLoading = true;
		$scope.artistConcertCollection = [];
		$scope.searchCue = ["songkick", "musement" ];

		$scope.getMusementEventByName($scope.searchTerm, 
		function(response){
			searchCompleted($scope);
			//var result = parseMusementEvent(response.data.resultsPage.results.event);
			//angular.extend($scope.artistConcertCollection, result);
		}, 
		function(response){
			searchCompleted($scope);
		});

		$scope.getMockArtistEvent($scope.searchTerm, 
		function(response){
			searchCompleted($scope);
			var result = parseMockEvent(response.data.resultsPage.results.event);
			angular.extend($scope.artistConcertCollection, result);
		}, 
		function(response){
			searchCompleted($scope);
		});
	}; 

	var searchCompleted = function(scope){
		scope.searchCue.pop();
			if(scope.searchCue.length==0)
				scope.isLoading = false; 
	}
 	
 	var parseMusementEvent = function(data){
		var results = [];

		angular.forEach(data, function(item){
			results.push({
				img: "", 
				startDate: "",
				cityName :"",
				cityLatitud : "",
				cityLongitud: "",
				id: "",
				eventName : "",
				eventLatitud: "",
				eventLongitud : ""
			});
		});

		return results;
 	};

	var parseMockEvent = function(data){
		
		var results = [];

		angular.forEach(data, function(item){
			results.push({
				img: "https://images.sk-static.com/images/media/profile_images/venues/" + item.venue.id + "/col2", 
				startDate: item.start.date,
				cityName : item.location.city,
				cityLatitud : item.location.lat,
				cityLongitud: item.location.lng,
				id: item.id,
				eventName : item.displayName,
				eventLatitud: item.venue.lat,
				eventLongitud : item.venue.lng
			});
		});

		return results;

	} 

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
			var apiURL = "http://thack.musement.com/api/v3/events/search-extended?limit=50&q=" + eventName;// + "&category=68";	
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
 	
	$scope.bookEvent = function(item){
		$window.location = "track.html?eventid=" + item.id;
	}

    $scope.init = function(){
    	$scope.searchTerm = getQueryString().search; 
    	$scope.searchArtistConcert($scope.searchTerm);
    }

    $scope.init();
		
	}]).directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
	      });
	    }
	   }
   		return fallbackSrc;
	});


//remove from here :) 
var getQueryString = function(){
 // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
};


})();