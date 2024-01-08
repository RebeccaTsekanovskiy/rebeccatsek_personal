fetch('comparisons.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        const buildings = json.Buildings
        const freshmanBuildings = buildings.filter((building) => building.dormitory.Features.isFreshman) 
        console.log(freshmanBuildings)
        const sophomoreBuildings = buildings.filter((building) => building.dormitory.Features.isSophomore)
        console.log(sophomoreBuildings)
        const upperclassmanBuildings = buildings.filter((building) => building.dormitory.Features.isJunior && building.dormitory.Features.isSenior)
        console.log(upperclassmanBuildings)

        const freshmanButtonElement = document.querySelector("#freshman-button")
        const sophomoreButtonElement = document.querySelector("#sophomore-button")
        const upperclassmanButtonElement = document.querySelector("#upperclassman-button")

        freshmanButtonElement.addEventListener("click", showFreshmanBuildings)
        sophomoreButtonElement.addEventListener("click", showSophomoreBuildings)
        upperclassmanButtonElement.addEventListener("click", showUpperclassmanBuildings)

        function renameFeature(feature) {
            if(feature === 'isFreshman') {
                return 'Freshman Dorm'
            }

            if(feature === 'isSophomore') {
                return 'Sophomore Dorm'
            }

            if(feature === 'isJunior') {
                return `Junior Dorm`
            }

            if(feature === 'isSenior') {
                return 'Senior Dorm'
            }

            if(feature === 'hasSingle') {
                return 'Single'
            }

            if(feature === 'hasDouble') {
                return 'Double'
            }

            if(feature === 'hasTriple') {
                return 'Triple'
            }

            if(feature === 'isSuite') {
                return 'Suite Building'
            }

            if(feature === 'isTraditional') {
                return 'Traditional Building'
            }

            if(feature === 'isCoEd') {
                return 'Co-Ed Building'
            }

            if(feature === 'isGenderInclusive') {
                return 'Gender Inclusive Housing Available'
            }

            if(feature === 'hasOnFloorBathroom') {
                return 'On Floor Bathroom'
            }

            if(feature === 'hasInRoomBathroom') {
                return 'In Room Bathroom'
            }

            if(feature === 'hasAllGenderBathroom') {
                return 'All Gender Bathroom Available'
            }

            if(feature === 'hasWardrobe') {
                return 'Wardrobe'
            }

            if(feature === 'hasCloset') {
                return 'Built in Closet'
            }

            if(feature === 'hasLoft/BunkBed') {
                return 'Loftable / Bunkable Bed'
            }

            if(feature === 'hasDeskandChair') {
                return 'Desk and Chair'
            }

            if(feature === 'hasBookcase') {
                return 'Bookcase'
            }

            if(feature === 'hasDresser') {
                return 'Dresser'
            }

            if(feature === 'hasAC') {
                return 'AC'
            }

            if(feature === 'hasBlinds') {
                return 'Blinds'
            }

            if(feature === 'hasBuildingLounge') {
                return 'Building Lounge'
            }

            if(feature === 'hasTV') {
                return 'TV in Building'
            }

            if(feature === 'hasCardEntry') {
                return 'Card Access Required for Entry'
            }

            if(feature === 'hasCarpet') {
                return 'Carpet'
            }

            if(feature === 'hasClassroom') {
                return 'Classroom'
            }

            if(feature === 'hasElevator') {
                return 'Elevator'
            }

            if(feature === 'hasEthernet') {
                return 'Ethernet'
            }

            if(feature === 'hasFloorLounge') {
                return 'Floor Lounge'
            }

            if(feature === 'hasBicycleStorage') {
                return 'Indoor Bicycle Storage'
            }

            if(feature === 'hasKitchen') {
                return 'Kitchen'
            }

            if(feature === 'hasLaundry') {
                return 'Landry'
            }

            if(feature === 'hasPrinter') {
                return 'Printer in Building'
            }

            if(feature === 'hasStudyRoom') {
                return 'Study Rooms'
            }

            if(feature === "wireless") {
                return 'wireless'
            }

            if(feature === 'isCoterm') {
                return 'Coterm Dorm'
            }

            if(feature === 'isApartment') {
                return 'Apartment Building'
            }


            return feature
        }

        function showBuildings(buildings) {
            const tableContainer = document.getElementById('tablesContainer');
            tableContainer.innerHTML = '';
            const table = document.createElement('table');

            const dorms = buildings.map((building) => building.name) 
            const featureNames = Object.keys(buildings[0].dormitory.Features);
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th></th>' + dorms.map(dorm => `<th>${dorm}</th>`).join('');
            table.appendChild(headerRow);
            
            featureNames.forEach((feature) => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${renameFeature(feature)}</td>` + buildings.map(building => `<td>${building.dormitory.Features[feature] ? '✔' : '❌'}</td>`).join('');
                table.appendChild(row);
            });

            table.style.marginTop = '20px';
            

            tableContainer.appendChild(table);
        }

        function showFreshmanBuildings() {
            showBuildings(freshmanBuildings)
        }

        function showSophomoreBuildings() {
            showBuildings(sophomoreBuildings)
        }

        function showUpperclassmanBuildings() {
            showBuildings(upperclassmanBuildings)
        }

        showFreshmanBuildings();

    })