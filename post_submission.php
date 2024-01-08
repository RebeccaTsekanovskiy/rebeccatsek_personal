<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    exit;
}

include 'db_connect.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $title = $_POST['title'];
    $content = $_POST['content'];
    $user_id = $_SESSION['user_id']; 

    $stmt = $conn->prepare("INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $title, $content);

    if ($stmt->execute()) {
        echo "New post created successfully";
        header('Location: forum.php');
        
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
