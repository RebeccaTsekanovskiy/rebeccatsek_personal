<?php
session_start();


$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$email = $_POST['email'];
$role_id = $_POST['role_id']; 

$conn = new mysqli('localhost', 'root','Group2', 'rpiXplore');

if ($conn -> connect_error){
    die("Connection error: " . $conn -> connect_error );
}

$sql = "INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $username, $password, $email, $role_id);

if ($stmt->execute()) {
  header('Location: login.html');
  echo "New record created successfully";
  exit;
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
