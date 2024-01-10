<?php include 'session.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>RPI Xplore</title>
    <link rel="stylesheet" type="text/css" href="styles.css?v=1">
    <link rel="icon" href="/finalproject_full/images/Asset_24x.png" type="image/x-icon">
</head>


<body>
    <header>
        <?php include 'header.php'; ?>
    </header>

    <main id="landing">
        <section class="welcome">
            <h1> Welcome to RPI Xplore</h1>
            <h2> Your guide to RPI's on-campus housing.</h2>
        </section>
    
    
        <div class="wrapper">
            <i id="left" class="fa-solid fa-angle-left"></i>
            <div class="carousel">
                <img src="images/landing6.jpg" alt="" draggable="false">
                <img src="images/landing4.jpg" alt="" draggable="false">
                <img src="images/landing3.jpg" alt="" draggable="false">
                <img src="images/landing2.png" alt="" draggable="false">
                <img src="images/landing5.jpg" alt="" draggable="false">
                <img src="images/landing7.jpg" alt="" draggable="false">
            </div>
            <i id="right" class="fa-solid fa-angle-right"></i>
        </div>

        <section class="whoami">
            <h3>I am:</h3>
                <a class="whoami_button" href ="#freshman-info">an Incoming Freshman</a> 
                <a class="whoami_button" href ="#transfer-info">a Transfer Student</a>
                <a class="whoami_button" href="#returning-info">Returning Student</a>
        </section>
        
    </main>


    <section id="freshman-info">
        <h2 class="freshman">What should I expect as an incoming freshman?</h2>
        <p class ="info">Incoming freshmen at Rensselaer Polytechnic Institute (RPI) can
             anticipate an engaging academic environment focused on STEM disciplines, 
             with rigorous coursework designed to foster critical thinking and 
             problem-solving skills. They'll find a vibrant campus community offering 
             various clubs, organizations, and research opportunities to explore diverse 
             interests. Expect a collaborative atmosphere where innovation and hands-on
              learning are encouraged, alongside a supportive network of faculty 
              and peers dedicated to academic and personal growth. Additionally, 
              freshmen can look forward to the unique balance of academic challenges 
              and a well-rounded college experience within a historic and forward-thinking institution.
        </p>
        <h2 class="freshman">Where will I live?</h2>
        <p class="info">
            At Rensselaer Polytechnic Institute (RPI), incoming freshmen typically 
            reside in on-campus residence halls, fostering a strong sense of community 
            among peers. These halls offer various amenities, including communal spaces 
            for socializing and studying, while providing support through resident advisors 
            and staff. RPI prioritizes creating a safe and inclusive living environment, 
            ensuring students' well-being. The university's housing options cater to 
            different preferences and needs, allowing freshmen to acclimate to college 
            life while building lasting connections. Overall, these residences serve as 
            integral spaces where freshmen can engage, learn, and establish a sense of 
            belonging within the RPI community.
        </p>
        <div class="button-area">
            <a href="dorms.php">Explore Dorms</a>
        </div>
    </section>

    <section id="transfer-info">
        <h2 class="transfer">What should I expect as a transfer student?</h2>
        <p class ="info">Transfer students coming to Rensselaer 
            Polytechnic Institute (RPI) can anticipate a dynamic academic environment 
            that values their prior coursework and experiences. They'll find a 
            supportive community that helps ease their transition, offering resources 
            tailored to their needs, including academic advising to ensure a smooth 
            integration into their chosen programs. RPI often provides transfer-specific 
            orientations or programs to familiarize them with campus life, helping them 
            navigate academic requirements and offering opportunities to connect with
             other transfer students. Additionally, transfer students can expect a range 
             of extracurricular activities, research opportunities, and access to various 
             campus resources aimed at enriching their overall college experience while at RPI.
        </p>
        <h2 class="transfer">Where will I live?</h2>
        <p class="info">
            Transfer students at Rensselaer Polytechnic Institute (RPI) typically have 
            several housing options available to them. They may reside in on-campus housing, 
            similar to the options available for incoming freshmen. However, depending on
            space availability and individual preferences, transfer students might also 
            have the opportunity to live in university-owned apartments or off-campus housing.

            RPI aims to provide transfer students with suitable housing options 
            that align with their preferences and needs, ensuring a supportive 
            and inclusive living environment. Transfer students might find 
            residence halls specifically designated for upper-level students 
            or housing arrangements that cater to their unique requirements as 
            they transition into RPI's community. Additionally, the university 
            offers support services to assist transfer students in navigating their 
            housing options and finding accommodations that suit their preferences and lifestyle.
        </p>
        <div class="button-area">
            <a href="dorms.php">Explore Dorms</a>
        </div>
    </section>
    <section id="returning-info">
        <h2 class="returning">What should I expect as a return student?</h2>
        <p class ="info">Returning students at Rensselaer Polytechnic Institute (RPI) can 
            expect a familiar yet evolving environment. They'll encounter a campus community 
            that continues to emphasize academic rigor and innovation while offering 
            opportunities for personal and professional growth. As returning students
             progress through their academic programs, they can anticipate more 
             specialized coursework, research opportunities, and increased involvement 
             in extracurricular activities aligned with their interests.

            Returning students often have a deeper understanding of campus resources and 
            may take on leadership roles within clubs, organizations, or research initiatives. 
            They'll continue to benefit from the support of faculty mentors and advisors 
            while having the opportunity to delve deeper into their chosen fields of study.
            
            Moreover, returning students might witness ongoing improvements and developments 
            on campus, whether in terms of facilities, programs, or initiatives aimed at 
            enhancing the overall student experience. Overall, returning students can expect
             a balance of familiarity and growth as they continue their academic journey at RPI.
        </p>
        <h2 class="returning">Where will I live?</h2>
        <p class="info">
            Returning students at Rensselaer Polytechnic Institute (RPI) have various housing 
            options available to them. They can choose to live in on-campus housing, 
            such as residence halls or university-owned apartments, where they might 
            have the opportunity to live in specialized housing communities or 
            upperclassman-focused living spaces.

            Some returning students may opt for off-campus housing, exploring 
            apartments or rental properties in the surrounding areas of Troy, New York, 
            where RPI is located. Off-campus housing offers a different living experience 
            and more independence but often requires students to manage their accommodations 
            independently.
            
            Additionally, as returning students progress through their academic 
            journey, they might explore different housing options, seeking roommates 
            or living situations that align with their changing preferences and lifestyles. 
            RPI aims to support returning students in finding housing that suits their needs, 
            whether they prefer the convenience of on-campus residences or the independence 
            of off-campus living.
        </p>
        <div class="button-area">
            <a href="dorms.php">Explore Dorms</a>
        </div>
    </section>

    <footer>
        <a class="footer_button" href="forum.php">FAQ</a>
        <a class="footer_button" href="./index.html">About RPI Xplore</a>
        <a class="footer_button" href="./index.html">Contact Us</a>
    </footer>
    <script src="smoothscroll.js?v=1"></script>
    <script src="scrollable-gallery.js"></script>
</body>
</html>