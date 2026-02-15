<?php
include 'config.php';

$sql = "SELECT first_name, last_name, email_address FROM Person ORDER BY last_name";
$result = $conn->query($sql);

$people = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $people[] = $row;
    }
}

echo json_encode($people);

$conn->close();
?>
