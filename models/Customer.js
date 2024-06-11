const { read, write } = require('../utils/jsonOp');
const filePath = '../data/customer.json';

class Customer {
    constructor() {
        this.customers = read(filePath);
    }

    async save() {
        await write(filePath, this.customers);
    }

    createCustomer(name, email, password) {
        if(!this.customers[email]){
            this.customers[email] = { name, email, password };
            this.save();
            return true;
        }
        else{
            return false;
        }
    }

    findCustomerByEmail(email) {
        return this.customers[email] || null;
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
