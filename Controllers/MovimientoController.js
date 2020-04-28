import { Movimiento, Producto } from '../sequelize';
import { buscar } from '../services/movimiento.service';


export const buscarMovimientos = async (req, res) => {
    try {
        const movimientodb = await Movimiento.findAll({ include: [{ model: Producto, as: 'producto' }] });
        res.json(movimientodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema para traer este producto',
            error,
        });
    }
};

export const buscarSegunId = async(req, res) => {
    try{
        const id = req.params.id;
        const movimientodb = await buscar(id);
        return movimientodb;
    }
    catch(error){
        console.log(error);
        return res.status(500).json({mensaje: 'no se encontro el producto'})
    }
}

export default {
    buscarMovimientos,
    buscarSegunId
}