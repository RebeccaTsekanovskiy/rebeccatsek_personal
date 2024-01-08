<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role_id'] != 3) {
    exit('Access Denied');
}

include 'db_connect.php'; // Your database connection file

// Fetch unapproved posts
$sql = "SELECT post_id, title, content, created_at FROM posts WHERE approved = FALSE";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Pending Posts</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        h1 {
            color: #333;
        }

        .post {
            border: 1px solid #ccc;
            border-radius: 8px;
            margin: auto;
            padding: 15px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            width: 60%;
        }

        h2 {
            color: #333;
            margin-bottom: 10px;
        }

        p {
            color: #555;
            margin-bottom: 10px;
        }

        label {
            display: block;
            margin-top: 10px;
        }

        textarea {
            width: 100%;
            height: 100px;
            margin-top: 5px;
            resize: vertical;
        }

        input[type="submit"] {
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }

        .no-posts {
            color: #555;
            margin-top: 20px;
        }
    </style>
    <link rel="stylesheet" href="admin.css">
</head>
<body>
    <h1>Pending Posts</h1>

    <?php if ($result->num_rows > 0): ?>
        <form action="approve_posts.php" method="post">
            <?php while($row = $result->fetch_assoc()): ?>
                <div class="post" >
                    <input type="checkbox" name="approved_posts[]" value="<?php echo $row['post_id']; ?>">
                    <h2><?php echo htmlspecialchars($row['title']); ?></h2>
                    <p><?php echo nl2br(htmlspecialchars($row['content'])); ?></p>
                    <p>Posted on: <?php echo $row['created_at']; ?></p>
                    <label for="response_<?php echo $row['post_id']; ?>">Admin Response:</label>
                    <textarea name="post_responses[<?php echo $row['post_id']; ?>]" id="response_<?php echo $row['post_id']; ?>"></textarea>
                </div>
            <?php endwhile; ?>
            <input type="submit" value="Approve Selected Posts">
        </form>
    <?php else: ?>
        <p>No posts pending approval.</p>
    <?php endif; ?>


    <?php $conn->close(); ?>
</body>
</html>
