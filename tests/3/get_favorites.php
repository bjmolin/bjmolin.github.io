<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo 'Not logged in';
    exit;
}

require 'database.php'; // Include your database connection

$userId = $_SESSION['user_id'];
$stmt = $pdo->prepare('SELECT channel_id FROM favorites WHERE user_id = ?');
$stmt->execute([$userId]);
$favorites = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($favorites);
?>
