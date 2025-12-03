const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {
    // validate request 
    if (!req.body.name || !req.body.password) {
        res.status(400).send({ message: "Please enter user name and password!"})
        return;
    }

    // create a user
    var emailGen = req.body.name.replace(/[^\w]/g, '_').toLowerCase() + '.' + req.body.surname.replace(/[^\w]/g, '_').toLowerCase() + "@apolloniadental.com"
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        email: req.body.email ? req.body.email : emailGen,
        department: req.body.department ? req.body.department : "UNASSIGNED"
    })

    // save
    user.save(user)
        .then(data => {res.send(data)})
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user!"
            })
        })
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {

    User.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Cannot find user with id=${id}!`});
            else res.send(data);
        })
  
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        })
    };

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User is not found?`
                })
            } else {
                res.send({
                    message: `User was updated successfully! (id=${id})`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User with id=${id}`
            })
        })
  
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User is not found?`
                })
            } else {
                res.send({
                    message: `User was deleted successfully! (id=${id})`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id}`
            })
        })
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred removing all users."
            })
        })
};
