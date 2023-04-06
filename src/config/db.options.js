import ENV_CONFIG from "./enviroment.config.js";
const { DATABASE, MONGO_URL, DB_PASSWORD } = ENV_CONFIG;

const options = {
    fileSystem: {
        productsFileName: "products.json"
    },
    mongo: {
      uri: MONGO_URL.replace('<password>', DB_PASSWORD).replace('<database>', DATABASE),
    }
  
}

export default options;