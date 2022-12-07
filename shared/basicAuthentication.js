const UserService = require('../user/UserService');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization) {
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [uname, password] = decoded.split(':');
    const authenticatedUser =  UserService.find();
    const match = (password=== authenticatedUser.pwd)&&(uname===authenticatedUser.uname);
    console.log(match);
    if(match){
      req.authenticatedUser = authenticatedUser;
    }
  }
  next();
}