import mongoose from "mongoose";
import { PrioridadesOrdendasInterface } from "../interfaces/prioridad";

// crear esquema
const Schema = mongoose.Schema;

const prioridadOrdenadaSchema = new Schema({
  colPrioridad: {
    type: String,
  },
  prioridades: { type: Array },
  foranea: { type: mongoose.Types.ObjectId, ref: "userWorker" },
});

export = mongoose.model<PrioridadesOrdendasInterface>(
  "prioridadOrdenada",
  prioridadOrdenadaSchema
);
