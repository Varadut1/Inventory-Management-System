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

    createCustomer(name, email, password, role, authority) {
        if (!this.findCustomerByEmail(email)) {
            const customerId = uuidv4();
            this.customers[customerId] = { name, email, password, customerId, role: role || 'customer' };
            if (role === 'admin') {
                this.customers[customerId].authority = authority;
            }
            this.save();
            return this.customers[customerId];
        } else {
            return false;
        }
    }

    findCustomerByEmail(email) {
        return Object.values(this.customers).find(customer => customer.email === email) || null;
    }

    findCustomerById(id) {
        return this.customers[id] || null;
    }

    validateCustomer(email, password) {
        const customer = this.findCustomerByEmail(email);
        console.log(customer, email, password)
        if (customer && customer.password === password) {
            return customer;
        }
        return null;
    }

    getCustomers() {
        return this.customers;
    }
}

module.exports = new Customer();
