<?php

$host = "localhost";
$dbname = "rpiXplore";
$username = "root";
$password = "Group2";

$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli -> connect_error){
    die("Connection error: " . $mysqli -> connect_error );
}

return $mysqli;