<?php
session_start();

// Check if username, password, and email are set
if(isset($_POST['password'], $_POST['email'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', 'Group2', 'rpiXplore');
    if ($conn->connect_error) {
        die("Connection error: " . $conn->connect_error);
    }

    $stmt = $conn->prepare('SELECT password, username, user_id, role_id FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['loggedin'] = TRUE;
            $_SESSION['name'] = $row['username'];
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['role_id'] = $row['role_id'];

            if ($_SESSION['role_id'] == 3) {
                header('Location: admin_portal.php');
                exit();
            } else {
                header('Location: dorms.php');
                exit();
            }
        } else {
            // Incorrect password
            echo 'Incorrect username and/or password!';
        }
    } else {
        // Incorrect username
        echo 'Incorrect username and/or password!';
    }
    $stmt->close();
    $conn->close();
} else {
    echo 'Required data not submitted.';
}
?>
