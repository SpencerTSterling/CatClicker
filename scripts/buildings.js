// The Buildings Class

class Building {
    constructor(name, slogan, baseCPS, baseCost) {
        this.name = name;
        this.slogan = slogan;
        this.baseCPS = baseCPS;
        this.baseCost = baseCost;
        this.level = 0;
        this.cost = this.calculateCost();
        this.available = false;
    }

    /**
     * Calculates cost of a building based on its level
     * @returns 
     */
    calculateCost() {
        return Math.floor(this.baseCost * Math.pow(1.15, this.level));
    }

    /**
     * Updates the CpS (clicks per second).
     * Multiples the base CPS of the building by its level for the total sum
     */
    updatedCPS(){
        return parseFloat(this.baseCPS * this.level);
    }

    /**
     * Returns totalKittiesNum minus the cost of the building being purchased
     * @param {*} totalKittiesNum 
     * @returns 
     */
    updatedTotalKitties(totalKittiesNum){
        return parseFloat( totalKittiesNum - this.cost)
    }


    /**
     * Upgrades/Levels up a building. 
     * Increases building level, and re-calculates the cost of the building. 
     * @returns Building
     */
    upgradeBuilding(){
            this.level++;
            this.cost = this.calculateCost();
            return true;
        }

    }

// List of Buildings
const clicker = new Building('Clicker', 'Clicks the big cat', 1, 10);
const treatBag = new Building('Treat Bag', 'Treats that attract cats', 2, 15);
const catnipGarden = new Building('Catnip Garden', 'Cultivates high-quality catnip', 8, 1000);
const milkBar = new Building('Milk Bar', 'Serves different flavors of milk', 10, 1500);
const fishMarket = new Building('Fish Market', 'Offers a variety of fish', 15, 2000);

//Clicker attributes
function clickerLog(clicker) {
    console.log('Name:', clicker.name);
    console.log('Slogan:', clicker.slogan);
    console.log('Base CPS:', clicker.baseCPS);
    console.log('Base Cost:', clicker.baseCost);
    console.log('Level:', clicker.level);
    console.log('Current Cost:', clicker.cost);
    console.log('Availability:', clicker.available);
}

export { clicker , clickerLog};