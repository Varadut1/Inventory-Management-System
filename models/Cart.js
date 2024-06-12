// const { read, write } = require('../utils/jsonOp');
// const filePath = '../data/cart.json';
// const Inventory = require('./Inventory');

// class Cart {
//     constructor() {
//         this.carts = read(filePath);
//     }

//     save() {
//         write(filePath, this.carts);
//     }
// //
//     addItem(customerId, productId, quantity) {
//         const quant = Inventory.getItemById(productId);
//         if(quant.quantity< quantity){
//             return false;
//         }
//         if (!this.carts[customerId]) {
//             this.carts[customerId] = {};
//         }
//         if (this.carts[customerId][productId]) {
//             this.carts[customerId][productId] += quantity;
//         } else {
//             this.carts[customerId][productId] = quantity;
//         }
//         this.save();
//         return {productId: quantity};
//     }

//     async getCart(customerId) {
//         let data = []
//         if(this.carts[customerId]){
//             return this.carts[customerId];
//         }
//         return data;
//     }

//     getTotalValue(customerId) {
//         const cart = this.carts[customerId];
//         let totalValue = 0;
//         for (const productId in cart) {
//             totalValue += Inventory.getPrice(productId) * cart[productId];
//         }
//         return totalValue;
//     }
// }

// module.exports = new Cart();


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
        const quant = Inventory.getQuantity(productId);
        if(quant < quantity){
            return false;
        }
        if (!this.carts[customerId]) {
            this.carts[customerId] = {};
        }
        if (this.carts[customerId][productId]) {
            if(this.carts[customerId][productId]+quantity > quant){
                return false;
            }
            this.carts[customerId][productId] += quantity;
        } else {
            this.carts[customerId][productId] = quantity;
        }
        this.save();
        return {[productId]: quantity};
    }

    getCart(customerId) {
        let data = []
        if(this.carts[customerId]){
            return this.carts[customerId];
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