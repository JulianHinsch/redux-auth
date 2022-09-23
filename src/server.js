require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./model/database");

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
}

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser()); // you can provide a secret here to sign cookies if you wish

const router = require("./routes");
app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
}

// general error handling
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.sendStatus(err.status);
    res.sendStatus(500);
  }
  next(err);
});

console.log('Initializing database...');
database.initialize().then(() => {
  if (process.env.NODE_ENV !== "production") {
    console.log('Seeding database...');
    database.seed();
  } else {
    console.log('Syncing database...');
    database.sync();
  }

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log("Listening on", port);
  });
}).catch((err) => {
  console.log('Error initializing database', err);
})


