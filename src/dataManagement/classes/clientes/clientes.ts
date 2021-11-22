import { iCliente } from "../../schemas/clientes";

export class ClientesObj {
    protected _id: number; // para acceder en la subclase
    public _nombreCliente: string;
    public _posicion: number;

    constructor(_id: number, nombreCliente: string, posicion: number) {
      this._id = _id;
      this._nombreCliente = nombreCliente;
      this._posicion = posicion;
    }

    get getId() {
        return this._id;
    }

    get getTipo() {
        return "Cliente";
    }

    buildType(type: iCliente) {
        type._id = this.getId;
        type._nombreCliente = this._nombreCliente;
        type._posicion = this._posicion;
    }

    salario() {
        //
    }

    todo() {
        console.log(` Id: ${this._id}, Nombre: ${this._nombreCliente}, Posicion: ${this._posicion}`)
    }
} 