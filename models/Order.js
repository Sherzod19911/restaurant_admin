const { shapeIntoMongooseObjectId } = require("../lib/config");
const Definer = require("../lib/mistake");
const OrderModel = require("../schema/order.model");
const OrderItemModel = require("../schema/order_item.model");
const assert = require("assert");

class Order {
    constructor() {      
        this.orderModel = OrderModel;
        this.OrderItemModel = OrderItemModel;
    }

      async createOrderData (member, data) {
            try {
                let order_total_amount = 0, delivery_cost = 0;
                const mb_id = shapeIntoMongooseObjectId(member._id);

                data.map(item =>  {
                    order_total_amount += item['quantity'] * item["price"];

                });

                if(order_total_amount < 100) {
                    delivery_cost = 2;
                    order_total_amount += delivery_cost;
                }

                const order_id = await this.saveOrderData(
                    order_total_amount,
                    delivery_cost,
                    mb_id      
                );

                console.log("order::", order_id);
                 //order items creation

                 await this.recordOrderItemsData(order_id, data);
                return order_id;

                //order items creation
                 } catch(err) {    
                throw err;
            }
        } 
           async saveOrderData (order_total_amount, delivery_cost, mb_id) {
                try {
                    const new_order = new this.orderModel({
                    order_total_amount: order_total_amount,
                    order_delivery_cost: delivery_cost,
                    mb_id:  mb_id      
                });
                const result = await new_order.save();
                assert.ok(result, Definer.order_err1);

                console.log("result::", result);
                return result._id;




                } catch(err) {
                  //console.log(err);
                  throw new Error(Definer.order_err1);
                }     
            }
            async recordOrderItemsData(order_id, data) {
                try {
                    const pro_list = data.map(async (item) => {
                        return await this.saveOrderItemsData(item, order_id);
                    });
    
                    const results = await Promise.all(pro_list);
                    console.log("results::", results);
                    return true;
                }catch(err) {
                     throw err;     
                }
             }
    
             async saveOrderItemsData(item, order_id) {
                order_id = shapeIntoMongooseObjectId(order_id);
                item._id = shapeIntoMongooseObjectId(item._id);
    
                const order_item = new this.OrderItemModel({
                    item_quantity: item["quantity"],
                    item_price: item["price"],
                    order_id: order_id,
                    product_id: item["_id"],
                });
    
                const result = await order_item.save();
                assert.ok(result,Definer.order_err2);
               // return "created";
             }catch(err) {
                console.log(err);
                throw new Error(Definer.order_err2);
             }
             async getMyOrdersData(member, query) {
                try {
                  const mb_id = shapeIntoMongooseObjectId(member._id),
                    order_status = query.status.toUpperCase(),
                    matches = { mb_id: mb_id, order_status: order_status }; 
                    console.log("req.query",query);
                   // return "done"; 

                    const result = await this.orderModel.aggregate([
                      { $match: matches },
                      { $sort: { createdAt: -1 } },
                      {
                        $lookup: {
                          from: "orderitems",
                          localField: "_id",
                          foreignField: "order_id",
                          as: "order_items",
                        },
                      },
                      {
                        $lookup: {
                          from: "products",
                          localField: "order_items.product_id",
                          foreignField: "_id",
                          as: "product_data",
                        },
                      },
                    ]).exec();
                    console.log("req.query:", result)
                    return result
                  } catch (err) {
                    throw err;
                  }
                }

                
                async editChosenOrderData(member, data) {
                    try {      
                      const mb_id = shapeIntoMongooseObjectId(member._id);
                      const order_id = shapeIntoMongooseObjectId(data.order_id); // Declare order_id
                      const order_status = data.order_status.toUpperCase(); // Declare order_status

                      const result = await this.orderModel.findOneAndUpdate(
                        { mb_id: mb_id, _id: order_id },
                        { order_status: order_status },
                        { 
                          runValidators: true,
                          lean: true,
                          returnDocument: "after" // There's a space before the closing quote, might cause an issue
                        }
                      );

                      console.log("result:", result);
                      if (!result) {
                        throw new Error(Definer.order_err3);
                      }

                      return result;
                    } catch (err) {
                      throw err;
              }
            }}



    
    module.exports = Order;