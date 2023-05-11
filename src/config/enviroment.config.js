import dotenv from 'dotenv';

dotenv.config()

const ENV_CONFIG = {
    PORT : process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || '',
    DATABASE : process.env.DATABASE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL: process.env.EMAIL,
    PERSISTENCE : process.env.PERSISTENCE || 'MONGO',
    ADMIN_NAME: process.env.ADMIN_NAME || '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
    SECRET_KEY:process.env.SECRET_KEY,
    SESSION_KEY: process.env.SESSION_KEY
}

export default ENV_CONFIG;