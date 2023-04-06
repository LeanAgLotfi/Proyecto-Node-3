import ENV_CONFIG from "./enviroment.config.js";

const DB_CONFIG = {
    mongo: {
        uri: ENV_CONFIG.MONGO_URL.replace('<password>', ENV_CONFIG.DB_PASSWORD).replace('<database>', ENV_CONFIG.DATABASE)
    }
}

export default DB_CONFIG;