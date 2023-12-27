
let cat = document.querySelector('#cat');
let totalKitties = document.querySelector('#total-kitties');
let totalKittiesNum = parseFloat(totalKitties.innerHTML);

let cpsElement = document.querySelector('#cps');
let cps = parseFloat(cpsElement.innerHTML);

let clickerElement = document.querySelector('.building');

function clickCat() {
    console.log("Clicked the cat!");
    totalKittiesNum++;
    updateTotalKitties();
}

function updateTotalKitties() {
    totalKitties.innerHTML = totalKittiesNum;
}

// Add a click event listener to the cat element
cat.addEventListener('click', clickCat);

//// Building logic

function clickClicker() {
    alert('You clicked the clicker!');
    clicker.buyBuilding(totalKittiesNum, cps);
    updateTotalKitties();
    updateCPS(cps);
}

clickerElement.addEventListener('click', clickClicker);