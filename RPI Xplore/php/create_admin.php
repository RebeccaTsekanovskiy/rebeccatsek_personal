<?php

include 'db_connect.php'; 


$username = "new_admin";
$password = "secure_password"; 
$email = "admin@example.com";
$adminRoleId = 3; 

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, password, email, role_id) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $username, $hashedPassword, $email, $adminRoleId);

if ($stmt->execute()) {
    echo "New admin account created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
