const { read, write } = require('../utils/jsonOp');
const filePath = '../data/customer.json';
const { v4: uuidv4 } = require('uuid');

class Customer {
    constructor() {
        this.customers = read(filePath) || {};
    }

    async save() {
        await write(filePath, this.customers);
    }

    createCustomer(name, email, password) {
        
        if(!this.findCustomerByEmail(email)){
            const customerId = uuidv4();
            this.customers[customerId] = { name, email, password, customerId, role: 'customer'};
            this.save();
            return this.customers[customerId];
        }
        else{
            return false;
        }
    }

    findCustomerByEmail(email) {
        return Object.values(this.customers).find(customer => customer.email === email) || null;
    }
    findCustomerById(id){
        if(this.customers[id])  return this.customers[id];
        else return false;
    }
    validateCustomer(email, password) {
        const customer = this.findCustomerByEmail(email);
        if (customer && customer.password === password) {
            return customer;
        }
        return null;
    }
}

module.exports = new Customer();
