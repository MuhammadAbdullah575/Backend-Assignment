const {Router}=require('express');

const router=Router();
const controller=require('./controller');
router.get("/",controller.getProducts);
router.get("/:id",controller.getProductsById);

module.exports=router;