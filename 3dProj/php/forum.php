<?php include 'session.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>RPI Xplore Forum</title>
    <link rel="stylesheet" type="text/css" href="forum1.css">
    <link rel="icon" href="/finalproject_full/images/Asset_24x.png" type="image/x-icon">
</head>


<body>

  <header>
    <?php include 'header.php'; ?>
  </header>
    
        
      
<div class="flex">
    <?php
        if (isset($_SESSION['user_id'])) {
    ?>
      <div class="create_post">
        <h2>Create a New Post</h2>
        <form class="postform" action="post_submission.php" method="post">
      
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required><br>
      
          <label for="content">Content:</label>
          <textarea id="content" name="content" required></textarea>  
      

          <button id = "submitbutton" type="submit" value="Submit Post">Submit</button>
        </form>
      </div>

    <?php
        } else {
            echo '<p class="notlogged">You must be logged in to create a post.</p>';
        }
    ?>

    <?php
        include 'db_connect.php';

        $sql = "SELECT posts.title, posts.content, posts.created_at, posts.reply, users.username FROM posts JOIN users ON posts.user_id = users.user_id WHERE posts.approved = TRUE ORDER BY posts.created_at DESC";
        $result = $conn->query($sql);

        echo"<div class='forum-info-box'>";
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='forum-info'>";
                echo "<h2 class='title'>" . htmlspecialchars($row['title']) . "</h2>";
                echo "<p class ='buttomborder'> Q:" . nl2br(htmlspecialchars($row['content'])) . "</p>";
                echo "<p class ='paragraphs'>Admin Response: " . nl2br(htmlspecialchars($row['reply'])) . "</p>";
                echo "<p class='timestamp'>Posted by " . htmlspecialchars($row['username']) . " on " . $row['created_at'] . "</p>";
                echo "</div>";
            }
        } else {
            echo "No posts available.";
        }
        echo"</div>";
        $conn->close();
    ?>
</div>

    

    <footer>
        <button> FAQ </button>
        <a href="./index.html"><button> About RPI Xplore </button></a>
        <a href="./index.html"><button> Contact Us</button></a>
    </footer>
</body>