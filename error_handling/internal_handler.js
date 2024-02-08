
//------------------------------- HANDLER CENTRAL DE ERRORES INTERNOS -------------------------

async function internalError_handler(error){
    
  //Lo logea en donde sea. (esto depende de cada caso)
    console.log(`${error} DESDE EL INTERNAL HANDLER`);

    //Si es critico, tira abajo el server o las requests.
    if (error.critic){
      //tirar abajo lo q sea
    }
}


//------------------------------ CLASES DE ERRORS INTERNOS --------------------------------------

//########## Clase base ####################
class InternalError extends Error{
    constructor(message,attachedError){
      super(message);
      this.message=message; //str
      this.attachedError=attachedError; //Error
      this.critic; //bool
    }
}

//las implementaciones quedan a cargo de los servicios

module.exports={internalError_handler,InternalError};