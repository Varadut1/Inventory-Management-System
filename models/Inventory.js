const { read, write } = require('../utils/jsonOp');

const filePath = '../data/inventory.json'

class Inventory {
    constructor() {
        this.items = read(filePath);
    }

    save(){
        write(filePath, this.items);
    }
    addItem(productId, name, quantity, type){
        if(this.items[productId]){
            this.items[productId] += quantity;
        }
        else{
            this.items[productId] = {name, quantity, type};
        }
        this.save();
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
    getQuantity(productId){
        return this.items[productId] ? this.items[productId].quantity : 0;
    }
}

module.exports = new Inventory();