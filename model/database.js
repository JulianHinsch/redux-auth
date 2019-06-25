const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    operatorsAliases: false, //fixes https://github.com/sequelize/sequelize/issues/8417 
});

const User = require('./schema/user')(database, Sequelize);

const sync = () => database.sync({ force: true });


const seed = () => {
    return sync()
    .then(async () => {
        const users = [
            {
                email: 'jhinsch799@gmail.com',
                password: 'temp',
                name: 'Julian Hinsch',
            },
            {
                email: 'jane.doe@gmail.com',
                password: 'temp',
                name: 'Jane Doe',
            },
            {
                email: 'john.doe@gmail.com',
                password: 'temp',
                name: 'John Doe',
            },
        ];
        const seedUsers = users.map(async user => {
            const emailHash = await User.prototype.generateEmailHash(user.email) 
            const passwordHash = await User.prototype.generatePasswordHash(user.password);            
            User.create({
                email: user.email,
                emailHash: emailHash,
                name: user.name,
                passwordHash: passwordHash,
            });
        });
        return Promise.all(seedUsers);
    })
}


module.exports = {
    models: {
        User,
    },
    sync,
    seed,
};