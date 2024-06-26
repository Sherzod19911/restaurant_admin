const mongoose = require("mongoose");

exports.member_type_enums = ["USER", "ADMIN", "PEDAL", "RESTAURANT"];
exports.member_status_enums =  ["ONPAUSE", "ACTIVE", "DELETED"];
exports.ordinary_enums = ["Y", "N"];
exports.product_collection_enums = ["dish", "salad", "dessert", "drink", "etc"];
exports.product_status_enums = ["PAUSED", "PROCESS","DELETED"];
exports.product_size_enums = ["small","normal", "large","set"];
exports.product_volume_enums = [0.5, 1, 1.2, 1.5, 2];
exports.like_view_group_list = ['product', 'member', 'community'];
exports.board_id_enum_list = ['celebrity', 'evalution', 'story'];
exports.order_status_enums = ["PAUSED", "PROCESS","FINISHED", "DELETED" ]
exports.board_article_status_enum_list = ["active", "deleted"];


/******************************************************
 *      MONGODB RELATED COMMANDS                      *
 *****************************************************/
exports.shapeIntoMongooseObjectId = (target) => {
    if(typeof target ==='string') {
        return new mongoose.Types.ObjectId(target);
     } else return target;
};

exports.lookup_auth_member_following = (mb_id) => {
    return {
        $lookup: {
            from: "follows",
            let: {
                lc_follow_id: "$subscriber_id", // Use field names or variables here
                lc_subscriber_id: mb_id,
                nw_my_following: true,
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$follow_id", "$$lc_follow_id"] },
                                { $eq: ["$subscriber_id", "$$lc_subscriber_id"] },
                            ],
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        subscriber_id: 1,
                        follow_id: 1,
                        my_following: "$$nw_my_following", // Fix the typo here
                    },
                },
            ],
            as: "me_followed",
        },
    };
};
