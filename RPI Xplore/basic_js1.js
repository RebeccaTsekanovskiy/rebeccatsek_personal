
const featureMapping = {
    "Single": "hasSingle",
    "Double": "hasDouble",
    "Triple": "hasTriple",
    "Suite Style": "hasSuiteStyle",
    "Freshmen Hill": "isOnFreshmenHill",
    "ECAV": "isNearECAV",
    "Downtown": "isDowntown",
    "AC": "hasAC",
    "Kitchen": "hasKitchen",
    "Microwave":"hasMicrowave",
    "Stove":"hasStove",
    "Fridge":"hasFridge",
    "Sophomore":"isSophomore",
    "Freshman":"isFreshman",
    "Junior":"isJunior",
    "Senior":"isSenior",
    "All Dorms": "alldorm",
    "In Room Bathroom":"hasInRoomBathroom",
    "On Floor Bathroom":"hasHallBathroom",
    "Freshmen Hill":  "freshmanhill",
    "ECAV":"ecav",
    "Apartment":"hasquadruple",
    "Downtown":"Downtown"

    // Add more mappings as needed
  };
  const featureDisplayMapping = {
    "alldorm":"",
    "isFreshman": "",
    "isSophomore": "",
    "isJunior": "",
    "isSenior": "",
    "hasSingle": "",
    "hasDouble": "",
    "hasTriple": "",
    "hasquadruple":"",
    "hasTripleSuite": "",
    "hasInRoomBathroom": "In-Room Bathrooms",
    "hasHallBathroom": "Hall Bathrooms",
    "hasCommonSpace": "Common Spaces Available",
    "hasTV": "Television Available",
    "hasCouch": "Couch Available",
    "hasAC": "Air Conditioning",
    "hasStudyRooms": "Study Rooms Available",
    "hasElevator": "Elevator Access",
    "nearestDining": "Nearest Dining Facility",
    "freshmanhill": "",
    "hasPrinter": "Printer Available",
    "floorType": "Floor Type: Carpeted",
    "bedType": "Bed Type: Twin XL",
    "Dresser": "Available with a Dresser",
    "ecav": "",
    "Downtown":"",
    "hasMicrowave":"Microwave in Dorm",
    "hasStove":"Stove in Dorm",
    "hasFridge":"Fridge in Dorm",
    "Dresser":"Dresser in Dorm ",
    "Desk":" Desk in Dorm",
    "Wardrobe":"Wardrobe in Dorm",
    "Closet":" Closet in Dorm",
    "floorType":"Floor Type:"

    // Continue adding more mappings as required
};

const featureDisplayMapping2={
    "isFreshman": "Freshman Dorm",
    "isSophomore": "Sophomore Dorm",
    "isJunior": "Junior Dorm",
    "isSenior": "Senior Dorm",
    "nearestDining":"Closest Dining Hall:"

};


  
  let globalBuildingData = [];

fetch('filter_REALDATA.json')
  .then(response => response.json())
  .then(data => {
    // Use the data here inside the .then() block
    globalBuildingData = data.Buildings; // Store the data globally
    console.log(data.Buildings);
    createDormTiles(data.Buildings);
  })
  .catch(error => console.error('Error fetching data:', error));


  function displayDormFeatures(building) {
    const modalNav = document.querySelector('.modal-nav');
    modalNav.innerHTML = '';

    // Create 'Overview' button
    const overviewButton = createRoomTypeButton('Overview');
    overviewButton.addEventListener('click', () => setModalInitialState(building));
    modalNav.appendChild(overviewButton);

    // Create buttons for available room types
    ['Single', 'Double', 'Triple'].forEach(roomType => {
        if (building.dormitory.RoomTypes[roomType]) {
            const roomButton = createRoomTypeButton(roomType);
            roomButton.addEventListener('click', () => displayRoomInfo(building.dormitory.RoomTypes[roomType]));
            modalNav.appendChild(roomButton);
        }
    });

    // Create button for 3D model if available
    if (building.glbPath) {
        const modelButton = createRoomTypeButton('View 3D Model');
        modelButton.addEventListener('click', () => show3DModelPopup(building.glbPath));
        modalNav.appendChild(modelButton);
    }

    if (building.glbPath2) {
        const modelButton = createRoomTypeButton('View Another 3D Model');
        modelButton.addEventListener('click', () => show3DModelPopup(building.glbPath2));
        modalNav.appendChild(modelButton);
    }

    // Initialize modal with 'Overview' information
    setModalInitialState(building);
}

