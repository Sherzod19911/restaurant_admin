

let memberController = module.exports;
const Member = require("../models/Member");
const jwt = require('jsonwebtoken');
const assert = ("assert");
const Definer = require("../lib/mistake");


memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("home sahifadasiz");
};

// memberController.signup = (req, res) => {
//   console.log("POST cont.signup");
//   res.send("signup sahifadasiz");
// };                 
             
memberController.signup = async (req, res) => {
  try {   
    //console.log("result::", new_member);
    const token = memberController.createToken(new_member);
    //console.log("token:", token);
  //console.log(`body:::`,data);
 
  res.cookie("access_token", token, {
    maxAge: 6 * 3600 * 1000,       
    httpOnly: true,      
  });   
  res.json({ state: "succeed", data: new_member });
} catch (err) {
  console.log(`ERROR, cont/signup, ${err.message}`);
  res.json({ state: "fail", message: err.message });
}
};

   
// memberController.login = (req, res) => {
//   console.log("POST cont.login");
//   res.send("login sahifadasiz");
// };
memberController.login = async(req, res) => {
  try{
    console.log("POST:cont/login");
    const data = req.body, //requestni badiy qismidan malumot olamiz.
    //console.log(`body:::`,req.body);
    member = new Member(),
    result= await member.loginData(data);
    console.log("result:", result);

    const token = memberController.createToken(result);
    //console.log("token:", token);  
    res.cookie('access_token', token, {
      maxAge: 6* 3600*1000, 
      httpOnly: true
    });
    res.json({state: 'succeed', data: result});
    //res.send("done");
    } catch(err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({state: 'fail',message: err.message});
    }
  }



memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};

memberController.createToken  = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      my_type: result.mb_type
    };

    const token = jwt.sign(
      upload_data,
      process.env.SECRET_TOKEN,
      {expiresIn: "6H",
    });

    assert.ok(token,Difiner.auth_err2);
    return token
  } catch(err) {
    throw err;
  }
}
memberController.checkMyAuthentication = (req, res) =>{
  try {
   console.log('GET cont/checkMyAuthentication');
   let token = req.cookies("access_token");
   console.log("token:",token );
   res.send("ok");

  } catch(err) {
   throw err;
  }
}