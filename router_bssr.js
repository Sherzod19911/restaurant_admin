const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controller/restaurantController");
const productController = require("./controller/productController");
const  uploader_product = require("./utils/upload-multer")("products");


/**************************
*         BSSR EJS 
 ***************************/

// memberga dahldor routerlar
//router.get("/", memberController.home);
router_bssr.get("/signup", restaurantController.getSignupMyRestaurant);
router_bssr.post("/signup", restaurantController.signupProcess);

router_bssr.get("/login", restaurantController.getLoginMyRestaurant);
router_bssr.post("/login", restaurantController.loginProcess);


router_bssr.get("/logout", restaurantController.logout);

router_bssr.get("/check-me", restaurantController.checkSessions);
router_bssr.get("/products/menu", restaurantController.getMyRestaurantData);

router_bssr.post("/products/create",restaurantController.validateAuthRestaurant,
uploader_product.array("product_images",2),productController.addNewProduct);

router_bssr.post("products/edit/:id",productController.updateChosenProduct);








module.exports = router_bssr;