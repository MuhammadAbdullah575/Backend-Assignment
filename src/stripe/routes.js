const {Router}=require('express');

const router=Router();
const controller=require('./stripe');
router.post("/",controller.createCheckoutSession);

module.exports=router;