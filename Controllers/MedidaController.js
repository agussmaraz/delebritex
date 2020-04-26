import {Medida} from '../sequelize'

export const crear = async(req, res) => {
    const body = req.body;
    try{
        const medidadb = await Medida.create(body);
        res.status(200).json(medidadb);
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            mensaje: 'Hubo un problema al agregar el producto',
            error
        })
    }
}

export const buscar = async(req, res) => {
    try{
        const medidadb = await Medida.find();
        res.json(medidadb);
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema al buscar los productos',
            error
        })
    }
}

export default {
    crear, buscar
}