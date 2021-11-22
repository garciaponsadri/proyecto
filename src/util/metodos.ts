// Este segundo método nos sirve para generar un nuevo Id.
// Imaginemos que tenemos el siguiente Array: [0-> Verde, 1-> Azul, 3-> Rojo]
// En caso de generar un nuevo elemento probablemente nos elegiría el Id 4 aunque el Id 2 esté vacío.
// Con el método getNewId comprobaremos las Id's que no están siendo ocupadas 
import { productosAlmacenados } from "../dataManagement/classes/productos/productosAlmacen"
import { traceDeprecation } from "process";
import { ClientesObj } from "../dataManagement/classes/clientes/clientes";
import { EmpleadosObj } from "../dataManagement/classes/trabajadores/empleados";
import { MozoAlmacenObj } from "../dataManagement/classes/trabajadores/mozoAlmacen";
import { RepartidoresObj } from "../dataManagement/classes/trabajadores/repartidores";
import { ProductosObj } from "../dataManagement/classes/productos/productos";
import { db } from "../dataManagement/databases/database";
import { ClienteDB, iCliente } from "../dataManagement/schemas/clientes";
import { EmpleadoDB } from "../dataManagement/schemas/empleados";
import { AlmacenesDB, iAlmacen } from "../dataManagement/schemas/almacenes";
import { iEmpleado, iRepartidor, iMozo } from "../dataManagement/schemas/empleados";
import { iProducto, ProductoDB } from "../dataManagement/schemas/productos";
//import { iReparto } from "../dataManagement/schemas/repartos";
import { leerTeclado } from "./leertTeclado";
import { Schema } from "mongoose";
import { AlmacenesObj } from "../dataManagement/classes/almacenes/almacen";

/**
 * Aquí declaramos una interfaz donde guardaremos los valores de distintos tipos de variables.
 * Nos servirá para generar objetos aleatorios de forma más óptima
 */
export interface myCampos {
  id: number;
  nombre: string;
  tipo: string;
  antiguedad: number;
  jornada: boolean;
  repartos: number;
  experiencia: number;
  posicion: number;
  capacidadMax: number;
  nombreProducto: string;
  qty: number;
}

/**
 * Aquí instanciaremos los tipos como dSchemas, estos dSchemas almacenarán la información para subirla a mongo.
 */
let dSchemaCliente: iCliente = {
  _id: null,
  _nombreCliente: null,
  _posicion: null
}

let dSchemaAlmacen: iAlmacen = {
  _id: null,
  _Posicion: null,
  _CapacidadMax: null,
  _Mozos: []
}

let dSchemaProducto: iProducto =
{
  _id: null,
  _NombreProducto: null,
  _Almacenamiento: [],
}


let dSchemaEmpleado: iEmpleado =
{
  _id: null,
  _Tipo: null,
  _Nombre: null,
  _Antiguedad: null,
  _JornadaCompl: null,
}

let dSchemaMozo: iMozo =
{
  _id: null,
  _Tipo: null,
  _Nombre: null,
  _Antiguedad: null,
  _JornadaCompl: null,
  _IdAlmacen: null
}

let dSchemaRepartidor: iRepartidor =
{
  _id: null,
  _Tipo: null,
  _Nombre: null,
  _Antiguedad: null,
  _JornadaCompl: null,
  _Experiencia: null,
  _Repartos: null
}

/**
 * Aquí declararemos un Array con los nombres disponibles para personas y para productos.
 * De aquí sacaremos la información para crear objetos aleatorios!
 */
const AVAILABLE_NAMES = [
  "Pablo", "Miguel", "Paula", "Francisco",
  "Josemiguel", "Ramon", "Luis", "Bernard",
  "Paulito", "Rafa", "German", "Lucas",
  "Sara", "Alvaro", "Adolfo", "Sergio",
  "Juan", "Ivan", "Emilio"
];

const AVAILABLE_PRODUCTO = [
  "Chocolate", "Pescado", "Pizza", "Xiaomi",
  "Ordenador", "Cartera", "Batidos", "Zumos",
  "Leche", "Cartel", "Señal", "Fotografias",
  "Cargador", "Camiseta", "Vaqueros"
];

