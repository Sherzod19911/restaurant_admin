const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controller/restaurantController");
const productController = require("./controller/productController");
const  uploader_product = require("./utils/upload-multer")("products");
const  uploader_members = require("./utils/upload-multer")("members");


/**************************
*         BSSR EJS 
 ***************************/

// memberga dahldor routerlar
//router.get("/", memberController.home);

router_bssr.get("/", restaurantController.home);

router_bssr.get("/sign-up", restaurantController.getSignupMyRestaurant);
router_bssr.post("/sign-up", 
uploader_members.single('restaurant_img'),
restaurantController.signupProcess);
router_bssr.get("/login", restaurantController.getLoginMyRestaurant);
router_bssr.post("/login", restaurantController.loginProcess);

     
router_bssr.get("/logout", restaurantController.logout);

router_bssr.get("/check-me", restaurantController.checkSessions);
router_bssr.get("/products/menu", restaurantController.getMyRestaurantProducts);

router_bssr.post("/products/create",restaurantController.validateAuthRestaurant,
uploader_product.array("product_images",2),productController.addNewProduct);

router_bssr.post("/products/edit/:id",
restaurantController.validateAuthRestaurant,
productController.updateChosenProduct
);

router_bssr.get("/all-restaurant",
restaurantController.validateAdmin,
restaurantController.getAllRestaurants)

router_bssr.post("/all-restaurant/edit",
restaurantController.validateAdmin,
restaurantController.updateRestaurantByAdmin)







module.exports = router_bssr;