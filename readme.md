# Adrià García Pons : PROYECTO TYPESCRIPT
_Fecha: 22/11/2021_

### Información General 📋
* Proyecto Typescript
* Las explicaciones del código están documentadas en el mismo código pero también las encontraremos dentro del PDF 📖   

### Advertencia ⚠️
* En esta práctica habrá cosas que demos por hecho de las explicadas en la práctica de Herencias [Práctica Herencias](https://github.com/garciaponsadri/herencias) y en la práctica [Práctica Github](https://github.com/garciaponsadri/PrimerProyecto) y de la anterior [Práctica Typescript](https://github.com/garciaponsadri/ProyectoTypescript)

### Estructura de archivos 🛠️:

     -> doc:                       // Documentación del propio proyecto y anteriores prácticas
           > documentacion1.pdf 
           > documentacion2.pdf 
           > documentacion3.pdf 

     -> src: 
         -> util                    // Este directorio contiene los archivos typescript que forman el proyecto excepto el index.
              > metodos.ts          // Aquí tenemos los métodos que serán llamados por las funciones y desarrollarán funciones concretas.
              > entradaTeclado.ts   // Este archivo contiene la función de "leerTeclado" que utilizamos a lo largo de todo el proyecto.
             
          > index.ts                // Este archivo Typescript es el principal ya que su código será lo que primero se inicie al ejecutar el proyecto (Una vez esté compilado a .js).
         
         -> classes                 // En este directorio contendremos todos los archivos correspondientes a nuestras clase
              
        -> view                     // En este directorio contendremos los archivos de texto
             
           
      > package-lock.json           // Registro de la fuente y versión de cada uno de los paquetes instalados con npm.
      > package.json                // Archivo utilizado para definir los paquetes que forman las dependencias del proyecto. 
      > tsconfig.json               // Archivo de configuración de Typescript.
      
      x Node-Modules                // Este directorio no ha sido subido por estar incluido en el .gitignore.
      x dist                        // Este directorio no ha sido subido por estar incluido en el .gitignore.
          
      > README.md