/**
 * Aquí realizaremos una función para listar los clientes realizando un find a mongo e instanciando cada documento
 * y printeando por pantalla con la función "todo()"
 */
export const listarClientes = async () => {
  let query: Array<any> = await ClienteDB.find({})
  for (let a of query) {
    let myCliente = new ClientesObj(a._id, a._nombreCliente, a._posicion)
    myCliente.todo()
  }
}

/**
 * Aquí realizaremos una función para listar los almacenes realizando un find a mongo e instanciando cada documento
 * y printeando por pantalla con la función "todo()"
 */
export const listarAlmacenes = async () => {
  let query: Array<any> = await AlmacenesDB.find({})
  for (let a of query) {
    let myAlmacen = new AlmacenesObj(a._id, a._Posicion, a._CapacidadMax, a._Mozos)
    myAlmacen.todo()
  }
}


/**
 * Aquí realizaremos una función para listar los productos realizando un find a mongo e instanciando cada documento
 * y printeando por pantalla con la función "todo()"
 */
export const listarProductos = async () => {
  let query: Array<any> = await ProductoDB.find({})
  for (let a of query) {
    let myProducto = new ProductosObj(a._id, a._NombreProducto, a._Almacenamiento)
    myProducto.todo()
  }
}

/**
 * Aquí realizaremos una función para listar los empleados realizando un find a mongo e instanciando cada documento
 * y printeando por pantalla con la función "todo()"
 */
export const listarEmp = async () => {
  let query: Array<any> = await EmpleadoDB.find({})
  for (let a of query) {
    if (a._Tipo == "Empleado") {
      let encargado = new EmpleadosObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl)
      encargado.todo()
    } else if (a._Tipo == "Mozo") {
      let encargado = new MozoAlmacenObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._IdAlmacen)
      encargado.todo()
    } else if (a._Tipo == "Repartidor") {
      let encargado = new RepartidoresObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._Experiencia, a._Repartos,)
      encargado.todo()
    }
  }
}

/**
 * En esta función recibiremos como parámetro una lista de Strings y lo guardaremos en un Array.
 * Para cada uno de estos elementos de la lista asignaremos a nuestro Hashmap su respectivo valor mediante
 * funciones de generación de valores aleatorios.
 */
export const generateFields = (...myFields: string[]) => {
  // Aquí instanciamos nuestro Hashmap y le asignaremos valores por defecto a 0
  let myHash: myCampos = {
    id: 0,
    nombre: "",
    tipo: "",
    antiguedad: 0,
    jornada: false,
    repartos: 0,
    experiencia: 0,
    posicion: 0,
    capacidadMax: 0,
    nombreProducto: "",
    qty: 0
  }

  // Aquí comenzaremos con las comprobaciones, para cada uno de los elementos que le pasemos por parametro
  // le generaremos un valor aleatorio al campo del hashmap respectivo al elemento del array
  if (myFields.includes("id")) {
    myHash.id = Math.trunc(Math.random() * (99999999 - 11111111) + 11111111)
  }

  if (myFields.includes("nombre")) {
    myHash.nombre = AVAILABLE_NAMES[Math.trunc(Math.random() * (AVAILABLE_NAMES.length) - 1)];
  }

  if (myFields.includes("antiguedad")) {
    myHash.antiguedad = Math.trunc(Math.random() * (45 - 1) + 1);
  }

  if (myFields.includes("jornada")) {
    myHash.jornada = Math.random() > 0.5;
  }

  if (myFields.includes("experiencia")) {
    myHash.experiencia = Math.trunc(Math.random() * (25 - 1) + 1)
  }

  if (myFields.includes("repartos")) {
    myHash.repartos = Math.trunc(Math.random() * (100 - 1) + 1)
  }

  if (myFields.includes("posicion")) {
    myHash.posicion = Math.trunc(Math.random() * (100 - 1) + 1)
  }

  if (myFields.includes("capacidadMax")) {
    myHash.capacidadMax = Math.trunc(Math.random() * (1000 - 100) + 100)
  }

  if (myFields.includes("nombreProducto")) {
    myHash.nombreProducto = AVAILABLE_PRODUCTO[Math.trunc(Math.random() * (AVAILABLE_PRODUCTO.length) - 1)];
  }

  if (myFields.includes("qty")) {
    myHash.qty = Math.trunc(Math.random() * (15 + 1) + 1);
  }
  return myHash
}

