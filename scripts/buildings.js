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
     * @returns {number} The calcuated cost.
     */
    calculateCost() {
        return Math.floor(this.baseCost * Math.pow(1.15, this.level));
    }

    /**
     * Updates the CpS (clicks per second).
     * Multiplies the base CPS of the building by its level for the total sum.
     * @returns {number} The updated total CpS.
     */
    updatedCPS(){
        let totalCPS = 0;

        // Iterate through all unlocked buildings and accumulate CPS
        for (const building of buildingList) {
            if (building.available) {
                totalCPS += building.baseCPS * building.level;
            }
        }
    
        return parseFloat(totalCPS);
    }

    /**
     * Returns totalKittiesNum minus the cost of the building being purchased.
     * @param {number} totalKittiesNum - The current total kitties count.
     * @returns {number} The updated total kitties count.
     */
    updatedTotalKitties(totalKittiesNum){
        return parseFloat( totalKittiesNum - this.cost)
    }

    /**
     * Upgrades/Levels up a building.
     * Increases building level, and re-calculates the cost of the building.
     * @returns {boolean} True if the upgrade is successful.
     */
    upgradeBuilding(){
        this.level++;
        this.cost = this.calculateCost();
        return true;
    }

    /**
     * Unlocks the building by switching its availability.
     * @returns {boolean} True if the building is successfully unlocked.
     */
    unlock(){
        console.log(`Unlocked: ${this.name}`);
        return this.available = true;
    }

    /**
     * Checks if the next building can be unlocked.
     * @returns {boolean} True if the next building can be unlocked.
     */
    canUnlockNextBuilding(){
        return this.level >= this.baseCost && this.available;
    }

    }

// List of Buildings
const clicker = new Building("Clicker", "Clicks the big cat", 1, 10);
// this Building is automatically unlocked at the start of the game
clicker.unlock();
const treatBag = new Building("Treat Bag", "Treats that attract cats", 2, 15);
const catnipGarden = new Building("Catnip Garden", "Cultivates high-quality catnip", 8, 20);
const milkBar = new Building("Milk Bar", "Serves different flavors of milk", 10, 25);
const fishMarket = new Building("Fish Market", "Offers a variety of fish", 15, 30);

const buildingList = [clicker, treatBag, catnipGarden, milkBar, fishMarket];

export { clicker, treatBag, catnipGarden, milkBar, fishMarket, buildingList};