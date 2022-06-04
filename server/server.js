const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");

/* Drop then resync database everytime redeployed
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
*/

// simple route
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
require("./app/routes/tutorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


