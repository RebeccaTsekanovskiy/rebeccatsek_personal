<!-- header.php -->
<img src="./images/logo.png" alt="RPI XPlore Logo">
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
</nav>