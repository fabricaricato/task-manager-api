import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, // Guarda un ID de Mongo
    ref: 'User',                          
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
},
  {versionKey: false},
  {timestamps: true} // Agrega la fecha de creación a la tarea en este caso
);

const Task = mongoose.model("Task", TaskSchema)

export { Task }