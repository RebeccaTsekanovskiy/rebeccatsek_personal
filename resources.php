<?php
  session_start();

  // Check if the user is logged in
  if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
      $username = htmlspecialchars($_SESSION['name']);
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>RPI Xplore Resources</title>
    <link rel="stylesheet" type="text/css" href="styles_resources.css">
    <link rel="icon" href="/finalproject_full/images/Asset_24x.png" type="image/x-icon">
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
    <main class="all_info">
        <div class="row1-container">
        <section class="block one_block blue">
            <a href="https://info.rpi.edu/mail-services" class="button-style">Mail Information</a>
            <p> You can send your packages like: <br>
                Jane Doe <br>
                RPI  Residence Hall & Room Number<br>
                1999 Burdett Ave.
                Troy, NY 12180</p>
        </section>
       
        <section class="block red">
            <a href="https://rpi.sodexomyway.com/dining-near-me/hours" class="button-style">Dining Hall Information</a>
            <p> The names of the dining halls for Freshman are:
                <br> Commons,Sage, BAR-H
            </p>
        </section>
        <section class="block one_block green">
            <a href="https://itssc.rpi.edu/hc/en-us/articles/360008778352-iPhone-iPad-Connecting-to-the-RPI-Wireless-Network" class="button-style"> Wifi Information</a>
            <p> Open settings to connect to wifi <br>
             Click WI-FI. Click on "rpi_wpa2." 
               Enter your RCS ID in the username field and RCS password in the password field.
             Click the accept button to get the certificate.
        </section>
        </div>

        <div class="row2-container">
        <section class="block orange">
            <a href="https://science.rpi.edu/itws" class="button-style">ITWS and RPI Social Media</a>
            <p> Instagram is: rpiofficial and itwsatrpi</p>

        </section>
       
        <section class="block one_block yellow">
            <a href="https://reslife.rpi.edu/residential-commons" class="button-style">Res Life </a>
            <p> Click the button to visit the Student Living and Learning page.</p>
        </section>
        <section class="block  purple">
            <a href="https://union.rpi.edu/" class="button-style">Union Information</a>
            <p>Phone Number: 518-276-6505</p>
            <p>Email: RPIUnion@rpi.edu</p>
        </section>
        </div>
        <div class="row3-container">
            <section class="block one_block black">
                <a href="https://discord.gg/HRYuxjAtft" class="button-style">Discord Information</a>
                <p>Click the Button to join the ITWS discord:</p>
            </section>
            <section class="block  black">
                <a href="https://info.rpi.edu/comm-d" class="button-style">Writing Center Help</a>
                <p>You can get writing help at COMM+D which is located on the first floor of Folsom Library.
                    They can help with all writing projects and presentations.
                </p>
            </section>
        </div>
        <div class="row4-container">
            <section class="block one_block blue">
                <a href="https://ccpd.rpi.edu/handshake" class="button-style">Career Center Help</a>
                 <p>Visit RPI handshake. In the corner of the screen, click the three lines. Click Career Center.<br>
                Click Appointments and schedule a new appointment.  </p>
             </section>
             </div>

      
          
    </main>
</body>

</html>