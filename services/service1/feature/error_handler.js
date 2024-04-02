
//#### IMPORTAR CLASE BASE DE ERRORS INTERNOS, PARA CONSTRUIR LOS DEMAS ###############
const {InternalError}=require("../../../error_handling");




//-------------------------- ERROR HANDLER DE LA FEATURE -----------------------------
//Este toma excepciones "directas de la falla", y los transforma en excepciones
//que nuestro codigo puede entender mas facil.
//( Estos errors que lanzen son todos internos )

function igRequest_errorHandler(error){
    let message=error.message;
    
    if (error.type=="invalid-json"){
        throw new BannedIgAccount_Error();
    }

    else if (message=="not auth"){
        throw new NotAuthIgAccount_Error();
    }

    else{
       throw new UnknownIgRequest_Error("",error);
    }
}

//--------------------- CLASES DE ERRRORS INTERNOS QUE SE ORIGINAN EN LA FEATURE ------------------

class NotAuthIgAccount_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=false;
    }
}


class BannedIgAccount_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=false;
    }
}


class UnknownIgRequest_Error extends InternalError{
    constructor(message,attachedError){
        super(message,attachedError);
        this.critic=true;
    }
}


module.exports={igRequest_errorHandler,
                BannedIgAccount_Error,NotAuthIgAccount_Error,UnknownIgRequest_Error};
