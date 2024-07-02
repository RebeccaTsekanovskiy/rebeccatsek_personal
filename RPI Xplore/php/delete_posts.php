<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role_id'] != 3) {
    exit('Access Denied');
}

if (!isset($_POST['post_id'])) {
    exit('No post specified');
}

$post_id = $_POST['post_id'];

include 'db_connect.php'; // Your database connection file

$stmt = $conn->prepare("DELETE FROM posts WHERE post_id = ?");
$stmt->bind_param("i", $post_id);

if ($stmt->execute()) {
    header("Location: pending_posts.php");
    exit();
} else {
    echo "Error deleting record: " . $conn->error;
}

// Close the connection
$stmt->close();
$conn->close();
?>
