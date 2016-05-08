<?php

http://free.rome2rio.com/api/1.2/json/Search?key=sqruI6jx&oName=Palma&dName=Alcudia

//BOOKING API
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("function.php");
 
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

		$request =  file_get_contents($serviceUrl."?".$data);
		return $request;
	} 
 

 
}

?>