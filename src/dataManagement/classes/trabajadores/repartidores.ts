import { iRepartidor } from '../../schemas/empleados';
import { EmpleadosObj } from './empleados';

export class RepartidoresObj extends EmpleadosObj {
  public experiencia: number;
  public repartos: number;
  constructor(_id: number, tipo: string, nombre: string, antiguedad: number, jornadaCompl: boolean, experiencia: number, repartos: number) {
    super(_id, tipo, nombre, antiguedad, jornadaCompl);
    this.experiencia = experiencia;
    this.repartos = repartos
  }

  get getExperiencia() {
    return this.experiencia;
  }
  get getRepartos() {
    return this.repartos;
  }

  buildType(type: iRepartidor) {
    super.buildType(type);
    type._Experiencia = this.getExperiencia;
    type._Repartos = this.getRepartos;
  }

  todo() {
    console.log(`Id: ${this._id}, Tipo: ${this.tipo}, Nombre: ${this.nombre}, Antiguedad: ${this.antiguedad}, Jornada: ${this.jornadaCompl}, Experiencia: ${this.experiencia}, Repartos: ${this.repartos}`)
  }

  generateFields(...myFields: string[]) {
    let nombresAvaible = ["Pablo", "Miguel", "Paula", "Francisco", "Josemiguel", "Ramon", "Luis", "Bernard", "Paulito", "Rafa", "German", "Lucas", "Sara", "Alvaro", "Adolfo", "Sergio", "Juan", "Ivan", "Emilio"]
    let valueJornada
    if (myFields.includes("id")) {
      let valueId = Math.trunc(Math.random() * (99999999 - 11111111) + 11111111);
      this._id = valueId
    } if (myFields.includes("nombre")) {
      let valueName = nombresAvaible[Math.trunc(Math.random() * (nombresAvaible.length) - 1)];
      this.nombre = valueName
    } if (myFields.includes("antiguedad")) {
      let valueAntiguedad = Math.trunc(Math.random() * (45 - 1) + 1)
      this.antiguedad = valueAntiguedad
    } if (myFields.includes("jornada")) {
      if (Math.random() > 0.5) {
        valueJornada = false
        this.jornadaCompl = valueJornada
      } else {
        valueJornada = true
        this.jornadaCompl = valueJornada
      }
    } if (myFields.includes("experiencia")) {
      this.experiencia = Math.trunc(Math.random() * (25 - 1) + 1)
    } if (myFields.includes("repartos")) {
      this.repartos = Math.trunc(Math.random() * (100 - 1) + 1)
    }
  }
}