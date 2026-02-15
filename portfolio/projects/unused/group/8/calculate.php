
<?php
function haversine_distance($lat1,  $lon1, $lat2,  $lon2)
{
    // distance between latitudes
    // and longitudes
    $dLat = ($lat2 - $lat1) *
        M_PI / 180.0;
    $dLon = ($lon2 - $lon1) *
        M_PI / 180.0;

    // convert to radians
    $lat1 = ($lat1) * M_PI / 180.0;
    $lat2 = ($lat2) * M_PI / 180.0;

    // apply formulae
    $a = pow(sin($dLat / 2), 2) +
        pow(sin($dLon / 2), 2) *
        cos($lat1) * cos($lat2);
    $rad = 6371;
    $c = 2 * asin(sqrt($a));
    return $rad * $c;
}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $zipCode1 = $_POST['zipCode1'];

    $zipCode2 = $_POST['zipCode2'];

    $lat1;
    $lg1;

    $found = false;

    $lat2;
    $lg2;
    $file_path = 'zipcodes.txt';
    $names = file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($names as $name) {
        $expanded = explode(" ", $name);
        if ($expanded[0] == $zipCode1) {
            $lat1 = $expanded[1];
            $lg1 = $expanded[2];
            $found = true;
            break;
        }
        $found = false;
    }

    foreach ($names as $name) {
        $expanded = explode(" ", $name);
        if ($expanded[0] == $zipCode2) {
            $lat2 = $expanded[1];
            $lg2 = $expanded[2];
            $found = true;
            break;
        }
        $found = false;
    }


    if ($found == true) {
        $distance = haversine_distance($lat1,  $lg1, $lat2,  $lg2);

        $distance = number_format( $distance, 2);

        echo ($distance . " KM");
    } else {
        echo ("Zip code not found");
    }
}
?>
