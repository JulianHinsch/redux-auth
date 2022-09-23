const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const initialize = () => {
  return sequelize.authenticate();
}

const User = require("./schema/User")(sequelize, Sequelize);

const sync = () => sequelize.sync({ force: true });

const seed = () => {
  return sync().then(async () => {
    const users = [
      {
        email: "jane.doe@gmail.com",
        password: "temp",
        name: "Jane Doe",
      },
      {
        email: "john.doe@gmail.com",
        password: "temp",
        name: "John Doe",
      },
    ];
    const seedUsers = users.map(async (user) => {
      const emailHash = await User.prototype.generateEmailHash(user.email);
      const passwordHash = await User.prototype.generatePasswordHash(
        user.password
      );
      User.create({
        email: user.email,
        emailHash: emailHash,
        name: user.name,
        passwordHash: passwordHash,
      });
    });
    return Promise.all(seedUsers);
  });
};

module.exports = {
  models: {
    User,
  },
  initialize,
  sync,
  seed,
};
