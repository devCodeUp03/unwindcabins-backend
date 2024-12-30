const User = require("../model/User");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ADMIN, SECRET_KEY } = require("../constant/role");

const getUsers = async (req, res) => {
  let users = await User.find({});
  res.send(users);
};

const getOneUser = async (req, res) => {
  let user = req.user;
  return res.send(user);
};

const getUserDetail = async (req, res) => {
  let {id} = req.params;
  let user = await User.findById({_id: id});
  user.password = undefined;
  res.send(user);
}



const removeUser = async (req, res) => {
  try {
    let { email } = req.params;
    let removedUser = await User.deleteOne({ email });
    res.send(removedUser);
  } catch (err) {
    res.send(err);
  }
};
const removeUserById = async (req, res) => {
  try {
    let { id } = req.params;
    let removedUser = await User.deleteOne({ _id: id });
    console.log(removedUser);
    res.send(removedUser);
  } catch (err) {
    res.send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    let { email } = req.params;

    let response = await User.findOneAndUpdate({ email });
  } catch (err) {
    res.send(err);
  }
};

const signup = async (req, res, next) => {
  try {
    let newUser = req.body;
    console.log(newUser);
    let imagePath = null;
    if (
      newUser.usertype == ADMIN &&
      newUser.secretkey != SECRET_KEY
      // newUser.userType != ADMIN
    ) {
      return res.status(403).send({
        msg: "invalid admin secret key",
        errors: {
          secretkey: {
            field: "secretkey",
            msg: "secret key is invalid",
          },
        },
      });
    }
    let matched = await User.findOne({ email: newUser.email });
    if (!matched) {
      let hashed = await bcrypt.hash(newUser.password, 10);
      if (req.files && req.files.image) {
        let rootPath = path.resolve();
        imagePath = path
          .join("/uploads/user", `${Date.now()}-${req.files.image.name}`)
          .replaceAll("\\", "/");
        req.files.image.mv(path.join(rootPath, imagePath));
      }
      let user = await User.create({
        ...newUser,
        image: imagePath,
        password: hashed,
      });

      user.password = undefined;

      res.send(user);
    } else {
      return res.status(400).send({
        msg: "validation error",
        errors: {
          email: {
            field: "email",
            msg: "email already exists",
          },
        },
      });
    }

    // else {
    //   return res.status(403).send("invalid admin secret key");
    // }
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let matchedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (matchedPassword) {
      user = user.toObject();
      user.password = undefined;
      const token = await jwt.sign(user, "peace");
      return res.send({ user, token });
    } else {
      return res.status(401).send({
        msg: "invalid credentials",
        errors: {
          credentials: {
            field: "invalid credentials",
            msg: "invalid credentials",
          },
        },
      });
    }
  } else {
    res.status(401).send({
      msg: "invalid credentials",
      errors: {
        credentials: {
          field: "invalid credentials",
          msg: "invalid credentials",
        },
      },
    });
  }
};

module.exports = { signup, login, getUsers, removeUser, getOneUser, getUserDetail, removeUserById };
