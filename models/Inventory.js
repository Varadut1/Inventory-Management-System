// const { read, write } = require('../utils/jsonOp');
// const { v4: uuidv4 } = require('uuid');
// const Cart = require('../models/Cart');

// const filePath = '../data/inventory.json'

// class Inventory {
//     constructor() {
//         this.items = read(filePath);
//     }

//     save(){
//         write(filePath, this.items);
//     }
//     addItem(name, type, quantity, price){
//         const existingItem = this.findItemByNameAndType(name, type);
//         if(existingItem){
//             this.items[existingItem.productId] += quantity;
//             this.save();
//             return this.items[existingItem.productId];
//         }
//         else{
//             const productId = uuidv4();
//             this.items[productId] = {productId, name, type, quantity, price};
//             this.save();
//             return this.items[productId];
//         }
//     }

//     removeItem(productId, quantity, customerId){
//         if(this.items[productId]){
//             if(this.items[productId].quantity < quantity){
//                 return false;
//             }
//             this.items[productId].quantity -= quantity;
//             if(this.items[productId].quantity <= 0){
//                 delete this.items[productId];
//                 this.removeProductFromCarts(productId, customerId);
//                 this.save();
//                 return null
//             }
//         }
//         this.save();
//         return this.items[productId];
//     }

//     async removeProductFromCarts(productIdToRemove, customerId) {
//         const cart = Cart; 
//         let newcart = cart.carts 
//         for (const userId in newcart) {
//             if (newcart[userId][productIdToRemove] && userId!==customerId) {
//                 delete newcart[userId][productIdToRemove]
//             }
//         }
//         cart.carts = newcart
//         await cart.save();
//     }

//     getItems(){
//         return this.items;
//     }
//     getPrice(productId){
//         return this.items[productId]['price'];
//     }
//     getItemById(productId){
//         if(this.items[productId]){
//             return this.items[productId];
//         }
//     }
//     getQuantity(productId){
//         return this.items[productId] ? this.items[productId].quantity : 0;
//     }

//     findItemByNameAndType(name, type) {
//         return Object.values(this.items).find(item => item.name === name && item.type === type) || null;
//     }
// }

// module.exports = new Inventory();


const { read, write } = require('../utils/jsonOp');
const { v4: uuidv4 } = require('uuid');
// const Cart = require('../models/Cart');
const filePath = '../data/inventory.json'
const filePath2 = '../data/cart.json';

class Inventory {
    constructor() {
        this.items = read(filePath);
    }

    save(){
        write(filePath, this.items);
    }
    addItem(name, type, quantity, price){
        const existingItem = this.findItemByNameAndType(name, type);
        if(existingItem){
            this.items[existingItem.productId] += quantity;
            this.save();
            return this.items[existingItem.productId];
        }
        else{
            const productId = uuidv4();
            this.items[productId] = {productId, name, type, quantity, price};
            this.save();
            return this.items[productId];
        }
    }

    async removeItem(productId, quantity, customerId){
        if(quantity > this.items[productId]['quantity']){
            return false;
        }
        if(this.items[productId]){
            this.items[productId]['quantity'] -= quantity;
            await this.save();
            this.removeProductFromCarts(productId, customerId, quantity);
            if(this.items[productId].quantity <= 0){
                delete this.items[productId];
                this.removeProductFromCarts(productId, customerId, quantity);
                await this.save();
                return null
            }
        }
        await this.save();
        return this.items[productId];
    }
    getItems(){
        return this.items;
    }
    getPrice(productId){
        return this.items[productId]['price'];
    }
    getItemById(productId){
        if(this.items[productId]){
            return this.items[productId];
        }
    }
    getQuantity(productId){
        return this.items[productId] ? this.items[productId].quantity : 0;
    }

    findItemByNameAndType(name, type) {
        return Object.values(this.items).find(item => item.name === name && item.type === type) || null;
    }

    async removeProductFromCarts(productIdToRemove, customerId, quantity) {
        try {
            let newcart = await read(filePath2);
            for (const userId in newcart){
                if (newcart[userId][productIdToRemove] && quantity >= newcart[userId][productIdToRemove]) {
                    delete newcart[userId][productIdToRemove]
                }
            }
            await write(filePath2, newcart);
        } catch (error) {
            console.error('Error reading file:', error);
            return null;
        }
    }
}

module.exports = new Inventory();