function setModalInitialState(building) {

    const building_img = document.getElementById('modal-image');
    building_img.style.display='block';


    const modalNav = document.querySelectorAll('.modal-description-box');

      const modalNav_expect = document.querySelector('.modal-whattoexpect-box');
if (modalNav_expect) {
    modalNav_expect.style.display = 'block';
    modalNav_expect.style.width = '100%';
}
  
    modalNav.forEach(modalNav => {
        modalNav.style.display = 'block';
        modalNav.style.width = '100%';
    });

    const modelViewer = document.querySelector('.custom-model-viewer');
    modelViewer.style.display = 'none';

    const whattoexpect = document.querySelector('.modal-header');
    whattoexpect.style.display='block';

    const whattoepexct_desc = document.getElementById('modal-description2');
    whattoepexct_desc.style.display='block';

    // Populate 'Overview' information
    const featuresContainer = document.getElementById('dorm-features');
    const featuresDescription = document.getElementById('modal-description2');
    const regularDescription = document.getElementById('modal-description');
    featuresContainer.innerHTML = '';
    featuresDescription.innerHTML = '';
    regularDescription.innerHTML='';
    
    var dining=building.dormitory.Features.nearestDining ;
    regularDescription.innerHTML += `<p> Nearest Dining Hall: ${dining}  </p>`;
    
    if(building.dormitory.Features.freshmanhill===true){
        regularDescription.innerHTML += `<p> Located on Freshmen Hill  </p>`;
    }
    if(building.dormitory.Features.ecav===true){
        regularDescription.innerHTML += `<p> Located near ECAV </p>`;
    }
    if(building.dormitory.Features.Downtown===true){
        regularDescription.innerHTML += `<p> Located near Downtown </p>`;
    }
     
    if(building.dormitory.Features.isFreshman===true){
        regularDescription.innerHTML += `<p> Freshmen Dorm </p>`;
    }
    if(building.dormitory.Features.isSophomore===true){
        regularDescription.innerHTML += `<p> Sophmore Dorm </p>`;
    }
    if(building.dormitory.Features.isJunior===true){
        regularDescription.innerHTML += `<p> Junior Dorm </p>`;
    }

    


    for (const feature in building.dormitory.Features) {
        if (building.dormitory.Features[feature] === true) {
            const featureText = featureDisplayMapping[feature];
            featuresContainer.innerHTML += `<p>${featureText}</p>`;
        }
    }

    for (const kitchenFeature in building.dormitory.Kitchen) {
        if (building.dormitory.Kitchen[kitchenFeature] === true) {
            const featureText = featureDisplayMapping[kitchenFeature];
            featuresContainer.innerHTML += `<p>${featureText}</p>`;
        }
    }
    for(const furn in building.dormitory.Furnishings){
        if( building.dormitory.Furnishings[furn] === true){
            const featureText = featureDisplayMapping[furn];
            featuresDescription.innerHTML += `<p>${featureText}</p>`;
        }
    }
    for (const feature in building.dormitory.Features) {
        if (building.dormitory.Features[feature] === "Wood") {
            const featureText = featureDisplayMapping[feature];
            featuresDescription.innerHTML += `<p>${featureText} Wood </p>`;
           
        }
    }
    for (const feature in building.dormitory.Features) {
        if (building.dormitory.Features[feature] === "Carpeted") {
            const featureText = featureDisplayMapping[feature];
            featuresDescription.innerHTML += `<p>${featureText} Carpeted </p>`;
           
        }
    }


}

