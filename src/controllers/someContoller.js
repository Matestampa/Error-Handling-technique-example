//------------------------- IMPORTAR PARTE DE ERRROS -------------------------------

//#### HANDLER CENTRAL DE LA API ##############
const {apiError_handler}=require("../error_handling");


//------------------------ importar utils del controller --------------------------
const {getFollowers_service}=require("../services/service1");


async function someController(req,res){

    validation(req);
    
    //Llamamos al servico necesario
    let followers;
    try{
          followers=await getFollowers_service(req.body.username);

          res.status(200).json({"followers":followers});
    }
    
    //Si dio algun error (que debe ser para el user si o si)
    catch(error){

        //############## LE PASAMOS EL ERROR AL HANDLER DE LA API ##########################
        apiError_handler(error,res);
    }

}