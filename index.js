const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => { 
    const recept = {
        title: "Gomboce",
        level: "Amateur Chef",
        ingredients: ['flour', 'water', 'oil', 'sugar', 'plum'],
        cuisine: "Serbian",
        dishType: "dessert",
        duration: 60,
        creator: "Ivana",
  }
  console.log(`${recept.title}`)
  return Recipe.create(recept);
})
.then(() => {
  data.forEach((recipe)=>console.log(recipe.title));
  return Recipe.insertMany(data)
})
.then(() => {
  return Recipe.findOneAndUpdate()
})

      //create a new recipe by using the method given ITERATION 2
    // ITERATION 3 activate variable data to get the data. json file
    // Run your code here, after you have insured that the connection was made
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  