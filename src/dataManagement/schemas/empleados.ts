import { Schema, model } from "mongoose";
import { boolean } from "webidl-conversions";
// Definimos el Schema
const empleadosSchema = new Schema({
    _id: {
        type: Number // para acceder en la subclase
    },
    _Tipo: {
        type: String
    },
    _Nombre: {
        type: String
    },

    _Antiguedad: {
        type: Number
    },
    
    _JornadaCompl: {
        type: Boolean
    },
    _IdAlmacen: {
        type: Number
    },
    _Experiencia: {
        type: Number
    },
    _Repartos: {
        type: Number
    },
})


export type iEmpleado = {
    _id: number | null, // para acceder en la subclase
    _Tipo: string | null,
    _Nombre: string | null,
    _Antiguedad: number | null,
    _JornadaCompl: boolean | null,
  }

  export type iMozo = {
    _id: number | null, // para acceder en la subclase
    _Tipo: string | null,
    _Nombre: string | null,
    _Antiguedad: number | null,
    _JornadaCompl: boolean | null,
    _IdAlmacen: number | null
  }

  export type iRepartidor = {
    _id: number | null, // para acceder en la subclase
    _Tipo: string | null,
    _Nombre: string | null,
    _Antiguedad: number | null,
    _JornadaCompl: boolean | null,
    _Experiencia: number | null
    _Repartos: number | null
  }

// La colección de la BD (Plural siempre)
export const EmpleadoDB = model('empleados', empleadosSchema)