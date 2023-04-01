import { Router } from "express";
import Publicaciones from "./../controllers/publicaciones.controller.js";
import { uploader, __dirname } from './../utils.js';
import fs from'fs';
import path from 'path';


const router = Router();
const publicaciones = new Publicaciones();



router.get('/', (req, res) => {
    try {
        // const allPublicaciones = publicaciones.getAll();
        // res.send({status:'success', payload: allPublicaciones});
        res.send({status:'success', payload: 'Llego todo'});
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
    
})



router.post('/',uploader.single('portadaImg'), async (req, res) => {
    const {titular, categoria, resumen, contenido, tipo} = req.body;
    const file = req.file

    const newPublicacion = {
        titular,
        categoria,
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



router.get('/obtenerPortada/:img', async(req, res) => {
    var img = req.params['img'];
    console.log(img)
    fs.stat(`${__dirname}/public/portadas/${img}`, function(err){
        console.log(err)
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