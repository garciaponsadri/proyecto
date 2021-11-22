import { iMozo } from '../../schemas/empleados';
import { EmpleadosObj } from './empleados';

export class MozoAlmacenObj extends EmpleadosObj {
  protected idAlmacen: number;
  constructor(_id: number, tipo: string, nombre: string, antiguedad: number, jornadaCompl: boolean, idAlmacen: number) {
    super(_id, tipo, nombre, antiguedad, jornadaCompl);
    this.idAlmacen = idAlmacen;
  }

  get getIdAlmacen() {
    return this.idAlmacen;
  }

  setIdAlmacen(idAlmacen: number) {
    this.idAlmacen = idAlmacen;
  }

  todo() {
    console.log(`Id: ${this._id}, Tipo: ${this.tipo}, Nombre: ${this.nombre}, Antiguedad: ${this.antiguedad}, Jornada: ${this.jornadaCompl}, Almacen: ${this.idAlmacen}`)
  }

  buildType(type: iMozo) {
    super.buildType(type);
    type._IdAlmacen = this.getIdAlmacen;
  }
}