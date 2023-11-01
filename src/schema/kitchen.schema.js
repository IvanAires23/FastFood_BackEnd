import Joi from 'joi';

export const kitchenSchema = Joi.object({
    money: Joi.string().required(),
    payment: Joi.string().equal('CREDIT', 'DEBIT', 'MONEY').required(),
    name: Joi.string().required().required(),
    foodId: Joi.number().integer().required(),
    change: Joi.number().integer().required(),
    observation: Joi.string(),
    quant: Joi.number().integer().required()
});

export const kitchenReadySchema = Joi.object({
    id: Joi.number().integer().required()
});