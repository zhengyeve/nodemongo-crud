const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
// const connectDb = require('./config/db.config')

const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// view engine
app.set('view engine', 'ejs');
 
// middleware & static files
app.use(express.static('public')); //this will helps to use style.css file

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

// add user 
app.get('/user/create', (req, res)=>{
    res.render('user-add', {
        title:'Add User'
    });
})




require("./routes/user.routes")(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});