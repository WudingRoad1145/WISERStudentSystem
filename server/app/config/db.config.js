module.exports = {
  //mysql://ba52576dd672f5:f484620c@us-cdbr-east-05.cleardb.net/heroku_ab72c991c22167b?
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "ba52576dd672f5",
    PASSWORD: "f484620c",
    DB: "heroku_ab72c991c22167b",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };