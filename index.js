let cat = document.querySelector('#cat');
let totalKitties = document.querySelector('#total-kitties');
let totalKittiesNum = parseFloat(totalKitties.innerHTML);

function clickCat() {
    totalKittiesNum++;
    updateTotalKitties();
}

function updateTotalKitties() {
    totalKitties.innerHTML = totalKittiesNum;
}

// Add a click event listener to the cat element
cat.addEventListener('click', clickCat);
