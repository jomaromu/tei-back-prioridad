import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { PrioridadModelInterface } from "../interfaces/prioridad";

// crear esquema
const Schema = mongoose.Schema;

const prioridadSchema = new Schema({
  idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
  nombre: {
    type: String,
    required: [true, "Debe ingresar un nombre"],
  },
  estado: { type: Boolean, default: true },
  foranea: { type: mongoose.Types.ObjectId, ref: "userWorker" },
});

// validacion para único elemento
prioridadSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<PrioridadModelInterface>("prioridad", prioridadSchema);
