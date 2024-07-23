const routineModel = require("../model/routineModel");

const getRoutineById = async (req, res) => {
    try {
        const routine = await routineModel.getRoutineById(req.params.routine_id);
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
    createRoutine,
    getRoutineById,
    updateRoutine,
    deleteRoutine
};