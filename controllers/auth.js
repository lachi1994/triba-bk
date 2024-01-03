// const bcrypt = require('bcryptjs');
const Auth = require('../models/customer');

// const Register = async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(16);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newAuthUser = new Auth({
//       name: req.body.email,
//       email: req.body.email,
//       password: hashedPass,
//     });
//     const authuser = await newAuthUser.save();
//     res.status(200).json(
//       authuser,
//     );
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const Login = async (req, res) => {
//   try {
//     const authuser = await Auth.findOne({ email: req.body.email });
//     !authuser && res.status(400).json({ message: 'email not match!' });

//     const validated = await bcrypt.compare(req.body.password, authuser.password);
//     !validated && res.status(400).json({ error: 'password not match!' });

//     const { password, ...others } = authuser._doc;

//     res.status(200).json({ success: 'login successfully!', others });
//   } catch (err) {
//     res.status(500).json({ error: 'you have no account', err });
//   }
// };

const all = async (req, res) => {
  try {
    const authuser = await Auth.find();
    res.status(200).json(authuser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  // Register,
  // Login,
  all,
};