/**
 * Aquí le pasaremos como parámetro el tipo de empleado:
 * @param employeeType 
 * 
 * Según el tipo de empleado le generaremos un empleado de un tipo u otro.
 * Los valores con los que creará el respectivo empleado serán aleatorios llamando a GenerateFields()
 * @returns 
 * Como digo, devolverá un objeto.
 */
export const randomEmployeeByType = (employeeType: string) => {
  let campos = generateFields("id", "nombre", "antiguedad", "jornada", "almacen", "repartos", "experiencia", "repartos")
  switch (employeeType) {
    case "0":
      return new EmpleadosObj(campos.id, "Empleado", campos.nombre, campos.antiguedad, campos.jornada);
    case "1":
      return new MozoAlmacenObj(campos.id, "Mozo", campos.nombre, campos.antiguedad, campos.jornada, 0);
    case "2":
      return new RepartidoresObj(campos.id, "Repartidor", campos.nombre, campos.antiguedad, campos.jornada, campos.experiencia, campos.repartos)
  }
}

/**
 * Aquí recibiremos como parámetro
 * @param employeeType 
 * el cual sería un string como "0", "1", "2" (en función de la opción elegida en un menu)
 * En función de esto devolveremos el dSchema que le corresponda en función del menu
 *  
 * @returns 
 */
export const getSchemaFromType = (employeeType: string) => {
  switch (employeeType) {
    case "0":
      return dSchemaEmpleado;
    case "1":
      return dSchemaMozo;
    case "2":
      return dSchemaRepartidor;
  }
}

/**
 * Aquí generamos nuestro empleado random.
 */
export const randomEmp = async () => {
  // Pediremos al usuario que inserte numero de empleados a generar
  // Y el tipo de empleados a crear
  let value = parseInt(await leerTeclado('Inserte numero elementos a generar'))
  let tipo = parseInt(await leerTeclado('Que tipo de objeto quiere crear:\n0) Empleados\n1) MozoAlmacen\n2) Repartidores\n3) Aleatorio\n'))

  // Ahora iremos 1 a 1 creando los objetos.
  for (let i = 0; i < value; i++) {
    let tipoMine = tipo

    // Si ha elegido tipo aleatorio le asignaremos un tipo que exista (Empleado/MozoAlmacen/Repartidores)
    if (tipo == 3) {
      tipoMine = Math.trunc(Math.random() * 2);
    }

    // generamos un empleado aleatorio segun su tipo
    let worker: any = randomEmployeeByType(tipoMine + "");

    // obtenemos su schema segun su tipo.
    let schemaType: any = getSchemaFromType(tipoMine + "");

    // construimos el schema a partir de nuestro objeto y
    // lo imprimos por pantalla.
    worker.buildType(schemaType)
    console.table(schemaType);

    // subimos el schema actualizado a la base de datos.
    await new EmpleadoDB(schemaType).save();
  }
}


/**
 * Aquí tenemos la generación de producto random, como antes pediremos el numero de productos a crear.
 * Generaremos los campos que necesitemos aleatoriamente.
 * Y en este caso, al ser un objeto complejo llamaremos a la función @param randomProductosAlmacenados()
*/
export const randomProd = async () => {
  let value = parseInt(await leerTeclado('Inserte numero elementos a generar'))
  for (let i = 0; i < value; i++) {
    let campos = generateFields("id", "nombreProducto")
    let miProducto = new ProductosObj(
      campos.id,
      campos.nombreProducto,
      await randomProductosAlmacenados()
    );

    // Aquí llamamos a la función de buildType para construir el dSchema
    miProducto.buildType(dSchemaProducto)
    console.table(miProducto);
    await new ProductoDB(dSchemaProducto).save();
  }
}

/**
 * Esta función creamos para cada almacén existente un posible registro de nuestro producto en el.
 * @returns 
 */
export const randomProductosAlmacenados = async () => {
  const productos: productosAlmacenados[] = []
  const query = await AlmacenesDB.find({})
  for (const almacen of query) {
    // Aquí utilizamos probabilidades para generar o no la entrada del producto.
    if (Math.random() < 0.9) {
      continue;
    }

    productos.push(new productosAlmacenados(
      almacen._id,
      Math.trunc(Math.random() * (5)) + 1
    )
    )

  }
  return productos;
}

