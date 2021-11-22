export class productosAlmacenados {
    protected _idAlmacen: number; // para acceder en la subclase
    protected cantidad: number;
    constructor(idAlmacen: number, cantidad: number) {
        this._idAlmacen = idAlmacen,
            this.cantidad = cantidad
    }

    get getIdAlmacen() {
        return this._idAlmacen;
    }
    get getCantidad() {
        return this.cantidad;
    }

    say() {
        console.log(`IdAlmacen: ${this.getIdAlmacen} Cantidad: ${this.getCantidad}`)
    }
}
