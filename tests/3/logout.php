<?php
session_start();
session_destroy();
header('Location: collection.html');
?>
