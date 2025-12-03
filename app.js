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

// connect to db 
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

// form parsing
const bodyParser = require('body-parser');
// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));


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

// user routes
require("./routes/user.routes")(app)

const users = require('./controllers/user.controller.js');

app.get('/users', (req, res) => {
  // controllers/user.controller.js exports findAll(req, res)
  // it expects an Express-like req/res and sends JSON. Create a
  // small response wrapper that captures the data and renders the
  // `users` view on success.
  const fakeRes = {
    send: (data) => {
      // Successful retrieval: render the users view with data
      res.render('users', {
        users: data,
        title: "All Users"
      });

        console.log(data);
    },
    status: (code) => ({
      send: (payload) => {
        // Forward error payloads to the real response with status
        res.status(code).send(payload);
      }
    })
  };

  // Delegate to the existing controller method which will call
  // fakeRes.send(...) with the found documents or fakeRes.status(...)
  users.findAll(req, fakeRes);

})

// User detail page (render HTML)
app.get('/user/:id', (req, res) => {
  // reuse controller which expects (req, res) and calls res.send(data)
  const fakeRes = {
    send: (data) => {
      // render the detail view with the user object
      res.render('user-detail', {
        user: data,
        action: '',
        title: 'User Profile'
    });
    },
    status: (code) => ({
      send: (payload) => {
        // forward error as JSON with status
        res.status(code).send(payload);
      }
    })
  };

  users.findOne(req, fakeRes);
});



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});