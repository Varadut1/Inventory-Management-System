const { read, write } = require('../utils/jsonOp');
const filePath = '../data/cart.json';
const Inventory = require('./Inventory');

class Cart {
    constructor() {
        this.carts = read(filePath);
    }

    save() {
        write(filePath, this.carts);
    }

    addItem(customerId, productId, quantity) {
        if (!this.carts[customerId]) {
            this.carts[customerId] = {};
        }
        if (this.carts[customerId][productId]) {
            this.carts[customerId][productId] += quantity;
        } else {
            this.carts[customerId][productId] = quantity;
        }
        this.save();
    }

    getCart(customerId) {
        return this.carts[customerId] || {};
    }

    getTotalValue(customerId) {
        const cart = this.getCart(customerId);
        let totalValue = 0;
        for (const productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                totalValue += Inventory.getQuantity(productId) * cart[productId];
            }
        }
        return totalValue;
    }
}

module.exports = new Cart();
