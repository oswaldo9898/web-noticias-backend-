import  publicacionModel  from "../models/publicaciones.js";


export default class Publicaciones {

    getAll = async(tipo = 'nacional') => {
        const publicaciones = await publicacionModel.find({tipo:tipo});
        return publicaciones;
    }


    getNoticia = async(id) => {
        const publicaciones = await publicacionModel.findById({_id:id});
        return publicaciones;
    }

    save = async(publicacion) => {
        const result = await publicacionModel.create(publicacion);
        return result;
    }
}