function toTitleCase(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Usage example


function searchDorms() {
    var searchValue = toTitleCase(document.getElementById('searchInput').value);
    
    const filteredData = globalBuildingData.filter(dorm => 
        dorm.name.toLowerCase().includes(searchValue.toLowerCase()));
    

    createDormTiles(filteredData);
}



function displayRoomInfo(roomData) {
  
    // Populate room-specific information
   
    const building_img = document.getElementById('modal-image');
    building_img.style.display='block';

     const modalNav = document.querySelectorAll('.modal-description-box');
  
    modalNav.forEach(modalNav => {
        modalNav.style.display = 'block';
        modalNav.style.width = '100%';
    });

    
    const modalNav_expect = document.querySelector('.modal-whattoexpect-box');
    if (modalNav_expect) {
        modalNav_expect.style.display = 'block';
        modalNav_expect.style.width = '100%';
    }

    


    const whattoexpect = document.querySelector('.modal-header');
    whattoexpect.style.display='block';
    const modelViewer = document.querySelector('.custom-model-viewer');
    modelViewer.style.display = 'none';

    const whattoepexct_desc = document.getElementById('modal-description2');
    whattoepexct_desc.style.display='block';
    const roomInfoContainer = document.getElementById('modal-description2');
    roomInfoContainer.innerHTML = `
        <p>Square Feet: ${roomData.Sqft}</p>
        <p>Toilets: ${roomData.Bathroom.Toilets}</p>
        <p>Sinks: ${roomData.Bathroom.Sinks}</p>
        <p>Showers: ${roomData.Bathroom.Showers}</p>`;
}

function createRoomTypeButton(roomType) {
    const button = document.createElement('button');
    button.className = 'main-dorm-buttons-modal';
    button.textContent = roomType;
    return button;
}


// Function to create dorm tiles
function createDormTiles(buildings) {
  const container = document.getElementById('dorm-tiles-test');
  container.innerHTML = '';

  if (!container) {
    console.error("Container element not found!");
    return;
  }

  buildings.forEach(building => {
    const tile = document.createElement('div');
    tile.className = 'dorm-tile';
    tile.style.backgroundImage = `url(${building.thumbnail})`;

    tile.addEventListener('click', () => {
        openModal(building.name, building.thumbnail, building.dormitory.Location.Description, building.glbPath);
      
      displayDormFeatures(building); 
    });

    const name = document.createElement('div');
    name.className = 'dorm-name';
    name.textContent = building.name;

    tile.appendChild(name);
    container.appendChild(tile);
  });
}

// Function to filter and display buildings based on a feature
function filterBuildingsByFeature(feature) {
    console.log("Filtering for feature:", feature);
    const mappedFeature = featureMapping[feature];
    console.log("Mapped feature:", mappedFeature);
  
    const filteredData = globalBuildingData.filter(building =>
      building.dormitory.Features[mappedFeature]
    );
    console.log("Filtered Data:", filteredData);
  
    createDormTiles(filteredData);
  }
  


// Function to open the modal
// Function to open the modal


function createModalNavButton(text, onclickFunction) {
    console.log("Text is",text);
    const button = document.createElement('button');

    button.className = 'main-dorm-buttons-modal';
    button.textContent = text;
    if (onclickFunction) {
        button.addEventListener('click', onclickFunction);
    }
    return button;
}

// Function to display the 3D model




function show3DModelPopup(glbPath) {
 
    const modalNav = document.querySelectorAll('.modal-description-box');
   
  
  
    modalNav.forEach(modalNav => {
        modalNav.style.display = 'none';
        modalNav.style.width = '0px';
    });

    const modalNav_expect = document.querySelector('.modal-whattoexpect-box');
if (modalNav_expect) {
    modalNav_expect.style.display = 'none';
    modalNav_expect.style.width = '0px';
}




    const building_img = document.getElementById('modal-image');
    building_img.style.display='none';

    const whattoepexct_desc = document.getElementById('modal-description2');
    whattoepexct_desc.style.display='none';



    console.log("Attempting to show 3D model:", glbPath);
    const modelViewer = document.querySelector('.custom-model-viewer');
    console.log("Model viewer element:", modelViewer); // Debug line

    if (modelViewer) {
        modelViewer.src = glbPath;
       
        modelViewer.style.display = 'block'; // Show the model viewer
        console.log("3D model displayed");
    } else {
        console.error('Model viewer element not found!');
    }
}




// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.classList.remove('modal-visible'); 
    const modelViewer = document.querySelector('.custom-model-viewer');
    modelViewer.style.display = 'none';

    

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
    }
}

