const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  console.log(req.cookies);
  jwt.verify(req.cookies._usertoken, process.env.SECRETKEY, (err, payload) => {
    if (err) { 
      res.status(401).json({ msg: 'Credenciales invalidas - auth'});
    } else {
      next();
    }
  });
}