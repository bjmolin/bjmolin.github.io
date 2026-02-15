<!DOCTYPE html>

<html lang="en">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script>
    // Load the navbar
    fetch('../../navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navi').innerHTML = data;
        });
</script>
<head>
    <title>PHP Hello World</title>
    <link href="styles.css" rel="stylesheet" type="text/css">
    <link href="../../navbar.css" rel="stylesheet" type="text/css">
</head>

<body>
    <!-- Navbar -->
    <div id="navi"></div>

     <h2>
        <?php echo "Hello World!"; ?>
     </h2>

</body>
</html>
