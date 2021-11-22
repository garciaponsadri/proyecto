import { Schema, model } from "mongoose";
// Definimos el Schema
const clientesScema = new Schema({
    _id: {
        type: Number // para acceder en la subclase
    },
    _nombreCliente: {
        type: String
    },

    _posicion: {
        type: Number
    }
})


export type iCliente = {
    _id: number | null, // para acceder en la subclase
    _nombreCliente: string | null,
    _posicion: number | null
  }

// La colección de la BD (Plural siempre)
export const ClienteDB = model('clientes', clientesScema)