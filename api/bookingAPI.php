<?php
//BOOKING API
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("function.php");



/*
	$booking = new Booking("hacker232", "fthriQ0ZWfs");
	$rq = new AvailabilityRequest();
	$rq->CheckInDate = "2016-10-10";
	$rq->CheckOutDate = "2016-10-11";
	$rq->Lat = "39.56958";
	$rq->Lon = "2.65007";
	$rq->Radius = 10;
	echo $booking->GetAvailability($rq);
*/

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
		$response = json_decode($this->api->CallAPI("POST", $bookinRequest));

		$hotel = $response->hotels[0];
	 	$hotelInformation = json_decode($this->GetHotelInformation($hotel->hotel_id));
		$hotelImage = json_decode($this->GetHotelImage($hotel->hotel_id));
		$hotelDescription = json_decode($this->GetHotelDescription($hotel->hotel_id)); 

		$product = new Product();
	    $product->productType = "hotel";
	    $product->id = $hotel->hotel_id; 
	    $product->img = $hotelImage[0]->url_original;
	    $product->name = $hotelInformation[0]->name;
	    $product->description = $hotelDescription[0]->description;
	    $product->price = $hotel->room_min_price->price; 
	    $product->currency = $hotel->hotel_currency_code;
	    $product->checkindate = $RQ->CheckInDate;
	    $product->checkoutdate = $RQ->CheckOutDate;
	    $product->latitude = $hotelInformation[0]->location->latitude;
	    $product->longitude = $hotelInformation[0]->location->longitude;
	    
	    return json_encode($product);

	} 

	// Get Hotel Information
	function GetHotelInformation($listOfHotels){
		$serviceUrl = "https://distribution-xml.booking.com/json/bookings.getHotels";
		$data = "hotel_ids=" . (is_array($listOfHotels) ? implode(",", $listOfHotels) : $listOfHotels);

		$bookinRequest =  $serviceUrl."?".$data;
		return $this->api->CallAPI("POST", $bookinRequest);
	}	
	// Get Hotel Information
	function GetHotelDescription($listOfHotels){
		$serviceUrl = "https://distribution-xml.booking.com/json/bookings.getHotelDescriptionTranslations";
		$data =
			"hotel_ids=" . (is_array($listOfHotels) ? implode(",", $listOfHotels) : $listOfHotels) . 
			"&languagecodes=en";

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