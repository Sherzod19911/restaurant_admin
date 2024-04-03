

let memberController = module.exports;
const Member = require("../models/Member");

memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("home sahifadasiz");
};

// memberController.signup = (req, res) => {
//   console.log("POST cont.signup");
//   res.send("signup sahifadasiz");
// };    
        
memberController.signup = async (req, res) => {
  try{
  console.log("POST:cont/signup");
  const data = req.body; //requestni badiy qismidan malumot olamiz.
  console.log(`body:::`,data);
  const member = new Member();
  const new_member = await member.signupData(data);

  res.send("done");
  } catch(err) {
  console.log(`ERROR, cont/signup, ${err.message}`);
  }
}
memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.send("login sahifadasiz");
};


memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};

