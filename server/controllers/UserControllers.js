const db = require("../models");
const users = require("../models/userModels");

exports.createUsers = (req, res) => {
  const getRandomDigits = (length = 1) =>
    Array(length)
      .fill()
      .map((e) => Math.floor(Math.random() * 10))
      .join("");
  const generateUniqueID = () => {
    const id = "emp" + getRandomDigits(5);
    return id;
  };
  const newID = generateUniqueID();

  if (req.body.name == "" && req.body.position == "") {
    res.status(400).send({ message: "Name, Position can not be empty!" });
    return;
  }

  const user = new users({
    empID: newID,
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    address: req.body.address,
    email: req.body.email,
    number: req.body.number,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a new user.",
      });
    });
};

exports.findAllUsers = async (req, res) => {
  users.find().then((data) => {
    res.send(data);
  });
};

exports.findOneUser = (req, res) => {
  const id = req.params.id;
  const query = { empID: id };
  users
    .findOne(query)
    .then((data) => {
      if (!data) res.status(404).send({ message: `User not found. ID: ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: `Error retrieving user with ID: ${id}` });
    });
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  const query = { empID: id };
  const newData = {
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    address: req.body.address,
    email: req.body.email,
    number: req.body.number,
  };

  users
    .updateOne(query, newData)
    .then((data) => {
      if (!data) res.status(404).send({ message: `User not found. ID: ${id}` });
      else
        res.send({
          message: `Updated user with ID: ${id} succesfully!`,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: `Error updating user with ID: ${id}` });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const query = { empID: id };

  users
    .deleteOne(query)
    .then((data) => {
      if (data.deletedCount == 0) {
        res.send({ message: `User with ID: ${id} doesn't exist!` });
      } else {
        res.send({
          message: `User with ID: ${id} has been successfully deleted!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete user with ID: ${id}`,
      });
    });
};
