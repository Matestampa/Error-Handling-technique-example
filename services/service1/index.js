//------------------- IMPORTAR PARTE DE ERRORS -------------------------------------

//##### ERROR HANDLER DEL SERVICIO ############
const {error_handler}=require("./serviceErrors_handler.js");

//###### ERRORES PARA EL USER  ###########
const {DFLT_API_ERRORS}=require("../../error_handling");


//---------- importar utils del servico -----------------------------------------------
const {get_IgAccountsManager}=require("../IgAccounts_Managment")

const {userInfo_igRequest}=require("./feature");


//----------------------------------------------------------------------------
let AccountsManager=get_IgAccountsManager();




//-------------- Servicio ------------------------
async function get_userInfo(username){
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    //### (ESTE SERIA UN ERROR PARA EL USER DIRECTO) ###
    if (!req_account){
        
      //################### RETURN ERROR PARA EL USER ###########################################
        return  {error:DFLT_API_ERRORS.SERVER("No available Accounts"), user_info:null}; 
    }

    //Hacer la request
    let user_info;
    
    try{
        user_info=await userInfo_igRequest(req_account.auth.cookies, username);
    }
    
    //### SI TIRA ERROR (QUE VA A SER UNO INTERNO) ####
    catch(e){
        
      //########## PASARLE EL ERROR AL HANDLER DEL SERVICIO #######################################
      //#########      Y ESPERAR Q DEVUELVA UNO PARA EL USER #################  
      let user_error=await error_handler(e,AccountsManager,req_account.key);
        
      return {error:user_error,user_info:null};
    }
    
    //Si no
    //Nos fijamos si la cuenta es privada (lo cual en este caso esta mal)
    //### (ESTE SERIA UN ERROR PARA EL USER DIRECTO) ####
    if (user_info.isPrivate){

      //############ RETURN ERROR PARA EL USER ####################################################
        return {error:DFLT_API_ERRORS.BAD_REQ("The account is private"),user_info:null};
          
    }
    
    //Si todo fue bien, devolver la info normal
    return {error:null,user_info:user_info};
}


module.exports={get_userInfo};