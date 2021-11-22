/*import { leerTeclado } from '../util/leertTeclado'

// Aquí simplemente tenemos el menu y luego mediante leerTeclado leeremos la opcion
// que quiera elegir el usuario y la devolveremos al main.
export const menu = async () => {
    while(1) {
        console.log(" a")
        console.log ("¿Que función quiere realizar?")
        console.log ("1. Listar")
        console.log ("2. Buscar")
        console.log ("3. Crear")
        console.log ("4. Editar")
        console.log ("5. Eliminar")
        console.log ("6. Otros")
        console.log (" ")
        let opcion = parseInt(await leerTeclado(`¿Que área desea gestionar?`))
        console.log(" ")

        switch (opcion) {
            case 1:
                console.log("1. Empleados")
                console.log("2. Clientes")
                console.log("3. Productos")
                console.log("4. Almacenes")
                console.log("5. Repartos")
                let opt = parseInt(await leerTeclado(`¿Que área desea gestionar?`))
                switch(opt) {
                    case 1:
                        console.log("Listando empleados...")
                        // listar()
                    break
                }
            break
            case 2:
                console.log("Listar productos")
                console.log("Crear productos")
                console.log("Buscar productos")
                console.log("Editar productos")
                console.log("Eliminar productos")
                console.log("Insertar productos aleatoriamente")
            break
            case 3:
                console.log("Crear almacen")
                console.log("Editar almacen")
                console.log("Eliminar almacen")
                console.log("Buscar almacen")
                console.log("Ver capacidad del almacén")
                console.log("Ver empleados del almacen")
            break
            case 4:
                console.log("Listar procesos de entrega") // Activos o Historicos
                console.log("Buscar una entrega en concreto") 
                console.log("Crear una nueva entrega")
                console.log("Generar nuevas entregas aleatorias")
            break
            case 5:
                console.log("Crear cliente")
                console.log("Editar cliente")
                console.log("Eliminar cliente")
                console.log("Buscar cliente")
            break
        }
    }
}

/*
export const menu = async () => {
console.log ("Que opcion prefieres?")
console.log ("1. Ver ventiladores disponibles")
console.log ("2. Buscar ventilador")
console.log ("3. Eliminar uno de los ventiladores existentes")
console.log ("4. Editar un ventilador")
console.log ("5. Crear tu propio Ventilador")
console.log ("6. Mostrar los campos de cada tipo de Ventilador")
console.log ("7. Insertar nuevos ventiladores aleatorios")
console.log (" ")
let opcion = await leerTeclado(`¿Qué quiere hacer?`)
console.log(" ")
return opcion
}
*/