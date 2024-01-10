import express from 'express'
export const registerRouter = express.Router()

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config();

const { sequelize, User } = require("../models")


registerRouter.use(express.json())
registerRouter.use(express.urlencoded({extended:true}))


registerRouter.post('/', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    User.create(obj).then( (rows: any) => {
        const usr = {
            userId: rows.id,
            user: rows.username
        };

        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            throw new Error('ACCESS_TOKEN_SECRET is not set');
        }        

        const token = jwt.sign(usr, secret);
        //console.log(token);
        res.json({ token: token });
    }).catch( (err: Error) => res.status(500).json(err) );
})