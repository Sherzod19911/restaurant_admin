const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake"); 


class Member {
  constructor() {
    this.memberModel = MemberModel;
}
async signupData(input) {

    try{    

      const new_member = new this.memberModel(input);
      
        console.log("new_member::::", new_member)  
        let result;         
      try{
        const result = await new_member.save();
        console
      } catch(mongo_err) {    
        console.log(mongo_err);
      throw new Error(Definer.auth_err1);
      }

  
      
    // result.mb_password = "";
     return result;

    } catch(err) {
      throw err;
    }
   }
  }
  
  module.exports = Member;