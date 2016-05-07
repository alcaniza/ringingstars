<?php

// Request Availability
Class AvailabilityRequest{
    var $CheckInDate;
    var $CheckOutDate;
    var $Lon;
    var $Lat;
    var $Radius;
}

// Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value
Class Api{
    
    var $_username;
    var $_password;

    public function __construct($username, $password) {
        $this->_username = $username;
        $this->_password = $password;
    }

    function CallAPI($method, $url, $data = false)
    {
        $curl = curl_init($url);

        $credential = $this->_username.":".$this->_password;

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_USERPWD, $credential);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }   
}

 

?>