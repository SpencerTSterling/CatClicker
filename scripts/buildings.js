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
}

// List of Buildings
const clicker = new Building('Cursor', 'Clicks the big cat', 1, 10);
const treatBag = new Building('Treat Bag', 'Treats that attract cats', 2, 15);
const catnipGarden = new Building('Catnip Garden', 'Cultivates high-quality catnip', 8, 1000);
const milkBar = new Building('Milk Bar', 'Serves different flavors of milk', 10, 1500);
const fishMarket = new Building('Fish Market', 'Offers a variety of fish', 15, 2000);

