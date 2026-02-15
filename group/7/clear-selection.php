<?php
session_start();
if (isset($_SESSION['selected_cars'])) {
    unset($_SESSION['selected_cars']);
}
header('Location: car-display.php');
exit;
