const db = require('./models/db.js');
const initdb = require('./models/initdb.js');
initdb();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

/* const VKontakteStrategy = require('passport-vkontakte').Strategy;
app.use(require('body-parser').urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session()); */

app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const templating = require('consolidate');
const handlebars = require('handlebars');
templating.requires.handlebars = handlebars;

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const session = require('express-session');
const sessionStore = new (require('express-mysql-session')(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  //cookie: { maxAge: 600000 }
  expire: true
});

app.use(sessionMiddleware);

const middlewares = require('./middlewares');
app.use(middlewares.logSession);

const router = require('./routers');
app.use(router);

app.listen(3000, () => console.log('Listening on port 3000'));