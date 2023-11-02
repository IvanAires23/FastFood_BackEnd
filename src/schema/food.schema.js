import Joi from 'joi'

export const foodSchema = Joi.object({
    code: Joi.string().required(),
})

export const categoryFoodSchema = Joi.object({
    category: Joi.string()
        .equal('COMBOS', 'DESSERTS', 'DRINKS', 'FOLLOWUP')
        .required(),
})

export const createFoodSchema = Joi.object({
    code: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    subDescription: Joi.string().required(),
    category: Joi.string()
        .equal('COMBOS', 'DESSERTS', 'DRINKS', 'FOLLOWUP')
        .required(),
})
