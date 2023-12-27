
//---------- importar utils del servico -------------------------
const {get_IgAccountsManager}=require("../IgAccounts_Managment")

const {userInfo_igRequest,followers_igRequest}=require("./feature");

const {sleep}=require("./utils.js");


//------------------- IMPORTAR PARTE DE ERRORS -------------------------------------

//##### Error handler del servicio ############
const {error_handler}=require("./service_errorHandler.js");

//###### Errores para el user  ###########
const {DFLT_API_ERRORS}=require("../../error_handling");



//----------------------------------------------------------------------------

//Esta funcion es la que llama el controller.
//Se encarga de llamar a las funciones de "get_userInfo"
//y de "get_followers", y traer los datos.
async function getFollowers_service(username){
    let IgAccountsManager=get_IgAccountsManager();

    
    //######### Si en cualquiera de estas 2 de abajo hay una excepcion, se va a propagar ############
    //######### hacia el controller directo; ya que aca no podemos hacer nada con ella. #######

    let info=await get_userInfo(IgAccountsManager,username);

    
    let followers=await get_followers(IgAccountsManager,info.user_info.id);

    
    return {followers:followers};

}


//Return {user_info:{id,isPrivate}}
async function get_userInfo(AccountsManager,username){
    
    //Cuenta para hacer la request.
    let req_account=AccountsManager.get_accountForReq();
    
    //Si ya no hay cuentas disponibles
    if (!req_account){
        
      //################### LANZAMOS ERROR PARA EL USER ###########################################
        throw DFLT_API_ERRORS.SERVER("No available Accounts"); 
    }

    //hacer la request
    let user_info;
    try{
        user_info=await userInfo_igRequest(req_account.auth.cookies, username);
    }
    
    //Ver si tira error
    catch(error){
        
      //########## LE PASAMOS EL ERROR AL HANDLER DEL SERVICIO #######################################
        await error_handler(error,AccountsManager,req_account.key);
    }
    
    //Si no
    //Nos fijamos si la cuenta es privada (lo cual en este caso esta mal)
    if (user_info.isPrivate){

      //############ LANZAMOS ERROR PARA EL USER ####################################################
        throw DFLT_API_ERRORS.BAD_REQ("The account is private");
          
    }

    return user_info;
}



//Return {followers:{user_id:username...}}
async function get_followers(AccountsManager,user_id){ 

    let followers={};
    let cursor;
    
    //Hacemos las requests para traer de a poco los followers
    do{ 
        sleep(100);
        
        //Cuenta para hacer la request.
        req_account=AccountsManager.get_accountForReq();
        
        //Si ya no hay cuentas disponibles
        if (!req_account){

          //################## LANZAMOS ERROR PARA EL USER #######################################
            throw DFLT_API_ERRORS.SERVER("No available Accounts");
        }

        //hacer la request
        let data={};
        
        try{
            data=await followers_igRequest(req_account.auth.cookies,user_id,cursor)
        } 
        
        //Ver si tiro errror la req
        catch(error){

          //########### LE PASAMOS EL ERROR AL HANDLER DEL SERVICIO ################################
            await error_handler(error,AccountsManager,req_account.key);
        }
        
        //Si no, vamos agregando los followers.
        
        followers={...followers,...data.followers};

        cursor=data.cursor;
    }
    
    while(cursor!="");

    return followers;
}


module.exports={getFollowers_service};