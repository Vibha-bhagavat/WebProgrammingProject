/******************************************************************************
***
*  ITE5315 – Project
*  I declare that this assignment is my own work in accordance with Humber Academic Policy.
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
*
*  Group member Name:    Vibha Bhagavat 2.Rhea Christian
                        Student IDs:    N01564677                     Date:07/12/2022
******************************************************************************
***/
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