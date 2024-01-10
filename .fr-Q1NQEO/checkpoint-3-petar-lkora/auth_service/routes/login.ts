import express from 'express'
export const loginRouter = express.Router()

const { sequelize, User } = require("../models");

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config();


loginRouter.use(express.json())
loginRouter.use(express.urlencoded({ extended: true }))

loginRouter.post('/', async (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then( (usr: any) => {
        if (bcrypt.compareSync(req.body.password, usr.password)) {
            const obj = {
                userId: usr.id,
                user: usr.username
            };
            
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) {
                throw new Error('ACCESS_TOKEN_SECRET is not set');
            }
            
            const token = jwt.sign(obj, secret);
            res.json({ token: token });
        } else {
            res.status(400).json({ msg: "Invalid credentials"});
        }
      })
      .catch( (err: Error) => res.status(500).json(err) );
})

