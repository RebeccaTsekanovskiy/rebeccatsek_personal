<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $formData = $_POST['dorm'];

    // Path to the JSON file
    $jsonFilePath = 'filter_REALDATA.json';

    // Read the existing JSON file
    $currentData = file_get_contents($jsonFilePath);
    $arrayData = json_decode($currentData, true);

    // Append new data to the array
    $arrayData[] = $formData;

    // Encode back to JSON and write to file
    file_put_contents($jsonFilePath, json_encode($arrayData, JSON_PRETTY_PRINT));
    
    echo "Dormitory information submitted successfully!";
} else {
    echo "No data submitted";
}
?>
