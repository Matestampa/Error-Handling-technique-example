//--------------------- IMPORTAR PARTE DE ERRORS -------------------------------------------

//##### ERRORS PARA EL USER #########
const {DFLT_API_ERRORS}=require("../../error_handling/index.js");


//##### Errores internos que pueden lanzar las cosas que consuma el servico,#######
//##### y que se sepan que van a ser handleados aca. #######
const {BannedIgAccount_Error,NotAuthIgAccount_Error,
       UnknownIgRequest_Error}=require("./feature/error_handler.js");


//##### HANDLER CENTRAL DE ERRORS INTERNOS ######
const {internalError_handler}=require("../../error_handling/index.js");



//----------------------- ERROR HANDLER DEL SERVICIO ---------------------------------

//Este error handler es propio del servicio, y se encarga
//tanto de retornar un error para el usuario, como de ejecutar
//la logica posterior necesaria de c/u.

//En este caso aparte del error, toma como params 2 cosas que
//considera necesarias para hacer su logica, o para agregarle info al error, 
//cuando ocurre alguno.
//(El handler de cada servico puede manejar esto como quiera)


async function error_handler(error,AccountsManager,account_key){
     
    if (error instanceof BannedIgAccount_Error){
        
        //Hacemos logica
        AccountsManager.disable_account(account_key);
        
        //Aplicamos info al error
        error.message=`Account:${account_key} banned`
        
        //Lo mandamos al handler central
        internalError_handler(error)
        
        //Devolvemos el error para el user
        return DFLT_API_ERRORS.RETRY();
    }

    if (error instanceof NotAuthIgAccount_Error){

        //Hacemos logica
        AccountsManager.disable_account(account_key,"auth");

        //Aplicamos info al error
        error.message=`Account:${account_key} not auth`
        
        //Lo mandamos al handler central
        internalError_handler(error);
        
        //Devolvemos el error para el user
        return DFLT_API_ERRORS.RETRY();
    }

    if (error instanceof UnknownIgRequest_Error){
        
        //Hacemos logica
        AccountsManager.disable_account(account_key)
        
        //Aplicamos info al error
        error.message=`Account:${account_key} unknown error`
        
        //Lo mandamos al handler central
        internalError_handler(error);

        //Devolvemos el error para el user
        return DFLT_API_ERRORS.SERVER();
    }

}



module.exports={error_handler}