/**
 * Aquí creamos almacenes aleatorios, es sencilla su estructura.
 */
export const randomAlm = async () => {
  let value = parseInt(await leerTeclado('Inserte numero elementos a generar'))
  for (let i = 0; i < value; i++) {
    let campos = generateFields("id", "posicion", "capacidadMax")
    let worker = new AlmacenesObj(campos.id, campos.posicion, campos.capacidadMax, []);
    worker.buildType(dSchemaAlmacen)
    console.table(dSchemaAlmacen);
    await new AlmacenesDB(dSchemaAlmacen).save();
  }
}

/**
 * Aquí clientes aleatorios y de nuevo, su estructura es sencilla.
 */
export const randomCli = async () => {
  let value = parseInt(await leerTeclado('Inserte numero elementos a generar'))
  for (let i = 0; i < value; i++) {
    let campos = generateFields("id", "nombre", "posicion")
    let worker = new ClientesObj(campos.id, campos.nombre, campos.posicion);
    worker.buildType(dSchemaCliente)
    console.table(dSchemaCliente);
    await new ClienteDB(dSchemaCliente).save();
  }
}

/**
 * Aquí buscaremos los objetos Empleados
 * @param Coleccion 
 * @param Requisito 
 * 
 * Recorreremos el array en busca del documento que cumpla con el dato solicitado (id)
 */
export const buscarObj = async (Coleccion: String, Requisito: Number) => {
  if (Requisito < 0) {
    Requisito = parseInt(await leerTeclado('Introduzca un Id'))
  }
  let encargado: any
  switch (Coleccion) {
    case "Empleado":
      let query: any = await EmpleadoDB.find({ _id: Requisito })
      for (let a of query) {
        if (a._Tipo == "Empleado") {
          encargado = new EmpleadosObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl)
        } else if (a._Tipo == "Mozo") {
          encargado = new MozoAlmacenObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._IdAlmacen)
        } else if (a._Tipo == "Repartidor") {
          encargado = new RepartidoresObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._Experiencia, a._Repartos)
        }
        encargado.todo()
      }
      break
  }
}

/**
 * Aquí crearemos productos a mano.
 */
export const createProducto = async () => {
  let oSchema: any
  dSchemaProducto._NombreProducto = await leerTeclado('Inserte le nombre del producto')
  let campos = generateFields("id")
  dSchemaProducto._id = campos.id
  oSchema = new ProductoDB(dSchemaProducto)
  oSchema.save()
}

/**
 * Aquí crearemos el almacen a mano
 */
export const createAlmacen = async () => {
  let oSchema: any
  dSchemaAlmacen._Posicion = parseInt(await leerTeclado('Inserte la posicion del almacen (numerico)'))
  let campos = generateFields("id")
  dSchemaAlmacen._id = campos.id
  dSchemaAlmacen._CapacidadMax = parseInt(await leerTeclado('Inserte la capacidad maxima del almacen (numerico)'))
  dSchemaAlmacen._Mozos = []
  oSchema = new AlmacenesDB(dSchemaAlmacen)
  oSchema.save()
}

/**
 * Aquí crearemos el cliente a mano
 */
export const createCliente = async () => {
  let oSchema: any
  dSchemaCliente._nombreCliente = await leerTeclado('Inserte el nombre del cliente')
  dSchemaCliente._posicion = parseInt(await leerTeclado('Inserte la posicion del cliente (numerico)'))
  let campos = generateFields("id")
  dSchemaCliente._id = campos.id
  oSchema = new ClienteDB(dSchemaCliente)
  oSchema.save()
}

/**
 * Aquí crearemos el empleado a mano
 */
