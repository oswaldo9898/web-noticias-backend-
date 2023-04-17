import { Router } from "express";
import Publicaciones from "./../controllers/publicaciones.controller.js";
import { uploader, __dirname } from './../utils.js';
import fs from'fs';
import path from 'path';


const router = Router();
const publicaciones = new Publicaciones();



router.get('/:tipo?', async(req, res) => {
    const {tipo} = req.params;
    const {limit,page,sort} = req.query;
    try {
        const allPublicaciones = await publicaciones.getAll(tipo,limit,page,sort);
        res.send({status:'success', payload: allPublicaciones});
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
    
})



router.post('/',uploader.single('portadaImg'), async (req, res) => {
    const {titular, categorias, resumen, contenido, tipo} = req.body;
    const file = req.file

    let Arraycategoria = JSON.parse(categorias)

    const newPublicacion = {
        titular,
        categorias: Arraycategoria,
        resumen,
        contenido,
        tipo,
        portada: file.filename
    }
    try {
        const result =  publicaciones.save(newPublicacion);
        res.send({ message: "Success", payload: result });
    }catch(e){
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
})



router.get('/noticia/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const publicacion = await publicaciones.getById(id);
        res.send({status:'success', payload: publicacion});
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
    
})



router.get('/obtenerPortada/:img', async(req, res) => {
    var img = req.params['img'];
    fs.stat(`${__dirname}/public/portadas/${img}`, function(err){
        if(!err){
            let path_img = `${__dirname}/public/portadas/${img}`;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
})

export default router;