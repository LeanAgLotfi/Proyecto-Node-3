import express from 'express';
import  Server  from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import './config/db.config.js';
import path from 'path'
import apiRouter from './router/app.routes.js'
import viewsRoutes from './router/view/view.routes.js'
import handlebars from 'express-handlebars'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {initializePassport} from './config/passport.cofing.js'
import swaggerJSDoc from 'swagger-jsdoc';
import {serve as swaggerServe, setup as swaggerSetup} from 'swagger-ui-express'
const __dirname = dirname(fileURLToPath(import.meta.url));

import ENV_CONFIG from './config/enviroment.config.js';
const app = express();

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');


const swaggerOptions = {
  definition:{
    openapi: '3.0.1',
    info:{
      title:'Ecommerce Lean',
      description:'Un comercio online',
      version:'1.0.0',
      contact:{
        name:'Leandro Lotfi',
        email: 'aguslot19@gmail.com'
      }
    }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname, 'src/public')))
initializePassport()
app.use(cookieParser())
app.use(passport.initialize())

//Routes
app.use('/api/doc', swaggerServe, swaggerSetup(specs))
app.use('/api', apiRouter)
app.use('/', viewsRoutes)



//Inicializacion de servidor
app.listen(ENV_CONFIG.PORT, () => {
  console.log("Ready on port => ", ENV_CONFIG.PORT);
});