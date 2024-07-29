const routineModel = require("../model/routineModel");

const getAllRoutines = async (req, res) => {
    const { sort, category } = req.query;
    let filter = {};
    let orderBy = {};
  
    if (category){
      filter.category = category;
    }
  
    if (sort) {
      orderBy = { price: sort == "price" ? "asc" : "asc"};
    }
  
    try {
      const products = await routineModel.getAllRoutines(filter, orderBy);
      res.status(200).json(products);
    } catch (error){
      res.status(400).json( {error: error.message} )
    }
}

const getRoutineById = async (req, res) => {
    try {
        const routine = await routineModel.getRoutineById(req.params.user_id);
        if (routine) {
          res.status(200).json(routine);
        } else {
          res.status(404).json({ error: "Routine not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createRoutine = async (req, res) => {
    try {
        const newRoutine = await routineModel.createRoutine(req.body);
        res.status(201).json(newRoutine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
}

const updateRoutine = async (req, res) => {
    try {
        const updatedRoutine = await routineModel.updateRoutine(req.params.routine_id, req.body);
        if (updatedRoutine) {
          res.status(200).json(updatedRoutine);
        } else {
          res.status(404).json({ error: "Routine not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }  
}

const deleteRoutine = async (req, res) => {
    try {
        const deleteRoutine = await routineModel.deleteRoutine(req.params.routine_id);
        if (deleteRoutine) {
          res.status(200).json(deleteRoutine);
        } else {
          res.status(404).json({ error: "Routine not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllRoutines,
    createRoutine,
    getRoutineById,
    updateRoutine,
    deleteRoutine
};