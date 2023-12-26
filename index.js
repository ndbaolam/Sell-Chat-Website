const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const systemConfig = require("./config/system");

dotenv.config();

database.connect();

const routesClient = require("./routes/client/index.route.js");
const routesAdmin = require("./routes/admin/index.route.js");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

//App global variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`App listening on prot ${port}`);
});