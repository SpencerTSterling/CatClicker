import * as buildings from "./buildings.js";

let cat = document.querySelector("#cat");
let totalKitties = document.querySelector("#total-kitties");
let totalKittiesNum = parseFloat(totalKitties.innerHTML);

let cpsElement = document.querySelector("#cps");
let cps = parseFloat(cpsElement.innerHTML);


let clickerBox = document.querySelector(".building.clicker");
let treatBagBox = document.querySelector(".building.treat-bag");
let catnipGardenBox = document.querySelector(".building.catnip-garden");
let milkBarBox = document.querySelector(".building.milk-bar");
let fishMarketBox = document.querySelector(".building.fish-market");

let cheatBtn = document.querySelector("#cheat");


/**
 * Initializes the HTML representation of a building.
 * Updates its name, cost, and level.
 *  Adds the 'unlocked' class if the building is available.
 * @param {Object} Building - The building object to be initialized.
 * @returns {void}
 */
function initializeBuildingHTML(Building) {
    const buildingName = Building.name.replace(/\s+/g, "-").toLowerCase();
    const buildingElement = document.querySelector(`.building.${buildingName}`);
    // Update building name, cost, and level in the HTML
    buildingElement.querySelector(".building-name").textContent = Building.name;
    buildingElement.querySelector(".building-cost").textContent = Building.cost;
    buildingElement.querySelector(".building-level").textContent = Building.level;
    // Add the 'unlocked' class if the building is available
    if (Building.available) {
        buildingElement.classList.add("unlocked");
    }
}

initializeBuildingHTML(buildings.clicker);
initializeBuildingHTML(buildings.treatBag);
initializeBuildingHTML(buildings.catnipGarden);
initializeBuildingHTML(buildings.milkBar);
initializeBuildingHTML(buildings.fishMarket);


/**
 * Handles the cat click event.
 * Increments the total kitties count and updates the display.
 * @returns {void}
 */
function clickCat() {
    console.log("Clicked the cat!");
    totalKittiesNum++;
    updateTotalKitties();
}

/**
 * Updates the displayed total kitties count.
 * @returns {void}
 */
function updateTotalKitties() {
    totalKitties.innerHTML = parseFloat(totalKittiesNum);
}

/**
 * Updates the displayed CPS (Clicks Per Second).
 * @returns {void}
 */
function updateCPS() {
    cpsElement.innerHTML = cps;
}

/**
 * Updates the displayed level and cost of a building.
 * @param {Object} Building - The building object to be updated.
 * @returns {void}
 */
function updateBuildingDisplay(Building) {
    // Building name converted to the class name on the building's div
    const buildingClassName = Building.name.replace(/\s+/g, "-").toLowerCase();

    // Select the elements for the building being updated
    const buildingLvlSelector = `.${buildingClassName} .building-level`;
    const buildingCostSelector = `.${buildingClassName} .building-cost`;
    // Retrieve the HTML elements representing the building's level and cost
    const buildingLvl = document.querySelector(buildingLvlSelector);
    const buildingCost = document.querySelector(buildingCostSelector);
    // Update the building level and cost
    buildingLvl.innerHTML = Building.level;
    buildingCost.innerHTML = Building.cost;
}


/**
 * Automattically adds kitties based on CPS
 * @param {number} cps The (Clicks Per Second) value
 */
function autoAddCPS(cps) {
    setInterval(() => {
        totalKittiesNum += parseFloat(cpsElement.innerHTML); // Increment totalKittiesNum by cps
        updateTotalKitties(); // Update the total kitties displayed on the page
    }, 1000); // CPS is per second, so the interval is set to 1000ms (1 second)
}

// Call the function to start auto-adding kitties based on CPS
autoAddCPS(cps);

// Add a click event listener to the cat element
cat.addEventListener("click", clickCat);

/**
 * Handles the purchase and upgrade of a building.
 * Subtracts building cost from Total Kitties, upgrades building level and
 * recalculates cost, increases CpS, & updates the building display.
 * @param {Building} Building The building to be purchased and upgraded.
 * @throws {Error} Will throw an error if the provided Building is undefined.
 * @returns {void}
 */
function buyBuilding(Building) {
    console.log(`You bought a ${Building.name}`);
    // Ensure a valid Building object is provided
    if (!Building) {
        throw new Error("Invalid Building object provided.");
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
        updateBuildingDisplay(Building);


        //Unlocking Buildings
            const currentIndex = buildings.buildingList.indexOf(Building);
            const nextBuilding = buildings.buildingList[currentIndex + 1];
        if (Building.canUnlockNextBuilding() && !nextBuilding.available) {
            nextBuilding.unlock();
            toggleBuildingClass(nextBuilding);
        } else if (!nextBuilding){
            console.log("You've unlocked all the buildings!")
        }
    } else {
        console.log(`Not enough kitties to upgrade ${Building.name}!`);
    }
}

/**
 * Unlocks a building by displaying the next Building to be unlocked.
 * Removes the "locked" class from the building div
 * and replaces it with "unlocked".
 * @param {Object} building - The building object to be unlocked.
 * @returns {void}
 */
function toggleBuildingClass(building) {
    const buildingName = building.name.replace(/\s+/g, "-").toLowerCase();
    const buildingElements = document.querySelectorAll(`.building.${buildingName}`);

    buildingElements.forEach(element => {
        element.classList.toggle("locked");
        element.classList.toggle("unlocked");
    });
}

clickerBox.addEventListener("click", () => buyBuilding(buildings.clicker));
treatBagBox.addEventListener("click", () => buyBuilding(buildings.treatBag));
catnipGardenBox.addEventListener("click", () => buyBuilding(buildings.catnipGarden));
milkBarBox.addEventListener("click", () => buyBuilding(buildings.milkBar));
fishMarketBox.addEventListener("click", () => buyBuilding(buildings.fishMarket));



/**
 * Handles the cheat button click event.
 * Adds 1000 to the total kitties count.
 * @returns {void}
 */
function cheatButtonClick() {
    // Add 1000 to the total kitties
    totalKittiesNum += 1000;
    updateTotalKitties(); // Update the total kitties displayed on the page
}

// Add a click event listener to the cheat button
cheatBtn.addEventListener("click", cheatButtonClick);

export { totalKittiesNum, cps };