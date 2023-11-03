# FastFood

FastFood is a fast food ordering API powered by Node.js, designed to provide a quick and easy way to manage restaurant orders.

Try it out now at: https://fastfoodapi-vrho.onrender.com

## About

This is a project focused on managing fast food, where it is possible for the user to track the order from registration to pickup. Having a modern and responsive design, it features features such as:

-   Food: <br>
  GET /food => Search all the foods on the menu <br>
  POST /food => Search for food by name or code <br>
  POST /food/category => Search for food by category <br>
  POST /food/create => Create a new food on the menu

-   Kitchen: <br>
  GET /kitchen => Search all orders in the kitchen <br>
  GET /kitchen/:foodId => Search for orders in the kitchen <br>
  POST /kitchen => Create a new order in the kitchen <br>
  POST /kitchen/ready => Updates order to ready <br>
  POST /kitchen/ready => Delete order

By using this application, fast food can manage all purchases in the establishment

## Technologies

The following tools and frameworks were used in the construction of the project:<br>

<p>
  <img  height="30" src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD"/>
  <img  height="30" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img  height="30" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img  height="30" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=ffffff">
  <img  height="30" src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=ffffff">
  <img  height="30" src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=ffffff">
  <img  height="30" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
</p>

## How to run

1. This project was developed in Vite, therefore it requires Node.js version 14.18+, 16+. However, some templates require a higher version of Node.js to work
   *If necessary, install Node.js from this link: https://nodejs.org/en
2. Clone this repository
3. Install dependencies
```bash
npm install
```
4. Configure the .env.development file using the .env.example file

5. Run migrations
```bash
npm run dev:migration:run
```
6. Run seed db
```bash
npm run dev:seed
```
7. Run with
```bash
npm run start
```
8. You can optionally build the project running
```bash
npm run build
```
9. Run the application at http://localhost:3000/health in your browser

## How to run tests

1. Follow the steps in the last section
2. Clone this repository
3. Install dependencies
```bash
npm install
```
4. Configure the .env.test file using the .env.example file 

5. Run all migrations
  ```bash
  npm run test:migration:run
  ```
6. Run the back-end in a development environment:
  ```bash
  npm run test
  ```
