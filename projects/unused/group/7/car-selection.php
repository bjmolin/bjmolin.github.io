<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Selection Page</title>
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
        <h1>Car Selection Page</h1>
        <form action="car-display.php" method="post">
            <label for="cars">Select your favorite cars:</label><br>
            <select id="cars" name="cars[]" multiple>
                <option value="Tesla Model S">Tesla Model S</option>
                <option value="BMW 3 Series">BMW 3 Series</option>
                <option value="Audi A4">Audi A4</option>
                <option value="Mercedes-Benz C-Class">Mercedes-Benz C-Class</option>
                <option value="Lexus IS">Lexus IS</option>
                <option value="Jaguar XE">Jaguar XE</option>
                <option value="Cadillac ATS">Cadillac ATS</option>
            </select><br><br>
            <input type="submit" value="Submit">
        </form>
    </main>
</body>
</html>
