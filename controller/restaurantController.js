const Member = require("../models/Member");

let restaurantController = module.exports;
restaurantController.getSignupMyRestaurant = async (res, req) => {
    try {
        console.log("GET:cont/getSignupMyRestaurant");
        res.render('signup');
    }catch (err) {
        console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
        res.json({state: "fail",message: err.message});   
    }  
}

restaurantController.signupProcess = async (req, res) => {
try{
console.log("POST:cont/signup");
const data = req.body, //requestni body qismidan malumot olamiz.

member = new Member(),     
                         
 new_member =  await member.signupData(data);
console.log("new member:",new_member );
res.json({state: "succeed", data:new_member});
//res.send("done");
} catch(err) {
console.log(`ERROR, cont/signup, ${err.message}`);
res.json({state: "fail",message: err.message});
}
};
restaurantController.getLoginMyRestaurant = async (res, req) => {
    try {
        console.log("GET:cont/getLoginMyRestaurant");
        res.render('login-page');
    }catch (err) {
        console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
        res.json({state: "fail",message: err.message});   
    }
}


restaurantController.loginProcess = async(req, res) => {
  try{
    console.log("POST:cont/login");
    const data = req.body, //requestni badiy qismidan malumot olamiz.
    //console.log(`body:::`,req.body);
    member = new Member(),
    result= await member.loginData(data);
    console.log(1991);
    res.json({state: "succeed", data:result});
    //res.send("done");
    } catch(err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({state: "fail",message: err.message});
    }
};
console.log("shrzod");
 restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};