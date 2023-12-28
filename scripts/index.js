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

//test function
function showBuildingsUnlocked(buildingList) {
    console.log('Buildings:');
  
    for (const building of buildingList) {
      if (building.available) {
        console.log(`${building.name} is available`);
      } else {
        console.log(`${building.name} is locked`);
      }
    }
  }


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

        if (Building.unlockNextBuilding()){

            // find index of Building in the buildings list
            const currentIndex = buildings.buildingList.indexOf(Building);
            // unlock the next building in the list
            const nextBuilding = buildings.buildingList[currentIndex + 1];
            nextBuilding.unlock();
        }

        //(test function) Shows which buildings are locked/unlocked
        //showBuildingsUnlocked(buildings.buildingList);
        
   } else {
        console.log(`Not enough kitties to upgrade ${Building.name}!`);
   }
}

clickerBox.addEventListener('click', () => buyBuilding(buildings.clicker));


// ###### Cheats ##### //
function cheatButtonClick() {
    // Add 1000 to the total kitties
    totalKittiesNum += 1000;
    updateTotalKitties(); // Update the total kitties displayed on the page
}

// Add a click event listener to the cheat button
cheatBtn.addEventListener('click', cheatButtonClick);

export {totalKittiesNum, cps};