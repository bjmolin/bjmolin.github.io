<?php
/*
Jared Alvarado
CPSC 3750
07/13/24
Prog12: AJAX & PHP
*/
header("Content-type: text/xml");


$names = array_map('str_getcsv', file('uszips.csv'));


echo "<?xml version=\"1.0\" ?>\n";
echo "<names>\n";

foreach ($names as $name) {

    $temp = $name[0]." ".$name[1]." ".$name[2]." ".$name[3]." ".$name[4];

    if (stristr($temp, $_GET['query'])) {
        echo "<name>Zip Code:$name[0] Latitude:$name[1] Longitude:$name[2] City:$name[3] State:$name[4] </name>";
    }
}
echo "</names>\n";
?>