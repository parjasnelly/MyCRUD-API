const UserRepository = require("../database/repository/user");

const uRepo = new UserRepository();

class UserController {
  async getAllUsers(_req, res) {
    const users = await uRepo.findAll();

    const resp = {
      status: "OK",
      data: users,
    };

    res.status(200).json(resp);
  }

  async getUserById(req, res) {
    let uid = req.params.id;

    let user = await uRepo.find(uid);

    if (user.length) {
      let resp = {
        status: "OK",
        data: user,
      };
      res.status(200).json(resp);
    } else {
      let resp = {
        status: "Error",
        description: `User with id ${uid} was not found.`,
      };
      res.status(404).json(resp);
    }
  }

  async addUser(req, res) {
    let u = req.body;

    if (u.name === undefined || u.email === undefined) {
      let resp = {
        status: "Error",
        description: `User JSON with name and email fields must be provided.`,
      };
      res.status(400).json(resp);
    } else {
      const user = await uRepo.insert(u);
      let resp = {
        status: "OK",
        data: `User with id ${user.id} created successfully`,
      };
      res.status(200).json(resp);
    }
  }

  async editUser(req, res) {
    let uid = req.params.id;
    let u = req.body;

    if (u.name === undefined || u.email === undefined) {
      let resp = {
        status: "Error",
        description: `User JSON must be provided.`,
      };
      return res.status(400).json(resp);
    }

    let user = await uRepo.find(uid);

    if (user.length) {
      await uRepo.update(u, uid);

      let resp = {
        status: "OK",
        data: `User id ${uid} updated successfully`,
      };
      res.status(200).json(resp);
    } else {
      let resp = {
        status: "Error",
        description: `User id ${uid} was not found.`,
      };
      res.status(404).json(resp);
    }
  }

  async deleteUser(req, res) {
    let uid = req.params.id;
    let user = await uRepo.find(uid);

    if (user.length) {
      await uRepo.delete(uid);

      let resp = {
        status: "OK",
        data: `User id ${uid} deleted successfully`,
      };
      res.status(200).json(resp);
    } else {
      let resp = {
        status: "Error",
        description: `User id ${uid} was not found.`,
      };
      res.status(404).json(resp);
    }
  }
}

module.exports = UserController;