export const createEmp = async () => {
  let opt = await leerTeclado("Que tipo de empleado quiere crear?\n1) Empleado\n2) Repartidor\n3) Mozo")
  let oSchema: any

  dSchemaRepartidor._id = dSchemaMozo._id = dSchemaEmpleado._id = parseInt(await leerTeclado('Inserte valor para el id, formato: XXXXXXXX'))
  dSchemaRepartidor._Nombre = dSchemaMozo._Nombre = dSchemaEmpleado._Nombre = await leerTeclado('Inserte el nombre del empleado')
  dSchemaRepartidor._Antiguedad = dSchemaMozo._Antiguedad = dSchemaEmpleado._Antiguedad = parseInt(await leerTeclado('Inserte la antiguedad del empleado'))
  let optJornada = await leerTeclado('Inserte si el empleado tiene jornada completa, S/N')
  if (optJornada == "S") {
    dSchemaRepartidor._JornadaCompl = dSchemaMozo._JornadaCompl = dSchemaEmpleado._JornadaCompl = true
  } else {
    dSchemaRepartidor._JornadaCompl = dSchemaMozo._JornadaCompl = dSchemaEmpleado._JornadaCompl = false
  }
  switch (opt) {
    case "1":
      dSchemaEmpleado._Tipo = "Empleado"
      oSchema = new EmpleadoDB(dSchemaEmpleado)
      oSchema.save()
      await new Promise(f => setTimeout(f, 500));
      console.log(" ")
      await buscarObj("Empleado", dSchemaEmpleado._id)
      break
    case "2":
      dSchemaMozo._Tipo = "Mozo"
      dSchemaMozo._IdAlmacen = parseInt(await leerTeclado('Inserte Id de Almacen'))
      oSchema = new EmpleadoDB(dSchemaMozo)
      oSchema.save()
      await new Promise(f => setTimeout(f, 500));
      console.log(" ")
      await buscarObj("Empleado", dSchemaMozo._id)
      break
    case "3":
      dSchemaRepartidor._Tipo = "Repartidor"
      dSchemaRepartidor._Experiencia = parseInt(await leerTeclado('Inserte la experiencia del trabajador'))
      dSchemaRepartidor._Repartos = parseInt(await leerTeclado('Inserte el numero de repartos del trabajador'))
      oSchema = new EmpleadoDB(dSchemaRepartidor)
      oSchema.save()
      await new Promise(f => setTimeout(f, 500));
      console.log(" ")
      await buscarObj("Empleado", dSchemaRepartidor._id)
      break
  }
  console.log(" ")
}

/**
 * Este método nos servirá para resetear las colecciones existentes.
 */
export const resetDB = async () => {
  let Coleccion = await leerTeclado("Que colecccion quiere eliminar?\nEmpleado | Cliente | Producto | Almacen\n")
  if (Coleccion == "Empleado") {
    await EmpleadoDB.remove({})
  } else if (Coleccion == "Cliente") {
    await ClienteDB.remove({})
  } else if (Coleccion == "Producto") {
    await ProductoDB.remove({})
  } else if (Coleccion == "Almacen") {
    await AlmacenesDB.remove({})
  } else {
    console.log("Por favor, introduzca el nombre de la colección tal y como viene en el enunciado de arriba.")
  }
}

/**
 * Aquí accederemos al menú de administración del almacén al que queramos configurar
 */
export const administrar = async () => {
  let idAlmacen = await leerTeclado("Inserte el id del Almacen a configurar")
  let query = await AlmacenesDB.find({})
  for (let a of query) {
    if (a._id == idAlmacen) {
      console.log(" :D")
      let miAlmacen = new AlmacenesObj(a._id, a._Posicion, a._CapacidadMax, a._Mozos)
      await almacenGestion(miAlmacen)
    }
  }
}


/**
 * Aquí se nos abrirá un nuevo menu para realizar distintas funciones
 */
export const almacenGestion = async (miAlmacen: AlmacenesObj) => {
  let opt: any
  do {
    console.clear()
    console.log("Menu de gestion de Almacen");
    console.log("1) Listar Mozos sin Almacen asignado");
    console.log("2) Listar Mozos de mi Almacen");
    console.log("3) Agregar Mozo de Almacen");
    console.log("4) Eliminar Mozo de Almacen");
    console.log("5) Estadisticas del Almacen");
    let opt = parseInt(await leerTeclado('Inserte su opción por teclado'))
    console.log("")
    switch (opt) {
      case 1:
        await listarMozos()
        break
      case 2:
        await listarMisMozos(miAlmacen)
        break
      case 3:
        await agregarMozo(miAlmacen)
        break
      case 4:
        await eliminarMozo(miAlmacen)
        break
      case 5:
        await estadisticasAlmacen(miAlmacen)
        break
    }
    await leerTeclado('')
  } while (opt != 100)
}

