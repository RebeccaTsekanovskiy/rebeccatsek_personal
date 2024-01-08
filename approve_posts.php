<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role_id'] != 3) {
    exit('Access Denied');
}

include 'db_connect.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['approved_posts'])) {
    $approvedPosts = $_POST['approved_posts'];
    $postResponses = $_POST['post_responses'] ?? [];

    foreach ($approvedPosts as $postId) {
        $postId = (int)$postId; // Ensure $postId is an integer

        // Update post approval status
        $updateSql = "UPDATE posts SET approved = TRUE WHERE post_id = $postId";

        if (!$conn->query($updateSql)) {
            echo "Error updating record: " . $conn->error;
        }

        // Save admin response
        if (isset($postResponses[$postId])) {
            $response = $conn->real_escape_string($postResponses[$postId]);

            $responseSql = "UPDATE posts SET reply = '$response' WHERE post_id = $postId";

            if (!$conn->query($responseSql)) {
                echo "Error updating response: " . $conn->error;
            }
        }
    }
}

// Redirect back to the admin portal
header("Location: admin_approve.php");
exit;
