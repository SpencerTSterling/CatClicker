import * as buildings from "./buildings.js";

let cat = document.querySelector('#cat');
let totalKitties = document.querySelector('#total-kitties');
let totalKittiesNum = parseFloat(totalKitties.innerHTML);

let cpsElement = document.querySelector('#cps');
let cps = parseFloat(cpsElement.innerHTML);

let buildingLvl = document.querySelector('.building-level');
let buildingCost = document.querySelector('.building-cost');

let clickerBox= document.querySelector('.building');




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

//// ##################### Building logic #################///
function clickClicker() {
   /// console.log('Clicking the clicker!');

   if (totalKittiesNum >= buildings.clicker.cost){

        // New totalKitties total 
        const newtotalKitties = buildings.clicker.updatedTotalKitties(totalKittiesNum);
        totalKittiesNum = newtotalKitties;
        updateTotalKitties();

        //Upgrade building
        buildings.clicker.upgradeBuilding();

        // New CPS score
        const addedCPS = buildings.clicker.updatedCPS();
        cps = addedCPS;
        updateCPS();

        // Update the Clicker building info
        updateBuildingDisplay();
   } else {
        console.log(`Not enough kitties to upgrade ${buildings.clicker.name}!`);
   }
}

clickerBox.addEventListener('click', clickClicker);

export {totalKittiesNum, cps};