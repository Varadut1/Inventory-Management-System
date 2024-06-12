const { read, write } = require('../utils/jsonOp');
const { v4: uuidv4 } = require('uuid');
const filePath = '../data/discount.json';

class Discount {
    constructor() {
        this.discounts = read(filePath) || {};
    }

    async save() {
        await write(filePath, this.discounts);
    }

    createDiscount(percentage, maxCap) {
        const discountId = uuidv4();
        this.discounts[discountId] = { discountId, percentage, maxCap };
        this.save();
        return {discountId, percentage, maxCap};
    }

    getDiscount(discountId) {
        return this.discounts[discountId] || null;
    }
    getAllDiscount(){
        return this.discounts;
    }
}

module.exports = new Discount();
