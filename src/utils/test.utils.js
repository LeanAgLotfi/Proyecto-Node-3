import { faker } from '@faker-js/faker';
import { USER_ROLES } from '../constants/userRoles.constants.js';

faker.setLocale('es');
const ages = [];

for (let i=0; i <= 60; i++) {
  ages.push(i+14);
}

export const generateUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.helpers.arrayElement(ages),
    email: faker.internet.email(),
    githubLogin:faker.internet.email(),
    role: faker.helpers.arrayElement(Object.values(USER_ROLES)),
    password: faker.internet.password(10),
  }
};

export const generateProducts = () => {
  const start_date = faker.date.future();
  const end_date = faker.date.future(1, start_date);
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    code:faker.random.numeric(15),
    price:faker.commerce.price(100),
    stock:faker.random.numeric(2),
    category:faker.commerce.department(),
    status:true,
    files:faker.image.image(),
    start_date,
    end_date,
  }
};