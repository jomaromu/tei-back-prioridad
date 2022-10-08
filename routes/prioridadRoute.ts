import { Router, Response, Request } from "express";
import { verificaToken } from "../auth/auth";
import { PrioridadClass } from "../class/prioridadClass";

const prioridadRouter = Router();

prioridadRouter.post(
  "/crearPrioridad",
  [verificaToken],
  (req: Request, resp: Response) => {
    const crearPrioridad = new PrioridadClass();
    crearPrioridad.crearPrioridad(req, resp);
  }
);

prioridadRouter.get(
  "/obtenerPrioridades",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerTodasPrioridades = new PrioridadClass();
    obtenerTodasPrioridades.obtenerTodasPrioridades(req, resp);
  }
);

prioridadRouter.get(
  "/obtenerPrioridadesOrdenadas",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerPrioridadesOrdenadas = new PrioridadClass();
    obtenerPrioridadesOrdenadas.obtenerPrioridadesOrdenadas(req, resp);
  }
);

prioridadRouter.put(
  "/actualizarPrioriadesOrdenadas",
  [verificaToken],
  (req: Request, resp: Response) => {
    const actualizarPrioriadesOrdenadas = new PrioridadClass();
    actualizarPrioriadesOrdenadas.actualizarPrioriadesOrdenadas(req, resp);
  }
);

prioridadRouter.put(
  "/editarPrioridad",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarPrioridad = new PrioridadClass();
    editarPrioridad.editarPrioridad(req, resp);
  }
);

prioridadRouter.delete(
  "/eliminarPrioridad",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarPrioridad = new PrioridadClass();
    eliminarPrioridad.eliminarPrioridad(req, resp);
  }
);

export default prioridadRouter;
