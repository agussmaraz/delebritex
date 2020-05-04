import { Usuario } from '../sequelize';

export const borrar = async (token) => {
    let user = await Usuario.findOne({ where: { token: token } });
    try {
        let tokenUser = user.update({ token: null});
        return tokenUser;
        
    } catch (error) {
        console.log(error);
    }

};
