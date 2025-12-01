const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
// const connectDb = require('./config/db.config')

const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views
var path = require('node:path');
app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');


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


// Hello World
app.get('/', (req, res) => {
    res.send('Hello World');
});

// page renders 
app.get('/home', (req, res) => {
    res.render('home', {
        title: "Home Page"
    });

});

require("./routes/user.routes")(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});