// The Buildings Class

class Building {
    constructor(name, slogan, baseCPS, baseCost, currency) {
        this.name = name;
        this.slogan = slogan;
        this.baseCPS = baseCPS;
        this.baseCost = baseCost;
        this.level = 0;
        this.cost = this.calculateCost();
        this.available = false;
    }

    // Price Formula: base cost * 1.15^M (where M is the number of that building owned)
    calculateCost() {
        return Math.floor(this.baseCost * Math.pow(1.15, this.level));
    }

    /**
     * Buys a building. 
     * Subtracts from the Total Kitties, increases building level, and 
     * re-calculates the cost of the building. 
     * @param {number} totalKittiesNum 
     * @param {number} cps 
     * @returns Building
     */
    buyBuilding(totalKittiesNum, cps){
        if (totalKittiesNum >= this.cost) {
            totalKittiesNum -= this.cost;
            this.level++
            this.cost = this.calculateCost();
            return true;
        } else {
            alert(`Not enough kitties to buy ${this.name}!`);
            return false;
        }
    }

    /**
     * Updates the CpS (clicks per second).
     * Multiples the base CPS of the building by its level for the total sum,
     * which gets added to the cps. 
     * @param {number} cps 
     */
    updateCPS(cps){
        cpsElement.innerHTML = this.baseCPS * this.level;
    }

}

// List of Buildings
const clicker = new Building('Cursor', 'Clicks the big cat', 1, 10);
const treatBag = new Building('Treat Bag', 'Treats that attract cats', 2, 15);
const catnipGarden = new Building('Catnip Garden', 'Cultivates high-quality catnip', 8, 1000);
const milkBar = new Building('Milk Bar', 'Serves different flavors of milk', 10, 1500);
const fishMarket = new Building('Fish Market', 'Offers a variety of fish', 15, 2000);