/**
 * Lo primero será actualizar el almacén, es decir, hacer persistente nuestro objeto.
 * @param miAlmacen 
 */
export const actualizarAlmacen = async (miAlmacen: AlmacenesObj) => {
  await AlmacenesDB.updateOne({ _id: miAlmacen.getId }, { _Mozos: miAlmacen.getMozos, capacidadMax: miAlmacen.myCapacidadMax() })
}

/**
 * Aquí actualizarelos nuestros encargados haciendo de esta manera (y nuevamente) persistente nuestros objetos.
 * @param MiMozo 
 */
export const actualizarEncargados = async (MiMozo: MozoAlmacenObj) => {
  await EmpleadoDB.updateOne({ _id: MiMozo.getId }, { _IdAlmacen: MiMozo.getIdAlmacen })
}

/**
 * Aquí listaremos todos los empleados de tipo Mozo, que serán aquellos que fichemos para nuestro almacen.
 */
export const listarMozos = async () => {
  let query: Array<any> = await EmpleadoDB.find({ _Tipo: "Mozo" })
  for (let a of query) {
    let encargado = new MozoAlmacenObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._IdAlmacen)
    encargado.todo()
  }
}

/**
 * Aquí listaremos los empleados que estén registrados para nuestro almacen
 * @param miAlmacen 
 */
export const listarMisMozos = async (miAlmacen: AlmacenesObj) => {
  let query: Array<any> = await AlmacenesDB.find({ _id: miAlmacen.getId, tipo: "Mozo" })
  for (let e of query) {
    for (let a of e._Mozos) {
      let encargado = new MozoAlmacenObj(a._id, a.tipo, a.nombre, a.antiguedad, a.jornadaCompl, a.idAlmacen)
      encargado.todo()
      if (!miAlmacen.existMozo(encargado)) {
        miAlmacen.agregarMozo(encargado)
      }
    }
  }
}

/**
 * Aquí agregariamos un nuevo trabajador a nuestro almacen
 * @param miAlmacen 
 */
export const agregarMozo = async (miAlmacen: AlmacenesObj) => {
  let idMozo = await leerTeclado('Ingrese Id del Mozo a agregar')
  let query: Array<any> = await EmpleadoDB.find({ tipo: "Mozo", _id: idMozo })
  for (let a of query) {
    let miMozo = new MozoAlmacenObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._IdAlmacen)
    if (!miAlmacen.existMozo(miMozo)) {
      miAlmacen.agregarMozo(miMozo)
      miMozo.setIdAlmacen(miAlmacen.getId)
    } else {
      console.log("Ya está incluido este mozo en el almacén!")
    }
    await actualizarEncargados(miMozo)
  }
  await actualizarAlmacen(miAlmacen)
}

/**
 * Aquí eliminaríamos un trabajador de nuestro almacen
 * @param miAlmacen 
 */
export const eliminarMozo = async (miAlmacen: AlmacenesObj) => {
  let idMozo = await leerTeclado('Ingrese Id del Mozo a agregar')
  let query: Array<any> = await EmpleadoDB.find({ tipo: "Mozo", _id: idMozo })
  for (let a of query) {
    let miMozo = new MozoAlmacenObj(a._id, a._Tipo, a._Nombre, a._Antiguedad, a._JornadaCompl, a._IdAlmacen)
    if (miAlmacen.existMozo(miMozo)) {
      miAlmacen.eliminarMozo(miMozo)
      miMozo.setIdAlmacen(0)
    } else {
      console.log("No existe ese mozo en tu almacén! :(")
    }
    await actualizarEncargados(miMozo)
  }
  await actualizarAlmacen(miAlmacen)
}

/**
 * Aquí haremos un print general de nuestro Almacen.
 * @param miAlmacen 
 */
export const estadisticasAlmacen = async (miAlmacen: AlmacenesObj) => {
  miAlmacen.todo()
  await actualizarAlmacen(miAlmacen)
}