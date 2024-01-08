<?php
  session_start();

  // Check if the user is logged in
  if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
      $username = htmlspecialchars($_SESSION['name']);
  }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <title>RPI XPlore</title>
        <link rel="stylesheet" href="comparisons.css">
    </head>

    <body>
        <header>
            <img src="./images/logo.png">
            <nav class="header_nav">
                <a class="navitem" href="main.php">Home</a>
                <a class="navitem" href="dorms.php">Dorms</a>
                <a class="navitem" href="comparisons.php">Compare</a>
                <a class="navitem" href="resources.php">Resources</a>
                <a class="navitem" href="forum.php">Forum</a>
                <?php if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']): ?>
                <a class="navitem" href="logout.php">Logout</a> 
                <?php else: ?>
                    <a class="navitem" href="signup.html">Sign Up</a>
                <?php endif; ?>
                <!-- <a href="signup.html"><img class="profile"src="./images/usericon.png" style="width:42px;height:42px;"></a> -->
            </nav>
        </header>

        <main>
            <section class="class-dorm-tags">
                <button class="class-dorm-buttons" id="freshman-button">Freshman</button>
                <button class="class-dorm-buttons" id="sophomore-button">Sophomore</button>
                <button class="class-dorm-buttons" id="upperclassman-button">Upperclassman</button>
            </section>
        </main>

        <div id="tablesContainer"></div>

        <script src="comparisons.js"></script>
        
        <footer>
            <a href="forum.php"><button> FAQ </button></a>
            <a href="./index.html"><button> About RPI Xplore </button></a>
            <a href="./index.html"><button> Contact Us</button></a>
        </footer>
    </body>
</html>