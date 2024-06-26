const MemberModel = require("../schema/member.model");
const LikeModel = require("../schema/like.model");
const ProductModel = require("../schema/product.model");
const BoArticleModel = require("../schema/bo_article.model");
const Definer = require("../lib/mistake");



class Like {
    constructor(mb_id) {
      this.likeModel = LikeModel;
      this.memberModel = MemberModel;
      this.productModel = ProductModel;
      this.boArticleModel = BoArticleModel;
      this.mb_id = mb_id;
    }

    async validateTargetItem(id, group_type) {
        try {
            let result;
            switch(group_type) {
                case 'member':
                 result = await this.memberModel.findOne({
                    _id: id, 
                    mb_status: "ACTIVE",
            }).exec();
            break; 

            case "product":
                 result =  await this.productModel
                .findOne({
                  _id: id,
                  product_status: "PROCESS",
                })
                .exec();
              break;  

              case "community":
                 result =  await this.boArticleModel
                .findOne({
                  _id: id,
                  art_status: "active",
                })
                .exec();
              break;  
            }  
            return !!result;  

        }catch(err) {
            throw err;
        }

   }

   async checkLikeExistance(like_ref_id) {
    try {

        const like = await this.likeModel.findOne({
            mb_id: this.mb_id,
            like_ref_id: like_ref_id,
        })
        .exec();
        console.log("like::", like);
        //return like ? true : false;
        return!!like
    }catch(err) {
        throw err;
    }
   }   

   async removeMemberLike(like_ref_id, group_type) {
    try {
      const result = await this.likeModel
      .findOneAndDelete({
        like_ref_id: like_ref_id,
        mb_id: this.mb_id,
      })
      .exec();

      await this.modifyItemLikeCounts(like_ref_id, group_type, -1);
      return result;
    }catch(err) {
        throw err;
    }
   }

//    async insertMemberLike(like_ref_id, group_type) {
//     try {

//         const new_like = new this.likeModel({
//             mb_id: this.mb_id,
//             like_ref_id: like_ref_id,    
//             group_type: group_type,
//         });

//        const result = await new_like.save();

//        //modify target  likes count
//         await this.modifyItemLikeCounts(like_ref_id, group_type, 1);
//         return result;

//     }catch(err) {
//         console.log(err);
//         throw err;
//        // throw new Error(Definer.mongo_validition_err1);
//     }
//    }

async insertMemberLike(like_ref_id, group_type) {
    try {
        const new_like = new this.likeModel({
            mb_id: this.mb_id,
            like_ref_id: like_ref_id,
            like_group: group_type,
        });

        const result = await new_like.save();

        // Modify target likes count
        await this.modifyItemLikeCounts(like_ref_id, group_type, 1);
        return result;

    } catch (err) {
        console.log(err);
        //throw err;
         throw new Error(Definer.mongo_validition_err1);
    }
}


//    async modifyItemLikeCounts(like_ref_id, group_type, modifier) {
//     try {

//             switch(group_type) {
//                 case 'member':
//                  await this.memberModel
//                 .findByIdAndUpdate(
//                     {
//                         _id: like_ref_id 
//                     }, 
//                     { $inc: { mb_likes: 1 } },
//             ).exec();
//             break; 

//             case "product":
//                  await this.productModel.findByIdAndUpdate(
//                     {_id: like_ref_id }, 
//                     { $inc: { product_likes: 1 } },
//                     )
//                .exec();
//               break;  

//               case "community":
//                 default:
//                 await this.boArticleModel
//                 .findByIdAndUpdate(
//                     {
//                         _id: like_ref_id 
//                     }, 
//                     { 
//                         $inc: { art_likes: 1 } 
//                     },
//                     )
//                     .exec();
//               break;  
//             }
//             return true;

//     }catch(err) {
//         throw err;

//     }
//    }
async modifyItemLikeCounts(like_ref_id, group_type, modifier) {
    try {
        switch (group_type) {
            case 'member':
                await this.memberModel
                    .findByIdAndUpdate(
                        like_ref_id, // Assuming like_ref_id is the ID directly
                        { $inc: { mb_likes: modifier } }, // Using modifier for flexibility
                        { new: true } // To return the updated document
                    )
                    .exec();
                break;

            case 'product':
                await this.productModel.findByIdAndUpdate(
                    like_ref_id,
                    { $inc: { product_likes: modifier } },
                    { new: true }
                ).exec();
                break;

            case 'community':
            default:
                await this.boArticleModel.findByIdAndUpdate(
                    like_ref_id,
                    { $inc: { art_likes: modifier } },
                    { new: true }
                ).exec();
                break;
        }
        return true;
    } catch (err) {
        throw err;
    }
}

}

module.exports = Like;