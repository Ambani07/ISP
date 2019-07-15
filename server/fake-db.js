const Customer = require('./models/customers');
const User = require('./models/user');
const Product = require('./models/products');
const CustomerProduct = require('./models/customerProduct');


class FakeDb {
    constructor(){
        this.customers = [{
            name: "Ambani",
            surname: "Matsedu",
            email: "example@gmail.com",
            company: "BCX",
            contactPersonName: "Peter",
            contactPersonCellNo: "011 252 7845",
            contactPersonPhoneNo: "072 548 9655",
            address: "13 Main Rd, Johannesburg, Bryanston, 2188",
        },
        {
            name: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            company: "Telkom",
            contactPersonName: "Peter",
            contactPersonCellNo: "011 252 7845",
            contactPersonPhoneNo: "072 548 9655",
            address: "13 Main Rd, Johannesburg, Bryanston, 2188",
        },
        {
            name: "Lionel",
            surname: "Messi",
            email: "lionel.messi@gmail.com",
            company: "Facebook",
            contactPersonName: "Peter",
            contactPersonCellNo: "011 252 7845",
            contactPersonPhoneNo: "072 548 9655",
            address: "13 Main Rd, Johannesburg, Bryanston, 2188",
        }];

        this.users = [{
            username : "Test User",
            email : "test@bcx.co.za",
            password : "test" 
        }];

        this.products = [{
            name: "BCX Dedicated Internet",
        },
        {
            name: "Enterprise Internet Hosted"       
        },
        {
            name: "Enterprise Internet Premise"
        },
        {
            name: "Enterprise Internet Ti-Dis"       
        }];

        this.customerProduct = [{
            term: 5,
            vlanId : "5416841363543",
            circuitNo: '7795544474',
            accessType: 'LAN connect',
            accessSpeed: '5',
            noIPs: '2',
            totalBandwidth: '10',
            localBandwidth: '6',
            intBandwidth: '4',
            productName: "EI",
            username: "peter",
            accessUsername: "peter123"
        },
        {
            term: 1,
            vlanId : "23559474",
            circuitNo: '98985524',
            accessType: 'Managed LAN',
            accessSpeed: '6',
            noIPs: '20',
            totalBandwidth: '20',
            localBandwidth: '12',
            intBandwidth: '8',
            productName: "BCX DI",
            username: "john",
            accessUsername: "john123"
        },
        {
            term: 3,
            vlanId : "9665874232",
            circuitNo: '3365478',
            accessType: 'MetroLink',
            accessSpeed: '12',
            noIPs: '15',
            totalBandwidth: '30',
            localBandwidth: '24',
            intBandwidth: '12',
            productName: "TI-DIS",
            username: "Ella",
            accessUsername: "Ella123"
        }];

    }

    async cleanDb(){
        await User.remove({});
        await Customer.remove({});
        await Product.remove({});
        await CustomerProduct.remove({});
    }

    pushDataToDb(){
        const user = new User(this.users[0]);

        this.products.forEach((product) => {
            const newProduct = new Product(product);
            newProduct.user = user;

            user.products.push(newProduct);
            newProduct.save();
        });

        //create customers to DB
        this.customers.forEach((customer) => {
            const newCustomer = new Customer(customer);
            newCustomer.user = user;
            newCustomer.productId = new Product(this.products[Math.floor(Math.random() * this.products.length)]);

            user.customers.push(newCustomer);
            newCustomer.save();
        });

        this.customerProduct.forEach((customerProduct) => {
            const newCustomerProduct = new CustomerProduct(customerProduct);
            
            newCustomerProduct.userId = user;
            newCustomerProduct.customerId = new Customer(this.customers[Math.floor(Math.random() * this.customers.length)]);
            newCustomerProduct.customerProductId = new Product(this.products[Math.floor(Math.random() * this.products.length)]);

            newCustomerProduct.save();
        });

        user.save();
    }

    async seedDb(){
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;
