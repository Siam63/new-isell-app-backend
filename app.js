const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');

const port = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
    console.log("Connected to MongoDB!");
});

const users = [
    {
        id: 1,
        name: "Siam Rahman",
        posts: 3
    },
    {
        id: 2,
        name: "Sam Kurt",
        posts: 1
    },
    {
        id: 3,
        name: "Eric Cartman",
        posts: 2
    }
]

const posts = [
    {
        id: 1,
        title: "Pokemon Booster Box",
        description: "Brand new, sealed.",
        condition: "Brand New",
        price: 250
    },
    {
        id: 2,
        title: "iPhone 6 for sale!",
        description: "Used, but in great condition. Comes with original everything.",
        condition: "User - Like New",
        price: 150
    },
    {
        id: 3,
        title: "AirPods Gen 1",
        description: "Brand new, sealed.",
        condition: "Brand New",
        price: 150
    }
]

function validateUser(user){
    const schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(user, schema);
}

function validatePost(post){
    const schema = {
        title: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        condition: Joi.string().min(3).required(),
        price: Joi.number().integer().required()
    };
    
    return Joi.validate(post, schema);
}


// Routes
app.get('/', (req, res) => res.send("Hello world!"));
app.listen(port, () => console.log(`Backend server is running on port ${port}`));

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(u => u.id === parseInt(req.params.id));
    if(!post){
        return res.status(404).send('The post with this ID was not found.');
    }
    res.send(post);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user){
        return res.status(404).send('The user with this ID was not found.');
    }
    res.send(user);
});

app.post('/posts', (req, res) => {
    const { error } = validatePost(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const post = {
        id: users.length + 1,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        price: req.body.price,
    };
    posts.push(post);
    res.send(post);
});

app.post('/users', (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});