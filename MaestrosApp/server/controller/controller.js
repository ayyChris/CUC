var UserDB = require('../model/model');

//crear, guardar maestro
exports.create = (req,res)=> {
    //validar request
    if(!req.body){
        res.status(400).send({message:"Debe escribir en todos los espacios solicitados."});
        return;
    }

    //nuevo maestro
    const maestro = new UserDB({
        nombreCompleto:req.body.nombreCompleto,
        Cedula:req.body.Cedula,
        Edad:req.body.Edad,
        Especialidad:req.body.Especialidad,
        Provincia:req.body.Provincia,
        FechaIngreso:req.body.FechaIngreso,
        PasswordMaestro:req.body.PasswordMaestro
    })

    //salvar en la base
    maestro
        .save(maestro)
        .then(data =>{
            //res.send(data)
            res.redirect('/registrar-maestro');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Algun error ha ocurrido mientras se registra el maestro."
            })
        })
}

//retrieve and recibe all users/single user(listado general)
exports.findAll = (req,res)=> {
    UserDB.find()
    .then(maestro =>{
        res.send(maestro);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Algun error ha ocurrido mientras se encuentra el maestro. Verifique de que haya un maestro existente en el sistema."
        })
    })
    
}

//buscar un solo maestro
exports.findOne = (req,res)=> {
    if(req.params.id){
        //const cedula = req.params.Cedula;
        const id = req.params.id;
        //UserDB.findOne({Cedula:cedula})
        UserDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message: "Esta cedula no existe en la base de datos" + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:err.message||"Algun error ha ocurrido mientras se encuentra el maestro. Verifique de que haya un maestro existente con esta Cedula en el sistema."
                })
            })
    }else{
        res.send({message:"No se encuentra este maestro en específico en la base de datos."})
    }
    
    
}

//Modificar usuario por id
exports.update = async (req,res)=> {
    if(!req.body){
        res.status(400).send({message:"Este maestro no se encuentra en la base de datos, intente de nuevo."});
        return;
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(404).send({message:`No se puede modificar el usuario con esta ID: ${id}. Verifique que es la ID adecuada.`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Algun error ha ocurrido mientras se encuentra el maestro. Verifique de que haya un maestro existente con esta ID en el sistema."
            })
        })
}

//Borrar por id
exports.delete = (req,res)=> {
    const id = req.params.id;

    UserDB.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message:`No se puede eliminar el maestro con esta ID: ${id}. Verifique que esa id es adecuada.`})
        }else{
            res.send({message:"Maestro eliminado exitosamente."})
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Algun error ha ocurrido mientras se encuentra el maestro(" + id + ")"
        });
    });
}