import { Categoria } from '../sequelize';


export const crear = async(req, res) => {
    const body = req.body;
    try{
        const categoriadb = await Categoria.create(body);
        res.status(200).json(categoriadb)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un error al crear la categoria',
            error
        })
    }
}
export const buscar = async(req, res) => {
    try{
        const categoriadb = await Categoria.findAll();
        res.json(categoriadb);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un error',
            error
        })
    }
}

export default{
    crear, buscar
}