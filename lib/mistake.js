class Definer  {

     /**general error */
     static general_err1 = "att: something went wrong!";
     static general_err2 = "att: there is no data with that params!";
     static general_err3 = "att: file apload error!";

    /**member auth related */
    
    static auth_err1 = "att: mongodb validation failed!";
    static auth_err3 = "att: no member with that mb_nick!";
    static auth_err2 = "att: jsonwebtoken creation error"
    static auth_err4 = "att: your cridential do not match!";
    static auth_err5 = "att: you are not authenticated!";

    /**products related errors */
    static product_err1 = "att: product creation is failed!";
     // orders relate to the order

     static order_err1 = "att: order creation is failed";
     static order_err2 = "att: order item creation is failed";
     static order_err3 = "att: no orders with that params exists";

      //article related errors
    static article_err1 = "att: author member for articles not provied";
    static article_err2 = "att: no articles found for this member";
    static article_err3 = "att: no articles found for this target";

     //follow related errors
     static follow_err1 = "att: self subscribtion is denied";
     static follow_err2 = "att: new follow  subscription is failed";
 }


module.exports = Definer;