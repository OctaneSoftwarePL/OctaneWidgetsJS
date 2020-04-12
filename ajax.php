<?php

include 'countries.php';
//include 'us_states.php';

/** Example ajax responses */
$result = [];
if(isset($_GET['t'])){

    switch ($_GET['t']){
        case "c":
            if(isset($_GET['phrase'])){
                $phrase = $_GET['phrase'];
                $keysFromArray = array_keys(array_filter($countries, function($var) use ($phrase){
                    return strpos(strtolower($var), strtolower($phrase)) !== false;
                }));
                $result = array_intersect_key($countries, array_flip($keysFromArray));
            }
            break;
        case "s":
//            if(isset($_GET['id']) && strtolower($_GET['id']) === 'us'){
//                $result = $usStates;
//            }else{
//                $result = ["NA" => "Unknown"];
//            }

            $result = getFromUrl('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json');
            $result = json_decode($result);
            break;
        default: break;

    }
}

$keyValue = [];
foreach($result as $key => $value){
    $keyValue[] = ['key' => $key, 'value' => $value];
}

echo json_encode($keyValue);
die();

function getFromUrl($url)
{
    if(empty($url)) return '';
    $cURLConnection = curl_init();

    curl_setopt($cURLConnection, CURLOPT_URL, $url);
    curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($cURLConnection);
    curl_close($cURLConnection);

    return $result;
}
