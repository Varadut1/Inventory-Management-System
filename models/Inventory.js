const { read, write } = require('../utils/jsonOp');
const { v4: uuidv4 } = require('uuid');

const filePath = '../data/inventory.json'

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

    removeItem(productId, quantity){
        if(this.items[productId]){
            this.items[productId].quantity -= quantity;
            if(this.items[productId].quantity <= 0){
                delete this.items[productId];
                this.save();
                return null
            }
        }
        this.save();
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
}

module.exports = new Inventory();