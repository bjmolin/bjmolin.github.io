<?php include 'config.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create DB</title>
    <link href="styles.css" rel="stylesheet" type="text/css">
    <link href="../../navbar.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <script>
        // Load the navbar
        fetch('../../navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navi').innerHTML = data;
            });
    </script>
</head>
<body>
    <div id="navi"></div>
    <br />
    <div class="container">
        <h1>Add a New Person</h1>
        <form method="POST" action="">
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name" required>
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name" required>
            <label for="email_address">Email Address:</label>
            <input type="email" id="email_address" name="email_address" required>
            <button type="submit" name="submit">Add Person</button>
        </form>

        <?php
        if (isset($_POST['submit'])) {
            $first_name = $_POST['first_name'];
            $last_name = $_POST['last_name'];
            $email_address = $_POST['email_address'];

            $sql = "INSERT INTO Person (first_name, last_name, email_address) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $first_name, $last_name, $email_address);

            if ($stmt->execute()) {
                echo "<p>Success!</p>";
            } else {
                echo "<p>Error: " . $stmt->error . "</p>";
            }

            $stmt->close();
        }
        ?>

        <h1>Search by Last Name</h1>
        <form method="GET" action="">
            <label for="search_last_name">Last Name:</label>
            <input type="text" id="search_last_name" name="search_last_name" required>
            <button type="submit" name="search">Search</button>
        </form>

        <?php
        if (isset($_GET['search'])) {
            $search_last_name = $_GET['search_last_name'];

            // Use case-insensitive comparison
            $sql = "SELECT first_name, last_name, email_address 
                    FROM Person 
                    WHERE LOWER(last_name) = LOWER(?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $search_last_name);

            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo "<h2>Search Results:</h2>";
                while ($row = $result->fetch_assoc()) {
                    echo "<p>{$row['first_name']} {$row['last_name']} - {$row['email_address']}</p>";
                }
            } else {
                echo "<p>No records found.</p>";
            }

            $stmt->close();
        }
        ?>

        <h1>Person Records</h1>
        <button id="retrieve-button">Retrieve and Display Records</button>
        <div id="records"></div>
    </div>

    <script>
    document.getElementById('retrieve-button').addEventListener('click', function() {
        fetch('retrieve.php')
            .then(response => response.json())
            .then(data => {
                const recordsDiv = document.getElementById('records');
                recordsDiv.innerHTML = '';
                data.forEach(person => {
                    const personDiv = document.createElement('div');
                    personDiv.textContent = `${person.first_name} ${person.last_name} - ${person.email_address}`;
                    recordsDiv.appendChild(personDiv);
                });
            });
    });
    </script>
</body>
</html>

<?php $conn->close(); ?>
