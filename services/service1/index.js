//------------------- IMPORTAR PARTE DE ERRORS -------------------------------------

//##### ERROR HANDLER DEL SERVICIO ############
const {error_handler}=require("./serviceError_handler.js");

//###### ERRORES PARA EL USER  ###########
const {DFLT_API_ERRORS}=require("../../error_handling");


//---------- importar utils del servico -----------------------------------------------
const {get_IgAccountsManager}=require("../IgAccounts_Managment")

const {userInfo_igRequest,followers_igRequest}=require("./feature");

const {sleep}=require("./utils.js");

//----------------------------------------------------------------------------
let AccountsManager=get_IgAccountsManager();




//Return {user_info:{id,isPrivate}}
async function get_userInfo(username){
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    //### (ESTE SERIA UN ERROR PARA EL USER DIRECTO) ###
    if (!req_account){
        
      //################### RETURN ERROR PARA EL USER ###########################################
        return  {error:DFLT_API_ERRORS.SERVER("No available Accounts"),user_info:null}; 
    }

    //hacer la request
    let user_info;
    
    try{
        user_info=await userInfo_igRequest(req_account.auth.cookies, username);
    }
    
    //### SI TIRA ERROR (QUE VA A SER UNO INTERNO) ####
    catch(e){
        
      //########## LE PASAMOS EL ERROR AL HANDLER DEL SERVICIO #######################################
      //#########      Y ESPERAMOS Q DEVUELVA UNO PARA EL USER #################  
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
    
    //Si todo fue bien, devolvemos la info normal
    return {error:null,user_info:user_info};
}



//Return {followers:{user_id:username...}}
/*async function get_followers(user_id){ 

    let followers={};
    let cursor;
    
    //Hacemos las requests para traer de a poco los followers
    do{ 
        sleep(100);
        
        //Cuenta para hacer la request.
        req_account=AccountsManager.get_accountForReq();
        
        //Si ya no hay cuentas disponibles
        if (!req_account){

          //################## RETURN ERROR PARA EL USER #######################################
            return {error:DFLT_API_ERRORS.SERVER("No available Accounts"),followers:null};
        }

        //hacer la request
        let data={};
        
        try{
            data=await followers_igRequest(req_account.auth.cookies,user_id,cursor)
        } 
        
        //Ver si tiro errror la req
        catch(e){

          //########## LE PASAMOS EL ERROR AL HANDLER DEL SERVICIO #######################################
          //#########      Y ESPERAMOS Q DEVUELVA UNO PARA EL USER #################  
          
          let user_error=await error_handler(e,AccountsManager,req_account.key);
          return {error:user_error,followers:null};
        }
        
        //Si no, vamos agregando los followers.
        followers={...followers,...data.followers};

        cursor=data.cursor;
    }
    
    while(cursor!="");

    return {error:null,followers:followers};
}*/


module.exports={get_userInfo,get_followers};