const User = require("../model/User");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ADMIN, SECRET_KEY } = require("../constant/role");



const getUser = async(req, res) => {
  let users = await User.find({});
  res.send(users);

}

const removeUser = async ( req, res) => {
  try {

    let {email} = req.params;
    let removedUser = await User.deleteOne({email})
    res.send(removedUser);
  } catch(err) {
    res.send(err);
  }
}

const updateUser = async (req, res) => {
  try {
    let {email} = req.params;

    let response = await User.findOneAndUpdate({email}, )

  } catch(err) {
    res.send(err);
  }
}

const signup = async (req, res, next) => {
  try {
    let newUser = req.body;
    let imagePath = null;
    console.log(newUser);
    console.log(ADMIN);
    console.log(SECRET_KEY);
    if (
      (newUser.userType == ADMIN && newUser.secretKey == SECRET_KEY) ||
      newUser.userType != ADMIN
    ) {
      return res.status(403).send("invalid admin secret key");
    }
    let matched = await User.findOne({ email: newUser.email });
    if (!matched) {
      let hashed = await bcrypt.hash(newUser.password, 10);
      let user = await User.create({
        ...newUser,
        image: imagePath,
        password: hashed,
      });

      user.password = undefined;

      res.send(user);
    } else {
     return res.send("email already exists");
    }

    if (req.files && req.files.image) {
      let rootPath = path.resolve();
      imagePath = path
        .join("/uploads/user", `${Date.now()}-${req.files.image.name}`)
        .replaceAll("\\", "/");
      req.files.image.mv(path.join(rootPath, imagePath));
    } else {
      return res.status(403).send("invalid admin secret key");
    }
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
      res.send({ user, token });
    }
  } else {
    res.status(401).send({
      message: "invalid credentials",
    });
  }
};

module.exports = { signup, login, getUser, removeUser };
