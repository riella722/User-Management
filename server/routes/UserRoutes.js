module.exports = (app) => {
  const users = require("../controllers/UserControllers.js");

  var router = require("express").Router();

  router.post("/users/create-new-user", users.createUsers);
  router.get("/users", users.findAllUsers);
  router.get("/users/find-user/:id", users.findOneUser);
  router.patch("/users/update-user/:id", users.updateUser);
  router.delete("/users/delete-user/:id", users.deleteUser);

  app.use("/v1/user-management", router);
};
