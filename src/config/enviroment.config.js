import dotenv from 'dotenv';

dotenv.config()

const ENV_CONFIG = {
    PORT : process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || '',
    DATABASE : process.env.DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PERSISTENCE : process.env.PERSISTENCE || 'MONGO',
    ADMIN_NAME: process.env.ADMIN_NAME || '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || ''
}

export default ENV_CONFIG;