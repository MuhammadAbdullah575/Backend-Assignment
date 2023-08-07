const {Router}=require('express');

const router=Router();
const controller=require('./controller');
router.get("/",controller.getStudents);
router.post("/",controller.addStudent);
router.put("/:id",controller.updateStudent);
router.get("/:id",controller.getStudentsById);
router.delete("/:id",controller.deleteStudent);

module.exports=router;

