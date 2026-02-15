<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "<h1>Form Submission Results</h1>";

    // Display text input
    echo "<p><strong>Text Input:</strong> " . htmlspecialchars($_POST['text']) . "</p>";

    // Display textarea input
    echo "<p><strong>Textarea:</strong> " . htmlspecialchars($_POST['textarea']) . "</p>";

    // Display hidden data
    echo "<p><strong>Hidden Data:</strong> " . htmlspecialchars($_POST['hiddenData']) . "</p>";

    // Display password input
    echo "<p><strong>Password:</strong> " . htmlspecialchars($_POST['password']) . "</p>";

    // Display checkboxes
    if (isset($_POST['checkboxes'])) {
        echo "<p><strong>Checkboxes:</strong> " . implode(", ", $_POST['checkboxes']) . "</p>";
    } else {
        echo "<p><strong>Checkboxes:</strong> None selected</p>";
    }

    // Display radio button
    echo "<p><strong>Radio Button:</strong> " . htmlspecialchars($_POST['radio']) . "</p>";

    // Display selection list
    echo "<p><strong>Selection List:</strong> " . htmlspecialchars($_POST['select']) . "</p>";

    // Display URL
    echo "<p><strong>URL:</strong> " . htmlspecialchars($_POST['url']) . "</p>";

    // Handle file upload
    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $destination = './' . $fileName;

        if (move_uploaded_file($fileTmpPath, $destination)) {
            echo "<p><strong>File Upload:</strong> File uploaded successfully. <a href='$destination'>View file</a></p>";
        } else {
            echo "<p><strong>File Upload:</strong> Error moving file to destination.</p>";
        }
    } else {
        echo "<p><strong>File Upload:</strong> No file uploaded or there was an error.</p>";
    }
} else {
    echo "<p>No form data submitted.</p>";
}
?>
