const {Router}=require('express');
const router=Router();
const controller=require('./controller');
router.get("/",controller.getUser);
router.post("/signup",controller.addUser);
router.post("/signin",controller.login);


module.exports=router;

