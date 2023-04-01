import express from 'express';
import mongoose from 'mongoose';
import publicacionesRouter from "./routes/publicaciones.router.js"
import cors from 'cors';
import bodyparser from 'body-parser';
import {__dirname} from './utils.js';

const app = express();


/**Cors */
app.use(cors());

/**Parametros de conexion */
const USER = 'oswaldogarces98';
const PASSWORD = 'nIcHH2K83fj7dWZP';
const DATA_BASE = 'noticiasweb';

try {
  await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.maeqnip.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`);
} catch (error) {
  console.log(error);
}


/**CONFIGURACION PARA LA RECEPCION DE JSON */
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));



//Permiso para conectar el backend y frontend
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS, PATCH');
  next();
});
/** */

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '50mb', extends: true}))


app.use('/static',express.static(`${__dirname}/public`));


/**Rutas */
app.use('/api/publicaciones',publicacionesRouter);

app.listen(8080, () => {
  console.log('Servidor corriendo puerto 8080')
})

