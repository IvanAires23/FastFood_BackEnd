import Joi from 'joi';

export const foodSchema = Joi.object({
    code: Joi.string()
});

export const categoryFoodSchema = Joi.object({
    category: Joi.string().equal('COMBOS', 'DESSERTS', 'DRINKS', 'FOLLOWUP').required()
});

