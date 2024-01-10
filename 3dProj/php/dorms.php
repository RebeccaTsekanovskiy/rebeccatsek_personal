<?php include 'session.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>RPI Xplore</title>
  <link rel="stylesheet" type="text/css" href="dorms.css?v=1">
  <script type="module" src="https://unpkg.com/@google/model-viewer"></script>
  <link rel="icon" href="/finalproject_full/images/Asset_24x.png" type="image/x-icon">
</head>

<body>

  <header>
    <?php include 'header.php'; ?>
  </header>

  <main class="dorms-page">
    <aside class="sidebar">
      <form action="#">
        <img class="search-image" src="images/search.png" alt="Search">
        <input type="text" id="searchInput" placeholder="Search by dorm name..." name="search" oninput="searchDorms()">
      </form>
      <h1 class="filter-title">Filters</h1>
      <div class="tags">
        <button class="tag-button">Single</button>
        <button class="tag-button">Double</button>
        <button class="tag-button">Triple</button>
        <button class="tag-button">Apartment</button>
        <button class="tag-button">Freshmen Hill</button>
        <button class="tag-button">ECAV</button>
        <button class="tag-button">Downtown</button>
        <button class="tag-button">AC</button>
        <button class="tag-button">Kitchen</button>
        <div id="kitchen-options" class="kitchen-options" style="display: none;">
          <button class="kitchen-button">Microwave</button>
          <button class="kitchen-button">Stove</button>
          <button class="kitchen-button">Fridge</button>
        </div>
        <button class="tag-button">In Room Bathroom</button>
        <button class="tag-button">On Floor Bathroom</button>
      </div>
    </aside>

    <div class="main-dorm-right">
      <div class="main-dorm-tags">
        <button class="main-dorm-buttons">All Dorms</button>
        <button class="main-dorm-buttons">Freshman</button>
        <button class="main-dorm-buttons">Sophomore</button>
        <button class="main-dorm-buttons">Junior</button>
        <button class="main-dorm-buttons">Senior</button>
      </div>
      <div>
        <div id="dorm-tiles-test"></div>
      </div>
    </div>

    <div id="modal" class="modal">
      <div class="modal-content">
        <header>
          <h2 id="modal-title">Dorm</h2>
          <span class="close" onclick="closeModal()">&times;</span>
        </header>
        <div class="main-panel">
          <div class="side-panel1">
            <h3 class="modal-header1">Dorm Features</h3>
            <p id="dorm-features">
            </p>
          </div>
          <div class="side-panel2">
            <div class="modal-nav">
              <button class="main-dorm-buttons-modal"></button>
            </div>
            <div class="info-section">
              <div class="info-column-left">
                <img id="modal-image" src="dorm" alt="Dorm Image">
              </div>
              <div class="info-column-right">
                <section class="modal-description-box">
                  <h3 class="modal-header">Description</h3>
                  <p id="modal-description"></p>
                </section>
                <section class="modal-whattoexpect-box">
                  <h3 class="modal-header">What to expect</h3>
                  <p id="modal-description2"> </p>
                </section>
              </div>
              <model-viewer class="custom-model-viewer" src="" alt="A 3D model" ar camera-controls> </model-viewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer>
        <a class="footer_button" href="forum.php">FAQ</a>
        <a class="footer_button" href="./index.html">About RPI Xplore</a>
        <a class="footer_button" href="./index.html">Contact Us</a>
  </footer>
  
  <script src="basic_js1.js"></script>
</body>