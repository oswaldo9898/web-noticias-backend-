import  publicacionModel  from "../models/publicaciones.js";


export default class Publicaciones {

    getAll = async(tipo, limit=6, page=1, sort='desc') => {
        if (tipo != undefined ) {
            return await publicacionModel.paginate({tipo: tipo},{limit:limit, page:page, sort: {createdAt: sort}});
            
        } else {
            return await publicacionModel.paginate({},{limit:limit, page:page, sort: {createdAt: sort}});

        }
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