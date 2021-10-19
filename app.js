const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');

const port = 5000;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

// Middleware - function that receives the req and res objects
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (error)=> {
    if(error){
        console.log("Error: Authentication Failed.");
    }else{
        console.log("Connected to MongoDB!");
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

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
app.get('/', (req, res) => res.send("This is the homepage."));
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
        id: posts.length + 1,
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