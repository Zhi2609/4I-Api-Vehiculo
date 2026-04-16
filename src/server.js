import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Vehiculo } from "./vehiculo.js";
import { Inventario } from "./inventario.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let inventarioNuevo = new Inventario();

app.get("/", (req, res) => {
  res.json({ message: "Api Funcionando" });
});

app.get("/vehiculo", (req, res) => {
  res.json(inventarioNuevo.vehiculos);
});

app.get("/vehiculo/:placa", (req, res) => {
  let respuesta = inventarioNuevo.buscarVehiculo(req.params.placa);
  if (!respuesta) {
    return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
  }
  res.json(respuesta);
});

app.post("/vehiculo", (req, res) => {
  const { placa, marca, modelo } = req.body;

  if (!placa || !marca || !modelo) {
    return res
      .status(400)
      .json({ mensaje: "Placa, Marca y Modelo son requeridos" });
  }

  if (inventarioNuevo.buscarVehiculo(placa)) {
    return res
      .status(409)
      .json({ mensaje: "Ya existe un vehiculo con esa placa" });
  }

  const nuevoVehiculo = new Vehiculo(placa, marca, modelo);
  inventarioNuevo.agregarVehiculo(nuevoVehiculo);

  res.status(201).json({ mensaje: "Vehiculo agregado", Vehiculo: placa });
});

app.delete("/vehiculo/:placa", (req, res) => {
  let vehiculoBorrado = inventarioNuevo.eliminarVehiculo(req.params.placa);
  if (!vehiculoBorrado) {
    return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
  }
  res.json({ mensaje: "Vehiculo eliminado", Vehiculo: vehiculoBorrado });
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Server is running on port " + PORT);
});
