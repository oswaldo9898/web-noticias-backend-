import mongoose from "mongoose";

const publicacionesCollection = 'publicaciones';

const publicacionesSchema = new mongoose.Schema({
    titular: {
        type: String,
        require: true
    },
    resumen: {
        type: String,
        require: true
    },
    categorias: {
        type: Array,
        default: [],
        require: true
    },
    contenido: {
        type:String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    portada: {
        type: String,
        require: true
    }
},{ timestamps: true });

const publicacionModel = mongoose.model(publicacionesCollection, publicacionesSchema);
export default publicacionModel;