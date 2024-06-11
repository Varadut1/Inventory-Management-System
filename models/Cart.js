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
//
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
        return {productId: quantity};
    }

    getCart(customerId) {
        let data = []
        if(this.carts[customerId]){
            for(const key in this.carts[customerId]){
                const name = Inventory.getItemById(key)['name'];
                const type = Inventory.getItemById(key)['type'];
                const quant = this.carts[customerId][key];
                const el = {
                    name,type,quant
                }
                data.push(el);
            }
        }
        return data;
    }

    getTotalValue(customerId) {
        const cart = this.carts[customerId];
        let totalValue = 0;
        for (const productId in cart) {
            totalValue += Inventory.getPrice(productId) * cart[productId];
        }
        return totalValue;
    }
}

module.exports = new Cart();
