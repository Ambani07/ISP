const Customer = require('./models/customers');
const User = require('./models/user');

class FakeDb {
    constructor(){
        this.customers = [{
            name: "Ambani",
            surname: "Matsedu",
            email: "example@gmail.com",
            company: "BCX",
            product: "BCX DI",
            term: 5
        },
        {
            name: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            company: "Telkom",
            product: "TI-DIS",
            term: 5
        },
        {
            name: "Lionel",
            surname: "Messi",
            email: "lionel.messi@gmail.com",
            company: "EI",
            product: "BCX DI",
            term: 5
        }];

        this.users = [{
            username : "Test User",
            email : "test@gmail.com",
            password : "testtest" 
        }]
    }

    async cleanDb(){
        await User.remove({});
        await Customer.remove({});
    }

    pushDataToDb(){
        const user = new User(this.users[0]);
        //iterate
        this.customers.forEach((customer) => {
            const newCustomer = new Customer(customer);
            newCustomer.user = user;

            user.customers.push(newCustomer);
            newCustomer.save();
        });

        user.save();
    }

    async seedDb(){
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDb;
