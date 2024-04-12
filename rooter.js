const express = require("express");
const router = express.Router();
const memberController = require("./controller/memberController");

//memberga dahildor routerlar
router.get("/", memberController.home);
router.post("/sign-up", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me",memberController.checkMyAuthentication);

router.get("/menu", (req, res) => {
  res.send("Menu sahifadasiz");
});

router.get("/community", (req, res) => {
  res.send("Jamiyat sahifadasiz");
});
      
module.exports = router;





