<?php

require_once("bookingAPI.php");


$postdata = file_get_contents("php://input");	
$request = json_decode($postdata);

switch($request->partner){
	case "booking":
		
		$booking = new Booking("hacker232", "fthriQ0ZWfs");

		switch($request->action){
			case "getAvailability":
				$response = $booking->GetHotelImage($request->data->availabilityRQ);
				$responseJSON = json_encode($response);
			break;

			case "getHotel":
				$response = $booking->GetHotelImage($request->data->hotelsIds);
				$responseJSON = json_encode($response);
			break;

			case "getHotelImages":
				$response = $booking->GetHotelImage($request->data->hotelsIds);
				$responseJSON = json_encode($response);
			break;
		}
		
	break;	
}


header('Content-type: application/json');
echo json_encode($responseJSON);



?>