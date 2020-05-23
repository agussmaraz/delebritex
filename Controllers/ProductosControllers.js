import { Producto, Categoria, Empaque, Medida, Movimiento} from '../sequelize';
import * as producto from '../services/producto.services';
import * as movimiento from '../services/movimiento.service';
const Slug = require('slug');


export const crear =  async (req, res) => {
    const body = req.body;
    console.log(body);
    const pathOriginal = req.file.originalname;
    req.body.imagen = '/img/' + pathOriginal;
    const slug = Slug(req.body.slug);
    req.body.slug = slug;
    try {
        const productodb = await producto.crear(body);
        res.status(200).json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un error',
        });
    }
};
export const buscar = async (req, res) => {
    try {
        const productodb = await Producto.findAll({
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Empaque, as: 'empaque' },
                { model: Medida, as: 'medida' },
            ],
        });
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Hubo un problema',
            error,
        });
    }
};
export const buscarSegunSlug = async (req, res) => {
    const slug = req.params.slug;
    // console.log(slug);
    try {
        const productodb = await Producto.findOne({
            where: { slug: slug },
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Empaque, as: 'empaque' },
                { model: Medida, as: 'medida' },
            ],
        });
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Hubo un problema',
            error,
        });
    }
};
export const buscarSegunId = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const productodb = await Producto.findOne({
            where: { id: id },
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Empaque, as: 'empaque' },
                { model: Medida, as: 'medida' },
            ],
        });
        res.json(productodb);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Hubo un problema',
            error,
        });
    }
};
export const editar = async (req, res) => {
    const nuevosDatos = req.body;
    console.log(nuevosDatos);
    const id = req.params.id;
    console.log(id);
    try {
        const producto = await Producto.findOne({where: {id:id}})
        const unidadAntes = producto.totalUnidad;

        const productodb = await Producto.findOne({where: {id:id}})
        productodb.update(nuevosDatos)

        const unidadAhora = productodb.totalUnidad;

        if(unidadAntes !== unidadAhora){
            const diferencia = unidadAhora - unidadAntes;
            if(diferencia === 1){
                 movimiento.crear(productodb.id, 'suma', diferencia, productodb.updatedAt);
            } else {
                 movimiento.crear(productodb.id, 'vendido', Math.abs(diferencia), productodb.updatedAt);
            }
        }
        res.json(productodb);

    }catch(error){
        console.log(error)
    }
};

export const eliminar = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const productodb = await Producto.destroy({ where: { id: id}} );
        movimiento.eliminar(id);
        if (!productodb) {
            res.status(500).json({
                mensaje: 'El producto no se encuentra',
            });
        }
        res.json(id);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error,
        });
    }
};

export default {
    crear,
    buscar,
    buscarSegunSlug,
    buscarSegunId,
    editar,
    eliminar,
};
