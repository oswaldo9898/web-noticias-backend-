import  publicacionModel  from "../models/publicaciones.js";


export default class Publicaciones {

    getAll = async(tipo = 'nacional', limit=6, page=1, sort='desc') => {
        // const publicaciones = await publicacionModel.find({tipo:tipo});
        const publicaciones = await publicacionModel.paginate({tipo: tipo},{limit:limit, page:page, sort: {createdAt: sort}})

        return publicaciones;
    }


    getById = async(id) => {
        const publicaciones = await publicacionModel.findById({_id:id});
        return publicaciones;
    }

    save = async(publicacion) => {
        const result = await publicacionModel.create(publicacion);
        return result;
    }
}