import  publicacionModel  from "../models/publicaciones.js";


export default class Publicaciones {

    getAll = async(tipo = 'nacional') => {
        const publicaciones = await publicacionModel.find({tipo:tipo});
        return publicaciones;
    }

    save = async(publicacion) => {
        const result = await publicacionModel.create(publicacion);
        return result;
    }
}