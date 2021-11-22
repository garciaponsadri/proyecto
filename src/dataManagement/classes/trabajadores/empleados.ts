import { iEmpleado } from "../../schemas/empleados";

export class EmpleadosObj {
    
    protected _id: number; // para acceder en la subclase
    protected tipo: string;
    protected nombre: string;
    public antiguedad: number;
    public jornadaCompl: boolean;

    constructor(_id: number, tipo: string, nombre: string, antiguedad: number, jornadaCompl: boolean) {
        this._id = _id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.antiguedad = antiguedad;
        this.jornadaCompl = jornadaCompl;
    }

    buildType(type: iEmpleado) {
        type._id = this.getId;
        type._Tipo = this.getTipo;
        type._Nombre = this.getNombre;
        type._Antiguedad = this.getAntiguedad;
        type._JornadaCompl = this.getJornada;
    }

    get getId() {
        return this._id;
    }

    get getNombre() {
        return this.nombre;
    }

    get getTipo() {
        return this.tipo;
    }
    get getAntiguedad() {
        return this.antiguedad;
    }

    get getJornada() {
        return this.jornadaCompl;
    }

    set setId(id: number) {
        this._id = id;
    }
    set setNombre(nombre: string) {
        this.nombre = nombre;
    }
    set setTipo(tipo: string) {
        this.tipo = tipo;
    }

    salario() {
        let salario = + this.antiguedad * 0.1
        if (this.jornadaCompl == true) {
            salario = +250
        }
        salario = +750
    }



    generateFields(...myFields: string[]) {
        let nombresAvaible = ["Pablo", "Miguel", "Paula", "Francisco", "Josemiguel", "Ramon", "Luis", "Bernard", "Paulito", "Rafa", "German", "Lucas", "Sara", "Alvaro", "Adolfo", "Sergio", "Juan", "Ivan", "Emilio"]
        let valueJornada
        if (myFields.includes("id")) {
            let valueId = Math.trunc(Math.random() * (99999999 - 11111111) + 11111111);
            this._id = valueId
        } if (myFields.includes("nombre")) {
            let valueName = nombresAvaible[Math.trunc(Math.random() * (nombresAvaible.length)-1)];
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
        }
    }
    /*        } if ("IdAlmacen") {
            let valueAlmacen = Math.trunc(Math.random() * (3 - 1) + 1)
            solucion.push(valueAlmacen)
        } if ("Experiencia") {
            let valueExperiencia = Math.trunc(Math.random() * (25 - 1) + 1)
            solucion.push(valueExperiencia)
        } if ("Repartos") {
            let valueRepartos = Math.trunc(Math.random() * (100 - 1) + 1)
            solucion.push(valueRepartos)
        }*/

    todo() {
        console.log(`Id: ${this._id}, Tipo: ${this.tipo}, Nombre: ${this.nombre}, Antiguedad: ${this.antiguedad}, Jornada: ${this.jornadaCompl}`)
    }
}