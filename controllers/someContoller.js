//------------------------- IMPORTAR PARTE DE ERRROS -------------------------------

//#### HANDLER CENTRAL DE LA API ##############
const {apiError_handler}=require("../error_handling");


//------------------------ importar utils del controller --------------------------
const {get_userInfo}=require("../services/service1");



//-------------- Controller --------------------
async function someController(req,res){
    
    //Llamar al servico necesario
    //### VEMOS QUE EL RETURN ES EN FORMATO OBJ:{error,data} ####
    let {error,user_info}=get_userInfo(req.body.username);
    
    //### SI TRAE UN ERROR ####
    if (error){
        
        //### MANDARLO AL HANDLER DE LOS ERRORS DEL USER ###
        apiError_handler(error,res);return;
    }
    
    //Si no, enviar response exitosa
    res.status(200).json({
        user_id:user_info.id
    })
}