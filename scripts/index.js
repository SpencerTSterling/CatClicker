import * as buildings from "./buildings.js";

let cat = document.querySelector('#cat');
let totalKitties = document.querySelector('#total-kitties');
let totalKittiesNum = parseFloat(totalKitties.innerHTML);

let cpsElement = document.querySelector('#cps');
let cps = parseFloat(cpsElement.innerHTML);

let buildingLvl = document.querySelector('.building-level');
let buildingCost = document.querySelector('.building-cost');

let clickerBox= document.querySelector('.building');

let cheatBtn = document.querySelector('#cheat');


function clickCat() {
    console.log("Clicked the cat!");
    totalKittiesNum++;
    updateTotalKitties();
}

function updateTotalKitties() {
    totalKitties.innerHTML = parseFloat(totalKittiesNum);
}

function updateCPS() {
    cpsElement.innerHTML = cps;
}

function updateBuildingDisplay() {
    buildingCost.innerHTML = buildings.clicker.cost;
    buildingLvl.innerHTML = buildings.clicker.level
}



function autoAddCPS(cps) {
    setInterval(() => {
        totalKittiesNum += parseFloat(cpsElement.innerHTML); // Increment totalKittiesNum by cps
        updateTotalKitties(); // Update the total kitties displayed on the page
    }, 1000); // CPS is per second, so the interval is set to 1000ms (1 second)
}
// Call the function to start auto-adding kitties based on CPS
autoAddCPS(cps);


/**
 * Create a building element based on the provided building.
 * @param {Building} building The building for which to create an element.
 * @returns {HTMLElement} The created building element.
 */
function createBuildingElement(building) {
    // Clone the existing building element
    const clickerBuilding = document.querySelector('.building');
    const buildingElement = clickerBuilding.cloneNode(true);

    // Update the cloned element with new building information
    buildingElement.querySelector('.building-icon img').src = `./assets/${building.name.toLowerCase().replace(' ', '')}.png`;
    buildingElement.querySelector('.building-name').textContent = building.name;
    buildingElement.querySelector('.building-cost').textContent = building.cost;
    buildingElement.querySelector('.building-level').textContent = `${building.level}`;

    return buildingElement;
}


/**
 * Initialize click event listeners for the buildings.
 * @param {Building[]} buildingList The list of buildings to initialize click events for.
 */
function initializeBuildingClickEvents(buildingList) {
    buildingList.forEach((building, index) => {
        const buildingElement = document.querySelector(`.building-${index}`);
        buildingElement.addEventListener('click', () => buyBuilding(building));
    });
}
   
// Add a click event listener to the cat element
cat.addEventListener('click', clickCat);

/**
 * Purchase and upgrade a building. 
 * 
 * Subtracts building cost from Total Kitties, upgrades building level and 
 * recalculates cost, increases CpS, & updates the building display. 
 * 
 * @param {Building} Building The building to be purchased and upgraded.
 * @throws {Error} Will throw an error if the provided Building is undefined.
 * @returns {void}
 */
function buyBuilding(Building) {
       // Ensure a valid Building object is provided
       if (!Building) {
        throw new Error('Invalid Building object provided.');
    }

    // Check if player can afford the building
   if (totalKittiesNum >= Building.cost){

        // Calculate the new total kitties count after purchasing the building
        const newtotalKitties = Building.updatedTotalKitties(totalKittiesNum);
        totalKittiesNum = newtotalKitties;
        updateTotalKitties();

        // Upgrade the building's level and recalculate its cost
        Building.upgradeBuilding();

         // Calculate the new CPS score after upgrading the building
        const addedCPS = Building.updatedCPS();
        cps = addedCPS;
        updateCPS();

        // Update the Building display with new info
        updateBuildingDisplay();


        //Unlocking Buildings

         // Unlock the next building if possible
         if (Building.unlockNextBuilding()) {
            const currentIndex = buildings.buildingList.indexOf(Building);
            const nextBuilding = buildings.buildingList[currentIndex + 1];
            nextBuilding.unlock();

            // Create and append the HTML for the new building if not already created
            const buildingElement = document.querySelector(`.building-${currentIndex + 1}`);
            if (!buildingElement) {
                const newBuildingElement = createBuildingElement(nextBuilding);
                appendBuildingToContainer(newBuildingElement, currentIndex + 1);
                console.log(`Building Added: ${nextBuilding.name}`);

        /*
        if (Building.unlockNextBuilding()){

            // find index of Building in the buildings list
            const currentIndex = buildings.buildingList.indexOf(Building);
            // unlock the next building in the list
            const nextBuilding = buildings.buildingList[currentIndex + 1];
            nextBuilding.unlock();
            console.log(`Building Unlocked: ${nextBuilding.name}`);

            // Create and append the HTML for the new building
            const buildingElement = createBuildingElement(nextBuilding);
            appendBuildingToContainer(buildingElement);
            console.log(`Building Added: ${nextBuilding.name}`);

        */
        }
        } else {
            console.log(`Not enough kitties to upgrade ${Building.name}!`);
        }
    }
}

clickerBox.addEventListener('click', () => buyBuilding(buildings.clicker));


function appendBuildingToContainer(buildingElement, index) {
    const buildingContainer = document.querySelector('.building-container');
    buildingElement.classList.add(`building-${index}`);
    buildingContainer.appendChild(buildingElement);
}



// ###### Cheats ##### //
function cheatButtonClick() {
    // Add 1000 to the total kitties
    totalKittiesNum += 1000;
    updateTotalKitties(); // Update the total kitties displayed on the page
}

// Add a click event listener to the cheat button
cheatBtn.addEventListener('click', cheatButtonClick);

//export { totalKittiesNum, cps };