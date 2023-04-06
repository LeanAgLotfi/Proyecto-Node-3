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
import initializePassport from './config/passport.cofing.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

import ENV_CONFIG from './config/enviroment.config.js';
const app = express();

//HandleBars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname, 'src/public')))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

//Routes
app.use('/api', apiRouter)
app.use('/', viewsRoutes)



//Inicializacion de servidor
app.listen(ENV_CONFIG.PORT, () => {
  console.log("Ready on port => ", ENV_CONFIG.PORT);
});