// Function to open the modal
function openModal(name, imageUrl, description, glbPath) {
    console.log('Opening modal for:', name, 'with 3D model path:', glbPath);
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalNav = document.querySelector('.modal-nav');
     

    modalTitle.textContent = "Welcome to " + name;
    modalImage.src = imageUrl;
    modalDescription.textContent = description;

    // Clear previous navigation buttons and add them based on availability
    modalNav.innerHTML = '';
    modalNav.appendChild(createModalNavButton('Overview'));

    // Directly create and append the 3D model viewer button if glbPath exists
    if (glbPath) {
        const modelButton = document.createElement('button');
        modelButton.className = 'main-dorm-buttons-modal';
        modelButton.textContent = 'View 3D Model';
        modelButton.addEventListener('click', () => show3DModelPopup(glbPath));
        modalNav.appendChild(modelButton);
    }

    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('modal-visible');
    }, 10);
}

// Rest of your JavaScript code...

document.addEventListener("DOMContentLoaded", function() {

    
    const tagButtons = document.querySelectorAll('.tag-button');
    const dormButtons = document.querySelectorAll('.main-dorm-buttons');
    const kitchenButton = Array.from(tagButtons).find(button => button.textContent === 'Kitchen');
    const kitchenOptions = document.getElementById('kitchen-options');
    const kitchenSubButtons = kitchenOptions.querySelectorAll('.kitchen-button');

    if (kitchenButton) {
        kitchenButton.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            kitchenSubButtons.forEach(btn => btn.classList.remove('active')); // Deactivate sub buttons
            this.classList.toggle('active', !isActive);
            kitchenOptions.style.display = isActive ? 'none' : 'block';
            console.log("Kitchen button clicked. Active:", !isActive);
            reorderTagButtons();
        });
    }

    kitchenSubButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            console.log("Kitchen sub-button clicked:", this.textContent);
            updateDisplay(); // Update the display based on the new active state
        });
    });

    
   
    // Function to update the display based on active filters
    function updateDisplay() {
        const activeTagFilters = Array.from(tagButtons)
                                      .filter(btn => btn !== kitchenButton && btn.classList.contains('active'))
                                      .map(btn => btn.textContent);
        const activeKitchenFilters = Array.from(kitchenSubButtons)
                                          .filter(btn => btn.classList.contains('active'))
                                          .map(btn => btn.textContent);
        const activeDormFilters = Array.from(dormButtons)
                                       .filter(btn => btn.classList.contains('active'))
                                       .map(btn => btn.textContent);
        const allActiveFilters = activeTagFilters.concat(activeDormFilters);
    
        let filteredData;
    
        if (activeKitchenFilters.length > 0 && allActiveFilters.length > 0) {
            filteredData = applyBothFilters(allActiveFilters, activeKitchenFilters);
            reorderTagButtons();
        } else if (activeKitchenFilters.length > 0) {
            filteredData = applyKitchenFilters(activeKitchenFilters);
        } else if (allActiveFilters.length > 0) {
            filteredData = applyFilters(allActiveFilters);
            reorderTagButtons();
        } else {
            filteredData = globalBuildingData; // If no filters are active, display all dorms
        }
    
        var searchValue = toTitleCase(document.getElementById('searchInput').value);
        if (searchValue) {
            filteredData = filteredData.filter(dorm => 
                dorm.name.toLowerCase().includes(searchValue.toLowerCase()));
        }
    
        createDormTiles(filteredData);
        reorderTagButtons();
    }
    
    

    // Event listener for tag buttons
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // If it's not the kitchen button, toggle active state and update display
            if (this !== kitchenButton) {
                this.classList.toggle('active');
                updateDisplay();
            }
        });
    });



    // Event listener for dorm buttons
    dormButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Allow 'All Dorms' to remove active state from other dorm buttons
            if (this.textContent === 'All Dorms') {
                dormButtons.forEach(btn => btn.classList.remove('active'));
            } else {
                // Remove 'All Dorms' active state when other dorm buttons are clicked
                document.querySelector('.main-dorm-buttons').classList.remove('active');
            }
            this.classList.toggle('active');
            updateDisplay();
        });
    });
});




