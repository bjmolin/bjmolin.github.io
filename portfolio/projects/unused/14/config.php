<?php
$servername = "sql204.infinityfree.com";
$username = "if0_36574764";
$password = "Cervantes67";
$dbname = "if0_36574764_db_users";
$port = 3306;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
