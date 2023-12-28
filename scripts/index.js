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
    const newtotalKitties = buildings.clicker.updatedTotalKitties(totalKittiesNum);

    if (buildings.clicker.upgradeBuilding()){

        // const newtotalKitties = buildings.clicker.updatedTotalKitties(totalKittiesNum);
        totalKittiesNum = newtotalKitties;
        updateTotalKitties();

        const addedCPS = buildings.clicker.updatedCPS()
        cps = addedCPS;
        updateCPS();

        updateBuildingDisplay();
    }

    updateBuildingDisplay();

    /* 
    console.log('########################')
    console.log('Name:', buildings.clicker.name);
    console.log('Slogan:', buildings.clicker.slogan);
    console.log('Base CPS:', buildings.clicker.baseCPS);
    console.log('Base Cost:', buildings.clicker.baseCost);
    console.log('Level:', buildings.clicker.level);
    console.log('Current Cost:', buildings.clicker.cost);
    console.log('Availability:', buildings.clicker.available);
    */
}
clickerBox.addEventListener('click', clickClicker);

export {totalKittiesNum, cps};