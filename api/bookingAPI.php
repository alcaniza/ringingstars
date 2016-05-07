<?php
//BOOKING API
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("function.php");

Class Booking{
   
	var $api = null;

    public function __construct($username, $password) { 
        $this->api = new Api($username, $password);
    }

    // Get Availability
	function GetAvailability($RQ){
		$serviceUrl = "https://distribution-xml.booking.com/json/getHotelAvailabilityV2"; 	
		$data = 
			"checkin=" . $RQ->CheckInDate . 
			"&checkout=" . $RQ->CheckOutDate . 
			"&room1=A" . 
			"&latitude=".$RQ->Lat .
			"&longitude=" . $RQ->Lon . 
			"&radius=" . $RQ->Radius; 

		$bookinRequest =  $serviceUrl."?".$data;
		return $this->api->CallAPI("POST", $bookinRequest);
	} 

	// Get Hotel Information
	function GetHotelInformation($listOfHotels){
		$serviceUrl = "https://distribution-xml.booking.com/json/bookings.getHotels";
		$data = "hotel_ids=" . (is_array($listOfHotels) ? implode(",", $listOfHotels) : $listOfHotels);

		$bookinRequest =  $serviceUrl."?".$data;
		return $this->api->CallAPI("POST", $bookinRequest);
	}	

	// Get Hotel Images;
	function GetHotelImage($listOfHotels){
		$serviceUrl = "https://distribution-xml.booking.com/json/bookings.getHotelDescriptionPhotos";
		$data = "hotel_ids=" . (is_array($listOfHotels) ? implode(",", $listOfHotels) : $listOfHotels);

		$bookinRequest =  $serviceUrl."?".$data;
		return $this->api->CallAPI("POST", $bookinRequest);
	}


 
}


 

?>