import mongoose from 'mongoose';
import DB_CONFIG from '../../../config/db.config.js';


class MongoManager {
    static #instance 
    constructor(){
        mongoose.connect(DB_CONFIG.mongo.uri)
        .then(()=>{
            console.log('Conectado a base de datos mongo!');
        })
        .catch((error)=>{
            console.log('error al conectar a base de datos')
            throw error
        })
    }

    static connect(){
        if(!this.#instance){
            this.#instance = new MongoManager();
        }
        return this.#instance
    }
}

export default MongoManager