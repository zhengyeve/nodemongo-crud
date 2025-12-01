const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
// const connectDb = require('./config/db.config')

// /Users/eve.zheng/dev/nodemongo-crud/app.js
const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// Home page
app.get('/', (req, res) => {
    res.send('Hello World');
});


require("./routes/user.routes")(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});