<?php
session_start(); // Start the session to store and access session variables

// Check if the form has been submitted and the 'cars' parameter is set
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['cars'])) {
    $_SESSION['selected_cars'] = $_POST['cars']; // Store the selected cars in the session
}

// Retrieve the selected cars from the session, or set an empty array if not set
$selected_cars = isset($_SESSION['selected_cars']) ? $_SESSION['selected_cars'] : [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Display Page</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../css/base.css">
    <link href="../css/navbar.css" rel="stylesheet" type="text/css">
    <script src="../navbarLoader.js"></script>
</head>
<body>
    <header>
        <div id="navbar-placeholder"></div>
    </header>
    <main>
        <h1>Car Display Page</h1>
        <?php if (!empty($selected_cars)): ?>
            <ul>
                <?php foreach ($selected_cars as $car): ?>
                    <li><?php echo htmlspecialchars($car); // Display each selected car ?></li>
                <?php endforeach; ?>
            </ul>
            <form action="clear-selection.php" method="post">
                <input type="submit" value="Clear Selection"> <!-- Button to clear the selection -->
            </form>
        <?php else: ?>
            <p>No cars selected.</p>
        <?php endif; ?>
        <br>
        <a href="car-selection.php">Back to Car Selection Page</a> <!-- Link back to the car selection page -->
    </main>
</body>
</html>
