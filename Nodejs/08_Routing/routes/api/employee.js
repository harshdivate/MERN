const express=require('express');
const router=express.Router();
const emplyoyeesController=require('../../controllers/employeesController');
const verifyJWT=require('../../middleware/verifyJWT');
const ROLES_LIST=require('../../config/rolesList');
const verifyRoles=require('../../middleware/verifyRoles');


// Routes
router.route('/')
.get(verifyJWT,emplyoyeesController.getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),emplyoyeesController.createNewEmployee)
.put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),emplyoyeesController.updateEmployee)
.delete(verifyRoles(ROLES_LIST.Admin),emplyoyeesController.deleteEmployee);


router.route('/:id')
    .get(emplyoyeesController.getEmployee);

module.exports=router