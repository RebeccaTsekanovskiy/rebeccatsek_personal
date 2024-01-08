<?php

$host = 'localhost'; 
$dbname = 'rpiXplore'; 
$username = 'root'; 
$password = 'Group2'; 

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
