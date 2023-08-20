const express=require('express');
const router=express.Router();
const emplyoyeesController=require('../../controllers/employeesController');




// Routes
router.route('/')
.get(emplyoyeesController.getAllEmployees)
.post(emplyoyeesController.createNewEmployee)
.put(emplyoyeesController.updateEmployee)
.delete(emplyoyeesController.deleteEmployee);


router.route('/:id')
    .get(emplyoyeesController.getEmployee);

module.exports=router