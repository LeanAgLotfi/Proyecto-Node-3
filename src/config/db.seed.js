import mongoose from "mongoose";
import userModel from "../model/schemas/user.schema.js";
import productModel from "../model/schemas/products.schema.js";
import { generateProducts, generateUser } from "../utils/test.utils.js";
import  options  from "./db.options.js";

mongoose.set("strictQuery", false);
mongoose.connect(options.mongo.uri)
  .then(() => {
    console.log("Conected to Mongo DB successfully!");
    const users = [];
    const products = [];

    for (let i = 1; i <= 500; i++) {
      users.push(generateUser());
    };

    for (let i = 1; i <= 1000; i++) {
      products.push(generateProducts());
    };

    return Promise.all([userModel.insertMany(users), productModel.insertMany(products)]);
  })
  .then(() => console.log("DATA INSERTED"))
  .catch((error) => {
    console.log("There was an error connecting to DB");
    console.error(error.message);
  })
  .finally(() => {
    mongoose.disconnect();
  })