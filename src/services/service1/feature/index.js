
const {igRequest_errorHandler}=require("./error_handler.js");


async function userInfo_igRequest(){

    //hacemos la request
    let data;
    try{
        let response=await fetch("http//omaigat.api");

        data=await response.json();

    }
    
    //Si hay errors
    catch(e){
      //############### los mandamos al handler de la feature ####################################
        igRequest_errorHandler(e);
    }

    return {id:data.id,isPrivate:data.isPrivate};

}

async function followers_igRequest(){
    
    //hacemos la request
    let data;
    try{
        let response=await fetch("http//omaigat.api");

        data=response.json();

    }
    //Si hay errors
    catch(e){

      //########### los mandamos al handler de la feature. #################################
        igRequest_errorHandler(e);
        
    }

    return {followers:data.followers,cursor:data.cursor};
}

module.exports={userInfo_igRequest,followers_igRequest};