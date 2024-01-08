<?php
// Database credentials
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$host = "localhost";
$dbname = "rpiXplore";
$username = "root";
$password = "Group2";

// Create database connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Database connection code here
function getDormitoryFeatures($dormId) {
    global $conn; // Use the global database connection

    $sql = "SELECT * FROM features WHERE dorm_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $dormId);
    $stmt->execute();
    $result = $stmt->get_result();

    $features = array();
    while($row = $result->fetch_assoc()) {
        // Assuming your features table has columns like 'isFreshman', 'hasTriple', etc.
        $features['isFreshman'] = $row['isFreshman'];
        $features['hasTriple'] = $row['hasTriple'];
        // ... include other feature columns ...
    }

    $stmt->close();
    return $features;
}
function getDormitoryFurnishings($dormId) {
    global $conn; // Use the global database connection

    $sql = "SELECT * FROM furnishings WHERE dorm_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $dormId);
    $stmt->execute();
    $result = $stmt->get_result();

    $furnishings = array();
    while($row = $result->fetch_assoc()) {
        // Assuming your furnishings table has columns like 'Dresser', 'Desk', etc.
        $furnishings['Dresser'] = $row['Dresser'];
        $furnishings['Desk'] = $row['Desk'];
        // ... include other furnishing columns ...
    }

    $stmt->close();
    return $furnishings;
}


function getDormitoryData($conn) {
    $sql = "SELECT data FROM dorms"; // Use the correct column name 'data'
    $result = $conn->query($sql);

    $dormitories = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // Decode the JSON data into an associative array
            $dormData = json_decode($row['data'], true); 
            if ($dormData) {
                $dormitories[] = $dormData;
            }
        }
    }
    return $dormitories;
}



function displayDormitories() {
    $dormitories = getDormitoryData($conn);// Fetch dormitory data

    foreach ($dormitories as $dorm) {
        echo "<div class='dormitory'>";
        echo "<h2>" . htmlspecialchars($dorm['name']) . "</h2>";
        echo "<img src='" . htmlspecialchars($dorm['thumbnail']) . "' alt='Thumbnail'>";

        // Display Features
        echo "<div class='features'>";
        echo "<h3>Features</h3>";
        foreach ($dorm['dormitory']['Features'] as $feature => $value) {
            echo "<p>" . htmlspecialchars($feature) . ": " . ($value ? 'Yes' : 'No') . "</p>";
        }
        echo "</div>";

        // Display Furnishings
        echo "<div class='furnishings'>";
        echo "<h3>Furnishings</h3>";
        foreach ($dorm['dormitory']['Furnishings'] as $furnishing => $value) {
            echo "<p>" . htmlspecialchars($furnishing) . ": " . ($value ? 'Yes' : 'No') . "</p>";
        }
        echo "</div>";

        echo "</div>"; // Close dormitory div
    }
}



// Similar functions for Kitchen, Location, RoomTypes...

$dormitories = getDormitoryData($conn); // Pass the connection as a parameter
displayDormitories($dormitories); // Call the display function with the fetch
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dormitories</title>
    <!-- Add your CSS links here -->
</head>
<body>
    <div class="container">
        <?php displayDormitories($dormitories); ?>
    </div>
</body>
</html>

<?php
// Close database connection at the end of the script
$conn->close();
?>