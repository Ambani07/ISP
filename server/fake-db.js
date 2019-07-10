const Customer = require('./models/customers');
const User = require('./models/user');

class FakeDb {
    constructor(){
        this.customers = [{
            name: "Ambani",
            surname: "Matsedu",
            email: "example@gmail.com",
            city: "Johannesburg",
            street: "2626 Costa Rico",
            region: "Centurion",
            contactPerson: "Joe",
            contactPersonPhoneNumber: '0728866974',
            contactPersonCellNumber: '0123456789',
            category: 'Enterprise Internet',
            term: 5
        },
        {
            name: "John",
            surname: "Doe",
            email: "john.doe@example.com",
            city: "Johannesburg",
            street: "565 main street",
            region: "Teraco",
            contactPerson: "Joe",
            contactPersonPhoneNumber: '0728866974',
            contactPersonCellNumber: '0123456789',
            category: 'TI-DIS',
            term: 3
        },
        {
            name: "Lionel",
            surname: "Messi",
            email: "lionel.messi@gmail.com",
            city: "Durban",
            street: "1st street",
            region: "Bellville",
            contactPerson: "Felipe",
            contactPersonPhoneNumber: '0728866974',
            contactPersonCellNumber: '0123456789',
            category: 'BCX DI',
            term: 2
        }];

        this.users = [{
            username : "Test User",
            role : "PMO",
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
