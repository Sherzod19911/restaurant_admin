const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake"); 
const assert = require("assert");
const bcrypt = require("bcryptjs");
const { shapeIntoMongooseObjectId, lookup_auth_member_following, } = require("../lib/config");
const View = require("./View");
const Like = require("./Like");


class Member {
  constructor() {
    this.memberModel = MemberModel;
}
async signupData(input) {

    try{    

      const salt = await bcrypt.genSalt();
     input.mb_password = await bcrypt.hash(input.mb_password,salt);

      const new_member = new this.memberModel(input);
      
        console.log("new_member::::", new_member)  
        let result;         
      try{
         result = await new_member.save();
        console.log("result::", result)
      } catch(mongo_err) {    
        console.log(mongo_err);
      throw new Error(Definer.auth_err1);
      }

  
      
     result.mb_password = "";
     return result;

    } catch(err) {
      throw err;
    }
   }
   async loginData(input) {
    try{
     const member = await this.memberModel
     .findOne(
      {mb_nick: input.mb_nick}, 
      {mb_nick:1,mb_password: 1}
      )
     .exec();
     assert.ok(member,Definer.auth_err1);
     //console.log(member);
      // const isMatch = input.mb_password===member.mb_password;
      const isMatch = await bcrypt.compare(input.mb_password, member.mb_password);
      assert.ok(isMatch,Definer.auth_err4);
      return await this.memberModel.findOne({
        mb_nick:input.mb_nick
      })
      .exec();
    } catch(err) {
      throw err;
    }
   }
   async getChosenMemberData(member, id) {
    try {
      id = shapeIntoMongooseObjectId(id);
      console.log("member:", member);
      
    if(member) {
      //conition if not sen before
      await this.viewChosenItemByMember(member, id, "member");
    }  
      const result = await this.memberModel
      .aggregate([
        {
          $match: { _id: id, mb_status: "ACTIVE" },
         }, 
        { $unset: "mb_password" }
      ])
      .exec(); 
  
      assert.ok(result, Definer.general_err2);
      return result[0];
  
    } catch(err) {
      throw err;
    }
  }
  async viewChosenItemByMember (member, view_ref_id, group_type) {
    try{
        view_ref_id = shapeIntoMongooseObjectId(view_ref_id);
        const mb_id = shapeIntoMongooseObjectId(member._id);
 
        const view = new View(mb_id);
 
       //valitation needed
 
       const isValid = await view.validateChosenTarget(view_ref_id, group_type);
       console.log("is valid::",isValid);
       assert.ok(isValid, Definer.general_err2);
 
 
 
 
 
       //logged user hass seen target before

       const doesExist = await view.checkViewExistence(view_ref_id);       
       console.log("doesExist:", doesExist);
 
       if(!doesExist) {
       const result = await view.insertMemberView(view_ref_id, group_type);
        assert.ok(result, Definer.general_err1);
     }
      return true;
    } catch(err) {
    throw err;
   }
  }
  async likeChosenItemByMember (member, like_ref_id,group_type) {
    try {
      like_ref_id = shapeIntoMongooseObjectId(like_ref_id);
      const mb_id = shapeIntoMongooseObjectId(member._id);
  
      const like = new Like(mb_id);
      const isValid = await like.validateTargetItem(like_ref_id,group_type);
      console.log("isValid::", isValid);
      assert.ok(isValid, Definer.general_err2);
  
      //does Exist
      const doesExist = await like.checkLikeExistance(like_ref_id);
      console.log("doesExist::", doesExist);
  
      // let data  =  doesExist 
      //  ? await like.removeMemberLike(like_ref_id, group_type)
      //  : await like.insertMemberLike(like_ref_id, group_type);
      //  assert.ok(data, Definer.general_err1);
  
      //  const result  = {
      //   like_group: data.like_group, 
      //   like_ref_id: data.like_ref_id, 
      //   like_status: doesExist ? 0 : 1,
      // };
      // return result;
  
      let data;
  if (doesExist) {
      data = await like.removeMemberLike(like_ref_id, group_type);
  } else {
      data = await like.insertMemberLike(like_ref_id, group_type);
  }
  assert.ok(data, Definer.general_err1);
  
  const result = {
      like_group: data && data.like_group ? data.like_group : null,
      like_ref_id: data && data.like_ref_id ? data.like_ref_id : null,
      like_status: doesExist ? 0 : 1,
  };
  return result;      
  
  
  
      //return isValid;
  
    }catch(err) {
  
      throw err;
    }
   }
  }
  
  module.exports = Member;