// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require("../models/userSchema");


const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers'
  }
];

const getUsers = async (req, res, next) => {
  let users;
   try {
     users= await User.find({}, '-password');
   } catch (err) {
     const error = new HttpError ("Fetching users failed, please try again", 500) 
     return next(error)
   }
  res.json({users: users.map(user=> user.toObject({
    getters: true
    })) 
  })
};

const signup = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next ( new HttpError('Invalid credentials passed, please check your data and re-enter.', 422));
    }
    const { name, email, password, places } = req.body;

    let existingUser
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(" Signing up faileddd+, please try again later please", 500)
      return next(error)
    }
    if(existingUser) {
      const error = new HttpError("User exist already, Kindly log in", 422);
      return next(error)
    }
    const createdUser = new User ({
      name, // name: name
      email,
      password,
      places: [],
      images: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg'
    });

    try {
          await createdUser.save();
        } catch (err) {
          const error = new HttpError("Singing dfbv Up failed, please try again later", 500);
          return next(error)
        }
        res.status(201).json({user: createdUser.toObject({ getters: true })
    });

  };



const login =  async (req, res, next) => {
  const error = validationResult(req);
  let existingUser
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(" Signing up faileddd+, please try again later please", 500)
      return next(error)
    }
    if(existingUser) {
      const error = new HttpError("User exist already, Kindly log in", 422);
      return next(error)
    }
  
    if (!existingUser || existingUser.password !== password ){
      const error = new HttpError ("Please enter correct password", 401)
      return next (error)
    }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;