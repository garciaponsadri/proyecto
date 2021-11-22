import { iProducto } from '../../schemas/productos';
import { productosAlmacenados } from './productosAlmacen'

export class ProductosObj {
    protected _id: number; // para acceder en la subclase
    protected nombreProducto: string;
    protected Almacenados: Array<productosAlmacenados>

    constructor(_id: number, nombreProducto: string, Almacenados: Array<productosAlmacenados>) {
        this._id = _id;
        this.nombreProducto = nombreProducto;
        this.Almacenados = Almacenados;
    }

    get getId() {
        return this._id;
    }

    get getNombre() {
        return this.nombreProducto
    }

    get getAlmacenados() {
        return this.Almacenados;
    }

    set setAlmacenados(MiArray: Array<productosAlmacenados>) {
        this.Almacenados = MiArray;
    }

    buildType(type: iProducto) {
        type._id = this.getId;
        type._NombreProducto = this.getNombre;
        type._Almacenamiento = this.getAlmacenados;
    }


    salario() {
        //
    }

    listarAlmacen() {
        let solve = new Array
        for (let a of this.Almacenados) {
            solve.push(a.say())
        }
        if (solve.length == 0) {
            return "No hay stock"
        }
    }

    agregarStock(registro: productosAlmacenados) {
        this.Almacenados.push(registro)
    }

    todo() {
        console.log(`Id: ${this._id}, Nombre: ${this.nombreProducto}, Almacenado: ${this.listarAlmacen()}`)
    }
}