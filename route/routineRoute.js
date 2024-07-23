const express = require("express");
const router = express.Router();
const routineController = require("../controller/routineController");

//creates a routine
router.post("/", routineController.createRoutine);
// gets a routine by id
router.get("/:routine_id", routineController.getRoutineById);
//updates a routine by its id
router.put("/:routine_id", routineController.updateRoutine);
//deletes a routine by its id 
router.delete("/:routine_id", routineController.deleteRoutine);


module.exports = router;