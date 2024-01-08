<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role_id'] != 3) {
    exit('Access Denied');
}

include 'db_connect.php'; // Your database connection file

// Fetch unapproved posts

?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Portal</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <img src="./images/logo.png">
    <nav class="header_nav">
    </nav>
  </header>
    <h1 class="portal_admin_title">RPIXplore Admin Portal</h1>

    <div class="leftright">
        <button onclick="location.href = 'admin_approve.php';" class="leftleft">Approve Posts</button>
        <button onclick="location.href = 'adddorm_form.html';" class="rightright">Add Dorm Info</button>

    </div>

    <?php $conn->close(); ?>
</body>
</html>
