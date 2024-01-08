<?php
  session_start();

  // Check if the user is logged in
  if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
      $username = htmlspecialchars($_SESSION['name']);
  }
?>