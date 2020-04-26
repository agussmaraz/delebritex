import {Empaque} from '../sequelize';

export const crear = async(req, res) => {
    const body = req.body;
    try{
        const empaquedb = await Empaque.create(body);
        res.status(200).json(empaquedb);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema',
            error
        })
    }
}

export const buscar = async(req, res) => {
    try{
        const empaquedb = await Empaque.findAll();
        res.json(empaquedb)
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema',
            error
        })
    }
}

export default{
    crear, buscar
}