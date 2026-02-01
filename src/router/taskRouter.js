import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";

const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.post("/", createTask)
taskRouter.patch("/:id", updateTask)
taskRouter.delete("/:id", deleteTask)

export {taskRouter}