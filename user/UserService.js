class User {
  constructor(uname, pwd) {
    this.uname = uname;
    this.pwd = pwd;
  }
}

const find =  () => {
  let uname=process.env.uname;
  let pwd=process.env.password;

  return  new User(uname,pwd);
}

module.exports = {
 
find
}