module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Gaurav@09",
  DB: "emi_calculator",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
