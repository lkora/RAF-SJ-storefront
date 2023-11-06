import Joi from 'joi'

// New item
export const newItem = Joi.object().keys({
    name: Joi.string().trim().min(5).max(25).required(),
    description: Joi.string().trim().min(1).required(),
    manufacturer: Joi.string().trim().min(1),
    available: Joi.number().min(0).required(),
    category: Joi.string().trim().required(),
    price: Joi.number().min(0).required()
});

