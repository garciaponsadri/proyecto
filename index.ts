import { db } from './src/dataManagement/databases/database';
import { EmpleadoDB, iEmpleado, iMozo } from './src/dataManagement/schemas/empleados';
import { ClienteDB, iCliente } from './src/dataManagement/schemas/clientes';
import { EmpleadosObj } from './src/dataManagement/classes/trabajadores/empleados';
import { RepartidoresObj } from './src/dataManagement/classes/trabajadores/repartidores';
import { MozoAlmacenObj } from './src/dataManagement/classes/trabajadores/mozoAlmacen';
import { AlmacenesObj } from './src/dataManagement/classes/almacenes/almacen';
import { ClientesObj } from './src/dataManagement/classes/clientes/clientes';
import { ProductosObj } from './src/dataManagement/classes/productos/productos';
import { leerTeclado } from './src/util/leertTeclado';
import { iProducto, ProductoDB } from './src/dataManagement/schemas/productos'
import { administrar, buscarObj, createAlmacen, createCliente, createEmp, listarAlmacenes, listarClientes, listarEmp, listarProductos, randomAlm, randomCli, randomEmp, randomProd, resetDB } from './src/util/metodos';


// Declaramos tipo array de tipo Automovil de dos formas
let EmpleadosArr: Array<EmpleadosObj> = new Array<EmpleadosObj>();
let ProductosArr: Array<ProductosObj> = new Array<ProductosObj>();
let ClientesArr: Array<ClientesObj> = new Array<ClientesObj>();
let AlmacenesArr: Array<AlmacenesObj> = new Array<AlmacenesObj>();


/**
 * Aquí tenemos el método Main
 * Este será el menú principal de nuestro proyecto
 */
let main = async () => {
    await db.conectarBD()
    while (1) {
        console.clear()
        console.log("\nMenú ")
        console.log("1. Listar") // Listar Objetos
        console.log("2. Buscar") // Buscar Objetos
        console.log("3. Crear objetos custom") // Crear objetos custom 
        console.log("4. Crear objetos aleatorios") // Crear objetos aleatorios
        console.log("5. Resetear bases de datos") // Resetear base de datos
        console.log("6. Administrar almacen") // Administrar un almacen
        let opt = await leerTeclado(' ')
        let opt2: any
        switch (opt) {
            case "1":
                console.log("\n1. Empleados")
                console.log("2. Clientes")
                console.log("3. Productos")
                console.log("4. Almacenes")
                opt2 = await leerTeclado(' ')
                switch (opt2) {
                    case "1":
                        await listarEmp()
                        break

                    case "2":
                        await listarClientes()
                        break
                    case "3":
                        await listarProductos()
                        break
                    case "4":
                        await listarAlmacenes()
                        break
                }
                break

            case "2":
                await buscarObj("Empleado", -1)
                break

            case "3":
                console.log("\n1. Empleados")
                console.log("2. Clientes")
                console.log("3. Productos")
                console.log("4. Almacenes")
                opt2 = await leerTeclado(' ')
                switch (opt2) {
                    case "1":
                        await createEmp()
                        break
                    case "2":
                        await createCliente()
                        break
                    case "3":
                        //
                        break
                    case "4":
                        await createAlmacen()
                        break
                }
                break

            case "4":
                console.log("\n1. Empleados")
                console.log("2. Clientes")
                console.log("3. Producto")
                console.log("4. Almacenes")
                opt2 = await leerTeclado(' ')
                switch (opt2) {
                    case "1":
                        await randomEmp()
                        break
                    case "2":
                        await randomCli()
                        break
                    case "3":
                        await randomProd()
                        break
                    case "4":
                        await randomAlm()
                        break
                }
                break

            case "5":
                await resetDB()
                break

            case "6":
                await administrar()
                break
                
        }
        console.log(` `)
        console.log(`Pulse enter para continuar`)
        await leerTeclado('')
        console.log("\n")
    }
}
main()