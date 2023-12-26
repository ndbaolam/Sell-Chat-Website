const express = require("express");
const dotenv = require("dotenv");
const routesClient = require("./routes/client/index.route.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

routesClient(app);

app.listen(port, () => {
    console.log(`App listening on prot ${port}`);
});