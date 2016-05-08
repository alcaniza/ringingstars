<?php
//BOOKING API
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("bookingAPI.php");
 
$postdata = file_get_contents("php://input");	
$request = json_decode($postdata);

switch($request->partner){
	case "rome2rio":
		$rome = new RomeToRio("sqruI6jx");
		switch($request->action){
			case "getAvailability": 
				$response = $rome->GetAvailability($request->data);
				$responseJSON = json_encode($response);
			break;
		}
	break;
	case "booking":
		
		$booking = new Booking("hacker232", "fthriQ0ZWfs");

		switch($request->action){
			case "getAvailability": 
				$response = $booking->GetAvailability($request->data); 
				$responseJSON = json_encode($response); 
			break;

			case "getHotel":
				$response = $booking->GetHotelImage($request->data);
				$responseJSON = json_encode($response);
			break;

			case "getHotelImages":
				$response = $booking->GetHotelImage($request->data);
				$responseJSON = json_encode($response);
			break;
		}
		
	break;	
}


header('Content-type: application/json');
echo json_encode($responseJSON);



?>