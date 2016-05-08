<?php

http://free.rome2rio.com/api/1.2/json/Search?key=sqruI6jx&oName=Palma&dName=Alcudia

//BOOKING API
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("function.php");
 

$rome = new RomeToRio("sqruI6jx");
$request = new AvailabilityRequest();
$request->Lat = "38.76988,-9.12824";
$request->Lon = "40.49109,-3.59369";
echo $rome->GetAvailability($request);


Class RomeToRio{
   
	var $api = null;
	var $key = null;

    public function __construct($key) { 
    	$this->key = $key;
        $this->api = new Api(null, null);
    }

    // Get Availability
	function GetAvailability($RQ){
		$serviceUrl = "http://free.rome2rio.com/api/1.2/json/Search"; 	
		$data = 
			"key=" . $this->key . 
			"&oPos=". $RQ->Lat .
			"&dPos=" . $RQ->Lon; 

		 	$values =  json_decode(file_get_contents($serviceUrl."?".$data));
		 	$route = $values->routes[0];
		 	$product = new Product();
	   		$product->productType = "transfer";
		    $product->id = null; 
		    $product->img = 0;
		    $product->name = $route->name;
		    $product->description = $route->stops;
		    $product->price = $route->indicativePrice->price; 
		    $product->currency = $route->indicativePrice->currency;
		    $product->checkindate = 0;
		    $product->checkoutdate = 0;
		    $product->latitude = 0;
		    $product->longitude = 0;	
		    return json_encode($product);
	} 

 
}

?>