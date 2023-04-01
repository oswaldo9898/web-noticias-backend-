import  publicacionModel  from "../models/publicaciones.js";


export default class Publicaciones {

    getAll = async() => {
        const publicaciones = publicacionModel.find();
        return publicaciones;
    }

    save = async(publicacion) => {
        const result = publicacionModel.create(publicacion);
        return result;
    }
}