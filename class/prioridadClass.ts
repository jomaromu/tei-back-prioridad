import { Response } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");
import Server from "./server";

// Interfaces
import { PrioridadModelInterface } from "../interfaces/prioridad";

// Modelo
import prioridadModel from "../models/prioridadModel";
import prioridadOrdenada from "../models/prioridadesOrdendas";

export class PrioridadClass {
  constructor() {}

  crearPrioridad(req: any, resp: Response): void {
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const nuevaPrioridad = new prioridadModel({
      idCreador,
      foranea,
      nombre,
      estado,
    });

    nuevaPrioridad.save(
      (err: CallbackError, prioridadDB: PrioridadModelInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-prioridades", {
            ok: true,
          });
          return resp.json({
            ok: true,
            mensaje: "Prioridad creada",
            prioridadDB,
          });
        }
      }
    );
  }

  editarPrioridad(req: any, resp: Response): any {
    const _id = new mongoose.Types.ObjectId(req.body.id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre: string = req.body.nombre;
    const estado: boolean = req.body.estado;

    const query = {
      nombre,
      estado,
    };

    prioridadModel.findOne(
      { _id, foranea },
      (err: CallbackError, prioridadDB: PrioridadModelInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!prioridadDB) {
          return resp.json({
            ok: false,
            mensaje: `No se encontró una prioridad con ese ID`,
          });
        }

        if (!query.nombre) {
          query.nombre = prioridadDB.nombre;
        }

        prioridadModel.findOneAndUpdate(
          { _id, foranea },
          query,
          { new: true },
          (err: CallbackError, prioridadDB: any) => {
            if (err) {
              return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            } else {
              const server = Server.instance;
              server.io.emit("cargar-prioridades", {
                ok: true,
              });
              return resp.json({
                ok: true,
                mensaje: "Prioridad actualizada",
                prioridadDB,
              });
            }
          }
        );
      }
    );
  }

  obtenerTodasPrioridades(req: any, resp: Response): void {
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    prioridadModel
      .find({ foranea })
      .populate("idCreador")
      .exec((err: any, prioridadesDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          return resp.json({
            ok: true,
            prioridadesDB,
          });
        }
      });
  }

  obtenerPrioridad(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    prioridadModel.findOne(
      { _id, foranea },
      (err: CallbackError, prioridadDB: PrioridadModelInterface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!prioridadDB) {
          return resp.json({
            ok: false,
            mensaje: `No se encontró una prioridad con ese ID`,
          });
        }

        return resp.json({
          ok: true,
          prioridadDB,
        });
      }
    );
  }

  eliminarPrioridad(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    prioridadModel.findOneAndDelete(
      { _id, foranea },
      {},
      (err: any, prioridadDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          const server = Server.instance;
          server.io.emit("cargar-prioridades", {
            ok: true,
          });
          return resp.json({
            ok: true,
            mensaje: "Prioridad eliminada",
            prioridadDB,
          });
        }
      }
    );
  }

  actualizarPrioriadesOrdenadas(req: any, resp: Response): void {
    const colPrioridad: string = req.body.colPrioridad;
    const prioridades = req.body.prioridades;
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    prioridadOrdenada.findOneAndUpdate(
      { colPrioridad, foranea },
      { $set: { prioridades } },
      { upsert: true, new: true },
      (err: any, prioridadesOrdenadaDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            err,
          });
        } else {
          return resp.json({
            ok: true,
            prioridadesOrdenadaDB,
          });
        }
      }
    );
  }

  obtenerPrioridadesOrdenadas(req: any, resp: Response): void {
    const colPrioridad: string = req.get("colPrioridad");
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    prioridadOrdenada.findOne(
      { colPrioridad, foranea },
      (err: any, prioridadesOrdenadaDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            err,
          });
        } else {
          return resp.json({
            ok: true,
            prioridadesOrdenadaDB,
          });
        }
      }
    );
  }
}
