const express = require("express");
const route = express.Router();

const UserController = require("../controller/userController");

const userController = new UserController();

route.get("/", userController.getAllUsers);

route.get("/:id", userController.getUserById);

route.post("/", userController.addUser);

route.put("/:id", userController.editUser);

route.delete("/:id", userController.deleteUser);

module.exports = route;
