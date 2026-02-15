<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo 'Not logged in';
    exit;
}

require 'database.php'; // Include your database connection

$data = json_decode(file_get_contents('php://input'), true);
$channelId = $data['channelId'];
$userId = $_SESSION['user_id'];

$stmt = $pdo->prepare('INSERT INTO favorites (user_id, channel_id) VALUES (?, ?)');
$stmt->execute([$userId, $channelId]);

echo 'Favorite added';
?>
