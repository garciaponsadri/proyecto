import { iAlmacen } from "../../schemas/almacenes";
import { MozoAlmacenObj } from "../trabajadores/mozoAlmacen";
import { ProductosObj } from "../productos/productos"
//import { productosAlmacenados } from "../productos/productos" 

export class AlmacenesObj {
    private _id: number; // para acceder en la subclase
    private posicion: number;
    private capacidadMax: number;
    private mozos: Array<MozoAlmacenObj>

    constructor(_id: number, posicion: number, capacidadMax: number, mozos: Array<MozoAlmacenObj>) {
        this._id = _id;
        this.posicion = posicion;
        this.capacidadMax = capacidadMax;
        this.mozos = mozos
    }

    get getId() {
        return this._id;
    }

    get getPosicion() {
        return this.posicion;
    }

    get getCapacidadMax() {
        return this.capacidadMax;
    }

    get getMozos() {
        return this.mozos;
    }

    set setId(value: number) {
        this._id = value;
    }

    set setPosicion(value: number) {
        this.posicion = value;
    }

    set setCapacidadMax(value: number) {
        this.capacidadMax = value;
    }

    set setMozos(value: Array<MozoAlmacenObj>) {
        this.mozos = value;
    }
    myCapacidadMax() {
        let valueCapacidad = 0
        if (this.mozos !== undefined) {
            if (this.mozos.length < 10) {
                valueCapacidad += this.mozos.length * (50)
            } else {
                valueCapacidad += 10 * (50)
            }
        } else {
            valueCapacidad = 0
        }
        this.capacidadMax = valueCapacidad
        return this.capacidadMax
    }

    buscarMozo(idMozo: number) {
        for (let a of this.mozos) {
            if (a.getId == idMozo) {
                return a
            }
        }
    }

    listarMozo() {
        for (let a of this.mozos) {
            return a
        }
    }

    existMozo(miMozo: MozoAlmacenObj) {
        for (let a of this.mozos) {
            if (a.getId == miMozo.getId) {
                return true
            }
        }
        return false
    }

    eliminarMozo(miMozo: MozoAlmacenObj) {
        this.mozos.splice(this.mozos.indexOf(miMozo), 1)
        this.myCapacidadMax()
    }

    agregarMozo(miMozo: MozoAlmacenObj) {
        this.mozos.push(miMozo)
        this.myCapacidadMax()
    }

    buildType(type: iAlmacen) {
        type._id = this.getId;
        type._Posicion = this.getPosicion;
        type._CapacidadMax = this.myCapacidadMax()
        type._Mozos = this.getMozos
    }

    todo() {
        this.myCapacidadMax()
        console.log(` Id: ${this._id}, Posicion: ${this.posicion}, CapacidadMax: ${this.capacidadMax}`)
    }

}