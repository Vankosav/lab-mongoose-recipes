const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
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
  const changeDuration = {
    duration: 100
  }; 
  console.log('success');
  return Recipe.findOneAndUpdate({ title: "Gomboce" }, changeDuration);
})
.then(() => {
  console.log('deleted');
  return Recipe.deleteOne({ title : "Carrot Cake"});
})
 
      //create a new recipe by using the method given ITERATION 2
    // ITERATION 3 activate variable data to get the data. json file
    // Run your code here, after you have insured that the connection was made
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  app.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.find(); // retrieve all documents from the 'recipes' collection
      res.render('home', { recipes }); // pass the recipe data to the 'home' template
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } 
  });
  
  app.get('/recipes/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id); // retrieve the recipe by ID from the database
      res.render('recipes', recipe); // pass the recipe data to the 'recipe' template
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(3000, () => console.log('Server started on port 3000'));