function applyFilters(filters) {
    console.log("Applying general filters:", filters);
    console.log("Active filters:", filters);
  
    const filteredData = globalBuildingData.filter(building =>
      filters.every(filter => {
        const featureKey = featureMapping[filter];
        console.log(`Checking feature: ${featureKey} in building: ${building.name}`);
        return building.dormitory.Features[featureKey];
      })
    );
  
    console.log("Filtered Data:", filteredData);
    createDormTiles(filteredData);
    return filteredData;
  }


  

function applyKitchenFilters(filters) {
    console.log("Applying kitchen filters:", filters);
    const filteredData = globalBuildingData.filter(building => {
        return filters.every(filter => {
            // Use the existing feature mapping for kitchen features
            const kitchenFeatureKey = featureMapping[filter];
            return building.dormitory.Kitchen[kitchenFeatureKey];
        });
    });
    createDormTiles(filteredData);
    return filteredData;
}

function applyBothFilters(filters1, filters2) {
    console.log("Applying both dormitory and kitchen filters");

    const filteredData = globalBuildingData.filter(building => {
        // Check for general dormitory features
        const dormFeaturesSatisfied = filters1.every(filter => {
            const featureKey = featureMapping[filter];
            return building.dormitory.Features[featureKey];
        });

        // Check for kitchen-specific features
        const kitchenFeaturesSatisfied = filters2.every(filter => {
            const kitchenFeatureKey = featureMapping[filter];
            return building.dormitory.Kitchen[kitchenFeatureKey];
        });

        // Include building only if both sets of features are satisfied
        return dormFeaturesSatisfied && kitchenFeaturesSatisfied;
    });

    console.log("Filtered Data:", filteredData);

    return filteredData; // Make sure to return the filtered data
}





  
  

function reorderTagButtons() {
    const tagsSection = document.querySelector('.tags');
    const activeButtons = Array.from(tagsSection.querySelectorAll('.tag-button.active'));
    const inactiveButtons = Array.from(tagsSection.querySelectorAll('.tag-button:not(.active)'));
    const mainbutton= document.querySelector('.main-dorm-tags');
    const active_maindorm = Array.from(mainbutton.querySelectorAll('.main-dorm-buttons.active'));
    const inactive_maindorm = Array.from(mainbutton.querySelectorAll('.main-dorm-buttons:not(.active)'));


    activeButtons.forEach((button, index) => {
        button.style.order = index;
    });

    inactiveButtons.forEach((button, index) => {
        button.style.order = activeButtons.length + index;
    });

    
    active_maindorm.forEach((button, index) => {
        button.style.order = index;
    });

    inactive_maindorm.forEach((button, index) => {
        button.style.order = activeButtons.length + index;
    });
}













