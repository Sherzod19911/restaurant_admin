const express = require("express");
const router = express.Router();
const memberController = require("./controller/memberController");
const productController = require("./controller/productController");

//memberga dahildor routerlar
router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get("/member/:id", 
memberController.retrieveAuthMember, 
memberController.getChosenMember
);

// product related routers    
router.post("/products", 
memberController.retrieveAuthMember,

productController.getAllProducts
);

router.get(
    "/products/:id",
    memberController.retrieveAuthMember,
    productController.getChosenProduct
  );
      
module.exports = router;





