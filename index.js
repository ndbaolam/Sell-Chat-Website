const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const systemConfig = require("./config/system");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('express-flash'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const moment = require('moment');
const http = require('http');
const { Server } = require("socket.io");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

dotenv.config();

database.connect();

const routesClient = require("./routes/client/index.route.js");
const routesAdmin = require("./routes/admin/index.route.js");
const config = require('./config/facebook.js');

const app = express();
const port = process.env.PORT;

//SocketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
//End SocketIO

//Facebook Login
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
//End Facebook Login

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(methodOverride('_method'))
app.use(express.static(`${__dirname}/public`));

 /* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//flash
app.use(cookieParser('BaoLamIuMinhAnh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//App global variable - just for Pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

routesClient(app);
routesAdmin(app);

// 404 Not Found
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
      pageTitle: "404 Not Found",
    });
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});