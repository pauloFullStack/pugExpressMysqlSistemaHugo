const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const uuid = require("uuid");
const crypto = require("crypto");
// Route
const indexRouter = require("./routes/index");
const customers = require("./routes/customers");
const loginRoute = require("./routes/login");
const products = require("./routes/products");
const requests = require("./routes/requests");
// Controller Login
const login = require("./controllers/login");

const app = express();

const myUUID = uuid.v4();
const hashedUUID = crypto.createHash("sha256").update(myUUID).digest("hex");
// Configurar o middleware express-session
app.use(
  session({
    secret: hashedUUID,
    resave: false,
    saveUninitialized: true,
    cookie: {
      originalMaxAge: 60 * 60 * 1000, // 1 hora em milissegundos
      expires: new Date(Date.now() + 60 * 60 * 1000), // Expira em 1 hora a partir do momento atual
      httpOnly: false,
      secure: false, // Remova o comentário se estiver usando HTTPS
    },
    loggedin: false,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (!req.session.loggedin && req.method === "POST") {
    return login.check_login(req, res);
  } else if (!req.session.loggedin) {
    return login.form_login(req, res);
  } else {
    next();
  }
});

app.use("/", indexRouter);
app.use("/customers", customers);
app.use("/logout", loginRoute);
app.use("/products", products);
app.use("/requests", requests);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
