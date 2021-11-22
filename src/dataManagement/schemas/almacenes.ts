import { Schema, model } from "mongoose";
import { boolean } from "webidl-conversions";
import { MozoAlmacenObj } from "../classes/trabajadores/mozoAlmacen";
// Definimos el Schema
const almacenesSchema = new Schema({
    _id: {
        type: Number // para acceder en la subclase
    },
    _Posicion: {
        type: Number
    },

    _CapacidadMax: {
        type: Number
    },

    _Mozos: {
        type: Array
    }
})

export type iAlmacen = {
    _id: number | null, // para acceder en la subclase
    _Posicion: number | null,
    _CapacidadMax: number | null,
    _Mozos: Array<MozoAlmacenObj> | null
  }

// La colección de la BD (Plural siempre)
export const AlmacenesDB = model('almacenes', almacenesSchema)